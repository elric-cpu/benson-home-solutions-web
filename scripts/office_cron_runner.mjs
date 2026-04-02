#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import YAML from "yaml";

const repoRoot = process.cwd();
const cronSpecPath = path.join(repoRoot, "docs", "agents", "cron-schedule.yaml");
const fileSuffixes = new Set([".json", ".yaml", ".yml", ".md", ".txt", ".csv"]);

function loadJobs() {
  const raw = fs.readFileSync(cronSpecPath, "utf8");
  const data = YAML.parse(raw) ?? {};
  if (!Array.isArray(data.jobs)) {
    throw new Error("Invalid cron spec: `jobs` must be a list.");
  }
  return data.jobs;
}

function isFileReference(value) {
  return value.includes("/") || fileSuffixes.has(path.extname(value));
}

function placeholderFor(relPath, owner, jobId, kind) {
  return JSON.stringify(
    {
      status: "scaffold",
      kind,
      job_id: jobId,
      owner,
      path: relPath,
    },
    null,
    2,
  ) + "\n";
}

function ensurePlaceholder(absPath, relPath, owner, jobId, kind) {
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  if (fs.existsSync(absPath)) {
    return false;
  }

  const ext = path.extname(absPath);
  if (ext === ".json") {
    fs.writeFileSync(absPath, placeholderFor(relPath, owner, jobId, kind), "utf8");
  } else {
    fs.writeFileSync(
      absPath,
      `status: scaffold\nkind: ${kind}\njob_id: ${jobId}\nowner: ${owner}\n`,
      "utf8",
    );
  }

  return true;
}

function main() {
  const args = new Set(process.argv.slice(2));
  const scaffoldMissing = args.has("--scaffold-missing");

  const jobs = loadJobs();
  const missingInputs = [];
  const missingOutputs = [];
  const created = [];

  for (const job of jobs) {
    for (const field of ["inputs", "outputs"]) {
      const values = job[field] ?? [];
      if (!Array.isArray(values)) {
        throw new Error(`Invalid cron spec: \`${job.id}.${field}\` must be a list.`);
      }

      for (const raw of values) {
        if (typeof raw !== "string" || !isFileReference(raw)) {
          continue;
        }

        const absPath = path.join(repoRoot, raw);
        if (fs.existsSync(absPath)) {
          continue;
        }

        if (field === "inputs") {
          missingInputs.push(raw);
        } else {
          missingOutputs.push(raw);
        }

        if (scaffoldMissing && ensurePlaceholder(absPath, raw, job.owner, job.id, field.slice(0, -1))) {
          created.push(raw);
        }
      }
    }
  }

  console.log(`cron_spec=${path.relative(repoRoot, cronSpecPath)}`);
  console.log(`jobs=${jobs.length}`);
  console.log(`missing_inputs=${missingInputs.length}`);
  console.log(`missing_outputs=${missingOutputs.length}`);

  if (missingInputs.length) {
    console.log("missing_input_paths:");
    for (const entry of missingInputs) console.log(`  - ${entry}`);
  }

  if (missingOutputs.length) {
    console.log("missing_output_paths:");
    for (const entry of missingOutputs) console.log(`  - ${entry}`);
  }

  if (created.length) {
    console.log("created_paths:");
    for (const entry of created) console.log(`  - ${entry}`);
  }

  process.exit(scaffoldMissing ? 0 : missingInputs.length || missingOutputs.length ? 1 : 0);
}

main();

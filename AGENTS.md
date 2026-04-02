# Agent Definitions

This repo runs the Iron Ledger Digital office model for Benson Home Solutions.

Source-of-truth boundaries:
- `agents.toml` defines the agency roster, reporting lines, ownership, and block authority.
- `docs/agents/agent-registry.yaml` defines role behavior and operational contracts.
- `docs/agents/cron-schedule.yaml` defines scheduled jobs and file handoffs.
- `docs/agents/release-board.yaml` defines release-state transitions and approval rules.

Platform mandate:
- The office is Google-first by policy.
- All website AI must run on Google/Gemini-family models and Google-managed AI infrastructure.
- All production AI auth must use the GCloud JSON service account and/or Google Workspace-managed access paths.
- Email, calendar, contacts, and file storage must live in Google Workspace and/or Google Cloud Storage buckets.
- The website chatbot must be implemented in Google AI tooling.
- Any non-Google replacement or parallel stack is a contract violation unless the office source-of-truth files are explicitly revised first.

## Office Model

The office is not a single-agent `gemini` setup anymore. It is a directed agency with:
- directors for growth, engineering, and QA
- chiefs for search, content, platform, verification, and analytics
- sub-agents for narrowly scoped execution

The current roster lives in `agents.toml`.

## Execution Rules

- Treat the office as a release-gated operating system, not an informal prompt pattern.
- Use the cron and release specs in `docs/agents/` as machine-readable operating contracts.
- Route work through the owning lead defined in `agents.toml`.
- Respect block authority and release vetoes exactly as defined by the office files.
- Do not introduce non-Google AI, messaging, calendar, contacts, or storage systems as primary architecture.

## Local Operations

- Use `node scripts/office_cron_runner.mjs --dry-run` to validate cron file inputs, outputs, and directory wiring.
- Use `node scripts/office_cron_runner.mjs --scaffold-missing` to materialize any missing file-based artifacts declared by the cron spec.
- Keep placeholder artifacts stable and machine-readable so scheduled jobs can overwrite them deterministically.

## Current Constraint

The office is partially operationalized in-repo:
- roster and release contracts exist
- queue and report scaffolds exist
- local cron validation exists

External scheduling is still an infrastructure concern. Until a real scheduler is attached, `scripts/office_cron_runner.mjs` is the local execution and validation path.

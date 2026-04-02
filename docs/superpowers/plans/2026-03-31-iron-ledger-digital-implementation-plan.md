# Iron Ledger Digital Implementation Plan

> For implementation workers: execute this plan in order. Track progress with checkbox updates. Do not begin the read-only audit until the office build artifacts are in place.

**Goal:** Replace the current agent canon with the Iron Ledger Digital operating system, wire its cron and release artifacts, then run a full read-only audit that outputs an executive board, war-room remediation plan, and machine-readable queues for single-wave implementation.

**Architecture:** This implementation has three phases. First, replace the office configuration and operating documents. Second, install the machine-readable cron, release, and queue scaffolding. Third, run a strictly read-only audit over the existing project and emit dual-layer remediation artifacts. No product code or content changes are allowed during the audit phase.

**Tech Surface:** `agents.toml`, `docs/agents/*.yaml`, `docs/agency/*`, queue/report/release directories, existing Next.js project, backend functions workspace, media inventory, and automation scripts.

---

## Phase 1: Office Build

**Files:**
- Modify: `agents.toml`
- Modify: `docs/agents/agent-registry.yaml`
- Create: `docs/agents/cron-schedule.yaml`
- Create: `docs/agents/release-board.yaml`

- [ ] **Step 1: Replace the current agency manifest**
  - Remove the single-agent assumption from `agents.toml`.
  - Install the Iron Ledger Digital agency metadata, release lock, and named lead agents.

- [ ] **Step 2: Replace the current registry**
  - Overwrite `docs/agents/agent-registry.yaml` with the approved roster, scopes, clashes, and guardrails.

- [ ] **Step 3: Install cron schedule spec**
  - Create `docs/agents/cron-schedule.yaml`.
  - Define all recurring jobs, owners, inputs, outputs, schedules, and release impact classes.

- [ ] **Step 4: Install release board spec**
  - Create `docs/agents/release-board.yaml`.
  - Define release states, transitions, rollback conditions, and triple-lock rules.

---

## Phase 2: Runtime Artifact Scaffolding

**Files/Dirs:**
- Create: `docs/agency/executive-board/`
- Create: `docs/agency/war-room/`
- Create: `docs/agency/audits/`
- Create: `docs/agency/remediation-plans/`
- Create: `docs/agency/postmortems/`
- Create: `reports/`
- Create: `queues/`
- Create: `drafts/`
- Create: `analytics/`
- Create: `release/`
- Create: `deploy/`
- Create: `rollback/`
- Create: `runtime/`

- [ ] **Step 5: Create the office directories**
  - Add the directory scaffold required by the master blueprint.
  - Ensure the paths exist for human docs and machine queues before any audit runs.

- [ ] **Step 6: Seed machine-readable placeholders**
  - Create minimal placeholder JSON or README files where necessary so cron jobs and downstream tooling have stable targets.
  - Keep them clearly marked as scaffolding, not populated audit output.

- [ ] **Step 7: Document artifact contracts**
  - Write the expected payload contract for reports, queues, release board entries, and remediation items into the relevant docs if not already captured.

---

## Phase 3: Read-Only Audit Setup

**Files:**
- Create: `docs/agency/audits/2026-03-31-full-project-audit.md`
- Create: `docs/agency/executive-board/2026-03-31-remediation-board.md`
- Create: `docs/agency/war-room/2026-03-31-remediation-war-room.md`
- Create: `docs/agency/remediation-plans/2026-03-31-single-wave-remediation.json`

- [ ] **Step 8: Freeze audit protocol**
  - Re-state the audit constraints at the top of the audit doc:
    - no code edits
    - no content edits
    - no deploy changes
    - no package changes
    - no environment mutation

- [ ] **Step 9: Run full workspace inspection**
  - Inventory routes, APIs, components, libs, backend functions, scripts, media, secrets exposure, build health, stub behavior, and performance risks.
  - Reuse existing audit findings only if re-validated against the current workspace state.

- [ ] **Step 10: Write the executive remediation board**
  - Organize findings by business impact:
    - release blockers
    - high-leverage authority wins
    - structural fixes
    - buildout backlog
    - long-tail cleanup

- [ ] **Step 11: Write the war-room remediation plan**
  - For each item include:
    - id
    - title
    - workstream owner
    - supporting agents
    - targets
    - evidence
    - proposed fix
    - dependencies
    - release gate
    - queue target

- [ ] **Step 12: Emit machine-readable remediation queues**
  - Generate the single-wave remediation JSON plus any referenced queue artifacts needed by the cron model.
  - Ensure the queue layout matches the office blueprint.

---

## Phase 4: Approval Gate Before Execution

- [ ] **Step 13: Present the read-only audit package**
  - Surface the executive board and war-room plan to the user.
  - Explicitly confirm that no code or content changed during the audit.

- [ ] **Step 14: Request approval for the single execution wave**
  - Do not start implementation work until the remediation package is approved.

---

## Constraints

- The audit phase must remain read-only.
- The implementation phase after approval is single-wave, but releases are still gated by the triple lock.
- QA retains hard veto and rollback authority throughout.

## Definition of Success

- The office build artifacts are installed and replace the old canon.
- The runtime directories and queue/report targets exist.
- The project has a full read-only audit package in both human and machine-readable forms.
- The user can approve one remediation package and let the agency execute continuously with internal release gating.

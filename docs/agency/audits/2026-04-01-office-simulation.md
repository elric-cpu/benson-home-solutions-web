# 2026-04-01 Office Simulation

## Scope
- Workspace-level simulation of the Iron Ledger Digital office against the current dirty working tree.
- Read-only assessment of search, content, platform, verification, and analytics.
- Evidence captured from cron validation, repository inspection, and a production build run.

## Simulation Inputs
- `node scripts/office_cron_runner.mjs --dry-run`
- `pnpm build`
- repository status and targeted source inspection

## Executive Outcome
- Cron file graph validates locally.
- Production build completes.
- Release remains blocked.
- The blocking causes are not build failure anymore; they are security, backend contract drift, demo behavior, and contact-path resilience.

## Workstream Findings

### Search Dominance
- Duplicate calculator IA remains live: `/calculator` and `/tools/cost-calculator` both exist and internal links point to both.
- The projects page is still placeholder-only and does not provide proof-of-work depth.
- Route churn across area and service surfaces is still high enough to make authority planning unstable.

### Content Production
- No publishable project proof batch exists yet.
- Case-study and gallery content are blocked on source material rather than drafting capacity.
- Content should not expand further until the calculator IA and proof surface are cleaned up.

### Platform Engineering
- `benson-genkit-backend/functions/src/genkit-config.ts` still contains a live hard-coded Google AI API key.
- `src/lib/genkit.ts` still assumes callable endpoint names that do not match the backend exports.
- `src/app/api/estimator/route.ts` still mixes demo-mode behavior with a backend contract that does not match the estimator UI.
- `src/app/layout.tsx` still mounts `AIChat` globally.

### Verification and Release
- Release certification fails on credential exposure alone.
- Production request paths still rely on demo-mode or placeholder behavior.
- `src/lib/ratelimit.ts` can fail contact submissions outright when Upstash is unset.
- Build logs still emit CRITICAL Sanity configuration warnings during production build.

### Analytics and Experimentation
- The office can order work manually, but the analytics layer is still scaffold-based.
- No trusted event feed is present for autonomous prioritization.
- Instrumentation remains supportive evidence, not a release gate.

## Command Evidence

### Cron validation
- `node scripts/office_cron_runner.mjs --dry-run`
- Result: `missing_inputs=0`, `missing_outputs=0`

### Build
- `pnpm build`
- Result: pass
- Warnings observed:
  - Next.js ESLint plugin not detected in config
  - several `no-explicit-any` warnings
  - repeated `CRITICAL: NEXT_PUBLIC_SANITY_PROJECT_ID is missing in production environment.`

## Release Stance
- `hold`
- Blocking items: `SIM-01`, `SIM-02`, `SIM-03`, `SIM-04`

---
name: hostinger-deploy-and-test
description: Deploy and validate Next.js or Node.js websites on Hostinger using hPanel, staging domains, exported environment variables, and smoke tests. Use when the user wants to push a site live on Hostinger, verify a staging deploy, or cut over a custom domain safely.
---

# Hostinger Deploy And Test

## Overview

Use this skill after the Hostinger website resource exists and the app has already been built into a deployable artifact.

Prefer staging first, then production cutover.

## Preconditions

- Hostinger website already exists or has been created via the API
- the app artifact exists at `.hostinger/node-app.tgz`
- the env export exists at `.hostinger/.env.production`
- the app needs a Node.js runtime rather than static hosting

For this repo, those are produced by:
- `bash scripts/prepare-hostinger-nextjs.sh`
- `bash scripts/export-hostinger-env.sh`

## Workflow

### 1. Verify Local Deployment Inputs

Run:

```bash
bash scripts/check-hostinger-artifact.sh
```

Do not proceed to hPanel if the artifact or env export is incomplete.

### 2. Deploy To Staging In hPanel

Use `references/manual-deploy-workflow.md` for the exact hPanel sequence.

For this repo, current staging target:

```text
azure-crow-946922.hostingersite.com
```

Set:

```text
Node.js version: 22.x
Start command: ./start-hostinger.sh
```

Load environment variables from:

```text
.hostinger/.env.production
```

### 3. Smoke Test The Staging URL

Run:

```bash
bash scripts/smoke-test-hostinger.sh https://azure-crow-946922.hostingersite.com
```

This checks:
- homepage returns HTML
- `/api/health` returns JSON with config flags

If staging fails, stop before production cutover.

### 4. Cut Over Production

Only after staging is healthy:

1. back up the existing Hostinger site
2. recreate the production website as a Node.js app if needed
3. deploy the same artifact and env set
4. preserve mail DNS records
5. rerun smoke tests against production

### 5. Declare Success

Only declare the deployment complete when:
- the production hostname returns the expected homepage
- `/api/health` passes
- HTTPS works cleanly
- no mail DNS records were lost

## Resources

- `scripts/check-hostinger-artifact.sh`
- `scripts/smoke-test-hostinger.sh`
- `references/manual-deploy-workflow.md`

## Guardrails

- Never switch production first.
- Never overwrite production DNS or website state without a backup path.
- Never call the deployment live until smoke tests pass.

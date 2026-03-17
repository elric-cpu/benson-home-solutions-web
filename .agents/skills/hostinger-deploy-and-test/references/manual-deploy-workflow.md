# Manual Deploy Workflow

Use this reference when the Hostinger API has already created the website resource, but the actual Node.js app deployment must still be completed in hPanel.

## Inputs

- built artifact: `.hostinger/node-app.tgz`
- env export: `.hostinger/.env.production`
- target domain or staging subdomain
- Node version: `22.x`
- start command: `./start-hostinger.sh`

## Staging First

Always deploy to a staging Hostinger subdomain first when production already exists.

Current staging domain for this repo:

- `azure-crow-946922.hostingersite.com`

## hPanel Steps

1. Open the target website in Hostinger hPanel.
2. Create or open the Node.js web app for that domain.
3. Set the Node.js version to `22.x`.
4. Upload `.hostinger/node-app.tgz` or connect the repo if hPanel offers Git deployment for that web app.
5. Ensure the working directory contains:
   - `server.js`
   - `start-hostinger.sh`
   - `.next/static`
   - `public/`
6. Add environment variables from `.hostinger/.env.production`.
7. Set the start command to `./start-hostinger.sh`.
8. Start or restart the app.

## Verification

After deployment:

1. Run `check-hostinger-artifact.sh` locally before uploading.
2. Run `smoke-test-hostinger.sh <staging-url>` after Hostinger reports the app as running.
3. Confirm:
   - homepage returns HTML
   - `/api/health` returns JSON with config flags
   - Sanity-backed pages load
   - form and webhook routes do not crash on basic requests

## Production Cutover

For `bensonhomesolutions.com`:

1. Back up the current non-Node website in hPanel.
2. Confirm the staging Node.js app is healthy.
3. Remove the existing non-Node website for `bensonhomesolutions.com`.
4. Re-create `bensonhomesolutions.com` as a Node.js web app.
5. Deploy the same artifact and env set.
6. Preserve mail DNS records:
   - MX
   - SPF
   - DKIM
   - DMARC
7. Run smoke tests against production.

## Failure Policy

- If the homepage fails, stop and inspect Hostinger logs before touching DNS.
- If `/api/health` fails, compare the env vars in hPanel against `.hostinger/.env.production`.
- If production fails after cutover and the fix is not immediate, restore the prior DNS/site state rather than leaving the domain degraded.

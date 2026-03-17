# Hostinger Next.js Deployment

This project is a Node-backed Next.js deployment, not a static export.

## Why

- [`next.config.ts`](/home/elricenson/website_builds/benson-home-solutions-web/next.config.ts) sets `output: 'standalone'`
- [`package.json`](/home/elricenson/website_builds/benson-home-solutions-web/package.json) uses `next build` and `next start`
- the app contains server routes under [`src/app/api`](/home/elricenson/website_builds/benson-home-solutions-web/src/app/api)

## Current Hostinger State

As of March 14, 2026:

- Hostinger account website exists for `bensonhomesolutions.com`
- Hostinger account website exists for `portal.bensonhomesolutions.com`
- DNS for `bensonhomesolutions.com` is already hosted on Hostinger
- DNS currently includes:
  - apex `A 2.57.91.91`
  - `www CNAME bensonhomesolutions.com.`
  - Hostinger Mail MX/SPF/DKIM/DMARC records

Mail-related DNS records must be preserved during any website cutover.

## Hostinger Platform Notes

Hostinger currently supports Next.js on managed Node.js web app hosting, including Node `22.x`, which matches this repo's engine requirement.

For Node.js-backed frameworks, Hostinger deploys the app under a `nodejs` directory and uses the website domain to reverse-proxy traffic into the app process.

## Recommended Deployment Path

1. Create a staging Node.js web app in Hostinger using a temporary Hostinger subdomain.
2. Deploy this repo to the staging app first.
3. Add the runtime env vars from [`.env.hostinger.example`](/home/elricenson/website_builds/benson-home-solutions-web/.env.hostinger.example).
4. Verify:
   - homepage loads
   - API routes return expected responses
   - Sanity content resolves
   - database-backed routes work
5. Back up the existing `bensonhomesolutions.com` website in hPanel.
6. Remove the existing non-Node website for `bensonhomesolutions.com`.
7. Re-create `bensonhomesolutions.com` as a Node.js web app.
8. Deploy the same repo/build there.
9. Keep DNS mail records unchanged.

## Deployment Artifact

To prepare a standalone artifact for Hostinger:

```bash
bash scripts/prepare-hostinger-nextjs.sh
```

That script will:

- run `pnpm build`
- collect `.next/standalone/benson-home-solutions-web`
- copy `.next/static`
- copy `public/`
- generate a tarball at `.hostinger/node-app.tgz`
- create a startup helper at `.hostinger/node-app/start-hostinger.sh`

## Runtime Env Minimum

The repo's build validation currently requires:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `DATABASE_URL`
- `PINECONE_API_KEY`
- `PINECONE_INDEX`
- `RESEND_API_KEY`

Optional but currently referenced by app code:

- `OPENROUTER_API_KEY`
- `GEOAPIFY_API_KEY`
- `NEXT_PUBLIC_GEOAPIFY_API_KEY`
- `NEXT_PUBLIC_SENTRY_DSN`
- `GA4_API_SECRET`
- `GA4_MEASUREMENT_ID`
- `NOTION_API_KEY`
- `NOTION_DB_*`
- `HUD_API_TOKEN`
- `COMPANYCAM_WEBHOOK_TOKEN`
- `BHS_WEBHOOK_SECRET`
- `NOTION_WEBHOOK_SECRET`
- `SUPABASE_WEBHOOK_SECRET`
- `ADMIN_SECRET`
- `GUMLOOP_*`
- `SIGNATURE_PROVIDER`
- `SIGNATURE_API_KEY`
- `IGUIDE_*`
- `METABASE_*`

Use [`.env.hostinger.example`](/home/elricenson/website_builds/benson-home-solutions-web/.env.hostinger.example) as the transfer checklist.

To export the current repo's matching variables into a local ignored file:

```bash
bash scripts/export-hostinger-env.sh
```

That writes:

- [`.hostinger/.env.production`](/home/elricenson/website_builds/benson-home-solutions-web/.hostinger/.env.production)

## Validation Checklist

- `pnpm build` succeeds locally
- staging app runs on Hostinger Node.js hosting
- `/api/health` returns healthy config flags
- production hostname resolves correctly
- HTTPS certificate is active
- Hostinger Mail records still resolve after any DNS change

---
name: hostinger-website-deploy
description: Deploy websites to Hostinger hosting and connect them to a custom domain. Use when the user wants to create a Hostinger website, inspect hosting websites, or deploy a Git-based or built web app to a Hostinger domain.
---

# Hostinger Website Deploy

This skill handles website-side work on Hostinger: list or create websites, choose the correct hosting path, and connect deployment output to the intended domain.

## Prerequisites

- `HOSTINGER_API_TOKEN` must be set for API-backed operations
- For Git-based deploys, the repo should already exist remotely
- Build locally first when the framework requires a static output or a production bundle

## API Operations

Use the bundled helper:

```bash
bash scripts/hostinger-websites.sh list
bash scripts/hostinger-websites.sh create payload.json
```

The main endpoints are:
- `GET /api/hosting/v1/websites`
- `POST /api/hosting/v1/websites`
- `GET /api/hosting/v1/websites/{websiteId}`
- `PATCH /api/hosting/v1/websites/{websiteId}`
- `DELETE /api/hosting/v1/websites/{websiteId}`
- `POST /api/hosting/v1/domains/free-subdomains`

## Deployment Decision Rule

Pick the simplest correct path:

- Static export or prebuilt frontend output:
  Deploy the built files to the website document root, then point the domain.
- Git-backed PHP or simple website hosting:
  Use Hostinger Git deployment into `/public_html` when supported by the hosting plan.
- Node.js app:
  Use Hostinger's Node.js app hosting flow for the website and deploy from Git or the app package supported by that plan.

Do not claim all Hostinger plans support the same deployment model. Check the active hosting product first.

## Recommended Workflow

1. List current Hostinger websites.
2. If needed, create a new website attached to the target hosting plan.
3. Decide static vs Node.js vs Git deployment.
4. Build the project locally.
5. Configure the deployment target on Hostinger.
6. Point the domain using the `hostinger-domain-dns` skill.
7. Verify TLS and final hostname resolution.

## Git Deployment Notes

For Hostinger Git deployment in standard hosting:
- configure the Git repository URL in hPanel
- set the install path to `/public_html` for the primary website root when appropriate
- use a production branch explicitly

Do not overwrite an existing site root unless the user confirms the replacement.

## Node.js App Notes

Use this route for SSR or app-server deployments only when the hosting plan exposes Node.js app support.

Before deployment:
- confirm supported Node.js version on the plan
- confirm build command
- confirm start command
- confirm exposed port or Hostinger runtime expectations

If the plan is unclear, stop and inspect the website/plan details before continuing.

## Static Site Notes

For purely static Next.js, Vite, Astro, or similar frontends:
- run the production build locally
- upload or publish the generated output to the website root
- make DNS changes only after the files are in place

## Helper Usage

List websites:

```bash
bash scripts/hostinger-websites.sh list
```

Get a website:

```bash
bash scripts/hostinger-websites.sh get website_id
```

Create a website from a JSON payload:

```bash
bash scripts/hostinger-websites.sh create payload.json
```

Patch a website:

```bash
bash scripts/hostinger-websites.sh patch website_id payload.json
```

Create a free subdomain:

```bash
bash scripts/hostinger-websites.sh free-subdomain
```

## Guardrails

- Never delete a website unless the user explicitly asks.
- Never switch a live domain before the new site is deployed.
- Prefer creating a new website or staging hostname before replacing production content.

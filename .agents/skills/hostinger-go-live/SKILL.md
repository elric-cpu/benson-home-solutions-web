---
name: hostinger-go-live
description: Orchestrate a Hostinger website launch from project build through domain cutover and verification. Use when the user wants to deploy a site to Hostinger and make it live on a custom domain.
---

# Hostinger Go Live

This skill coordinates the other Hostinger skills into a single launch workflow.

Use it for requests like:
- deploy this repo to my Hostinger domain
- make this website live on `example.com`
- connect the new Hostinger site to the production domain

## Skills To Chain

Use these in order:
1. `hostinger-mcp-setup`
2. `hostinger-website-deploy`
3. `hostinger-domain-dns`

## Required Inputs

Before acting, determine:
- target domain and whether `www` should redirect or resolve directly
- whether the site is static, PHP/Git-based, or Node.js-hosted
- whether this is a fresh launch or a migration from another provider
- whether the domain currently handles email

Reasonable defaults:
- manage both apex and `www`
- preserve all mail-related records
- use a staging hostname before production cutover when possible

## Workflow

### 1. Confirm Access

- Ensure `HOSTINGER_API_TOKEN` is present
- If direct Hostinger MCP access is desired, set it up first
- Stop immediately if authentication is missing

### 2. Inspect Current State

- List existing Hostinger websites
- Read the current DNS zone for the target domain
- Determine whether the domain is already attached to an existing Hostinger website
- Back up the current zone JSON before any mutation

### 3. Build And Deploy The Project

- Detect the deployment model from the repo
- Run the project build locally if needed
- Create a new Hostinger website or reuse the correct existing site
- Publish the build output or configure the Git/Node.js deployment target

Do not change production DNS until the site content is already available on its Hostinger target.

### 4. Plan The DNS Change

Decide the record strategy based on the hosting product:
- Hostinger website connection CNAME pattern
- Hostinger A + `www` CNAME pattern
- temporary verification TXT records

Preserve:
- MX
- SPF
- DKIM
- DMARC
- unrelated TXT verification records unless confirmed obsolete

### 5. Execute Cutover

- Apply the smallest possible zone update
- Validate the zone with the API
- Check hostname resolution after propagation begins
- Confirm TLS issuance or existing certificate coverage

### 6. Verify Live State

Do not call the launch complete until all of these are true:
- apex resolves to the intended target
- `www` behaves as intended
- the deployed site serves the expected content
- HTTPS works without certificate errors

### 7. Report Outcome

Return:
- target website selected or created
- DNS records changed
- any records intentionally preserved
- verification status
- rollback notes if cutover is incomplete

## Rollback Rule

If post-cutover verification fails and the issue is not immediately fixable, restore the prior DNS zone from the saved backup instead of leaving the domain partially broken.

## Templates

Use the bundled payload templates as starting points:
- `assets/create-website.payload.json`
- `assets/patch-website-domain.payload.json`
- `assets/free-subdomain.payload.json`

Adjust them to the active Hostinger plan and website type before use.

## Guardrails

- Never delete an existing website as part of a launch.
- Never wipe a DNS zone just to simplify the update.
- Never claim success before live hostname verification completes.

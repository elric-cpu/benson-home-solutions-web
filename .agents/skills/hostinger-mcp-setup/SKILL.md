---
name: hostinger-mcp-setup
description: Set up Hostinger MCP and API access for domains, DNS zones, and websites. Use when the user wants Codex to manage Hostinger domains, DNS, websites, or hosting resources directly.
---

# Hostinger MCP Setup

Use this skill before any Hostinger automation that depends on direct API or MCP access.

## When To Use

Trigger this skill when the user asks to:
- connect Codex to Hostinger
- manage Hostinger domains or DNS
- create or inspect Hostinger websites
- deploy a project to Hostinger with API-backed automation

## Current Access Pattern

Hostinger provides:
- a public API for domains, DNS zones, and websites
- an official MCP server package: `hostinger-api-mcp`

For Codex, prefer MCP when possible. Fall back to direct API calls when MCP is unavailable or too limited for the task.

## Required Secrets

Set the Hostinger API token in the shell before doing any API or MCP work:

```bash
export HOSTINGER_API_TOKEN='...'
```

Do not continue until the token is present.

## Codex MCP Setup

Add the MCP server:

```bash
codex mcp add hostinger -- npx -y hostinger-api-mcp
```

Pass the token to the MCP process with one of these approaches:

```bash
HOSTINGER_API_TOKEN='...' codex mcp add hostinger -- npx -y hostinger-api-mcp
```

Or, if Codex is already started from a shell with the variable exported, reuse that shell environment.

After adding the server, restart Codex before trying Hostinger MCP tools.

## Direct API Fallback

If MCP is not available, use HTTPS requests with:

```bash
Authorization: Bearer $HOSTINGER_API_TOKEN
Content-Type: application/json
```

Useful API areas:
- `/api/dns/v1/zones`
- `/api/hosting/v1/domains`
- `/api/hosting/v1/websites`

## Verification

After setup, verify access with one of:

```bash
curl -sS https://developers.hostinger.com/api/dns/v1/zones/example.com \
  -H "Authorization: Bearer $HOSTINGER_API_TOKEN"
```

```bash
curl -sS https://developers.hostinger.com/api/hosting/v1/websites \
  -H "Authorization: Bearer $HOSTINGER_API_TOKEN"
```

If the token is invalid or missing, stop and ask the user to fix auth before editing DNS or websites.

## Guardrails

- Never mutate DNS blindly. Read the current zone first.
- Never remove MX, SPF, DKIM, or verification records unless the user explicitly approves it.
- Prefer preview or staging domains before production cutover.
- When changing apex records, confirm whether email is hosted on the same domain.

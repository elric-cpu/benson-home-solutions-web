---
name: hostinger-domain-dns
description: Manage Hostinger domains and DNS zones, including ownership verification, cutover planning, and website go-live records. Use when the user wants to point a domain or subdomain at a Hostinger-hosted website.
---

# Hostinger Domain And DNS

This skill handles the domain side of launch: verify ownership, inspect the zone, update records safely, and validate before cutover.

## Prerequisites

- `HOSTINGER_API_TOKEN` must be set
- `jq` should be available for readable output
- Read current DNS before writing changes

## Common API Operations

Use the bundled helper:

```bash
bash scripts/hostinger-dns.sh get example.com
bash scripts/hostinger-dns.sh validate example.com
```

Or use direct API calls:

```bash
curl -sS "https://developers.hostinger.com/api/dns/v1/zones/example.com" \
  -H "Authorization: Bearer $HOSTINGER_API_TOKEN"
```

Endpoints this skill relies on:
- `GET /api/dns/v1/zones/{domain}`
- `PUT /api/dns/v1/zones/{domain}`
- `POST /api/dns/v1/zones/{domain}/validate`
- `DELETE /api/dns/v1/zones/{domain}`
- `POST /api/hosting/v1/domains/verify-ownership`

## Safe Workflow

1. Read the current zone and identify records that must be preserved.
2. Confirm whether mail is hosted on the domain.
3. Verify domain ownership if Hostinger requires it.
4. Apply the minimum record change set.
5. Validate the zone with the API.
6. Wait for propagation and then verify the website hostname resolves correctly.

## Website Connection Patterns

For Hostinger Website Builder or standard website connection flows, Hostinger commonly uses:

```text
CNAME @    connect.hostinger.com
CNAME www  connect.hostinger.com
```

Some setups use:

```text
A     @    34.120.137.41
CNAME www  connect.hostinger.com
```

Do not assume which pattern to use. Check the target product and use the record set shown in Hostinger for that site.

## Update Strategy

Prefer replacing only the records you intend to manage:
- `@`
- `www`
- deployment verification TXT records

Do not overwrite unrelated records in bulk unless the user explicitly asks to reset the zone.

## Cutover Guidance

- Lower TTL before planned cutover when possible.
- Preserve email records.
- If moving only the website, keep MX, SPF, DKIM, DMARC, and third-party TXT records intact.
- Validate first, then announce cutover complete only after hostname resolution matches the intended target.

## Helper Usage

Read zone:

```bash
bash scripts/hostinger-dns.sh get example.com
```

Validate zone:

```bash
bash scripts/hostinger-dns.sh validate example.com
```

Replace the full zone from a JSON file:

```bash
bash scripts/hostinger-dns.sh put example.com records.json
```

Verify ownership:

```bash
bash scripts/hostinger-dns.sh verify-ownership example.com
```

## Guardrails

- Stop if the zone contains business-critical records you cannot explain.
- Stop if the user wants production cutover but there is no rollback plan.
- Treat cross-provider DNS migrations as high risk and preserve a backup of the current zone JSON first.

# Benson Home Solutions - Project Manifest

This document records the repo-owned orchestration layer and the external skill dependencies the project expects to be available.

## 1. Primary Agent

- `gemini`: the project’s main search, growth, and implementation agent, defined in [agents.toml](/srv/new/benson-home-solutions-web/agents.toml).

## 2. Workflow Commands

### Repo Commands
- `audit` – runs the full search/audience workflow described in `commands.toml`.
- `geo-fix` – rewrites a single page for AI citations plus optional schema.
- `conversion-audit` – combines analytics review, page/form inspection, and copy fixes.
- `hostinger-launch` – orchestrates Hostinger access, deployment, release, DNS, and go-live.
- `implement-feature` – picks the right process workflow (brainstorm → plan → execute) for a scoped change.
- `autopush`

### GitHub Commands
- `gemini-invoke`
- `gemini-plan-execute`
- `gemini-review`
- `gemini-scheduled-triage`
- `gemini-triage`

## 3. Shared Skill Dependencies

The project consumes shared skills pinned in [skills-lock.json](/srv/new/benson-home-solutions-web/skills-lock.json) instead of vendoring copies in the repository.

### Search Stack
- `audit-website`
- `seo-audit`
- `seo-geo`
- `schema-markup`
- `programmatic-seo`

### Growth and CRO
- **Workflows:** `/conversion-audit` (Conversion Optimization Playbook) and `/audit` + `/geo-fix` (Demand Generation Strategy) orchestrate the following shared skills:
  - `analytics-tracking`
  - `page-cro`
  - `form-cro`
  - `copywriting`
  - `marketing-ideas`
  - `marketing-psychology`
  - `competitor-alternatives`
  - `referral-program`
  - `free-tool-strategy`

### Hostinger Delivery
- `hostinger-mcp-setup`
- `hostinger-website-deploy`
- `hostinger-deploy-and-test`
- `hostinger-domain-dns`
- `hostinger-go-live`

### Development Workflow
- `brainstorming`
- `executing-plans`
- `subagent-driven-development`
- `next-best-practices`
- `self-improving-agent`

### Utility
- `elevenlabs-tts`

## 4. Supporting Docs

- [SKILLS_OVERVIEW.md](/srv/new/benson-home-solutions-web/SKILLS_OVERVIEW.md)
- [ORCHESTRATION.md](/srv/new/benson-home-solutions-web/ORCHESTRATION.md)
- [TOOLS.md](/srv/new/benson-home-solutions-web/TOOLS.md)
- [AGENTS.md](/srv/new/benson-home-solutions-web/AGENTS.md)

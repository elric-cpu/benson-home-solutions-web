# Tools

This document catalogs the slash commands defined in `commands.toml` plus the automation workflows they trigger. Each command maps to a curated sequence of shared skills so you can ask for a complete workflow instead of invoking the skills manually.

## 1. `/audit`
- **Purpose:** Run the full search workflow (technical audit, strategic SEO review, GEO/AEO readiness, schema gaps, and conversion priorities).
- **Sequence:** `audit-website` → `seo-audit` → `seo-geo` → `schema-markup` (if schema gaps exist) → `page-cro`.
- **Output:** Ranked list of technical/strategic/GEO findings, affected files/pages, fix recommendations, and the best next action for the coming week.

## 2. `/geo-fix`
- **Purpose:** Refresh a single page or document for better answer-engine citation, definition blocks, and schema.
- **Sequence:** `seo-geo` → `copywriting` rewrite → `schema-markup` (FAQ/HowTo/LocalBusiness) → optional `page-cro`.
- **Output:** Rewritten copy, new meta/schema recommendations, and rationale for each improvement.

## 3. `/conversion-audit`
- **Purpose:** Diagnose conversion blockers across instrumentation, page structure, forms, and copy.
- **Sequence:** `analytics-tracking` → `page-cro` → `form-cro` (if forms exist) → `copywriting`.
- **Output:** Top conversion issues, missing analytics/events, copy/UX fixes, and a short experiment list to run next.

## 4. `/hostinger-launch`
- **Purpose:** Orchestrate Hostinger MCP setup, website creation, Node artifact release, DNS planning, and go-live coordination without running each skill manually.
- **Sequence:** `hostinger-access-setup` → `hostinger-website-deploy` → `hostinger-node-release` → `hostinger-domain-dns` → `hostinger-go-live`.
- **Output:** Current launch state, blockers/missing prerequisites, next deployment or DNS step, and required validation checks before production cutover.

## 5. `/implement-feature`
- **Purpose:** Decide the right implementation workflow (brainstorm, plan, parallel execution, or sequential run) when a change is scoped but the right path is unclear.
- **Sequence:** Chooses among `brainstorming`, `writing-plans`, `subagent-driven-development`, `executing-plans`, and `next-best-practices` based on task scope.
- **Output:** Chosen workflow with justification, first concrete step, and prerequisites/files to inspect.

## 6. Supporting Scripts
Some slash commands may rely on project scripts (e.g., `scripts/check-hostinger-artifact.sh`, `scripts/smoke-test-hostinger.sh`). Refer to the workflow doc or command prompt when a script is mentioned to understand the input/output expectations.

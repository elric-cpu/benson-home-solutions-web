# Orchestration and Workflows

This document explains the workflow bridges between user requests, slash commands, and the shared skills that the `gemini` agent orchestrates.

## 1. Marketing + Conversion Workflow

Use this sequence when you need better results from SEO, messaging, or landing-page conversions.

1. **Start with `/audit`** to run the search workflow (technical + strategic + GEO + schema + page signal). It chains `audit-website`, `seo-audit`, `seo-geo`, `schema-markup`, and `page-cro` in that order.
2. **Trigger `/conversion-audit`** when you specifically want conversion lift for a page or funnel step. It walks through instrumentation gaps (`analytics-tracking`), page structure (`page-cro`), form friction (`form-cro`), and copy improvement (`copywriting`), all while logging the experiments to try next.
3. **Fire `/geo-fix`** when a single page needs richer citations—`seo-geo` identifies weak definition blocks, and `copywriting` plus `schema-markup` execute the rewrite.
4. **Follow the Demand Generation and Conversion Optimization skills** documented in `SKILLS_OVERVIEW.md` whenever you need a prebuilt strategy that spans measurement, idea generation, competitor comparison, referral planning, and CTA experiments.

Always return: top blockers, instrument gaps, highest-leverage messaging or UX changes, and a short experiment list.

## 2. Hostinger Launch Workflow

Use `/hostinger-launch` to orchestrate Hostinger launches. The slash command calls `hostinger-access-setup`, `hostinger-website-deploy`, `hostinger-node-release`, `hostinger-domain-dns`, and `hostinger-go-live` (in that order) so you don’t have to call each manually.

Before starting, confirm:

- Environment tokens (`HOSTINGER_API_TOKEN`) exist, and MCP access has been configured.
- The deployment artifact or Git repo is ready (for Node.js or static sites).
- You understand the DNS cutover impact (mail records, TTL, rollback plan).

The command returns the current launch state, any missing prerequisites, the next action, and the validation checks before production cutover.

## 3. Development Process Workflow

Primary workflow for scoped implementations:

- `brainstorming` → `writing-plans` → `subagent-driven-development` (parallel tasks) → `finishing-a-development-branch`.
- Run `/implement-feature` when the scope is clear but you are unsure which path to choose; it recommends one of the above tools based on granularity.
- Use `executing-plans` only when the plan is inherently sequential.
- Consult `next-best-practices` when touching App Router boundaries, metadata, async routing, or React rendering guidance.

## 4. Slash Command Behavior

- `/audit` → marketing/audience/SEO review.
- `/conversion-audit` → conversion instrumentation & copy/UX rewrite.
- `/geo-fix` → citation-rich rewrite plus optional schema.
- `/hostinger-launch` → entire Hostinger launch orchestrated.
- `/implement-feature` → picks and runs the correct process workflow for your task.

Each command returns a concise set of outcomes: what ran, what still needs doing, and what to report back to stakeholders.

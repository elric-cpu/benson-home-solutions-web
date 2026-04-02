# Skills Overview

This document summarizes the high-level skills that the `gemini` agent triggers when you ask for marketing, CRO, deployment, or process support. We rely on shared catalog skills (pinning lives in `skills-lock.json`) and layer lightweight workflows/commands that link them together.

## 1. SEO & Auditing
- **`audit-website`** – automated technical checks (links, performance, accessibility, schema). Use via `/audit`.
- **`seo-audit`** – strategic content reviews focused on intent, cannibalization, and authority gaps.
- **`seo-geo`** – GEO/AI search readiness, definitions, citations, and schema prompts.
- **`programmatic-seo`** – scale template-driven local/service pages with data-backed structure.
- **`schema-markup`** – add or verify JSON-LD for articles, FAQs, HowTo, LocalBusiness, and product content.

## 2. Growth & Conversion
- **`demand-generation-strategy`** (consolidated mix of `analytics-tracking`, `marketing-ideas`, `marketing-psychology`, `competitor-alternatives`, `free-tool-strategy`, and `referral-program`) – measure performance, brainstorm new offers, and vet messaging through a single storytelling block. Launch it with `/conversion-audit` or `/audit` when you want a holistic review of the funnel.
- **`conversion-optimization-playbook`** (merged `copywriting`, `page-cro`, `form-cro`, and target copy/form experiments) – diagnose high-friction CTAs and rebuild landing/form copy with clear experiments. It drives the `/conversion-audit` workflow that instruments, analyzes, and rewrites in one loop.

## 3. Hostinger Deployment
- **`hostinger-access-setup`** (formerly `hostinger-mcp-setup`) – establishes MCP/API connectivity and verifies tokens before any launch.
- **`hostinger-website-deploy`** – creates/inspects Hostinger website targets, chooses static/Git/Node flows, and publishes build output.
- **`hostinger-node-release`** (formerly `hostinger-deploy-and-test`) – deploys the artifact, runs staging smoke tests, and keeps the cutover checklist.
- **`hostinger-domain-dns`** – inspects and mutates DNS safely, preserving MX/SPF/DKIM and validation.
- **`hostinger-go-live`** – orchestrates the entire launch by chaining the above skills. Execute with `/hostinger-launch`.

## 4. Development Process
- **`brainstorming`** – design the change via structured questions before you touch code.
- **`writing-plans`** – translate the approved design into a step-by-step plan.
- **`subagent-driven-development`** – execute independent tasks in parallel with spec/quality reviews.
- **`executing-plans`** – sequential execution for tight, single-threaded changes.
- **`next-best-practices`** – Next.js-specific guardrails for routing, metadata, rendering, and performance.
- **`implement-feature`** (slash command) picks the best flow above depending on scope and wires it to the automation scripts.

## 5. Utilities
- **`elevenlabs-tts`** – convert text-based messaging or walkthroughs into high-fidelity voiceovers.

The new workflows above replace the older per-skill invocations; use `/audit`, `/geo-fix`, `/conversion-audit`, `/hostinger-launch`, or `/implement-feature` to trigger the appropriate sequence of shared skills automatically.

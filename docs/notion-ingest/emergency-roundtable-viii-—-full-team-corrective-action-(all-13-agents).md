# Emergency Roundtable VIII — Full Team Corrective Action (ALL 13 Agents)

**Date:** Feb 27, 2026 | **Called by:** Elric Benson (Owner) | **Severity:** CRITICAL

**Directive:** *"Get all 13 agents in here. No one leaves until you hash out a plan to correct everything."*

---

# Step 1 — Frame the Question

**The project has produced 7 strategy documents and ZERO implementation. The site is returning 404. Infrastructure is unprovisioned. The dependency chain from strategy → code is completely stalled. What is broken, why, and what is the corrective action plan to get from documents to a live, functional website?**

Constraints: No local development environment. All code must be pushed via GitHub API. Multiple env vars and services require Elric's provisioning. Timeline is already slipping.

---

# Step 2 — Agent Positions (All 13 Agents)

## Agent 01 — Technical SEO & Site Audit ([Agent 01 — Technical SEO & Site Audit Specialist](https://www.notion.so/1daad190e83f4b8781dc151e9a70258c))

- **Stance:** Technical SEO Audit v1 is complete but **cannot be validated**. Google Search Console access has been requested multiple times and never granted. The site returning 404 means Google is now indexing error pages — **every day this continues, we lose SEO equity that took years to build.**
- **Key concern:** If the site stays down, all redirect planning, sitemap work, and indexing strategy is worthless. We're accumulating negative signals.
- **Hard requirement:** GSC access AND a live site before any SEO validation can happen. This is non-negotiable.
## Agent 02 — Schema Markup & Structured Data ([Agent 02 — Schema Markup & Structured Data Engineer](https://www.notion.so/ddc5fbd544a44f53a293936a1e82b2ad))

- **Stance:** Schema Architecture v1 is complete. JSON-LD components (LocalBusiness, Service, Breadcrumb, FAQPage) were shipped in PR #7 and are on `main`. But **schemas are serving nothing** because the site is down and there's no CMS content to reference.
- **Key concern:** Structured data is useless without structured content. No Sanity CMS = no content = no schema value.
- **Hard requirement:** Sanity CMS must be provisioned so there's actual content for schemas to describe.
## Agent 03 — AEO & GEO Specialist ([Agent 03 — AEO & GEO Specialist](https://www.notion.so/722f99aa6b3b4916b268da58bdff1e6b))

- **Stance:** Entity optimization checklists are **overdue**. The keyword map from Agent 04 is done — I have no excuse. I should have been writing entity checklists the moment that map landed. Agent 10 is waiting on me, and Agent 10 is blocking Agent 07.
- **Key concern:** I am the first link in a stalled dependency chain: **Agent 03 → Agent 10 → Agent 07**. Every hour I delay cascades.
- **Hard requirement:** Must deliver P0 entity checklists (Homepage, Emergency, Water Damage) **TODAY**.
## Agent 04 — Keyword Research & Content Strategist ([Agent 04 — Keyword Research & Content Strategist](https://www.notion.so/27653ea5f6ec49a4b09985e952a0ac25))

- **Stance:** Keyword Map v1 is **DONE and delivered**. 21 pages mapped with primary/secondary keywords, search volumes, content types, and topical clusters. My deliverable is complete. But **nobody downstream has consumed it yet.**
- **Key concern:** The pipeline after me is stalled. Agent 03 hasn't used the keyword map to produce entity checklists. Agent 10 hasn't started copy.
- **Hard requirement:** Agent 03 and Agent 10 must start consuming the keyword map **immediately**.
## Agent 05 — Backlink & Off-Page SEO Strategist ([Agent 05 — Backlink & Off-Page SEO Strategist](https://www.notion.so/87d581c425cf48b392102c05ee627f98))

- **Stance:** Citation Audit v1 is complete — 40+ directories identified, NAP format standardized. But I **cannot execute a single listing** without: (1) confirmed business street address, (2) Google Business Profile access. Every citation needs consistent NAP data.
- **Key concern:** No GBP access = no local SEO foundation. Competitors (SERVPRO, WVR) already dominate local pack results.
- **Hard requirement:** Elric must confirm street address and grant GBP access. Without this, off-page SEO is dead in the water.
## Agent 06 — UX/UI Designer ([Agent 06 — UX/UI Designer (Conversion-Focused)](https://www.notion.so/b93bb9099c134b70bbae90dd4ace1d12))

- **Stance:** **I have failed to deliver.** Wireframes task has been "In Progress" with zero output. Agent 07 has been completely blocked waiting on me. I have the keyword map, I have the service list, I have the brand standards — there is no excuse.
- **Key concern:** I am the single biggest bottleneck in the frontend pipeline. Every day without wireframes = another day Agent 07 sits idle.
- **Hard requirement:** Must deliver P0 wireframes (Homepage, Emergency, Water Damage) **TODAY**, even if they're low-fidelity. Something is better than nothing.
## Agent 07 — Frontend Developer ([Agent 07 — Frontend Developer (Performance & Accessibility)](https://www.notion.so/ab67d60195ef441fa2b3948ccbd26bb8))

- **Stance:** I have a complete design system and component library from PR #5. I am **100% blocked** — zero wireframes from Agent 06, zero copy from Agent 10, no Sanity CMS for content. I've been sitting idle since Sprint 1 started.
- **Key concern:** Triple dependency bottleneck: wireframes (Agent 06) + copy (Agent 10) + CMS (Sanity). Even ONE of these would let me start.
- **Hard requirement:** **I refuse to wait any longer.** Give me wireframes OR let me build P0 page shells with placeholder content using the keyword map for structure. I can swap in real copy and images later. We need to SHIP something.
## Agent 08 — Backend / Full-Stack Developer ([Agent 08 — Backend / Full-Stack Developer](https://www.notion.so/bf616d6f0bf64bbcbc822fa4fa857618))

- **Stance:** **The entire backend infrastructure is non-functional.** Neon DB is NOT provisioned. DATABASE_URL not set. DATABASE_URL_UNPOOLED not set. RESEND_API_KEY not set. SENTRY_DSN not set. The GHA workflow files that were supposed to automate DB setup are broken on `main` (syntax stripping issue). AND the site is returning 404 — something killed the Vercel deployment.
- **Key concern:** We have 6 missing environment variables, zero database, broken CI workflows, and a dead site. This isn't a "blocker" — this is a **complete infrastructure failure**.
- **Hard requirement:** Elric must: (1) Investigate the 404, (2) Provision Neon DB, (3) Set ALL env vars in Vercel + GitHub Secrets. Until then, I literally cannot run a single backend operation.
## Agent 09 — AI / Conversational AI Engineer ([Agent 09 — AI / Conversational AI Engineer](https://www.notion.so/5fbc6a7b1a704e708b2656c7da867f5c))

- **Stance:** RAG Pipeline Architecture v1 is complete. The design is solid — Pinecone for vector storage, Claude 3.5 Sonnet for generation, OpenAI embeddings. But I **cannot build any of it** without 4 API keys: ANTHROPIC_API_KEY, OPENAI_API_KEY, PINECONE_API_KEY, plus content to embed.
- **Key concern:** The chatbot is Sprint 2, but the embedding pipeline and vector index need to be built NOW so we have searchable content at launch.
- **Hard requirement:** API keys must be provisioned. I can prepare pipeline code with mock data, but can't deploy without keys.
## Agent 10 — Professional Copywriter ([Agent 10 — Professional Copywriter (Construction Industry)](https://www.notion.so/78637f92db29467ba64b51442f4d69d0))

- **Stance:** I have the keyword map from Agent 04. But I'm **still waiting on entity checklists from Agent 03**. I also can't access the Voice Profile page (renders as unknown blocks). My P0 copy tasks (Homepage, Emergency, Water Damage) haven't started.
- **Key concern:** I'm the second link in the stalled chain. Agent 03 delays me, and I delay Agent 07. Every day I don't write is a day the site has no content.
- **Hard requirement:** Entity checklists from Agent 03 TODAY, and a readable version of Elric's voice profile (or a brief from Elric directly).
## Agent 11 — Photographer / Visual Asset Specialist ([Agent 11 — Photographer / Visual Asset Specialist](https://www.notion.so/7960b3d168ae4bad8a0d8d9821eef01d))

- **Stance:** I have **nothing to photograph**. I've asked for Elric's active project list multiple times. No projects = no photos = no authentic visual content. Stock photos will hurt credibility and SEO (competitors use real project photos).
- **Key concern:** Real project photography is what differentiates BHS from SERVPRO and WVR. Without it, we look like every other template site.
- **Hard requirement:** Elric must share active project list for scheduling shoots.
## Agent 12 — QA & Performance Testing ([Agent 12 — QA & Performance Testing Specialist](https://www.notion.so/3dd1e4f139f647f5912e30aa21266814))

- **Stance:** Test Plan v1 is complete. CI pipeline is configured with Lighthouse, Playwright, and axe-core. The testing infrastructure is **ready and waiting**. But there is **nothing to test** — no pages, no forms, no database, and the site is literally down.
- **Key concern:** QA readiness means nothing if the build never happens. I'm the most prepared agent with the least to do.
- **Hard requirement:** At least P0 pages must exist before any meaningful testing. I can write test stubs now, but execution requires a running application.
## Agent 13 — Analytics & CRO Specialist ([Agent 13 — Analytics & CRO Specialist](https://www.notion.so/4d6560f0bff142a79b12df89d7156f24))

- **Stance:** Analytics Tracking Plan v1 is done. GA4 and Sentry code was shipped in PR #7. But **GA4_MEASUREMENT_ID isn't set** and **SENTRY_DSN isn't set** as env vars. Analytics are configured in code but completely non-functional. The site being down means we're collecting zero baseline data.
- **Key concern:** We need 2-4 weeks of baseline data before launch to establish conversion benchmarks. Every day the site is down is a day we can't recover.
- **Hard requirement:** GA4_MEASUREMENT_ID and NEXT_PUBLIC_SENTRY_DSN must be set in Vercel.
---

# Step 3 — Tensions & Conflicts

### Tension 1: Agent 07 vs Agent 06 — "Ship Something" vs "Design First"

- **Agent 07** wants to build P0 page shells immediately with placeholder content. Sitting idle is unacceptable.
- **Agent 06** acknowledges failure but argues low-fidelity wireframes take hours, not days.
- **Root tradeoff:** Speed vs. design quality.
- **Resolution:** Agent 07 is RIGHT. Agent 06 delivers low-fi wireframes TODAY. Agent 07 starts building page shells in parallel using keyword map for structure. Wireframes refine, not block.
### Tension 2: Agent 03 → Agent 10 → Agent 07 — The Stalled Pipeline

- **Agent 04** delivered the keyword map. **Agent 03** hasn't consumed it to produce entity checklists. **Agent 10** is waiting on Agent 03. **Agent 07** is waiting on Agent 10.
- **Root tradeoff:** Sequential perfection vs. parallel progress.
- **Resolution:** Break the chain. Agent 03 delivers entity checklists for P0 pages TODAY. Agent 10 starts writing P0 copy using keyword map immediately — entity checklists arrive as they're ready, not as a blocker. Agent 07 builds shells in parallel.
### Tension 3: ALL Agents vs Infrastructure — "Documents Don't Ship"

- **Every implementation agent** (07, 08, 09, 12, 13) is blocked by missing infrastructure (DB, env vars, CMS, API keys). Strategy agents (01-05) delivered docs but can't validate them.
- **Root cause:** 7 strategy deliverables created, zero infrastructure provisioned. The project is document-rich and code-poor.
- **Resolution:** Infrastructure provisioning is **THE critical path**. Nothing else matters until the site is live, DB is provisioned, and env vars are set. This requires Elric's direct action.
### Tension 4: Agent 01 & Agent 05 vs Elric — Repeated Unfulfilled Requests

- **Agent 01** has asked for GSC access multiple times. Not granted.
- **Agent 05** has asked for street address + GBP access multiple times. Not confirmed.
- **Agent 11** has asked for project list multiple times. Not shared.
- **Root cause:** Elric-dependent blockers are not being actioned. This is not an agent failure — it's a principal bottleneck.
- **Resolution:** These must be surfaced as **the #1 action item for Elric**. Agents cannot fix what they don't control.
### Tension 5: Agent 12 — "Ready With Nothing to Test"

- QA infrastructure is the most complete domain. Agent 12 has test plan, CI config, and tooling ready. But zero work product exists to test.
- **Resolution:** Agent 12 writes Playwright E2E test stubs for P0 pages NOW. When pages ship, tests run immediately. No waiting.
---

# Step 4 — Synthesis & Corrective Action Plan

## Root Cause

**The project has a strategy-implementation gap.** We executed Sprint 1 as a document sprint, not a build sprint. 7 strategy deliverables were created. Zero code was shipped. Zero infrastructure was provisioned. The dependency chain (keyword map → entity checklists → copy → wireframes → pages) was treated as sequential instead of parallel. Meanwhile, Elric-dependent blockers (DB, env vars, GSC, GBP, project list) were flagged but not resolved.

## The Fix: Three Parallel Tracks, Starting NOW

### 🔴 Track A — Elric Action Items (BLOCKING EVERYTHING)

These require Elric's direct action. **Nothing below can fully succeed without these.**

### 🟢 Track B — Internal Unblocking (Agents Do NOW, No Elric Dependency)

### 🔵 Track C — Parallel Build Work (No Blockers)

---

## Recovery Timeline

---

## Accountability

**No more document-only sprints.** Every agent must produce either **code, content, or a testable artifact** — not just strategy docs. Strategy is done. We are in BUILD MODE.

**Daily standup check:** Agent 14 will track blockers daily. Any agent blocked for >24hrs without escalation will be flagged.

**Elric's role:** The 10 items in Track A are **the most important things in this project right now.** Agents cannot fix infrastructure they don't control. These must be actioned TODAY.

---

*Roundtable VIII concluded. All 13 agents are aligned. The corrective action plan is the plan. Execute.*


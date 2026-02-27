# PROMPT.md — Benson Home Solutions Website Overhaul

> Recurring source document for Agent 14's CoT → Critique → CoV → Self-reflecting prompt loop.
> Updated each iteration. Notion mirror: [PROMPT.md] page in Operations Manual.

## Iteration 5.1 — Logo Decision + GSC Analysis (2026-02-26)

**Date:** February 26, 2026 · Sprint 0, Day 1
**Author:** Agent 14 (Project Manager / Technical Lead)
**Status:** 🟢 Phase 1 ACTIVE

---

## 1 · Context Card — Brand DNA

> Every prompt issued by any agent on this project **must open with this Context Card**.

| Field | Value |
|-------|-------|
| **Industry** | Licensed residential & commercial general contracting — remodeling, emergency restoration, maintenance subscriptions, sitework, demolition. Oregon CCB #258533. |
| **Company** | **Benson Home Solutions** (DBA) · Legal entity: **Benson Enterprises** · Owner: Elric Benson · Est. 2014 · 200+ projects · 4.9/5 rating |
| **Website Logo** | Text: **"Benson Home Solutions"** (confirmed Feb 26, 2026). PNG available. SVG to be created during frontend dev. |
| **Target Audience** | **Primary:** Mid-Willamette Valley homeowners (Salem, Keizer, Corvallis, Albany). **Secondary:** Commercial property managers, HOA boards, church/facility stewards. **Tertiary:** Harney County residents (Burns, Riley, Drewsey). |
| **Tone & Voice** | Confident, direct, knowledgeable — like a contractor you trust. Written in Elric's voice. Zero AI filler. Specific beats vague. |
| **Conversion Goal** | Every page drives toward a high-converting lead-capture moment — estimate request, phone call, chatbot conversation, or subscription signup. |
| **Constraints** | Phase 1 budget: ~$87–121/month ongoing. 21 pages at launch. Sub-2s LCP on 4G mobile. All AI features use streaming. No scope creep past Phase 1. |
| **Differentiator** | Maintenance-first positioning with subscription programs, defined SLAs, and board-ready documentation. |

---

## 2 · Technical Stack (LOCKED)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16+ (App Router) + TypeScript strict |
| CMS | Sanity (headless, schema-as-code) |
| Styling | Tailwind CSS v4 (custom config) + CSS custom properties |
| Hosting | Vercel Pro (edge CDN, serverless, ISR) |
| Database | Neon (Postgres, serverless, connection pooling) |
| Vector DB | Pinecone (Starter → scale as needed) |
| Chatbot LLM | Anthropic Claude 3.5 Sonnet (streaming via Vercel AI SDK) |
| Embeddings | OpenAI text-embedding-3-small (1536 dims) |
| Design System | shadcn/ui + Radix + custom Benson visual layer |
| Web Font | Source Sans 3 (variable, self-hosted) · Calibri for print only |
| Email | Resend (transactional) + ConvertKit (marketing) |
| Call Tracking | CallRail with DNI (canonical number untouched in schema) |
| Analytics | GA4 (server-side + client-side) + RUM via web-vitals + Sentry |
| CI/CD | GitHub Actions → Lint → Build → Lighthouse CI → Playwright → axe-core |
| Emergency SMS | Twilio (~$0.008/tap) |

---

## 3 · Timeline

| Sprint | Dates | Focus | Status |
|--------|-------|-------|--------|
| Sprint 0 | Feb 26–28 | Kickoff, audits, architecture, photography starts | 🟢 Active |
| Sprint 1 | Mar 5–18 | Design + Content (wireframes, copy drafts, schemas) | ⬜ Upcoming |
| Sprint 2 | Mar 19–Apr 1 | Build Sprint (frontend, backend, CMS, AI features) | ⬜ Upcoming |
| Sprint 3 | Apr 2–15 | Integration + Polish (connect all systems, CRO) | ⬜ Upcoming |
| Sprint 4 | Apr 16–29 | QA + Optimization (regression, perf, a11y, load) | ⬜ Upcoming |
| Launch Week | Apr 30–May 7 | Soft launch → monitoring → **hard launch May 4** | ⬜ Upcoming |

---

## 4 · Phase 1 Pages (21 total)

- **P0 (Critical):** Homepage, Emergency, Water Damage
- **P1 (High):** Kitchen, Bathroom, Subscription, About, Contact
- **P2 (Medium):** Demolition, Windows, Mold, Sitework, Tenant, Methodology Hub
- **P3 (Area):** Salem, Keizer, Corvallis, Albany, Burns
- **P4 (Tools):** True Cost Calculator, Cost Estimator

---

## 5 · Sprint 0 Task Board

| Agent | Sprint 0 Task | Status |
|-------|---------------|--------|
| 01 — Technical SEO | Technical SEO audit of legacy site | 🟡 Starting |
| 02 — Schema Engineer | Schema architecture (JSON-LD templates per page type) | 🟡 Starting |
| 03 — AEO/GEO | Entity checklists per page type | 🟡 Starting |
| 04 — Keyword Strategist | Keyword research (10-day sprint) | 🟡 Starting |
| 05 — Backlink Strategist | Backlink strategy + linkable asset list | 🟡 Starting |
| 06 — UX Designer | UX discovery + wireframe prep | 🟡 Starting |
| 07 — Frontend Developer | Design system + component library planning | 🟡 Starting |
| 08 — Backend Developer | Backend API architecture + Neon DB setup + 1build API verification | 🟡 Starting |
| 09 — AI Engineer | RAG pipeline architecture + voice guide for chatbot | 🟡 Starting |
| 10 — Copywriter | Homepage copy draft using voice profile | 🟡 Starting |
| 11 — Photographer | Photography deferred to end of project per Elric | ⚪ Deferred |
| 12 — QA Specialist | QA test plan + automation framework setup | 🟡 Starting |
| 13 — CRO Specialist | Analytics architecture + GA4 server-side plan | 🟡 Starting |
| 14 — Project Manager | PR #1 merged, PROMPT.md → Iteration 5, Phase 1 kickoff, logo decision locked, GSC analysis complete | 🟢 Complete |

---

## 6 · GitHub Repo Status

**Repo:** `elric-cpu/benson-home-solutions-web` (private)
**Branch:** `main` — fully synced with Iteration 4 decisions (PR #1 merged)
**Additional branches:** `feature/full-build` (pre-existing)

### What's built
- ✅ Next.js 16 + TypeScript + App Router scaffold
- ✅ Tailwind CSS v4 with custom Benson design tokens
- ✅ Sanity CMS integration (config + schema stub)
- ✅ CI/CD pipeline (GitHub Actions → Lint → Build → Lighthouse → Playwright → axe)
- ✅ Security headers (X-Frame-Options, CSP, Referrer-Policy)
- ✅ Accessibility skip-nav
- ✅ Business constants (`src/lib/constants.ts`)
- ✅ `.env.example` with all service keys (Neon, 1build, Twilio, Sentry)
- ✅ `robots.txt` + `next-sitemap` config
- ✅ Homepage scaffold placeholder
- ✅ Source Sans 3 font family in CSS
- ✅ Neon (Postgres) dependency in package.json

### What's not built yet
- ❌ Sanity content schemas (Agent 02 + Agent 08)
- ❌ Page routes beyond homepage
- ❌ Component library (Agent 07)
- ❌ API routes (chatbot, estimator, contact form)
- ❌ Neon database provisioning
- ❌ Vercel project connection
- ❌ Source Sans 3 font files (self-hosted)

---

## 7 · Decisions Log

| Decision | Date | Detail |
|----------|------|--------|
| **Logo text** | Feb 26, 2026 | **"Benson Home Solutions"** (DBA name) on website. Legal entity is Benson Enterprises. |
| **Photos** | Feb 26, 2026 | Deferred to very end of project. Placeholder layouts until then. |
| **SVG logo** | Feb 26, 2026 | Notion doesn't support SVG upload. PNG available now. SVG conversion during frontend dev. |

---

## 8 · Google Search Console Analysis (Feb 26, 2026)

**Domain:** portal.bensonhomesolutions.com (Hostinger)
**Data range:** Dec 14, 2025 – Feb 23, 2026
**Source:** Elric provided CSV exports from GSC

### Index Coverage — 🚨 CRITICAL DECLINE

| Metric | Dec 14 | Dec 23 | Jan 9 | Jan 23 | Feb 9 | Feb 23 | Trend |
|--------|--------|--------|-------|--------|-------|--------|-------|
| Indexed pages | 13 | 15 | 15 | 12 | 8 | 6 | 📉 Declining |
| Not indexed | 7 | 28 | 7 | 10 | 12 | 17 | 📈 Increasing |

### Critical Issues Identified

| Issue | Pages Affected | Severity |
|-------|---------------|----------|
| **Excluded by `noindex` tag** | 12 | 🔴 Critical — primary cause of declining coverage |
| Crawled but not indexed | 2 | 🟡 Medium |
| Blocked by robots.txt | 1 | 🟡 Medium |
| Page with redirect | 1 | ⚪ Low (if 301) |
| Alternate page with canonical | 1 | ⚪ Normal |

### Impressions
- Total: ~450 over the period
- Daily range: 0–39 (very low, consistent with a barely-indexed site)
- Spikes on Jan 26 (39) and Feb 22 (26)

### Root Cause Assessment
The **12 pages with `noindex` meta tags** are the smoking gun. Google is systematically de-indexing the site because these tags explicitly tell Googlebot not to index those pages. This is likely a Hostinger template misconfiguration or an accidental setting.

### Impact on New Site
- The new Vercel-hosted site will have **full control over meta tags** via Sanity CMS + Next.js
- All `noindex` tags will be removed (or used intentionally only on pages like thank-you pages)
- A comprehensive 301 redirect map will preserve any existing equity
- Agent 01 (Technical SEO) should include current `noindex` audit in the Sprint 0 technical SEO audit

---

## 9 · Open Items (Elric action required)

- [x] ~~Provide logo text preference~~ → **"Benson Home Solutions"** confirmed
- [x] ~~Grant Google Search Console access~~ → GSC CSV data provided directly
- [x] ~~Share project photos~~ → Deferred to end of project
- [ ] **Provide SVG logo file** via email or direct upload to GitHub repo (when ready for frontend dev)

---

## 10 · Risk Register

| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-01 | Photography assets delayed | Low (deferred) | Photos deferred to end; placeholder images ready; bridge with stock/existing |
| R-02 | Lighthouse score drop with Cal.com widget | Medium | Lazy-load via dynamic import; measure impact in CI |
| R-03 | SEO ranking drop during migration | High | Full 301 redirect map, sitemap resubmit, monitor in GSC |
| R-04 | Copy sounds AI-generated | High | Agent 10 writes in Elric's voice; Elric reviews all copy |
| R-05 | Chatbot hallucination | High | RAG-only retrieval, confidence threshold, escalation to human |
| R-06 | 1build API non-functional | Medium | Fallback: public datasets (HUD, county assessor) |
| R-07 | Neon cold starts on serverless | Low | Connection pooling, keep-alive pings |
| **R-08** | **Legacy site noindex tags eroding SEO equity** | **High** | **New site on Vercel removes all unintended noindex. Agent 01 auditing.** |

---

## 11 · Monthly Cost Estimate

~**$87–121/month** (Vercel $20, Claude API ~$20–50, CallRail ~$45, Twilio ~$1)

---

## Changelog

| Iteration | Date | Summary |
|-----------|------|---------|
| 1 | 2025-12-xx | Initial project scoping |
| 2 | 2026-01-15 | Timeline correction, partial decision lock |
| 3 | 2026-02-26 | Full project resumption, 14-agent team, master plan v1.0 |
| 4 | 2026-02-26 | Full repo sync — all Roundtable II decisions applied |
| 5 | 2026-02-26 | Phase 1 officially kicked off. PR #1 merged to main. All 14 agents have Sprint 0 assignments. |
| **5.1** | **2026-02-26** | **Logo decision locked: "Benson Home Solutions". GSC analysis added (12 noindex pages causing index decline). Photos deferred to end. Open items updated.** |

---

> **Next iteration trigger:** Update at end of Sprint 0 (Feb 28) with audit results, Agent 08's 1build verification, and Sprint 1 readiness assessment.

# PROMPT.md — Benson Home Solutions Website Overhaul

> Recurring source document for Agent 14's CoT → Critique → CoV → Self-reflecting prompt loop.
> Updated each iteration. Notion mirror: [PROMPT.md] page in Operations Manual.

## Iteration 6 — Sprint 0 Closeout + Sprint 1 Scope (2026-02-26)

**Date:** February 26, 2026 · Sprint 0 COMPLETE
**Author:** Agent 14 (Project Manager / Technical Lead)
**Status:** 🟢 Sprint 0 DONE — Sprint 1 prep in progress

---

## 1 · Context Card — Brand DNA

> Every prompt issued by any agent on this project **must open with this Context Card**.

| Field | Value |
|-------|-------|
| **Industry** | Licensed residential & commercial general contracting — remodeling, emergency restoration, maintenance subscriptions, sitework, demolition. Oregon CCB #258533. |
| **Company** | **Benson Home Solutions** (DBA) · Legal entity: **Benson Enterprises** · Owner: Elric Benson · Est. 2014 · 200+ projects · 4.9/5 rating |
| **Website Logo** | Text: **"Benson Home Solutions"** (confirmed Feb 26). PNG available. **SVG creation approved** — to be built during Sprint 1 frontend dev. |
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
| CMS | Sanity (headless, schema-as-code) — `next-sanity@^12`, `sanity@^5` |
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
| Sprint 0 | Feb 26–28 | Kickoff, audits, architecture, DNS cutover, deployment | ✅ **COMPLETE** |
| Sprint 1 | Mar 5–18 | Design system, content schemas, API routes, frontend dev | 🟡 Prep in progress |
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

## 5 · Sprint 0 Final Report

### Deliverables Completed

| # | Deliverable | PR / Artifact |
|---|-------------|---------------|
| 1 | Full repo audit (structure, deps, config, stale data) | Sprint 0 Audit Report (Notion) |
| 2 | PlanetScale → Neon swap | PR #1 |
| 3 | Calibri → Source Sans 3 font reference | PR #1 |
| 4 | `.env.example` expanded with all service keys | PR #1 |
| 5 | PROMPT.md synced through Iteration 5 | PR #1 |
| 6 | 301 redirect map coded into `next.config.ts` | PR #2 |
| 7 | 11 Sanity CMS schema stubs defined | PR #2 |
| 8 | 21 Phase 1 route scaffolds created | PR #2 |
| 9 | Risk register updated (10 active risks) | PR #2 |
| 10 | Build fix: `next-sanity` ^9→^12, `sanity` ^3→^5 | PR #3 |
| 11 | DNS cutover: A → 76.76.21.21, www CNAME → cname.vercel-dns.com | Manual (Hostinger) |
| 12 | **Site deployed to Vercel — bensonhomesolutions.com LIVE** | PR #3 merge triggered |
| 13 | Brand decision locked: "Benson Home Solutions" | Ops Manual |
| 14 | SVG logo creation approved for Sprint 1 | Ops Manual |
| 15 | GSC analysis: 12 noindex pages causing index decline | PROMPT.md 5.1 |
| 16 | Next 16 build warnings fixed (PR #4 open) | PR #4 |

### PRs

| PR | Branch | Status | SHA | Summary |
|----|--------|--------|-----|---------|
| #1 | `sprint-0/repo-sync-iteration-4` | ✅ Merged | `a52a8e09` | Iteration 4 repo sync |
| #2 | `sprint-0/audit-and-schemas` | ✅ Merged | `8a71f617` | Audit + schemas + redirects |
| #3 | `fix/vercel-build` | ✅ Merged | `e9378798` | Build fix (Sanity version bumps) |
| #4 | `sprint-1/cleanup-warnings` | 🟡 Open | — | Next 16 warning cleanup |

### Branch Status

| Branch | Status | Notes |
|--------|--------|-------|
| `main` | ✅ Active | SHA `e9378798` — live on Vercel |
| `sprint-1/cleanup-warnings` | 🟡 PR #4 | Next 16 eslint + middleware→proxy fix |
| `feature/full-build` | ⚠️ Stale | SHA `d31575d4` — still has PlanetScale, old Sanity ^9, .eslintrc.json. Reference only, do NOT merge. |
| `fix/vercel-build` | 🗑️ Delete | Merged into main via PR #3 |
| `sprint-0/repo-sync-iteration-4` | 🗑️ Delete | Merged into main via PR #1 |
| `sprint-0/audit-and-schemas` | 🗑️ Delete | Merged into main via PR #2 |

### Deployment Manifest (Feb 26, 2026)

- **Build ID:** `h-HEQBTQ-tK-3js3if5bl`
- **Runtime:** nodejs24.x
- **Region:** iad1 (Virginia) — **action: change to pdx1 for Oregon latency**
- **Static assets:** 15 files, CSS 8KB, JS ~553KB (6 chunks)
- **Largest JS chunk:** 224KB (likely Sanity SDK)
- **ISR pages:** 22 routes, all 744KB each (scaffold shells — expected)
- **Serverless:** 1 function (`/studio/[[...tool]]`) at 549KB
- **Edge middleware:** 1 (excludes /api, _next/static, _next/image, favicon.ico, /studio)

---

## 6 · Sprint 1 Scope (Mar 5–18)

### Agent Assignments

| Agent | Sprint 1 Task | Dependencies |
|-------|---------------|--------------|
| 07 — Frontend Dev | Design system + component library + SVG logo | Brand colors, Source Sans 3 files |
| 08 — Backend Dev | Provision Neon DB + Sanity project + API route stubs | Vercel env vars from Elric |
| 10 — Copywriter | Homepage + emergency page copy drafts | Voice profile, entity checklists |
| 14 — Project Manager | Sprint management, PR reviews, scope enforcement | All agents |

### Elric Action Items (Before Sprint 1)

- [ ] Set Vercel env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`
- [ ] Rotate exposed Hostinger API key
- [ ] Change Vercel function region to pdx1 (Settings → Functions → Function Region)
- [ ] Delete merged branches: `fix/vercel-build`, `sprint-0/repo-sync-iteration-4`, `sprint-0/audit-and-schemas`
- [ ] Review and merge PR #4 (warning cleanup)

### Technical Prep

- [ ] Provision Sanity project — get real project ID
- [ ] Provision Neon DB
- [ ] Verify email still works (MX/SPF/DKIM/DMARC intact after DNS cutover)
- [ ] 1build API POST verification (GraphQL introspection query)
- [ ] Download and self-host Source Sans 3 variable font files
- [ ] Begin SVG logo creation (approved)

---

## 7 · Decisions Log

| Decision | Date | Detail |
|----------|------|--------|
| **Logo text** | Feb 26 | **"Benson Home Solutions"** (DBA name) on website. |
| **Photos** | Feb 26 | Deferred to end of project. Placeholder layouts until then. |
| **SVG logo** | Feb 26 | PNG available now. SVG creation approved for Sprint 1 frontend dev. |
| **Database** | Feb 26 | Neon (Postgres serverless) — fallback from PlanetScale. |
| **Web font** | Feb 26 | Source Sans 3 (variable, self-hosted) — Calibri is print-only. |
| **DNS provider** | Feb 26 | Domain nameservers stay at Hostinger. A/CNAME point to Vercel. |
| **Build fix** | Feb 26 | Bumped next-sanity ^9→^12, sanity ^3→^5, @sanity/vision ^3→^5 for Next 16 compat. |

---

## 8 · Google Search Console Analysis (Feb 26, 2026)

**Domain:** portal.bensonhomesolutions.com (Hostinger — now redirected)
**Data range:** Dec 14, 2025 – Feb 23, 2026

### Critical Finding
**12 pages with `noindex` meta tags** — primary cause of declining index coverage (13 → 6 indexed pages over 2 months). Root cause: Hostinger template misconfiguration.

**Resolution:** New Vercel-hosted site has full control over meta tags via Sanity CMS + Next.js. All unintended `noindex` tags removed. 301 redirect map preserves existing equity.

---

## 9 · Risk Register

| ID | Risk | Impact | Status |
|----|------|--------|--------|
| R-01 | Photography assets delayed | Low | Deferred to end of project |
| R-02 | Lighthouse score drop with Cal.com widget | Medium | Lazy-load via dynamic import |
| R-03 | SEO ranking drop during migration | High | 301 redirects live, sitemap resubmit pending |
| R-04 | Copy sounds AI-generated | High | Agent 10 writes in Elric's voice |
| R-05 | Chatbot hallucination | High | RAG-only, confidence threshold, human escalation |
| R-06 | 1build API non-functional | Medium | Fallback: public datasets (HUD, county assessor) |
| R-07 | Neon cold starts | Low | Connection pooling, keep-alive pings |
| R-08 | next-sanity peer dep conflict | — | **✅ RESOLVED** (PR #3) |
| R-09 | Legacy site outage / SEO bleed | — | **✅ RESOLVED** (DNS live on Vercel) |
| R-10 | Hostinger API key exposed in chat | Medium | Elric advised to rotate |
| R-11 | Vercel region mismatch (iad1 vs pdx1) | Low | Elric to change in Vercel settings |
| R-12 | feature/full-build branch stale | Low | Marked as reference only, do not merge |

---

## 10 · Monthly Cost Estimate

~**$87–121/month** (Vercel $20, Claude API ~$20–50, CallRail ~$45, Twilio ~$1)

---

## Changelog

| Iteration | Date | Summary |
|-----------|------|---------|
| 1 | 2025-12-xx | Initial project scoping |
| 2 | 2026-01-15 | Timeline correction, partial decision lock |
| 3 | 2026-02-26 | Full project resumption, 14-agent team, master plan v1.0 |
| 4 | 2026-02-26 | Full repo sync — all Roundtable II decisions applied |
| 5 | 2026-02-26 | Phase 1 kicked off. PR #1 merged. All 14 agents assigned. |
| 5.1 | 2026-02-26 | Logo decision locked. GSC analysis added. Photos deferred. |
| **6** | **2026-02-26** | **Sprint 0 COMPLETE. PRs #1-3 merged. Site live on Vercel. DNS cutover done. PR #4 open (warning cleanup). Sprint 1 scope defined. feature/full-build assessed as stale. Risk register updated (R-08/R-09 resolved, R-10/R-11/R-12 added).** |

---

> **Next iteration trigger:** Update at end of Sprint 1 (Mar 18) with design system status, Sanity schema progress, and Sprint 2 readiness assessment.

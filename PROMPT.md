# PROMPT.md — Benson Home Solutions Website Overhaul

> Recurring source document for Agent 14's CoT → Critique → CoV → Self-reflecting prompt loop.
> Updated each iteration.

## Iteration 4 — Full Resync After Roundtable II (2026-02-26)

### Current State
- **Today:** February 26, 2026 (Sprint 0, Day 1)
- **Hard Launch Target:** May 4, 2026
- **Sprint 0:** Feb 26–28 (Week 1 — Kickoff & Foundation)
- **14-agent team** fully rostered and briefed
- **All 5 open decisions resolved** (Roundtable II, Feb 26)
- **GitHub repo scaffolded**, CI/CD active, design tokens configured
- **Voice interview complete** — Elric Benson Voice Profile delivered
- **Competitor report delivered** — Mid-Willamette Valley maintenance market
- **Master Project Plan v1.0** published with 14 elements + reasoning loops

### Decisions Locked (Roundtable II)
- [x] **Database:** Neon (Postgres) — fallback from PlanetScale after MySQL deprecation concerns
- [x] **Web Font:** Source Sans 3 (variable, self-hosted) — Calibri remains print-only
- [x] **Design System:** shadcn/ui + Radix primitives + custom Benson visual layer
- [x] **Emergency SMS:** Twilio (~$0.008/tap) for emergency page tap-to-text
- [x] **1build API:** Hybrid approach — free public data for True Cost Calculator, 1build for service estimators

### Technical Stack (Locked)
| Layer | Choice |
|-------|--------|
| Framework | Next.js 16+ (App Router) + TypeScript strict |
| CMS | Sanity (headless, schema-as-code) |
| Styling | Tailwind CSS v4 (custom config) + CSS custom properties |
| Hosting | Vercel Pro (edge CDN, serverless, ISR) |
| Database | Neon (Postgres, serverless) |
| Vector DB | Pinecone (Starter → scale as needed) |
| Chatbot LLM | Anthropic Claude 3.5 Sonnet (streaming via Vercel AI SDK) |
| Embeddings | OpenAI text-embedding-3-small (1536 dims) |
| Design System | shadcn/ui + Radix + custom Benson visual layer |
| Email | Resend (transactional) + ConvertKit (marketing) |
| Call Tracking | CallRail with DNI (canonical number untouched in schema) |
| Analytics | GA4 (server-side + client-side) + RUM via web-vitals + Sentry |
| CI/CD | GitHub Actions → Lint → Build → Lighthouse CI → Playwright → axe-core |
| Emergency SMS | Twilio (~$0.008/tap) |

### Sprint Timeline (Revised — Master Plan v1.0)
| Sprint | Dates | Focus |
|--------|-------|-------|
| Sprint 0 | Feb 26–28 | Kickoff, audits, architecture, photography starts |
| Sprint 1 | Mar 5–18 | Design + Content (wireframes, copy drafts, schemas) |
| Sprint 2 | Mar 19–Apr 1 | Build Sprint (frontend, backend, CMS, AI features) |
| Sprint 3 | Apr 2–15 | Integration + Polish (connect all systems, CRO) |
| Sprint 4 | Apr 16–29 | QA + Optimization (regression, perf, a11y, load) |
| Launch Week | Apr 30–May 7 | Soft launch → monitoring → hard launch May 4 |

### Phase 1 Pages (21 total)
- **P0 (Critical):** Homepage, Emergency, Water Damage
- **P1 (High):** Kitchen, Bathroom, Subscription, About, Contact
- **P2 (Medium):** Demolition, Windows, Mold, Sitework, Tenant, Methodology Hub
- **P3 (Area):** Salem, Keizer, Corvallis, Albany, Burns
- **P4 (Tools):** True Cost Calculator, Cost Estimator

### Sprint 0 Active Tasks (All Agents)
| Agent | Task |
|-------|------|
| 01 | Technical SEO audit of legacy site |
| 02 | Schema architecture (JSON-LD templates per page type) |
| 03 | Entity checklists per page type |
| 04 | Keyword research (10-day sprint) |
| 05 | Backlink strategy + asset list |
| 06 | UX discovery + wireframe prep |
| 07 | Design system + component library planning |
| 08 | Backend API architecture + Neon DB setup + 1build API verification |
| 09 | RAG pipeline architecture + voice guide for chatbot |
| 10 | Homepage copy draft using voice profile |
| 11 | Photography begins (needs Elric's active project list) |
| 12 | QA test plan + automation framework setup |
| 13 | Analytics architecture + GA4 server-side plan |
| 14 | Weekly status, scope enforcement, repo sync, coordination |

### 1build API Details
- **Endpoint:** https://gateway-external.1build.com/ (GraphQL)
- **Auth header:** `1build-api-key`
- **External key:** `1build_ext.YeCQuQQ4.UHeKowqgvZm1T3MPWKVD7J55MOgRDv4k`
- **Embedded key:** `1build_emb.kEpuC0UB.NjgpmBsznHDAToGTlXoWn65FHE7qoift`
- **Decision:** Hybrid — free data for True Cost Calculator, 1build for service estimators
- **Status:** Needs verification (Agent 08 task — endpoint returned timeout on GET; requires POST with GraphQL query)

### Open Items
- [ ] Elric to share active project list with Agent 11 for photography scheduling
- [ ] Logo: PNG says "Benson Enterprises" — need "Benson Home Solutions" SVG
- [ ] Google Search Console access
- [ ] Sanity project ID (create Sanity project + dataset)
- [ ] Neon database provisioning
- [ ] Vercel project connection
- [ ] 1build API verification (Agent 08 — POST with GraphQL introspection query)

### Risks
| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-01 | Photography assets delayed | Medium | Placeholders ready; shoot starts Week 1 |
| R-02 | Lighthouse 100 with Cal.com widget | Medium | Lazy-load, dynamic import |
| R-03 | SEO ranking drop during migration | High | Full 301 map, sitemap resubmit |
| R-04 | Copy sounds AI-generated | High | Agent 10 + Elric voice review |
| R-05 | Chatbot hallucination | High | RAG-only, confidence threshold, escalation |
| R-06 | 1build API non-functional | Medium | Fallback to public datasets for estimators |
| R-07 | Neon cold starts on serverless | Low | Connection pooling, keep-alive |

### Monthly Cost Estimate
~$87–121/month (Vercel $20, Claude API ~$20–50, CallRail ~$45, Twilio ~$1)

### Changelog
- **Iteration 1** (2025-12-xx): Initial project scoping
- **Iteration 2** (2026-01-15): Timeline correction, decision lock attempt
- **Iteration 3** (2026-02-26): Full project resumption, 14-agent team, master plan v1.0
- **Iteration 4** (2026-02-26): Repo sync — all Roundtable II decisions applied, PlanetScale→Neon, Calibri→Source Sans 3, timeline corrected to May 4

### Next Iteration Trigger
Update this file at end of Sprint 0 (Feb 28) with audit results and Sprint 1 readiness assessment.

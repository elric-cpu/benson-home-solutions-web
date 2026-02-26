# PROMPT.md — Benson Home Solutions Website Overhaul

> Recurring source document for Agent 14's CoT → Critique → CoV → Self-reflecting prompt loop.
> Updated each iteration.

## Iteration 1 — Project Kickoff (2026-02-26)

### Current State
- Private GitHub repo created: `elric-cpu/benson-home-solutions-web`
- Tech stack: Next.js 16+ (App Router, RSC), Tailwind CSS v4, TypeScript strict, Vercel Pro
- CI/CD: GitHub Actions → Lint → Build → Lighthouse CI (≥95) → Playwright E2E → axe-core a11y
- Sanity Studio stubbed at `/studio`
- All design tokens configured (Oxblood #4C0C14, Cream #FFFDF9, Charcoal #2D2D2D, Slate #4A4A4A)
- Business constants centralized in `src/lib/constants.ts`

### Sprint Timeline
- **Kickoff:** February 26, 2026
- **Launch:** April 9, 2026 (6 weeks)
- **Phase 1:** Full UI/UX redesign, 30-35 pages, AI chatbot, booking engine, analytics

### Week 1 Priorities
1. SEO audit of legacy site (Agent 01)
2. Schema architecture & JSON-LD templates (Agent 02)
3. Keyword map v1 (Agent 04)
4. Sanity CMS schema deployment (Agent 07)
5. Wireframes started (Agent 06)
6. Photography begins (Agent 11)

### Open Decisions
- [ ] April 9 deadline confirmation
- [ ] Cal.com vs Calendly
- [ ] GBP URL, Facebook page, Search Console access
- [ ] SVG logo + project photos
- [ ] Agent 10 voice interview scheduling
- [ ] Chatbot LLM budget ceiling ($50-150/mo)
- [ ] Stripe timing (Phase 1 or Phase 2)

### Risks
| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-01 | Photography assets delayed | Medium | Placeholders ready |
| R-02 | Lighthouse 100 with Cal.com widget | Medium | Lazy-load, dynamic import |
| R-03 | SEO ranking drop during migration | High | Full 301 map, sitemap resubmit |
| R-04 | Copy sounds AI-generated | High | Agent 10 + Elric voice review |
| R-05 | Chatbot hallucination | High | RAG-only, confidence threshold |

### Next Iteration Trigger
Update this file when Week 1 deliverables are assessed (target: March 4, 2026).

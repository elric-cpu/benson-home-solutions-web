# PROMPT.md — Benson Home Solutions Website Overhaul

> Recurring source document for Agent 14's CoT → Critique → CoV → Self-reflecting prompt loop.
> Updated each iteration.

## Iteration 2 — Timeline Correction & Decision Lock (2026-01-15)

### ⚠️ CORRECTED TIMELINE
- **Today:** January 15, 2026
- **Launch:** February 26, 2026 (6 weeks)
- **This is a hard deadline. Production built and deployed.**

### Decisions Locked
- [x] Launch date: **February 26, 2026** (corrected from April 9)
- [x] Booking engine: **Cal.com** (confirmed)
- [x] GBP URL: https://maps.app.goo.gl/ad4eywwWonPsSZXP9
- [x] Facebook: https://www.facebook.com/profile.php?id=61565667928376
- [x] Chatbot LLM budget: ~$50-150/mo — **acceptable**
- [x] Stripe: **Phase 2**
- [ ] Google Search Console access — still pending
- [ ] SVG logo — PNG provided but says "Benson Enterprises" (needs resolution)

### Current State
- Private GitHub repo created: `elric-cpu/benson-home-solutions-web`
- Tech stack: Next.js 16+ (App Router, RSC), Tailwind CSS v4, TypeScript strict, Vercel Pro
- CI/CD: GitHub Actions → Lint → Build → Lighthouse CI (≥95) → Playwright E2E → axe-core a11y
- Sanity Studio stubbed at `/studio`
- All design tokens configured (Oxblood #4C0C14, Cream #FFFDF9, Charcoal #2D2D2D, Slate #4A4A4A)
- Business constants centralized in `src/lib/constants.ts`

### Sprint Timeline (REVISED)
- **Week 1 (Jan 15–21):** Discovery & Architecture
- **Weeks 2–3 (Jan 22–Feb 4):** Design & Content
- **Weeks 3–5 (Feb 4–18):** Build Sprint
- **Weeks 5–6 (Feb 18–25):** QA & Optimization
- **Feb 26:** Launch Day

### Open Items
- [ ] Logo: Provided PNG says "Benson Enterprises EST 2024" — need "Benson Home Solutions" version in SVG
- [ ] Google Search Console access
- [ ] Voice interview for copywriting voice capture

### Risks
| ID | Risk | Impact | Mitigation |
|----|------|--------|------------|
| R-01 | Photography assets delayed | Medium | Placeholders ready |
| R-02 | Lighthouse 100 with Cal.com widget | Medium | Lazy-load, dynamic import |
| R-03 | SEO ranking drop during migration | High | Full 301 map, sitemap resubmit |
| R-04 | Copy sounds AI-generated | High | Agent 10 + Elric voice review |
| R-05 | Chatbot hallucination | High | RAG-only, confidence threshold |
| R-06 | 6-week timeline is aggressive | High | Strict Phase 1/Phase 2 scope split, daily progress tracking |

### Next Iteration Trigger
Update this file when Week 1 deliverables are assessed (target: January 21, 2026).

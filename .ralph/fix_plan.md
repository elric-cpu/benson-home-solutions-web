# Fix Plan — Benson Home Solutions Website

> Prioritized task list for Ralph autonomous loop.
> Updated: Feb 27, 2026 · Sprint 1 Active

---

## 🔴 P0 — Critical (Do First)

### 1. Investigate & fix 404 on bensonhomesolutions.com
- Site is returning 404 as of Feb 27 3:00 PM PST
- DNS is correct (A → 76.76.21.21, CNAME → cname.vercel-dns.com)
- Likely a Vercel deployment or routing issue
- Check `next.config.ts` for misconfigured rewrites/redirects
- Check `vercel.json` if it exists
- Run `npm run build` locally to verify the build succeeds
- Check that `src/app/page.tsx` exports a default component

### 2. Build Emergency Services page (`/emergency`)
- Route scaffold exists at `src/app/emergency/page.tsx`
- Must include: tap-to-call CTA, emergency SMS (Twilio placeholder), auto-open chatbot trigger
- Use existing design system components (Button variant="emergency", Section, Container)
- Add JSON-LD: LocalBusinessJsonLd + ServiceJsonLd
- Conversion: Primary CTA = "Call Now" (tap-to-call), Secondary = Emergency SMS
- Mobile-first, sub-2s LCP target
- Write Playwright smoke test

### 3. Build Water Damage page (`/services/water-damage`)
- Uses dynamic service page template at `src/app/services/[slug]/page.tsx`
- Create Sanity schema content or static fallback with graceful degradation
- Must include: urgency messaging, process timeline, cost range, FAQ section
- Add JSON-LD: ServiceJsonLd + FAQPageJsonLd
- Conversion: Same as Emergency pattern
- Write Playwright smoke test

---

## 🟡 P1 — High Priority

### 4. Build Kitchen Remodeling page (`/services/kitchen-remodeling`)
- Service page using existing template
- Cost range: $25K–$45K (reference from brand voice)
- Before/after section placeholder
- FAQ section with 5+ questions
- JSON-LD structured data

### 5. Build Bathroom Remodeling page (`/services/bathroom-remodeling`)
- Same pattern as Kitchen
- Cost range, process, FAQ

### 6. Build About page (`/about`)
- Company story, team intro, credentials (CCB #258533)
- Trust signals: 200+ projects, 4.9/5 rating, Est. 2014
- JSON-LD: LocalBusinessJsonLd
- CTA: Schedule a Call (Cal.com embed placeholder)

### 7. Build Contact page (`/contact`)
- Route exists, form exists — needs full page build
- Map embed placeholder (Google Maps)
- Business hours, phone, email, address
- JSON-LD: LocalBusinessJsonLd with ContactPoint

### 8. Build Subscription/Maintenance page (`/subscription`)
- Plan selector UI (Basic, Standard, Premium tiers)
- Comparison table
- Email capture flow
- JSON-LD: ServiceJsonLd

---

## 🟢 P2 — Medium Priority

### 9. Build remaining service pages
- Demolition (`/services/demolition`)
- Windows (`/services/windows`)
- Mold Remediation (`/services/mold-remediation`)
- Sitework (`/services/sitework`)
- Tenant Improvements (`/services/tenant-improvements`)
- Methodology Hub (`/methodology`)
- All use existing service page template pattern
- Each needs JSON-LD + FAQ + CTA

### 10. Build area pages
- Salem (`/areas/salem`)
- Keizer (`/areas/keizer`)
- Corvallis (`/areas/corvallis`)
- Albany (`/areas/albany`)
- Burns (`/areas/burns`)
- Each needs: local SEO content, service list, testimonial placeholder, map
- JSON-LD: LocalBusinessJsonLd with areaServed
- CTA: "See Services in [City]" + CallRail DNI placeholder

### 11. Expand Sanity schemas
- Flesh out all 11 schema stubs with full field definitions
- Add validation rules
- Create sample content documents for each schema
- Set up Sanity Studio live preview integration

---

## 🔵 P3 — Backend & AI (Sprint 2 Prep)

### 12. Chatbot API route + RAG pipeline
- `/api/chat` streaming endpoint using Vercel AI SDK
- Pinecone vector store integration
- Content embedding pipeline (embed service pages, FAQs)
- Confidence threshold + human escalation
- **BLOCKED:** Needs ANTHROPIC_API_KEY, OPENAI_API_KEY, PINECONE_API_KEY

### 13. Cost estimator API route
- `/api/estimate` endpoint
- Hybrid: free public data for True Cost Calculator, 1build API for service estimators
- Email-gated PDF report generation

### 14. CallRail DNI script injection
- Add CallRail tracking script to layout
- Configure DNI for area pages
- **BLOCKED:** Needs CallRail account setup

---

## ⚠️ Blocked Items (Require Elric Action)

These tasks cannot proceed until environment variables are set:

| Blocker | What It Unblocks |
|---------|------------------|
| Provision Neon DB → set `DATABASE_URL` + `DATABASE_URL_UNPOOLED` | DB writes, contact form persistence, subscription leads |
| Set `RESEND_API_KEY` in Vercel | Email notifications on contact form |
| Set `GA4_MEASUREMENT_ID` in Vercel | Analytics tracking |
| Set `NEXT_PUBLIC_SENTRY_DSN` in Vercel | Error monitoring |
| Set `ANTHROPIC_API_KEY` | Chatbot API route |
| Set `OPENAI_API_KEY` | Embedding pipeline |
| Set `PINECONE_API_KEY` | Vector store |

---

## ✅ Done (Reference Only)

- [x] Next.js 15 scaffold + App Router
- [x] Tailwind CSS v4 + design tokens
- [x] Design system (Button, Card, Badge, Container, Section)
- [x] Layout shell (Header, Footer, MobileNav)
- [x] Homepage (6 sections)
- [x] Service page template (dynamic [slug])
- [x] Contact form + API route
- [x] Drizzle ORM + Neon lazy client
- [x] Resend email integration
- [x] Rate limiting
- [x] Health check endpoint
- [x] JSON-LD components (4 types)
- [x] GA4 + Sentry initialization
- [x] CI/CD pipeline (Lighthouse, Playwright, axe)
- [x] 301 redirect map
- [x] Security headers
- [x] robots.txt + sitemap config
- [x] Remote DB workflows
- [x] CONTRIBUTING.md

# Benson Home Solutions — Website Overhaul

## Context Card — Brand DNA

| Field | Value |
|-------|-------|
| **Industry** | Licensed residential & commercial general contracting — remodeling, emergency restoration, maintenance subscriptions, sitework, demolition. Oregon CCB #258533. |
| **Company** | Benson Home Solutions · Owner: Elric Benson · Est. 2014 · 200+ projects · 4.9/5 rating |
| **Service Area** | Mid-Willamette Valley (Salem, Keizer, Corvallis, Albany) + Harney County (Burns, Riley, Drewsey) |
| **Phone** | (541) 321-5115 |
| **Email** | office@bensonhomesolutions.com |
| **Brand Colors** | Primary: Oxblood/Maroon (#4C0C14), Accent: Cream, Text: Dark |
| **Font** | Source Sans 3 (variable, self-hosted via next/font/google) |
| **Tone** | Confident, direct, knowledgeable — like a contractor you trust. Zero AI filler. Specific beats vague. |
| **Conversion Goal** | Every page drives toward a lead-capture moment: estimate request, phone call, chatbot, or subscription signup. |

---

## Technical Stack (LOCKED — do not change)

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 15** (App Router) + TypeScript strict |
| CMS | Sanity (headless, schema-as-code) |
| Styling | Tailwind CSS v4 (custom config) + CSS custom properties |
| Hosting | Vercel Pro (edge CDN, serverless, ISR) |
| Database | Neon (Postgres, serverless, connection pooling) |
| ORM | Drizzle ORM (lazy Neon serverless client) |
| Vector DB | Pinecone (Starter) |
| Chatbot LLM | Anthropic Claude 3.5 Sonnet (streaming via Vercel AI SDK) |
| Embeddings | OpenAI text-embedding-3-small (1536 dims) |
| Design System | shadcn/ui + Radix + custom Benson visual layer |
| Email | Resend (transactional) + ConvertKit (marketing) |
| Call Tracking | CallRail with DNI |
| Analytics | GA4 (server-side + client-side) + web-vitals RUM + Sentry |
| CI/CD | GitHub Actions → Lint → Build → Lighthouse CI → Playwright → axe-core |
| Emergency SMS | Twilio (~$0.008/tap) |

---

## What's Already Built (on `main`)

PRs #1–10 all merged. Main branch SHA: `f96deeca329f6acd9bf207528b34723189ebccae`

### Infrastructure
- Next.js 15 + TypeScript + App Router scaffold
- Tailwind CSS v4 with custom Benson design tokens
- Sanity CMS integration (config + 11 schema stubs)
- CI/CD pipeline (GitHub Actions → Lint → Build → Lighthouse → Playwright → axe)
- Security headers (X-Frame-Options, CSP, Referrer-Policy)
- 301 redirect map for all legacy URLs
- 21 route scaffolds for Phase 1 pages
- Business constants (`src/lib/constants.ts`)
- `.env.example` with all service keys
- `robots.txt` + `next-sitemap` config
- Remote DB workflows (`db-setup.yml`, `db-health-check.yml`, `db-seed.ts`)
- `CONTRIBUTING.md`

### Design System & UI
- **Button** (5 variants × 3 sizes), **Card**, **Badge**, **Container**, **Section** primitives
- **Layout shell:** Sticky Header + desktop/mobile nav, 4-column Footer
- **Source Sans 3:** Self-hosted via next/font/google with CSS variable injection

### Pages
- **Homepage:** Hero, services grid, trust signals, areas served, emergency CTA, final CTA
- **Service page template:** Dynamic `/services/[slug]` with Sanity GROQ, SSG, PortableText
- **Contact form:** Client validation + `/api/contact` POST route + JSON-LD structured data

### Backend & APIs
- **Drizzle ORM:** Lazy Neon serverless client + schema (contact_submissions, subscription_leads)
- **Resend email:** Office notification + visitor confirmation templates in /api/contact
- **Rate limiting:** In-memory sliding window (3 req/5min per IP) on /api/contact
- **Health check:** /api/health endpoint with DB, email, and app status
- **JSON-LD components:** LocalBusinessJsonLd, ServiceJsonLd, BreadcrumbJsonLd, FAQPageJsonLd
- **GA4 integration:** gtag.js via next/script afterInteractive + type-safe event library
- **Sentry:** Server + edge initialization via instrumentation.ts

---

## Phase 1 Pages (21 total)

| Priority | Pages |
|----------|-------|
| **P0 (Critical)** | Homepage ✅, Emergency ❌, Water Damage ❌ |
| **P1 (High)** | Kitchen ❌, Bathroom ❌, Subscription ❌, About ❌, Contact ❌ |
| **P2 (Medium)** | Demolition ❌, Windows ❌, Mold ❌, Sitework ❌, Tenant ❌, Methodology Hub ❌ |
| **P3 (Area)** | Salem ❌, Keizer ❌, Corvallis ❌, Albany ❌, Burns ❌ |
| **P4 (Tools)** | True Cost Calculator ❌, Cost Estimator ❌ |

---

## Conversion Architecture

| Page Type | Primary CTA | Secondary CTA | Lead-Capture |
|-----------|-------------|---------------|-------------|
| Homepage | Get a Free Estimate | Explore Services | Hero form + chatbot nudge at 15s |
| Emergency / Water Damage | Call Now (tap-to-call) | Emergency SMS (Twilio) | Auto-open chatbot with urgency greeting |
| Service Pages | Request Estimate | View Cost Calculator | Inline form + related case study CTA |
| Area Pages | See Services in [City] | Call Local Number | CallRail DNI + area-specific chatbot context |
| Subscription Page | Choose Your Plan | Compare Plans | Plan selector → email capture → AI chatbot onboarding |
| True Cost Calculator | Get Full Report (email gate) | Talk to an Expert | Calculator results → PDF download → email capture |
| About / Contact | Schedule a Call | Send a Message | Cal.com embed + contact form |

---

## Quality Gates

- **Lighthouse:** ≥ 95 (Performance, Accessibility, Best Practices, SEO)
- **axe-core:** Zero violations (WCAG 2.2 AA)
- **Playwright:** All E2E smoke tests green
- **LCP:** Sub-2s on 4G mobile
- **TypeScript:** Strict mode, zero `any` types
- **ESLint:** Zero warnings, zero errors

---

## Key Files & Directories

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, analytics, Sentry)
│   ├── page.tsx            # Homepage
│   ├── services/[slug]/    # Dynamic service pages
│   ├── contact/            # Contact page
│   ├── about/              # About page
│   ├── emergency/          # Emergency services
│   ├── areas/[city]/       # Area pages
│   └── api/                # API routes
│       ├── contact/        # Contact form handler
│       └── health/         # Health check
├── components/
│   ├── ui/                 # Design system primitives (Button, Card, Badge, etc.)
│   ├── layout/             # Header, Footer, MobileNav
│   ├── sections/           # Homepage sections, service sections
│   └── seo/                # JSON-LD components
├── lib/
│   ├── constants.ts        # Business info, nav links, service data
│   ├── db/                 # Drizzle schema + Neon client
│   ├── email/              # Resend templates
│   ├── analytics/          # GA4 event library
│   └── sanity/             # Sanity client + GROQ queries
└── styles/                 # Global CSS + Tailwind config
sanity/
├── schemas/                # 11 Sanity document schemas
└── sanity.config.ts        # Sanity Studio config
```

---

## Environment Variables Required

See `.env.example` for the full list. Critical ones:

| Variable | Status |
|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Set |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Set (production) |
| `DATABASE_URL` | ❌ Pending (Neon) |
| `DATABASE_URL_UNPOOLED` | ❌ Pending (Neon) |
| `RESEND_API_KEY` | ❌ Pending |
| `GA4_MEASUREMENT_ID` | ❌ Pending |
| `NEXT_PUBLIC_SENTRY_DSN` | ❌ Pending |
| `ANTHROPIC_API_KEY` | ❌ Pending (Sprint 2) |
| `OPENAI_API_KEY` | ❌ Pending (Sprint 2) |
| `PINECONE_API_KEY` | ❌ Pending (Sprint 2) |

---

## Rules for Claude Code

1. **DO NOT** change the tech stack. Everything listed above is locked.
2. **DO NOT** use `any` types. TypeScript strict mode is enforced.
3. **DO NOT** install new dependencies without documenting why in the commit message.
4. **DO NOT** modify CI/CD configuration without running `npm run build && npm run lint` first.
5. **DO** use the existing design system components (Button, Card, Badge, Container, Section).
6. **DO** follow the existing file/folder conventions shown above.
7. **DO** write Playwright tests for any new page or API route.
8. **DO** add JSON-LD structured data to every new page using the existing components.
9. **DO** ensure every page has a clear primary CTA per the Conversion Architecture table.
10. **DO** use Sanity for all dynamic content — no hardcoded copy in components.
11. **DO** run `npm run build` before committing to catch build errors early.
12. **DO** keep commits atomic and well-described.
13. **DO** gracefully degrade when env vars are missing (check for undefined, don't crash).
14. **DO** target sub-2s LCP on 4G mobile for every page.

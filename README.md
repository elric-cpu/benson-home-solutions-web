# Benson Home Solutions Website

Production website for Benson Enterprises, LLC dba Benson Home Solutions, an Oregon general contractor serving Harney County and rural/remote properties.

## Production stack

- Next.js 15 App Router + TypeScript
- React 19
- Tailwind CSS 4
- Node.js 22
- pnpm 10
- Drizzle-backed contact persistence with Firestore fallback
- Google Workspace mail notification for website project requests
- Playwright + axe accessibility coverage
- Lighthouse CI
- `next-sitemap` post-build sitemap/robots generation

## Primary architecture

- `src/app/page.tsx` — homepage
- `src/app/services/page.tsx` — service hub
- `src/app/services/[slug]/page.tsx` — reusable, statically generated service landing pages
- `src/lib/service-catalog.ts` — authoritative public service content and internal relationships
- `src/app/wildfire-recovery/page.tsx` — wildfire recovery pillar
- `src/app/service-area/page.tsx` — Harney County service-area hub
- `src/app/request-estimate/page.tsx` — project intake funnel
- `src/app/api/contact/route.ts` — validated and rate-limited lead capture
- `src/components/layout` — navigation/footer system
- `src/lib/constants.ts` — current public business identity and service geography

## Brand system

- Oxblood maroon `#722F37`
- Dark maroon `#5C252C`
- Burgundy `#8B454D`
- Rich wine `#4A1F24`
- 1970s Ford cream `#F5F1E8`
- Off-white cream `#FAF8F3`
- Charcoal `#2D2D2D`
- Headings: Libre Baskerville
- Navigation/UI: Montserrat
- Body: Source Sans 3

## Local development

Requirements: Node.js 22+ and pnpm 10+.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Do not commit `.env.local`, service-account JSON, API keys, database credentials, or production secrets.

## Validation

Before merging to production:

```bash
pnpm install --no-frozen-lockfile
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm test
```

The pull-request CI also runs a production build, Playwright/axe checks, and Lighthouse CI. Fix failures rather than disabling the production build or test jobs.

## Production environment

The application requires the environment variables used by its active persistence, Google Workspace mail, rate-limit, and optional legacy integrations. `.env.example` is the source-of-truth inventory; production values belong in the hosting control panel, not Git.

The production URL is `https://bensonhomesolutions.com`. Canonicals, structured data, and sitemap output must use that hostname consistently.

## Hostinger deployment

Hostinger supports Next.js as a Node.js Web App with GitHub-connected automatic deployments. Production should use the repository `elric-cpu/benson-home-solutions-web` and the `main` branch.

Recommended settings for this repository:

- Framework: Next.js
- Node.js: 22.x
- Package manager: pnpm
- Install: `pnpm install --no-frozen-lockfile`
- Build: `pnpm build`
- Start: `pnpm start`
- Production domain: `bensonhomesolutions.com`

Add production environment variables in Hostinger hPanel before the first production build. Keep SSL enabled, redirect HTTP to HTTPS, choose one canonical www/non-www hostname, and verify the live sitemap, robots file, forms, redirects, and representative service routes after each release.

## Content and compliance rules

- Do not publish fabricated ratings, reviews, project counts, awards, response-time guarantees, or case studies.
- Harney County is the primary public service geography. Secondary-market claims must reflect current operations.
- Wildfire cleanup language must not imply unrestricted handling of asbestos, contaminated ash, hazardous waste, or other regulated materials.
- Engineering, regulated abatement, and licensed specialty-trade work must be represented as coordination when Benson is not the licensed provider.
- Preserve valuable legacy URLs with permanent redirects when public slugs change.

Oregon CCB #258533.

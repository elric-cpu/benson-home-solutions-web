# Contributing — Benson Home Solutions Web

## Remote-Only Build Workflow

This project is built entirely through GitHub API and GitHub Actions — **no local code checkout is required**.

### How Agents Push Code

All code changes are made via the GitHub API:

1. **Create a feature branch** from `main`
2. **Push files** directly via the GitHub Contents API or `push_files` tool
3. **Open a Pull Request** targeting `main`
4. CI runs automatically (lint, build, Playwright, Lighthouse)
5. After review + merge, Vercel auto-deploys to production

### Branch Naming Convention

| Agent | Prefix | Example |
|-------|--------|---------|
| Agent 01 — SEO | `seo/` | `seo/meta-tags-audit` |
| Agent 02 — Schema | `schema/` | `schema/local-business-jsonld` |
| Agent 03 — AEO/GEO | `aeo/` | `aeo/faq-optimization` |
| Agent 04 — Keywords | `content/` | `content/keyword-map-v1` |
| Agent 05 — Backlinks | `offpage/` | `offpage/citation-audit` |
| Agent 06 — UX/UI | `design/` | `design/hero-wireframe` |
| Agent 07 — Frontend | `feat/` | `feat/emergency-page-template` |
| Agent 08 — Backend | `api/` | `api/contact-form-endpoint` |
| Agent 09 — AI | `ai/` | `ai/rag-pipeline-setup` |
| Agent 10 — Copy | `copy/` | `copy/service-pages-p0` |
| Agent 11 — Photo | `assets/` | `assets/hero-images` |
| Agent 12 — QA | `test/` | `test/e2e-contact-form` |
| Agent 13 — Analytics | `analytics/` | `analytics/ga4-events` |
| Agent 14 — PM | `infra/` | `infra/ci-workflows` |

### GitHub Actions Workflows

| Workflow | Trigger | Purpose |
|----------|---------|----------|
| `ci.yml` | Push/PR to main | Lint, Build, Playwright E2E, Lighthouse |
| `db-setup.yml` | Manual dispatch | Run `drizzle-kit push/generate/migrate` against Neon |
| `db-health-check.yml` | Manual dispatch + daily cron | Validate Neon connection and table state |

### Database Operations (No Local Code)

#### Initial Setup
1. Set `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (direct) as GitHub Secrets
2. Go to Actions → "DB Setup" → Run workflow → Select `push` → Type `yes` → Run
3. Verify with Actions → "DB Health Check" → Run workflow

#### Schema Changes
1. Update `src/lib/db/schema.ts` via GitHub API
2. Push to a feature branch
3. After PR merge, run the DB Setup workflow with `push` action

### Required GitHub Secrets

| Secret | Description | Source |
|--------|-------------|--------|
| `DATABASE_URL` | Neon pooled connection string | Neon dashboard |
| `DATABASE_URL_UNPOOLED` | Neon direct connection string | Neon dashboard |
| `RESEND_API_KEY` | Transactional email API key | Resend dashboard |

### Required Vercel Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon pooled connection string |
| `DATABASE_URL_UNPOOLED` | Neon direct connection string |
| `RESEND_API_KEY` | Email delivery |
| `GA4_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_SENTRY_DSN` | Error tracking |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity CMS project |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (production) |

### Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **CMS:** Sanity (headless)
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel Pro
- **Database:** Neon (Postgres serverless) + Drizzle ORM
- **Vector DB:** Pinecone
- **Chatbot:** Anthropic Claude 3.5 Sonnet
- **Embeddings:** OpenAI text-embedding-3-small
- **Email:** Resend
- **Analytics:** GA4 + Sentry
- **CI/CD:** GitHub Actions → Vercel

---

**Benson Home Solutions** — CCB #258533 — (541) 321-5115  
Maintenance · Restoration · Mitigation

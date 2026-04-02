# Workspace Artifacts Audit

## Core Application
- `src/`: Next.js 15 application source code (UI, Layout, Content, API, Lib, CMS).
- `benson-genkit-backend/`: Genkit serverless functions and backend configuration.
- `supabase/`: Database configuration, Edge Functions, and migrations.
- `drizzle/`: Drizzle ORM schemas and SQL migrations.

## Automation & Tooling
- `scripts/`: Custom TS and Python scripts for automation, testing, and deployment (e.g., `agent-router.ts`, `scrape_facebook.py`, `run-campaign.ts`).
- `.github/`: GitHub Actions workflows for CI/CD, autonomous triage, and agent dispatch.
- `.agents/`: Local Agent skills for SEO, CRO, infrastructure deployment, etc.
- `.gemini/`: Gemini-specific configuration and custom commands.
- `.genkit/`: Genkit traces, evaluations, and datasets.

## Documentation
- `docs/`: Operations manuals, agent registries, and execution plans.
- `AGENTS.md`, `MANIFEST.md`, `TODO.md`, `PLANS.md`: Core project planning and agent orchestration documents.
- `README.md`, `CONTRIBUTING.md`: Developer onboarding and repository guidelines.

## Configuration Files
- `next.config.ts`, `drizzle.config.ts`, `playwright.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `next-sitemap.config.js`
- `package.json`, `pnpm-lock.yaml`, `tsconfig.json`
- `vercel.json`
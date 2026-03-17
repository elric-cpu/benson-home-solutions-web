# Repository Guidelines

## Program Context
This repository supports the 2026 Benson Home Solutions website rebuild.

- Primary business name for client-facing work: `Benson Home Solutions`
- Legal entity only when legally required: `Benson Enterprises`
- Owner voice standard: Elric Benson, direct and authoritative
- Brand constraints: maroon/cream palette, real project imagery over stock-photo aesthetics
- Primary engineering objective: maximize user trust, conversion quality, and search visibility without sacrificing performance or compliance
- Non-negotiable performance targets: Lighthouse 95+ across Performance, Accessibility, Best Practices, and SEO; LCP < 2.5s; INP < 200ms; CLS < 0.1
- Flagship asset requirement: keep the `True Cost of Homeownership Calculator` fast, transparent, and backlink-worthy

## Delivery Priorities
- Answer-first pages: every page should have one clear search intent and an immediately useful answer section near the top
- Search Console-led iteration: prioritize high-impression/low-CTR and position 4-15 opportunities
- Modular content: prefer reusable FAQ, service area, and answer blocks that can be revised without rewriting entire pages
- Accessibility and conversion are co-equal: no dark patterns, clear CTAs, WCAG 2.1 AA baseline
- Reliability and trust: validate all server inputs, rate-limit forms, preserve observability, avoid misleading claims

## Agent Workflow
Default delivery sequence for page or feature work:

1. Define acceptance criteria and measurable outcome.
2. Confirm page intent, target queries, and real FAQ demand.
3. Write or revise copy in brand voice.
4. Design for comprehension and conversion.
5. Implement with performance and accessibility budgets.
6. Add required schema and metadata.
7. Verify crawlability, analytics, and QA before release.

If a change introduces a hard stop in performance, accessibility, legal risk, or brand accuracy, do not ship until it is corrected.

## Ralph Bash Loop
Use this loop for substantial improvements and stop early once all checks pass:

1. Goal
2. Current result
3. Gap list
4. Smallest viable fix plan
5. Execute
6. Verify with objective checks
7. Decide whether to ship or iterate

Verification should be concrete: Lighthouse/CWV, schema validation, accessibility checks, analytics events, and relevant functional tests.

## Project Structure & Module Organization
This is a Next.js 15 App Router project with TypeScript.

- `src/app`: Route segments, layouts, API handlers, and page-level UI.
- `src/components`: Reusable UI and feature components.
- `src/lib`: Shared logic (database, CRM, AI, email, utilities).
- `public`: Static assets (images, icons, sitemap assets).
- `tests`: Playwright end-to-end and accessibility tests.
- `scripts`: Utility scripts (env validation, seeding, ops tasks).
- `drizzle` + `drizzle.config.ts`: Database migrations and Drizzle config.
- `docs`: Architecture/process documentation.

## Build, Test, and Development Commands
Prefer `pnpm` in this repository.

- `pnpm install`: Install dependencies.
- `pnpm dev`: Start local development server.
- `pnpm build`: Production build (runs `prebuild` env validation first).
- `pnpm lint`: Run ESLint across the project.
- `pnpm test`: Run Playwright test suite.
- `pnpm test:a11y`: Run accessibility-focused Playwright tests.
- `pnpm format` / `pnpm format:check`: Apply or verify Prettier formatting.
- `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:studio`: Manage DB schema lifecycle.

## Coding Style & Naming Conventions
- TypeScript strict mode is required (`tsconfig.json`).
- Use single quotes and no semicolons; follow existing Prettier output.
- Keep modules focused and under 400 lines.
- Use descriptive names: components in `PascalCase`, helpers/variables in `camelCase`, route folders in lowercase.
- Validate external inputs with typed schemas (prefer `zod`) at API boundaries.
- Prefer server rendering and static generation where they reduce client-side JavaScript.
- Keep client bundles lean; avoid adding browser-side state or dependencies unless they materially improve UX.
- Use real, sourced data for calculators and claims. Show assumptions and methodology when outputs could be cited or shared.

## Testing Guidelines
- Primary framework: Playwright (`@playwright/test`), including `@a11y` tagged tests.
- Place tests in `tests/` with clear behavior-oriented names (example: `lead-capture.spec.ts`).
- Add or update tests when changing user flows, API behavior, or validation rules.
- Run `pnpm test` before opening a PR.
- For SEO/performance work, also run the narrowest relevant verification available (`pnpm lint`, page smoke tests, or Lighthouse scripts if present).

## Commit & Pull Request Guidelines
- Follow Conventional Commit style seen in history (`feat:`, `fix:`, `chore:`; optional scope like `fix(qa):`).
- Keep commits small and focused on one change.
- PRs should include: summary, motivation, test evidence (`pnpm lint`, `pnpm test`), and screenshots for UI changes.
- Link related issues/tasks and call out any env or migration requirements.

## Security & Configuration Tips
- Never commit secrets; use `.env.local` and `.env.example` as the template.
- Validate required env vars via `scripts/validate-env.ts` before builds.
- For data changes, use Drizzle migrations and document rollout/rollback steps in the PR.
- Apply server-side validation and spam protection to all forms.
- Preserve structured logging and error tracking coverage for new operationally important paths.

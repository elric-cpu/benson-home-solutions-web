# Initialization Plan

Source of truth for this initialization:
- Notion page: `AGENTS.md — Benson Home Solutions (Operations Manual Derived)`
- Repo: `website_builds/benson-home-solutions-web`

## What This Init Did
- Merged the Notion operating constraints into the local `AGENTS.md`
- Preserved the existing repo-specific build, test, style, and security instructions
- Established a default iteration framework for future autonomous improvement work

## Working Assumptions
- This is the primary website repo for the Benson Home Solutions 2026 rebuild
- Vercel remains the deployment target unless a repo-level spec overrides it
- The top-level success metrics are performance, search visibility, accessibility, and conversion quality

## First Recommended Iteration
1. Audit the homepage, calculator flow, and primary service pages for performance and answer-first SEO gaps.
2. Pick one measurable improvement with low blast radius.
3. Implement the change.
4. Run at minimum:
   - `pnpm lint`
   - `pnpm test`
5. If deployment is explicitly requested, use the repo’s existing Vercel workflow and verify production health after release.

## Release Gate
Do not ship if any of the following regress:
- Lighthouse or Core Web Vitals budget
- Accessibility baseline
- Form validation or anti-spam protections
- Brand accuracy or service-scope accuracy
- Structured data validity on affected pages

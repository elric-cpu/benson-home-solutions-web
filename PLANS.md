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
## Current Execution Roadmap: SEO / AEO / GEO Strategy

**Goal:** Implement the findings from the `IN_DEPTH_KEYWORD_STRATEGY.md` to steal Generative AI Overviews (GAIO) and dominate high-intent, hyper-local long-tail queries.

### Phase 1: Programmatic Local SEO (Location-Specific Landing Pages)
*Status: Pending*
1.  **Objective:** Deploy dedicated landing pages for each primary service area (`/areas/[city]`).
2.  **Targets:** Albany, Lebanon, Sweet Home, Burns, Riley, Drewsey.
3.  **Implementation:**
    *   Create a dynamic Next.js route (`/src/app/areas/[slug]/page.tsx`).
    *   Inject `LocalBusiness` JSON-LD schema on each page specifying the exact geographic coordinates, service radii, and localized services.
    *   Include localized FAQ Schema using the `FAQSection` component.
    *   Ensure content highlights specific local risks (e.g., Harney County winterization vs. Valley water tables).

### Phase 2: The "True Cost" Content Hub (Investigational SEO)
*Status: Pending*
1.  **Objective:** Build out blog posts or calculator tools targeting "Investigational" long-tail keywords.
2.  **Implementation:**
    *   Build interactive calculator tools (e.g., "The True Cost of Deferred Maintenance in Oregon").
    *   Create high-density articles that answer complex questions with concrete data points (e.g., average remodeling costs in Albany).
    *   Structure these pages to funnel users toward the Maintenance Subscription.

### Phase 3: Continuous GSC Monitoring
*Status: Ongoing*
1.  **Objective:** Utilize the Genkit `getSearchPerformance` tool to monitor impressions on long-tail queries.
2.  **Action:** Trigger automated A/B tests on meta descriptions and on-page content when high-impression, low-CTR queries are identified.

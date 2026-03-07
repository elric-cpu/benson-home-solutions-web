# Iteration 1: Foundational SEO Strategy & Architecture

## 1. Keyword Research & Intent Mapping
We are moving away from generic "General Contractor" terms toward **high-intent, problem-aware** queries.

### Tier 1: Transactional (High Value)
*   **Primary:** "Home Maintenance Subscription Oregon," "Property Maintenance Plan Albany OR," "Emergency Water Restoration Salem."
*   **Secondary:** "Commercial Facility Maintenance Harney County," "Church Maintenance Services Willamette Valley."
*   **Intent:** User knows the problem (leak, decay, overhead) and wants a specific solution (subscription, fix).

### Tier 2: Informational (Authority Builders)
*   **Primary:** "True cost of homeownership 2026," "Deferred maintenance ROI calculator," "Average kitchen remodel cost Oregon 2026."
*   **Strategy:** Capture top-of-funnel traffic via the **True Cost Calculator** and **Methodology Hub**.

### Tier 3: Navigational (Brand)
*   **Primary:** "Benson Home Solutions," "Elric Benson Contractor," "CCB 258533."
*   **Defense:** Dominate the Knowledge Panel with schema-rich About and Contact pages.

## 2. Target Audience Analysis
*   **The "Overwhelmed Homeowner" (Albany/Salem):** 35-55, dual income, no time for DIY. Fears hidden costs. *Needs: Predictability.*
*   **The "Facility Steward" (Church/HOA):** Volunteer board member, risk-averse, needs to justify spend to a committee. *Needs: Auditable logs, professional docs.*
*   **The "Rural Owner" (Harney County):** Practical, skeptical of city slickers, values "showing up." *Needs: Reliability.*

## 3. Technical SEO Foundation
*   **URL Structure:** Flat and descriptive.
    *   `bensonhomesolutions.com/services/maintenance-subscriptions` (Not `/services/residential/subscriptions`)
    *   `bensonhomesolutions.com/tools/cost-calculator`
    *   `bensonhomesolutions.com/areas/albany`
*   **Mobile-First Indexing:** 
    *   Critical for rural users on 4G/LTE.
    *   Touch targets > 48px.
    *   No layout shifts (CLS < 0.1).
*   **Canonicalization:** Every page must self-reference to prevent duplicate content issues with UTM parameters.
*   **Robots.txt:** Allow all agents, disallow `/dashboard/*` (Client Private Data) and `/api/*`.

## 4. Implementation Plan
1.  **Sitemap:** Configure `next-sitemap` to auto-generate based on the new `/tools` and `/areas` structure.
2.  **Metadata:** Standardize `OpenGraph` and `Twitter` cards across all pages using a shared `shared-metadata.ts` config.
3.  **Schema:** Inject `JSON-LD` for `Service`, `AreaServed`, and `Organization` on the homepage.

---
**Status:** Strategy Defined.
**Next Step:** Proceed to Iteration 2 (Content Strategy).

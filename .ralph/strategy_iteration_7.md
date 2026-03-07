# Iteration 7: Content Migration & SEO Preservation Strategy

## 1. Migration Audit: The "K.U.D.R." Model
We categorize every existing page from the "Old" site (pre-March 2026 rebuild) into one of four actions.

### Action: Keep (Maintain URL & Content)
*   **Target:** High-authority project galleries and historical case studies.
*   **SEO Value:** Backlinks and image search rankings.
*   **Integration:** Add new "Senior Principal" badges and updated CCB license footer.

### Action: Update (Maintain URL, Overhaul Content)
*   **Target:** Service pages (e.g., `/services/kitchen-remodeling`).
*   **Overhaul:** Inject 2026 market data, deterministic pricing snippets, and links to the `CostEstimator`.
*   **Goal:** Move from "We do kitchens" to "Kitchen Remodeling Methodology & ROI."

### Action: Delete (Remove & Redirect)
*   **Target:** Thin blog posts (e.g., "Welcome to our new website"), expired promotions, and orphan pages.
*   **Redirect Logic:** Use 301 redirects to the most relevant Level 1 Hub (`/services` or `/tools`).
*   **Cleanup:** Remove all generic stock image pages with no technical value.

### Action: Repurpose (Change URL & Transform)
*   **Target:** "About Us" page.
*   **Transformation:** Move to `/about/the-benson-standard`. Focus on forensic authority, CCB license history, and "Why we don't do Jerry-work."
*   **Target:** Old "Contact" page -> `/get-started`. Integrate lead-gating and HubSpot forms.

## 2. Technical Migration Checklist

### Redirect Map (Top Priority)
| Old URL | New URL | Reason |
| :--- | :--- | :--- |
| `/blog/how-to-fix-leak` | `/diagnostics/moisture-ingress-detection` | Authority Overhaul |
| `/services/residential` | `/services/maintenance` | Pillar Alignment |
| `/areas-served` | `/areas` | Hub Structure |
| `/calculator` | `/tools/cost-calculator` | Tool Consolidation |

### URL Normalization
*   Ensure all new URLs are lowercase and use hyphens (no underscores or camelCase).
*   Remove `.html` or `.php` extensions from old URLs via 301 redirects.

### Metadata Preservation
*   Scrape top-performing meta titles and descriptions from old site.
*   Keep keywords that are currently driving traffic, but wrap them in the new 2026 brand tone.

## 3. SEO Continuity Loop
1.  **Crawl Old Site:** Export all URLs and current rankings.
2.  **Verify New URLs:** Ensure all "Keep" and "Update" targets are indexed in the new sitemap.
3.  **Monitor 404s:** Use Google Search Console to catch and fix migration leaks within 24 hours of launch.
4.  **Canonical Audit:** Ensure old pages aren't still floating in the cache without a canonical pointer to the new ones.

---
**Status:** Migration Strategy Defined.
**Next Step:** Proceed to Iteration 8 (Authority Content Plan).

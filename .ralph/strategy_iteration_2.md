# Iteration 2: Content Strategy & Authority Pillars

## 1. Content Philosophy: "Forensic Authority"
Benson Home Solutions does not write "blogs." We publish **Technical Briefs**, **Market Updates**, and **Diagnostic Reports**. Every piece of content must be actionable, data-backed, and devoid of fluff.

**The "No-Slop" Rule:** If an LLM could have written it without access to our private `estimating-engine.ts` data, it gets deleted.

## 2. Content Pillars

### Pillar A: The Building Envelope (Technical Deep Dives)
*   **Focus:** Diagnostics, failure modes, and forensic restoration.
*   **Target:** High-intent users with active problems (leaks, rot, cracks).
*   **Asset Types:**
    *   **Diagnostic Guides:** "How to differentiate between hydrostatic pressure and plumbing leaks."
    *   **Case Studies:** "Forensic breakdown of a 1920s bungalow water ingress failure (Albany, OR)."
    *   **SOPs:** Public versions of our internal Standard Operating Procedures (e.g., "SOP 102: Shear Wall Retrofitting").

### Pillar B: The 2026 Market Index (Economic Authority)
*   **Focus:** Transparency, pricing, and ROI.
*   **Target:** Analytical homeowners and facility boards.
*   **Asset Types:**
    *   **Monthly Market Reports:** "March 2026 PPI Update: Why Lumber is Stable but Labor is up 3.4%."
    *   **Cost Breakdowns:** "Line-item analysis of a $45k Kitchen Remodel in Corvallis."
    *   **Methodology Hub:** The source of truth for our calculators.

### Pillar C: Preventive Stewardship (Subscription Value)
*   **Focus:** The financial logic of maintenance subscriptions.
*   **Target:** Subscription leads and commercial managers.
*   **Asset Types:**
    *   **Whitepapers:** "The 5-Year Cost of Deferred Maintenance: A Financial Model."
    *   **Checklists:** "The Church Steward's Quarterly Facility Audit."

## 3. Content Types & Templates

| Type | Purpose | Schema | URL Pattern |
| :--- | :--- | :--- | :--- |
| **Methodology** | Core authority pages explaining *how* we calculate costs. | `Article` | `/methodology/[slug]` |
| **Diagnostic** | Problem-solving guides for active issues. | `HowTo` | `/diagnostics/[slug]` |
| **Market Alert** | Timely updates on pricing/labor trends. | `NewsArticle` | `/market-updates/[slug]` |
| **Project** | Evidence of competence. Before/Afters. | `Project` | `/projects/[slug]` |

## 4. 30-Day Content Calendar (Sprint 1-2)

### Week 1: Establish the Baseline
1.  **Methodology:** "How we calculate 'True Cost' of ownership (Data Sources: FEMA, Census, DOE)."
2.  **Diagnostic:** "Identifying 'The Big 3' Spring Failures in Mid-Willamette Valley."
3.  **Project:** "Historic Home Restoration: 3rd St, Albany."

### Week 2: Economic Focus
1.  **Market Alert:** "Why your insurance premium just went up 12% (And how maintenance logs help)."
2.  **Methodology:** "Deferred Maintenance Multipliers: The Math behind the 3.5x Risk."
3.  **Project:** "Commercial HVAC Retrofit: Salem Office Park."

### Week 3: Geo-Targeting
1.  **Diagnostic:** "Common Foundation Issues in Harney County's High Desert Soil."
2.  **Guide:** "Permitting a Remodel in Corvallis: 2026 Requirements."
3.  **Project:** "Farmhouse Renovation: Riley, OR."

### Week 4: The Subscription Push
1.  **Whitepaper:** "Case Study: How Subscription #BHS-104 Saved $8k in Water Damage."
2.  **Comparison:** "Reactive vs. Proactive: A 5-Year P&L Analysis."
3.  **Guide:** "What to look for in a Maintenance Contract."

## 5. Implementation Notes
- **Sanity:** Use `methodologyDetail` for Pillar B. Create `marketUpdate` schema for Pillar B news.
- **Interlinking:** Every Diagnostic post *must* link to the `SubscriptionRecommender`. Every Market Alert *must* link to the `CostEstimator`.

---
**Status:** Content Strategy Locked.
**Next Step:** Proceed to Iteration 3 (Competitor Analysis).

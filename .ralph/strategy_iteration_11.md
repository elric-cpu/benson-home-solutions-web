# Iteration 11: Monitoring, Analytics & SEO Performance Plan

## 1. The Measurement Stack
We use a three-tier tracking model to measure technical health, search performance, and business conversion.

### Tier 1: Technical & Error Monitoring (Developer Level)
*   **Tools:** Sentry + Vercel Analytics.
*   **KPIs:**
    *   **JS Error Rate:** < 0.5% (Chatbot and Tool crashes).
    *   **API Latency:** < 200ms for recommendation engine.
    *   **Core Web Vitals:** Monthly Lighthouse CI audits to prevent regressions.

### Tier 2: Search Performance (SEO Level)
*   **Tools:** Google Search Console (GSC) + Bing Webmaster Tools + Ahrefs/Semrush.
*   **KPIs:**
    *   **Organic Impressions/Clicks:** Tracking growth for "Technical" vs. "Brand" keywords.
    *   **Average Position:** Target top 3 for "Maintenance Subscription Albany."
    *   **Indexation Coverage:** 100% of sitemap.xml pages indexed.
    *   **Backlink Profile:** Growth in "Referring Domains" from .gov and .edu.

### Tier 3: Conversion & Funnel Analytics (Business Level)
*   **Tools:** GA4 (Google Analytics 4) + HubSpot CRM.
*   **KPIs:**
    *   **Tool Engagement:** "Calculator Started" -> "Email Captured" -> "Report Generated."
    *   **Lead Quality:** % of leads from "Service Area Match" vs. "Out of Area."
    *   **Content ROI:** Which blog posts lead to "Subscription Recommender" starts?

## 2. GA4 Custom Event Map (High-Intent Actions)

| Event Name | Trigger | Value |
| :--- | :--- | :--- |
| `tool_start` | User clicks "Start" on any calculator. | 0 |
| `lead_capture` | User submits email in any tool. | High |
| `agreement_drafted` | User reaches the finalized agreement screen. | Critical |
| `emergency_click` | User clicks the red "Emergency" button. | Critical |
| `diagnostic_read` | User scrolls 75% through a Diagnostic Brief. | Medium |

## 3. SEO Success Reporting (Weekly Loop)
*   **The "Gap" Report:** Identification of top 10 informational keywords we rank for but have no Tool/CTA for.
*   **The "Conversion" Report:** Tracking the path from `/methodology/*` to `/tools/*`.
*   **The "Local" Report:** Map Pack rankings for Albany, Corvallis, and Burns.

## 4. Feedback & Iteration
*   **Heatmaps (e.g., Hotjar/Microsoft Clarity):** Identify where users drop off in the `TrueCostCalculator`.
*   **Form Analytics:** Are people failing at the "Square Footage" or "Email" step?
*   **Gus Chat Logs:** Analyze common questions to identify new content pillars or FAQ items.

---
**Status:** Analytics Plan Defined.
**Next Step:** Proceed to Iteration 12 (Trust & Credibility).

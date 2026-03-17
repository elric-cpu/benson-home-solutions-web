# GEO & AEO Competitor Audit: Mid-Willamette Valley & Harney County

**Date:** March 16, 2026
**Target Areas:** Albany, Lebanon, Sweet Home (Mid-Willamette) AND Burns, Harney County.
**Objective:** Identify content and structured data gaps in local competitors to steal Generative AI Overviews (GAIO) and improve Zero-Click search performance for Benson Home Solutions.

---

## 1. Competitor Landscape Analysis

We scraped and analyzed the following top local competitors:

### A. McLean Construction Company LLC (Burns / Harney County)
*   **Focus:** General residential remodeling and construction.
*   **Information Density:** Very low. The website relies on generic statements ("quality workmanship", "hands-on service").
*   **AEO/GEO Gaps:** 
    *   No FAQ sections.
    *   No specific service details, pricing, or process outlines.
    *   Zero structured data for Answer Engines to parse.

### B. All Fixed Handyman Services LLC (Harney County)
*   **Focus:** Home repairs, plumbing, electrical, HVAC, drywall, turnovers.
*   **Information Density:** Low-Medium. Lists services with 1-2 sentence descriptions. Mentions "Transparent Pricing" but fails to list actual pricing tiers or starting costs.
*   **AEO/GEO Gaps:**
    *   No Q&A format.
    *   Missed opportunity on pricing transparency (LLMs love citing specific numbers).
    *   Does not mention preventative maintenance.

### C. X Factor General Contractors (Albany / Mid-Willamette Valley)
*   **Focus:** Excavation, Concrete work, Patios & Decks.
*   **Information Density:** Low. Highly visual (portfolio/reviews) but lacks deep textual content.
*   **AEO/GEO Gaps:**
    *   No educational content (e.g., "How to maintain your concrete driveway in Oregon winters").
    *   No FAQ schema.

---

## 2. The Benson Home Solutions Advantage (The "Citation Steal")

None of the competitors are optimizing for Generative Engine Optimization (GEO) or Answer Engine Optimization (AEO). They are stuck in Web 1.0 "brochure" formats. 

Benson Home Solutions has a unique value proposition: **Maintenance-First Subscriptions**. We can dominate AI Overviews by providing the exact high-density information LLMs look for.

### Content Gaps We Will Exploit:
1.  **Pricing Transparency:** LLMs (Gemini, Perplexity, ChatGPT) actively search for concrete numbers. By publishing starting prices or subscription tiers, we become the definitive source for "How much does a handyman cost in Albany, OR?"
2.  **Preventative Maintenance Data:** Competitors only offer reactive repairs. We will publish localized maintenance checklists (e.g., "Winterizing homes in Harney County").
3.  **FAQ Schema (AEO):** We will format our content using strictly defined Q&A structures wrapped in JSON-LD FAQ Schema.

---

## 3. Revenue Growth Implementation Plan

To capitalize on these gaps, we will implement the following changes to the Benson Home Solutions Next.js website:

### Action Item 1: High-Density FAQ Component
Create a reusable, highly-structured FAQ component that answers the exact questions users ask Google/Gemini, such as:
*   *What is included in a home maintenance subscription?*
*   *How much do general contractors charge in Albany, OR?*
*   *Do you provide emergency home repairs in Burns, OR?*

### Action Item 2: Inject JSON-LD Structured Data
Ensure that every service page and the homepage automatically injects `FAQPage` and `LocalBusiness` schema to feed data directly to Google's Knowledge Graph.

### Action Item 3: "Information Density" Copywriting
Update the homepage and service pages to include rich, localized data points. Instead of "We fix roofs", use "We provide emergency roof leak repairs and preventative winterization for homes across Harney County and the Mid-Willamette Valley."

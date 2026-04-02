# Lead Generator Dominance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the website into a dominant lead generator by fixing technical audit issues, expanding thin content for AEO/GEO, and launching targeted competitor comparison pages.

**Architecture:** We will implement fixes iteratively. First, we resolve technical blockers (broken links, CAPTCHA, accessibility). Next, we expand content on area and tool pages to meet word count requirements and rank in Answer Engines. Finally, we build new competitor comparison pages.

**Tech Stack:** Next.js 15, React, Tailwind CSS, Sanity CMS (if used for content), SquirrelScan (for verification).

---

## The Competitor Landscape

To position Benson Home Solutions as the premier maintenance-first subscription service, we analyzed the 15 strongest competitors across the Mid-Willamette Valley and Harney County:

### Direct Subscription Competitors
1. **Kaufman’s Home Maintenance** (Salem/Mid-Valley): Quarterly plans (~$430/visit), 14-point checklist.
2. **HomeSmiles** (Salem/Albany/Corvallis): Exterior cleaning bundles ($299-$399).
3. **Efficient Property Service, LLC** (Statewide): Monthly handyman/yard subscriptions ($149/mo).
4. **Hedgehog Home Services, LLC** (Fringe Mid-Valley): Basic semi-annual plans ($29/mo).
5. **The Betty Brigade**: Handyman subscription blocks.

### Trade-Specific Memberships
6. **3 Mountains Home Services**: Plumbing/Electrical care plan ($19/mo).
7. **Superior Carpet and Ducts**: Indoor air quality maintenance plans.
8. **Stutzman Services**: Plumbing & well maintenance.

### General Contractors (Traditional Competition)
9. **Star Builders** (Keizer): Custom homes/remodels.
10. **Kaufman Homes, Inc.** (Salem): Design-build.
11. **AMCO NW Construction**: Remodels and decks.
12. **Kempf Construction**: Blueprint-to-build.
13. **Ken Kness Construction** (Hines): Local GC.
14. **Specialty Construction LLC** (Burns): Long-standing GC.
15. **Columbia Plumbing Services, Inc.** (Burns): Plumbing construction.

**Our Unique Positioning:** We are traditional general contractors who specialize in proactive maintenance subscriptions. We offer diagnostic, AI-driven maintenance with 24/7 priority emergency response. We are the only professional subscription targeting both the Mid-Valley and Harney County.

---

### Task 1: Fix Technical Conversion Blockers

**Files:**
- Modify: `src/app/contact/page.tsx` (and related form components)
- Modify: `src/components/calculator/CalculatorButton.tsx` (or equivalent)
- Modify: `src/app/areas/keizer/page.tsx` (and related routing)

- [x] **Step 1: Add CAPTCHA to Forms**
  - Integrate a CAPTCHA solution (e.g., Turnstile or reCAPTCHA) to the main lead capture forms on `/contact` and `/calculator`.
- [x] **Step 2: Fix Accessibility on Calculator**
  - Ensure the `aria-label` matches the visible text on the "Calculate my true cost" button.
- [x] **Step 3: Fix Broken Internal Links**
  - Audit and fix the 404 links pointing to `/areas/keizer/inspection-repairs`, `/areas/philomath/`, etc. Remove them if those services are not offered in those areas, or create the pages.
- [x] **Step 4: Resolve Orphan Pages**
  - Add meaningful internal links to the 17 orphan pages identified in the audit (e.g., from the homepage or footer to `/tools/cost-estimator` and `/areas/burns/emergency-response`).

### Task 2: Content Expansion for AEO/GEO

**Files:**
- Modify: `src/app/calculator/page.tsx`
- Modify: `src/app/tools/cost-estimator/page.tsx`
- Modify: `src/app/areas/[slug]/page.tsx` (or individual area pages)

- [x] **Step 1: Expand Tool Pages**
  - Add at least 150 words of explanatory content to the True Cost Calculator and Cost Estimator pages. Explain *why* maintenance saves money to build trust before the lead gate.
- [x] **Step 2: Expand Area Pages**
  - Add localized content to Albany, Burns, Corvallis, Drewsey, and Hines pages to exceed the 300-word minimum.
- [x] **Step 3: Fix Meta Tags**
  - Shorten meta titles on area pages to be under 60 characters.
  - Lengthen meta descriptions on tool pages to be highly descriptive and enticing for searchers.
- [x] **Step 4: Fix Heading Hierarchy**
  - Ensure H1 -> H2 -> H3 logical progression on the calculator and privacy pages (fix the H1 -> H3 skip).

### Task 3: Competitor Comparison Landing Pages

**Files:**
- Create: `src/app/compare/kaufmans-home-maintenance/page.tsx`
- Create: `src/app/compare/homesmiles/page.tsx`

- [x] **Step 1: Build the Comparison Template**
  - Create a reusable layout for "Benson Home Solutions vs. [Competitor]".
  - Include a feature matrix emphasizing our 24/7 response, detailed logging, and Harney County coverage.
- [x] **Step 2: Launch Kaufman's Comparison**
  - Populate the template with data comparing our comprehensive maintenance against Kaufman's quarterly 14-point check.
- [x] **Step 3: Launch HomeSmiles Comparison**
  - Populate the template with data comparing our holistic home care against HomeSmiles' exterior-only bundles.

### Task 4: Final Validation

- [x] **Step 1: Run SquirrelScan Audit**
  - Re-run `squirrel audit https://bensonhomesolutions.com --format llm` against the local development server (or staging).
  - Expected: Score > 95 (Grade A).
- [x] **Step 2: Verify Lead Flow**
  - Test the newly secured (CAPTCHA) forms to ensure lead data still flows perfectly into HubSpot/CRM.

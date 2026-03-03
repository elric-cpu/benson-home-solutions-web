# PRD: True Cost of Homeownership Calculator

## Overview
A Next.js (App Router) based, address-indexed homeownership cost calculator. This tool is designed to be a primary lead generation engine for Benson Home Solutions, providing radical transparency into the hidden annual costs of homeownership (taxes, insurance, maintenance, energy, etc.).

## Target Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS / Vanilla CSS
- **Data:** Static JSON files per ZIP code (mocked for initial phase, pre-computed for final)
- **CRM:** HubSpot Integration (via `/api/contact`)
- **Reporting:** Unique SSR report pages at `/tools/cost-calculator/report/[hash]`
- **Social:** OG Image generation using `next/og`

## Features & Requirements
### 1. Address Autocomplete (In Progress)
- [x] Integrate Geoapify Address Autocomplete.
- [ ] Handle US-only addresses gracefully.
- [ ] Show "Service Area" badge for Benson-covered Oregon ZIPs (97386 +/- 75mi + Harney County).

### 2. Cost Analysis Engine (In Progress)
- [x] Animated reveal of total annual cost.
- [x] Comparison metrics (e.g., "X round-trip flights to Hawaii").
- [x] Animated cost breakdown bar charts with links to methodology.
- [x] "Deferred Maintenance Alert" section with risk escalation curve.

### 3. Lead Generation (In Progress)
- [x] Multi-step funnel (Input -> Processing -> Result -> Lead Gen).
- [x] Email capture form integrated with HubSpot/Supabase.
- [ ] Property type selector (Residential, Commercial, Church).
- [ ] Success state with next steps (e.g., "Book Assessment" for service area).

### 4. Personalization & Unique Reports (Pending)
- [ ] Generate a unique hash for each address submission.
- [ ] Create SSR report pages at `/tools/cost-calculator/report/[hash]`.
- [ ] Allow users to refine estimates (SqFt, Year Built, etc.) on the report page.

### 5. Methodology Hub (In Progress)
- [x] Dynamic methodology pages for each cost category.
- [x] Citations and data source links (Census, FEMA, DOE, etc.).
- [ ] Detailed "Cost Model" explanations for each page.

### 6. Social Sharing & OG Images (Pending)
- [ ] Generate dynamic OG images showing the annual cost and address.
- [ ] Native `navigator.share()` implementation on mobile.

### 7. Embeddable Widget (Pending)
- [ ] Create a standalone iframe-ready version of the calculator.
- [ ] CORS-enabled endpoint for embedding on partner sites.

## Acceptance Criteria
- Address "123 Main St, Albany, OR 97321" returns validated breakdown within 1s.
- Lighthouse Mobile Score > 90.
- Lead capture successfully pushes to CRM and shows success state.
- Report URL displays the full breakdown and allows sharing.
- Social previews show accurate total cost data.

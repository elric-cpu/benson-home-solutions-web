# Iteration 6: Site Architecture & Navigation Design

## 1. Information Architecture (IA) Model: The "Hub & Spoke"
We use a flat hierarchy for maximum crawl efficiency, but logically grouped for UX.

### Level 0: The Core (Homepage)
*   **Target:** Brand Authority & Core Value Proposition.
*   **Linking:** Links to all Level 1 Hubs.

### Level 1: The Hubs
1.  **Services Hub (`/services`)**
2.  **Tools Hub (`/tools`)**
3.  **Methodology Hub (`/methodology`)**
4.  **Areas Hub (`/areas`)**
5.  **Emergency Hub (`/emergency`)**

### Level 2: The Spokes (Deep Authority)
*   **Services Spokes:** `/services/maintenance`, `/services/remodeling`, `/services/demolition`.
*   **Tools Spokes:** `/tools/cost-calculator`, `/tools/cost-estimator`.
*   **Methodology Spokes:** `/methodology/deferred-maintenance`, `/methodology/energy`.
*   **Areas Spokes:** `/areas/albany`, `/areas/burns`, `/areas/salem`.

## 2. Navigation Design

### Main Header (The Conversion Driver)
1.  **Services** (Mega-menu with categories: Maintenance, Remodeling, Specialty).
2.  **Tools** (Dropdown: Cost Calculator, ROI Calc, Estimator).
3.  **About** (Dropdown: Our Story, The Benson Standard, Careers).
4.  **Areas** (Dropdown: Mid-Willamette, Harney County).
5.  **Emergency** (Red highlighted link/button).
6.  **CTA Button:** "Get a Quote" (Primary) | "Ask Gus" (Secondary).

### Global Footer (The Authority Builder)
*   **Column 1:** Brand Info, CCB License, Social Icons.
*   **Column 2:** Core Services (Links to spokes).
*   **Column 3:** Intelligence Tools (Links to tool spokes).
*   **Column 4:** Resources (Methodology Hub, Market Updates, FAQ).
*   **Column 5:** Contact Info (NAP), Map Link.

## 3. Internal Linking Strategy (The "Power Loop")

### Loop A: Problem -> Analysis
*   **Diagnostic Post** (e.g., "Basement Leak") -> Links to **Subscription Recommender**.
*   **Tool Result** (e.g., "High Risk") -> Links to **Emergency Restoration Service**.

### Loop B: Pricing -> Methodology
*   **Cost Estimator Result** -> Links to **Methodology Hub** ("How we calculate these numbers").
*   **Methodology Page** -> Links to **Contact Form** ("Get a detailed site assessment").

### Loop C: Geographic Authority
*   **Geo Landing Page** (e.g., `/areas/albany`) -> Links to **Project Case Study** in Albany.
*   **Project Case Study** -> Links back to **Geo Landing Page** and relevant **Service Page**.

## 4. Technical UX Considerations
*   **Breadcrumbs:** Implement recursive breadcrumbs on all spokes: `Home > Tools > Cost Calculator`.
*   **Search:** Dedicated site-search for SOPs and Diagnostic guides.
*   **Pagination:** Limit blog/project listings to 12 items with "Load More" to preserve crawl depth.

---
**Status:** Architecture Designed.
**Next Step:** Proceed to Iteration 7 (Content Migration).

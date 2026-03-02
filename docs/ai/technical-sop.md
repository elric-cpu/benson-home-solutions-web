# Benson Home Solutions: Technical System Architecture (AI Agent SOP)

This document provides technical architectural rules and system specifications for AI agents modifying the Benson Home Solutions platform.

## 1. Directory Structure & Naming Conventions
*   **Frontend**: Next.js (App Router) in `src/app/`.
*   **Components**: UI components in `src/components/ui/`, layout components in `src/components/layout/`.
*   **Styling**: Tailwind CSS utility classes and `globals.css`. Vanilla CSS is preferred for new standalone components.
*   **Database**: Supabase PostgreSQL and Drizzle ORM in `src/lib/db/`.
*   **CMS**: Sanity schemas in `src/sanity/schemas/`.

## 2. Core Frontend Components
### `RichHero` (`src/components/ui/RichHero.tsx`)
*   **Props**: `title`, `description`, `backgroundImage`, `videoBackground`, `badge`, `overlayOpacity`.
*   **Rules**:
    *   If `videoBackground` is present, it **must** be prioritized over `backgroundImage`.
    *   `backgroundImage` **must** be used as the `poster` attribute for the video element.

### `ResourcesSection` (`src/components/ui/ResourcesSection.tsx`)
*   **Props**: `resources` (array of `Resource`).
*   **Rules**:
    *   Ensure the `rel` attribute is set to `dofollow` if `resource.isBacklink` is `true`.
    *   This component **must** be rendered on all high-level page templates (Homepage, Service, Area, Methodology).

## 3. SEO & Structured Data (JSON-LD)
*   **Implementation**: Use specialized JSON-LD components in `src/components/seo/json-ld.tsx`.
*   **Requirements**:
    *   `LocalBusinessJsonLd` on the Homepage.
    *   `ServiceJsonLd` on Service Pages.
    *   `FAQPageJsonLd` on any page containing `faqItems`.
    *   `BreadcrumbJsonLd` on all pages except the Homepage.

## 4. CMS Schema Rules
*   **Singleton vs. Document**: `homePage`, `aboutPage`, `contactPage`, `emergencyPage`, `methodologyPage`, `siteSettings` are **singletons** (use single instance in Sanity).
*   **Service Pages**: `servicePage` documents are dynamic and use `slug` for routing.
*   **Validation**: Every page schema **must** include a `resources` array with a minimum/maximum length of 6.

## 5. Hubspot & Analytics
*   **Hubspot**: Use `HubSpotForm` component with `portalId` and `formId` from `src/lib/constants.ts`.
*   **Analytics**: `google-analytics.tsx` in `src/components/analytics/` handles tracking via `gtag`.

---
**Status**: Stable. Follow strictly for all structural or architectural modifications.

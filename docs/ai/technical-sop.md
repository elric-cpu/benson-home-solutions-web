# Benson Home Solutions: Technical System Architecture (AI Agent SOP)

This document provides technical architectural rules and system specifications for AI agents modifying the Benson Home Solutions platform.

## 1. Directory Structure & Naming Conventions
*   **Frontend**: Next.js (App Router) in `src/app/`.
*   **Components**: UI components in `src/components/ui/`, layout components in `src/components/layout/`.
*   **Styling**: Tailwind CSS utility classes and `globals.css`. Vanilla CSS is preferred for new standalone components.
*   **Database**: Drizzle-backed application data in `src/lib/db/`.
*   **Google Integrations**: Google-authenticated platform services in `src/lib/gcloud/` and Google AI entrypoints in the app/backend flows.
*   **Credential Boundary**: Production integrations must authenticate through the approved GCloud JSON service account and/or Google Workspace-managed access.

## 1A. Non-Negotiable Platform Mandate
*   **AI Models**: All image and video generation **must** use a model from the Gemini or broader Google model families.
*   **Website AI**: All website AI features **must** run on Google AI infrastructure and Google-approved auth paths.
*   **Chatbot**: The website chatbot **must** be implemented on Google AI.
*   **Workspace Systems**: Email, calendar, contacts, and operational storage **must** use Google Workspace and/or Google Cloud Storage buckets.
*   **Architecture Policy**: Non-Google systems are not allowed as primary replacements for these capabilities unless the office contract files are explicitly revised first.

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

## 4. Content & Schema Rules
*   **Content System**: Content schemas and document rules must align with the active content backend used by the repo.
*   **Singleton vs. Document**: Home, about, contact, emergency, methodology, and site settings content types remain singleton-style unless explicitly redesigned.
*   **Validation**: Every high-level page content model **must** include a `resources` array with a minimum/maximum length of 6.

## 5. Communications, Storage, and Analytics
*   **Email**: Route operational and product email through Google Workspace.
*   **Calendar / Contacts**: Use Google Workspace as the source of truth for scheduling and contact records.
*   **Storage**: Store generated assets and operational files in Google Workspace-managed storage and/or Google Cloud Storage buckets.
*   **Analytics**: `google-analytics.tsx` in `src/components/analytics/` handles tracking via `gtag`.

---
**Status**: Stable. Follow strictly for all structural or architectural modifications.

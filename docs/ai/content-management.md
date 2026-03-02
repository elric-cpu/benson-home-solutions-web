# Benson Home Solutions: AI Agent Content Operations (SOP)

This document provides structured instructions for AI agents (Gemini, Cursor, etc.) tasked with managing content on the Benson Home Solutions platform.

## 1. Schema Identifiers
*   **FAQ Item**: `faqItem`
*   **Testimonial**: `testimonial`
*   **Service Page**: `servicePage`
*   **Homepage**: `homePage`
*   **Project**: `project`
*   **Resource Object**: `resource` (nested in `resources` array)

## 2. Mandatory Content Constraints
### FAQ Items (`faqItem`)
*   `isActualCustomerQuestion`: **Must** be set to `true` if the question originates from a documented customer interaction.
*   `source`: Required for tracking (e.g., "Phone", "Email", "Service Call").
*   `answer`: Use `PortableText` for high-fidelity formatting. Avoid plain text strings.

### Resources & Backlinks (`resources`)
*   **Requirement**: Every page (Homepage, Service, Area, Methodology, Blog, About, Contact, Emergency) **must** contain an array of exactly 6 `resource` objects.
*   **Verification**: Ensure each resource has a valid `url`, `authority` label, and clear `description`.
*   **Backlinks**: Set `isBacklink: true` for SEO tracking. Use `dofollow` rel tags in the frontend (`ResourcesSection` component handles this automatically).

## 3. Media Operations
### Video Backgrounds
*   **Field**: `heroVideo` (URL type)
*   **Instruction**: Provide a direct MP4 link. The `RichHero` component handles the `autoPlay`, `muted`, `loop`, and `playsInline` attributes.
*   **Fallback**: Always provide a `heroImage` (Sanity image type) for the video `poster` and as a fallback for slow connections.

### Project Documentation
*   **Field**: `beforeImage`, `afterImage`
*   **Instruction**: When adding projects, use high-resolution images.
*   **SEO**: Populate `alt` text for both images using the pattern: `[Action] [Service] in [City], [State] - Benson Home Solutions`.

## 4. Frontend Integration
*   Use the `RichHero` component for all page headers.
*   Use the `ResourcesSection` component at the bottom of pages, but before the final CTA.
*   Use the `FAQPageJsonLd` SEO component when FAQs are present on a page.

---
**Status**: Stable. Follow strictly for all content updates.

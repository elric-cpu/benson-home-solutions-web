# Benson Home Solutions: Marketing Operations (AI Agent SOP)

This document provides technical design tokens and branding rules for AI agents creating or modifying marketing-related code or assets.

## 1. Visual Design Tokens (Tailwind & CSS)
*   **Oxblood (Primary)**: `#4C0C14`
*   **Cream (Accent)**: `#FFFDF9`
*   **Charcoal (Secondary)**: `#2D2D2D`
*   **Slate (Secondary)**: `#4A4A4A`
*   **Border Radius**: `0.75rem` (12px) for cards, `1rem` (16px) for larger sections.
*   **Shadows**: Use `shadow-elevated` for high-impact cards (e.g., Contact Form, Rich Hero).

## 2. Branding Constraints
*   **Logos**:
    *   **Text Representation**: "Benson Home Solutions"
    *   **SVG File**: `/public/assets/logos/benson-logo.svg`
*   **Legal Identity**: Use "Benson Enterprises" for contracts and "Benson Home Solutions" for all UI elements.
*   **License Display**: **Oregon CCB #258533**. This must be present in every footer and contact section.

## 3. SEO & Authority Strategy
*   **Page Authority Requirement**: Every `document` type in Sanity representing a Page (Service, Area, About, etc.) **must** contain an array of exactly 6 `resource` objects.
*   **Backlink Strategy**:
    *   Resources with `isBacklink: true` should have `dofollow` rel tags.
    *   Authority labels should prioritize: `.gov` (FEMA, NOAA, Census), `.org` (NAIC, IICRC), and local municipal sites (Albany, Salem).

## 4. Copywriting Rules
*   **Voice**: Use the First-Person Direct Contractor voice.
*   **Prohibited**: Do **not** use emojis in page copy, headers, or buttons. (Icons within UI components like Cards are permitted).
*   **Clarity**: Focus on "preemptive maintenance," "stabilization," and "high-fidelity documentation."

## 5. Hubspot Integration
*   Use the `HUBSPOT` constants from `@/lib/constants` for all form embeds.
*   Ensure all forms include a hidden "Source" field that captures the originating channel (Web, QR, etc.).

---
**Status**: Stable. Apply consistently across all UI and content generations.

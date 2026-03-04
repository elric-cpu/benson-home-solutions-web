# Benson Home Solutions Website - Sprint 1 Fixes & Critical Pages PRD

## HR Eng

| Feature Name | Sprint 1 Fixes & Critical Pages | Summary: Restore site availability and launch high-conversion landing pages for emergency and water damage services. |
| :---- | :---- | :---- |
| **Author**: Pickle Rick | **Status**: Draft | **Created**: 2026-03-04 |

## Introduction

The current production site is returning 404 errors, preventing any traffic conversion. Additionally, high-value services (Emergency, Water Damage) lack dedicated landing pages, missing critical revenue opportunities from urgent user needs.

## Problem Statement

**Current Process:** Users visiting the site see a 404 error. No emergency workflow exists.
**Primary Users:** Homeowners in crisis (water damage, storm damage) in the Mid-Willamette Valley.
**Pain Points:** Site is down (0% conversion). No way to quickly contact for emergencies.
**Importance:** Critical. Every minute down is lost revenue and reputation damage.

## Objective & Scope

**Objective:** Fix the 404 error immediately and deploy high-converting Emergency and Water Damage pages.
**Ideal Outcome:** Site is live, `/emergency` captures leads via SMS/Phone, and `/services/water-damage` ranks for local keywords.

### In-scope
1.  **Fix Homepage 404**: Investigate and resolve Vercel/Next.js routing issues.
2.  **Emergency Page**: Build `/emergency` with tap-to-call and SMS triggers.
3.  **Water Damage Page**: Build `/services/water-damage` using the service template.

### Not-in-scope
-   Chatbot integration (Sprint 2).
-   Cost calculator (Sprint 2).
-   Sanity Schema expansion (Sprint 2).

## Product Requirements

### Critical User Journeys (CUJs)
1.  **Homepage Access**: User visits `bensonhomesolutions.com` and sees the homepage with functioning navigation and CTAs.
2.  **Emergency Help**: User visits `/emergency` on mobile, taps "Call Now", and connects to the business. Alternatively, taps "Text Us" to initiate SMS.
3.  **Service Discovery**: User lands on `/services/water-damage`, reads the process timeline, sees the cost range, and submits a contact form.

### Functional Requirements

| Priority | Requirement | User Story |
| :---- | :---- | :---- |
| P0 | Fix 404 Error | As a user, I want the website to load so I can see services. |
| P0 | Emergency Page UI | As a user in crisis, I want a prominent "Call Now" button so I don't have to search for numbers. |
| P1 | Water Damage Content | As a user, I want to know the cost range ($250-$5k+) and timeline for water restoration. |

## Assumptions

-   Vercel deployment is otherwise healthy (just a config issue).
-   Twilio/SMS integration is a placeholder (`tel:` and `sms:` links) for now, not a full API integration.
-   Content for Water Damage page can be statically defined if Sanity is not ready.

## Risks & Mitigations

-   **Risk**: 404 is a deep config issue. **Mitigation**: Revert to known good state or simplify `next.config.ts`.
-   **Risk**: Emergency page looks bad on mobile. **Mitigation**: Strict mobile-first styling with Tailwind.

## Stakeholders / Owners

-   **Elric Benson**: Owner (needs site live).
-   **Pickle Rick**: Lead Engineer (fixes it).


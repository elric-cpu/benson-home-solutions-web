---
id: 0e3f
title: Water Damage Page
status: Todo
priority: Medium
order: 30
created: 2026-03-04
updated: 2026-03-04
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
---

# Description

## Problem to solve
Users searching for "water damage restoration" land on a generic homepage (or 404), leading to bounce. We need a specific service page to rank for local keywords and convert these high-value leads.

## Solution
Build `/services/water-damage` using the existing service page template.

## Implementation Details
- Route: `src/app/services/water-damage/page.tsx` (or dynamic slug if supported).
- Content: Urgency messaging, process timeline, cost range ($250-$5k+), FAQ.
- SEO: JSON-LD `ServiceJsonLd`.
- CTA: "Get an Estimate" form.

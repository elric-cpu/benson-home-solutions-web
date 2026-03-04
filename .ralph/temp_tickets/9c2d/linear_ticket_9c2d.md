---
id: 9c2d
title: Emergency Page UI
status: Todo
priority: High
order: 20
created: 2026-03-04
updated: 2026-03-04
links:
  - url: ../linear_ticket_parent.md
    title: Parent Ticket
---

# Description

## Problem to solve
Users in crisis situations (water damage, storm damage) need immediate access to contact information, but there is no dedicated emergency landing page optimized for mobile urgency.

## Solution
Build a high-performance `/emergency` page focused on immediate conversion via phone call or SMS.

## Implementation Details
- Route: `src/app/emergency/page.tsx`.
- UI: Mobile-first, large "Call Now" button (sticky footer on mobile?), SMS button.
- content: Minimal text, focus on speed and trust.
- Components: Reuse `Button` (variant="destructive" or "emergency"), `Section`.

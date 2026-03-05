---
id: cleanup-master
title: Master Deployment Fix & Codebase Cleanup
status: Ready for Dev
priority: High
order: 1
created: 2026-03-05
updated: 2026-03-05
links:
  - url: linear_ticket_parent.md
    title: Parent Ticket
  - url: cleanup-master/research_2026-03-05.md
    title: Research Document
  - url: cleanup-master/research_review.md
    title: Research Review
  - url: cleanup-master/plan_2026-03-05.md
    title: Implementation Plan
  - url: cleanup-master/plan_review.md
    title: Plan Review
---

# Description

## Problem to solve
The project has multiple deployment errors, incomplete features, inconsistent logic, and unorganized dependencies. The codebase contains "AI Slop" and needs rigorous organization and optimization.

## Goals
- Find and correct all deployment errors (Vercel/Next.js).
- Complete and/or build any missing features/logic.
- Standardize logic across the AI provider (OpenRouter) and pricing engines.
- Clean up dependencies (remove deprecated, align versions).
- Organize the codebase for maintenance and scalability.

## Implementation Details
- Standardize AI provider to OpenRouter in `src/lib/ai/provider.ts`.
- Fix Sentry configuration in `next.config.ts`.
- Align Node.js version to 22.x across `.nvmrc`, `package.json`, and Vercel.
- Audit all routes for 404s or incomplete implementations.
- Refactor utility functions and AI recommendation logic.

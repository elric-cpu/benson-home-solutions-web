# Plan: Integrate Gumloop SEO Agent (AEO/SGO Automation)

## Background & Motivation
Benson Home Solutions is moving toward an **Answer-First Architecture** for 2026. A new Gumloop agent (`q919eEgk5ftsYnqebRngdt`) has been provided to automate SEO content generation, specifically targeting Answer Engine Optimization (AEO) and Search Generative Optimization (SGO).

## Scope & Impact
- **Impact:** Automated generation of high-authority, direct-answer summaries for all service pages.
- **Scope:** 
  - `src/sanity/schemas/servicePage.ts`: Add `answerFirstSummary` field.
  - `src/lib/ai/seo.ts`: New utility for Gumloop SEO agent interaction.
  - `src/app/api/ai/seo/generate/route.ts`: New API endpoint for triggering SEO generation.
  - `.env.example`: Add `GUMLOOP_SEO_PIPELINE_ID`.

## Proposed Solution

### 1. Schema Update (`src/sanity/schemas/servicePage.ts`)
Add a new field `answerFirstSummary` (text, max 300 characters) to store the direct answer summary required for AEO.

### 2. SEO AI Utility (`src/lib/ai/seo.ts`)
Create a utility function `generateAnswerFirstSummary` that:
- Takes the service title and content as input.
- Calls the Gumloop SEO agent (`q919eEgk5ftsYnqebRngdt`).
- Uses the `input_data` node (confirmed generic JSON pattern).
- Polls for the generated summary.

### 3. API Endpoint (`src/app/api/ai/seo/generate/route.ts`)
Create a protected route that can be called to generate and potentially save SEO content back to Sanity (or return it for manual review).

## Implementation Plan

### Phase 1: Schema & Infrastructure
- [ ] Update `src/sanity/schemas/servicePage.ts` with `answerFirstSummary`.
- [ ] Update `.env.example` with `GUMLOOP_SEO_PIPELINE_ID`.

### Phase 2: SEO AI Logic
- [ ] Create `src/lib/ai/seo.ts` using the `runGumloopFlow` pattern from `src/lib/ai/gumloop.ts`.

### Phase 3: Trigger Endpoint
- [ ] Create `src/app/api/ai/seo/generate/route.ts` to bridge the Gumloop agent with the Sanity content.

## Verification & Testing
- **Manual Test:** Use the new API route to generate a summary for a test service page.
- **Schema Check:** Verify the new field appears in Sanity Studio (if running).
- **Build Check:** Run `npm run build` to ensure no regressions.

## Rollback Strategy
If the SEO agent fails, the `answerFirstSummary` field can be manually edited in Sanity. The API route will include error handling to avoid breaking the build or CMS integration.

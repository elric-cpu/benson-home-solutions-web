# Plan: Integrate Gumloop AI Agent into Subscription Recommender

## Background & Motivation
Benson Home Solutions uses Gumloop for complex operational workflows and lead qualification. Currently, the `Subscription Recommender` uses a simple LLM call via OpenRouter. Replacing this with a specialized Gumloop agent (ID: `5KxuaKYH1edeEw14NXbbsv`) will allow for more "Senior Principal" level analysis, such as cross-referencing local building codes, weather data, and real-time labor rates.

## Scope & Impact
- **Impact:** Higher accuracy and authority for property maintenance recommendations.
- **Scope:** 
  - `src/lib/ai/gumloop.ts`: New utility for Gumloop API interaction.
  - `src/app/api/agreements/recommend/route.ts`: Update to prioritize Gumloop with OpenRouter as a fallback.
  - `.env.example`: Add Gumloop configuration variables.

## Proposed Solution

### 1. Environment Configuration
Add the following to `.env.example`:
- `GUMLOOP_API_KEY`: API key from Gumloop dashboard.
- `GUMLOOP_USER_ID`: User ID from Gumloop dashboard.
- `GUMLOOP_PIPELINE_ID`: Defaults to `5KxuaKYH1edeEw14NXbbsv`.

### 2. Gumloop Utility (`src/lib/ai/gumloop.ts`)
Create a robust utility using `fetch` to:
- Trigger the pipeline (`start_pipeline`) with `user_id` and `saved_item_id`.
- Provide input via the `input_data` node as a single JSON string containing both the property data and the service catalog.
- Poll for completion (`get_pl_run`) with exponential backoff.
- Parse the resulting output and validate it against the `RecommendationSchema`.

### 3. API Route Refactor (`src/app/api/agreements/recommend/route.ts`)
- Implement a dual-strategy approach.
- Use `GUMLOOP_API_KEY` and `GUMLOOP_USER_ID` from the environment.
- Pass the following payload to Gumloop:
  ```json
  {
    "property": { ... },
    "service_catalog": [ ... ]
  }
  ```
- If Gumloop returns a valid recommendation set, return it immediately.
- Fallback to the current `OpenRouter` + `generateObject` logic if Gumloop fails, is unconfigured, or returns invalid data.

## Implementation Plan

### Phase 1: Infrastructure
- [ ] Update `.env.example` with Gumloop variables.
- [ ] Create `src/lib/ai/gumloop.ts` with polling logic.

### Phase 2: Integration
- [ ] Refactor `src/app/api/agreements/recommend/route.ts` to integrate `runGumloopFlow`.
- [ ] Ensure input/output mapping matches the existing `RecommendationSchema`.

### Phase 3: Verification
- [ ] Create a temporary verification script `scripts/test-gumloop.ts`.
- [ ] Verify error handling (fallback logic).

## Verification & Testing
- **Manual Test:** Use `curl` or a test script to trigger the recommender API and verify it attempts to call Gumloop.
- **Unit Test:** Mock the `fetch` calls in `gumloop.ts` to test success and failure scenarios.
- **Build Check:** Run `npm run build` to ensure no type errors in the new integration.

## Rollback Strategy
The OpenRouter implementation will remain as a primary fallback. If Gumloop fails, the system automatically reverts to the legacy logic, ensuring the user experience is never interrupted.

# Full Project Audit

Date: 2026-03-31
Mode: Read-only
Office: Iron Ledger Digital
Scope: Entire workspace, including frontend, backend functions, automation scripts, media inventory, build health, and release risk.

## Audit Constraints

- No product code changes
- No content edits
- No package or environment changes
- No deployment actions
- Only audit artifacts and machine-readable remediation outputs were generated

## Executive Summary

The project is structurally promising but not releasable in its current state. The top three failures are: a committed service-account private key, a broken production build caused by `src/lib/genkit-node.ts`, and live demo/stub fallbacks in production-facing API and integration paths.

The site also carries unnecessary operational weight: duplicated calculator surfaces, large unused media, a globally mounted chat widget, placeholder gallery content, invalid image files, and backend artifact sprawl inside `benson-genkit-backend/functions`.

## Verified Findings

### Release blockers

1. Committed secret exposure in `benson-genkit-31726-f661784b7733.json`
2. `pnpm run build` fails on `src/lib/genkit-node.ts`
3. Production-facing demo/stub behavior exists in:
   - `src/app/api/chat/route.ts`
   - `src/app/api/estimator/route.ts`
   - `src/app/api/agreements/recommend/route.ts`
   - `src/lib/agreements/signatures.ts`
   - `benson-genkit-backend/functions/src/gscTool.ts`
   - `benson-genkit-backend/functions/src/flows/marketingContentFlow.ts`

### High-leverage authority wins

1. Projects gallery route is still placeholder-only
2. Bathroom remodeling route is only a redirect
3. Media planning is incomplete and still contains `"No description found."`
4. Local image inventory exists but is barely wired into actual routes

### Structural fixes

1. Duplicate calculator paths split authority and user flow:
   - `/calculator`
   - `/tools/cost-calculator`
2. `AIChat` is mounted globally in layout and hydrates site-wide
3. `PropertyCard` exists but is currently orphaned
4. Large client pages concentrate interactive complexity:
   - `src/app/contact/page.tsx`
   - `src/app/tools/cost-calculator/page.tsx`
   - `src/app/tools/cost-estimator/page.tsx`
5. Backend functions workspace is oversized and contains duplicate compiled output trees

### Media and asset issues

1. `public/images/from_facebook/*.jpg` are invalid 12-byte ASCII placeholders
2. `public/videos/background_video.mp4` is ~6.0 MB
3. Multiple generated PNGs exceed ~1.4-2.6 MB each
4. Most large local assets do not appear to be referenced in route code

## Audit Outcome

- Release recommendation: `block`
- QA posture: `no-ship`
- Required next artifact: approved remediation plan, then single-wave execution with internal release gating

# PRD: Comprehensive Codebase Refactor

## Overview
A project-wide refactor of the Benson Home Solutions web platform to ensure stability, maintainability, and human-readability. This includes fixing broken dependencies, decomposing large components, and cleaning up logic layers.

## Objectives
1. **Dependency Stability:** Downgrade/Fix `package.json` versions to stable, existing releases (Next.js 15, AI SDK 3/4, React 19).
2. **Component Decomposition:** Refactor `src/app/page.tsx` and other large route components into functional units.
3. **Logic Layer Cleanup:** Standardize `src/lib` patterns and move configuration/content (like AI prompts) to Sanity CMS.
4. **Build & Lint Integrity:** Ensure zero errors/warnings in `npm run build` and `npm run lint`.
5. **Readability:** Enhance code clarity through consistent naming, typing, and documentation.

## Requirements
- **Stability:** All dependencies must resolve correctly.
- **Modularity:** Components should focus on a single responsibility.
- **Type Safety:** Eliminate `any` types where possible.
- **Performance:** Maintain high Lighthouse scores.

## Tasks
### Phase 1: Core Stability
- [ ] Fix `package.json` dependency versions.
- [ ] Resolve AI SDK mismatch and fix `ChatWidget.tsx` build.
- [ ] Standardize environment variable handling.

### Phase 2: Component Refactoring
- [ ] Decompose `src/app/page.tsx` into feature components.
- [ ] Standardize UI component patterns in `src/components/ui`.
- [ ] Improve Layout component organization.

### Phase 3: Logic & Data Cleanup
- [ ] Move hardcoded prompts and text to Sanity CMS.
- [ ] Refactor `vector-service.ts` for consistency.
- [ ] Standardize CRM and Email utility patterns.

### Phase 4: Verification & Documentation
- [ ] Audit and fix all TypeScript errors.
- [ ] Complete Linting cleanup.
- [ ] Add JSDoc comments to core utility functions.

## Acceptance Criteria
- `npm run build` succeeds without errors.
- `npm run lint` succeeds without errors.
- Code is modular and follows established Next.js patterns.
- No "any" types in critical logic paths.

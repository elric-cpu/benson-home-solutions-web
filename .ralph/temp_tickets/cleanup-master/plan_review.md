# Plan Review: Master Deployment Fix & Codebase Cleanup

**Status**: ✅ APPROVED
**Reviewed**: 2026-03-05

## 1. Structural Integrity
- [x] **Atomic Phases**: Changes are logically grouped by AI, Configurator, and Scaffolds.
- [x] **Worktree Safe**: Plan focuses on specific files and does not depend on unrelated changes.

*Architect Comments*: The phasing is correct, starting with the core AI standardization before moving to tool-specific enhancements.

## 2. Specificity & Clarity
- [x] **File-Level Detail**: Targets specific routes and components.
- [x] **No "Magic"**: Steps are actionable and clearly defined.

*Architect Comments*: The plan correctly identifies the specific lines and files for Sentry and AI SDK fixes.

## 3. Verification & Safety
- [x] **Automated Tests**: Includes `pnpm run build` and `pnpm run lint` as gates.
- [x] **Manual Steps**: Verification steps describe expected behaviors.
- [x] **Rollback/Safety**: No destructive database changes or migrations are planned.

*Architect Comments*: The verification strategy is sufficient for a cleanup task.

## 4. Architectural Risks
- **Data Fetching**: The plan mentions fetching property data via hash but doesn't explicitly name the new endpoint. Recommendation: Implement `src/app/api/properties/[hash]/route.ts` to handle this.
- **Provider Type Mismatch**: Standardizing on OpenRouter is correct, but ensure the `openrouter` instance is compatible with the latest AI SDK `generateObject` and `streamText` signatures.

## 5. Recommendations
- Implement a dedicated API endpoint `src/app/api/properties/[hash]/route.ts` for Phase 2.
- Ensure `src/lib/ai/provider.ts` is the *only* place `createOpenRouter` is called.

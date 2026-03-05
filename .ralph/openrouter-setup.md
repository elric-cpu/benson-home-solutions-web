# Plan: Setup OpenRouter.ai as AI/LLM Provider

## Objective
Fix build failures and properly integrate OpenRouter.ai as the primary AI provider for embeddings, chat, and service recommendations.

## Background
The latest deployment failed due to a missing dependency `@openrouter/ai-sdk-provider` and inconsistencies in AI service implementation across the codebase.

## Proposed Changes

### 1. Dependency Management
- Install `@openrouter/ai-sdk-provider`.
- Ensure `ai`, `@ai-sdk/openai`, and `@ai-sdk/react` are at compatible versions.

### 2. Centralize Provider Configuration
- Create `src/lib/ai/provider.ts` to export a configured `openrouter` provider instance.
- This avoids redundant initialization and simplifies model switching.

### 3. Refactor AI Modules
- **`src/lib/ai/embeddings.ts`**:
  - Import `openrouter` from `./provider`.
  - Export `getEmbedding` as an alias to `generateEmbedding` (or vice versa) to satisfy `vector-service.ts`.
- **`src/lib/services/ai-recommender.ts`**:
  - Use centralized `openrouter` provider.
- **`src/app/api/chat/route.ts`**:
  - Switch from `@ai-sdk/openai` to centralized `openrouter` provider.
  - Load system prompt from `getAIConfig()` in `src/lib/ai/config.ts`.

### 4. Cleanup & Verification
- Remove unused imports of `@ai-sdk/openai` where redundant.
- Verify build locally.

## Implementation Steps

1. **Install Package**: `pnpm add @openrouter/ai-sdk-provider`
2. **Create Provider**: Create `src/lib/ai/provider.ts`.
3. **Fix Embeddings**: Update `src/lib/ai/embeddings.ts` and add missing exports.
4. **Update Chat**: Update `src/app/api/chat/route.ts` to use OpenRouter and system prompt.
5. **Update Recommender**: Update `src/lib/services/ai-recommender.ts`.
6. **Local Build**: Run `pnpm run build` to verify.

## Verification
- Successful local build.
- (Manual) Verify chat functionality if possible with API keys.

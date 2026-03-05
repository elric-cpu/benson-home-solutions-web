// src/lib/ai/provider.ts

import { createOpenRouter } from '@openrouter/ai-sdk-provider';

/**
 * OpenRouter Provider Configuration
 * This centralizes the OpenRouter.ai provider setup for the entire application.
 * All AI-related modules should use this shared provider instance.
 */
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

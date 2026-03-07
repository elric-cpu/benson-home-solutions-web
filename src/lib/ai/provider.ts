import { createOpenRouter } from '@openrouter/ai-sdk-provider';

/**
 * OpenRouter AI Provider
 * Centralized instance for all AI-related features.
 */
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

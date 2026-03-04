/* eslint-disable @typescript-eslint/no-explicit-any */
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { embed, embedMany } from 'ai';

// Initialize OpenRouter provider
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Generates a single embedding for a string of text via OpenRouter.
 * Used for user queries to search the vector database.
 */
export async function generateEmbedding(value: string): Promise<number[]> {
  const input = value.replaceAll('\n', ' ');
  const { embedding } = await embed({
    model: openrouter.textEmbeddingModel('openai/text-embedding-3-small'),
    value: input,
  });
  return embedding;
}

/**
 * Generates embeddings for multiple strings of text via OpenRouter.
 * Used for batch processing and seeding the vector database.
 */
export async function generateEmbeddings(values: string[]): Promise<number[][]> {
  const inputs = values.map(v => v.replaceAll('\n', ' '));
  const { embeddings } = await embedMany({
    model: openrouter.textEmbeddingModel('openai/text-embedding-3-small'),
    values: inputs,
  });
  return embeddings;
}

/**
 * Helper to handle generic metadata or response structures from AI providers
 * while satisfying strict linting requirements.
 */
export function sanitizeMetadata(data: unknown): Record<string, any> {
  if (typeof data !== 'object' || data === null) return {};
  return data as Record<string, any>;
}

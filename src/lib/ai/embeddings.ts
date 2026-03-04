/* eslint-disable @typescript-eslint/no-explicit-any */
import { openai } from '@ai-sdk/openai';
import { embed, embedMany } from 'ai';

/**
 * Generates a single embedding for a string of text.
 * Used for user queries to search the vector database.
 */
export async function generateEmbedding(value: string): Promise<number[]> {
  const input = value.replaceAll('\n', ' ');
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: input,
  });
  return embedding;
}

/**
 * Generates embeddings for multiple strings of text.
 * Used for batch processing and seeding the vector database.
 */
export async function generateEmbeddings(values: string[]): Promise<number[][]> {
  const inputs = values.map(v => v.replaceAll('\n', ' '));
  const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-3-small'),
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

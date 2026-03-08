import { openai } from '@ai-sdk/openai';
import { embed, embedMany } from 'ai';

/**
 * Generates an embedding for a single string.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: text.replace(/\n/g, ' '),
  });
  return embedding;
}

/**
 * Generates embeddings for multiple strings in a batch.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-3-small'),
    values: texts.map((t) => t.replace(/\n/g, ' ')),
  });
  return embeddings;
}

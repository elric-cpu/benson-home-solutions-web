import { pineconeIndex } from './pinecone';
import { generateEmbedding } from './embeddings';

export interface VectorMetadata {
  text: string;
  source: string;
  category?: string;
  title?: string;
  url?: string;
}

/**
 * Upserts a single document into the vector database.
 */
export async function upsertRecord(data: {
  id: string;
  text: string;
  source: string;
  category?: string;
  title?: string;
  url?: string;
}) {
  const embedding = await generateEmbedding(data.text);

  await pineconeIndex.upsert({
    records: [
      {
        id: data.id,
        values: embedding,
        metadata: {
          text: data.text,
          source: data.source,
          category: data.category || 'general',
          title: data.title || '',
          url: data.url || '',
        },
      },
    ],
  });
}

/**
 * Finds the most relevant content snippets for a given query.
 */
export async function findRelevantContent(
  query: string,
  limit: number = 3,
  minScore: number = 0.5
): Promise<VectorMetadata[]> {
  const queryEmbedding = await generateEmbedding(query);

  const queryResponse = await pineconeIndex.query({
    vector: queryEmbedding,
    topK: limit,
    includeMetadata: true,
  });

  return queryResponse.matches
    .filter(match => match.score && match.score >= minScore)
    .map(match => match.metadata as unknown as VectorMetadata);
}

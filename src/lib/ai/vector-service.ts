import { Pinecone } from '@pinecone-database/pinecone';

let pc: Pinecone | null = null;

function getPineconeClient() {
  if (!pc) {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('PINECONE_API_KEY is not defined');
    }
    pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
  }
  return pc;
}

const indexName = process.env.PINECONE_INDEX || 'benson-knowledge';
const model = 'llama-text-embed-v2';

export interface VectorRecord {
  id: string;
  text: string;
  source: string;
  category: string;
  title: string;
  url?: string;
  metadata?: Record<string, any>;
}

/**
 * Upserts a record into Pinecone with automatic embedding generation and chunking.
 */
export async function upsertRecord(record: VectorRecord) {
  try {
    const client = getPineconeClient();
    const index = client.index(indexName);

    // Simple chunking logic (approx 4000 chars per chunk to stay well within metadata limits)
    const chunkSize = 4000;
    const chunks: string[] = [];
    
    if (record.text.length <= chunkSize) {
      chunks.push(record.text);
    } else {
      for (let i = 0; i < record.text.length; i += chunkSize) {
        chunks.push(record.text.substring(i, i + chunkSize));
      }
    }

    console.log(`Processing ${record.id} into ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
      const chunkText = chunks[i];
      const chunkId = chunks.length > 1 ? `${record.id}-chunk-${i}` : record.id;

      // Generate embeddings using Pinecone Inference
      const embeddingsList = await client.inference.embed({
        model,
        inputs: [chunkText],
        parameters: { inputType: 'passage' }
      });

      if (!embeddingsList.data || embeddingsList.data.length === 0) {
        throw new Error('No embeddings returned from Pinecone Inference');
      }

      const embedding = embeddingsList.data[0];
      if (!('values' in embedding)) {
        throw new Error('Embedding data is missing values (likely sparse)');
      }

      const vector = embedding.values;
      if (!vector) {
        throw new Error('Embedding values are empty');
      }

      await index.upsert({
        records: [{
          id: chunkId,
          values: vector,
          metadata: {
            text: chunkText,
            source: record.source,
            category: record.category,
            title: record.title,
            url: record.url || '',
            chunkIndex: i,
            totalChunks: chunks.length,
            originalId: record.id,
            ...record.metadata
          }
        }]
      });
    }

    return true;
  } catch (error) {
    console.error('[Vector Service] Error upserting record:', error);
    throw error;
  }
}

/**
 * Queries the knowledge base for relevant context.
 */
export async function queryKnowledgeBase(query: string, topK: number = 3) {
  try {
    const client = getPineconeClient();
    const index = client.index(indexName);

    // Generate embedding for the query
    const embeddingsList = await client.inference.embed({
      model,
      inputs: [query],
      parameters: { inputType: 'query' }
    });

    const embedding = embeddingsList.data[0];
    if (embedding.vectorType !== 'dense') {
      throw new Error('Pinecone returned non-dense embedding');
    }

    const queryResponse = await index.query({
      vector: embedding.values,
      topK,
      includeMetadata: true,
    });

    return queryResponse.matches.map(match => ({
      text: (match.metadata as any)?.text as string,
      title: (match.metadata as any)?.title as string,
      url: (match.metadata as any)?.url as string,
      score: match.score
    }));
  } catch (error) {
    console.error('[Vector Service] Error querying knowledge base:', error);
    return [];
  }
}

import { getPineconeClient } from './pinecone';

const MODEL = 'llama-text-embed-v2';

/**
 * Generate a single embedding for the given text.
 * Uses Pinecone's llama-text-embed-v2 model.
 */
export async function getEmbedding(text: string, inputType: 'passage' | 'query' = 'passage') {
  const pinecone = getPineconeClient();
  try {
    // Pinecone SDK 7.x Inference API
    const embeddings = await pinecone.inference.embed({
      model: MODEL,
      inputs: [text],
      parameters: { inputType, truncate: 'END' }
    });
    
    if (!embeddings.data || embeddings.data.length === 0) {
      throw new Error('No embedding data returned from Pinecone');
    }
    
    // Cast to any to bypass strict Sparse vs Dense union check
    const firstResult = embeddings.data[0] as any;
    if (!firstResult.values) {
      throw new Error('Embedding values missing from response');
    }
    
    return firstResult.values as number[];
  } catch (error) {
    console.error(`[Pinecone Inference Error] Failed to generate embedding:`, error);
    throw error;
  }
}

/**
 * Generate multiple embeddings for a list of texts.
 */
export async function getEmbeddings(texts: string[]) {
  const pinecone = getPineconeClient();
  try {
    const embeddings = await pinecone.inference.embed({
      model: MODEL,
      inputs: texts,
      parameters: { inputType: 'passage', truncate: 'END' }
    });
    
    if (!embeddings.data) {
      throw new Error('No embedding data returned from Pinecone');
    }
    
    return embeddings.data.map(d => (d as any).values as number[]);
  } catch (error) {
    console.error(`[Pinecone Inference Error] Failed to generate multiple embeddings:`, error);
    throw error;
  }
}

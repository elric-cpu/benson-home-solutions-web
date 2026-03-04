import { getPineconeClient } from './pinecone';

const MODEL = 'llama-text-embed-v2';

/**
 * Generate a single embedding for the given text.
 * Uses Pinecone's llama-text-embed-v2 model.
 */
export async function getEmbedding(
  text: string,
  inputType: 'passage' | 'query' = 'passage',
) {
  const pinecone = getPineconeClient();
  try {
    // Pinecone SDK 5.x Inference API requires inputs to be an array of objects: [{ text: "..." }]
    const embeddings = await pinecone.inference.embed(
      MODEL, 
      [{ text }] as any, 
      {
        inputType,
        truncate: 'END',
      }
    );

    if (!embeddings.data || embeddings.data.length === 0) {
      throw new Error('No embedding data returned from Pinecone');
    }

    const firstResult = embeddings.data[0];
    if (firstResult.vectorType !== 'dense' || !('values' in firstResult)) {
      throw new Error('Dense embedding values missing from response');
    }

    return (firstResult as { values: number[] }).values;
  } catch (error) {
    console.error(
      `[Pinecone Inference Error] Failed to generate embedding:`,
      error,
    );
    throw error;
  }
}

/**
 * Generate multiple embeddings for a list of texts.
 */
export async function getEmbeddings(texts: string[]) {
  const pinecone = getPineconeClient();
  try {
    // Map the string array into an array of objects
    const formattedInputs = texts.map((t) => ({ text: t }));

    const embeddings = await pinecone.inference.embed(
      MODEL, 
      formattedInputs as any, 
      {
        inputType: 'passage',
        truncate: 'END',
      }
    );

    if (!embeddings.data) {
      throw new Error('No embedding data returned from Pinecone');
    }

    return embeddings.data.map((d) => {
      if (d.vectorType === 'dense' && 'values' in d) {
        return (d as { values: number[] }).values;
      }
      throw new Error('Non-dense embedding encountered');
    });
  } catch (error) {
    console.error(
      `[Pinecone Inference Error] Failed to generate multiple embeddings:`,
      error,
    );
    throw error;
  }
}
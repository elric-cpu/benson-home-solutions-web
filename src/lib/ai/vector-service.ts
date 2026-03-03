import { getPineconeIndex } from './pinecone';
import { getEmbedding } from './embeddings';
import { type RecordMetadata } from '@pinecone-database/pinecone';

export interface KnowledgeMetadata extends RecordMetadata {
  docId: string;
  text: string;
  source: string;
  category: string;
  title: string;
  url: string;
  chunkIndex: number;
  totalChunks: number;
  [key: string]: string | number | boolean;
}

export interface InputRecord {
  id: string;
  text: string;
  source: string;
  category?: string;
  title?: string;
  url?: string;
}

const CHUNK_SIZE = 1500; // Characters
const CHUNK_OVERLAP = 200;

/**
 * Splits text into overlapping chunks.
 */
function chunkText(text: string, size: number, overlap: number): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + size));
    i += size - overlap;
    if (i + overlap >= text.length) break;
  }
  return chunks;
}

/**
 * Upsert a text record into Pinecone, automatically chunking if necessary.
 */
export async function upsertRecord(record: InputRecord) {
  const index = getPineconeIndex();
  const namespace = index.namespace('knowledge');

  // 1. Delete any existing chunks for this ID to avoid ghosting
  await deleteRecord(record.id);

  // 2. Split text into chunks
  const textChunks = chunkText(record.text, CHUNK_SIZE, CHUNK_OVERLAP);

  if (textChunks.length === 0) {
    console.warn(
      '[Vector Service] No text chunks generated for record:',
      record.id,
    );
    return;
  }

  console.log(
    `[Vector Service] Chunking record ${record.id} into ${textChunks.length} pieces.`,
  );

  // 3. Generate embeddings and prepare records
  const records = await Promise.all(
    textChunks.map(async (chunk, index) => {
      const vector = await getEmbedding(chunk, 'passage');
      const metadata: KnowledgeMetadata = {
        docId: record.id,
        text: chunk,
        source: record.source,
        category: record.category || 'General',
        title: record.title || 'Untitled',
        url: record.url || '',
        chunkIndex: index,
        totalChunks: textChunks.length,
      };

      return {
        id: `${record.id}#chunk-${index}`,
        values: vector,
        metadata,
      };
    }),
  );

  console.log(
    `[Vector Service] Upserting ${records.length} records to Pinecone namespace 'knowledge'.`,
  );

  await namespace.upsert(records);
}

/**
 * Query the vector database for the most relevant records.
 */
export async function queryRecords(
  queryText: string,
  topK: number = 5,
  filter?: object,
) {
  const index = getPineconeIndex();
  const namespace = index.namespace('knowledge');
  const vector = await getEmbedding(queryText, 'query');

  const results = await namespace.query({
    vector,
    topK,
    filter,
    includeMetadata: true,
  });

  return results.matches.map((match) => ({
    id: match.id,
    score: match.score,
    metadata: match.metadata as KnowledgeMetadata,
  }));
}

/**
 * Delete all chunks for a record ID from Pinecone using metadata filtering.
 */
export async function deleteRecord(id: string) {
  const index = getPineconeIndex();
  const namespace = index.namespace('knowledge');

  try {
    await namespace.deleteMany({ filter: { docId: { $eq: id } } });
    console.log(`[Vector Service] Deleted all chunks for record ${id}`);
  } catch (error: unknown) {
    const err = error as { status?: number; name?: string };
    // Gracefully handle 404 (index/namespace not ready)
    if (err?.status === 404 || err?.name === 'PineconeNotFoundError') {
      console.log(
        `[Vector Service] Namespace 'knowledge' not found, skipping deletion for ${id}`,
      );
      return;
    }
    console.error(`[Vector Service] Error deleting chunks for ${id}:`, error);
  }
}

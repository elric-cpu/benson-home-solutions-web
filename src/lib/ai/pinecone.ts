import { Pinecone } from '@pinecone-database/pinecone';

let _pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
  if (!_pinecone) {
    const apiKey = process.env.PINECONE_API_KEY;
    if (!apiKey) {
      throw new Error('PINECONE_API_KEY is not defined in environment variables.');
    }
    _pinecone = new Pinecone({
      apiKey: apiKey,
    });
  }
  return _pinecone;
};

export const getPineconeIndex = () => {
  const client = getPineconeClient();
  const indexName = process.env.PINECONE_INDEX || 'benson-knowledge';
  return client.index(indexName);
};

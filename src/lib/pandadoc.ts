import { PANDADOC_API_KEY } from '@/lib/constants';
import type { PandaDocCreateDocumentData } from './pandadoc.d';

// This is a placeholder for the PandaDoc API client.
// In a real application, you would use the PandaDoc SDK or a custom API client.
export const pandadocClient = {
  createDocument: async (data: PandaDocCreateDocumentData) => {
    if (!PANDADOC_API_KEY) {
      throw new Error(
        'PANDADOC_API_KEY is not set in the environment variables.',
      );
    }
    console.warn('Creating PandaDoc document with data:', data);
    // Mock response
    return {
      id: 'mock-document-id',
      status: 'document.draft',
    };
  },
};

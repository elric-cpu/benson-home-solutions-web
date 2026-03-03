import { Client } from '@notionhq/client';

let _notion: Client | null = null;

export function getNotion() {
  if (!_notion) {
    const apiKey = process.env.NOTION_API_KEY;
    if (!apiKey) {
      console.warn('[Notion] Missing NOTION_API_KEY');
      return null;
    }
    _notion = new Client({ auth: apiKey });
  }
  return _notion;
}

export const NOTION_DBS = {
  properties: process.env.NOTION_DB_PROPERTIES || '',
  clients: process.env.NOTION_DB_CLIENTS || '',
  agreements: process.env.NOTION_DB_AGREEMENTS || '',
  serviceLog: process.env.NOTION_DB_SERVICE_LOG || '',
  knowledge:
    process.env.NOTION_DB_KNOWLEDGE || '310265d247898091b645d3cde2a8e051',
};

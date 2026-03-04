import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/**
 * Creates a new property page in the Notion Properties Database.
 */
export async function createNotionProperty(data: any) {
  const databaseId = process.env.NOTION_DB_PROPERTIES;
  if (!databaseId) return null;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Property Address': {
          title: [{ text: { content: data.address } }],
        },
        'Building Type': {
          select: { name: data.buildingType || 'Residential' },
        },
        'Year Built': {
          number: data.yearBuilt || 0,
        },
        'Flood Zone': {
          select: { name: data.floodZone || 'Unknown' },
        },
        'Supabase ID': {
          rich_text: [{ text: { content: data.id } }],
        },
      },
    });
    return response;
  } catch (error) {
    console.error('[Notion] Failed to create property:', error);
    return null;
  }
}

/**
 * Seed Pinecone from Notion Database
 * 
 * Fetches data from the Notion Knowledge/SOP database and upserts it into Pinecone.
 * Run via: npx tsx scripts/seed-pinecone-from-notion.ts
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables immediately
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { Client } from '@notionhq/client';
import { upsertRecord } from '../src/lib/ai/vector-service';

async function seed() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DB_KNOWLEDGE || '310265d247898091b645d3cde2a8e051';

  if (!apiKey) {
    console.error('❌ NOTION_API_KEY is not defined in .env.local');
    process.exit(1);
  }

  const notion = new Client({ auth: apiKey });

  console.log(`🔍 Searching for pages in Notion database: ${databaseId}...`);

  try {
    // Workaround: Use search since databases.query seems missing in this version
    const response = await notion.search({
      filter: {
        value: 'page',
        property: 'object',
      },
    });

    // Filter results to only those belonging to the specific database
    const results = response.results.filter((page: any) => 
      page.parent?.database_id?.replace(/-/g, '') === databaseId.replace(/-/g, '')
    );

    console.log(`✅ Found ${results.length} relevant pages in Notion.`);

    for (const page of results) {
      if (!('properties' in page)) continue;

      const props = page.properties as any;
      
      // Helper to extract plain text from rich_text/title arrays
      const extractPlainText = (prop: any) => {
        const arr = prop?.rich_text || prop?.title;
        if (!arr) return '';
        return arr.map((t: any) => t.plain_text).join('') || '';
      };

      // Extract Title
      const titleProp = Object.values(props).find((p: any) => p.type === 'title') as any;
      const title = extractPlainText(titleProp) || 'Untitled';

      // Extract Content (Check for common property names)
      const contentProp = props.Content || props.Description || props.Notes || 
                          Object.values(props).find((p: any) => p.type === 'rich_text') as any;
      const content = extractPlainText(contentProp);

      // Extract Category
      const categoryProp = props.Category || Object.values(props).find((p: any) => p.type === 'select') as any;
      const category = categoryProp?.select?.name || 'General';

      if (!content && !title) {
        console.warn(`⚠️ Skipping page ${page.id} - No title or content found.`);
        continue;
      }

      const fullText = `Title: ${title}\n\nContent: ${content}`;

      console.log(`🚀 Upserting: [${category}] ${title}...`);

      await upsertRecord({
        id: page.id,
        text: fullText,
        source: 'notion',
        category,
        title,
        url: (page as any).url,
      });
    }

    console.log('\n🎯 Vector seed complete.');
  } catch (error) {
    console.error('❌ Error seeding vectors from Notion:', error);
    process.exit(1);
  }
}

seed();

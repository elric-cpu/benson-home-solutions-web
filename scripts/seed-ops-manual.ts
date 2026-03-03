/**
 * Seed Pinecone from Notion Operations Manual (Recursive Crawler)
 * 
 * Target: https://www.notion.so/Benson-Home-Solutions-Operations-Manual-313265d2478980069a7ad7b0da792c77
 * Run via: npx tsx scripts/seed-ops-manual.ts
 */

import dotenv from 'dotenv';
import path from 'path';
import { Client } from '@notionhq/client';
import { upsertRecord } from '../src/lib/ai/vector-service';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const OPS_MANUAL_PAGE_ID = '313265d2478980069a7ad7b0da792c77';

if (!NOTION_API_KEY) {
  console.error('❌ NOTION_API_KEY is not defined in .env.local');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

async function getBlockText(block: any): Promise<string> {
  const type = block.type;
  const content = block[type];
  
  if (!content?.rich_text) return '';
  
  const text = content.rich_text.map((t: any) => t.plain_text).join('');
  
  switch (type) {
    case 'heading_1': return `# ${text}\n`;
    case 'heading_2': return `## ${text}\n`;
    case 'heading_3': return `### ${text}\n`;
    case 'bulleted_list_item': return `* ${text}`;
    case 'numbered_list_item': return `1. ${text}`;
    case 'to_do': return `[ ] ${text}`;
    case 'quote': return `> ${text}\n`;
    case 'code': return `\`\`\`\n${text}\n\`\`\`\n`;
    default: return text;
  }
}

async function crawlPage(pageId: string, titlePath: string[] = []): Promise<void> {
  try {
    // 1. Get Page Metadata
    const page: any = await notion.pages.retrieve({ page_id: pageId });
    const title = page.properties.title?.title?.[0]?.plain_text || 
                  page.properties.Name?.title?.[0]?.plain_text || 
                  'Untitled';
    
    const currentPath = [...titlePath, title];
    const fullTitle = currentPath.join(' > ');
    console.log(`📖 Crawling: ${fullTitle}`);

    // 2. Fetch all blocks for this page
    const blocks: any[] = [];
    let cursor: string | undefined = undefined;
    
    while (true) {
      const response: any = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });
      blocks.push(...response.results);
      if (!response.has_more) break;
      cursor = response.next_cursor;
    }

    // 3. Process blocks into a single text blob for the page
    let pageContent = '';
    const subPages: string[] = [];

    for (const block of blocks) {
      if (block.type === 'child_page') {
        subPages.push(block.id);
        continue;
      }
      
      const text = await getBlockText(block);
      if (text) {
        pageContent += text + '\n';
      }
    }

    // 4. Upsert this page to Pinecone if it has content
    if (pageContent.trim()) {
      console.log(`🚀 Upserting: ${fullTitle} (${pageContent.length} chars)`);
      await upsertRecord({
        id: pageId,
        text: `Page Path: ${fullTitle}\n\nContent:\n${pageContent}`,
        source: 'notion-ops-manual',
        category: 'Operations Manual',
        title: title,
        url: page.url,
      });
    }

    // 5. Recursively crawl sub-pages
    for (const subPageId of subPages) {
      await crawlPage(subPageId, currentPath);
    }

  } catch (error) {
    console.error(`❌ Error crawling page ${pageId}:`, error);
  }
}

async function main() {
  console.log('🏁 Starting Operations Manual Crawl...');
  await crawlPage(OPS_MANUAL_PAGE_ID);
  console.log('\n🎯 Operations Manual seed complete.');
}

main();

import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_KNOWLEDGE = process.env.NOTION_DB_KNOWLEDGE; // 313265d2478980069a7ad7b0da792c77
const OUTPUT_DIR = path.join(process.cwd(), "docs/notion-ingest");

if (!NOTION_API_KEY || !NOTION_DB_KNOWLEDGE) {
  console.error("Missing NOTION_API_KEY or NOTION_DB_KNOWLEDGE in .env.local");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

async function blockToMarkdown(block: any): Promise<string> {
  const { type } = block;
  const value = block[type];

  const richTextToMd = (richText: any[]) => {
    return richText?.map((rt: any) => {
      let text = rt.plain_text;
      if (rt.annotations.bold) text = `**${text}**`;
      if (rt.annotations.italic) text = `*${text}*`;
      if (rt.annotations.strikethrough) text = `~~${text}~~`;
      if (rt.annotations.code) text = `\`${text}\``;
      if (rt.href) text = `[${text}](${rt.href})`;
      return text;
    }).join("") || "";
  };

  switch (type) {
    case "paragraph":
      return richTextToMd(value.rich_text) + "\n\n";
    case "heading_1":
      return "# " + richTextToMd(value.rich_text) + "\n\n";
    case "heading_2":
      return "## " + richTextToMd(value.rich_text) + "\n\n";
    case "heading_3":
      return "### " + richTextToMd(value.rich_text) + "\n\n";
    case "bulleted_list_item":
      return "- " + richTextToMd(value.rich_text) + "\n";
    case "numbered_list_item":
      return "1. " + richTextToMd(value.rich_text) + "\n";
    case "to_do":
      return `- [${value.checked ? "x" : " "}] ` + richTextToMd(value.rich_text) + "\n";
    case "toggle":
      return "<details><summary>" + richTextToMd(value.rich_text) + "</summary>\n\n" + "(Toggle content not yet supported recursively in this flat converter)\n" + "</details>\n\n";
    case "code":
      return "```" + (value.language || "") + "\n" + richTextToMd(value.rich_text) + "\n```\n\n";
    case "quote":
      return "> " + richTextToMd(value.rich_text) + "\n\n";
    case "divider":
      return "---\n\n";
    case "callout":
      return "> [!NOTE]\n> " + richTextToMd(value.rich_text) + "\n\n";
    case "image": {
      const url = value.type === "external" ? value.external.url : value.file.url;
      return `![Image](${url})\n\n`;
    }
    case "child_page":
      return `[Child Page: ${value.title}](./${value.title.replace(/\s+/g, "-").toLowerCase()}.md)\n\n`;
    case "child_database":
      return `[Child Database: ${value.title}](https://www.notion.so/${block.id.replace(/-/g, "")})\n\n`;
    default:
      return "";
  }
}

async function getPageMarkdown(blockId: string): Promise<string> {
  let markdown = "";
  let hasMore = true;
  let cursor: string | undefined = undefined;

  while (hasMore) {
    const response: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      markdown += await blockToMarkdown(block);
    }

    hasMore = response.has_more;
    cursor = response.next_cursor || undefined;
  }

  return markdown;
}

async function ingestRecursive(pageId: string, title: string, visited: Set<string>) {
  if (visited.has(pageId)) return;
  visited.add(pageId);

  console.log(`Ingesting: ${title} (${pageId})`);
  const content = await getPageMarkdown(pageId);
  const fileName = `${title.replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, "-").toLowerCase()}.md`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  fs.writeFileSync(filePath, `# ${title}\n\n${content}`);

  // Find child pages to recurse
  const children: any = await notion.blocks.children.list({ block_id: pageId });
  for (const block of children.results) {
    if (block.type === "child_page") {
      await ingestRecursive(block.id, block.child_page.title, visited);
    }
  }
}

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const visited = new Set<string>();
  
  // Start with the main manual
  try {
    const mainPage: any = await notion.pages.retrieve({ page_id: NOTION_DB_KNOWLEDGE! });
    const title = mainPage.properties.title?.title?.[0]?.plain_text || "Operations Manual";
    await ingestRecursive(NOTION_DB_KNOWLEDGE!, title, visited);
    console.log("\nIngestion complete! Check docs/notion-ingest/");
  } catch (error: any) {
    console.error("Ingestion failed:", error.message);
  }
}

run();

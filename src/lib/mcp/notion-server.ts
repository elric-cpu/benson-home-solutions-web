import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Client } from '@notionhq/client';

type NotionToolArgs = {
  query?: string;
  page_id?: string;
  content?: string;
};

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  console.error('NOTION_API_KEY is required.');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

const server = new Server(
  {
    name: 'notion-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_notion',
        description: 'Search for pages or databases in Notion.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'The search query.' },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_page_content',
        description: 'Fetch the content blocks of a Notion page.',
        inputSchema: {
          type: 'object',
          properties: {
            page_id: { type: 'string', description: 'The ID of the page.' },
          },
          required: ['page_id'],
        },
      },
      {
        name: 'append_block',
        description: 'Append content to a Notion page.',
        inputSchema: {
          type: 'object',
          properties: {
            page_id: { type: 'string', description: 'The ID of the page.' },
            content: {
              type: 'string',
              description: 'The text content to append as a paragraph.',
            },
          },
          required: ['page_id', 'content'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;
  const args = (request.params.arguments ?? {}) as NotionToolArgs;

  try {
    if (name === 'search_notion') {
      const response = await notion.search({
        query: args.query ?? '',
        page_size: 10,
      });
      return {
        content: [
          { type: 'text', text: JSON.stringify(response.results, null, 2) },
        ],
      };
    }

    if (name === 'get_page_content') {
      const response = await notion.blocks.children.list({
        block_id: args.page_id ?? '',
      });
      return {
        content: [
          { type: 'text', text: JSON.stringify(response.results, null, 2) },
        ],
      };
    }

    if (name === 'append_block') {
      await notion.blocks.children.append({
        block_id: args.page_id ?? '',
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                { type: 'text', text: { content: args.content ?? '' } },
              ],
            },
          },
        ],
      });
      return {
        content: [{ type: 'text', text: 'Successfully appended block.' }],
      };
    }

    throw new Error(`Tool ${name} not found.`);
  } catch (error: unknown) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('Notion MCP Server running on Stdio.');

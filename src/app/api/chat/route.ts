import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { getConstructionMarketData2026 } from '@/lib/ai/tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
    system: `You are a helpful assistant for Benson Home Solutions. 
    You have access to construction market data for 2026. 
    If a user asks about costs or market trends for softwood lumber, structural steel, 
    ready-mix concrete, or copper wire, use the provided tools.`,
    tools: {
      get_construction_market_data_2026: tool({
        description: 'Get construction material market data and projections for 2026 by region or material type.',
        parameters: z.object({
          material_type: z.enum(['softwood_lumber', 'structural_steel', 'ready_mix_concrete', 'copper_wire']),
          zip_code: z.string().optional().describe('The zip code to check regional pricing for.'),
        }),
        execute: async ({ material_type, zip_code }) => {
          return await getConstructionMarketData2026(material_type, zip_code);
        },
      }),
    },
    // maxSteps allows the model to call tools multiple times in a single request
    // if it needs more information to answer the user's query.
    maxSteps: 5,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}

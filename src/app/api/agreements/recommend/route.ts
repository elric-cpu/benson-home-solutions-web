import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from '@ai-sdk/anthropic';
import { openai, createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { SERVICE_CATALOG } from '@/lib/agreement-engine';

export async function POST(request: NextRequest) {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!ANTHROPIC_API_KEY && !OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'AI provider (Anthropic/OpenAI) not configured' },
      { status: 500 }
    );
  }

  try {
    const { property } = await request.json();

    const systemPrompt = `
You are a maintenance planning expert for residential, commercial, and church/community properties in Oregon's Mid-Willamette Valley and Harney County.

Given the following property data, recommend a list of maintenance services this property needs on an annual basis. For each service, provide:
- service_id (from the provided service catalog)
- priority: "essential" | "recommended" | "optional"
- reasoning: 1-2 sentences explaining WHY this property needs this service, referencing specific property data points
- frequency: "monthly" | "quarterly" | "semi-annual" | "annual"
- climate_adjustment: any notes about how the local climate affects this service need

Do NOT generate prices. Prices are calculated separately.
Do NOT hallucinate services not in the catalog.
Do NOT recommend services that don't apply to this building type.

Respond in valid JSON only. Format: { "recommendations": [...] }
`;

    const catalogSummary = SERVICE_CATALOG.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      applicable_to: s.applicable_to,
    }));

    // Choose provider (Prefer Anthropic, fallback to OpenAI or OpenRouter)
    let model;
    if (ANTHROPIC_API_KEY) {
      model = anthropic('claude-3-5-sonnet-20240620');
    } else if (OPENAI_API_KEY) {
      if (OPENAI_API_KEY.startsWith('sk-or-')) {
        // Configure for OpenRouter
        const openrouter = createOpenAI({
          apiKey: OPENAI_API_KEY,
          baseURL: 'https://openrouter.ai/api/v1',
        });
        model = openrouter('openai/gpt-4o');
      } else {
        model = openai('gpt-4o');
      }
    }

    if (!model) {
      throw new Error('No valid AI model configuration found');
    }

    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: JSON.stringify({ property, service_catalog: catalogSummary }),
    });

    // Extract JSON from potential markdown blocks
    const jsonString = text.includes('```') 
      ? text.split('```json')[1]?.split('```')[0]?.trim() || text.split('```')[1]?.split('```')[0]?.trim() || text
      : text;

    const data = JSON.parse(jsonString || '{}');
    const recommendations = data.recommendations || [];

    interface Recommendation {
      service_id: string;
      priority: string;
      reasoning: string;
      frequency: string;
    }

    // Filter out invalid service IDs
    const validRecommendations = (recommendations as Recommendation[]).filter((r) =>
      SERVICE_CATALOG.some((s) => s.id === r.service_id)
    );

    return NextResponse.json({ recommendations: validRecommendations });
  } catch (error) {
    console.error('[Agreement Recommendation] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { SERVICE_CATALOG } from '@/lib/agreement-engine';
import { openrouter } from '@/lib/ai/provider';

const RecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      service_id: z.string().describe('ID from the provided service catalog'),
      priority: z.enum(['essential', 'recommended', 'optional']),
      reasoning: z
        .string()
        .describe(
          '1-2 sentences explaining WHY this property needs this service',
        ),
      frequency: z.enum(['monthly', 'quarterly', 'semi-annual', 'annual']),
      climate_adjustment: z
        .string()
        .optional()
        .describe('Notes about how local climate affects this service'),
    }),
  ),
});

export async function POST(request: NextRequest) {
  try {
    const { property } = await request.json();

    const systemPrompt = `
You are a maintenance planning expert for residential, commercial, and church/community properties in Oregon's Mid-Willamette Valley and Harney County.

Given the property data, recommend a list of maintenance services this property needs on an annual basis from the provided catalog.

Do NOT generate prices. Prices are calculated separately.
Do NOT hallucinate services not in the catalog.
Do NOT recommend services that don't apply to this building type.
`;

    const catalogSummary = SERVICE_CATALOG.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      applicable_to: s.applicable_to,
    }));

    const { object }: { object: z.infer<typeof RecommendationSchema> } =
      await generateObject({
        model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
		maxTokens: 4000,
        schema: RecommendationSchema,
        system: systemPrompt,
        prompt: JSON.stringify({ property, service_catalog: catalogSummary }),
      });

    // Filter out invalid service IDs
    const validRecommendations = object.recommendations.filter((r) =>
      SERVICE_CATALOG.some((s) => s.id === r.service_id),
    );

    return NextResponse.json({ recommendations: validRecommendations });
  } catch (error) {
    console.error('[Agreement Recommendation] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 },
    );
  }
}

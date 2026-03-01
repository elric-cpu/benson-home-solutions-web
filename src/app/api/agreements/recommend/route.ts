import { NextRequest, NextResponse } from 'next/server';
import { SERVICE_CATALOG } from '@/lib/agreement-engine';

export async function POST(request: NextRequest) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
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

Respond in valid JSON only.
`;

    const catalogSummary = SERVICE_CATALOG.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      applicable_to: s.applicable_to,
    }));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: JSON.stringify({ property, service_catalog: catalogSummary }),
          },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const aiResult = await response.json();
    const recommendations = JSON.parse(aiResult.choices[0].message.content).recommendations;

    // Filter out invalid service IDs
    const validRecommendations = recommendations.filter((r: any) =>
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

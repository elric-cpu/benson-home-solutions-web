import { NextRequest, NextResponse } from 'next/server';
import { executeFlow, hasConfiguredBackendUrl } from '@/lib/genkit';
import { generateCostEstimate, hasLocalGoogleAiConfig } from '@/lib/google-intelligence';

function parseBudgetRange(input: string) {
  const values = input.match(/\$?([\d,]+)/g)?.map((value) => Number(value.replace(/[^0-9]/g, ''))) || [];
  const min = values[0] || 0;
  const max = values[1] || min;
  return { min, max, currency: 'USD' as const };
}

function normalizeEstimatorResult(result: Record<string, any>) {
  if (result.estimated_range) {
    return result;
  }

  const estimatedRangeText = typeof result.estimatedRange === 'string' ? result.estimatedRange : '$0 - $0';

  return {
    estimated_range: parseBudgetRange(estimatedRangeText),
    breakdown: [
      { item: 'Recommended budget range', cost_estimate: estimatedRangeText },
      ...(Array.isArray(result.recommendedNextSteps)
        ? result.recommendedNextSteps.slice(0, 2).map((step: string, index: number) => ({
            item: `Next step ${index + 1}`,
            cost_estimate: step,
          }))
        : []),
    ],
    caveats: Array.isArray(result.criticalWarnings) ? result.criticalWarnings : [],
    disclaimer:
      result.diagnosticLogic || 'AI-assisted estimate only. Final pricing requires an on-site diagnostic visit.',
  };
}

/**
 * AI Cost Estimator API
 * Uses Genkit to provide realistic project cost estimations based on Oregon data.
 */
export async function POST(request: NextRequest) {
  try {
    const { project_type, details } = await request.json();

    if (!project_type || !details) {
      return NextResponse.json({ error: 'project_type and details are required' }, { status: 400 });
    }

    if (hasConfiguredBackendUrl()) {
      try {
        const response = await executeFlow('costEstimation', {
          service: project_type,
          details,
        });

        return NextResponse.json({
          source: 'backend',
          ...normalizeEstimatorResult((response.result || response) as Record<string, any>),
        });
      } catch (error) {
        console.error('[Estimator API] Remote backend failed, falling back to local Google AI:', error);
      }
    }

    if (hasLocalGoogleAiConfig()) {
      const estimate = await generateCostEstimate({
        projectType: project_type,
        details,
      });

      return NextResponse.json({
        source: 'vertex',
        ...estimate,
      });
    }

    return NextResponse.json(
      {
        error:
          'Estimator is unavailable because neither the Genkit backend nor the local Google AI runtime is configured.',
      },
      { status: 503 },
    );
  } catch (error) {
    console.error('[Estimator API] Error:', error);
    return NextResponse.json({ error: 'Estimation failed' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { executeFlow, hasConfiguredBackendUrl } from '@/lib/genkit';
import { generateAgreementRecommendations, hasLocalGoogleAiConfig } from '@/lib/google-intelligence';

/**
 * Benson Home Solutions - Agreement Recommender API
 */
export async function POST(request: NextRequest) {
  try {
    const { property } = await request.json();
    if (!property) return NextResponse.json({ error: 'Property info required' }, { status: 400 });

    const service_catalog = [
      { id: 'residential-maintenance', name: 'Residential Maintenance Plan' },
      { id: 'roof-care', name: 'Roof & Gutter Preservation' },
      { id: 'hvac-service', name: 'HVAC Lifecycle Management' },
    ];

    if (hasConfiguredBackendUrl()) {
      try {
        const response = await executeFlow('recommendationFlow', { property, service_catalog });
        return NextResponse.json({
          source: 'backend',
          ...(response.result || response),
        });
      } catch (error) {
        console.error('[Recommend API] Remote backend failed, falling back to local Google AI:', error);
      }
    }

    if (hasLocalGoogleAiConfig()) {
      const recommendation = await generateAgreementRecommendations({
        property,
        serviceCatalog: service_catalog,
      });

      return NextResponse.json({
        source: 'vertex',
        ...recommendation,
      });
    }

    return NextResponse.json(
      {
        error:
          'Agreement recommendations are unavailable because neither the Genkit backend nor the local Google AI runtime is configured.',
      },
      { status: 503 },
    );
  } catch (error) {
    console.error('[Recommend API] Error:', error);
    return NextResponse.json({ error: 'Recommendation failed' }, { status: 500 });
  }
}

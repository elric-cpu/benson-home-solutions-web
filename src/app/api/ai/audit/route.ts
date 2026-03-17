import { NextRequest, NextResponse } from 'next/server';
import { propertyAuditFlow } from '@/lib/genkit';

export const runtime = 'nodejs';

/**
 * POST /api/ai/audit
 * Triggers Genkit's propertyAuditFlow to generate a health scorecard.
 */
export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Property description is required' },
        { status: 400 },
      );
    }

    const result = await propertyAuditFlow.run(description);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Property Audit Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate property audit' },
      { status: 500 },
    );
  }
}

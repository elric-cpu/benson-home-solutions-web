import { NextRequest, NextResponse } from 'next/server';
// import { propertyAuditFlow } from '@/lib/genkit';

/**
 * Benson Home Solutions - Property Health Audit API
 */
export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();
    if (!description) return NextResponse.json({ error: 'Description required' }, { status: 400 });

    // const result = await propertyAuditFlow(description);
    // return NextResponse.json(result);
    return NextResponse.json({ success: true, message: "Endpoint is temporarily disabled." });

  } catch (error: unknown) {
    console.error('[Audit API] Error:', error);
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 });
  }
}

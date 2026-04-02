import { NextRequest, NextResponse } from 'next/server';
import { generatePropertyAudit } from '@/lib/google-intelligence';

/**
 * Benson Home Solutions - Property Health Audit API
 */
export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();
    if (!description) return NextResponse.json({ error: 'Description required' }, { status: 400 });

    const response = await generatePropertyAudit(description);
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('[Audit API] Error:', error);
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 });
  }
}

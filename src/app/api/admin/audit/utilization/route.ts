import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  serviceUtilizationView,
  underdeliveredServicesView,
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const adminSecret = request.headers.get('X-Admin-Secret');
  const EXPECTED_SECRET = process.env.ADMIN_SECRET || 'dev-secret';

  if (adminSecret !== EXPECTED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const agreementId = searchParams.get('agreementId');
  const onlyAtRisk = searchParams.get('atRisk') === 'true';

  try {
    let results;

    if (onlyAtRisk) {
      results = await db.select().from(underdeliveredServicesView);
    } else if (agreementId) {
      results = await db
        .select()
        .from(serviceUtilizationView)
        .where(eq(serviceUtilizationView.agreementId, agreementId));
    } else {
      results = await db.select().from(serviceUtilizationView);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('[Audit API] Fetch failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

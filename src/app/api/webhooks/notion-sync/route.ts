import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clients, properties, agreements } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Handle incoming webhooks from Make.com/n8n for Notion updates.
 * This endpoint processes changes made in Notion and reflects them in Supabase.
 */
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('X-BHS-Notion-Secret');
  const EXPECTED_KEY = process.env.NOTION_WEBHOOK_SECRET;

  if (EXPECTED_KEY && apiKey !== EXPECTED_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { entity, id, action, data } = await request.json();

    if (!entity || !id || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    console.log(`[Notion Sync] Updating ${entity} ${id} (Action: ${action})`);

    switch (entity) {
      case 'client':
        await db
          .update(clients)
          .set({
            name: data.name,
            phone: data.phone,
            updatedAt: new Date(),
          })
          .where(eq(clients.id, id));
        break;

      case 'property':
        await db
          .update(properties)
          .set({
            agreementStatus: data.status,
            updatedAt: new Date(),
          })
          .where(eq(properties.id, id));
        break;

      case 'agreement':
        await db
          .update(agreements)
          .set({
            status: data.status,
            monthlyPrice: data.monthlyPrice?.toString(),
            annualPrice: data.annualPrice?.toString(),
            updatedAt: new Date(),
          })
          .where(eq(agreements.id, id));
        break;

      default:
        console.warn(`[Notion Sync] Unhandled entity type: ${entity}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Notion Sync Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

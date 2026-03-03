import { NextRequest, NextResponse } from 'next/server';
import {
  syncClientToNotion,
  syncPropertyToNotion,
  syncAgreementToNotion,
  syncServiceLogToNotion,
} from '@/lib/notion/sync';

export async function POST(request: NextRequest) {
  const webhookSecret = request.headers.get('X-Supabase-Webhook-Secret');
  const EXPECTED_SECRET = process.env.SUPABASE_WEBHOOK_SECRET;

  if (EXPECTED_SECRET && webhookSecret !== EXPECTED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { table, record, type } = payload; // Supabase payload structure

    if (!record || !record.id) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    console.log(`[Webhook] Syncing ${table} ${record.id} (${type})`);

    switch (table) {
      case 'clients':
        await syncClientToNotion(record.id);
        break;
      case 'properties':
        await syncPropertyToNotion(record.id);
        break;
      case 'agreements':
        await syncAgreementToNotion(record.id);
        break;
      case 'service_log':
        await syncServiceLogToNotion(record.id);
        break;
      default:
        console.warn(`[Webhook] Unhandled table: ${table}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Webhook Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

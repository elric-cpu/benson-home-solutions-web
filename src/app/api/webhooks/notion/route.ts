import { NextRequest, NextResponse } from 'next/server';

/**
 * Notion Webhook Handler
 * 
 * Notion sends a POST request to this endpoint whenever a subscribed event occurs.
 * 
 * @see https://developers.notion.com/docs/webhooks
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    console.log('[Notion Webhook] Received event:', {
      id: payload.id,
      event_type: payload.event_type,
      timestamp: payload.timestamp,
    });

    // Handle the event based on event_type
    // Common types: page.content_updated, page.created, database.created, etc.
    switch (payload.event_type) {
      case 'page.content_updated':
        console.log(`[Notion Webhook] Page updated: ${payload.page_id}`);
        // TODO: Sync with Supabase or Sanity if needed
        break;
      case 'page.created':
        console.log(`[Notion Webhook] Page created: ${payload.page_id}`);
        break;
      default:
        console.log(`[Notion Webhook] Unhandled event type: ${payload.event_type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('[Notion Webhook] Error processing request:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Server Error', details },
      { status: 500 }
    );
  }
}

/**
 * GET handler for health checks or testing
 */
export async function GET() {
  return NextResponse.json({ status: 'active', service: 'notion-webhook' });
}

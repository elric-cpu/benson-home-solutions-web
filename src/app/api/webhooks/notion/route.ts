import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Verify Notion Webhook Signature
 * @see https://developers.notion.com/docs/webhooks#signature-verification
 */
function verifyNotionSignature(req: NextRequest, bodyStr: string): boolean {
  const secret = process.env.NOTION_WEBHOOK_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Notion Webhook] NOTION_WEBHOOK_SECRET not set, bypassing signature validation in development.');
      return true;
    }
    return false;
  }

  const signature = req.headers.get('x-notion-signature');
  const timestamp = req.headers.get('x-notion-request-timestamp');
  if (!signature || !timestamp) return false;

  // Replay Protection: Check if the request is within a 5-minute window
  const requestTimestampMs = parseInt(timestamp, 10);
  const nowMs = Date.now();
  const fiveMinutesMs = 5 * 60 * 1000;

  if (isNaN(requestTimestampMs) || Math.abs(nowMs - requestTimestampMs) > fiveMinutesMs) {
    console.error('[Notion Webhook] Stale or invalid timestamp');
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${timestamp}${bodyStr}`);
  const calculatedSignature = hmac.digest('hex');
  const signatureBuffer = Buffer.from(signature.replace('sha256=', ''));
  const calculatedSignatureBuffer = Buffer.from(calculatedSignature);

  if (signatureBuffer.length !== calculatedSignatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    signatureBuffer,
    calculatedSignatureBuffer
  );
}

/**
 * Notion Webhook Handler
 * 
 * Notion sends a POST request to this endpoint whenever a subscribed event occurs.
 * 
 * @see https://developers.notion.com/docs/webhooks
 */
export async function POST(req: NextRequest) {
  try {
    const bodyStr = await req.text();
    
    if (!verifyNotionSignature(req, bodyStr)) {
      console.error('[Notion Webhook] Invalid signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = JSON.parse(bodyStr);

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
    // DO NOT leak error details to the caller
    return NextResponse.json(
      { error: 'Internal Server Error' },
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

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { validateForensicPhoto, syncForensicPhoto } from '@/lib/services/forensic-docs';

/**
 * CompanyCam Webhook Handler (2026 Senior Principal Standard)
 * Implements real-time forensic photo synchronization.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-companycam-signature');
  const webhookToken = process.env.COMPANYCAM_WEBHOOK_TOKEN;

  if (!webhookToken) {
    console.error('Missing COMPANYCAM_WEBHOOK_TOKEN');
    return NextResponse.json({ error: 'Configuration Error' }, { status: 500 });
  }

  // Read raw body for signature verification
  const bodyText = await req.text();
  const hmac = crypto.createHmac('sha1', webhookToken);
  const digest = hmac.update(bodyText).digest('base64');

  if (signature !== digest) {
    console.warn('Unauthorized CompanyCam Webhook Attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = JSON.parse(bodyText);
  const { event, payload } = data;

  // Only process photo.created for the Forensic Audit Trail
  if (event === 'photo.created') {
    try {
      const verifiedPhoto = validateForensicPhoto(payload);
      await syncForensicPhoto(payload.project_id, verifiedPhoto);
    } catch (error) {
      console.error('Forensic Validation Failure:', error);
      // We still return 200 to CompanyCam to acknowledge receipt, 
      // but we log the forensic failure for internal audit.
    }
  }

  return NextResponse.json({ received: true });
}

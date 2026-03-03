import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { agreements, agreementVersions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Handle incoming webhooks from signature providers (PandaDoc/DocuSign).
 */
export async function POST(request: NextRequest) {
  // 1. Verify webhook signature (implementation dependent on provider)

  try {
    const payload = await request.json();
    const { documentId, status, signerEmail, signedAt } = payload;

    // 2. Find the corresponding version record
    const [version] = await db
      .select()
      .from(agreementVersions)
      .where(eq(agreementVersions.documentProviderId, documentId))
      .limit(1);

    if (!version) {
      console.warn(`[Signature Webhook] Unknown document ID: ${documentId}`);
      return NextResponse.json({ error: 'Unknown document' }, { status: 404 });
    }

    // 3. Update version status
    await db
      .update(agreementVersions)
      .set({
        status,
        signedAt: signedAt ? new Date(signedAt) : null,
        signedByClient: signerEmail || version.signedByClient,
      })
      .where(eq(agreementVersions.id, version.id));

    // 4. If fully signed, update parent agreement status
    if (status === 'signed' || status === 'completed') {
      await db
        .update(agreements)
        .set({ status: 'active', startDate: new Date() })
        .where(eq(agreements.id, version.agreementId));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Signature Webhook Error]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

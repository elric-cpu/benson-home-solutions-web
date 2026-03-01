import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { agreements, agreementVersions, clients } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { createSignatureRequest } from '@/lib/agreements/signatures';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // 1. Fetch agreement and client details
    const result = await db
      .select({
        agreement: agreements,
        client: clients,
      })
      .from(agreements)
      .where(eq(agreements.id, id))
      .innerJoin(clients, eq(agreements.clientId, clients.id))
      .limit(1);

    const data = result[0];
    if (!data) return NextResponse.json({ error: 'Agreement not found' }, { status: 404 });

    // 2. Determine next version number
    const [lastVersion] = await db
      .select()
      .from(agreementVersions)
      .where(eq(agreementVersions.agreementId, id))
      .orderBy(desc(agreementVersions.versionNumber))
      .limit(1);
    
    const nextVersion = (lastVersion?.versionNumber || 0) + 1;

    // 3. Trigger external signature request
    const { providerId, signingUrl } = await createSignatureRequest({
      agreementId: id,
      clientEmail: data.client.email!,
      clientName: data.client.name,
      documentHtml: 'Agreement Content Placeholder', // In production, generate HTML from data
      version: nextVersion,
    });

    // 4. Create version record
    await db.insert(agreementVersions).values({
      agreementId: id,
      versionNumber: nextVersion,
      documentProvider: process.env.SIGNATURE_PROVIDER || 'pandadoc',
      documentProviderId: providerId,
      documentUrl: signingUrl,
      status: 'sent',
    });

    return NextResponse.json({ success: true, signingUrl });
  } catch (error) {
    console.error('[Sign API Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

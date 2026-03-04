import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { agreements, clients, properties, agreementVersions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const {
      propertyId,
      clientId,
      services,
      totalAnnual,
      monthlySubscription,
      agreementType = 'residential-subscription',
    } = await request.json();

    if (!propertyId || !clientId || !services) {
      return NextResponse.json(
        { error: 'Missing required agreement data' },
        { status: 400 },
      );
    }

    // 1. Generate unique agreement number (BHS-YYYY-RANDOM)
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const agreementNumber = `BHS-${year}-${random}`;

    // 2. Create the agreement in the database
    const [newAgreement] = await db
      .insert(agreements)
      .values({
        agreementNumber,
        clientId,
        propertyId,
        agreementType,
        annualPrice: totalAnnual.toString(),
        monthlyPrice: monthlySubscription.toString(),
        status: 'draft',
        services,
        startDate: new Date(),
        // Default to 12 months
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      })
      .returning();

    // 3. Create initial version (Layer 2)
    await db.insert(agreementVersions).values({
      agreementId: newAgreement.id,
      versionNumber: 1,
      documentProvider: 'system',
      documentProviderId: `initial-${agreementNumber}`,
      status: 'draft',
      changesSummary: 'Initial agreement generation from calculator.',
    });

    // 4. Update property status
    await db
      .update(properties)
      .set({ agreementStatus: 'draft' })
      .where(eq(properties.id, propertyId));

    // 4. Send internal notification (Background)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const [clientData] = await db
          .select()
          .from(clients)
          .where(eq(clients.id, clientId))
          .limit(1);

        await resend.emails.send({
          from: 'Benson Home Solutions <office@bensonhomesolutions.com>',
          to: ['office@bensonhomesolutions.com'],
          subject: `New Agreement Drafted: ${agreementNumber}`,
          html: `
            <div style="font-family: sans-serif;">
              <h2>New Agreement Drafted</h2>
              <p><strong>Client:</strong> ${clientData?.name} (${clientData?.email})</p>
              <p><strong>Agreement #:</strong> ${agreementNumber}</p>
              <p><strong>Annual Value:</strong> $${totalAnnual.toLocaleString()}</p>
              <p><strong>Monthly:</strong> $${monthlySubscription.toLocaleString()}</p>
              <hr />
              <a href="https://bensonhomesolutions.com/agreements/${newAgreement.id}">View Agreement Draft</a>
            </div>
          `,
        });
      } catch (e) {
        console.error('Agreement notification failed', e);
      }
    }

    return NextResponse.json({
      success: true,
      agreementId: newAgreement.id,
      agreementNumber: newAgreement.agreementNumber,
    });
  } catch (error) {
    console.error('[Agreement API] Finalize failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

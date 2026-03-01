import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { properties, clients } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCalculatorReportEmail } from '@/lib/email/templates';
import { checkRateLimit, FORM_RATE_LIMIT } from '@/lib/rate-limit';
import { syncLeadToHubSpot } from '@/lib/crm/hubspot';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = checkRateLimit(ip, FORM_RATE_LIMIT);
  
  if (!success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, address, annualTotal, monthlyTotal, isServiceArea, addressHash } = body;

    if (!email || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. CRM Sync (Background)
    syncLeadToHubSpot({
      email,
      source: 'cost-calculator',
      propertyAddress: address,
      isServiceArea,
      message: `Calculator result: $${annualTotal.toLocaleString()}/yr`,
    }).catch(err => console.error('[HubSpot Sync Error]', err));

    // 2. Database: Create or Update Client
    const [client] = await db
      .insert(clients)
      .values({
        email,
        name: 'Calculator Lead',
        sourceChannel: 'cost-calculator',
      })
      .onConflictDoUpdate({
        target: clients.email,
        set: { updatedAt: new Date() },
      })
      .returning();

    // 3. Database: Link Property to Client
    if (addressHash) {
      await db
        .update(properties)
        .set({ clientId: client.id })
        .where(eq(properties.addressHash, addressHash));
    }

    // 4. Email: Send Report
    const { data, error } = await resend.emails.send({
      from: 'Benson Home Solutions <office@bensonhomesolutions.com>',
      to: [email],
      subject: `Your Property Report: ${address}`,
      html: getCalculatorReportEmail({
        address,
        annualTotal,
        monthlyTotal,
        isServiceArea,
      }),
    });

    if (error) {
      console.error('[Calculator API] Resend Error:', error);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Report sent successfully.',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('[Calculator API] Server Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

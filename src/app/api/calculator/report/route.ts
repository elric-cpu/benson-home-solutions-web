import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { properties, clients } from '@/lib/db/schema';
import { getCalculatorReportEmail } from '@/lib/email/templates';
import { checkRateLimit, FORM_RATE_LIMIT } from '@/lib/rate-limit';
import { syncLeadToHubSpot } from '@/lib/crm/hubspot';
import { trackServerCalculatorUse } from '@/lib/analytics/ga4-server';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = checkRateLimit(ip, FORM_RATE_LIMIT);

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const {
      email,
      address,
      propertyType,
      annualTotal,
      monthlyTotal,
      isServiceArea,
      addressHash,
      zip,
      city,
      state,
      county,
      costs, // Pass the calculated costs to save
    } = body;

    if (!email || !address || !addressHash) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is missing. Skipping email send.');
      return NextResponse.json({
        success: true,
        message: 'Simulated success (no API key)',
      });
    }

    const resend = new Resend(apiKey);

    // 1. Database: Create or Update Client
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

    // 2. Database: Create or Update Property
    await db
      .insert(properties)
      .values({
        addressHash,
        rawAddress: address,
        clientId: client.id,
        zip,
        city,
        state,
        county,
        energyBenchmarks: { costs }, // Store costs in energyBenchmarks for now as per schema
        dataCompleteness: 50,
      })
      .onConflictDoUpdate({
        target: properties.addressHash,
        set: {
          clientId: client.id,
          updatedAt: new Date(),
          energyBenchmarks: { costs },
        },
      });

    // 3. CRM Sync (Background)
    syncLeadToHubSpot({
      email,
      source: 'cost-calculator',
      propertyAddress: address,
      propertyType,
      serviceInterest: 'browsing',
      isServiceArea,
      message: `Calculator result: $${annualTotal.toLocaleString()}/yr`,
    }).catch((err) => console.error('[HubSpot Sync Error]', err));

    // 4. GA4 Server-side Tracking
    trackServerCalculatorUse(ip, 'cost-calculator').catch((err) =>
      console.error('[GA4 Sync Error]', err),
    );

    // 5. Email: Send Report
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
      emailId: data?.id,
    });
  } catch (error) {
    console.error('[Calculator API] Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clients } from '@/lib/db/schema';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email/resend';
import { syncLeadToHubSpot } from '@/lib/crm/hubspot';

export async function POST(req: NextRequest) {
  try {
    // Check for empty body
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-type must be application/json' }, { status: 400 });
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('Failed to parse request body as JSON:', e);
      return NextResponse.json({ error: 'Invalid or empty JSON body' }, { status: 400 });
    }

    const { firstName, lastName, email, phone, service, message, website } = body;

    // Honeypot check (server-side)
    if (website) {
      return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
    }

    // Basic validation
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`;

    // 1. Save to Database (Supabase)
    try {
      await db.insert(clients).values({
        name: fullName,
        email,
        phone,
        sourceChannel: 'web',
      }).onConflictDoNothing();
      // Note: If you want to store the message, you might need to update your schema or use a separate 'leads' table.
      // For now, we are using the 'clients' table as per prompt 4 structure.
    } catch (dbError) {
      console.error('Database insertion failed:', dbError);
    }

    // 2. Sync to HubSpot CRM
    try {
      await syncLeadToHubSpot({
        email,
        firstName,
        lastName,
        phone,
        message,
        source: 'web',
        serviceInterest: service,
      });
    } catch (hubspotError) {
      console.error('HubSpot sync failed:', hubspotError);
    }

    // 3. Send Notification Email to Benson Office
    try {
      await sendContactNotification({
        name: fullName,
        email,
        phone,
        service,
        message,
        submittedAt: new Date().toLocaleString(),
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    // 3. Send Confirmation Email to Client
    try {
      await sendContactConfirmation({
        name: fullName,
        email,
        service,
      });
    } catch (confError) {
      console.error('Email confirmation failed:', confError);
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

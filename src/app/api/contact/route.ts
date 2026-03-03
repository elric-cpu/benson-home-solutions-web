import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, FORM_RATE_LIMIT } from '@/lib/rate-limit';
import { db } from '@/lib/db';
import { contactSubmissions, clients } from '@/lib/db/schema';
import { syncLeadToHubSpot } from '@/lib/crm/hubspot';
import { trackServerContactSubmit } from '@/lib/analytics/ga4-server';

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rateLimitResult = checkRateLimit(`contact:${ip}`, FORM_RATE_LIMIT);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    const body: ContactPayload = await request.json();
    const resolvedName =
      body.name || [body.firstName, body.lastName].filter(Boolean).join(' ');

    if (!resolvedName || resolvedName.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 },
      );
    }
    if (!body.message || body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 },
      );
    }

    const lead = {
      name: resolvedName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      service: body.service || null,
      message: body.message.trim(),
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form' as const,
    };

    // 1. CRM Sync (Background - non-blocking)
    syncLeadToHubSpot({
      email: lead.email,
      firstName: body.firstName || resolvedName.split(' ')[0],
      lastName: body.lastName || resolvedName.split(' ').slice(1).join(' '),
      phone: lead.phone || undefined,
      message: lead.message,
      source: 'web',
      serviceInterest: lead.service || undefined,
    }).catch((err) => console.error('[HubSpot Sync Error]', err));

    // 2. GA4 Server-side Tracking (Background - non-blocking)
    trackServerContactSubmit(ip, lead.service || undefined).catch((err) =>
      console.error('[GA4 Sync Error]', err),
    );

    // 3. Database Persistence
    try {
      await db
        .insert(clients)
        .values({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          sourceChannel: 'contact-form',
        })
        .onConflictDoUpdate({
          target: clients.email,
          set: {
            name: lead.name,
            phone: lead.phone,
            updatedAt: new Date(),
          },
        });

      await db.insert(contactSubmissions).values({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        message: lead.message,
        source: lead.source,
      });
    } catch (dbError) {
      console.error('[Contact] DB persist failed:', dbError);
    }

    // 3. Email Notifications
    if (process.env.RESEND_API_KEY) {
      try {
        const { sendContactNotification, sendContactConfirmation } =
          await import('@/lib/email/resend');

        await Promise.allSettled([
          sendContactNotification(lead),
          sendContactConfirmation({
            name: lead.name,
            email: lead.email,
            service: lead.service,
          }),
        ]);
      } catch (emailError) {
        console.error('[Contact] Email trigger failed:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        'Thank you! We received your message and will respond within one business day.',
    });
  } catch (error) {
    console.error('[Contact] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Invalid request. Please try again.' },
      { status: 400 },
    );
  }
}

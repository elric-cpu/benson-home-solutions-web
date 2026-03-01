import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, FORM_RATE_LIMIT } from '@/lib/rate-limit';

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
        {
          status: 429,
          headers: {
            'Retry-After': String(
              Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)
            ),
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const body: ContactPayload = await request.json();

    // Resolve name from possible input formats (support both separate names and combined field)
    const resolvedName = body.name || [body.firstName, body.lastName].filter(Boolean).join(' ');

    if (!resolvedName || resolvedName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      );
    }
    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }
    if (!body.message || body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
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

    if (process.env.DATABASE_URL) {
      try {
        const { getDb } = await import('@/lib/db');
        const { contactSubmissions } = await import('@/lib/db/schema');
        const db = getDb();
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
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { sendContactNotification, sendContactConfirmation } =
          await import('@/lib/email/resend');
        await Promise.allSettled([
          sendContactNotification(lead),
          sendContactConfirmation({ name: lead.name, email: lead.email }),
        ]);
      } catch (emailError) {
        console.error('[Contact] Email send failed:', emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We received your message and will respond within one business day.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(rateLimitResult.limit),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('[Contact] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Invalid request. Please try again.' },
      { status: 400 }
    );
  }
}

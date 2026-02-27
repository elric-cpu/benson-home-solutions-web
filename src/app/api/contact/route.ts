import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, FORM_RATE_LIMIT } from '@/lib/rate-limit';

interface ContactPayload {
  name: string;
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
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    // --- Rate limiting ---
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

    // --- Validation ---
    if (!body.name || !body.name.trim()) {
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
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      service: body.service || null,
      message: body.message.trim(),
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form' as const,
    };

    // --- Persist to Neon DB (if configured) ---
    let persisted = false;
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
        persisted = true;
      } catch (dbError) {
        console.error('[Contact] DB persist failed:', dbError);
        // Continue — don't lose the lead just because DB is down
      }
    }

    // --- Send email notifications (if Resend configured) ---
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

    // Always log to console as a fallback
    console.log(
      '[Contact Form]',
      JSON.stringify({ ...lead, persisted }, null, 2)
    );

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you! We received your message and will respond within one business day.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(rateLimitResult.limit),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request. Please try again.' },
      { status: 400 }
    );
  }
}

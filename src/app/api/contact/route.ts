import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    // Validate required fields
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

    // Honeypot / rate-limit placeholder
    // TODO: Agent 12 — add rate limiting via Vercel KV or Upstash
    // TODO: Agent 08 — persist lead to Neon DB once provisioned
    // TODO: Agent 07 — integrate Resend for email notifications

    const lead = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      service: body.service || null,
      message: body.message.trim(),
      submittedAt: new Date().toISOString(),
      source: 'website-contact-form',
    };

    // Log to server console for now (visible in Vercel function logs)
    console.warn('[Contact Form Submission]', JSON.stringify(lead, null, 2));

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you! We received your message and will respond within one business day.',
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request. Please try again.' },
      { status: 400 }
    );
  }
}

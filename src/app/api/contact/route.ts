import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { contactSubmissions } from '@/lib/db/schema';
import { ratelimit } from '@/lib/ratelimit';
import { BUSINESS } from '@/lib/constants';
import { sendGoogleWorkspaceMail } from '@/lib/gcloud/mail';
import { createFirestoreDocument } from '@/lib/gcloud/firestore';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

async function persistSubmission(body: ContactPayload) {
  const payload = {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone?.trim() || null,
    service: body.service || null,
    message: body.message.trim(),
    source: 'website-contact-form',
  };

  try {
    const db = getDb();
    await db.insert(contactSubmissions).values(payload);
    return 'database';
  } catch (error) {
    console.warn('[Contact API] Database persistence unavailable, using Firestore fallback:', error);
    await createFirestoreDocument('ops_contact_submissions', {
      ...payload,
      createdAt: new Date().toISOString(),
    });
    return 'firestore';
  }
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

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `contact_${ip}`
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }

    let persistence: 'database' | 'firestore' | 'unknown' = 'unknown';

    try {
      persistence = await persistSubmission(body);
      await sendGoogleWorkspaceMail({
        to: [BUSINESS.email],
        subject: `New Contact Submission: ${body.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
          <p><strong>Service Interest:</strong> ${body.service || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message}</p>
        `,
      });
    } catch (error) {
      console.error('[Contact API] Background Task Error:', error);
      // We still return success to the user since the DB/Email failure 
      // is handled internally.
    }

    return NextResponse.json(
      {
        success: true,
        persistence,
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

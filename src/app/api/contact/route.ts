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

const max = { name: 120, email: 254, phone: 40, service: 160, message: 6000 } as const;

function clean(value: string | undefined, limit: number) {
  return (value || '').replace(/\u0000/g, '').trim().slice(0, limit);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] || char);
}

function normalize(body: ContactPayload): ContactPayload {
  return {
    name: clean(body.name, max.name),
    email: clean(body.email, max.email).toLowerCase(),
    phone: clean(body.phone, max.phone),
    service: clean(body.service, max.service),
    message: clean(body.message, max.message),
  };
}

async function persistSubmission(body: ContactPayload) {
  const payload = {
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    service: body.service || null,
    message: body.message,
    source: 'website-contact-form',
  };
  try {
    const db = getDb();
    await db.insert(contactSubmissions).values(payload);
    return 'database';
  } catch (error) {
    console.warn('[Contact API] Database persistence unavailable, using Firestore fallback:', error);
    await createFirestoreDocument('ops_contact_submissions', { ...payload, createdAt: new Date().toISOString() });
    return 'firestore';
  }
}

function validateEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

export async function POST(request: NextRequest) {
  try {
    const body = normalize(await request.json());
    if (!body.name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    if (!body.email || !validateEmail(body.email)) return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    if (!body.message || body.message.length < 10) return NextResponse.json({ error: 'Project description must be at least 10 characters.' }, { status: 400 });

    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const { success, limit, reset, remaining } = await ratelimit.limit(`contact_${ip}`);
    if (!success) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'X-RateLimit-Limit': String(limit), 'X-RateLimit-Remaining': String(remaining), 'X-RateLimit-Reset': String(reset) } });

    let persistence: 'database' | 'firestore' | 'unknown' = 'unknown';
    try {
      persistence = await persistSubmission(body);
      await sendGoogleWorkspaceMail({
        to: [BUSINESS.email],
        subject: `New Website Project Request: ${body.name}`,
        html: `<h2>New Website Project Request</h2><p><strong>Name:</strong> ${escapeHtml(body.name)}</p><p><strong>Email:</strong> ${escapeHtml(body.email)}</p><p><strong>Phone:</strong> ${escapeHtml(body.phone || 'N/A')}</p><p><strong>Service:</strong> ${escapeHtml(body.service || 'N/A')}</p><p><strong>Project details:</strong></p><pre style="white-space:pre-wrap;font-family:Arial,sans-serif">${escapeHtml(body.message)}</pre>`,
      });
    } catch (error) {
      console.error('[Contact API] Persistence or notification failure:', error);
      return NextResponse.json({ error: 'We could not save the request. Please call or email Benson Home Solutions directly.' }, { status: 503 });
    }

    return NextResponse.json({ success: true, persistence, message: 'Project request received.' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid request. Please try again.' }, { status: 400 });
  }
}

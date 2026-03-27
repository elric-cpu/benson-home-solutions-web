import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, properties } from '@/lib/db/schema';
import { validateAddress } from '@/lib/gcloud/address';
import { logInfo, logError } from '@/lib/gcloud/logging';
import { MAX_ATTACHMENT_SIZE_BYTES } from '@/lib/constants';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const MIN_FORM_FILL_MS = 3000;
const ipSubmissions = new Map<string, number[]>();

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  service?: string;
  message: string;
  turnstileToken?: string;
  duration?: number;
  attachmentName?: string;
  attachmentType?: string;
  attachmentData?: string;
  attachmentSize?: number;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

import { sendLeadNotification } from '@/lib/gcloud/email';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string): boolean {
  if (ip === 'unknown') {
    return false;
  }
  const now = Date.now();
  let attempts = ipSubmissions.get(ip) || [];

  // Filter out stale attempts (attempts older than RATE_LIMIT_WINDOW_MS)
  attempts = attempts.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  // If all previous attempts have expired, and there's no current attempt yet, delete the IP from the map.
  // We do this before adding the current attempt to allow pruning for inactive IPs.
  if (attempts.length === 0 && ipSubmissions.has(ip)) {
    ipSubmissions.delete(ip);
  }

  // Check if adding the current attempt would exceed the limit
  if (attempts.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    ipSubmissions.set(ip, attempts);
    return true; // Rate limited
  }

  // Add the current attempt
  attempts.push(now);
  ipSubmissions.set(ip, attempts);

  return false; // Not rate limited
}

async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip && ip !== 'unknown') {
    body.set('remoteip', ip);
  }

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    },
  );

  if (!response.ok) return false;

  const data = (await response.json()) as { success?: boolean };
  return !!data.success;
}

/**
 * Benson Home Solutions - Contact Lead Persistence (Gcloud Enhanced)
 * Captures, validates, and stores inquiries.
 */
export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            'Too many requests from this address. Please wait a few minutes and try again.',
        },
        { status: 429 },
      );
    }

    if (typeof body.duration === 'number' && body.duration < MIN_FORM_FILL_MS) {
      return NextResponse.json(
        { error: 'Form submitted too quickly.' },
        { status: 400 },
      );
    }

    // 1. Basic Validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 },
      );
    }
    if (!body.message?.trim() || body.message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 },
      );
    }

    if (body.attachmentName && !body.attachmentData) {
      return NextResponse.json(
        { error: 'Attachment was not uploaded correctly.' },
        { status: 400 },
      );
    }
    if (body.attachmentData && !body.attachmentName) {
      return NextResponse.json(
        { error: 'Please provide a name for your attachment.' },
        { status: 400 },
      );
    }

    // Validate attachment size safely on the server side
    let actualAttachmentSize = 0;
    let normalizedAttachmentData: string | null = null;

    if (body.attachmentData) {
      if (!body.attachmentType) {
        return NextResponse.json(
          {
            error:
              'Attachment type is required when attachment data is provided.',
          },
          { status: 400 },
        );
      }

      // Normalize: Base64 string might have data URI prefix, e.g., "data:image/png;base64,..."
      normalizedAttachmentData = body.attachmentData.split(',').pop() || '';

      // Rough calculation of bytes from base64 length (3 bytes for every 4 chars)
      actualAttachmentSize = Math.floor(normalizedAttachmentData.length * 0.75);

      if (actualAttachmentSize > MAX_ATTACHMENT_SIZE_BYTES) {
        return NextResponse.json(
          { error: 'Attachments must be 3.75MB or smaller.' },
          { status: 400 },
        );
      }

      const allowedFileTypes: Record<string, string[]> = {
        jpg: ['image/jpeg'],
        jpeg: ['image/jpeg'],
        png: ['image/png'],
        webp: ['image/webp'],
        pdf: ['application/pdf'],
      };
      const fileExtension = body.attachmentName
        ?.split('.')
        .pop()
        ?.toLowerCase();
      const validMimeTypes = fileExtension
        ? allowedFileTypes[fileExtension]
        : undefined;

      if (
        !fileExtension ||
        !validMimeTypes ||
        !validMimeTypes.includes(body.attachmentType)
      ) {
        return NextResponse.json(
          {
            error:
              'Invalid file type or extension. Only JPG, PNG, WEBP, and PDF are allowed.',
          },
          { status: 400 },
        );
      }
    }

    const trimmedMessage = body.message.trim();
    const attachmentNote = body.attachmentName
      ? `${body.attachmentName} (${Math.round(actualAttachmentSize / 1024)} KB)`
      : null;
    const messageForDb = attachmentNote
      ? `${trimmedMessage}\n\nAttachment: ${attachmentNote}`
      : trimmedMessage;
    const hasAttachment = Boolean(
      body.attachmentName && normalizedAttachmentData,
    );

    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!body.turnstileToken) {
        return NextResponse.json(
          { error: 'Please complete the spam check and try again.' },
          { status: 400 },
        );
      }

      const turnstileOk = await verifyTurnstile(body.turnstileToken, clientIp);
      if (!turnstileOk) {
        return NextResponse.json(
          { error: 'Spam check failed. Please try again.' },
          { status: 400 },
        );
      }
    }

    // 2. Gcloud address validation helps us prep for property-specific scopes.
    let validatedAddr = null;
    if (body.address?.trim()) {
      try {
        validatedAddr = await validateAddress([body.address.trim()]);
      } catch (err) {
        logError(err as Error, { context: 'Address Validation' });
      }
    }

    // 3. Database Persistence
    const [newLead] = await db
      .insert(leads)
      .values({
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        serviceType: body.service || 'General Inquiry',
        message: messageForDb,
        propertyAddress:
          validatedAddr?.standardizedAddress || body.address || null,
        status: 'new',
      })
      .returning();

    // 4. Property Record Creation (If address is validated)
    if (validatedAddr && validatedAddr.isDeliverable) {
      await db
        .insert(properties)
        .values({
          leadId: newLead.id,
          standardizedAddress: validatedAddr.standardizedAddress!,
          city: validatedAddr.city || null,
          county: validatedAddr.county || null,
          lat: validatedAddr.latitude?.toString(),
          lng: validatedAddr.longitude?.toString(),
          auditHash: validatedAddr.addressHash,
        })
        .onConflictDoNothing();
    }

    // 5. Gcloud Logging (Structured Lead Event)
    logInfo('Lead Captured', {
      leadId: newLead.id,
      service: newLead.serviceType,
      city: validatedAddr?.city || 'Unknown',
      isAddressValidated: !!validatedAddr?.isDeliverable,
      attachmentName: body.attachmentName || null,
    });

    // 6. Asynchronous Enrichment Trigger
    const internalBaseUrl =
      process.env.INTERNAL_API_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');
    const apiKey = process.env.INTERNAL_API_KEY;

    if (!apiKey) {
      logError(new Error('INTERNAL_API_KEY is not set.'), {
        context: 'Enrichment Trigger Failed',
      });
    } else {
      fetch(`${internalBaseUrl}/api/enrich`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ leadId: newLead.id }),
      })
        .then((res) => {
          if (!res.ok)
            logError(
              new Error(`Enrichment failed with status: ${res.status}`),
              { context: 'Enrichment Trigger Failed' },
            );
        })
        .catch((err) =>
          logError(err as Error, { context: 'Enrichment Trigger Failed' }),
        );
    }

    // 7. Gcloud-native email notification
    await sendLeadNotification({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: validatedAddr?.standardizedAddress || body.address,
      service: body.service,
      message: trimmedMessage,
      attachment: hasAttachment
        ? {
            name: body.attachmentName!,
            type: body.attachmentType || 'application/octet-stream',
            data: normalizedAttachmentData!,
          }
        : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you! We received your request and will respond within one business day.',
        leadId: newLead.id,
      },
      { status: 200 },
    );
  } catch (error) {
    logError(error as Error, { context: 'Contact Form Submission' });
    return NextResponse.json(
      {
        error:
          'We had trouble saving your request. Please try again or call 541-321-5115.',
      },
      { status: 500 },
    );
  }
}

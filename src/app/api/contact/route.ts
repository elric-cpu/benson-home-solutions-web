import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, properties } from '@/lib/db/schema';
import { validateAddress } from '@/lib/gcloud/address';
import { logInfo, logError } from '@/lib/gcloud/logging';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  service?: string;
  message: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

import { sendLeadNotification } from '@/lib/gcloud/email';

/**
 * Benson Home Solutions - Contact Lead Persistence (Gcloud Enhanced)
 * Captures, validates, and stores inquiries.
 */
export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    // 1. Basic Validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!body.message?.trim() || body.message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    // 2. Gcloud Address Validation (Optional but recommended for Forensic Audits)
    let validatedAddr = null;
    if (body.address?.trim()) {
      try {
        validatedAddr = await validateAddress([body.address.trim()]);
      } catch (err) {
        logError(err as Error, { context: 'Address Validation' });
      }
    }

    // 3. Database Persistence
    const [newLead] = await db.insert(leads).values({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      serviceType: body.service || 'General Inquiry',
      message: body.message.trim(),
      propertyAddress: validatedAddr?.standardizedAddress || body.address || null,
      status: 'new',
    }).returning();

    // 4. Property Record Creation (If address is validated)
    if (validatedAddr && validatedAddr.isDeliverable) {
      await db.insert(properties).values({
        leadId: newLead.id,
        standardizedAddress: validatedAddr.standardizedAddress!,
        city: validatedAddr.city || null,
        county: validatedAddr.county || null,
        lat: validatedAddr.latitude?.toString(),
        lng: validatedAddr.longitude?.toString(),
        auditHash: validatedAddr.addressHash,
      }).onConflictDoNothing();
    }

    // 5. Gcloud Logging (Structured Lead Event)
    logInfo('Lead Captured', {
      leadId: newLead.id,
      service: newLead.serviceType,
      city: validatedAddr?.city || 'Unknown',
      isForensicReady: !!validatedAddr?.isDeliverable,
    });

    // 6. Asynchronous Enrichment Trigger
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/enrich`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_KEY}`,
      },
      body: JSON.stringify({ leadId: newLead.id }),
    }).catch(err => logError(err as Error, { context: 'Enrichment Trigger Failed' }));
    
    // 7. Gcloud-native email notification
    await sendLeadNotification({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: validatedAddr?.standardizedAddress || body.address,
      service: body.service,
      message: body.message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! We received your request and will respond within one business day.',
        leadId: newLead.id,
      },
      { status: 200 }
    );
  } catch (error) {
    logError(error as Error, { context: 'Contact Form Submission' });
    return NextResponse.json(
      { error: 'We had trouble saving your request. Please try again or call 541-321-5115.' },
      { status: 500 }
    );
  }
}

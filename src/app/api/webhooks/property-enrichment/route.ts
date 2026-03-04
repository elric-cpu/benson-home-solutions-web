import { NextRequest, NextResponse } from 'next/server';
import { generateAddressHash } from '@/lib/utils/hash';
import { db } from '@/lib/db';
import { properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { geocodeAddress } from '@/lib/services/geocoding';

const WEBHOOK_SECRET = process.env.BHS_WEBHOOK_SECRET || 'test-secret';

export async function POST(req: NextRequest) {
  try {
    // 1. Secret Header Check
    const secret = req.headers.get('X-BHS-Webhook-Secret');
    if (secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { address, _honeypot } = body;

    // 2. Honeypot Check
    if (_honeypot) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    // 3. Basic Input Validation
    if (!address || typeof address !== 'string' || address.length < 5) {
      return NextResponse.json({ error: 'Invalid address format' }, { status: 400 });
    }

    // Reject if address doesn't contain at least one digit and one alphabetic character
    const hasDigit = /\d/.test(address);
    const hasAlpha = /[a-zA-Z]/.test(address);
    if (!hasDigit || !hasAlpha) {
      return NextResponse.json({ error: 'Invalid address format' }, { status: 400 });
    }

    // 4. Deduplication
    const addressHash = await generateAddressHash(address);
    const hasDb = !!process.env.DATABASE_URL;
    
    if (hasDb) {
      try {
        // Check if record exists and is < 90 days old
        const [existingProperty] = await db
          .select()
          .from(properties)
          .where(eq(properties.addressHash, addressHash))
          .limit(1);

        if (existingProperty && existingProperty.enrichedAt) {
          const ninetyDaysAgo = new Date();
          ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
          
          if (existingProperty.enrichedAt > ninetyDaysAgo) {
            return NextResponse.json({
              status: 'cached',
              data: existingProperty
            });
          }
        }
      } catch (dbError) {
        console.warn('[Property Enrichment] DB lookup failed, proceeding without cache:', dbError);
      }
    }

    // 5. Geocoding & Validation
    const geocode = await geocodeAddress(address);
    
    const enrichedData = {
      addressHash,
      rawAddress: address,
      standardizedAddress: geocode.standardizedAddress,
      city: geocode.city,
      state: geocode.state,
      zip: geocode.zip,
      county: geocode.county,
      latitude: geocode.lat,
      longitude: geocode.lng,
      geocodeStatus: geocode.source === 'manual_required' ? 'manual_required' : 'success',
      dataCompleteness: geocode.source === 'manual_required' ? 10 : 30, // 30% if geocoded
      enrichedAt: new Date(),
      dataSources: {
        geocode: {
          source: geocode.source,
          confidence: geocode.confidence,
          fetchedAt: new Date().toISOString()
        }
      }
    };

    let resultData = enrichedData;

    if (hasDb) {
      try {
        // Upsert the property record
        const [property] = await db
          .insert(properties)
          .values({
            addressHash,
            rawAddress: address,
            standardizedAddress: enrichedData.standardizedAddress,
            city: enrichedData.city,
            state: enrichedData.state,
            zip: enrichedData.zip,
            county: enrichedData.county,
            latitude: enrichedData.latitude,
            longitude: enrichedData.longitude,
            geocodeStatus: enrichedData.geocodeStatus as 'success' | 'partial' | 'pending' | 'manual_required',
            dataCompleteness: enrichedData.dataCompleteness,
            enrichedAt: enrichedData.enrichedAt,
            dataSources: enrichedData.dataSources,
          })
          .onConflictDoUpdate({
            target: properties.addressHash,
            set: {
              updatedAt: new Date(),
              enrichedAt: enrichedData.enrichedAt,
              // Update other fields only if they are better/newer? For now, overwrite.
              standardizedAddress: enrichedData.standardizedAddress,
              city: enrichedData.city,
              state: enrichedData.state,
              zip: enrichedData.zip,
              latitude: enrichedData.latitude,
              longitude: enrichedData.longitude,
              dataCompleteness: enrichedData.dataCompleteness,
              dataSources: enrichedData.dataSources,
            }
          })
          .returning();
        
        resultData = property as any;
      } catch (dbError) {
        console.warn('[Property Enrichment] DB upsert failed, returning transient result:', dbError);
      }
    }

    return NextResponse.json({
      status: 'success',
      data: resultData
    });

  } catch (error) {
    console.error('[Property Enrichment Webhook Error]', error);
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
  }
}

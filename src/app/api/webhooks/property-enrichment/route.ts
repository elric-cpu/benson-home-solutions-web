import { NextRequest, NextResponse } from 'next/server';
import { generateAddressHash } from '@/lib/utils/hash';
import { db } from '@/lib/db';
import { properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { geocodeAddress } from '@/lib/services/geocoding';
import { fetchFloodZone, fetchDisasterHistory } from '@/lib/services/fema';
import { fetchHudData } from '@/lib/services/hud';
import { getEnergyBenchmark } from '@/lib/services/energy';

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
        console.warn('[Property Enrichment] DB lookup failed:', dbError);
      }
    }

    // 5. Sequential Step: Geocoding
    const geocode = await geocodeAddress(address);
    const isManual = geocode.source === 'manual_required';

    // 6. Parallel Enrichment (if geocoded)
    let floodZone = null;
    let disasterHistory: any[] = [];
    let hudData = null;

    if (!isManual) {
      const [fz, dh, hud] = await Promise.all([
        fetchFloodZone(geocode.lat, geocode.lng),
        fetchDisasterHistory(geocode.zip),
        fetchHudData(geocode.zip)
      ]);
      floodZone = fz;
      disasterHistory = dh;
      hudData = hud;
    }

    // 7. Energy Benchmarks (Default to 1978 median if unknown)
    const energy = getEnergyBenchmark(1978, geocode.zip?.startsWith('977') ? '6' : '4C');

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
      geocodeStatus: isManual ? 'manual_required' : 'success',
      floodZone: floodZone?.zone || 'Unknown',
      floodZoneSource: floodZone?.source || 'N/A',
      disasterHistory,
      fairMarketRent: hudData?.fairMarketRent ? String(hudData.fairMarketRent) : null,
      areaIncomeLimit: hudData?.areaIncomeLimit ? String(hudData.areaIncomeLimit) : null,
      energyBenchmarks: energy,
      dataCompleteness: isManual ? 10 : (hudData ? 100 : 70), 
      enrichedAt: new Date(),
      dataSources: {
        geocode: {
          source: geocode.source,
          confidence: geocode.confidence,
          fetchedAt: new Date().toISOString()
        },
        floodZone: floodZone ? {
          value: floodZone.zone,
          source: floodZone.source,
          fetchedAt: floodZone.fetchedAt
        } : null,
        hud: hudData ? {
          source: hudData.source,
          fetchedAt: hudData.fetchedAt
        } : null,
        energy: {
          source: 'DOE ResStock/EIA RECS Model',
          fetchedAt: new Date().toISOString()
        }
      }
    };

    let resultData = enrichedData;

    if (hasDb) {
      try {
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
            geocodeStatus: enrichedData.geocodeStatus as any,
            floodZone: enrichedData.floodZone,
            floodZoneSource: enrichedData.floodZoneSource,
            disasterHistory: enrichedData.disasterHistory,
            fairMarketRent: enrichedData.fairMarketRent,
            areaIncomeLimit: enrichedData.areaIncomeLimit,
            energyBenchmarks: enrichedData.energyBenchmarks,
            dataCompleteness: enrichedData.dataCompleteness,
            enrichedAt: enrichedData.enrichedAt,
            dataSources: enrichedData.dataSources,
          })
          .onConflictDoUpdate({
            target: properties.addressHash,
            set: {
              updatedAt: new Date(),
              enrichedAt: enrichedData.enrichedAt,
              standardizedAddress: enrichedData.standardizedAddress,
              city: enrichedData.city,
              state: enrichedData.state,
              zip: enrichedData.zip,
              latitude: enrichedData.latitude,
              longitude: enrichedData.longitude,
              floodZone: enrichedData.floodZone,
              disasterHistory: enrichedData.disasterHistory,
              energyBenchmarks: enrichedData.energyBenchmarks,
              dataCompleteness: enrichedData.dataCompleteness,
              dataSources: enrichedData.dataSources,
            }
          })
          .returning();
        
        resultData = property as any;
      } catch (dbError) {
        console.warn('[Property Enrichment] DB upsert failed:', dbError);
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

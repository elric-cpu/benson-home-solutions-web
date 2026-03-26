import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads, properties } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { logError, logInfo } from '@/lib/gcloud/logging';

// --- Helper Functions and Type Definitions ---

interface GeocoderResponse {
  result: {
    addressMatches: {
      coordinates: { x: number; y: number };
    }[];
  };
}

interface FemaResponse {
  features: {
    attributes: {
      FLD_ZONE: string;
      ZONE_SUBTY: string;
    };
  }[];
}

interface NrelResponse {
  outputs: {
    avg_dni: { annual: number };
    avg_ghi: { annual: number };
  };
}

async function geocodeAddress(address: string): Promise<{ lon: number; lat: number } | null> {
  const url = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(address)}&benchmark=Public_AR_Current&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Geocoder request failed.');
  const data: GeocoderResponse = await response.json();
  const coordinates = data.result?.addressMatches[0]?.coordinates;
  return coordinates ? { lon: coordinates.x, lat: coordinates.y } : null;
}

async function getFemaFloodZone(lon: number, lat: number): Promise<string | null> {
  const url = `https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28/query?geometry=${lon},${lat}&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&outFields=FLD_ZONE,ZONE_SUBTY&f=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('FEMA request failed.');
  const data: FemaResponse = await response.json();
  const zoneInfo = data.features?.[0]?.attributes;
  return zoneInfo ? `${zoneInfo.FLD_ZONE} (${zoneInfo.ZONE_SUBTY})` : 'Unknown';
}

async function getNrelEnergyData(lon: number, lat: number): Promise<object | null> {
    const apiKey = process.env.NREL_API_KEY;
    if (!apiKey) {
      logError(new Error('NREL_API_KEY is not set.'), { context: 'Enrichment' });
      return null;
    }
    const url = `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=${apiKey}&lat=${lat}&lon=${lon}&system_capacity=4&azimuth=180&tilt=40&array_type=1&module_type=0&losses=14`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('NREL request failed.');
    const data: NrelResponse = await response.json();
    return data.outputs ? {
        solar_irradiance_dni: data.outputs.avg_dni.annual,
        solar_irradiance_ghi: data.outputs.avg_ghi.annual,
    } : null;
}


/**
 * API Route: Lead Enrichment (Internal)
 * Takes a leadId, fetches data from federal APIs, and updates the property record.
 */
export async function POST(request: NextRequest) {
  // 1. Security Check
  const internalApiKey = process.env.INTERNAL_API_KEY;
  if (!internalApiKey) {
    logError(new Error('INTERNAL_API_KEY is not set.'), { context: 'Enrichment API' });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${internalApiKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { leadId } = await request.json();
    if (!leadId) {
      return NextResponse.json({ error: 'leadId is required.' }, { status: 400 });
    }

    // 2. Fetch Lead & Property
    const [lead] = await db.select().from(leads).where(eq(leads.id, leadId));
    if (!lead || !lead.propertyAddress) {
      return NextResponse.json({ error: 'Lead not found or has no address.' }, { status: 404 });
    }

    const [property] = await db.select().from(properties).where(eq(properties.leadId, leadId));
    if (!property) {
      return NextResponse.json({ error: 'Property record not found for this lead.' }, { status: 404 });
    }
    
    logInfo('Starting enrichment for lead:', { leadId });

    // 3. Geocode Address
    const coordinates = await geocodeAddress(lead.propertyAddress);
    if (!coordinates) {
      throw new Error(`Geocoding failed for address: ${lead.propertyAddress}`);
    }

    // 4. Enrich Data
    const [femaData, nrelData] = await Promise.all([
      getFemaFloodZone(coordinates.lon, coordinates.lat),
      getNrelEnergyData(coordinates.lon, coordinates.lat),
    ]);

    // 5. Update Database
    const currentMetadata = property.metadata && typeof property.metadata === 'object' ? property.metadata : {};
    
    const updatedMetadata = {
      ...currentMetadata,
      enrichment_complete: true,
      enrichment_date: new Date().toISOString(),
      coordinates: coordinates,
      fema_flood_zone: femaData,
      nrel_energy_data: nrelData,
    };

    await db.update(properties)
      .set({ metadata: updatedMetadata })
      .where(eq(properties.id, property.id));

    logInfo('Enrichment successful for lead:', { leadId });

    return NextResponse.json({ success: true, leadId: leadId, enrichedData: updatedMetadata });

  } catch (error) {
    logError(error as Error, { context: 'Lead Enrichment API' });
    return NextResponse.json(
      { error: 'An error occurred during lead enrichment.' },
      { status: 500 }
    );
  }
}

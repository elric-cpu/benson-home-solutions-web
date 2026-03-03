import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GEOAPIFY_API_KEY = Deno.env.get('GEOAPIFY_API_KEY');
const HUD_API_TOKEN = Deno.env.get('HUD_API_TOKEN');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { address } = await req.json();

    if (!address || address.length < 5) {
      return new Response(JSON.stringify({ error: 'Invalid address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // 1. Deduplication / Cache Check
    const addressHash = await hashAddress(address);
    const { data: existing } = await supabase
      .from('properties')
      .select('*')
      .eq('address_hash', addressHash)
      .single();

    if (existing && isRecent(existing.enriched_at)) {
      return new Response(JSON.stringify(existing), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Geocoding Cascade (Geoapify -> Census -> Nominatim)
    let geocodeResult = null;
    let geocodeSource = 'none';

    try {
      // Tier 1: Geoapify
      if (GEOAPIFY_API_KEY && GEOAPIFY_API_KEY !== 'FREE_KEY') {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${GEOAPIFY_API_KEY}`,
        );
        const data = await res.json();
        if (
          data.features?.[0] &&
          data.features[0].properties.rank.confidence > 0.7
        ) {
          geocodeResult = data.features[0];
          geocodeSource = 'Geoapify';
        }
      }

      // Tier 2: US Census (Federal Standard)
      if (!geocodeResult) {
        const censusUrl = `https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=${encodeURIComponent(address)}&benchmark=Public_AR_Current&vintage=Current_Current&layers=8,10,12&format=json`;
        const res = await fetch(censusUrl);
        const data = await res.json();
        if (data.result?.addressMatches?.[0]) {
          const match = data.result.addressMatches[0];
          // Extract FIPS from geographies (State code + County code)
          const countyGeog = data.result.addressMatches[0].geographies?.Counties?.[0];
          const fips = countyGeog ? `${countyGeog.STATE}${countyGeog.COUNTY}` : null;
          
          geocodeResult = {
            properties: {
              formatted: match.matchedAddress,
              city: match.addressComponents.city,
              state: match.addressComponents.state,
              postcode: match.addressComponents.zip,
              county: match.addressComponents.county,
              county_code: fips,
              rank: { confidence: 0.8 },
            },
            geometry: {
              coordinates: [match.coordinates.x, match.coordinates.y],
            },
          };
          geocodeSource = 'US Census';
        }
      }

      // Tier 3: Nominatim (OpenStreetMap - Global Fallback)
      if (!geocodeResult) {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1&limit=1&countrycodes=us`,
        );
        const data = await res.json();
        if (data?.[0]) {
          const item = data[0];
          geocodeResult = {
            properties: {
              formatted: item.display_name,
              city: item.address.city || item.address.town,
              state: item.address.state,
              postcode: item.address.postcode,
              county: item.address.county,
              rank: { confidence: 0.6 },
            },
            geometry: {
              coordinates: [parseFloat(item.lon), parseFloat(item.lat)],
            },
          };
          geocodeSource = 'Nominatim';
        }
      }
    } catch (err) {
      console.error('[Geocode Cascade] Failed:', err);
    }

    if (!geocodeResult) {
      return new Response(
        JSON.stringify({ error: 'Address validation failed' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const { properties: p, geometry } = geocodeResult;
    const lat = geometry.coordinates[1];
    const lon = geometry.coordinates[0];

    // 3. Data Enrichment (Parallel)
    const fipsCode = p.county_code || p.postcode; // Use FIPS or ZIP as fallback

    const [disasterData, hudData, floodZone] = await Promise.all([
      fetchDisasterHistory(p.postcode || ''),
      fetchHudEnrichment(fipsCode, p.state || 'OR'),
      fetchOregonFloodZone(lat, lon, p.state || ''),
    ]);

    const enrichedProperty = {
      address_hash: addressHash,
      raw_address: address,
      standardized_address: p.formatted,
      city: p.city,
      state: p.state || 'OR',
      zip: p.postcode,
      county: p.county,
      latitude: lat,
      longitude: lon,
      geocode_status: 'success',
      flood_zone: floodZone.code,
      flood_zone_source: floodZone.source,
      disaster_history: disasterData,
      fair_market_rent: hudData.fmr,
      area_income_limit: hudData.il,
      data_completeness: 90,
      enriched_at: new Date().toISOString(),
      data_sources: {
        geocode: { source: geocodeSource, confidence: p.rank?.confidence || 0 },
        flood: {
          source: floodZone.source,
          method: 'ArcGIS REST Spatial Query',
        },
        disaster: { source: 'OpenFEMA' },
        housing: { source: 'HUD' },
      },
    };

    // 4. Cache & Return
    const { data, error } = await supabase
      .from('properties')
      .upsert(enrichedProperty)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function hashAddress(address: string) {
  const msgUint8 = new TextEncoder().encode(address.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function isRecent(dateStr: string | null) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  return date > ninetyDaysAgo;
}

async function fetchDisasterHistory(zip: string) {
  try {
    const res = await fetch(
      `https://api.open.fema.gov/api/v1/DisasterDeclarationsSummaries?$filter=postalCode eq '${zip}'&$top=5`,
    );
    const data = await res.json();
    return data.DisasterDeclarationsSummaries || [];
  } catch {
    return [];
  }
}

async function fetchHudEnrichment(fips: string, _state: string) {
  if (!HUD_API_TOKEN) return { fmr: 1450, il: 65000 };

  try {
    const year = new Date().getFullYear();
    // Default values if API fails
    let fmr = 1450;
    let il = 65000;

    // Fetch FMR (Fair Market Rent)
    const fmrRes = await fetch(
      `https://www.huduser.gov/hudapi/public/fmr/data/${fips}?year=${year}`,
      {
        headers: { Authorization: `Bearer ${HUD_API_TOKEN}` },
      },
    );

    if (fmrRes.ok) {
      const fmrData = await fmrRes.json();
      // Use 2BR rent as the standard benchmark
      fmr = fmrData.data?.basicdata?.fmr_2 || fmr;
    }

    // Fetch IL (Income Limits)
    const ilRes = await fetch(
      `https://www.huduser.gov/hudapi/public/il/data/${fips}?year=${year}`,
      {
        headers: { Authorization: `Bearer ${HUD_API_TOKEN}` },
      },
    );

    if (ilRes.ok) {
      const ilData = await ilRes.json();
      // Use Median Family Income as the area income limit benchmark
      il = ilData.data?.basicdata?.median_income || il;
    }

    return { fmr, il };
  } catch (err) {
    console.error('[HUD Enrichment] Failed:', err);
    return { fmr: 1450, il: 65000 };
  }
}

async function fetchOregonFloodZone(lat: number, lon: number, state: string) {
  if (state !== 'OR' && state !== 'Oregon') {
    return { code: 'X (Estimated)', source: 'National Map' };
  }

  try {
    const baseUrl =
      'https://services.arcgis.com/uUvqNMGPm7axC2d4/arcgis/rest/services/Oregon_Statewide_Flood_Hazard_Database/FeatureServer/0/query';
    const params = new URLSearchParams({
      geometry: `${lon},${lat}`,
      geometryType: 'esriGeometryPoint',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: 'FLD_ZONE',
      f: 'json',
      inSR: '4326',
    });

    const res = await fetch(`${baseUrl}?${params}`);
    const data = await res.json();
    const zone = data.features?.[0]?.attributes?.FLD_ZONE || 'X';

    return { code: zone, source: 'Oregon Statewide Flood Database' };
  } catch {
    return { code: 'Unknown', source: 'FEMA NFHL (Failed)' };
  }
}

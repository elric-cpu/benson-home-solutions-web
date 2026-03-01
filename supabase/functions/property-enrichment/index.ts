import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GEOAPIFY_API_KEY = Deno.env.get('GEOAPIFY_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { address } = await req.json()

    if (!address || address.length < 5) {
      return new Response(JSON.stringify({ error: 'Invalid address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // 1. Deduplication / Cache Check
    const addressHash = await hashAddress(address)
    const { data: existing } = await supabase
      .from('properties')
      .select('*')
      .eq('address_hash', addressHash)
      .single()

    if (existing && isRecent(existing.enriched_at)) {
      return new Response(JSON.stringify(existing), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 2. Geocoding (Geoapify)
    const geoResponse = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${GEOAPIFY_API_KEY}`
    )
    const geoData = await geoResponse.json()
    const feature = geoData.features?.[0]

    if (!feature) {
      return new Response(JSON.stringify({ error: 'Address not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { properties: p, geometry } = feature
    const lat = geometry.coordinates[1]
    const lon = geometry.coordinates[0]

    // 3. Data Enrichment (Parallel)
    const [disasterData, hudData] = await Promise.all([
      fetchDisasterHistory(p.postcode),
      fetchHudData(p.postcode),
    ])

    const enrichedProperty = {
      address_hash: addressHash,
      raw_address: address,
      standardized_address: p.formatted,
      city: p.city,
      state: p.state_code,
      zip: p.postcode,
      county: p.county,
      latitude: lat,
      longitude: lon,
      geocode_status: 'success',
      disaster_history: disasterData,
      fair_market_rent: hudData.fmr,
      area_income_limit: hudData.il,
      data_completeness: 80, // PostGIS flood zone and CSVs next phase
      enriched_at: new Date().toISOString(),
      data_sources: {
        geocode: { source: 'Geoapify', confidence: p.rank?.confidence },
        disaster: { source: 'OpenFEMA' },
        housing: { source: 'HUD' },
      },
    }

    // 4. Cache & Return
    const { data, error } = await supabase
      .from('properties')
      .upsert(enrichedProperty)
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function hashAddress(address: string) {
  const msgUint8 = new TextEncoder().encode(address.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function isRecent(dateStr: string | null) {
  if (!dateStr) return false
  const date = new Date(dateStr)
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
  return date > ninetyDaysAgo
}

async function fetchDisasterHistory(zip: string) {
  try {
    const res = await fetch(`https://api.open.fema.gov/api/v1/DisasterDeclarationsSummaries?$filter=postalCode eq '${zip}'&$top=5`)
    const data = await res.json()
    return data.DisasterDeclarationsSummaries || []
  } catch {
    return []
  }
}

async function fetchHudData(zip: string) {
  // Placeholder for HUD API — would require bearer token
  return { fmr: 1450, il: 65000 }
}

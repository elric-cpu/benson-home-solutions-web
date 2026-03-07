interface GeocodeResult {
  lat: number;
  lng: number;
  standardizedAddress: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  source: 'geoapify' | 'census' | 'usps' | 'manual_required';
  confidence: number;
}

export async function geocodeAddress(
  rawAddress: string,
): Promise<GeocodeResult> {
  // Tier 1: Geoapify (Primary)
  try {
    const geoapifyKey = process.env.GEOAPIFY_API_KEY;
    if (geoapifyKey) {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(rawAddress)}&apiKey=${geoapifyKey}`,
      );

      if (res.ok) {
        const data = await res.json();
        if (data.features && data.features.length > 0) {
          const f = data.features[0].properties;
          return {
            lat: f.lat,
            lng: f.lon,
            standardizedAddress: f.formatted,
            city: f.city,
            state: f.state_code,
            zip: f.postcode,
            county: f.county,
            source: 'geoapify',
            confidence: f.rank?.confidence || 0.9,
          };
        }
      }
    }
  } catch (err) {
    console.error('[Geocode] Geoapify failed:', err);
  }

  // Tier 2: US Census Geocoder (Secondary - No Key Required)
  try {
    const res = await fetch(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(rawAddress)}&benchmark=Public_AR_Current&format=json`,
    );

    if (res.ok) {
      const data = await res.json();
      if (data.result.addressMatches && data.result.addressMatches.length > 0) {
        const m = data.result.addressMatches[0];
        return {
          lat: m.coordinates.y,
          lng: m.coordinates.x,
          standardizedAddress: m.matchedAddress,
          city: m.addressComponents.city,
          state: m.addressComponents.state,
          zip: m.addressComponents.zip,
          county: 'Unknown', // Census geocoder often requires a separate 'geographies' call for county
          source: 'census',
          confidence: 0.8,
        };
      }
    }
  } catch (err) {
    console.error('[Geocode] Census failed:', err);
  }

  // Tier 3: USPS Web Tools (Tertiary) - Omitted for now, requires specific XML setup.
  // Fallback if all fail
  return {
    lat: 0,
    lng: 0,
    standardizedAddress: rawAddress,
    city: 'Unknown',
    state: 'OR', // Default to OR for safety in this specific business context
    zip: '00000',
    county: 'Unknown',
    source: 'manual_required',
    confidence: 0,
  };
}

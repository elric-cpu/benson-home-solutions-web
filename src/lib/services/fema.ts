/**
 * FEMA Integration Service
 * Fetches flood zones from NFHL and disaster history from OpenFEMA.
 */

export interface FloodZoneResult {
  zone: string;
  source: string;
  fetchedAt: string;
}

export interface DisasterRecord {
  declarationDate: string;
  incidentType: string;
  title: string;
}

/**
 * Fetches the FEMA Flood Zone for a given coordinate.
 * Uses the NFHL (National Flood Hazard Layer) REST API.
 */
export async function fetchFloodZone(
  lat: number,
  lng: number,
): Promise<FloodZoneResult> {
  try {
    // FEMA NFHL REST API - Query Layer 28 (Flood Hazard Zones)
    // We use a small buffer around the point to find the intersecting zone
    const url = `https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/28/query?geometry=${lng},${lat}&geometryType=esriGeometryPoint&spatialRel=esriGeometrySpatialRelIntersects&outFields=FLD_ZONE&returnGeometry=false&f=json`;

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const zone = data.features[0].attributes.FLD_ZONE;
        return {
          zone,
          source: 'FEMA NFHL',
          fetchedAt: new Date().toISOString(),
        };
      }
    }
  } catch (err) {
    console.error('[FEMA] Flood zone lookup failed:', err);
  }

  return {
    zone: 'Unknown',
    source: 'FEMA NFHL (Fallback)',
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Fetches disaster history for a given ZIP code or county.
 * Uses OpenFEMA API.
 */
interface OpenFemaDisaster {
  declarationDate: string;
  incidentType: string;
  declarationTitle: string;
}

export async function fetchDisasterHistory(
  zip: string,
): Promise<DisasterRecord[]> {
  try {
    // OpenFEMA Disaster Declarations Summaries
    // Filter by zip code and limit to recent or major events
    const url = `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=designatedZipCode eq '${zip}'&$select=declarationDate,incidentType,declarationTitle&$orderby=declarationDate desc&$top=5`;

    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.DisasterDeclarationsSummaries.map((d: OpenFemaDisaster) => ({
        declarationDate: d.declarationDate,
        incidentType: d.incidentType,
        title: d.declarationTitle,
      }));
    }
  } catch (err) {
    console.error('[FEMA] Disaster history lookup failed:', err);
  }

  return [];
}

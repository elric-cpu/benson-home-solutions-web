/**
 * HUD Integration Service
 * Fetches Fair Market Rents (FMR) and Area Income Limits.
 */

export interface HudData {
  fairMarketRent: number;
  areaIncomeLimit: number;
  source: string;
  fetchedAt: string;
}

/**
 * Fetches HUD FMR data for a given ZIP code.
 */
export async function fetchHudData(zip: string): Promise<HudData | null> {
  const token = process.env.HUD_API_TOKEN;
  if (!token) {
    console.warn('[HUD] Missing HUD_API_TOKEN. Skipping.');
    return null;
  }

  try {
    const url = `https://www.huduser.gov/portal/datasets/fmr/api/fmr/zippedCode/${zip}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      // HUD API response structure varies by endpoint
      return {
        fairMarketRent: data.data?.fmr_summary?.efficiency || 0, // Simplified for MVP
        areaIncomeLimit: data.data?.il_summary?.median_income || 0,
        source: 'HUD HUDUser API',
        fetchedAt: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('[HUD] Lookup failed:', err);
  }

  return null;
}

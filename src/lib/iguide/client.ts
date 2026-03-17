/**
 * iGUIDE Portal API Client (Phase 2)
 *
 * Programmatic ingestion of RESO-compliant spatial data for forensic maintenance.
 * Reference: iGUIDE Portal REST API v2
 */

// Conversion constants
const MM2_TO_SQFT = 1.07639e-5;
const DEFAULT_CONSTRUCTION_MULTIPLIER = 0.92; // Net-to-Gross buffer (removes wall footprints)

export interface IGuideRoom {
  name: string;
  type: string;
  width: number; // mm
  length: number; // mm
  area: number; // mm2
  pano_id?: string;
}

export interface IGuideFloor {
  name: string;
  level: number;
  is_below_grade: boolean;
  area: number; // mm2
  rooms: IGuideRoom[];
}

export interface IGuideViewSummary {
  view_id: string;
  external_url: string;
  total_interior_area: number; // mm2
  measurement_standard: string;
  floors: IGuideFloor[];
}

interface PublicIGuideSummary {
  measurementStandard?: string;
  buildings?: Array<{
    floors?: Array<{
      name?: string;
      area?: {
        total?: number;
        unit?: 'sqft' | 'sqm';
      };
      rooms?: Array<{
        name?: string;
        dimensions?: {
          length?: number;
          width?: number;
          unit?: 'ft' | 'm';
        };
      }>;
    }>;
  }>;
}

/**
 * Normalizes iGUIDE mm2 to human-readable SQFT.
 */
export function mm2ToSqft(mm2: number | string | null): number {
  if (!mm2) return 0;
  const val = typeof mm2 === 'string' ? parseFloat(mm2) : mm2;
  return Math.round(val * MM2_TO_SQFT * 100) / 100;
}

/**
 * Calculates net paintable/floorable area using the Construction Multiplier.
 */
export function calculateNetArea(
  mm2: number,
  multiplier: number = DEFAULT_CONSTRUCTION_MULTIPLIER,
): number {
  return mm2 * multiplier;
}

/**
 * Fetches property spatial data from iGUIDE Portal.
 * Note: Authentication requires IGUIDE_API_KEY in .env.local
 */
export async function fetchIGuideView(
  viewId: string,
): Promise<IGuideViewSummary> {
  const baseUrl =
    process.env.IGUIDE_API_BASE_URL || 'https://manage.youriguide.com/api/v2';
  const apiKey = process.env.IGUIDE_API_KEY;

  if (!apiKey) {
    return fetchPublicIGuideView(viewId);
  }

  const response = await fetch(`${baseUrl}/views/${viewId}/summary`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`iGUIDE API Error: ${response.statusText}`);
  }

  return response.json();
}

function feetToMillimeters(feet: number): number {
  return Math.round(feet * 304.8);
}

function squareFeetToSquareMillimeters(squareFeet: number): number {
  return Math.round(squareFeet / MM2_TO_SQFT);
}

async function fetchPublicIGuideView(
  viewId: string,
): Promise<IGuideViewSummary> {
  const publicBaseUrl =
    process.env.IGUIDE_PUBLIC_BASE_URL || 'https://youriguide.com';
  const response = await fetch(`${publicBaseUrl}/${viewId}/data/summary`, {
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(
      `iGUIDE public summary unavailable for ${viewId}: ${response.statusText}`,
    );
  }

  const data = (await response.json()) as PublicIGuideSummary;
  const floors =
    data.buildings?.flatMap((building) =>
      (building.floors || []).map((floor, floorIndex) => {
        const rooms = (floor.rooms || []).map((room) => {
          const length = room.dimensions?.length || 0;
          const width = room.dimensions?.width || 0;
          const unit = room.dimensions?.unit || 'ft';

          return {
            name: room.name || 'Unnamed Room',
            type: room.name || 'Unknown',
            width:
              unit === 'm'
                ? Math.round(width * 1000)
                : feetToMillimeters(width),
            length:
              unit === 'm'
                ? Math.round(length * 1000)
                : feetToMillimeters(length),
            area:
              unit === 'm'
                ? Math.round(length * width * 1_000_000)
                : squareFeetToSquareMillimeters(length * width),
          };
        });

        const totalArea = floor.area?.total || 0;
        const totalUnit = floor.area?.unit || 'sqft';

        return {
          name: floor.name || `Floor ${floorIndex + 1}`,
          level: floorIndex + 1,
          is_below_grade: false,
          area:
            totalUnit === 'sqm'
              ? Math.round(totalArea * 1_000_000)
              : squareFeetToSquareMillimeters(totalArea),
          rooms,
        };
      }),
    ) || [];

  if (floors.length === 0) {
    throw new Error(`No public iGUIDE floor data available for ${viewId}.`);
  }

  return {
    view_id: viewId,
    external_url: `https://youriguide.com/${viewId}`,
    total_interior_area: floors.reduce((sum, floor) => sum + floor.area, 0),
    measurement_standard: data.measurementStandard || 'Unknown',
    floors,
  };
}

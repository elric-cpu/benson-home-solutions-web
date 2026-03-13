/**
 * iGUIDE API Service (2026 Senior Principal Standard)
 * Handles integration with iGUIDE LiDAR spatial data.
 */

export interface IGuideMetadata {
  viewId: string;
  propertyAddress: string;
  status: 'ready' | 'not-ready' | 'locked';
}

export interface IGuideSummary {
  measurementStandard: string;
  buildings: IGuideBuilding[];
}

export interface IGuideBuilding {
  name: string;
  floors: IGuideFloor[];
}

export interface IGuideFloor {
  name: string;
  rooms: IGuideRoom[];
  area: {
    total: number;
    unit: 'sqft' | 'sqm';
  };
}

export interface IGuideRoom {
  name: string;
  dimensions: {
    length: number;
    width: number;
    unit: 'ft' | 'm';
  };
}

/**
 * Fetches the summary data for a specific iGUIDE view.
 * @param viewId The unique identifier for the iGUIDE tour.
 */
export async function getIGuideSummary(viewId: string): Promise<IGuideSummary> {
  const baseUrl = process.env.IGUIDE_API_BASE_URL || 'https://youriguide.com';
  const response = await fetch(`${baseUrl}/${viewId}/data/summary`, {
    headers: {
      'Accept': 'application/json',
      // Auth headers would go here if required by the specific iGUIDE implementation
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch iGUIDE summary for ${viewId}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Checks the processing status of an iGUIDE scan.
 */
export async function getIGuideStatus(viewId: string): Promise<IGuideMetadata['status']> {
  const baseUrl = process.env.IGUIDE_API_BASE_URL || 'https://youriguide.com';
  const response = await fetch(`${baseUrl}/${viewId}/data/status`);

  if (!response.ok) {
    throw new Error(`Failed to fetch iGUIDE status for ${viewId}`);
  }

  const data = await response.json();
  return data.status;
}

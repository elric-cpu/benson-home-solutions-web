/**
 * Forensic Documentation Service (2026 Senior Principal Standard)
 * Handles integration with CompanyCam for immutable job site audit trails.
 */

export interface ForensicPhoto {
  id: string;
  url: string;
  capturedAt: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  tags: string[];
}

export interface ForensicAuditLog {
  projectId: string;
  photos: ForensicPhoto[];
  verifiedAt: string;
}

/**
 * Validates the forensic integrity of a synced photo.
 * Ensures GPS and Timestamp metadata are present.
 */
export function validateForensicPhoto(photo: any): ForensicPhoto {
  if (!photo.coordinates?.lat || !photo.coordinates?.lon) {
    throw new Error(`Forensic failure: Photo ${photo.id} missing GPS metadata.`);
  }

  if (!photo.captured_at) {
    throw new Error(`Forensic failure: Photo ${photo.id} missing capture timestamp.`);
  }

  return {
    id: photo.id,
    url: photo.uri,
    capturedAt: photo.captured_at,
    coordinates: {
      lat: photo.coordinates.lat,
      lon: photo.coordinates.lon,
    },
    tags: photo.tags || [],
  };
}

/**
 * Syncs a forensic photo to the internal property record.
 */
export async function syncForensicPhoto(projectId: string, photo: ForensicPhoto): Promise<void> {
  // Logic to update Supabase or Sanity with the verified forensic record
  console.log(`[Forensic Sync] Project: ${projectId}, Photo: ${photo.id} Verified at ${photo.capturedAt}`);
}

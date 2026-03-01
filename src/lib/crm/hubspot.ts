/**
 * HubSpot CRM Integration Utility
 * Uses HubSpot Contacts API v3 with Private App Access Token.
 */

export interface HubSpotLeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  message?: string;
  source?: 'web' | 'sms' | 'qr' | 'tablet' | 'cost-calculator';
  propertyAddress?: string;
  serviceInterest?: string;
  isServiceArea?: boolean;
}

/**
 * Syncs a lead to HubSpot CRM.
 * Implementation uses the Contacts API (Create/Update by email).
 */
export async function syncLeadToHubSpot(data: HubSpotLeadData) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn('[HubSpot] Missing HUBSPOT_ACCESS_TOKEN. Skipping sync.');
    return null;
  }

  // Map internal fields to HubSpot property names
  const properties: Record<string, string | boolean | undefined> = {
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
    phone: data.phone,
    message: data.message,
    capture_source: data.source || 'web',
    property_address: data.propertyAddress,
    interest_level: data.serviceInterest,
    service_area_match: data.isServiceArea,
  };

  // Clean undefined values
  const cleanProperties = Object.fromEntries(
    Object.entries(properties).filter(([_, v]) => v !== undefined)
  );

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/upsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        idProperty: 'email',
        objectWriteTraceId: `bhs-${Date.now()}`,
        inputs: [
          {
            id: data.email,
            properties: cleanProperties,
          },
        ],
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[HubSpot] Sync failed:', result);
      return null;
    }

    return result;
  } catch (error) {
    console.error('[HubSpot] Unexpected sync error:', error);
    return null;
  }
}

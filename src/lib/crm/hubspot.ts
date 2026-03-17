/* eslint-disable no-console */
/**
 * HubSpot CRM Integration Utility
 * Uses HubSpot Contacts API v3 with Private App Access Token.
 * @see https://developers.hubspot.com/docs/api/crm/contacts
 */

import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export interface HubSpotLeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  message?: string;
  source?: 'web' | 'sms' | 'qr' | 'tablet' | 'cost-calculator';
  propertyAddress?: string;
  propertyType?: 'residential' | 'commercial' | 'church_community';
  serviceInterest?: string;
  isServiceArea?: boolean;
}

function getHubSpotTokenFromCliConfig(): string | null {
  try {
    const configPath = join(homedir(), '.hscli', 'config.yml');
    const config = readFileSync(configPath, 'utf8');
    const match = config.match(/accessToken:\s*>-\s*\n\s*([A-Za-z0-9._-]+)/m);
    return match?.[1] || null;
  } catch {
    return null;
  }
}

/**
 * Syncs a lead to HubSpot CRM.
 * Implementation uses the Contacts API (Create/Update by email).
 *
 * @param data - The lead data to sync
 * @returns The HubSpot API response or null on failure
 */
export async function syncLeadToHubSpot(data: HubSpotLeadData) {
  const accessToken =
    process.env.HUBSPOT_ACCESS_TOKEN || getHubSpotTokenFromCliConfig();

  if (!accessToken) {
    console.warn(
      '[CRM:HubSpot] Missing HUBSPOT_ACCESS_TOKEN and no authenticated hs CLI token was found. Sync skipped.',
    );
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
    property_type: data.propertyType,
    interest_level: data.serviceInterest,
    service_area_match: data.isServiceArea,
  };

  // Clean undefined values
  const cleanProperties = Object.fromEntries(
    Object.entries(properties).filter(([_, v]) => v !== undefined),
  );

  try {
    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts/upsert',
      {
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
      },
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('[CRM:HubSpot] Sync failed:', {
        status: response.status,
        result,
        email: data.email,
      });
      return null;
    }

    console.info(`[CRM:HubSpot] Successfully synced lead: ${data.email}`);
    return result;
  } catch (error) {
    console.error('[CRM:HubSpot] Unexpected sync error:', error);
    return null;
  }
}

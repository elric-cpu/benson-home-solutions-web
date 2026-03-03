import { getNotion, NOTION_DBS } from './client';
import { db } from '../db';
import { clients, properties, agreements, serviceLog } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Define minimal Notion property types to satisfy ESLint and provide safety.
 * These align with the structure required by the Notion API for page creation/updates.
 */
type NotionUpdateProperties = Record<
  string,
  | { title: { text: { content: string } }[] }
  | { email: string | null }
  | { phone_number: string }
  | { select: { name: string } }
  | { status: { name: string } }
  | { rich_text: { text: { content: string } }[] }
  | { number: number }
  | { date: { start: string } }
  | { checkbox: boolean }
  | { relation: { id: string }[] }
>;

/**
 * Syncs a Service Log entry to the Notion Service Log database.
 */
export async function syncServiceLogToNotion(logId: string) {
  const notion = getNotion();
  if (!notion || !NOTION_DBS.serviceLog) return;

  const [log] = await db
    .select()
    .from(serviceLog)
    .where(eq(serviceLog.id, logId))
    .limit(1);
  if (!log) return;

  const propertiesPayload: NotionUpdateProperties = {
    'Service Record': {
      title: [
        {
          text: {
            content: `${log.completedAt.toISOString().split('T')[0]} - ${log.serviceId}`,
          },
        },
      ],
    },
    'Service Performed': { select: { name: log.serviceId } },
    'Date Completed': { date: { start: log.completedAt.toISOString() } },
    'Crew/Subcontractor': {
      rich_text: [{ text: { content: log.crew || '' } }],
    },
    Hours: { number: Number(log.hours) || 0 },
    'Materials Cost': { number: Number(log.materialsCost) || 0 },
    Notes: { rich_text: [{ text: { content: log.notes || '' } }] },
    'Client Signed Off': { checkbox: log.clientSignedOff || false },
    'Supabase ID': { rich_text: [{ text: { content: log.id } }] },
  };

  // Relations
  const [prop] = await db
    .select({ notionPageId: properties.notionPageId })
    .from(properties)
    .where(eq(properties.id, log.propertyId))
    .limit(1);
  if (prop?.notionPageId) {
    propertiesPayload['Property'] = { relation: [{ id: prop.notionPageId }] };
  }

  if (log.agreementId) {
    const [agreement] = await db
      .select({ notionPageId: agreements.notionPageId })
      .from(agreements)
      .where(eq(agreements.id, log.agreementId))
      .limit(1);
    if (agreement?.notionPageId) {
      propertiesPayload['Agreement'] = {
        relation: [{ id: agreement.notionPageId }],
      };
    }
  }

  if (log.notionPageId) {
    await notion.pages.update({
      page_id: log.notionPageId,
      properties: propertiesPayload as any,
    });
  } else {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DBS.serviceLog },
      properties: propertiesPayload as any,
    });
    await db
      .update(serviceLog)
      .set({ notionPageId: response.id })
      .where(eq(serviceLog.id, log.id));
  }
}

/**
 * Syncs a Client row to the Notion Clients database.
 */
export async function syncClientToNotion(clientId: string) {
  const notion = getNotion();
  if (!notion || !NOTION_DBS.clients) return;

  const [client] = await db
    .select()
    .from(clients)
    .where(eq(clients.id, clientId))
    .limit(1);
  if (!client) return;

  const propertiesPayload: NotionUpdateProperties = {
    'Client Name': { title: [{ text: { content: client.name } }] },
    Email: { email: client.email },
    Phone: { phone_number: client.phone || '' },
    'Source Channel': { select: { name: client.sourceChannel || 'web' } },
    'Supabase ID': { rich_text: [{ text: { content: client.id } }] },
  };

  if (client.notionPageId) {
    await notion.pages.update({
      page_id: client.notionPageId,
      properties: propertiesPayload as any,
    });
  } else {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DBS.clients },
      properties: propertiesPayload as any,
    });
    await db
      .update(clients)
      .set({ notionPageId: response.id })
      .where(eq(clients.id, client.id));
  }
}

/**
 * Syncs a Property row to the Notion Properties database.
 */
export async function syncPropertyToNotion(propertyId: string) {
  const notion = getNotion();
  if (!notion || !NOTION_DBS.properties) return;

  const [prop] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, propertyId))
    .limit(1);
  if (!prop) return;

  const propertiesPayload: NotionUpdateProperties = {
    'Property Address': {
      title: [
        { text: { content: prop.standardizedAddress || prop.rawAddress } },
      ],
    },
    City: { rich_text: [{ text: { content: prop.city || '' } }] },
    Zip: { rich_text: [{ text: { content: prop.zip || '' } }] },
    'Flood Zone': { select: { name: prop.floodZone || 'X' } },
    'Agreement Status': { status: { name: prop.agreementStatus || 'none' } },
    'Supabase ID': { rich_text: [{ text: { content: prop.id } }] },
  };

  // Add relation if client exists
  if (prop.clientId) {
    const [client] = await db
      .select({ notionPageId: clients.notionPageId })
      .from(clients)
      .where(eq(clients.id, prop.clientId))
      .limit(1);
    if (client?.notionPageId) {
      propertiesPayload['Client'] = { relation: [{ id: client.notionPageId }] };
    }
  }

  if (prop.notionPageId) {
    await notion.pages.update({
      page_id: prop.notionPageId,
      properties: propertiesPayload as any,
    });
  } else {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DBS.properties },
      properties: propertiesPayload as any,
    });
    await db
      .update(properties)
      .set({ notionPageId: response.id })
      .where(eq(properties.id, prop.id));
  }
}

/**
 * Syncs an Agreement row to the Notion Agreements database.
 */
export async function syncAgreementToNotion(agreementId: string) {
  const notion = getNotion();
  if (!notion || !NOTION_DBS.agreements) return;

  const [agreement] = await db
    .select()
    .from(agreements)
    .where(eq(agreements.id, agreementId))
    .limit(1);
  if (!agreement) return;

  const propertiesPayload: NotionUpdateProperties = {
    'Agreement ID': {
      title: [{ text: { content: agreement.agreementNumber } }],
    },
    'Agreement Type': { select: { name: agreement.agreementType } },
    Status: { status: { name: agreement.status || 'draft' } },
    'Monthly Price': { number: Number(agreement.monthlyPrice) || 0 },
    'Annual Price': { number: Number(agreement.annualPrice) || 0 },
    'Supabase ID': { rich_text: [{ text: { content: agreement.id } }] },
  };

  // Relations
  const [client] = await db
    .select({ notionPageId: clients.notionPageId })
    .from(clients)
    .where(eq(clients.id, agreement.clientId))
    .limit(1);
  if (client?.notionPageId) {
    propertiesPayload['Client'] = { relation: [{ id: client.notionPageId }] };
  }

  const [prop] = await db
    .select({ notionPageId: properties.notionPageId })
    .from(properties)
    .where(eq(properties.id, agreement.propertyId))
    .limit(1);
  if (prop?.notionPageId) {
    propertiesPayload['Property'] = { relation: [{ id: prop.notionPageId }] };
  }

  if (agreement.notionPageId) {
    await notion.pages.update({
      page_id: agreement.notionPageId,
      properties: propertiesPayload as any,
    });
  } else {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DBS.agreements },
      properties: propertiesPayload as any,
    });
    await db
      .update(agreements)
      .set({ notionPageId: response.id })
      .where(eq(agreements.id, agreement.id));
  }
}

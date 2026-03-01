import { getNotion, NOTION_DBS } from './client';
import { db } from '../db';
import { clients, properties, agreements } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Syncs a Client row to the Notion Clients database.
 */
export async function syncClientToNotion(clientId: string) {
  const notion = getNotion();
  if (!notion || !NOTION_DBS.clients) return;

  const [client] = await db.select().from(clients).where(eq(clients.id, clientId)).limit(1);
  if (!client) return;

  const properties: any = {
    'Client Name': { title: [{ text: { content: client.name } }] },
    'Email': { email: client.email },
    'Phone': { phone_number: client.phone || '' },
    'Source Channel': { select: { name: client.sourceChannel || 'web' } },
    'Supabase ID': { rich_text: [{ text: { content: client.id } }] },
  };

  if (client.notionPageId) {
    await notion.pages.update({ page_id: client.notionPageId, properties });
  } else {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DBS.clients },
      properties,
    });
    await db.update(clients).set({ notionPageId: response.id }).where(eq(clients.id, client.id));
  }
}

/**
 * Syncs a Property row to the Notion Properties database.
 */
export async function syncPropertyToNotion(propertyId: string) {
  const notion = getNotion();
  if (!notion || !NOTION_DBS.properties) return;

  const [prop] = await db.select().from(properties).where(eq(properties.id, propertyId)).limit(1);
  if (!prop) return;

  const propertiesPayload: any = {
    'Property Address': { title: [{ text: { content: prop.standardizedAddress || prop.rawAddress } }] },
    'City': { rich_text: [{ text: { content: prop.city || '' } }] },
    'Zip': { rich_text: [{ text: { content: prop.zip || '' } }] },
    'Flood Zone': { select: { name: prop.floodZone || 'X' } },
    'Agreement Status': { status: { name: prop.agreementStatus || 'none' } },
    'Supabase ID': { rich_text: [{ text: { content: prop.id } }] },
  };

  // Add relation if client exists
  if (prop.clientId) {
    const [client] = await db.select({ notionPageId: clients.notionPageId }).from(clients).where(eq(clients.id, prop.clientId)).limit(1);
    if (client?.notionPageId) {
      propertiesPayload['Client'] = { relation: [{ id: client.notionPageId }] };
    }
  }

  if (prop.notionPageId) {
    await notion.pages.update({ page_id: prop.notionPageId, properties: propertiesPayload });
  } else {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DBS.properties },
      properties: propertiesPayload,
    });
    await db.update(properties).set({ notionPageId: response.id }).where(eq(properties.id, prop.id));
  }
}

/**
 * Syncs an Agreement row to the Notion Agreements database.
 */
export async function syncAgreementToNotion(agreementId: string) {
  const notion = getNotion();
  if (!notion || !NOTION_DBS.agreements) return;

  const [agreement] = await db.select().from(agreements).where(eq(agreements.id, agreementId)).limit(1);
  if (!agreement) return;

  const propertiesPayload: any = {
    'Agreement ID': { title: [{ text: { content: agreement.agreementNumber } }] },
    'Agreement Type': { select: { name: agreement.agreementType } },
    'Status': { status: { name: agreement.status || 'draft' } },
    'Monthly Price': { number: Number(agreement.monthlyPrice) || 0 },
    'Annual Price': { number: Number(agreement.annualPrice) || 0 },
    'Supabase ID': { rich_text: [{ text: { content: agreement.id } }] },
  };

  // Relations
  const [client] = await db.select({ notionPageId: clients.notionPageId }).from(clients).where(eq(clients.id, agreement.clientId)).limit(1);
  if (client?.notionPageId) {
    propertiesPayload['Client'] = { relation: [{ id: client.notionPageId }] };
  }

  const [prop] = await db.select({ notionPageId: properties.notionPageId }).from(properties).where(eq(properties.id, agreement.propertyId)).limit(1);
  if (prop?.notionPageId) {
    propertiesPayload['Property'] = { relation: [{ id: prop.notionPageId }] };
  }

  if (agreement.notionPageId) {
    await notion.pages.update({ page_id: agreement.notionPageId, properties: propertiesPayload });
  } else {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DBS.agreements },
      properties: propertiesPayload,
    });
    await db.update(agreements).set({ notionPageId: response.id }).where(eq(agreements.id, agreement.id));
  }
}

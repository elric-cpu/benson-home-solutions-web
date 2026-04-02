import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  numeric,
  jsonb,
  integer,
  boolean,
  doublePrecision,
  bigserial,
} from 'drizzle-orm/pg-core';

/**
 * Benson Home Solutions Core Schema - Rebuild V1 (2026)
 * Strict maintainability: Keep under 450 lines.
 * NO LEGACY ALIASES. NO SLOP.
 */

// 1. Clients & Leads
export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 30 }),
  sourceChannel: varchar('source_channel', { length: 100 }),
  hubspotContactId: varchar('hubspot_contact_id', { length: 255 }),
  notionPageId: varchar('notion_page_id', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  service: varchar('service', { length: 255 }),
  message: text('message').notNull(),
  source: varchar('source', { length: 100 }).default('website-contact-form'),
  emailSent: boolean('email_sent').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const subscriptionLeads = pgTable('subscription_leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  plan: varchar('plan', { length: 100 }),
  propertyType: varchar('property_type', { length: 50 }),
  source: varchar('source', { length: 100 }).default('website-subscription'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 2. Properties & Assets
export const properties = pgTable('properties', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id').references(() => clients.id),
  addressHash: text('address_hash').unique().notNull(),
  rawAddress: text('raw_address').notNull(),
  standardizedAddress: text('standardized_address'),
  city: text('city'),
  state: text('state'),
  zip: text('zip'),
  county: text('county'),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
  geocodeStatus: text('geocode_status').default('pending'),
  floodZone: text('flood_zone'),
  floodZoneSource: text('flood_zone_source'),
  disasterHistory: jsonb('disaster_history'),
  fairMarketRent: numeric('fair_market_rent'),
  areaIncomeLimit: numeric('area_income_limit'),
  housingData: jsonb('housing_data'),
  energyBenchmarks: jsonb('energy_benchmarks'),
  dataSources: jsonb('data_sources'),
  dataCompleteness: integer('data_completeness').default(0),
  agreementStatus: text('agreement_status').default('none'),
  notionPageId: varchar('notion_page_id', { length: 255 }),
  yearBuilt: integer('year_built'),
  sqft: integer('sqft'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  enrichedAt: timestamp('enriched_at', { withTimezone: true }),
  serviceAreaMatch: boolean('service_area_match').default(false),
});

export const iguideProjects = pgTable('iguide_projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id').references(() => properties.id).notNull(),
  viewId: varchar('view_id', { length: 255 }).unique().notNull(),
  externalUrl: text('external_url'),
  totalInteriorAreaMm2: numeric('total_interior_area_mm2'),
  measurementStandard: varchar('measurement_standard', { length: 100 }),
  constructionMultiplier: numeric('construction_multiplier').default('0.92'),
  lastSyncedAt: timestamp('last_synced_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const propertyFloors = pgTable('property_floors', {
  id: uuid('id').defaultRandom().primaryKey(),
  iguideProjectId: uuid('iguide_project_id').references(() => iguideProjects.id).notNull(),
  floorName: varchar('floor_name', { length: 255 }).notNull(),
  level: integer('level').default(0),
  isBelowGrade: boolean('is_below_grade').default(false),
  areaMm2: numeric('area_mm2'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const propertyRooms = pgTable('property_rooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  floorId: uuid('floor_id').references(() => propertyFloors.id).notNull(),
  roomName: varchar('room_name', { length: 255 }).notNull(),
  roomType: varchar('room_type', { length: 100 }),
  widthMm: numeric('width_mm'),
  lengthMm: numeric('length_mm'),
  areaMm2: numeric('area_mm2'),
  panoId: varchar('pano_id', { length: 255 }),
  isP0Room: boolean('is_p0_room').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 3. Agreements & Service Logs
export const agreements = pgTable('agreements', {
  id: uuid('id').defaultRandom().primaryKey(),
  agreementNumber: varchar('agreement_number', { length: 100 }).unique().notNull(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  propertyId: uuid('property_id').references(() => properties.id).notNull(),
  agreementType: varchar('agreement_type', { length: 100 }).notNull(),
  monthlyPrice: numeric('monthly_price'),
  annualPrice: numeric('annual_price'),
  status: varchar('status', { length: 50 }).default('draft'),
  startDate: timestamp('start_date', { withTimezone: true }),
  endDate: timestamp('end_date', { withTimezone: true }),
  services: jsonb('services'),
  documentUrl: text('document_url'),
  notionPageId: varchar('notion_page_id', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const agreementVersions = pgTable('agreement_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  agreementId: uuid('agreement_id').references(() => agreements.id).notNull(),
  versionNumber: integer('version_number').notNull(),
  documentProvider: varchar('document_provider', { length: 50 }).notNull(),
  documentProviderId: varchar('document_provider_id', { length: 255 }).notNull(),
  documentUrl: text('document_url'),
  status: varchar('status', { length: 50 }).default('draft'),
  changesSummary: text('changes_summary'),
  signedAt: timestamp('signed_at', { withTimezone: true }),
  signedByClient: text('signed_by_client'),
  signedByBenson: text('signed_by_benson'),
  versionHash: text('version_hash'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const serviceLogs = pgTable('service_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id').references(() => properties.id).notNull(),
  agreementId: uuid('agreement_id').references(() => agreements.id),
  serviceId: varchar('service_id', { length: 100 }).notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }).notNull().defaultNow(),
  crew: text('crew'),
  hours: numeric('hours'),
  materialsCost: numeric('materials_cost'),
  notes: text('notes'),
  clientSignedOff: boolean('client_signed_off').default(false),
  notionPageId: varchar('notion_page_id', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 4. Infrastructure & Marketing
export const auditLogs = pgTable('audit_log', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  tableName: text('table_name').notNull(),
  recordId: uuid('record_id').notNull(),
  action: text('action').notNull(),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  changedFields: text('changed_fields').array(),
  changedBy: text('changed_by'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const marketingAssets = pgTable('marketing_assets', {
  id: uuid('id').defaultRandom().primaryKey(),
  topic: varchar('topic', { length: 255 }).notNull(),
  assetType: varchar('asset_type', { length: 50 }).notNull(),
  contentDraft: text('content_draft'),
  seoStrategy: jsonb('seo_strategy'),
  multimediaAssets: jsonb('multimedia_assets'),
  outreachCampaign: jsonb('outreach_campaign'),
  developerCode: text('developer_code'),
  status: varchar('status', { length: 50 }).default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// Types
export type Client = typeof clients.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type SubscriptionLead = typeof subscriptionLeads.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type IGuideProject = typeof iguideProjects.$inferSelect;
export type PropertyFloor = typeof propertyFloors.$inferSelect;
export type PropertyRoom = typeof propertyRooms.$inferSelect;
export type Agreement = typeof agreements.$inferSelect;
export type AgreementVersion = typeof agreementVersions.$inferSelect;
export type ServiceLog = typeof serviceLogs.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
export type MarketingAsset = typeof marketingAssets.$inferSelect;

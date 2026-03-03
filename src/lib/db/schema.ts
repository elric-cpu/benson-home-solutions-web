import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  doublePrecision,
  jsonb,
  numeric,
  integer,
  pgView,
  bigserial,
} from 'drizzle-orm/pg-core';

/**
 * Clients — the single point of truth for customer identity.
 */
export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 30 }),
  sourceChannel: varchar('source_channel', { length: 100 }),
  hubspotContactId: varchar('hubspot_contact_id', { length: 255 }),
  notionPageId: varchar('notion_page_id', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Enriched property data pipeline results.
 */
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
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  enrichedAt: timestamp('enriched_at', { withTimezone: true }),
});

/**
 * Agreements — maintenance plan contracts.
 */
export const agreements = pgTable('agreements', {
  id: uuid('id').defaultRandom().primaryKey(),
  agreementNumber: varchar('agreement_number', { length: 100 })
    .unique()
    .notNull(),
  clientId: uuid('client_id')
    .references(() => clients.id)
    .notNull(),
  propertyId: uuid('property_id')
    .references(() => properties.id)
    .notNull(),
  agreementType: varchar('agreement_type', { length: 100 }).notNull(),
  monthlyPrice: numeric('monthly_price'),
  annualPrice: numeric('annual_price'),
  status: varchar('status', { length: 50 }).default('draft'),
  startDate: timestamp('start_date', { withTimezone: true }),
  endDate: timestamp('end_date', { withTimezone: true }),
  services: jsonb('services'), // Array of service IDs + frequencies
  documentUrl: text('document_url'),
  notionPageId: varchar('notion_page_id', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Agreement Versions — tracking modifications and digital signatures.
 */
export const agreementVersions = pgTable('agreement_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  agreementId: uuid('agreement_id')
    .references(() => agreements.id)
    .notNull(),
  versionNumber: integer('version_number').notNull(),
  documentProvider: varchar('document_provider', { length: 50 }).notNull(), // 'pandadoc', 'docusign'
  documentProviderId: varchar('document_provider_id', {
    length: 255,
  }).notNull(),
  documentUrl: text('document_url'),
  status: varchar('status', { length: 50 }).default('draft'),
  changesSummary: text('changes_summary'),
  signedAt: timestamp('signed_at', { withTimezone: true }),
  signedByClient: text('signed_by_client'),
  signedByBenson: text('signed_by_benson'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Service Log — record of every individual service delivered.
 */
export const serviceLog = pgTable('service_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id')
    .references(() => properties.id)
    .notNull(),
  agreementId: uuid('agreement_id').references(() => agreements.id),
  serviceId: varchar('service_id', { length: 100 }).notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  crew: text('crew'),
  hours: numeric('hours'),
  materialsCost: numeric('materials_cost'),
  notes: text('notes'),
  clientSignedOff: boolean('client_signed_off').default(false),
  notionPageId: varchar('notion_page_id', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Audit Log — immutable record of all database changes (Layer 1).
 */
export const auditLog = pgTable('audit_log', {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  tableName: text('table_name').notNull(),
  recordId: uuid('record_id').notNull(),
  action: text('action').notNull(), // 'INSERT', 'UPDATE', 'DELETE'
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  changedFields: text('changed_fields').array(),
  changedBy: text('changed_by'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/**
 * Contact form submissions — legacy tracking for fallback.
 */
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  service: varchar('service', { length: 255 }),
  message: text('message').notNull(),
  source: varchar('source', { length: 100 }).default('website-contact-form'),
  emailSent: boolean('email_sent').default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Subscription sign-ups — tracks maintenance plan interest before payment.
 */
export const subscriptionLeads = pgTable('subscription_leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  plan: varchar('plan', { length: 100 }),
  propertyType: varchar('property_type', { length: 50 }),
  source: varchar('source', { length: 100 }).default('website-subscription'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Service Utilization View — maps agreement obligations to actual delivery.
 */
export const serviceUtilizationView = pgView('service_utilization', {
  agreementId: uuid('agreement_id'),
  agreementNumber: varchar('agreement_number', { length: 100 }),
  clientId: uuid('client_id'),
  clientName: text('client_name'),
  standardizedAddress: text('standardized_address'),
  serviceId: text('service_id'),
  agreedFrequency: text('agreed_frequency'),
  expectedCountPerYear: integer('expected_count_per_year'),
  actualCountYtd: integer('actual_count_ytd'),
  deliveryPercentage: numeric('delivery_percentage'),
}).existing();

/**
 * Underdelivered Services View — alerts for agreements below 80% fulfillment.
 */
export const underdeliveredServicesView = pgView('underdelivered_services', {
  agreementId: uuid('agreement_id'),
  agreementNumber: varchar('agreement_number', { length: 100 }),
  clientName: text('client_name'),
  serviceId: text('service_id'),
  deliveryPercentage: numeric('delivery_percentage'),
}).existing();

export type Client = typeof clients.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Agreement = typeof agreements.$inferSelect;
export type ServiceLog = typeof serviceLog.$inferSelect;
export type AuditLog = typeof auditLog.$inferSelect;
export type AgreementVersion = typeof agreementVersions.$inferSelect;

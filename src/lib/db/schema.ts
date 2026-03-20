import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  numeric,
  jsonb,
} from 'drizzle-orm/pg-core';

/**
 * Benson Home Solutions Core Schema - Rebuild V1 (2026)
 * Strict maintainability: Keep under 450 lines.
 * NO LEGACY ALIASES. NO SLOP.
 */

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  message: text('message'),
  propertyAddress: text('property_address'),
  serviceType: varchar('service_type', { length: 100 }),
  status: varchar('status', { length: 50 }).default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const properties = pgTable('properties', {
  id: uuid('id').defaultRandom().primaryKey(),
  leadId: uuid('lead_id').references(() => leads.id),
  standardizedAddress: text('standardized_address').unique().notNull(),
  city: varchar('city', { length: 100 }),
  county: varchar('county', { length: 100 }),
  lat: numeric('lat'),
  lng: numeric('lng'),
  metadata: jsonb('metadata'), // RSMeans, Year Built, Sqft
  auditHash: text('audit_hash'), // SHA-256 for integrity
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const maintenancePlans = pgTable('maintenance_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id').references(() => properties.id),
  planType: varchar('plan_type', { length: 100 }).notNull(), // 'valley_foundation', 'harney_winter'
  monthlyPrice: numeric('monthly_price'),
  status: varchar('status', { length: 50 }).default('active'),
  nextServiceDate: timestamp('next_service_date', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const serviceLogs = pgTable('service_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id').references(() => properties.id),
  serviceId: varchar('service_id', { length: 100 }).notNull(),
  completedBy: varchar('completed_by', { length: 100 }),
  notes: text('notes'),
  assets: text('assets').array(), // GCS URLs
  completedAt: timestamp('completed_at', { withTimezone: true }).defaultNow(),
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
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type MaintenancePlan = typeof maintenancePlans.$inferSelect;
export type ServiceLog = typeof serviceLogs.$inferSelect;
export type MarketingAsset = typeof marketingAssets.$inferSelect;

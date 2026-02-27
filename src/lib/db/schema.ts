import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
} from 'drizzle-orm/pg-core';

/**
 * Contact form submissions — persisted before email delivery so no lead is lost.
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

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type SubscriptionLead = typeof subscriptionLeads.$inferSelect;
export type NewSubscriptionLead = typeof subscriptionLeads.$inferInsert;

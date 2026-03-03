/**
 * DB Seed Script — Benson Home Solutions
 *
 * Seeds initial data into the Neon database.
 * Run via: npx tsx scripts/db-seed.ts
 *
 * Requires DATABASE_URL env var to be set.
 * Safe to run multiple times — uses upsert-like patterns.
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../src/lib/db/schema';

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL is not set');
    process.exit(1);
  }

  const queryClient = postgres(databaseUrl);
  const db = drizzle(queryClient, { schema });

  console.log('🌱 Starting database seed...\n');

  // Verify tables exist
  const tables = await queryClient`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `;
  const tableNames = tables.map((t) => t.table_name);
  console.log('📊 Existing tables:', tableNames.join(', '));

  // Fail fast if required tables are missing
  const required = ['contact_submissions', 'subscription_leads'];
  const missing = required.filter((name) => !tableNames.includes(name));
  if (missing.length > 0) {
    console.error('❌ Required tables missing:', missing.join(', '));
    console.error('   Run `npx drizzle-kit push` first to create the schema.');
    process.exit(1);
  }

  // Count existing rows
  const contactCount =
    await queryClient`SELECT count(*) as n FROM contact_submissions`;
  const leadCount =
    await queryClient`SELECT count(*) as n FROM subscription_leads`;
  console.log(`   contact_submissions: ${contactCount[0].n} rows`);
  console.log(`   subscription_leads: ${leadCount[0].n} rows`);

  // Insert test contact submission (only if table is empty)
  if (Number(contactCount[0].n) === 0) {
    await db.insert(schema.contactSubmissions).values({
      name: 'Test Contact',
      email: 'test@example.com',
      phone: '(541) 555-0100',
      service: 'Water Damage Restoration',
      message: 'This is a seed record for development testing. Safe to delete.',
      source: 'db-seed-script',
      emailSent: false,
    });
    console.log('\n✅ Inserted test contact submission');
  } else {
    console.log('\n⏭️  Skipping contact seed — table already has data');
  }

  // Insert test subscription lead (only if table is empty)
  if (Number(leadCount[0].n) === 0) {
    await db.insert(schema.subscriptionLeads).values({
      name: 'Test Subscriber',
      email: 'subscriber@example.com',
      phone: '(541) 555-0200',
      plan: 'Essential Home Maintenance',
      propertyType: 'residential',
      source: 'db-seed-script',
    });
    console.log('✅ Inserted test subscription lead');
  } else {
    console.log('⏭️  Skipping subscription seed — table already has data');
  }

  console.log('\n🎯 Seed complete.');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});

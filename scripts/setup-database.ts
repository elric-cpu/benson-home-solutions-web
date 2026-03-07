#!/usr/bin/env tsx

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

async function setupDatabase() {
  console.log('Setting up database...');

  const client = postgres(connectionString!, { prepare: false });

  try {
    // Create tables manually if they don't exist
    console.log('Creating tables...');

    // Create clients table
    await client`
      CREATE TABLE IF NOT EXISTS clients (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        name varchar(255) NOT NULL,
        email varchar(255) UNIQUE,
        phone varchar(30),
        source_channel varchar(100),
        hubspot_contact_id varchar(255),
        notion_page_id varchar(255),
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    // Create properties table
    await client`
      CREATE TABLE IF NOT EXISTS properties (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        client_id uuid REFERENCES clients(id),
        address_hash text UNIQUE NOT NULL,
        raw_address text NOT NULL,
        standardized_address text,
        city text,
        state text,
        zip text,
        county text,
        latitude double precision,
        longitude double precision,
        geocode_status text DEFAULT 'pending',
        flood_zone text,
        flood_zone_source text,
        disaster_history jsonb,
        fair_market_rent numeric,
        area_income_limit numeric,
        housing_data jsonb,
        energy_benchmarks jsonb,
        data_sources jsonb,
        data_completeness integer DEFAULT 0,
        agreement_status text DEFAULT 'none',
        notion_page_id varchar(255),
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL,
        enriched_at timestamp with time zone
      );
    `;

    // Create other tables
    await client`
      CREATE TABLE IF NOT EXISTS agreements (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        agreement_number varchar(100) UNIQUE NOT NULL,
        client_id uuid NOT NULL REFERENCES clients(id),
        property_id uuid NOT NULL REFERENCES properties(id),
        agreement_type varchar(100) NOT NULL,
        monthly_price numeric,
        annual_price numeric,
        status varchar(50) DEFAULT 'draft',
        start_date timestamp with time zone,
        end_date timestamp with time zone,
        services jsonb,
        document_url text,
        notion_page_id varchar(255),
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS agreement_versions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        agreement_id uuid NOT NULL REFERENCES agreements(id),
        version_number integer NOT NULL,
        document_provider varchar(50) NOT NULL,
        document_provider_id varchar(255) NOT NULL,
        document_url text,
        status varchar(50) DEFAULT 'draft',
        changes_summary text,
        signed_at timestamp with time zone,
        signed_by_client text,
        signed_by_benson text,
        created_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS service_log (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        property_id uuid NOT NULL REFERENCES properties(id),
        agreement_id uuid REFERENCES agreements(id),
        service_id varchar(100) NOT NULL,
        completed_at timestamp with time zone DEFAULT now() NOT NULL,
        crew text,
        hours numeric,
        materials_cost numeric,
        notes text,
        client_signed_off boolean DEFAULT false,
        notion_page_id varchar(255),
        created_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS audit_log (
        id bigserial PRIMARY KEY NOT NULL,
        table_name text NOT NULL,
        record_id uuid NOT NULL,
        action text NOT NULL,
        old_data jsonb,
        new_data jsonb,
        changed_fields text[],
        changed_by text,
        ip_address text,
        created_at timestamp with time zone DEFAULT now()
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(30),
        service varchar(255),
        message text NOT NULL,
        source varchar(100) DEFAULT 'website-contact-form',
        email_sent boolean DEFAULT false,
        created_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS subscription_leads (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(30),
        plan varchar(100),
        property_type varchar(50),
        source varchar(100) DEFAULT 'website-subscription',
        created_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `;

    console.log('Database tables created successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

setupDatabase()
  .then(() => {
    console.log('Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    process.exit(1);
  });

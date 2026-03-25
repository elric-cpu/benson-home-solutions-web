CREATE TABLE "catalog_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"notion_id" varchar(100),
	"onebuild_id" varchar(100),
	"name" varchar(512) NOT NULL,
	"description" text,
	"category_1" varchar(100),
	"category_2" varchar(100),
	"category_3" varchar(100),
	"unit_rate" numeric,
	"material_rate" numeric,
	"labor_rate" numeric,
	"production_rate" numeric,
	"uom" varchar(50),
	"county" varchar(100),
	"last_synced_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "catalog_items_notion_id_unique" UNIQUE("notion_id"),
	CONSTRAINT "catalog_items_onebuild_id_unique" UNIQUE("onebuild_id")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"message" text,
	"property_address" text,
	"service_type" varchar(100),
	"status" varchar(50) DEFAULT 'new',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "maintenance_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"plan_type" varchar(100) NOT NULL,
	"monthly_price" numeric,
	"status" varchar(50) DEFAULT 'active',
	"next_service_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "marketing_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"topic" varchar(255) NOT NULL,
	"asset_type" varchar(50) NOT NULL,
	"content_draft" text,
	"seo_strategy" jsonb,
	"multimedia_assets" jsonb,
	"outreach_campaign" jsonb,
	"developer_code" text,
	"status" varchar(50) DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "service_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"service_id" varchar(100) NOT NULL,
	"completed_by" varchar(100),
	"notes" text,
	"assets" text[],
	"completed_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "agreement_versions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "agreements" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "audit_log" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "clients" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "iguide_projects" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "property_floors" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "property_rooms" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "service_log" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "subscription_leads" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "agreement_versions" CASCADE;--> statement-breakpoint
DROP TABLE "agreements" CASCADE;--> statement-breakpoint
DROP TABLE "audit_log" CASCADE;--> statement-breakpoint
DROP TABLE "clients" CASCADE;--> statement-breakpoint
DROP TABLE "contact_submissions" CASCADE;--> statement-breakpoint
DROP TABLE "iguide_projects" CASCADE;--> statement-breakpoint
DROP TABLE "property_floors" CASCADE;--> statement-breakpoint
DROP TABLE "property_rooms" CASCADE;--> statement-breakpoint
DROP TABLE "service_log" CASCADE;--> statement-breakpoint
DROP TABLE "subscription_leads" CASCADE;--> statement-breakpoint
ALTER TABLE "properties" DROP CONSTRAINT "properties_address_hash_unique";--> statement-breakpoint
ALTER TABLE "properties" DROP CONSTRAINT "properties_client_id_clients_id_fk";
--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "standardized_address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "city" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "county" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "lead_id" uuid;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "lat" numeric;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "lng" numeric;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "metadata" jsonb;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "audit_hash" text;--> statement-breakpoint
ALTER TABLE "maintenance_plans" ADD CONSTRAINT "maintenance_plans_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_logs" ADD CONSTRAINT "service_logs_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "client_id";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "address_hash";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "raw_address";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "state";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "zip";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "latitude";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "longitude";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "geocode_status";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "flood_zone";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "flood_zone_source";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "disaster_history";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "fair_market_rent";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "area_income_limit";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "housing_data";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "energy_benchmarks";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "data_sources";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "data_completeness";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "agreement_status";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "notion_page_id";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "year_built";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "sqft";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "enriched_at";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "service_area_match";--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_standardized_address_unique" UNIQUE("standardized_address");
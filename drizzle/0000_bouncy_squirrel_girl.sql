CREATE TABLE "agreement_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agreement_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"document_provider" varchar(50) NOT NULL,
	"document_provider_id" varchar(255) NOT NULL,
	"document_url" text,
	"status" varchar(50) DEFAULT 'draft',
	"changes_summary" text,
	"signed_at" timestamp with time zone,
	"signed_by_client" text,
	"signed_by_benson" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "agreements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agreement_number" varchar(100) NOT NULL,
	"client_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"agreement_type" varchar(100) NOT NULL,
	"monthly_price" numeric,
	"annual_price" numeric,
	"status" varchar(50) DEFAULT 'draft',
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"services" jsonb,
	"document_url" text,
	"notion_page_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "agreements_agreement_number_unique" UNIQUE("agreement_number")
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"table_name" text NOT NULL,
	"record_id" uuid NOT NULL,
	"action" text NOT NULL,
	"old_data" jsonb,
	"new_data" jsonb,
	"changed_fields" text[],
	"changed_by" text,
	"ip_address" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(30),
	"source_channel" varchar(100),
	"hubspot_contact_id" varchar(255),
	"notion_page_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"service" varchar(255),
	"message" text NOT NULL,
	"source" varchar(100) DEFAULT 'website-contact-form',
	"email_sent" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid,
	"address_hash" text NOT NULL,
	"raw_address" text NOT NULL,
	"standardized_address" text,
	"city" text,
	"state" text,
	"zip" text,
	"county" text,
	"latitude" double precision,
	"longitude" double precision,
	"geocode_status" text DEFAULT 'pending',
	"flood_zone" text,
	"flood_zone_source" text,
	"disaster_history" jsonb,
	"fair_market_rent" numeric,
	"area_income_limit" numeric,
	"housing_data" jsonb,
	"energy_benchmarks" jsonb,
	"data_sources" jsonb,
	"data_completeness" integer DEFAULT 0,
	"agreement_status" text DEFAULT 'none',
	"notion_page_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"enriched_at" timestamp with time zone,
	CONSTRAINT "properties_address_hash_unique" UNIQUE("address_hash")
);
--> statement-breakpoint
CREATE TABLE "service_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"agreement_id" uuid,
	"service_id" varchar(100) NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"crew" text,
	"hours" numeric,
	"materials_cost" numeric,
	"notes" text,
	"client_signed_off" boolean DEFAULT false,
	"notion_page_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"plan" varchar(100),
	"property_type" varchar(50),
	"source" varchar(100) DEFAULT 'website-subscription',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "agreement_versions" ADD CONSTRAINT "agreement_versions_agreement_id_agreements_id_fk" FOREIGN KEY ("agreement_id") REFERENCES "public"."agreements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agreements" ADD CONSTRAINT "agreements_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agreements" ADD CONSTRAINT "agreements_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_log" ADD CONSTRAINT "service_log_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_log" ADD CONSTRAINT "service_log_agreement_id_agreements_id_fk" FOREIGN KEY ("agreement_id") REFERENCES "public"."agreements"("id") ON DELETE no action ON UPDATE no action;
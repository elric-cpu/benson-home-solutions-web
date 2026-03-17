ALTER TABLE "agreement_versions" ADD COLUMN "version_hash" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "service_area_match" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "year_built" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "sqft" integer;
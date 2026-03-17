CREATE TABLE "iguide_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"view_id" varchar(255) NOT NULL,
	"external_url" text,
	"total_interior_area_mm2" numeric,
	"measurement_standard" varchar(100),
	"construction_multiplier" numeric DEFAULT '0.92',
	"last_synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "iguide_projects_view_id_unique" UNIQUE("view_id")
);
--> statement-breakpoint
CREATE TABLE "property_floors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"iguide_project_id" uuid NOT NULL,
	"floor_name" varchar(255) NOT NULL,
	"level" integer DEFAULT 0,
	"is_below_grade" boolean DEFAULT false,
	"area_mm2" numeric,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"floor_id" uuid NOT NULL,
	"room_name" varchar(255) NOT NULL,
	"room_type" varchar(100),
	"width_mm" numeric,
	"length_mm" numeric,
	"area_mm2" numeric,
	"pano_id" varchar(255),
	"is_p0_room" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "iguide_projects" ADD CONSTRAINT "iguide_projects_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_floors" ADD CONSTRAINT "property_floors_iguide_project_id_iguide_projects_id_fk" FOREIGN KEY ("iguide_project_id") REFERENCES "public"."iguide_projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_rooms" ADD CONSTRAINT "property_rooms_floor_id_property_floors_id_fk" FOREIGN KEY ("floor_id") REFERENCES "public"."property_floors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "year_built";--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "sqft";
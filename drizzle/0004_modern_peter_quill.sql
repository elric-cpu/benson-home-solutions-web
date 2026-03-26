CREATE INDEX "email_created_at_idx" ON "leads" USING btree ("email","created_at");--> statement-breakpoint
CREATE INDEX "property_lead_id_idx" ON "properties" USING btree ("lead_id");
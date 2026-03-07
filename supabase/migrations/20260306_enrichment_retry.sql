-- Enable the pg_cron extension if not already enabled
-- Note: On Supabase, you might need to enable it via the Dashboard or specific command
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Add retry_count to properties table to track enrichment attempts
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS retry_count INTEGER DEFAULT 0;

-- Function to trigger property enrichment for failed or incomplete records
-- This function will be called by pg_cron to periodically retry enrichment
CREATE OR REPLACE FUNCTION public.retry_property_enrichment()
RETURNS void AS $$
DECLARE
  prop_record RECORD;
  http_response int;
BEGIN
  -- Select properties that are incomplete and haven't exceeded retry limit (e.g., 3 retries)
  -- Also ensure they weren't recently updated to avoid immediate retries
  FOR prop_record IN 
    SELECT id, raw_address 
    FROM public.properties 
    WHERE (geocode_status = 'pending' OR data_completeness < 100)
      AND retry_count < 3
      AND updated_at < (now() - interval '1 hour')
    LIMIT 10 -- Process in small batches
  LOOP
    -- Increment retry count
    UPDATE public.properties 
    SET retry_count = retry_count + 1,
        updated_at = now()
    WHERE id = prop_record.id;

    -- Trigger the Supabase Edge Function for enrichment
    -- Replace [PROJECT_REF] with the actual project reference or use internal URL
    -- On Supabase, internal functions can be called via net.http_post
    PERFORM net.http_post(
      url := 'https://' || current_setting('request.headers')::json->>'host' || '/functions/v1/property-enrichment',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object('address', prop_record.raw_address)
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule the retry job to run every 15 minutes
-- SELECT cron.schedule('enrichment-retry-job', '*/15 * * * *', 'SELECT public.retry_property_enrichment()');

-- SQL for Metabase Read-Only Access
-- Creates a secure user for BI tools with restricted access.

-- 1. Create the role (password should be changed in production)
-- CREATE ROLE metabase_reader WITH LOGIN PASSWORD 'CHANGE_ME_IMMEDIATELY';

-- 2. Grant connect and usage
GRANT CONNECT ON DATABASE postgres TO metabase_reader;
GRANT USAGE ON SCHEMA public TO metabase_reader;

-- 3. Grant select on specific tables needed for dashboards
GRANT SELECT ON public.clients TO metabase_reader;
GRANT SELECT ON public.properties TO metabase_reader;
GRANT SELECT ON public.agreements TO metabase_reader;
GRANT SELECT ON public.service_log TO metabase_reader;
GRANT SELECT ON public.contact_submissions TO metabase_reader;
GRANT SELECT ON public.audit_log TO metabase_reader;

-- 4. Grant select on the utilization views
GRANT SELECT ON public.service_utilization TO metabase_reader;
GRANT SELECT ON public.underdelivered_services TO metabase_reader;

-- 5. Ensure future tables are also handled
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO metabase_reader;

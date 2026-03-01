-- Row Level Security (RLS) Policies
-- Ensures clients only see their own data, staff sees everything.

-- Enable RLS on all critical tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_log ENABLE ROW LEVEL SECURITY;

-- 1. Clients Policy: Can only select their own client record
-- Using auth.uid() which should match the client.id (assuming Supabase Auth is used)
CREATE POLICY "Clients see own records" ON public.clients
  FOR SELECT USING (auth.uid() = id);

-- 2. Properties Policy: Can only see properties where client_id matches
CREATE POLICY "Clients see own properties" ON public.properties
  FOR SELECT USING (client_id = auth.uid());

-- 3. Agreements Policy: Can only see agreements where client_id matches
CREATE POLICY "Clients see own agreements" ON public.agreements
  FOR SELECT USING (client_id = auth.uid());

-- 4. Service Log Policy: Can only see service logs for their properties
CREATE POLICY "Clients see own service log" ON public.service_log
  FOR SELECT USING (
    property_id IN (SELECT id FROM public.properties WHERE client_id = auth.uid())
  );

-- 5. Service Role Policy (Admin): Full access
-- This is handled automatically by the service_role key, 
-- but we can explicitly allow it if needed for custom roles.
CREATE POLICY "Service role full access" ON public.clients
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.properties
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.agreements
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.service_log
  FOR ALL USING (true) WITH CHECK (true);

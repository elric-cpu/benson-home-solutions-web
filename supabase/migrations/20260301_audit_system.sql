-- Layer 1: Database Audit Triggers
-- Captures every INSERT, UPDATE, DELETE on critical tables

CREATE TABLE IF NOT EXISTS public.audit_log (
  id BIGSERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  old_data JSONB,
  new_data JSONB,
  changed_fields TEXT[], -- list of field names that changed
  changed_by TEXT, -- user ID or 'system'
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_table ON public.audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_audit_record ON public.audit_log(record_id);
CREATE INDEX IF NOT EXISTS idx_audit_time ON public.audit_log(created_at);

-- Trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_log (table_name, record_id, action, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', to_jsonb(NEW), current_setting('request.jwt.claims', true)::jsonb->>'sub');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_log (table_name, record_id, action, old_data, new_data, changed_fields, changed_by)
    VALUES (
      TG_TABLE_NAME, NEW.id, 'UPDATE',
      to_jsonb(OLD), to_jsonb(NEW),
      ARRAY(
        SELECT key FROM jsonb_each(to_jsonb(NEW))
        WHERE to_jsonb(NEW) ->> key IS DISTINCT FROM to_jsonb(OLD) ->> key
      ),
      current_setting('request.jwt.claims', true)::jsonb->>'sub'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_log (table_name, record_id, action, old_data, changed_by)
    VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', to_jsonb(OLD), current_setting('request.jwt.claims', true)::jsonb->>'sub');
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_properties') THEN
    CREATE TRIGGER audit_properties AFTER INSERT OR UPDATE OR DELETE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_clients') THEN
    CREATE TRIGGER audit_clients AFTER INSERT OR UPDATE OR DELETE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_agreements') THEN
    CREATE TRIGGER audit_agreements AFTER INSERT OR UPDATE OR DELETE ON public.agreements FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'audit_service_log') THEN
    CREATE TRIGGER audit_service_log AFTER INSERT OR UPDATE OR DELETE ON public.service_log FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_func();
  END IF;
END $$;

-- Protection
REVOKE UPDATE, DELETE ON public.audit_log FROM PUBLIC;

-- 1. Create Agreement Versions Table
-- This table tracks every single iteration of an agreement to ensure auditability.
CREATE TABLE IF NOT EXISTS public.agreement_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agreement_id UUID REFERENCES public.agreements(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    document_provider TEXT NOT NULL, -- e.g., 'pandadoc', 'docusign'
    document_provider_id TEXT NOT NULL, -- The external ID from the provider
    document_url TEXT,
    status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'viewed', 'signed', 'declined', 'expired'
    changes_summary TEXT, -- Human-readable summary of what changed in this version
    created_at TIMESTAMPTZ DEFAULT now(),
    signed_at TIMESTAMPTZ,
    signed_by_client TEXT,
    signed_by_benson TEXT,
    UNIQUE(agreement_id, version_number)
);

-- 2. Add RLS for Agreement Versions
ALTER TABLE public.agreement_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients see own agreement versions" ON public.agreement_versions
  FOR SELECT USING (
    agreement_id IN (
        SELECT id FROM public.agreements WHERE client_id IN (
            SELECT id FROM public.clients WHERE id = auth.uid()
        )
    )
);

CREATE POLICY "Service role full access" ON public.agreement_versions
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Trigger to Update Agreement Version Count
-- Automatically increments the version number when a new version is inserted
CREATE OR REPLACE FUNCTION public.set_agreement_version_number()
RETURNS TRIGGER AS $$
BEGIN
    SELECT COALESCE(MAX(version_number), 0) + 1 
    INTO NEW.version_number 
    FROM public.agreement_versions 
    WHERE agreement_id = NEW.agreement_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_agreement_version
    BEFORE INSERT ON public.agreement_versions
    FOR EACH ROW
    EXECUTE FUNCTION public.set_agreement_version_number();

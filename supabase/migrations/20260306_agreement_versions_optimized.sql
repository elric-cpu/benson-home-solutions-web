-- Optimize Agreement Versions for high-performance retrieval and audit integrity
CREATE INDEX IF NOT EXISTS idx_agreement_versions_id ON public.agreement_versions(agreement_id);
CREATE INDEX IF NOT EXISTS idx_agreement_versions_status ON public.agreement_versions(status);
CREATE INDEX IF NOT EXISTS idx_agreement_versions_provider_id ON public.agreement_versions(document_provider_id);

-- Ensure we can verify document integrity via hash
ALTER TABLE public.agreement_versions ADD COLUMN IF NOT EXISTS version_hash TEXT;

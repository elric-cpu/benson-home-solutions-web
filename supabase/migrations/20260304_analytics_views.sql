-- 1. Monthly Recurring Revenue (MRR) Tracking
CREATE OR REPLACE VIEW mrr_analytics AS
SELECT 
    date_trunc('month', created_at) AS month,
    agreement_type,
    status,
    SUM(monthly_price) AS mrr,
    COUNT(id) AS active_agreements
FROM agreements
WHERE status = 'active'
GROUP BY 1, 2, 3;

-- 2. Lead Conversion Funnel
-- Leads (Clients) -> Calculator Use (Properties) -> Agreements Drafted -> Agreements Active
CREATE OR REPLACE VIEW conversion_funnel AS
SELECT 
    'Leads' AS stage, COUNT(id) AS count, 1 AS step FROM clients
UNION ALL
SELECT 
    'Calculator Used' AS stage, COUNT(id) AS count, 2 AS step FROM properties
UNION ALL
SELECT 
    'Agreements Drafted' AS stage, COUNT(id) AS count, 3 AS step FROM agreements WHERE status = 'draft'
UNION ALL
SELECT 
    'Agreements Active' AS stage, COUNT(id) AS count, 4 AS step FROM agreements WHERE status = 'active'
ORDER BY step;

-- 3. Property Flood Risk Distribution
CREATE OR REPLACE VIEW property_risk_distribution AS
SELECT 
    flood_zone,
    COUNT(id) AS property_count,
    ROUND((COUNT(id)::NUMERIC / (SELECT COUNT(*) FROM properties)) * 100, 1) AS percentage
FROM properties
GROUP BY flood_zone;

-- 4. Create Read-Only Role for Metabase
-- Run this in Supabase SQL Editor to secure your data
/*
CREATE ROLE metabase_reader WITH LOGIN PASSWORD 'YOUR_SECURE_PASSWORD';
GRANT CONNECT ON DATABASE postgres TO metabase_reader;
GRANT USAGE ON SCHEMA public TO metabase_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO metabase_reader;
GRANT SELECT ON ALL VIEWS IN SCHEMA public TO metabase_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO metabase_reader;
*/

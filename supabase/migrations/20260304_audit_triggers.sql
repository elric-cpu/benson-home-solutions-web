-- 1. Create the Audit Trigger Function
CREATE OR REPLACE FUNCTION audit_trigger_func() RETURNS TRIGGER AS $$
DECLARE
    current_user_id TEXT;
BEGIN
    -- Get current user from settings if available (Supabase Auth)
    current_user_id := current_setting('request.jwt.claims', true)::jsonb->>'sub';
    IF current_user_id IS NULL THEN
        current_user_id := 'system';
    END IF;

    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_data, changed_by)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', to_jsonb(NEW), current_user_id);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_data, new_data, changed_fields, changed_by)
        VALUES (
            TG_TABLE_NAME, 
            NEW.id, 
            'UPDATE', 
            to_jsonb(OLD), 
            to_jsonb(NEW), 
            ARRAY(
                SELECT key 
                FROM jsonb_each(to_jsonb(NEW)) 
                WHERE to_jsonb(NEW) ->> key IS DISTINCT FROM to_jsonb(OLD) ->> key
            ),
            current_user_id
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_data, changed_by)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', to_jsonb(OLD), current_user_id);
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 2. Apply Triggers to Critical Tables
DROP TRIGGER IF EXISTS audit_properties ON properties;
CREATE TRIGGER audit_properties AFTER INSERT OR UPDATE OR DELETE ON properties FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

DROP TRIGGER IF EXISTS audit_clients ON clients;
CREATE TRIGGER audit_clients AFTER INSERT OR UPDATE OR DELETE ON clients FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

DROP TRIGGER IF EXISTS audit_agreements ON agreements;
CREATE TRIGGER audit_agreements AFTER INSERT OR UPDATE OR DELETE ON agreements FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

DROP TRIGGER IF EXISTS audit_service_log ON service_log;
CREATE TRIGGER audit_service_log AFTER INSERT OR UPDATE OR DELETE ON service_log FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- 3. Create Service Utilization View
-- This view maps agreed services to actually delivered records from service_log
CREATE OR REPLACE VIEW service_utilization AS
SELECT 
    a.id AS agreement_id, 
    a.agreement_number, 
    a.client_id,
    c.name AS client_name,
    p.standardized_address, 
    s.value ->> 'service_id' AS service_id, 
    s.value ->> 'frequency' AS agreed_frequency,
    CASE s.value ->> 'frequency' 
        WHEN 'monthly' THEN 12 
        WHEN 'quarterly' THEN 4 
        WHEN 'semi-annual' THEN 2 
        WHEN 'annual' THEN 1 
    END AS expected_count_per_year,
    COUNT(sl.id) AS actual_count_ytd,
    ROUND(
        (COUNT(sl.id)::NUMERIC / NULLIF(
            CASE s.value ->> 'frequency' 
                WHEN 'monthly' THEN GREATEST(1, EXTRACT(MONTH FROM AGE(now(), a.start_date)))
                WHEN 'quarterly' THEN GREATEST(1, CEIL(EXTRACT(MONTH FROM AGE(now(), a.start_date)) / 3))
                WHEN 'semi-annual' THEN GREATEST(1, CEIL(EXTRACT(MONTH FROM AGE(now(), a.start_date)) / 6))
                WHEN 'annual' THEN 1 
            END, 0
        )) * 100, 1
    ) AS delivery_percentage
FROM agreements a
CROSS JOIN LATERAL jsonb_array_elements(a.services) s
JOIN clients c ON a.client_id = c.id
JOIN properties p ON a.property_id = p.id
LEFT JOIN service_log sl ON sl.agreement_id = a.id 
    AND sl.service_id = s.value ->> 'service_id'
    AND sl.completed_at >= a.start_date
WHERE a.status = 'active'
GROUP BY a.id, a.agreement_number, a.client_id, c.name, p.standardized_address, s.value ->> 'service_id', s.value ->> 'frequency', a.start_date;

-- 4. Create Underdelivered Services View (Alerting Layer)
CREATE OR REPLACE VIEW underdelivered_services AS
SELECT * FROM service_utilization WHERE delivery_percentage < 80;

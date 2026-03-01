-- Layer 3: Service Utilization Tracking
-- Compares agreement line items against actual service log entries

CREATE OR REPLACE VIEW public.service_utilization AS
SELECT 
  a.id AS agreement_id,
  a.agreement_number,
  a.client_id,
  c.name AS client_name,
  p.standardized_address,
  s.value ->> 'service_id' AS service_id,
  s.value ->> 'frequency' AS agreed_frequency,
  -- Calculate expected count based on frequency and time passed since start_date
  CASE s.value ->> 'frequency'
    WHEN 'monthly' THEN 12
    WHEN 'quarterly' THEN 4
    WHEN 'semi-annual' THEN 2
    WHEN 'annual' THEN 1
    ELSE 0
  END AS expected_count_per_year,
  -- Actual count of delivered services for this agreement/service combo since start
  COUNT(sl.id) AS actual_count_ytd,
  -- Calculate delivery percentage based on elapsed time
  ROUND(
    (COUNT(sl.id)::NUMERIC / NULLIF(
      CASE s.value ->> 'frequency'
        WHEN 'monthly' THEN GREATEST(1, EXTRACT(MONTH FROM AGE(now(), a.start_date)))
        WHEN 'quarterly' THEN GREATEST(1, CEIL(EXTRACT(MONTH FROM AGE(now(), a.start_date)) / 3))
        WHEN 'semi-annual' THEN GREATEST(1, CEIL(EXTRACT(MONTH FROM AGE(now(), a.start_date)) / 6))
        WHEN 'annual' THEN 1
        ELSE 1
      END, 0
    )) * 100, 1
  ) AS delivery_percentage
FROM public.agreements a
CROSS JOIN LATERAL jsonb_array_elements(a.services) s
JOIN public.properties p ON a.property_id = p.id
JOIN public.clients c ON a.client_id = c.id
LEFT JOIN public.service_log sl ON sl.agreement_id = a.id 
  AND sl.service_id = s.value ->> 'service_id'
  AND sl.completed_at >= a.start_date
WHERE a.status = 'active'
GROUP BY 
  a.id, a.agreement_number, a.client_id, c.name, 
  p.standardized_address, s.value ->> 'service_id', 
  s.value ->> 'frequency', a.start_date;

-- Add a helper view for "At Risk" agreements (below 80% delivery)
CREATE OR REPLACE VIEW public.underdelivered_services AS
SELECT * FROM public.service_utilization
WHERE delivery_percentage < 80;

# Metabase BI Layer - Metadata & Configuration

This document defines the Business Intelligence (BI) layer for Benson Home Solutions. It includes the SQL views and role configurations required to visualize MRR growth, lead conversion, and property risk.

## 1. Security & Roles

The BI layer uses a dedicated read-only role: `metabase_reader`.

**Creation SQL:**
```sql
CREATE ROLE metabase_reader WITH LOGIN PASSWORD 'YOUR_SECURE_PASSWORD';
GRANT CONNECT ON DATABASE postgres TO metabase_reader;
GRANT USAGE ON SCHEMA public TO metabase_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO metabase_reader;
GRANT SELECT ON ALL VIEWS IN SCHEMA public TO metabase_reader;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO metabase_reader;
```

## 2. Core KPI Views

These views are deployed via `supabase/migrations/20260304_analytics_views.sql`.

### Monthly Recurring Revenue (MRR)
- **View:** `mrr_analytics`
- **Fields:** `month`, `agreement_type`, `status`, `mrr`, `active_agreements`
- **Metabase Visualization:** Line chart (X-Axis: `month`, Y-Axis: `mrr`).

### Lead Conversion Funnel
- **View:** `conversion_funnel`
- **Fields:** `stage`, `count`, `step`
- **Metabase Visualization:** Funnel chart (Ordered by `step`).

### Property Risk Distribution
- **View:** `property_risk_distribution`
- **Fields:** `flood_zone`, `property_count`, `percentage`
- **Metabase Visualization:** Pie chart or Bar chart.

## 3. Dashboard Configuration

### Dashboard: Executive Overview
- **Metric 1:** Total Active MRR (Scalar: `SUM(mrr)` from `mrr_analytics` where `status = 'active'`)
- **Metric 2:** Conversion Rate (Calculation: `Active Agreements / Total Leads`)
- **Metric 3:** High Risk Properties (Filter: `flood_zone != 'X'` from `property_risk_distribution`)

## 4. Deployment Instructions
1. Run the migrations in `supabase/migrations/`.
2. Create the `metabase_reader` role in your Supabase SQL editor.
3. Connect Metabase to your Supabase instance using the `metabase_reader` credentials.
4. Import the queries above into Metabase Questions.

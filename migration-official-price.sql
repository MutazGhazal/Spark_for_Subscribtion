-- ============================================================
-- MIGRATION: Add Official Price Column
-- Run this in Supabase SQL Editor
-- ============================================================

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS official_price NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS official_url TEXT;

-- Note: subscription_plans is usually a JSONB column, so we don't need 
-- a schema change to add cost_price or official_price inside the plans objects.
-- The frontend will handle adding these keys to the JSON objects.

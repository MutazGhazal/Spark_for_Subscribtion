-- ============================================================
-- MIGRATION: Availability Checker Columns
-- Run this in Supabase SQL Editor
-- ============================================================

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS wmcentre_url TEXT DEFAULT '';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS availability_source TEXT DEFAULT 'NONE';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS last_availability_check TIMESTAMPTZ;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS cost_price NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS profit_margin NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS fixed_fee NUMERIC;

-- Optional: Add index for filtering by availability source and activity
CREATE INDEX IF NOT EXISTS idx_products_availability_source ON public.products(availability_source);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);

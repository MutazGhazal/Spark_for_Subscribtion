-- ============================================================
-- MIGRATION: Orders Archiving & Deletion
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Add is_archived to customer_orders
ALTER TABLE public.customer_orders ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- 2. Add is_archived to referral_orders
ALTER TABLE public.referral_orders ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- 3. Add Index for performance
CREATE INDEX IF NOT EXISTS idx_customer_orders_archived ON public.customer_orders(is_archived);
CREATE INDEX IF NOT EXISTS idx_referral_orders_archived ON public.referral_orders(is_archived);

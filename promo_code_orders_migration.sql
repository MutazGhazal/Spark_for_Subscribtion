-- ============================================================
-- MIGRATION: Promo Code Support for Orders
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Add promo_code to customer_orders
ALTER TABLE public.customer_orders ADD COLUMN IF NOT EXISTS applied_promo TEXT;

-- 2. Add discount_amount to customer_orders
ALTER TABLE public.customer_orders ADD COLUMN IF NOT EXISTS discount_amount NUMERIC DEFAULT 0;

-- 3. Add Index for performance
CREATE INDEX IF NOT EXISTS idx_customer_orders_promo ON public.customer_orders(applied_promo);

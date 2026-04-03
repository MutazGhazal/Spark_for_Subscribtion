-- ============================================================
-- MIGRATION: Verified Review Rewards
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Update public.reviews table
-- Adding fields for email, screenshot, reward status and generated coupon
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS screenshot_url TEXT;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS reward_status TEXT DEFAULT 'none' CHECK (reward_status IN ('none', 'pending', 'approved', 'rejected'));
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS coupon_code TEXT;

-- 2. Create public.coupons table
-- To store the unique discount codes generated upon review approval
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_percent NUMERIC DEFAULT 10,
  is_used BOOLEAN DEFAULT false,
  customer_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_at TIMESTAMPTZ
);

-- Index for fast lookup by email
CREATE INDEX IF NOT EXISTS idx_coupons_email ON public.coupons(customer_email);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);

-- 3. RLS Policies for coupons
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "coupons_select_public" ON public.coupons FOR SELECT USING (true); -- Public can check if a coupon is valid
CREATE POLICY "coupons_insert_admin" ON public.coupons FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "coupons_update_admin" ON public.coupons FOR UPDATE USING (public.is_admin());

-- 4. Storage Bucket for Proofs
-- Note: Creating bucket via SQL might not work on some Supabase setups, 
-- but we define the policy here. Make sure to create bucket 'review_proofs' in UI.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review_proofs', 'review-proofs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "sc_proofs_select" ON storage.objects FOR SELECT USING (bucket_id = 'review_proofs');
-- Allow anyone to upload a file to the bucket 'review_proofs'
CREATE POLICY "sc_proofs_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'review_proofs');
-- Note: You might need to manually enable 'public' access in the Supabase Dashboard

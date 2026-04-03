-- ============================================================
-- MIGRATION: Fix Review Permissions and Reward Status (V2)
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 2. Setup Policies (DROP first to avoid syntax errors with IF NOT EXISTS)
DROP POLICY IF EXISTS "reviews_insert_public" ON public.reviews;
CREATE POLICY "reviews_insert_public" ON public.reviews FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "reviews_select_public" ON public.reviews;
CREATE POLICY "reviews_select_public" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "reviews_update_admin" ON public.reviews;
CREATE POLICY "reviews_update_admin" ON public.reviews FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "reviews_delete_admin" ON public.reviews;
CREATE POLICY "reviews_delete_admin" ON public.reviews FOR DELETE USING (public.is_admin());

-- 3. Fix existing data: 
-- Force 'pending' status for reviews with screenshots that were submitted previously
UPDATE public.reviews 
SET reward_status = 'pending' 
WHERE screenshot_url IS NOT NULL 
  AND (reward_status = 'none' OR reward_status IS NULL);

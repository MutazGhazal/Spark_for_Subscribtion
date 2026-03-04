-- ============================================================
-- Supabase Setup for Multi-Admin Referral System
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================================

-- 1. TABLES
-- ============================================================

CREATE TABLE public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin')),
  referral_code TEXT UNIQUE,
  commission_percent NUMERIC DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL DEFAULT '',
  name_en TEXT NOT NULL DEFAULT '',
  description_ar TEXT DEFAULT '',
  description_en TEXT DEFAULT '',
  price NUMERIC NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  category TEXT DEFAULT 'streaming',
  image TEXT DEFAULT '',
  duration_ar TEXT DEFAULT '',
  duration_en TEXT DEFAULT '',
  available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  payment_links JSONB DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT DEFAULT 'tag',
  sort_order INT DEFAULT 0
);

CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE public.referral_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL,
  visitor_id TEXT,
  country TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.referral_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL,
  admin_id UUID REFERENCES public.admins(id),
  product_id TEXT,
  product_name TEXT DEFAULT '',
  amount NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid')),
  confirmed_by UUID REFERENCES public.admins(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. INDEXES
-- ============================================================

CREATE INDEX idx_referral_visits_code ON public.referral_visits(referral_code);
CREATE INDEX idx_referral_visits_created ON public.referral_visits(created_at);
CREATE INDEX idx_referral_orders_code ON public.referral_orders(referral_code);
CREATE INDEX idx_referral_orders_status ON public.referral_orders(status);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_admins_user_id ON public.admins(user_id);
CREATE INDEX idx_admins_referral_code ON public.admins(referral_code);

-- 3. HELPER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid());
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND role = 'super_admin');
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Bootstrap: first user becomes super_admin (only works when no admins exist)
CREATE OR REPLACE FUNCTION public.bootstrap_admin(admin_name TEXT, ref_code TEXT)
RETURNS JSONB AS $$
DECLARE
  admin_count INT;
  current_email TEXT;
  new_admin public.admins;
BEGIN
  SELECT COUNT(*) INTO admin_count FROM public.admins;
  IF admin_count > 0 THEN
    RETURN jsonb_build_object('error', 'Admin already exists. Contact super admin.');
  END IF;

  SELECT email INTO current_email FROM auth.users WHERE id = auth.uid();

  INSERT INTO public.admins (user_id, email, name, role, referral_code, commission_percent)
  VALUES (auth.uid(), current_email, admin_name, 'super_admin', ref_code, 0)
  RETURNING * INTO new_admin;

  RETURN jsonb_build_object('success', true, 'id', new_admin.id, 'role', new_admin.role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Link auth user to pre-created admin record (called on first login)
CREATE OR REPLACE FUNCTION public.link_admin_user()
RETURNS JSONB AS $$
DECLARE
  current_email TEXT;
  admin_record public.admins;
BEGIN
  SELECT email INTO current_email FROM auth.users WHERE id = auth.uid();

  -- Already linked?
  SELECT * INTO admin_record FROM public.admins WHERE user_id = auth.uid();
  IF admin_record IS NOT NULL THEN
    RETURN jsonb_build_object('success', true, 'id', admin_record.id, 'role', admin_record.role, 'name', admin_record.name, 'referral_code', admin_record.referral_code);
  END IF;

  -- Try to link by email
  UPDATE public.admins SET user_id = auth.uid()
  WHERE email = current_email AND user_id IS NULL
  RETURNING * INTO admin_record;

  IF admin_record IS NOT NULL THEN
    RETURN jsonb_build_object('success', true, 'id', admin_record.id, 'role', admin_record.role, 'name', admin_record.name, 'referral_code', admin_record.referral_code);
  END IF;

  RETURN jsonb_build_object('error', 'Not authorized. Ask super admin to add your email.');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if any admin exists (for bootstrap detection)
CREATE OR REPLACE FUNCTION public.admin_count()
RETURNS INT AS $$
  SELECT COUNT(*)::INT FROM public.admins;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 4. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_orders ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin write
CREATE POLICY "products_select" ON public.products FOR SELECT USING (true);
CREATE POLICY "products_insert" ON public.products FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "products_update" ON public.products FOR UPDATE USING (public.is_admin());
CREATE POLICY "products_delete" ON public.products FOR DELETE USING (public.is_admin());

-- Categories: public read, admin write
CREATE POLICY "categories_select" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_insert" ON public.categories FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "categories_update" ON public.categories FOR UPDATE USING (public.is_admin());
CREATE POLICY "categories_delete" ON public.categories FOR DELETE USING (public.is_admin());

-- Site settings: public read, super_admin write
CREATE POLICY "settings_select" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_insert" ON public.site_settings FOR INSERT WITH CHECK (public.is_super_admin());
CREATE POLICY "settings_update" ON public.site_settings FOR UPDATE USING (public.is_super_admin());

-- Admins: admin can read, super_admin can write
CREATE POLICY "admins_select" ON public.admins FOR SELECT USING (public.is_admin());
CREATE POLICY "admins_insert" ON public.admins FOR INSERT WITH CHECK (public.is_super_admin());
CREATE POLICY "admins_update" ON public.admins FOR UPDATE USING (public.is_super_admin());
CREATE POLICY "admins_delete" ON public.admins FOR DELETE USING (public.is_super_admin());

-- Referral visits: anyone can insert, admin can read
CREATE POLICY "visits_insert" ON public.referral_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "visits_select" ON public.referral_visits FOR SELECT USING (public.is_admin());

-- Referral orders: super_admin full control, admin reads own
CREATE POLICY "orders_select" ON public.referral_orders FOR SELECT USING (
  public.is_super_admin() OR
  referral_code IN (SELECT referral_code FROM public.admins WHERE user_id = auth.uid())
);
CREATE POLICY "orders_insert" ON public.referral_orders FOR INSERT WITH CHECK (public.is_super_admin());
CREATE POLICY "orders_update" ON public.referral_orders FOR UPDATE USING (public.is_super_admin());
CREATE POLICY "orders_delete" ON public.referral_orders FOR DELETE USING (public.is_super_admin());

-- 5. STORAGE BUCKET
-- ============================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "images_select" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "images_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND public.is_admin());
CREATE POLICY "images_update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND public.is_admin());
CREATE POLICY "images_delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND public.is_admin());

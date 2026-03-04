-- ============================================================
-- Data Migration: JSON → Supabase
-- Run this AFTER supabase-setup.sql
-- ============================================================

-- Categories
INSERT INTO public.categories (id, name_ar, name_en, icon, sort_order) VALUES
  ('streaming', 'بث ومشاهدة', 'Streaming', 'play-circle', 1),
  ('software', 'تطبيقات الذكاء الاصطناعي', 'AI_Software', 'cpu', 2),
  ('gaming', 'ألعاب', 'Gaming', 'gamepad-2', 3)
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO public.products (id, name_ar, name_en, description_ar, description_en, price, currency, category, image, duration_ar, duration_en, available, featured, payment_links, sort_order) VALUES
  ('netflix-1month', 'اشتراك نتفلكس - شهر', 'Netflix - 1 Month', 'اشتراك نتفلكس بريميوم 4K لمدة شهر كامل، مشاهدة غير محدودة', 'Netflix Premium 4K subscription for 1 full month, unlimited streaming', 5, 'USD', 'streaming', 'images/netflix.svg', 'شهر واحد', '1 Month', true, true, '{"paypal":"https://paypal.me/username/5","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك نتفلكس شهر - $5"}', 1),
  ('spotify-3months', 'اشتراك سبوتيفاي - 3 أشهر', 'Spotify Premium - 3 Months', 'سبوتيفاي بريميوم بدون إعلانات لمدة 3 أشهر', 'Spotify Premium ad-free for 3 months', 8, 'USD', 'streaming', 'images/spotify.svg', '3 أشهر', '3 Months', true, false, '{"paypal":"https://paypal.me/username/8","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك سبوتيفاي 3 أشهر - $8"}', 2),
  ('youtube-1month', 'يوتيوب بريميوم - شهر', 'YouTube Premium - 1 Month', 'يوتيوب بريميوم بدون إعلانات + تحميل الفيديوهات', 'YouTube Premium ad-free + offline downloads', 4, 'USD', 'streaming', 'images/youtube.svg', 'شهر واحد', '1 Month', true, false, '{"paypal":"https://paypal.me/username/4","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك يوتيوب بريميوم شهر - $4"}', 3),
  ('office365-1year', 'مايكروسوفت أوفيس 365 - سنة', 'Microsoft Office 365 - 1 Year', 'جميع تطبيقات أوفيس + 1TB تخزين سحابي OneDrive', 'All Office apps + 1TB OneDrive cloud storage', 15, 'USD', 'software', 'images/office365.svg', 'سنة كاملة', '1 Year', true, true, '{"paypal":"https://paypal.me/username/15","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك أوفيس 365 سنة - $15"}', 4),
  ('nordvpn-1year', 'NordVPN - سنة', 'NordVPN - 1 Year', 'حماية كاملة لخصوصيتك على الإنترنت مع NordVPN', 'Complete online privacy protection with NordVPN', 12, 'USD', 'software', 'images/nordvpn.svg', 'سنة كاملة', '1 Year', true, false, '{"paypal":"https://paypal.me/username/12","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك NordVPN سنة - $12"}', 5),
  ('canva-1year', 'كانفا برو - سنة', 'Canva Pro - 1 Year', 'تصميم احترافي مع كانفا برو - قوالب وأدوات غير محدودة', 'Professional design with Canva Pro - unlimited templates & tools', 10, 'USD', 'software', 'images/canva.svg', 'سنة كاملة', '1 Year', true, false, '{"paypal":"https://paypal.me/username/10","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك كانفا برو سنة - $10"}', 6),
  ('psplus-3months', 'PlayStation Plus - 3 أشهر', 'PlayStation Plus - 3 Months', 'العب أونلاين + ألعاب مجانية شهرياً مع بلايستيشن بلس', 'Play online + free monthly games with PS Plus', 18, 'USD', 'gaming', 'images/psplus.svg', '3 أشهر', '3 Months', true, true, '{"paypal":"https://paypal.me/username/18","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك PS Plus 3 أشهر - $18"}', 7),
  ('xbox-gamepass-1month', 'Xbox Game Pass - شهر', 'Xbox Game Pass Ultimate - 1 Month', 'وصول لمئات الألعاب على Xbox و PC مع Game Pass Ultimate', 'Access hundreds of games on Xbox & PC with Game Pass Ultimate', 10, 'USD', 'gaming', 'images/gamepass.svg', 'شهر واحد', '1 Month', true, false, '{"paypal":"https://paypal.me/username/10","stripe":"https://buy.stripe.com/xxx","whatsapp_message":"أريد شراء اشتراك Xbox Game Pass شهر - $10"}', 8)
ON CONFLICT (id) DO NOTHING;

-- Site Settings
INSERT INTO public.site_settings (key, value) VALUES
  ('store', '{
    "name_ar": "متجر الاشتراكات الرقمية",
    "name_en": "Digital Subscriptions Store",
    "description_ar": "أفضل الأسعار للاشتراكات الرقمية - بث، برامج، ألعاب",
    "description_en": "Best prices for digital subscriptions - Streaming, Software, Gaming",
    "logo": "images/logo.svg",
    "hero_ar": "اشتراكاتك الرقمية بأفضل الأسعار",
    "hero_en": "Your Digital Subscriptions at Best Prices",
    "hero_sub_ar": "نوفر لك اشتراكات أصلية ومضمونة بأسعار منافسة مع دعم فني على مدار الساعة",
    "hero_sub_en": "We provide original & guaranteed subscriptions at competitive prices with 24/7 support"
  }'::jsonb),
  ('payment', '{
    "paypal": {"enabled": true, "link": "https://paypal.me/username", "label_ar": "باي بال", "label_en": "PayPal"},
    "stripe": {"enabled": true, "label_ar": "بطاقة ائتمان", "label_en": "Credit Card (Stripe)"},
    "whatsapp": {"enabled": true, "number": "966500000000", "label_ar": "واتساب", "label_en": "WhatsApp"},
    "crypto": {"enabled": true, "wallets": {"usdt_trc20": "TXxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "btc": "bc1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "binance_id": "123456789"}, "label_ar": "عملات رقمية", "label_en": "Cryptocurrency"}
  }'::jsonb),
  ('social', '{
    "whatsapp": "966500000000",
    "telegram": "username",
    "email": "contact@example.com"
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;

// ================================================
// SPARK STORE - INSERT SPOTIFY PRODUCTS
// Source: z2u.com
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    // ============ 🎵 Spotify Premium Individual ============
    {
      id: 'spotify-premium-individual',
      name_ar: 'سبوتيفاي بريميوم (فردي)',
      name_en: 'Spotify Premium Individual',
      description_ar: 'اشتراك سبوتيفاي بريميوم الفردي — استمع للموسيقى والبودكاست بدون إعلانات مع إمكانية التحميل للاستماع بدون إنترنت. تفعيل عالمي.',
      description_en: 'Spotify Premium Individual subscription — Listen to music and podcasts ad-free with offline playback. Global activation.',
      features_ar: 'استماع بدون إعلانات مزعجة\nتحميل الأغاني للاستماع بدون إنترنت\nجودة صوت عالية جداً\nتخطي الأغاني بدون قيود\nتفعيل على حسابك الشخصي',
      features_en: 'Ad-free music listening\nDownload songs for offline listening\nHigh-quality audio\nUnlimited skips\nActivation on your personal account',
      price: 3.99, // Starting price
      currency: 'USD',
      category: 'entertainment',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png',
      duration_ar: 'تبدأ من شهر', duration_en: 'Starting from 1 Month', 
      requirements_ar: 'تفعيل عبر الدخول للحساب (Top-up)', requirements_en: 'Account login required for activation (Top-up)',
      source_url: `${Z2U}/product-22500/Spotify-Premium-Individual-for-1-month.html`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/product-22500/Spotify-Premium-Individual-for-1-month.html` },
        { label_ar: '3 أشهر', label_en: '3 Months', price: 12.99, source_url: `${Z2U}/product-7867/Spotify-Premium-Individual-for-3-months.html` },
        { label_ar: '6 أشهر', label_en: '6 Months', price: 20.99, source_url: `${Z2U}/product-7865/Spotify-Premium-Individual-for-6-months.html` },
        { label_ar: 'سنة كاملة', label_en: '12 Months', price: 36.99, source_url: `${Z2U}/product-7866/Spotify-Premium-Individual-for-12-months.html` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 60,
      updated_at: now
    },

    // ============ 👨‍👩‍👧‍👦 Spotify Premium Family================
    {
      id: 'spotify-premium-family-invite',
      name_ar: 'سبوتيفاي بريميوم (دعوة عائلة)',
      name_en: 'Spotify Premium Family (Invite)',
      description_ar: 'انضمام لعائلة سبوتيفاي بريميوم — تمتع بكافة مزايا البريميوم عن طريق دعوة لعائلة. تفعيل عالمي سريع وبدون الحاجة لمعلومات الدخول.',
      description_en: 'Join a Spotify Premium Family — Enjoy all premium features via a family invitation. Fast global activation without needing login details.',
      features_ar: 'استماع بدون إعلانات\nتفعيل عن طريق رابط دعوة فقط (آمن جداً)\nاستماع بدون إنترنت\nتخطي الأغاني بدون قيود\nيعمل على حسابك الشخصي الحالي',
      features_en: 'Ad-free listening\nActivation via invite link only (Very safe)\nOffline listening\nUnlimited skips\nWorks on your existing personal account',
      price: 4.99, // Starting price
      currency: 'USD',
      category: 'entertainment',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png',
      duration_ar: 'تبدأ من شهر', duration_en: 'Starting from 1 Month', 
      requirements_ar: 'سيتم إرسال رابط دعوة (لا يحتاج باسورد)', requirements_en: 'Invite link will be sent (No password needed)',
      source_url: `${Z2U}/product-22503/Spotify-Premium-Family-Member-for-1-month.html`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/product-22503/Spotify-Premium-Family-Member-for-1-month.html` },
        { label_ar: '3 أشهر', label_en: '3 Months', price: 12.99, source_url: `${Z2U}/product-22502/Spotify-Premium-Family-Member-for-3-months.html` },
        { label_ar: '6 أشهر', label_en: '6 Months', price: 19.99, source_url: `${Z2U}/product-22501/Spotify-Premium-Family-Member-for-6-months.html` },
        { label_ar: 'سنة كاملة', label_en: '12 Months', price: 29.99, source_url: `${Z2U}/product-7868/Spotify-Premium-Family-Member-for-12-months.html` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 61,
      updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Spotify products...', 'color:#1db954;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log(`%c🏁 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

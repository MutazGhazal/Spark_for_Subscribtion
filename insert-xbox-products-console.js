// ================================================
// SPARK STORE - INSERT XBOX GAME PASS PRODUCTS
// Source: z2u.com (Xbox section)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// Only IN-STOCK products included (sold out items excluded)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  const products = [

    // ===== Xbox Game Pass Ultimate — 1 Month =====
    {
      id: 'xbox-game-pass-ultimate-1mo',
      name_ar: 'Xbox Game Pass Ultimate — شهر واحد',
      name_en: 'Xbox Game Pass Ultimate — 1 Month',
      description_ar: 'اشتراك Xbox Game Pass Ultimate لشهر كامل — أكثر من 100 لعبة على Xbox وWindows مع Xbox Live Gold ومزايا EA Play',
      description_en: 'Xbox Game Pass Ultimate 1-month subscription — 100+ games on Xbox & Windows with Xbox Live Gold and EA Play benefits',
      features_ar: 'أكثر من 100 لعبة متاحة فوراً\nيشمل Xbox Live Gold للعب أونلاين\nيشمل EA Play — مكتبة EA كاملة\nيعمل على Xbox One وSeries وWindows 10/11\nألعاب جديدة تُضاف كل شهر',
      features_en: '100+ games available instantly\nIncludes Xbox Live Gold for online play\nIncludes EA Play — full EA library\nWorks on Xbox One, Series & Windows 10/11\nNew games added every month',
      price: 14.99,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Xbox_logo_2012.svg/2560px-Xbox_logo_2012.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month',
      requirements_ar: 'Xbox One/Series أو Windows 10/11', requirements_en: 'Xbox One/Series or Windows 10/11',
      source_url: `${Z2U}/product-677931/Xbox-Game-Pass-Ultimate-1-Month-Subscription-Xbox-Windows-Non-stackable-valid-for-a-week-after-purchase-Key.html`,
      subscription_plans: [
        {
          label_ar: 'شهر واحد — Ultimate',
          label_en: '1 Month — Ultimate',
          price: 14.99,
          source_url: `${Z2U}/product-677931/Xbox-Game-Pass-Ultimate-1-Month-Subscription-Xbox-Windows-Non-stackable-valid-for-a-week-after-purchase-Key.html`
        }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 50,
      updated_at: now
    },

    // ===== Xbox Game Pass Ultimate — 3 Months =====
    {
      id: 'xbox-game-pass-ultimate-3mo',
      name_ar: 'Xbox Game Pass Ultimate — 3 أشهر',
      name_en: 'Xbox Game Pass Ultimate — 3 Months',
      description_ar: 'اشتراك Xbox Game Pass Ultimate لمدة 3 أشهر — الحل الأمثل للاستمتاع بمكتبة ألعاب ضخمة بسعر مميز',
      description_en: 'Xbox Game Pass Ultimate 3-month subscription — The ultimate solution to enjoy a massive game library at a great price',
      features_ar: 'أكثر من 100 لعبة متاحة فوراً\nيشمل Xbox Live Gold للعب أونلاين\nيشمل EA Play كاملاً\nيعمل على Xbox وWindows\nتوفير مقارنة بالشراء الشهري',
      features_en: '100+ games available instantly\nIncludes Xbox Live Gold for online play\nIncludes full EA Play\nWorks on Xbox and Windows\nSavings compared to monthly purchase',
      price: 50.99,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Xbox_logo_2012.svg/2560px-Xbox_logo_2012.svg.png',
      duration_ar: '3 أشهر', duration_en: '3 Months',
      requirements_ar: 'Xbox One/Series أو Windows 10/11', requirements_en: 'Xbox One/Series or Windows 10/11',
      source_url: `${Z2U}/product-11086/Xbox-Game-Pass-Ultimate-XGPU-3-Months-Xbox-Live-Key-Global.html`,
      subscription_plans: [
        {
          label_ar: 'شهر واحد',
          label_en: '1 Month',
          price: 14.99,
          source_url: `${Z2U}/product-677931/Xbox-Game-Pass-Ultimate-1-Month-Subscription-Xbox-Windows-Non-stackable-valid-for-a-week-after-purchase-Key.html`
        },
        {
          label_ar: '3 أشهر',
          label_en: '3 Months',
          price: 50.99,
          source_url: `${Z2U}/product-11086/Xbox-Game-Pass-Ultimate-XGPU-3-Months-Xbox-Live-Key-Global.html`
        },
        {
          label_ar: '12 شهر',
          label_en: '12 Months',
          price: 299.99,
          source_url: `${Z2U}/product-11293/Xbox-Game-Pass-Ultimate-XGPU-12-Months-Xbox-Live-Key-Global.html`
        }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 51,
      updated_at: now
    },

    // ===== Xbox Game Pass Essential — 1 Month =====
    {
      id: 'xbox-game-pass-essential-1mo',
      name_ar: 'Xbox Game Pass Essential — شهر واحد',
      name_en: 'Xbox Game Pass Essential — 1 Month',
      description_ar: 'الخيار الاقتصادي من Xbox Game Pass — ألعاب Xbox وPC بدون Xbox Live Gold بسعر منخفض',
      description_en: 'The budget-friendly Xbox Game Pass option — Xbox and PC games without Xbox Live Gold at a lower price',
      features_ar: 'أكثر من 100 لعبة على Xbox وPC\nبدون حاجة Xbox Live Gold\nسعر أقل من Ultimate\nيدعم Xbox One وSeries وPC\nألعاب PC via Xbox App',
      features_en: '100+ games on Xbox and PC\nNo Xbox Live Gold required\nLower price than Ultimate\nSupports Xbox One, Series and PC\nPC games via Xbox App',
      price: 11.99,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Xbox_logo_2012.svg/2560px-Xbox_logo_2012.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month',
      requirements_ar: 'Xbox One/Series أو Windows 10/11', requirements_en: 'Xbox One/Series or Windows 10/11',
      source_url: `${Z2U}/product-680256/Xbox-Game-Pass-Essential-1-Month-Key-Global.html`,
      subscription_plans: [
        {
          label_ar: 'شهر واحد — Essential',
          label_en: '1 Month — Essential',
          price: 11.99,
          source_url: `${Z2U}/product-680256/Xbox-Game-Pass-Essential-1-Month-Key-Global.html`
        }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 52,
      updated_at: now
    },

    // ===== Xbox Game Pass Premium — Trial (New Users) =====
    {
      id: 'xbox-game-pass-premium-trial',
      name_ar: 'Xbox Game Pass Premium — تجريبي (مستخدمين جدد)',
      name_en: 'Xbox Game Pass Premium — Trial (New Users)',
      description_ar: 'تجربة Xbox Game Pass Premium لمدة شهر للمستخدمين الجدد فقط — الطريقة الأرخص لتجربة المكتبة الكاملة',
      description_en: 'Xbox Game Pass Premium 1-month trial for new users only — The cheapest way to try the full library',
      features_ar: 'للمستخدمين الجدد فقط\nوصول كامل لمكتبة Premium\nيشمل EA Play وXbox Live Gold\nيشمل ألعاب السحابة (Cloud Gaming)\nأرخص طريقة لتجربة Game Pass',
      features_en: 'For new users only\nFull access to Premium library\nIncludes EA Play and Xbox Live Gold\nIncludes Cloud Gaming\nCheapest way to try Game Pass',
      price: 0.99,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Xbox_logo_2012.svg/2560px-Xbox_logo_2012.svg.png',
      duration_ar: 'شهر تجريبي', duration_en: '1 Month Trial',
      requirements_ar: 'حساب Xbox جديد فقط', requirements_en: 'New Xbox account only',
      source_url: `${Z2U}/product-872501/Xbox-Game-Pass-Premium-1-month-TRIAL-Key-GLOBAL-Only-For-New-User.html`,
      subscription_plans: [
        {
          label_ar: 'شهر تجريبي — مستخدم جديد',
          label_en: '1 Month Trial — New User',
          price: 0.99,
          source_url: `${Z2U}/product-872501/Xbox-Game-Pass-Premium-1-month-TRIAL-Key-GLOBAL-Only-For-New-User.html`
        }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 53,
      updated_at: now
    }

  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting 4 Xbox Game Pass products...', 'color:#107c10;font-size:14px;font-weight:bold');
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

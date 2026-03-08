// ================================================
// SPARK STORE - INSERT PS PLUS ESSENTIAL (12 MONTHS)
// Source: z2u.com (Ukrainian Region Deal)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  const products = [
    {
      id: 'ps-plus-essential-12mo-ua',
      name_ar: 'بلايستيشن بلس اسنشيال - 12 شهر (أوكراني)',
      name_en: 'PlayStation Plus Essential - 12 Months (Ukraine)',
      description_ar: 'اشتراك بلايستيشن بلس فئة "اسنشيال" لمدة سنة كاملة. يوفر لك أفضل قيمة مقابل السعر. ملاحظة: يتطلب حساب أوكراني (يمكن للبائع إنشاء حساب جديد لك مجاناً عند الطلب).',
      description_en: '12-month PlayStation Plus Essential subscription. Offers the best value for money. Note: Requires a Ukrainian account (seller can create a new one for free upon request).',
      features_ar: 'القدرة على اللعب أونلاين مع الأصدقاء\nألعاب مجانية شهرياً تضاف لمكتبتك\nتخفيضات إضافية وحصرية في متجر بلايستيشن\nتخزين سحابي لحفظ ألعابك\nتفعيل يدوي سريع وآمن',
      features_en: 'Online multiplayer access\nMonthly free games added to your library\nExtra exclusive discounts in PlayStation Store\nCloud storage for game saves\nFast and secure manual activation',
      price: 56.00,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PlayStation_Plus_logo.svg/2048px-PlayStation_Plus_logo.svg.png',
      duration_ar: '12 شهر (سنة كاملة)', duration_en: '12 Months (Full Year)',
      requirements_ar: 'يتطلب حساب أوكراني. التفعيل يتم عبر دخول البائع للحساب.',
      requirements_en: 'Requires a Ukrainian account. Activation is done via seller login.',
      source_url: `https://www.z2u.com/product-44283/12-Month-PlayStation-Plus-Essential-Fast-Delivery-Top-Up.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 59,
      updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting PS Plus Essential (12 Months)...', 'color:#0070d1;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
  }
  console.log(`%c🏁 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

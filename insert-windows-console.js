// ================================================
// SPARK STORE - INSERT WINDOWS 10/11 PRO KEY
// Source: z2u.com -> https://www.z2u.com/items-12966607/Windows-10-11-Pro-Key-100-Online-Activation-RETAIL-KEY-GIFT.html
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'windows-10-11-pro-key',
      name_ar: 'مفتاح تنشيط ويندوز 10/11 برو (Retail)',
      name_en: 'Windows 10/11 Pro Activation Key (Retail)',
      description_ar: 'مفتاح تنشيط أصلي ورسمي لويندوز 10 برو أو ويندوز 11 برو. نوع المفتاح Retail (يرتبط بلوحة الأم ومستقر تماماً). ينشط النظام عبر الإنترنت بنسبة 100%.',
      description_en: 'Genuine and official activation key for Windows 10 Pro or Windows 11 Pro. Retail key type (binds to motherboard and fully stable). 100% online activation.',
      features_ar: 'تفعيل أصلي 100% مدى الحياة\nيدعم ويندوز 10 برو وويندوز 11 برو\nنوع المفتاح Retail الأفضل والمستقر\nتفعيل مباشر عبر الإنترنت (بدون برامج خارجية)\nيدعم جميع اللغات والتحديثات الرسمية',
      features_en: '100% genuine lifetime activation\nSupports Windows 10 Pro and Windows 11 Pro\nStable Retail key type\nDirect online activation (no physical media)\nSupports all languages and official updates',
      price: 4.99, // Selling price
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg', // Windows logo
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', 
      requirements_ar: 'نسخة ويندوز 10/11 برو مثبتة غير مفعلة', requirements_en: 'Unactivated Windows 10/11 Pro installed',
      source_url: `${Z2U}/items-12966607/Windows-10-11-Pro-Key-100-Online-Activation-RETAIL-KEY-GIFT.html`,
      subscription_plans: [
        { label_ar: 'مفتاح Retail مدى الحياة', label_en: 'Lifetime Retail Key', price: 4.99, source_url: `${Z2U}/items-12966607/Windows-10-11-Pro-Key-100-Online-Activation-RETAIL-KEY-GIFT.html` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 36, // Next to Claude
      updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Windows Pro Key...', 'color:#0078D4;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
  }
  console.log(`%c🏁 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

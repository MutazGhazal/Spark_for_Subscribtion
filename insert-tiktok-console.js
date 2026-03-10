// ================================================
// SPARK STORE - INSERT TIKTOK COMBO OFFER
// Source: z2u.com -> https://www.z2u.com/items-11268122/TikTok-Boosting-product-title-s7LGo.html
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'tiktok-combo-offer',
      name_ar: 'باقة تيك توك الذهبية (1K متابع + لايك + مشاهدة)',
      name_en: 'TikTok Golden Combo (1K Followers + Likes + Views)',
      description_ar: 'عرض تيك توك الشامل! يتضمن 1000 متابع حقيقي، 1000 إعجاب (لايك)، و 1000 مشاهدة للفيديو الخاص بك. مثالي لبدء حسابك وزيادة التفاعل بسرعة.',
      description_en: 'Comprehensive TikTok Offer! Includes 1000 real followers, 1000 likes, and 1000 views for your video. Perfect for starting your account and boosting engagement fast.',
      features_ar: '1000 متابع لحسابك\n1000 إعجاب (لايك) على فيديو\n1000 مشاهدة على فيديو\nبدون الحاجة لكلمة المرور (آمن 100%)\nتنفيذ سريع وجودة عالية',
      features_en: '1000 followers to your account\n1000 likes on a video\n1000 views on a video\nNo password required (100% SAFE)\nFast execution and high quality',
      price: 5.99, // Selling price
      currency: 'USD',
      category: 'social',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', // TikTok logo
      duration_ar: 'تنفيذ لمرة واحدة', duration_en: 'One-time Execution', 
      requirements_ar: 'رابط حساب التيك توك\nرابط الفيديو للإعجابات والمشاهدات', requirements_en: 'TikTok Profile URL\nVideo URL for likes & views',
      source_url: `${Z2U}/items-11268122/TikTok-Boosting-product-title-s7LGo.html`,
      subscription_plans: [
        { label_ar: 'باقة التيك توك الذهبية', label_en: 'TikTok Golden Combo', price: 5.99, source_url: `${Z2U}/items-11268122/TikTok-Boosting-product-title-s7LGo.html` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 37, // Next to Windows
      updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting TikTok Combo...', 'color:#ff0050;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
  }
  console.log(`%c🏁 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

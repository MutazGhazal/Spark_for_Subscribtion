// ================================================
// SPARK STORE - INSERT GOOGLE AI PRO (GEMINI)
// Source: wmcentre.su -> https://wmcentre.su/en/item/3-mesyatsev-google-ai-pro-gemini-3-nano-banana-veo-5715896
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const WM = 'https://wmcentre.su/en';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'google-ai-pro-gemini',
      name_ar: 'اشتراك جوجل الذكاء الاصطناعي (Gemini Pro)',
      name_en: 'Google AI Pro (Gemini) Subscription',
      description_ar: 'احصل على أقوى نماذج الذكاء الاصطناعي من جوجل! يتضمن الاشتراك وصولاً إلى Gemini Advanced و Nano Banana و Veo 3، لتحليل البيانات المعقدة والمساعدة في المهام اليومية بكفاءة عالية.',
      description_en: 'Get Google\'s most powerful AI models! Subscription includes access to Gemini Advanced, Nano Banana, and Veo 3 for complex data analysis and highly efficient daily tasks assistance.',
      features_ar: 'الوصول إلى أقوى نموذج Gemini Advanced\nيتضمن أدوات إضافية مثل Nano Banana و Veo 3\nتحليل دقيق للبيانات والبرمجة وكتابة المحتوى\nتفعيل على حساب شخصي\nمساحة تخزين سحابية إضافية (حسب الخطة)',
      features_en: 'Access to the powerful Gemini Advanced model\nIncludes extra tools like Nano Banana and Veo 3\nPrecise data analysis, coding, and content writing\nActivation on a personal account\nAdditional cloud storage (varies by plan)',
      price: 9.00, // Selling price
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', // Google Gemini Logo
      duration_ar: '3 أشهر', duration_en: '3 Months', 
      requirements_ar: 'استلام معلومات الحساب الخاصة بجوجل دائمًا', requirements_en: 'Personal Google account details are provided',
      source_url: `${WM}/item/3-mesyatsev-google-ai-pro-gemini-3-nano-banana-veo-5715896`,
      subscription_plans: [
        { label_ar: 'اشتراك لمدة 3 أشهر', label_en: '3 Months Subscription', price: 9.00, source_url: `${WM}/item/3-mesyatsev-google-ai-pro-gemini-3-nano-banana-veo-5715896` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 38, // Next to TikTok
      updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Google AI Pro...', 'color:#1DA1F2;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
  }
  console.log(`%c🏁 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

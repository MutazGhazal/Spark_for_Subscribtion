// ================================================
// SPARK STORE - INSERT GRAPHICS & DESIGN PRODUCTS (2 items)
// Source: wmcentre.su → Graphics, design
// Paste this in the browser console while on the ADMIN PAGE (after login)
// NOTE: Adobe Creative Cloud + Figma already exist in DB — NOT re-added here
// ================================================
(async () => {
  const WM = 'https://wmcentre.su/en';
  const now = new Date().toISOString();
  const products = [

    // ============ 🎨 Freepik Premium ============

    {
      id: 'freepik-premium',
      name_ar: 'فريبيك بريميوم',
      name_en: 'Freepik Premium',
      description_ar: 'اشتراك Freepik Premium — وصول غير محدود لملايين الصور والتصاميم والفيديوهات والقوالب الاحترافية',
      description_en: 'Freepik Premium subscription — Unlimited access to millions of images, designs, videos and professional templates',
      features_ar: 'ملايين الصور والـ Vectors والـ PSD\nفيديوهات ورسوم متحركة قابلة للتحميل\nقوالب Instagram وYouTube احترافية\nاستخدام تجاري مرخّص بالكامل\nتنزيل غير محدود يومياً',
      features_en: 'Millions of images, vectors and PSDs\nDownloadable videos and animations\nProfessional Instagram and YouTube templates\nFully licensed for commercial use\nUnlimited daily downloads',
      price: 11.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Freepik_logo.svg/1200px-Freepik_logo.svg.png',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/freepik-premium-premium-pro-1-12-mesyatsev-5540898`,
      subscription_plans: [
        {
          label_ar: 'شهر واحد — Premium/Pro',
          label_en: '1 Month — Premium/Pro',
          price: 11.99,
          source_url: `${WM}/item/freepik-premium-premium-pro-1-12-mesyatsev-5540898`
        },
        {
          label_ar: 'شهر — محتوى كامل',
          label_en: '1 Month — Full Content',
          price: 21.99,
          source_url: `${WM}/item/freepik-fripik-kontent-podpiska-1-12-mes-4881683`
        },
        {
          label_ar: 'سنة كاملة — Premium/Pro',
          label_en: '1 Year — Premium/Pro',
          price: 99.99,
          source_url: `${WM}/item/freepik-premium-premium-pro-1-12-mesyatsev-5540898`
        }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 48,
      updated_at: now
    },

    // ============ 🎬 Motion Array ============

    {
      id: 'motion-array',
      name_ar: 'موشن آراي',
      name_en: 'Motion Array',
      description_ar: 'منصة قوالب الفيديو الاحترافية — آلاف القوالب لـ Premiere Pro وAfter Effects وDaVinci Resolve جاهزة للاستخدام',
      description_en: 'Professional video templates platform — Thousands of templates for Premiere Pro, After Effects and DaVinci Resolve ready to use',
      features_ar: 'قوالب Premiere Pro وAfter Effects\nآلاف الموسيقى والمؤثرات الصوتية المرخّصة\nإضافة Premiere Pro المدمجة\nتصدير الفيديو مباشرة من البرنامج\nترخيص تجاري كامل لكل المحتوى',
      features_en: 'Premiere Pro and After Effects templates\nThousands of licensed music and sound effects\nBuilt-in Premiere Pro plugin\nDirect video export from the software\nFull commercial license for all content',
      price: 1.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://motionarray.com/static/images/motion-array-logo.svg',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/motion-array-motionarray-file-downloader-7-30-days-3698478`,
      subscription_plans: [
        {
          label_ar: '7 أيام',
          label_en: '7 Days',
          price: 1.99,
          source_url: `${WM}/item/motion-array-motionarray-file-downloader-7-30-days-3698478`
        },
        {
          label_ar: '30 يوم',
          label_en: '30 Days',
          price: 4.99,
          source_url: `${WM}/item/motion-array-motionarray-file-downloader-7-30-days-3698478`
        }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 49,
      updated_at: now
    }

  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting 2 design products...', 'color:#ec4899;font-size:14px;font-weight:bold');
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

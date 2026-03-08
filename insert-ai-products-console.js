// ================================================
// SPARK STORE - INSERT AI PRODUCTS (NEW ONLY)
// Source: wmcentre.su
// Paste this in the browser console while on the ADMIN PAGE (after login)
// These are NEW AI products - ChatGPT Plus is already in the DB, do NOT re-add it
// ================================================
(async () => {
  const WM = 'https://wmcentre.su/en';
  const now = new Date().toISOString();
  const products = [

    // ----- 1. Claude AI Pro -----
    {
      id: 'claude-ai-pro',
      name_ar: 'كلود AI برو',
      name_en: 'Claude AI Pro',
      description_ar: 'مساعد الذكاء الاصطناعي المتقدم من Anthropic — نماذج Claude Sonnet الأحدث مع قدرات تحليل ومحادثة استثنائية',
      description_en: 'Advanced AI assistant by Anthropic — Latest Claude Sonnet models with exceptional analysis and conversation capabilities',
      features_ar: 'وصول لأحدث نماذج Claude 3.5 Sonnet\nمحادثات أطول بذاكرة موسعة\nتحليل الملفات والصور والكود\nأستجابة أسرع وأعمق تفكيراً\nخصوصية محسّنة مقارنة بالبدائل',
      features_en: 'Access to latest Claude 3.5 Sonnet models\nLonger conversations with extended memory\nFile, image and code analysis\nFaster and deeper thinking responses\nEnhanced privacy compared to alternatives',
      price: 9.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/1200px-Claude_AI_logo.svg.png',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/claudeai-pro-obschiy-akkaunt-na-1-mesyats-5167971`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${WM}/item/claudeai-pro-obschiy-akkaunt-na-1-mesyats-5167971` },
        { label_ar: '3 أشهر',  label_en: '3 Months', price: 26.99, source_url: `${WM}/item/claude-ai-4-5-sonnet-prodlenie-podpiska-1-12-mesyats-4550455` },
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 89.99, source_url: `${WM}/item/claude-ai-4-5-sonnet-prodlenie-podpiska-1-12-mesyats-4550455` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 21,
      updated_at: now
    },

    // ----- 2. Google Gemini Advanced -----
    {
      id: 'google-gemini-advanced',
      name_ar: 'جوجل Gemini Advanced',
      name_en: 'Google Gemini Advanced',
      description_ar: 'أقوى نموذج ذكاء اصطناعي من جوجل — Gemini Ultra مع Veo لتوليد الفيديو ومساحة Google Drive 2TB',
      description_en: 'Google\'s most powerful AI model — Gemini Ultra with Veo for video generation and 2TB Google Drive storage',
      features_ar: 'نموذج Gemini Ultra المتقدم\nتوليد فيديو بتقنية Veo 3\nمساحة Google Drive تصل إلى 2TB\nتكامل مع جميع خدمات جوجل\nتحليل الصور والمستندات والبيانات',
      features_en: 'Advanced Gemini Ultra model\nVideo generation with Veo 3\nGoogle Drive storage up to 2TB\nIntegration with all Google services\nImage, document and data analysis',
      price: 6.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/1200px-Google_Gemini_logo.svg.png',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/google-gemini-3-pro-veo-3-1-flow-dostup-na-1-mesyats-5280235`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${WM}/item/google-gemini-3-pro-veo-3-1-flow-dostup-na-1-mesyats-5280235` },
        { label_ar: '3 أشهر',  label_en: '3 Months', price: 18.99, source_url: `${WM}/item/3-mesyatsev-google-ai-pro-gemini-3-nano-banana-veo-5715896` },
        { label_ar: '6 أشهر', label_en: '6 Months', price: 34.99, source_url: `${WM}/item/gemini-pro-6-12-mesyatsev-veo3-nano-banana-2-tb-5665857` },
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 59.99, source_url: `${WM}/item/gemini-pro-6-12-mesyatsev-veo3-nano-banana-2-tb-5665857` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 22,
      updated_at: now
    },

    // ----- 3. Midjourney -----
    {
      id: 'midjourney',
      name_ar: 'ميدجيرني',
      name_en: 'Midjourney',
      description_ar: 'أقوى أداة لتوليد الصور بالذكاء الاصطناعي — احصل على صور فنية احترافية من وصف نصي في ثوانٍ',
      description_en: 'The most powerful AI image generation tool — Get professional artistic images from text descriptions in seconds',
      features_ar: 'توليد صور بجودة فائقة من وصف نصي\nأنماط فنية متنوعة واحترافية\nتعديل وتطوير الصور بسهولة\nإنشاء تنويعات متعددة للصورة الواحدة\nوصول عبر Discord بدون حدود',
      features_en: 'Generate ultra-quality images from text prompts\nDiverse and professional artistic styles\nEasy image editing and upscaling\nCreate multiple variations of one image\nDiscord access without limits',
      price: 5.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Midjourney_Emblem.png/800px-Midjourney_Emblem.png',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/midjourney-podpiska-bez-vhoda-midzhorni-5306937`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${WM}/item/midjourney-podpiska-bez-vhoda-midzhorni-5306937` },
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 59.99, source_url: `${WM}/catalog/access-to-resources/midjourney-107931` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 23,
      updated_at: now
    },

    // ----- 4. Perplexity AI Pro -----
    {
      id: 'perplexity-ai-pro',
      name_ar: 'بيربلكسيتي AI برو',
      name_en: 'Perplexity AI Pro',
      description_ar: 'محرك البحث الذكي الأول — إجابات دقيقة من الإنترنت مع مصادر موثوقة وقدرات GPT-4 و Claude المتكاملة',
      description_en: 'The number one smart search engine — Accurate answers from the web with verified sources and integrated GPT-4 & Claude capabilities',
      features_ar: 'بحث ذكي مع مصادر موثقة\nوصول لنماذج GPT-4 وClaude داخل الأداة\nرفع وتحليل الملفات والصور\nبحث غير محدود بدون قيود\nتصدير النتائج وحفظ المحادثات',
      features_en: 'Smart search with verified sources\nAccess to GPT-4 and Claude models within the tool\nFile and image upload and analysis\nUnlimited searches without restrictions\nExport results and save conversations',
      price: 5.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo_2024.svg',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/perplexity-ai-pro-max-1-mesyats-novyy-lichnyy-akkaunt-polnaya-garantiya-5217182`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${WM}/item/perplexity-ai-pro-max-1-mesyats-novyy-lichnyy-akkaunt-polnaya-garantiya-5217182` },
        { label_ar: 'شهر مع Comet', label_en: '1 Month + Comet', price: 7.99, source_url: `${WM}/item/perplexity-pro-comet-1-mesyats-lichnyy-akkaunt-avtomaticheskaya-dostavka-5417132` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 24,
      updated_at: now
    },

    // ----- 5. Cursor AI Pro -----
    {
      id: 'cursor-ai-pro',
      name_ar: 'كيرسور AI برو',
      name_en: 'Cursor AI Pro',
      description_ar: 'محرر الكود الذكي المدعوم بالـ AI — اكتب وحرر وأصلح الكود بمساعدة GPT-4 وClaude مباشرة في المحرر',
      description_en: 'AI-powered code editor — Write, edit and fix code with GPT-4 and Claude assistance directly in the editor',
      features_ar: 'كود برمجي بمساعدة AI مباشرة\nيدعم GPT-4 وClaude وسوناً للبرمجة\nاكتمال الكود التلقائي المتقدم\nتصحيح الأخطاء وشرح الكود\nتحرير الملفات المتعددة دفعة واحدة',
      features_en: 'AI-assisted code directly in editor\nSupports GPT-4, Claude and Sonnet for coding\nAdvanced autocomplete for code\nBug fixing and code explanation\nMulti-file editing at once',
      price: 7.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://cursor.sh/brand/CursorComIcon.svg',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/cursor-pro-premium-dostup-na-1-mesyats-vasha-uchetnaya-5414738`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 7.99, source_url: `${WM}/item/cursor-pro-premium-dostup-na-1-mesyats-vasha-uchetnaya-5414738` },
        { label_ar: 'شهر Pro+', label_en: '1 Month Pro+', price: 11.99, source_url: `${WM}/item/cursor-pro-1-mesyats-pro-plus-lichnyy-akkaunt-5567961` },
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 79.99, source_url: `${WM}/item/cursor-ai-pro-12-mesyatsev-5443941` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 25,
      updated_at: now
    }

  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting 5 AI products...', 'color:#a78bfa;font-size:14px;font-weight:bold');
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

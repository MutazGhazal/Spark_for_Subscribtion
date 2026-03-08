// ================================================
// SPARK STORE - INSERT MISC PRODUCTS (12 items)
// Source: wmcentre.su → Access to Resources
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const WM = 'https://wmcentre.su/en';
  const now = new Date().toISOString();
  const products = [

    // ============ 🤖 ذكاء اصطناعي إضافي ============

    {
      id: 'deepseek-api',
      name_ar: 'ديب سيك API',
      name_en: 'DeepSeek API',
      description_ar: 'حساب DeepSeek Router برصيد $5 ومفتاح API — أقوى نموذج AI صيني مفتوح المصدر بتكلفة منخفضة جداً',
      description_en: 'DeepSeek Router account with $5 balance and API key — The most powerful open-source Chinese AI model at very low cost',
      features_ar: 'رصيد $5 جاهز للاستخدام الفوري\nمفتاح API لتكامل التطبيقات\nنموذج DeepSeek R1 المتقدم\nتكلفة أقل بكثير من GPT-4\nمثالي للمطورين والبرمجة',
      features_en: 'Ready $5 balance for immediate use\nAPI key for application integration\nAdvanced DeepSeek R1 model\nMuch lower cost than GPT-4\nPerfect for developers and coding',
      price: 5.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/DeepSeek_logo.svg/1200px-DeepSeek_logo.svg.png',
      duration_ar: '', duration_en: '', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/deepseek-router-akkaunt-s-balansom-5-i-api-klyuchom-5652084`,
      subscription_plans: [
        { label_ar: 'رصيد $5 + API', label_en: '$5 Balance + API Key', price: 5.99, source_url: `${WM}/item/deepseek-router-akkaunt-s-balansom-5-i-api-klyuchom-5652084` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 38,
      updated_at: now
    },

    {
      id: 'lovable-ai-pro',
      name_ar: 'Lovable AI برو',
      name_en: 'Lovable AI Pro',
      description_ar: 'أداة بناء التطبيقات بالذكاء الاصطناعي — حوّل أفكارك لتطبيقات ويب كاملة بمجرد وصف ما تريد',
      description_en: 'AI app builder tool — Turn your ideas into full web applications by simply describing what you want',
      features_ar: 'بناء تطبيقات ويب كاملة بالذكاء الاصطناعي\nواجهة مستخدم تلقائية وكود جاهز\nتكامل مع قواعد البيانات والـ APIs\nنشر فوري للتطبيق\nمثالي بدون خبرة برمجية',
      features_en: 'Build full web apps with AI\nAutomatic UI and ready-to-use code\nIntegration with databases and APIs\nInstant app deployment\nPerfect without coding experience',
      price: 3.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://lovable.dev/favicon.ico',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/lovable-ai-pro-1-mesyatsa-aktivatsiya-na-vash-akkaunt-5643709`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${WM}/item/lovable-ai-pro-1-mesyatsa-aktivatsiya-na-vash-akkaunt-5643709` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 39,
      updated_at: now
    },

    // ============ 💻 برمجة وأدوات مطورين ============

    {
      id: 'github-copilot-pro',
      name_ar: 'GitHub Copilot Pro',
      name_en: 'GitHub Copilot Pro',
      description_ar: 'مساعد كتابة الكود الأفضل بالذكاء الاصطناعي من GitHub — يقترح الكود ويكمله تلقائياً في محرر الكود',
      description_en: 'The best AI code writing assistant from GitHub — Suggests and auto-completes code directly in your code editor',
      features_ar: 'إكمال الكود التلقائي بالذكاء الاصطناعي\nيدعم Python وJS وTypeScript وغيرها\nمقترحات ذكية للدوال والكلاسات\nتكامل مع VS Code وJetBrains\nيعمل مع أي لغة برمجية',
      features_en: 'AI-powered automatic code completion\nSupports Python, JS, TypeScript and more\nSmart function and class suggestions\nIntegration with VS Code and JetBrains\nWorks with any programming language',
      price: 6.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://github.githubassets.com/assets/copilot-dc872f8-6bce1bbf0.png',
      duration_ar: '', duration_en: '', requirements_ar: 'حساب GitHub', requirements_en: 'GitHub account',
      source_url: `${WM}/item/github-copilot-pro-chastnyy-akkaunt-na-1-mesyats-5304711`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${WM}/item/github-copilot-pro-chastnyy-akkaunt-na-1-mesyats-5304711` },
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 61.99, source_url: `${WM}/item/github-copilot-pro-na-12-mesyatsev-na-vashu-elektronnuyu-poch-5437132` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 40,
      updated_at: now
    },

    {
      id: 'github-student-pack',
      name_ar: 'باقة GitHub للطلاب',
      name_en: 'GitHub Student Developer Pack',
      description_ar: 'الباقة الذهبية للطلاب من GitHub — Copilot Pro مجاناً مع عشرات الأدوات التطويرية المجانية',
      description_en: 'GitHub\'s golden student package — Free Copilot Pro with dozens of free developer tools',
      features_ar: 'GitHub Copilot Pro مجاناً\nعشرات الأدوات التطويرية المجانية\nاستضافة مجانية وأدوات DevOps\nقواعد بيانات وـ APIs مجانية\nلمدة 6 أشهر للطلاب',
      features_en: 'Free GitHub Copilot Pro\nDozens of free developer tools\nFree hosting and DevOps tools\nFree databases and APIs\n6 months for students',
      price: 18.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://github.githubassets.com/assets/copilot-dc872f8-6bce1bbf0.png',
      duration_ar: '6 أشهر', duration_en: '6 Months', requirements_ar: 'حساب GitHub', requirements_en: 'GitHub account',
      source_url: `${WM}/item/paket-razrabotchika-github-dlya-studentov-pro-copilot-6-m-5653994`,
      subscription_plans: [
        { label_ar: '6 أشهر + Copilot', label_en: '6 Months + Copilot', price: 18.99, source_url: `${WM}/item/paket-razrabotchika-github-dlya-studentov-pro-copilot-6-m-5653994` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 41,
      updated_at: now
    },

    {
      id: 'figma-pro',
      name_ar: 'فيغما برو',
      name_en: 'Figma Pro',
      description_ar: 'أفضل أداة تصميم UI/UX تعاوني — صمم واجهات المستخدم وانشر التصاميم مع فريقك في الوقت الحقيقي',
      description_en: 'The best collaborative UI/UX design tool — Design user interfaces and share designs with your team in real-time',
      features_ar: 'تصميم واجهات UI/UX احترافية\nتعاون مع الفريق في الوقت الحقيقي\nنماذج تفاعلية وـ Prototypes\nمكتبة مكونات قابلة للمشاركة\nتصدير للمطورين بدقة عالية',
      features_en: 'Professional UI/UX interface design\nReal-time team collaboration\nInteractive mockups and prototypes\nSharable component library\nHigh-precision developer export',
      price: 16.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png',
      duration_ar: '6 أشهر', duration_en: '6 Months', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/figma-pro-6-mesyatsev-support-garantiya-avto-dostavka-4529540`,
      subscription_plans: [
        { label_ar: '6 أشهر', label_en: '6 Months', price: 16.99, source_url: `${WM}/item/figma-pro-6-mesyatsev-support-garantiya-avto-dostavka-4529540` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 42,
      updated_at: now
    },

    // ============ 📚 تعليم ============

    {
      id: 'coursera-plus',
      name_ar: 'كورسيرا بلاس',
      name_en: 'Coursera Plus',
      description_ar: 'اشتراك كورسيرا بلاس لسنة كاملة — وصول غير محدود لآلاف الدورات من أفضل الجامعات والشركات العالمية',
      description_en: 'Full year Coursera Plus subscription — Unlimited access to thousands of courses from top universities and companies worldwide',
      features_ar: 'وصول لأكثر من 7000 دورة وشهادة\nدورات من Google وMeta وIBM وغيرها\nشهادات معتمدة من جامعات عالمية\nتعلم بالسرعة التي تناسبك\nشهادة مهنية قابلة للإضافة لـ LinkedIn',
      features_en: 'Access to 7000+ courses and certificates\nCourses from Google, Meta, IBM and more\nCertificates from world-class universities\nLearn at your own pace\nProfessional certificate shareable to LinkedIn',
      price: 4.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/coursera-plus-1-god-na-vash-lichnyy-email-5655851`,
      subscription_plans: [
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 4.99, source_url: `${WM}/item/coursera-plus-1-god-na-vash-lichnyy-email-5655851` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 43,
      updated_at: now
    },

    // ============ 🎥 إنتاجية واجتماعات ============

    {
      id: 'zoom-one-pro',
      name_ar: 'زووم Pro',
      name_en: 'Zoom One Pro',
      description_ar: 'اشتراك Zoom Pro — اجتماعات غير محدودة حتى 30 ساعة مع 100 مشارك بدون انقطاع',
      description_en: 'Zoom Pro subscription — Unlimited meetings up to 30 hours with 100 participants without interruptions',
      features_ar: 'اجتماعات تصل لـ 30 ساعة متواصلة\nحتى 100 مشارك في الاجتماع\nتسجيل الاجتماعات على السحابة\nلوحة بيضاء تعاونية\nمشاركة الشاشة بجودة عالية',
      features_en: 'Meetings up to 30 continuous hours\nUp to 100 meeting participants\nCloud meeting recording\nCollaborative whiteboard\nHigh-quality screen sharing',
      price: 6.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Zoom_Logo_2022.svg/2560px-Zoom_Logo_2022.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/zoom-one-pro-to-your-account-own-mail-1-month-4149233`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${WM}/item/zoom-one-pro-to-your-account-own-mail-1-month-4149233` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 44,
      updated_at: now
    },

    // ============ 🌐 أدوات إنترنت ============

    {
      id: 'tradingview-premium',
      name_ar: 'تريدينج فيو بريميوم',
      name_en: 'TradingView Premium',
      description_ar: 'منصة التحليل الفني والمالي الأفضل في العالم — تتبع الأسهم والعملات المشفرة بأدوات احترافية متقدمة',
      description_en: 'The world\'s best technical and financial analysis platform — Track stocks and crypto with advanced professional tools',
      features_ar: 'رسوم بيانية متقدمة بمئات المؤشرات\nتنبيهات الأسعار الفورية\nمتابعة الأسهم والعملات والفوركس\nتحليل فني احترافي\nبيانات فورية بدون تأخير',
      features_en: 'Advanced charts with hundreds of indicators\nReal-time price alerts\nTrack stocks, crypto and forex\nProfessional technical analysis\nReal-time data without delay',
      price: 16.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/TradingView_Logo.svg/1200px-TradingView_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/tradingview-premium-30-dney-original-garantiya-5092318`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 16.99, source_url: `${WM}/item/tradingview-premium-30-dney-original-garantiya-5092318` },
        { label_ar: 'خطط متعددة', label_en: 'Multiple Plans', price: 16.99, source_url: `${WM}/item/tradingview-treyding-podpiska-1-12-mes-bystro-4904446` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 45,
      updated_at: now
    },

    {
      id: 'deepl-pro',
      name_ar: 'ديب إل برو',
      name_en: 'DeepL Pro',
      description_ar: 'أفضل مترجم ذكاء اصطناعي في العالم — ترجمة احترافية تتفوق على Google Translate في الدقة والطبيعية',
      description_en: 'The world\'s best AI translator — Professional translation that surpasses Google Translate in accuracy and naturalness',
      features_ar: 'ترجمة فائقة الدقة بالذكاء الاصطناعي\nيدعم أكثر من 30 لغة\nترجمة الملفات Word وPDF كاملة\nـ API للتكامل مع التطبيقات\nترجمة غير محدودة بدون حدود',
      features_en: 'Ultra-accurate AI translation\nSupports 30+ languages\nFull Word and PDF file translation\nAPI for application integration\nUnlimited translation without limits',
      price: 4.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/DeepL_logo.svg/1200px-DeepL_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/deepl-team-write-pro-1-mesyats-lichnyy-akkaunt-5592026`,
      subscription_plans: [
        { label_ar: 'شهر — Team + Write Pro', label_en: '1 Month — Team + Write Pro', price: 4.99, source_url: `${WM}/item/deepl-team-write-pro-1-mesyats-lichnyy-akkaunt-5592026` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 46,
      updated_at: now
    },

    {
      id: 'capcut-pro',
      name_ar: 'كاب كت برو',
      name_en: 'CapCut Pro',
      description_ar: 'تطبيق تعديل الفيديو الأشهر عالمياً — أدوات AI لتعديل الفيديوهات باحترافية مثيرة للإعجاب',
      description_en: 'The world\'s most popular video editing app — AI tools for impressively professional video editing',
      features_ar: 'تحرير فيديو احترافي بالذكاء الاصطناعي\nإزالة الخلفية تلقائياً من الفيديو\nقوالب ترندينج جاهزة\nتأثيرات وفلاتر غير محدودة\nتصدير بجودة 4K',
      features_en: 'Professional AI-powered video editing\nAutomatic background removal from video\nReady trending templates\nUnlimited effects and filters\n4K quality export',
      price: 2.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/CapCut_Logo.svg/1200px-CapCut_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/capcut-pro-1-mesyats-chastnaya-dostavka-mgnovennaya-dosta-5682759`,
      subscription_plans: [
        { label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${WM}/item/capcut-pro-1-mesyats-chastnaya-dostavka-mgnovennaya-dosta-5682759` },
        { label_ar: '3 أشهر — Team', label_en: '3 Months — Team', price: 6.99, source_url: `${WM}/item/capcut-team-plan-1-3-mesyats-5608841` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 47,
      updated_at: now
    }

  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting 10 misc products...', 'color:#f59e0b;font-size:14px;font-weight:bold');
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

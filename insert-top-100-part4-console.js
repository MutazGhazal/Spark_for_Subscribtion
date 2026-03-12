// ================================================
// SPARK STORE - INSERT TOP 100 SUBSCRIPTIONS (PART 4: 76-100)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'renderforest', name_ar: 'رندر فورست', name_en: 'Renderforest',
      description_ar: 'أداة لصناعة الفيديوهات المتحركة، والمقدمات Intro، والشعارات والمواقع بثوانٍ معدودة بجودة فائقة.',
      description_en: 'An all-in-one tool to create animated videos, Intro templates, logos and websites in seconds with ultra quality.',
      features_ar: 'آلاف القوالب للمقدمات والموشن جرافيك\nمكتبة ضخمة لإنشاء الشعارات بسرعة\nتصدير عالي الجودة وبدون علامات مائية',
      features_en: 'Thousands of Intros and motion graphics templates\nHuge library for rapid custom logo designs\nHigh quality renders with zero watermarking',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Renderforest_Logo_2022.svg/1024px-Renderforest_Logo_2022.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/renderforest`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/renderforest` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 176, updated_at: now
    },
    {
      id: 'vexels', name_ar: 'فيكسلز', name_en: 'Vexels',
      description_ar: 'المنصة المثالية لمصممي القمصان والـ Print-on-Demand! ملايين الرسوميات الجاهزة والقابلة للتعديل والمربحة.',
      description_en: 'The ideal platform for Merch & Print-on-Demand designers! Millions of ready, modifiable and profitable graphics.',
      features_ar: 'ملايين التصاميم المفرغة للطباعة (PNG/SVG)\nاستخدام تراخيص تجارية مرنة لـ Merch\nأدوات خاصة داخل الموقع لصناعة التيشيرتات',
      features_en: 'Millions of print-ready designs (PNG/SVG)\nFlexible commercial Merch/POD licenses\nOnline specific tools for T-shirt crafting',
      price: 9.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://cdn.vexels.com/favicon.ico',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/vexels`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/vexels` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 177, updated_at: now
    },
    {
      id: 'storyblocks', name_ar: 'ستوري بلوكس', name_en: 'Storyblocks',
      description_ar: 'مكتبة مخزون لا نهائي لملايين الفيديوهات والخلفيات والمؤثرات الصوتية والموسيقية (Royalty-free).',
      description_en: 'Infinite stock library of millions of videos, footages, sound effects and royalty-free soundtracks.',
      features_ar: 'تحميل غیر محدود لـ الفيديوهات والمقاطع 4K\nترخيص حقوق تجارية لليوتيوب واعلانات\nتكامل مباشر لمقاطع الأفتر افكت والبريمير',
      features_en: 'Unlimited downloads for 4K video footages\nCommercial license for YouTube and advertisers\nDirect After Effects & Premiere integrations',
      price: 15.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Storyblocks_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/storyblocks`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 15.99, source_url: `${Z2U}/storyblocks` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 178, updated_at: now
    },
    {
      id: 'epidemic-sound', name_ar: 'إيبديميك ساوند', name_en: 'Epidemic Sound',
      description_ar: 'اشترك واحصل على موسيقى ومؤثرات صوتية عالمية لقناتك بدون أي مطالبات حقوق (Copyright Strikes).',
      description_en: 'Subscribe and get world-class music and sound effects for your channels without any copyright strikes.',
      features_ar: 'ربط قنواتك الاجتماعية لحمايتها من الـ Strikes\nتنزيل مقطوعات وأجزائها المفصّلة (Stems)\nمجموعة استثنائية من الموسيقى لكل المزاجات',
      features_en: 'Link social channels to protect from strikes\nDownload entire tracks or separated stems\nExceptional collection covering every emotion',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Epidemic_Sound_logo_black.svg/1024px-Epidemic_Sound_logo_black.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'رابط القناة للاشتراك', requirements_en: 'Channel link to whitelist',
      source_url: `${Z2U}/epidemic`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/epidemic` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 179, updated_at: now
    },
    {
      id: 'udemy-personal', name_ar: 'أوديمي الخطة الشخصية', name_en: 'Udemy Personal Plan',
      description_ar: 'أكثر من 8,000 دورة تدريبية رائدة في مجالات التقنية والبرمجة والتطوير المهني في اشتراك واحد مفتوح.',
      description_en: 'Access over 8,000 top-rated courses in tech, programming, and professional skills in one open subscription.',
      features_ar: 'الآلاف من الكورسات في البرمجة وادارة الاعمال\nمسارات تعليمية جاهزة وتدريب وشهادات اكمال\nمشاهدة وتحميل الفيديوهات للدراسة بصيغة أوفلاين',
      features_en: 'Thousands of programming and business courses\nPrepared learning paths and completion certificates\nView and download videos for offline studying',
      price: 13.99, currency: 'USD', category: 'education', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/1024px-Udemy_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب جديد', requirements_en: 'New Account',
      source_url: `${Z2U}/udemy`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 13.99, source_url: `${Z2U}/udemy` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 180, updated_at: now
    },
    {
      id: 'skillshare-premium', name_ar: 'سكيل شير بريميوم', name_en: 'Skillshare Premium',
      description_ar: 'اكتشف آلاف الفصول الدراسية في مجالات الإبداع، مثل التصميم والتصوير والفنون والحرف وحتى ريادة الأعمال.',
      description_en: 'Discover thousands of creative classes like design, photography, arts, crafts and even entrepreneurship.',
      features_ar: 'وصول لا محدود لكامل كتالوج حصص المنصة\nمشاريع تطبيقية في نهاية كل دورة تدريبية\nمدربين مشاهير مبدعين في مجالات العمل',
      features_en: 'Unlimited access to the entire streaming catalog\nPractical applied projects closing every course\nCreative celebrities and experienced trainers',
      price: 6.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Skillshare_logo_2020.svg/1024px-Skillshare_logo_2020.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/skillshare`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/skillshare` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 181, updated_at: now
    },
    {
      id: 'babbel-premium', name_ar: 'بابل (لتعلم اللغات)', name_en: 'Babbel Premium',
      description_ar: 'تطبيق تعليم لغات تفاعلي، يركز على المحادثات اليومية والنطق الصحيح لتعلم لغتك المفضلة بفترة قصيرة.',
      description_en: 'Interactive language learning app, focusing on daily conversations and clear pronunciations effectively.',
      features_ar: 'دروس تفاعلية قصيرة، 10 إلى 15 دقيقة يومياً\nميزة التعرف على الصوت للتدرب على نطقك\nيشمل 14 لغة وتطوير لتمكن المحادثة',
      features_en: 'Bite-sized interactive lessons around 10-15 mins\nVoice recognition tools to practice pronunciation\nIncludes 14 languages pushing real fluency',
      price: 5.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Babbel_logo.svg/1024px-Babbel_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/babbel`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/babbel` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 182, updated_at: now
    },
    {
      id: 'rosetta-stone', name_ar: 'حجر رشيد (لتعلم اللغات)', name_en: 'Rosetta Stone',
      description_ar: 'تعلم لغات بطريقة الانغماس الفطري (بالصور والصوت فقط)، برنامج حائز على جوائز متوفر الآن كاشتراك.',
      description_en: 'Learn languages using pure instinctual immersion (images & sounds only), an award-winning program.',
      features_ar: 'لا ترجمات (يعتمد على العقل والصور 100%)\nتقنية تحليل نطق TrueAccent الأفضل عالميا\nلغاية 25 لغة متاحة للتعلم',
      features_en: 'No translations (relies on memory & pictures 100%)\nWorld-class TrueAccent pronunciation analysis\nUp to 25 accessible diverse languages',
      price: 7.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Rosetta_Stone_Inc._logo.svg/1024px-Rosetta_Stone_Inc._logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/rosetta`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 7.99, source_url: `${Z2U}/rosetta` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 183, updated_at: now
    },
    {
      id: 'busuu-premium', name_ar: 'بوسو بريميوم', name_en: 'Busuu Premium',
      description_ar: 'طريقة اجتماعية لتعلم اللغات — دردش مع متحدثين أصليين، واحصل على تصحيحات لتمارينك المكتوبة والمنطوقة.',
      description_en: 'Social language learning — chat with native speakers and get corrections for your written & audio exercises.',
      features_ar: 'شهادات لغوية رسمية من McGraw Hill عند الاتمام\nخطة دراسة شخصية مصممة خصيصا لأهدافك\nمجتمع لممارسة اللغة والتصحيحات المتبادلة',
      features_en: 'Official McGraw Hill certifications upon finishing\nPersonalized study plan mapped out for goals\nCommunity practice with mutual corrections',
      price: 4.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Busuu_logo.svg/1024px-Busuu_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/busuu`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/busuu` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 184, updated_at: now
    },
    {
      id: 'chegg-study', name_ar: 'خدمة تشيج الدراسية', name_en: 'Chegg Study',
      description_ar: 'خدمة مساعدة ومساندة دراسية ضخمة توفر حلول مفصلة للكتب المدرسية والإجابة عن أسئلة الواجبات المعقدة.',
      description_en: 'A massive study assistance service delivering textbook solutions and step-by-step answers to complex homework.',
      features_ar: 'شروحات وحلول خطوة بخطوة للكتب الجامعية\nأسأل الخبراء للحصول على إجابات في خلال ساعات\nالالاف من مقاطع الفيديو التوضيحية',
      features_en: 'Step-by-step solutions and answers for textbooks\nAsk Experts explicitly for answers within hours\nThousands of clear demonstrative videos',
      price: 9.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chegg_logo.svg/1024px-Chegg_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب جديد', requirements_en: 'New Account',
      source_url: `${Z2U}/chegg`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/chegg` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 185, updated_at: now
    },
    {
      id: 'quizlet-plus', name_ar: 'كويزلت بلس', name_en: 'Quizlet Plus',
      description_ar: 'الأداة الدراسية الأولى عالميا للبطاقات التعليمية Flashcards! تخلص من الإعلانات واِدرس أوفلاين كليا.',
      description_en: 'The world\'s #1 study tool for flashcards! Ditch the ads and study totally offline smoothly.',
      features_ar: 'مساعد ذكي للتعليم المخصص من Quizlet\nتخزين البطاقات وحفظها للاستخدام الأوفلاين\nبدون الاعلانات والتشتت اثناء المذاكرة',
      features_en: 'Quizlet smart personalized learning assistant\nStore and retain cards explicitly offline\nTotal ad removal avoiding studying distractions',
      price: 3.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Quizlet_logo.png/1024px-Quizlet_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/quizlet`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/quizlet` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 186, updated_at: now
    },
    {
      id: 'masterclass', name_ar: 'ماستر كلاس', name_en: 'MasterClass',
      description_ar: 'تعلم من الأفضل في العالم! دورات سينمائية مبهرة يقدمها خبراء ومشاهير العالم في الطبخ والإخراج والتمثيل.',
      description_en: 'Learn from the absolute best! Phenomenal cinematic courses taught by celebrities in cooking, directing, and acting.',
      features_ar: 'مشرحة ومقدمة من اساطير ومشاهير المجالات\nجودة الفيديوهات وتصوير سينمائي فخم\nمرفق كتيّبات PDF وملخصات مطبوعة للحصص',
      features_en: 'Taught exclusively by respective industry legends\nExceptional luxury cinematic video quality\nAttached PDF workbooks and printed summaries',
      price: 11.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/MasterClass_logo.svg/1024px-MasterClass_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/masterclass`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 11.99, source_url: `${Z2U}/masterclass` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 187, updated_at: now
    },
    {
      id: 'brilliant-premium', name_ar: 'بريليانت بريميوم', name_en: 'Brilliant Premium',
      description_ar: 'أفضل منصة تفاعلية لتعلم الرياضيات، الذكاء الاصطناعي، وعلوم الحاسب والفيزياء بطريقة الألغاز والألعاب المبهرة.',
      description_en: 'The top interactive platform teaching math, AI, physics & CS primarily through puzzles and visually stunning games.',
      features_ar: 'آلاف الدروس التفاعلية القصيرة الممتعة بشكل ألعاب\nتغطية تشمل الذكاء الاصطناعي وعلوم الخوارزميات\nمنهج مناسب من المبتدئ إلى الخبير',
      features_en: 'Thousands of bite-sized interactive game-like lessons\nCovering trending AI and complex algorithms strictly\nCurriculum ranging nicely from beginner up to expert',
      price: 6.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Brilliant_Logo.svg/1024px-Brilliant_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/brilliant`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/brilliant` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 188, updated_at: now
    },
    {
      id: 'pluralsight', name_ar: 'بلورال سايت', name_en: 'Pluralsight',
      description_ar: 'دليلك الشامل لتعلم وتطوير مهارات التكنولوجيا وسحب البيانات و DevOps — مصمم للمحترفين في الـ IT.',
      description_en: 'Your comprehensive guide to mature tech skills, data engineering and DevOps — strictly built for IT professionals.',
      features_ar: 'آلاف الدورات المتقدمة في الـ IT والـ DevOps\nشهادات وتقييمات للمهارات البرمجية الـ Skill IQ\nإعداد للاختبارات وشهادات الـ IT العالمية',
      features_en: 'Thousands of advanced IT and DevOps courses\nSkill IQ assessments verifying coding capabilities\nCertifications and tests preparation for global IT exams',
      price: 12.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Pluralsight_Logo.svg/1024px-Pluralsight_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/pluralsight`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 12.99, source_url: `${Z2U}/pluralsight` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 189, updated_at: now
    },
    {
      id: 'datacamp', name_ar: 'داتَا كامب', name_en: 'Datacamp',
      description_ar: 'تعلم علم البيانات، والإحصاء، ولغات البرمجة (Python، R، SQL) مباشرة واكتب الأكواد بالمتصفح.',
      description_en: 'Learn Data Science, statistics, and languages (Python, R, SQL) functionally right in your browser.',
      features_ar: 'أكثر من 350 دورة متخصصة بعلوم البيانات فقط\nكتابة وتطبيق الأكواد التفاعلية مباشرة في الصفحة\nمسارات مهنية جاهزة (Data Analyst/Scientist)',
      features_en: 'Over 350 dedicated exclusive data science courses\nWrite and execute codes interactively right away\nReadied career tracks (Data Analyst/Scientist)',
      price: 8.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/DataCamp_Logo.svg/1024px-DataCamp_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/datacamp`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/datacamp` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 190, updated_at: now
    },
    {
      id: 'codecademy-pro', name_ar: 'كود أكاديمي برو', name_en: 'Codecademy Pro',
      description_ar: 'تعلم البرمجة خطوة بخطوة باللغة والأدوات الحديثة واكتسب مهارة الحصول على وظيفة مهنية فوراً.',
      description_en: 'Learn programming step-by-step applying modern tools building practical skills to land jobs instantly.',
      features_ar: 'مسارات مهنية متكاملة لتأسيسك لسوق العمل\nمشاريع وتطبيقات واقعية للتدرب برمجياً\nشهادات إتمام والتدرب لمقابلات العمل',
      features_en: 'Full Career Paths structuring you for the market\nReal-world projects to train programming muscle\nCompletion certificates and job interviews prep',
      price: 8.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Codecademy_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/codecademy`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/codecademy` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 191, updated_at: now
    },
    {
      id: 'expressvpn', name_ar: 'إكسبرس في بي إن', name_en: 'ExpressVPN',
      description_ar: 'أسطورة الـ VPN! يوفر اتصال سريع بشكل جنوني، مع تشفير قوي وتجاوز حجب معظم المواقع (بما فيها نتفلكس).',
      description_en: 'The VPN Legend! Grants insanely fast connections, strong encryption bypassing most restrictions (inc. Netflix).',
      features_ar: 'سرعة خرافية وحماية متقدمة غير قابلة للاختراق\nخوادم موزعة في 94 دولة واسعة\nيفتح مكتبات نتفلكس وباقي منصات البث بثبات',
      features_en: 'Insane speeds combined alongside impenetrable protections\nWide server network distributed across 94 countries\nUnblocks Netflix libraries & streaming sites reliably',
      price: 5.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/ExpressVPN_logo.svg/1024px-ExpressVPN_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/expressvpn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/expressvpn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 192, updated_at: now
    },
    {
      id: 'surfshark', name_ar: 'سيرف شارك VPN', name_en: 'Surfshark VPN',
      description_ar: 'تصفح بأمان وغير موقعك لأكثر من 100 دولة في نفس الوقت واستخدمه على عدد غير محدود من الأجهزة!',
      description_en: 'Browse safely masking location over 100 countries simultaneously covering an unlimited number of devices!',
      features_ar: 'تثبيت الأجهزة في آن واحد وبدون حدود أجهزة للمستخدمين\nمانع إعلانات CleanWeb للحماية المدمجة المفرطة\nتجاوز حظر الـ Geo-restrictions بسرعة قوية للحسابات',
      features_en: 'Simultaneous installs allowing unlimited devices thoroughly\nCleanWeb ad blocker maintaining excessive built-in safety\nBypass Geo-restrictions featuring robust consistent speeds',
      price: 3.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Surfshark_logo_small.png/1024px-Surfshark_logo_small.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/surfshark`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/surfshark` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 193, updated_at: now
    },
    {
      id: 'cyberghost-vpn', name_ar: 'سايبر جوست VPN', name_en: 'CyberGhost VPN',
      description_ar: 'شبكة خوادم مخصصة للتنزيل (التورنت) وتخطي القيود، و خوادم متخصصة لمنصات العاب والألعاب الأونلاين (Gaming).',
      description_en: 'Specialized server network meant mainly for torrenting/evasions and servers customized primarily for online gaming.',
      features_ar: 'وصول لمزامنة اتصال سريعة مع P2P / Torrents\nخوادم منفصلة للـ Streaming أو Gaming وتخفيف البنجر\nيغطي 9110 خادم عالمي',
      features_en: 'Grants access specifically to quick P2P / Torrents syncing\nSeparated gaming/streaming servers reducing Ping latency\nBoasts approximately 9110 global nodes natively',
      price: 3.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CyberGhost_VPN_logo.png/1024px-CyberGhost_VPN_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/cyberghost`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/cyberghost` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 194, updated_at: now
    },
    {
      id: 'ipvanish', name_ar: 'آي بي فانيش', name_en: 'IPVanish',
      description_ar: 'خيار ممتاز لمستخدمي التورنت وأجهزة الـ Amazon Fire Stick ومحبي البث لأنه يوفر سرعات عالية وثابتة جدا.',
      description_en: 'An excellent choice targeting Torrent users/Amazon Fire Stick fans bringing immensely stabilized speeds.',
      features_ar: 'عدم حفظ أي سجلات أو ملفات مستخدمين Strictly No-Logs\nإمكانيات غير مقيدة لحجم نقل البيانات للأجهزة والتورنت\nدعم ممتاز لتلفزيونات وادوات أندرويد بوكس',
      features_en: 'Strictly No-Logs policy keeping zero user data/files\nUncapped bandwidth ceilings handling Torrents/Devices reliably\nExtensive excellent support accommodating Android TV boxes',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/IPVanish_Logo.svg/1024px-IPVanish_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/ipvanish`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/ipvanish` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 195, updated_at: now
    },
    {
      id: 'purevpn', name_ar: 'بيور في بي إن', name_en: 'PureVPN',
      description_ar: 'خدمة VPN اقتصادية وحاصلة على مراجعات ممتازة في تخطي الرقابة ومنح الخصوصية لكافة الأجهزة الأساسية.',
      description_en: 'A budget-friendly VPN earning excellent reviews defeating censorship securing privacy among all primary devices.',
      features_ar: 'أسعار رخيصة و جودة ممتازة مقارنة بالسعر للعملاء\nآلاف الخوادم و IP مخصص Dedicated IP إذا اردت\nحماية ضد التسرب عبر منافذ WebRTC/IPv6 وتسريب الاتصال',
      features_en: 'Affordable pricing ensuring stellar bang-for-your-buck value natively\nThousands of servers offering Dedicated IPs optionally\nDefense strictly blocking WebRTC/IPv6 leaks preventing exposure',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/PureVPN_Logo_With_Icon.svg/1024px-PureVPN_Logo_With_Icon.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/purevpn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${Z2U}/purevpn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 196, updated_at: now
    },
    {
      id: 'telegram-premium', name_ar: 'تيليجرام بريميوم', name_en: 'Telegram Premium',
      description_ar: 'ضاعف مقاسات وحدود التلجرام! ارفع ملفات حتى 4 جيجا، حمل بسرعات قصوى وحصّل بادج بريميوم الخاص.',
      description_en: 'Double Telegram boundaries! Upload larger 4GB files, grab max speeds globally and obtain your premium badge.',
      features_ar: 'مضاعفة الحدود (أكثر لـ 4GB، وملصقات، وجروبات)\nتنزيل مقاطع وصور عبر التطبيق بسرعة قصوى حصرياً\nتفريغ والتحويل السمعي الفوري للمقاطع الصوتية (Voice-to-Text)',
      features_en: 'Doubled limits (4GB files, extra stickers/groups slots)\nExclusive max-speed application downloads comprehensively\nReal-time Voice-to-Text transcriptions consistently',
      price: 3.99, currency: 'USD', category: 'social', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'معرف تلجرام (@Username)', requirements_en: 'Telegram Username (@)',
      source_url: `${Z2U}/telegram`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/telegram` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 197, updated_at: now
    },
    {
      id: 'x-premium', name_ar: 'إكس بريميوم (تويتر بلو)', name_en: 'X Premium (Twitter Blue)',
      description_ar: 'احصل على العلامة الزرقاء بحسابك على تويتر/X، إمكانية تعديل التغريدات الطويلة، والوصول لإيرادات الإعلانات.',
      description_en: 'Acquire the blue checkmark beside your X/Twitter handle, longer edit capabilities, triggering ad revenues natively.',
      features_ar: 'علامة توثيق الحساب الزرقاء الشهيرة عالميا\nتعديل التغريدات ونشر كتابات وفيديوهات اطول\nمشاركة الأرباح (دفع مبالغ للمشاهدات والتأثير)',
      features_en: 'The renowned global blue verification checkmark\nEdit tweets, write longer texts & heavier videos\nCreator ad-revenue share unlocking (earn via views)',
      price: 8.99, currency: 'USD', category: 'social', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1024px-X_logo_2023.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب تويتر (X)', requirements_en: 'X (Twitter) Account',
      source_url: `${Z2U}/twitter`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/twitter` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 198, updated_at: now
    },
    {
      id: 'snapchat-plus', name_ar: 'سناب شات بلس', name_en: 'Snapchat+',
      description_ar: 'ميزات حصرية، وإضافات مبكرة للمشتركين! اعرف مين شاف قصتك أكثر من مرة وخصص تطبيقك بالشكل الجديد.',
      description_en: 'Exclusive, early, and experimental features strictly! Find whose viewing stories twice and redesign icons rapidly.',
      features_ar: 'شارة ★ مميزة واساسية داخل التطبيق بحسابك\nاعرف مين أعاد مشاهدة قصصك او شاف الستوري متكرر\nتخصيص أيقونات التطبيق وملفات الصداقة (Best friend pin)',
      features_en: 'Featured striking premium black ★ badge actively\nTrack who rewatched your stories continuously\nCustomize app icons creatively & pin Best Friends precisely',
      price: 3.99, currency: 'USD', category: 'social', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1024px-Snapchat_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Snapchat', requirements_en: 'Snapchat Account',
      source_url: `${Z2U}/snapchat`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/snapchat` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 199, updated_at: now
    },
    {
      id: 'tinder-gold-platinum', name_ar: 'تندر جولد أو بلاتينيوم', name_en: 'Tinder Gold / Platinum',
      description_ar: 'اسرع فرصة للتعارف وزيادة الظهور (ماتش). اعرف مين معجب فيك (Likes you)، واكسب أفضل الإعجابات وميزات التخطي.',
      description_en: 'Faster dating probabilities securing matches. Uncover who specifically purely liked you boosting super-likes strictly.',
      features_ar: 'اعرف من أُعجب بك فورياً (Likes You)\nإعجابات (لايكات) لا تنتهي وترجيع (Rewind) مفتوح\n(البلاتينيوم) أولوية بالظهور لحسابات الأشخاص الأخرين',
      features_en: 'Uncover precisely who explicitly Liked You early on\nUnlimited standard Likes coupled with unconstrained Rewinds securely\n(Platinum Tier) Peak prioritized profile appearances notably',
      price: 14.99, currency: 'USD', category: 'social', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/TinderIcon-2017.svg/1024px-TinderIcon-2017.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'رقم حساب', requirements_en: 'Phone Number tied merely to Acc',
      source_url: `${Z2U}/tinder`,
      subscription_plans: [
         { label_ar: 'شهر جولد', label_en: '1 Month Gold', price: 14.99, source_url: `${Z2U}/tinder` },
         { label_ar: 'شهر بلاتينيوم', label_en: '1 Month Platinum', price: 19.99, source_url: `${Z2U}/tinder` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 200, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Top 100 Products (Part 4 - 25 items)...', 'color:#8b5cf6;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 4 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

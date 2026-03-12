// ================================================
// SPARK STORE - INSERT TOP 100 SUBSCRIPTIONS (PART 3: 51-75)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'copy-ai-pro', name_ar: 'كوبي دوت إي آي', name_en: 'Copy.ai Pro',
      description_ar: 'منصة تعتمد على الذكاء الاصطناعي لكتابة النصوص الإعلانية ورسائل البريد الإلكتروني والمقالات في ثوانٍ.',
      description_en: 'AI-powered platform to write ad copy, emails, and articles in seconds.',
      features_ar: 'توليد نصوص بأكثر من 25 لغة\nقوالب جاهزة للإعلانات ووسائل التواصل\nنصوص خالية من السرقة الأدبية',
      features_en: 'Generate text in 25+ languages\nPre-built templates for ads & social\nPlagiarism-free content',
      price: 12.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Copy.ai_Logo_2024.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/copy-ai`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 12.99, source_url: `${Z2U}/copy-ai` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 151, updated_at: now
    },
    {
      id: 'elevenlabs-premium', name_ar: 'إلفن لابز الصوتي', name_en: 'ElevenLabs Premium',
      description_ar: 'أفضل تقنية تعليق صوتي بالذكاء الاصطناعي واقعية للغاية لتحويل النصوص و استنساخ الأصوات بدقة.',
      description_en: 'The most realistic AI voiceover technology for text-to-speech and precise voice cloning.',
      features_ar: 'تحويل النص إلى صوت بشري واقعي وطبيعي\nميزة استنساخ الأصوات الاحترافية\nيدعم عدد كبير من اللغات والنبرات',
      features_en: 'Text-to-speech with realistic human voice\nProfessional voice cloning feature\nSupports multiple languages/tones',
      price: 9.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/ElevenLabs_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/elevenlabs`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/elevenlabs` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 152, updated_at: now
    },
    {
      id: 'leonardo-ai', name_ar: 'ليوناردو للرسم بالذكاء الاصطناعي', name_en: 'Leonardo.ai',
      description_ar: 'منصة تصميم وصناعة صور وموارد 3D فائقة الجودة للألعاب والتصميم، منافسة جداً لـ Midjourney ومجانية جزئياً!',
      description_en: 'Platform to design ultra-quality images and 3D assets for games, highly competing with Midjourney.',
      features_ar: 'إنتاج صور إبداعية وأصول للفنون و 3D\nنماذج تدريب مخصصة تولد عالي الدقة\nآلاف الأدوات الجاهزة (Prompts)',
      features_en: 'Produce creative images and 3D assets\nHigh-res custom trained models\nThousands of ready prompts',
      price: 6.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Leonardo_AI_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/leonardo`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/leonardo` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 153, updated_at: now
    },
    {
      id: 'quillbot-premium', name_ar: 'كويل بوت بريميوم', name_en: 'QuillBot Premium',
      description_ar: 'أداة الإملاء وإعادة صياغة الجمل الأفضل المعتمدة ع الذكاء الاصطناعي لكتابة مقالات وعبارات احترافية للمدرسة وللعمل.',
      description_en: 'The top AI paraphrasing tool to write and restate professional phrases or essays for school and work.',
      features_ar: 'إعادة صياغة نصية غير محدودة\nنماذج متقدمة وتلخيص أطول\nكشف وحماية من الانتحال (Plagiarism)',
      features_en: 'Unlimited text paraphrasing\nAdvanced modes and longer summaries\nPlagiarism checker and protector',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/QuillBot_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/quillbot`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/quillbot` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 154, updated_at: now
    },
    {
      id: 'runwayml', name_ar: 'رانواي إم إل', name_en: 'RunwayML',
      description_ar: 'ستوديو من الجيل الجديد! يصنع فيديوهات، يحرك الصور العادية ويزيل الخلفيات باستخدام Gen-1 و Gen-2.',
      description_en: 'Next-gen studio! Creates videos, animates standard images and removes backgrounds with Gen-1 & Gen-2 AI.',
      features_ar: 'تحويل النص إلى فيديو حقيقي\nتحريك أي صورة جامدة باحترافية وتعديل الفيديو بالـ Ai\nإزالة الخلفيات (Green screen)',
      features_en: 'Text to authentic video generation\nAnimate any static image professionally\nRemove greenscreen / backgrounds',
      price: 9.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Runway_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/runway`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/runway` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 155, updated_at: now
    },
    {
      id: 'invideo-pro', name_ar: 'إن فيديو برو', name_en: 'InVideo Pro',
      description_ar: 'حَول الأفكار والمكتوبات إلى فيديوهات جذّابة بمنتهى السرعة والسهولة مع أكثر من 5000 نموذج ذكي.',
      description_en: 'Turn simple ideas and scripts into engaging videos rapidly and easily with 5000+ smart AI templates.',
      features_ar: 'أكثر من 5000 نموذج فيديو جاهز\nمكتبة iStock و Premium للوسائط (صور، فيديو، موسيقى)\nتوليد سكريبت وتصميم الفيديو تلقائياً',
      features_en: 'Over 5000 ready video templates\niStock & Premium media library included\nAuto generate scripts and design videos',
      price: 5.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://invideo.io/favicon.ico',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/invideo`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/invideo` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 156, updated_at: now
    },
    {
      id: 'synthesia', name_ar: 'سينثيزيا', name_en: 'Synthesia',
      description_ar: 'مُنشئ الفيديو بتقنية وجوه AI الرمزية! اكتب النص، وسيتحدث لك (افاتار) احترافي بعدة لغات وبدون التصوير بالكاميرا.',
      description_en: 'AI avatar video generator! Type text, and a professional avatar speaks it in multiple languages naturally.',
      features_ar: 'أكثر من 120 لغة ولهجة طبيعية\nشخصيات وصور Avatars جاهزة للاستخدام للتعليمات\nقوالب مصممة للفيديوهات التعليمية',
      features_en: '120+ natural languages and accents\nReady to use Avatar characters\nDesigned templates for instructional videos',
      price: 19.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Synthesia_Logo.svg',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/synthesia`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/synthesia` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 157, updated_at: now
    },
    {
      id: 'otter-ai', name_ar: 'أوتر إي آي (للنسخ النصي)', name_en: 'Otter.ai',
      description_ar: 'الروبوت الأفضل للاجتماعات، ينضم زووم وجوجل ميت، ليقوم بتلخيص وكتابة الحوار الكامل وتحويل الصوت لنص.',
      description_en: 'The top meeting assistant bot, joins Zoom/Meet calls to transcribe dialogue and summarize instantly.',
      features_ar: 'اكتتاب وتسجيل الحوار فورياً ومفصل\nتلخيص النقاط الهامة للاجتماعات بشكل آلي\nتزامن مع Zoom, Google Meet و Microsoft Teams',
      features_en: 'Real time dialogue transcription\nAutomated summary of key meeting points\nSyncs with Zoom, Meet and Teams',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Otter.ai_Logo.svg',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/otter`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/otter` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 158, updated_at: now
    },
    {
      id: 'google-one', name_ar: 'جوجل ون (مساحة تخزين إضافية)', name_en: 'Google One',
      description_ar: 'مساحة تخزينية موسعة تشمل Google Drive وGmail وGoogle Photos مع مزايا تحرير الصور الإضافية.',
      description_en: 'Expanded storage across Google Drive, Gmail, & Photos with extra photo editing features included.',
      features_ar: 'مساحة تخزين تبدأ من 100 جيجابايت لتصل لـ 2 تيرابايت\nمشاركة مساحه العائلة لخمسة أشخاص\nتأثيرات اضافية لبرنامج صور Google',
      features_en: 'Storage space from 100GB up to 2TB\nFamily sharing up to 5 members\nExtra editing effects in Google Photos',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Google_One_icon_%282020%29.svg/1024px-Google_One_icon_%282020%29.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Gmail', requirements_en: 'Gmail account',
      source_url: `${Z2U}/google-one`,
      subscription_plans: [{ label_ar: 'سنة - 100 جيجا', label_en: '1 Year - 100GB', price: 2.99, source_url: `${Z2U}/google-one` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 159, updated_at: now
    },
    {
      id: 'dropbox-plus', name_ar: 'دروب بوكس بلس', name_en: 'Dropbox Plus / Pro',
      description_ar: 'المنصة الآمنة للاحتفاظ بكل ملفاتك الخاصة والعمل وصورك بحفظ وتزامن سريع لحوالي 2TB من المساحة الموثوقة.',
      description_en: 'The secure vault for your personal/work files and photos. Fast sync with up to 2TB of reliable storage.',
      features_ar: 'مساحة 2 تيرابايت (2,000 ج.ب)\nنقل وتخزين ملفاتك وصورك بأعلى درجات الخصوصية\nاسترجاع ملفاتك المحذوفة لـ 30 يوما',
      features_en: '2TB storage space (2,000 GB)\nTransfer and store files/photos with maximum privacy\nRecover deleted files up to 30 days',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Dropbox_logo_2017.svg/1024px-Dropbox_logo_2017.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب دروبكس', requirements_en: 'Dropbox Account',
      source_url: `${Z2U}/dropbox`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/dropbox` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 160, updated_at: now
    },
    {
      id: 'evernote-personal', name_ar: 'إيفرنوت الشخصي', name_en: 'Evernote Personal',
      description_ar: 'دون ملاحظاتك وارفق بملفاتك وصورك، ونظّم الأفكار في مكان واحد بخصائص ميزة الـ Personal الكاملة.',
      description_en: 'Take notes, attach files remotely, and organize ideas in one place with full Personal tier features.',
      features_ar: 'مزامنة أجهزة غير محدودة لجميع ملاحظاتك\nرفض لملفات لحد 200MB للرفعة الواحدة\nالبحث حتى في الملاحظات المكتوبة يدوياً ومستندات PDF',
      features_en: 'Unlimited device sync for notes\nUp to 200MB upload size per note\nSearch within handwritten notes & PDFs',
      price: 3.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Evernote_Icon_logo.svg/1024px-Evernote_Icon_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/evernote`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/evernote` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 161, updated_at: now
    },
    {
      id: 'xmind-pro', name_ar: 'إكس مايند المميز', name_en: 'Xmind Pro',
      description_ar: 'أداة الخرائط الذهنية والتفكير المرئي لتوضيح العصف الذهني واخذ افكار معقدة وتبسيطها بشكل جميل.',
      description_en: 'Mind mapping & visual thinking tool to clarify brainstorming and simplify complex ideas beautifully.',
      features_ar: 'نماذج متعددة لخرائط التفكير والعصف الذهني\nمرحلة الـ Pitch Mode لتحويلها عرض مرئي مدهش\nأداة تنظيم ومشاركة للأفكار للمقالات أو المذاكرة',
      features_en: 'Multiple mindmap models & structures\nPitch Mode to present as visual slides\nOrganize tool for studying or articles',
      price: 5.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Xmind_Logo.svg',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/xmind`,
      subscription_plans: [{ label_ar: 'سنة كاملة', label_en: '1 Year', price: 5.99, source_url: `${Z2U}/xmind` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 162, updated_at: now
    },
    {
      id: 'slack-pro', name_ar: 'سلاك برو', name_en: 'Slack Pro',
      description_ar: 'تواصل الشركات والفرق المنظم. مكالمات جماعية، ومشاركة شاشة ورسائل غير محدودة لتسريع انتاجية العمل.',
      description_en: 'Corporate team communication. Group Huddles, screen share & unlimited message history to boost output.',
      features_ar: 'مكالمات جماعية صوتية ومرئية ومشاركة للشاشة\nأرشفة رسائل بلا حدود للرجوع لها دائما\nتحكم وتعاون لامحدود ومساحات عمل آمنة',
      features_en: 'Group audio/video calls & screen share\nUnlimited messages archive available anytime\nSecure workspaces & external collaboration',
      price: 6.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1024px-Slack_icon_2019.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/slack`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/slack` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 163, updated_at: now
    },
    {
      id: 'trello-premium', name_ar: 'تريلو بريميوم', name_en: 'Trello Premium',
      description_ar: 'أداة الإدارة المرئية للمشاريع الأكثر كفاءة — قم بربط مشاريعك ومتابعة تقدمها باستخدام طرق العرض المعقدة.',
      description_en: 'The most efficient visual project management tool — connect and track projects through advanced views.',
      features_ar: 'لوحات، قوائم إنجاز للوقت وللمهام ومقاييس الأهداف\nمهام غير محدودة وتكرار مجدول للأعمال\nطرق عرض الخريطة، والتقويم (Calendar Format)',
      features_en: 'Boards, timeline goals & lists track\nUnlimited tasks and scheduled automation\nMap, Calendar, and Dashboard views',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/1024px-Trello-logo-blue.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/trello`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/trello` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 164, updated_at: now
    },
    {
      id: 'asana-premium', name_ar: 'أسانا بريميوم', name_en: 'Asana Premium',
      description_ar: 'تطبيق تنظيم المهام لفرق العمل — خطط أعمالك بذكاء وتتبع تفاصيل الإنجاز اليومي لتحقيق أهدافك.',
      description_en: 'Tasks organization app for teams — Plan your work smartly and track daily progress details actively.',
      features_ar: 'الجداول الزمنية وتتبع المهام من بدايتها\nإنشاء حقول ومهام متفرعة وتكرار مجدول\nتوزيع أحمال العمل ومعرفة تقدم الفريق',
      features_en: 'Timeline projects and visual task tracking\nCreate custom fields, subtasks & rules\nDistribute workloads across teams',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Asana_logo.svg/1024px-Asana_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/asana`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/asana` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 165, updated_at: now
    },
    {
      id: 'todoist-pro', name_ar: 'تودويست برو', name_en: 'Todoist Pro',
      description_ar: 'مدير مهام وقائمة أعمال يسهل عليك تنظيم جميع شؤون حياتك بسرعة فائقة ومتابعة الإنجاز اليومي.',
      description_en: 'Task manager and to-do list that makes it easy to organize your entire life quickly with daily trackings.',
      features_ar: 'إضافة تذكيرات تلقائية وأرشفة للعمل\nحتى 300 مشروع وأعداد من الفلاتر المتخصصة\nنسخ احتياطي ونماذج مهام جاهزة',
      features_en: 'Add automated reminders and archiving\nUp to 300 projects and custom filters\nBackups and ready-to-use task templates',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Todoist_In_App_Logo.svg',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/todoist`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${Z2U}/todoist` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 166, updated_at: now
    },
    {
      id: 'monday-com', name_ar: 'مانداي دوت كوم', name_en: 'Monday.com',
      description_ar: 'نظام تشغيل للعمل — لتتبع مسار المشاريع وإدارة العملاء وبناء آليات عمل تفاعلية تناسب فريقك جداً.',
      description_en: 'Work OS platform — track projects workflows, manage CRM visually and build reactive systems simply.',
      features_ar: 'مساحات عمل لا محدودة وتتبع المشاريع (Gantt/Kanban)\nأتمتة الأعمال وربط مع 200 تطبيق اخر\nتخزين للبيانات وداشبورد مباشر',
      features_en: 'Unlimited boards and workflow views (Gantt/Kanban)\nAutomations and integrations with 200+ apps\nData storage and live activity dashboards',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Monday_logo.svg/1024px-Monday_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/monday`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/monday` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 167, updated_at: now
    },
    {
      id: 'notion-personal-pro', name_ar: 'نوشن بلس', name_en: 'Notion Personal Pro / Plus',
      description_ar: 'باقة Notion البارزة للمستخدمين — استضف عدد غير محدود من الكتل (Blocks) وارفع ملفات ضخمة بكل سهولة.',
      description_en: 'Prominent Notion tier for users — Host infinite Blocks and upload massive files to databases easily.',
      features_ar: 'مساحة بلاحدود للصفحات والنصوص\nتحميل مرفقات لاي حجم كان (عوضاً عن 5 ميجا)\nأرشفة الصفحات السابقة (لـ 30 يوم استرجاع)',
      features_en: 'Unlimited space for pages and text blocks\nUpload attachments of any size\nPage history archive (up to 30 days retro)',
      price: 3.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Notion', requirements_en: 'Notion Account',
      source_url: `${Z2U}/notion-plus`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/notion-plus` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 168, updated_at: now
    },
    {
      id: 'onepassword', name_ar: 'ون باسوورد', name_en: '1Password',
      description_ar: 'مدير كلمات المرور الأكثر أماناً لحفظ كلماتك السرية وتعبئتها آلياً وجمع بطاقات الإتمان بمكان آمن.',
      description_en: 'The most secure password manager to store and autofill credentials/credit cards inside a safe vault.',
      features_ar: 'تخزين مشفر لكمية غير محدودة من الكلمات السرية\nتعبئة تلقائية على الهاتف والكمبيوتر\nحاجز حماية 2FA وتشفير AES-256',
      features_en: 'Encrypted storage for unlimited passwords\nAutofilling cross-platform Mobile/PC\n2FA barrier and AES-256 secure encryption',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/1Password_logo.svg/1024px-1Password_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/onepassword`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${Z2U}/onepassword` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 169, updated_at: now
    },
    {
      id: 'lastpass-premium', name_ar: 'لاست باس بريميوم', name_en: 'LastPass Premium',
      description_ar: 'حافظ بسلام وبسهولة على تفاصيل تسجيل دخولك لأي موقع وتزامنها بشكل اني بين حاسوبك وهاتفك.',
      description_en: 'Safely and simply keep your login details and instantly sync between your computers and mobiles.',
      features_ar: 'إدارة جميع باسوراداتك وملاحظاتك المكتومة\nوصول لا محدود للأجهزة\nحفظ التشفير المتقدم (Advanced MFA options)',
      features_en: 'Manage all passwords & secure notes\nUnlimited device access across types\nAdvanced MFA (multi factor) encryption',
      price: 2.49, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/LastPass_Logo.svg/1024px-LastPass_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/lastpass`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.49, source_url: `${Z2U}/lastpass` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 170, updated_at: now
    },
    {
      id: 'envato-elements', name_ar: 'إنفاتو إيلمنتس', name_en: 'Envato Elements',
      description_ar: 'المنصة الأكبر لأي مصمم أو منتج — ملفات فيديوهات وصور والموسيقى جرافيكس خطوط بغير محدودية تحميلها.',
      description_en: 'The biggest tool for any designer/producer — unlimited downloads of stock videos, graphics, photos & fonts.',
      features_ar: 'تحميل غیر محدود لـ 10 ملايين صنف فني\nرخص تجارية آمنة لأعمالك ومشاريعك\nقوالب جاهزة وميزات واسعة لأدوبي وبرامج أُخرى',
      features_en: 'Unlimited downloads: 10M+ digital assets\nSafe commercial licenses for your projects\nMassive templates for Adobe & other platforms',
      price: 14.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Envato_Elements_logo.svg/1024px-Envato_Elements_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/envato-elements`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 14.99, source_url: `${Z2U}/envato-elements` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 171, updated_at: now
    },
    {
      id: 'wondershare-filmora', name_ar: 'فيلمورا للمونتاج', name_en: 'Wondershare Filmora',
      description_ar: 'أسهل وأفضل برنامج مونتاج فيديو بديهي بمؤثرات خيالية وأدوات ذكاء اصطناعي قوية بدون علامة مائية ع المونتاج.',
      description_en: 'The easiest best intuitive video editor featuring spectacular effects, AI tools & without a watermark.',
      features_ar: 'المونتاج بذكاء الاصطناعي وإزالة الخلفية\nبدون أي علامة مائية للمنتج النهائي\nآلاف الفلاتر الجاهزة والانتقالات السلسة',
      features_en: 'AI editing and quick background removals\nNo watermarks on exported final cuts\nThousands of filters alongside smooth transitions',
      price: 12.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Filmora_Logo.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'جهاز PC/Mac', requirements_en: 'PC/Mac',
      source_url: `${Z2U}/filmora`,
      subscription_plans: [{ label_ar: 'رخصة حساب (لا تنتهي)', label_en: 'Lifetime License', price: 12.99, source_url: `${Z2U}/filmora` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 172, updated_at: now
    },
    {
      id: 'autocad-1-year', name_ar: 'أوتوكاد السنوي', name_en: 'Autodesk AutoCAD (1 Year)',
      description_ar: 'برنامج الرسم والتصميم الرقمي ثنائي وثلاثي الأبعاد الأفضل بالهندسة — ترخيص مدته عام كامل للطلبة/مستخدمين.',
      description_en: 'The definitive 2D/3D designing and drafting software for engineering — full year license for Student/Usage.',
      features_ar: 'تصميم ثلاثي وثنائي بدقة هندسية شاملة\nمفتاح أو إيميل للتفعيل السريع للنسخة\nتدعم ويندوز وماك بأحدث المعالجات المتوفرة',
      features_en: 'Comprehensive 2D & 3D precision designs\nKey/Mail for swift product activation\nSupports Windows & Mac systems fully',
      price: 19.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/AutoCAD_logo.svg/1024px-AutoCAD_logo.svg.png',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: 'جهاز مناسب هندسياً', requirements_en: 'Appropriate specs PC/Mac',
      source_url: `${Z2U}/autocad`,
      subscription_plans: [{ label_ar: 'سنة كاملة', label_en: '1 Year', price: 19.99, source_url: `${Z2U}/autocad` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 173, updated_at: now
    },
    {
      id: 'jetbrains-pack', name_ar: 'حزمة أدوات جيت برينز', name_en: 'JetBrains Pack / IDEs',
      description_ar: 'حزمة متكاملة ومكثفة لجميع برامج الـ IDE الخاصة بـ JetBrains (مثل PyCharm و IntelliJ و WebStorm).',
      description_en: 'A comprehensive All-Products-Pack for JetBrains IDEs (including PyCharm, IntelliJ IDEA, & WebStorm).',
      features_ar: 'استخدام كل الأطقم البرمجية للطلاب والمشاريع\nأدوات قوية جدا لتحسين انتاجية المبرمج\nتكامل للمشاريع من C++ وحتى لغات Python',
      features_en: 'Utilize all IDEs for developing/learning\nVery powerful tools strictly empowering coders\nIntegrations scaling C++ deeply up to Python',
      price: 14.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/JetBrains_Logo_2016.svg/1024px-JetBrains_Logo_2016.svg.png',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/jetbrains`,
      subscription_plans: [{ label_ar: 'سنة كاملة', label_en: '1 Year', price: 14.99, source_url: `${Z2U}/jetbrains` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 174, updated_at: now
    },
    {
      id: 'coreldraw-suite', name_ar: 'كوريل درو', name_en: 'CorelDRAW Suite',
      description_ar: 'احترف الرسم وتصميم الشعارات بمتعاون الفيكتور القوي — منافس الايلستريتور التاريخي والاسرع إخراجاً.',
      description_en: 'Master drawing and logo designs visually with strong vectoring — Illustrator historic rival and very fast.',
      features_ar: 'قدرة فائقة على تحويل الصور العادية لمتجهات الفيكتور\nخصائص وتطبيقات مرفقة للصور والتحرير المتقن\nاشتراك سنوي فعال وتنشيط سريع للبرنامج',
      features_en: 'Incredible imaging to vector tracings capabilities\nBundled apps encompassing image specific edits\nValid yearly subscriptions and rapid activation',
      price: 18.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/CorelDRAW_Logo.png',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/coreldraw`,
      subscription_plans: [{ label_ar: 'سنة كاملة', label_en: '1 Year', price: 18.99, source_url: `${Z2U}/coreldraw` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 175, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Top 100 Products (Part 3 - 25 items)...', 'color:#be185d;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 3 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

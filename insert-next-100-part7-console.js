// ================================================
// SPARK STORE - INSERT NEXT 100 SUBSCRIPTIONS (PART 7: 151-175)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'blinkist', name_ar: 'بلينكيست (ملخصات الكتب)', name_en: 'Blinkist',
      description_ar: 'اقرأ واستمع لأهم أفكار الكتب الواقعية وأكثرها مبيعاً في 15 دقيقة فقط! وسّع آفاقك يومياً بفعالية.',
      description_en: 'Read and listen fundamentally extracting best-selling non-fiction book concepts purely taking 15 minutes! Expand horizons effectively.',
      features_ar: 'ملخصات صوتية و نصية مطبوعة لآلاف الكتب الرائعة\nأدلة وعروض تقديمية صوتية (Shortcasts) مميزة\nالاستماع بدون إنترنت، وربط القراءات بـ Kindle',
      features_en: 'Printed textual alongside purely auditory summaries condensing magnificent books\nShortcast auditory guides delivering prominent exclusive presentations natively\nOffline listening actively routing parsed reads straight into Kindles',
      price: 6.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Blinkist_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/blinkist`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/blinkist` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 246, updated_at: now
    },
    {
      id: 'headway', name_ar: 'هيدواي (ملخصات يومية)', name_en: 'Headway',
      description_ar: 'المنافس الأقوى لـ Blinkist، تطبيق مصمم لجعل النموي الذاتي متعة من خلال ملخصات الكتب بأسلوب التحفيز والألعاب.',
      description_en: 'Blinkist\'s fiercest rival, built strictly turning self-growth inherently fun employing book summaries via gamified motivation.',
      features_ar: 'ملخصات لأفضل الكتب العالمية صوتاً وصورةً يومياً\nتحديات قراءة يومية والحصول على جوائز (Gamification)\nتتبع وتقييم مستمر لمعدل استيعابك وتطورك الدائم',
      features_en: 'Audio-visual daily condensed breakdowns capturing leading global publications securely\nDaily reading objectives naturally unlocking Gamification rewards seamlessly\nConsistent tracker metrics gauging comprehension alongside continuous improvements strictly',
      price: 5.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://cdn.iconscout.com/icon/free/png-256/free-headway-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-3-pack-logos-icons-2944903.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/headway`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/headway` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 247, updated_at: now
    },
    {
      id: 'pocket-fm', name_ar: 'بوكيت إف إم (للقصص المسموعة)', name_en: 'Pocket FM',
      description_ar: 'الراديو المتنقل للقصص والكتب! مكتبة هائلة من الدراما الصوتية الهندية والأجنبية لتعيش الإثارة بالاستماع فقط.',
      description_en: 'The portable radio conveying stories/books! Immense audio drama libraries originating globally enforcing thrilling listening immersion strictly.',
      features_ar: 'آلاف القصص الدرامية والخيالية التي تبث بأسلوب المسلسلات (Audio series)\nإزالة الإعلانات كلياً والحصول على نقود يومية (Coins)\nتحميل غير محدود وإتاحة جميع الحلقات المتسلسلة',
      features_en: 'Thousands of intense immersive fictions formatted serially (Audio series)\nTotal ad-removals securing uninterrupted daily Coin caches actively\nLimitless downloads ensuring instantaneous access across entire unbroken continuities',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pocket_FM_Logo.webp/1024px-Pocket_FM_Logo.webp.png',
      duration_ar: 'شهر واحد (عضوية)', duration_en: '1 Month (VIP)', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/pocket-fm`,
      subscription_plans: [{ label_ar: 'عضوية مدفوعة لشهر', label_en: '1 Month VIP', price: 4.99, source_url: `${Z2U}/pocket-fm` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 248, updated_at: now
    },
    {
      id: 'chatgpt-plus-shared', name_ar: 'شات جي بي تي بلس (حسابات مشتركة)', name_en: 'ChatGPT Plus (Shared)',
      description_ar: 'خيار اقتصادي بقوة! استخدم قدرات GPT-4 المتطورة وأدوات تحليل البيانات (Data Analysis) بحساب رسمي مشترك ورخيص.',
      description_en: 'Powerful economic option! Exploit advanced GPT-4 limits & Data Analysis capabilities utilizing a cheap official shared account.',
      features_ar: 'الوصول لإصدار GPT-4 الأحدث والمتفوق وسرعة الإجابات\nتفعيل الإضافات (Plugins) و (DALL-E 3) לرسم الصور\nسعر اقتصادي جدا مقارنة بالحسابات الشخصية (20$)',
      features_en: 'Superior access operating fastest advanced GPT-4 responses precisely\nActive integrated Plugins merging strictly DALL-E 3 image engineering\nRemarkably economical costs comparing isolated personal bills ($20)',
      price: 5.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'ممنوع تغيير পাসورد الحساب', requirements_en: 'Do not change password',
      source_url: `${Z2U}/chatgpt`,
      subscription_plans: [{ label_ar: 'شهر واحد (حساب مشترك)', label_en: '1 Month (Shared Acc)', price: 5.99, source_url: `${Z2U}/chatgpt` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 249, updated_at: now
    },
    {
      id: 'writesonic-pro', name_ar: 'رايت سونيك برو للذكاء الاصطناعي', name_en: 'Writesonic Pro',
      description_ar: 'الأداة الأخطر لكتابة المحتوى بذكاء واحترافية وبشكل مُحسَن لمحركات البحث الـ SEO مع أداة (Chatsonic).',
      description_en: 'The definitive hazardous instrument synthesizing professional SEO-optimized copies innately wielding the conversational (Chatsonic) engine.',
      features_ar: 'كتابة مقالات Blog بالكامل ومهيئة بـ 1500 كلمة سريعاً\nأداة Chatsonic الأحدث المربوطة ببحث Google المباشر\nكتابة نصوص للمتاجر والإعلانات وحملات التويتر',
      features_en: 'Synthesize comprehensive fully-optimized 1500+ word Blog articles rapidly\nLatest Chatsonic iteration inherently linked natively into real-time Google databases\nConstruct marketing copy targeting eCommerce ads & rigorous Twitter campaigns',
      price: 13.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Writesonic_logo_mark.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/writesonic`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 13.99, source_url: `${Z2U}/writesonic` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 250, updated_at: now
    },
    {
      id: 'rytr-premium', name_ar: 'أداة رايتر للكتابة الذكية', name_en: 'Rytr Premium',
      description_ar: 'مساعد ذكي يولد الايميلات السريعة والمحتوى الإبداعي وأفكار الفيديو بضغطة زر. أرخص بديل لـ Jasper أو Copy.ai.',
      description_en: 'Smart assistant generating swift emails, creative narratives & video ideation instantly. Jasper/Copy.ai\'s finest budget alternative.',
      features_ar: 'توليد نصوص بلا حدود أطوال Characters\nأكثر من 40 حالة استخدام مختلفة والنغمات (Tones) متنوعة\nداعم رائع للغة العربية وبأداة فحص الاقتباس (Plagiarism)',
      features_en: 'Endless generative phrasing spanning uncapped character lengths\n40+ diverse strict logical templates crossing multiple varied output Tones\nBrilliant Arabic capabilities featuring embedded active plagiarism scans',
      price: 6.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://rytr.me/favicon.ico',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/rytr`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/rytr` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 251, updated_at: now
    },
    {
      id: 'murf-ai', name_ar: 'ميرف للتعليق الصوتي', name_en: 'Murf.ai',
      description_ar: 'أصوات ذكاء اصطناعي واقعية جداً 100% لفيديوهات الـ YouTube، والكتب الصوتية والتعليم بفضل أحدث تقنيات الـ AI.',
      description_en: '100% ultra-realistic AI voiceovers targeting specifically YouTube videos, audiobooks & educational paths leveraging pure AI tech.',
      features_ar: 'أكثر من 120 صوت بشري خالي من النبرة الروبوتية المزعجة\nمزامنة الأصوات مع فيديوهاتك وإضافة مؤثرات وموسيقى\nإمكانية استنساخ صوتك المباشر وأدوات حقوق بث آمنة',
      features_en: 'Over 120 human voices evading annoying robotic articulations entirely\nSync generated voices parallel inside intrinsic video frames attaching music natively\nActive direct voice cloning possessing completely protected commercial broadcasting rights',
      price: 12.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://murf.ai/resources/favicon.ico',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/murf`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 12.99, source_url: `${Z2U}/murf` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 252, updated_at: now
    },
    {
      id: 'pictory-ai', name_ar: 'بيكتوري ذكاء اصطناعي للفيديو', name_en: 'Pictory AI',
      description_ar: 'الأداة السحرية لصناع المحتوى! حوّل أي مقال (Blog) نصي أو رابط إلى فيديو جاهز شامل الفيديوهات والصوت!',
      description_en: 'Magician tool empowering content engineers! Transform purely textual Blogs/URLs completely into ready assembled visual-audio broadcasts!',
      features_ar: 'صناعة تلقائية لفيديوهات كاملة من النصوص وبشروطك\nتقطيع الفيديوهات الطويلة (مثل بودكاست البودكاست) لمقاطع للـ Reels\nإضافة ترجمات دقيقة (Subtitles) آلياً للفيديوهات وتخصيصها',
      features_en: 'Automated full video assembling explicitly derived from raw texts flawlessly\nSegmenting massive footages (e.g. Podcasts) strictly birthing snappy viral Reels natively\nInserting highly accurate localized auto-Subtitles actively customizable completely',
      price: 14.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://pictory.ai/wp-content/uploads/2021/08/favicon.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/pictory`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 14.99, source_url: `${Z2U}/pictory` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 253, updated_at: now
    },
    {
      id: 'descript-pro', name_ar: 'ديسكريبت برو', name_en: 'Descript Pro',
      description_ar: 'طريقة جديدة كلياً للمونتاج! عدّل الفيديو كأنه استند Word — فقط امسح الكلام من النص وسينحذف من الفيديو.',
      description_en: 'Altogether revolutionary editing mechanics! Edit visual footages strictly similar manipulating Word docs — erase textual words, erases clip natively.',
      features_ar: 'تفريغ صوتي رهيب (Transcribe) للفيديو ليتم تعديله\nميزة (Overdub) لإصلاح أي أخطاء لفظية سجلتها بصوت اصطناعي يطابقك\nإزالة الضوضاء والأخطاء (umm/uh) بضغطة زر واحدة (Studio Sound)',
      features_en: 'Brilliant immediate transcripts extracting vocal logic enabling direct editing capabilities\n(Overdub) trait artificially reconstructing missed verbal cues matching personal voiceprints seamlessly\nErase background noises/filler (umm/uh) mistakes activating pure (Studio Sound) algorithms singly',
      price: 12.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Descript_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/descript`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 12.99, source_url: `${Z2U}/descript` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 254, updated_at: now
    },
    {
      id: 'grammarly-premium', name_ar: 'جرامرلي بريميوم', name_en: 'Grammarly Premium',
      description_ar: 'مدقق النصوص الإنجليزية الأفضل والموثوق عالمياً للاكاديميين ومحترفي الأعمال، احصل على النسخة المميزة لنتائج خالية من الزلات.',
      description_en: 'The prime globally trusted English textual checker aiding academics & corporate professionals ensuring flawless outputs entirely.',
      features_ar: 'تصحيحات قواعدية وهيكلية متقدمة وغير محدودة للنصوص\nميزة اقتراحات الأسلوب ونبرة الكلام لجعله أكثر لباقة\nمدقق اقتباسات وانتحال (Plagiarism) لفحص الأبحاث',
      features_en: 'Limitless advanced grammatical alongside firm structural sentence adjustments actively\nFormulating vocabulary suggestions projecting accurate elegant communication tones persistently\nNative integrated Plagiarism investigator thoroughly examining collegiate researches effectively',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Grammarly_logo.svg/1024px-Grammarly_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/grammarly`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/grammarly` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 255, updated_at: now
    },
    {
      id: 'prowritingaid-premium', name_ar: 'برو رايتنج إيد', name_en: 'ProWritingAid',
      description_ar: 'المنافس الأقوى لجرامرلي! مفضل عند الكتاب الروائيين لشرحه التفصيلي للأخطاء وأسلوبه العميق في تحليل الكلي للنصوص.',
      description_en: 'Fiercest rival combating Grammarly! Extensively preferred explicitly amongst novelists examining deeply contextual errors providing holistic narrative breakdowns.',
      features_ar: 'لا يوجد حد لكلمات الملفات المفحوصة في النسخة المميزة\nتقارير أسلوبية (Style reports) شاملة تدرس تدفق الجمل والكلمات المكررة\nتتكامل مع برامج Scrivener و Word بسلاسة واحترافية',
      features_en: 'Absolutely zero strict word caps scanning documents intrinsically inside premium tiers persistently\nExhaustive (Style reports) investigating narrative flows isolating redundant vocabularies systematically\nIntegrates explicitly anchoring onto suites similar Scrivener & Word environments seamlessly',
      price: 5.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/ProWritingAid_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/prowritingaid`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/prowritingaid` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 256, updated_at: now
    },
    {
      id: 'beautiful-ai', name_ar: 'بيوتيفول (عروض ذكية)', name_en: 'Beautiful.ai',
      description_ar: 'لا تضيع وقتك بتصميم مستندات العرض! البرنامج يقترح ويصمم لك الـ Slides (العروض التقديمية) آلياً بشكل متناسق ومذهل.',
      description_en: 'Eliminate wasted time engineering presentation slides! The software natively proposes & constructs formatting slides flawlessly continuously.',
      features_ar: 'آلاف القوالب المصممة مسبقاً من خبراء ولا تحتاج لتعديل معقد\nتأطير وتنظيم النصوص للذكاء الاصطناعي أثناء كتابتك بمجرد الخطوة الاولى\nشريحة عروض تتألف بأناقة (Pitch decks) تناسب المحترفين',
      features_en: 'Thousands expertly pre-rendered slide outlines skipping tedious complex restructuring entirely\nReal-time AI text organization framing instantly parallel drafting phases intrinsically\nFormulating cleanly elegant Pitch Decks perfectly suitable addressing global professionals',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://cdn.beautiful.ai/images/logomark_small.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/beautiful-ai`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/beautiful-ai` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 257, updated_at: now
    },
    {
      id: 'tome-ai', name_ar: 'توم إي آي לעمل العروض', name_en: 'Tome AI',
      description_ar: 'اكتب سطر واحد.. ليولد لك أداة Tome عرض تقديمي كامل (Slides) متناسق مع الصور والنصوص المعبرة بلمح البصر.',
      description_en: 'Merely scribe one singular line.. Tome algorithms manifest comprehensive synchronous Presentation Slides combining expressive textures instantly.',
      features_ar: 'إنشاء عروض تقديمية كاملة القصة من وصف نصي قصير منك فقط\nرسومات AI مدمجة تصنع صور متخصصة (عبر DALL-E) داخل العروض مباشرة\nتمثيل البيانات وجداول بأساليب تصميمية بصرية ثورية',
      features_en: 'Fabricates entirely cohesive narrative presentations generating off brief singular prompts immediately\nIntegrated AI sketching embedding precise generative images (via DALL-E) natively rendering dynamically\nManifests data visualizations displaying datasets adopting radically revolutionary sleek aesthetic models',
      price: 7.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://cdn.tome.app/favicon.ico',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/tome`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 7.99, source_url: `${Z2U}/tome` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 258, updated_at: now
    },
    {
      id: 'onedrive-100gb', name_ar: 'أون درايف 100 جيجا بايت', name_en: 'Microsoft OneDrive 100GB',
      description_ar: 'المساحة السحابية الأساسية من مايكروسوفت — احفظ 100GB بأمان وشارك ملفاتك ونسخ الكمبيوتر بسهولة لا تقارن.',
      description_en: 'Essential cloud storage powered from Microsoft — secure 100GB flawlessly distributing files backing up workstations seamlessly.',
      features_ar: 'مساحة 100 جيجا بايت للتخزين الفائق والسريع\nتزامن تلقائي ورسمي مع أنظمة 11 و Office\nتشفير عالي وخزنة شخصية (Personal Vault) شديدة الأمان',
      features_en: 'Extensive 100 Gigabyte storage prioritizing rapid agile distributions perfectly\nNative systematic syncing embedded directly integrating Win 11 & Office completely\nSuperior encryption housing exclusively impenetrable Personal Vault protections innately',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/OneDrive_Cloud_Logo_2022.svg/1024px-OneDrive_Cloud_Logo_2022.svg.png',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: 'حساب Microsoft', requirements_en: 'Microsoft Account',
      source_url: `${Z2U}/onedrive`,
      subscription_plans: [{ label_ar: 'سنة كاملة (100 GB)', label_en: '1 Year (100 GB)', price: 2.99, source_url: `${Z2U}/onedrive` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 259, updated_at: now
    },
    {
      id: 'icloud-plus', name_ar: 'آي كلاود بلس', name_en: 'iCloud+ (50GB / 200GB)',
      description_ar: 'حماية وتخزين صورك ونُسخ هاتف الآيفون بأمان. خدمة آبل توفر إخفاء بريدك الإلكتروني والوصول لملفاتك بكل سهولة.',
      description_en: 'Shelter securely backing up iPhone photos/data continually. Apple\'s service introduces Hide-My-Email maintaining effortless remote accesses.',
      features_ar: 'يوفر مساحات (50GB - 200GB) تناسب حجم مكتبتك\nميزة Private Relay و إخفاء الـ Email لحمايتك عبر الأنترنت\nمشاركة مساحة التخزين العائلية الكبيرة (لـ 5 اشخاص غيرك)',
      features_en: 'Provides scalable capacities (50GB - 200GB) addressing vast aesthetic libraries seamlessly\nIntegrates Private Relay tools & hides active emails preserving online identities safely\nDisperses expansive storage quotas inclusively sharing among 5 external family users',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ICloud_logo.svg/1024px-ICloud_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'Apple ID', requirements_en: 'Apple ID',
      source_url: `${Z2U}/icloud`,
      subscription_plans: [
        { label_ar: '50 جيجابايت شهري', label_en: '50 GB Monthly', price: 2.99, source_url: `${Z2U}/icloud` },
        { label_ar: '200 جيجابايت شهري', label_en: '200 GB Monthly', price: 4.99, source_url: `${Z2U}/icloud` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 260, updated_at: now
    },
    {
      id: 'box-personal-pro', name_ar: 'مساحة بوكس الشخصية', name_en: 'Box Personal Pro',
      description_ar: 'أداة التخزين والإنتاجية العريقة للمحتوى والملفات، تمكنك مساحة برو باحترافية من رفع ملفات كبيرة والعمل المشترك.',
      description_en: 'The pioneering storage & content engine, empowering Pro tiers uploading gargantuan files maintaining flawless corporate joint operations.',
      features_ar: 'مساحة آمنة تبلغ 100 جيجابايت للتخزين الشخصي الممتاز\nحد أقصى لحجم رفع الملف الواحد زاد لـ 5GB كاملةً للسرعة\nأدوات قوية جدا للتتبع ومشاركة الملفات بصلاحيات واضحة',
      features_en: 'Impenetrable 100GB capacities assuring excellent profound personal allocations natively\nElevated standalone file size uploads strictly reaching full 5GB reliably swiftly\nFiercely capable tracking metrics administering transparently precise folder sharing permissions',
      price: 5.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Box_logo.svg/1024px-Box_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/box`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/box` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 261, updated_at: now
    },
    {
      id: 'pcloud-plus', name_ar: 'بي كلاود بلس', name_en: 'pCloud Plus',
      description_ar: 'البديل الأقوى والحائز على ثقة المستخدمين للتخزين السحابي بحجم 500 جيجا. خصوصية عالية وتشغيل مباشر للوسائط!',
      description_en: 'The robust highly trusted alternative packing firm 500GB capacities crucially. Superb privacies ensuring direct multimedia streams thoroughly!',
      features_ar: 'مساحة عملاقة سعتها 500 جيجابايت لحفظ وسائطك الكبيرة\nمشغل موسيقى وفيديو مدمج ممتاز بداخل التطبيق تلقائي\nروابط مشاركة مخصصة وعمر استرجاع يصل لـ 30 يوم من النسخ',
      features_en: 'Titanic 500GB expanses cleanly shielding gargantuan multimedia collections continually\nPremium localized audio/video players securely embedded rendering streams completely\nFormulated custom sharing links securing 30-day revision snapshots rescuing trashed records',
      price: 5.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/PCloud_logo.svg/1024px-PCloud_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/pcloud`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/pcloud` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 262, updated_at: now
    },
    {
      id: 'mega-pro-1', name_ar: 'ميجا برو 1', name_en: 'MEGA Pro I',
      description_ar: 'عملاق التخزين المشفر من النهاية للنهاية (E2EE)! المساحة الأولى لحفظ ما يصل إلى 2TB من بياناتك شديدة الأهمية ونقلها.',
      description_en: 'E2EE encrypted storage mammoth! Primary expansive 2TB vault conserving crucially sensitive paramount files enabling robust transmissions.',
      features_ar: 'سعة تخزينية عملاقة بحد 2 تيرابايت (2000 جيجا) لحفظ كل أنواع الملفات\nتشفير Zero-Knowledge (حتى الشركة Mega لا تستطيع رؤية ملفاتك للضمان)\nحصص ضخمة جدا (2TB نقل بيانات) لسرعة مشاركة الروابط والتحميل',
      features_en: 'Colossal storage capacities allocating 2 Terabytes retaining broad versatile assets safely\nStrict Zero-Knowledge encryptions ensuring pure data obscurities entirely from MEGA natively\nGigantic bandwidth allowances (2TB data quotas) optimizing rapid external link distributions',
      price: 10.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Mega_icon.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/mega`,
      subscription_plans: [{ label_ar: 'شهر واحد (2 تيرابايت)', label_en: '1 Month (2 TB)', price: 10.99, source_url: `${Z2U}/mega` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 263, updated_at: now
    },
    {
      id: 'nordlocker', name_ar: 'نورد لوكر', name_en: 'NordLocker',
      description_ar: 'من مطوري NordVPN — تطبيق لتجزئة وتشفير ملفاتك محلياً بشكل عسكري، ومن ثم حفظها في سحابة آمنة سعتها 500GB.',
      description_en: 'Engineered by NordVPN developers — Application partitioning militarily encrypting your local files transferring onto secure 500GB clouds.',
      features_ar: 'مساحة 500 جيجا مشفرة وتشفير عسكري للملفات المحلية بحاسوبك فورا\nحفظ وتزامن وتشفير شامل للصور والنسخ الاحتياطية بأمان\nواجهة مدمجة مباشرة تشبه عمل الـ Windows File Explorer لسهولة الإستخدام',
      features_en: 'Active 500GB cloud sizes integrating military-grade desktop local encryptions instantly\nPersistent syncing mechanisms anchoring exhaustive photo backing shielding effectively\nFamiliar incorporated native dashboard mimicking purely structural Windows File Explorers easily',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://nordvpn.com/wp-content/uploads/2021/08/nordlocker-logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/nordlocker`,
      subscription_plans: [{ label_ar: 'شهر واحد (500GB)', label_en: '1 Month (500GB)', price: 4.99, source_url: `${Z2U}/nordlocker` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 264, updated_at: now
    },
    {
      id: 'airtable-plus', name_ar: 'إير تيبل بلس لإنشاء جداول الأعمال', name_en: 'Airtable Plus',
      description_ar: 'دمج ذكي يجمع مرونة جداول الـ Excel مع هيكلة قواعد البيانات الضخمة (Database) لتصميم أنظمة تناسب عملك بشكل مثالي.',
      description_en: 'Smart integration merging raw Excel flexibility parallel comprehensive structured Databases fundamentally constructing tailor-made operational systems.',
      features_ar: 'بناء قواعد بيانات متطورة تزيد عن 5,000 سجل في القاعدة (Base) الوحيدة\nإرفاق تخزين بـ 5GB وإضافة تطبيقات جاهزة للتحليل والرسم البياني المتكامل\nتزامن وأتمتة المهام اليومية مع برامجك الأخرى بذكاء وتاريخ للتغييرات',
      features_en: 'Compose evolved extensive database matrices crossing 5,000 distinct records per Base comprehensively\nAllocating 5GB local space attaching diverse extension apps fostering visual data plotting completely\nSynchs workflows actively automating pipelines across apps while documenting 6-months historic trails',
      price: 9.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Airtable_Logo.svg/1024px-Airtable_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/airtable`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/airtable` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 265, updated_at: now
    },
    {
      id: 'clickup-unlimited', name_ar: 'كليك أب للإنتاجية', name_en: 'ClickUp Unlimited',
      description_ar: 'تطبيق الإدارة الأول عالمياً (All-in-One)! باقة توفر ميزات إدارية لانهائية ومناطق عمل لتنظيم مشاريع الفريق كاملا.',
      description_en: 'World\'s premier All-in-One organizational tool! Plentiful tiers rendering infinite management traits constructing complete team workflows completely.',
      features_ar: 'لوحات جاهزة (Dashboards)، المهام (Tasks) وعروض التقويم بالكمية غير المحدودة كليا\nتقارير أداء لا نهائية، وصلاحيات للمدعوين للمشاريع بدون دفع، والأهم تكامل للتطبيقات\nمساحة تخزين سحابية بلا حصر لكافة صور وملفات عمل لفريقك بالكامل',
      features_en: 'Limitless pristine Dashboards, boundless Tasks arrays & unchecked infinite chronological Calendar mappings strictly\nUnshackled performance pipelines welcoming unlimited unpaid guests maintaining core crucial integrations entirely\nInfinite persistent structural cloud expanses securing broad file loads permanently scaling organically',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/ClickUp_logo.svg/1024px-ClickUp_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/clickup`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/clickup` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 266, updated_at: now
    },
    {
      id: 'wrike-professional', name_ar: 'رايك الاحترافي لإدارة العمل', name_en: 'Wrike Professional',
      description_ar: 'المنصة المثالية لمدراء المشاريع والفرق السريعة (Agile). خطط للمسار الحرج واعتماد المخططات التفاعلية والموافقة.',
      description_en: 'Ideal robust platforms catering Project Managers embracing fluid Agile frameworks natively. Scheme critical trails establishing approvals dynamically.',
      features_ar: 'تخطيط العمل المتميز عبر مهام متتابعة وجداول زمنية (Gantt Charts) احترافية وعمل تفاعلي\nعروض قابلة للمشاركة وتعدد لتنظيم مهام متداخلة من ٢-٢٥ مستخدم كحد آمن\nتكامل واسع (MS Project و Excel وبرامج التخزين السحابية الأساسية كاملة)',
      features_en: 'Advanced systemic planning navigating sequential workloads plotting exhaustive interactive dynamic Gantt Charts efficiently\nBroad easily shared dashboards securely sustaining overlapping project phases anchoring 2-25 optimal members completely\nCrucial expansive connectivity strictly importing native (MS Project/Excel/Cloud) files routinely perfectly',
      price: 9.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Wrike_logo.svg/1024px-Wrike_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/wrike`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/wrike` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 267, updated_at: now
    },
    {
      id: 'smartsheet-pro', name_ar: 'سمارت شيت برو', name_en: 'Smartsheet Pro',
      description_ar: 'دمج ذكي وعملي بين أداة إدارة مشاريع بصرية مع وجهة مألوفة تماماً مثل Excel. مثالي للمعقد وتبسيط أتمتة الأعمال.',
      description_en: 'Intelligent structural merger anchoring visual project administration utilizing familiar classic Excel interfaces. Ideal automating complexities cleanly.',
      features_ar: 'عدد أشكال وصفوف لانهائية لتفصيل أعمالك بأسلوب (شيت / جريد) التقليدي لكن بقوة برامج الإدارة الفعالة\nأتمتة جاهزة (حد 250 شهريا) لإرسال الإيميلات والتذكيرات بلمسات بسيطة داخل الملف المنجز\nعروض بصرية مختلفة كواجهة البطاقات (Kanban) والتاريخ (Gantt) والتقويم الشامل',
      features_en: 'Boundless rows accommodating unrestricted scaling functioning similar historical Grid formations packing raw administrative punch entirely\nTriggered fluid automations (approaching ~250 caps) circulating automated emails & deadline buzzers natively innately\nVisual adaptable optics including precise Card views (Kanban), timelines (Gantt) & expansive scheduling Calendars',
      price: 8.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Smartsheet_logo.svg/1024px-Smartsheet_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/smartsheet`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/smartsheet` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 268, updated_at: now
    },
    {
      id: 'miro-starter', name_ar: 'ميرو (لوحات التفكير التعاوني)', name_en: 'Miro Starter / Business',
      description_ar: 'لوحة بيضاء رقمية حرة لا نهائية للفرق، للعصف الذهني، ورسم وتخطيط المنهجيات والاجتماعات بأسلوب استثنائي عن بعد.',
      description_en: 'Boundless unconstrained digital whiteboards anchoring teams engineering intensive remote brainstorms tracking methodologies exceptionally interactively.',
      features_ar: 'مساحات لوحات وإطارات غير محدودة للعمل بدل 3 فقط بالنسخة المجانية تماماً\nأكثر من 2000 نموذج ذكي للتخطيط السريع، والملاحظات الورقية والإستبيانات المتفاعلة\nأدوات خاصة للاجتماعات الحية كالمؤقت وأزرار التصويت وتصدير الرسومات عالي الجودة PDF',
      features_en: 'Limitless pristine whiteboard instances erasing completely prior standard boundaries commonly tethering free setups natively\nCatalog harboring 2,000+ ready templates enabling rapid structural mappings deploying interactive stickies efficiently\nProminent live meeting equipment embracing onboard timers seamlessly handling digital votes scaling clean high-res PDFs explicitly',
      price: 9.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Miro_Logo.svg/1024px-Miro_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/miro`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/miro` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 269, updated_at: now
    },
    {
      id: 'figma-professional', name_ar: 'فيجما للتصميم المعماري', name_en: 'Figma Professional',
      description_ar: 'رائد تصميم الواجهات وتجربة المستخدم (UI/UX). تتيح نسخة برو التعاون القوي وحفظ نسخ التصميم بشكل أبدي مفتوح.',
      description_en: 'The dominant absolute pioneer championing sheer UI/UX design capabilities. Pro tier enables robust collaborations anchoring eternal version controls completely.',
      features_ar: 'حفظ سجل وسجل لتعديلات جميع ملفات العمل بشكل غير محدود للأبد لاستعادتها بوجه سليم\nمكتبات مشتركة وقابلة للنشر لمكونات التصميم لتستخدمها فرقك بكل يسر متناسق وثبات\nمكالمات صوتية مدمجة للتحدث مع أعضاء الفريق أثناء توزع التصميم والعمل للسهولة',
      features_en: 'Eternal unconstrained historical file versioning ensuring robust flawless asset recoveries permanently entirely\nComprehensive publisher libraries broadly distributing design components universally stabilizing strict brand consistencies efficiently\nEmbedded direct spatial audio capabilities actively supporting integrated immediate discussions syncing designers optimally',
      price: 13.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1024px-Figma-logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'أداة تعمل بمتصفحك أساساً', requirements_en: 'Browser-based usually',
      source_url: `${Z2U}/figma`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 13.99, source_url: `${Z2U}/figma` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 270, updated_at: now
    },
    {
      id: 'adobe-creative-cloud', name_ar: 'أدوبي كرييتف كلاود', name_en: 'Adobe Creative Cloud',
      description_ar: 'حزمة ضخمة لكل برامج أدوبي (فوتوشوب، اليستريتور، بريمير، افتر ايفكتس والمزيد) في اشتراكك الفردي او التعليمي الرخيص.',
      description_en: 'The ultimate massive bundle gathering purely Adobe apps (Photoshop, Illustrator, Premiere, After Effects) inside economical personal/education profiles.',
      features_ar: 'الاستخدام الشرعي لـ 20+ تطبيق رئيسي للتصميم والمونتاج والإخراج من مكان واحد دائما\nمساحة سحابية أصلية تبلغ 100GB، مكتبات ضخمة للألوان والخطوط (Adobe Fonts)\nيتضمن تحديثات أدوبي فورية لتقنيات الذكاء الاصطناعي كـ Firefly وميزات الاضافة الجديدة كلياً',
      features_en: 'Legitimate unrestricted authorization utilizing 20+ flagship applications spanning graphics targeting complex editing exclusively\nAttached native 100GB cloud spaces seamlessly granting massive typography databases (Adobe Fonts) natively\nEnsures swift updates anchoring purely revolutionary AI toolkits (like Firefly generators) constantly automatically',
      price: 19.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/1024px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب أدوبي', requirements_en: 'Adobe Account',
      source_url: `${Z2U}/adobe`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/adobe` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 271, updated_at: now
    },
    {
      id: 'canva-teams', name_ar: 'كانفا للفرق / التعليمية المفتوحة', name_en: 'Canva Teams / Education',
      description_ar: 'أضف قدرات واسعة لحسابك الأساسي في كانفا، احصل على كل مميزات PRO بالاضافة إلى ميزات دعوة فرق العمل والتصاميم الرهيبة.',
      description_en: 'Elevate expansive capacities strictly attaching basic accounts, gaining holistic PRO assets merged alongside team collaborations purely cleanly.',
      features_ar: 'كل القوالب المدفوعة والصور والموسيقى بغير أي أقفال تماماً للإنتاجية العالية والمثمرة\nأدوات ذكية كالممحاة السحرية لإزالة الخلفيات وتحجيم الصور للطباعة ومنصات النشر كلها\nخيارات واسعة لجدولة مهام ونشر مباشراً بحسابات الفرق (Brand kits)',
      features_en: 'All premium templates covering isolated locked stock photos directly empowering robust infinite output securely\nIntelligent embedded AI erasers removing cleanly distinct backgrounds adapting sizes broadly fitting entire platforms\nUnleashed workflows strictly allowing broad scheduling capacities organizing explicitly dedicated comprehensive (Brand kits)',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/1024px-Canva_icon_2021.svg.png',
      duration_ar: 'شهر واحد (دعوة)', duration_en: '1 Month (Invite)', requirements_ar: 'بريد الكتروني (إيميل)', requirements_en: 'Valid Email Acc',
      source_url: `${Z2U}/canva-teams`,
      subscription_plans: [
        { label_ar: 'اشتراك شهري (عبر دعوة فريق)', label_en: 'Monthly (Team Invite)', price: 4.99, source_url: `${Z2U}/canva-teams` },
        { label_ar: 'اشتراك سنوي كامل (عبر دعوة فريق)', label_en: 'Yearly (Team Invite)', price: 14.99, source_url: `${Z2U}/canva-teams` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 272, updated_at: now
    },
    {
      id: 'picsart-gold', name_ar: 'بيكس آرت جولد للصور', name_en: 'Picsart Gold',
      description_ar: 'التطبيق الأول على الجوال لتحرير الصور! ازالة الاعلانات و تمكينك من أدوات وتأثيرات ذهبية متقدمة.',
      description_en: 'The #1 mobile photo editor! Evicts pesky ads entirely unlocking profoundly advanced golden modification utilities actively.',
      features_ar: 'استخدام كل فلاتر الفيديو والصور الحصرية بلمسات بسيطة وبدون علامات\nمزايا الاستنساخ، وتفريغ أي خلفية تماما بشكل تلقائي بالكامل\nمنع كامل لظهور الإعلانات خلال تصميماتك للوقت والمجهود',
      features_en: 'Harness exhaustive arrays merging exclusive distinct video/photo filters seamlessly eluding obnoxious watermarks completely\nSuperior AI cloners rendering precise automated sheer background erasing capabilities effortlessly routinely\nComplete firm blackout banishing intrusive ad flows totally retaining continuous energetic user focal momentums',
      price: 3.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Picsart_logo.svg/1024px-Picsart_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'يعمل للجوال أساسا', requirements_en: 'Primarily mobile app',
      source_url: `${Z2U}/picsart`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/picsart` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 273, updated_at: now
    },
    {
      id: 'vsco-membership', name_ar: 'عضوية في إس سي أو (الفلاتر)', name_en: 'VSCO Membership',
      description_ar: 'مشهور بفلاتره المميزة السينمائية والمستلهمة من كاميرات كوداك العريقة! يوفر التطبيق ادوات لتصحيح الألوان لا مثيل لها للموبايل.',
      description_en: 'Renowned broadly wielding deeply cinematic Kodak-inspired filters! Supplies phenomenally unparalleled mobile color grading mechanics distinctly flawlessly.',
      features_ar: 'فتح الكتالوج الضخم الشامل لأكثر من 200 فلتر إعداد مسبق قوي ونقي جداً\nأدوات تعديل إضافية معقدة مثل الـ (أداة حيوية HSL وتأطير الحواف والـ Dodge & Burn)\nتعديل مقاطع الفيديو بنفس القوة المتوفرة للصور وبألوان كاميرات الريترو (Retro)',
      features_en: 'Unlocking sheer access encompassing broader 200+ distinct intense refined preset catalogs thoroughly actively\nSupplementary complex manipulation utilities primarily (radiant HSL tunings alongside dodging/burning traits explicitly)\nCalibrate video reels mirroring exact robust granular mechanics targeting distinctly vintage Retro calibrations purely',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/VSCO_logo.svg/1024px-VSCO_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/vsco`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${Z2U}/vsco` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 274, updated_at: now
    },
    {
      id: 'lightroom-presets', name_ar: 'فلاتر متقدمة لبرنامج لايت روم', name_en: 'Lightroom Presets',
      description_ar: 'أضف لمسة المحترفين لصورك بضغطة زر. حزم رائعة تحوي إعدادات ضوئية ولونية (فلاتر جاهزة Presets) معدة بشكل جميل وتنزيلها.',
      description_en: 'Deliver masterful professional aesthetics swiftly instantly. Broad excellent bundles carrying exquisite precise light/color modifications organically accessible immediately.',
      features_ar: 'إعدادات قوية صممها مصورون ومصممون محترفون بوضوح شديد لتقليل أوقات المونتاج وتعديل الخلل\nحزم تشمل مجالات السفر الدارك، والمودات المظلمة الفاخرة، والإضاءة الرائعة لحفلات الزواج وغيرها\nمتوافقة تماماً للتثبيت السهل على تطبيق الجوال والديسكتوب لأداة لايت روم',
      features_en: 'Potent templates crafted strictly matching expert cinematic photographers decreasing overall prolonged editing overhead profoundly fundamentally\nBundled themes covering specifically moody dark travels pushing aesthetic boundaries addressing luxury weddings purely natively\nFlawlessly compatible integrating seamlessly deploying mobile arrays parallel maintaining standard desktop foundations fully directly',
      price: 6.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg/1024px-Adobe_Photoshop_Lightroom_CC_logo.svg.png',
      duration_ar: 'تحميل (شراء الدائم)', duration_en: 'Lifetime Download', requirements_ar: 'النسخة المحمولة متوفرة', requirements_en: 'Mobile version ready',
      source_url: `${Z2U}/lightroom-presets`,
      subscription_plans: [{ label_ar: 'حزمة ضخمة دائمة', label_en: 'Massive Lifetime Bundle', price: 6.99, source_url: `${Z2U}/lightroom-presets` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 275, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Next 100 Products (Part 7 - 25 items)...', 'color:#be185d;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 7 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

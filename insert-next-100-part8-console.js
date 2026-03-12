// ================================================
// SPARK STORE - INSERT NEXT 100 SUBSCRIPTIONS (PART 8: 176-200)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'sketch-app', name_ar: 'سكيتش لتصميم واجهات المستخدم', name_en: 'Sketchbite / Sketch',
      description_ar: 'التطبيق الكلاسيكي العريق لتصميم واجهات الـ Mac والموبايل (لأجهزة الماك فقط). أدوات فيكتور سلسة وتجربة رائعة.',
      description_en: 'The classic pioneer application engineering Mac/Mobile interfaces natively (Mac exclusively). Fluid vector tools rendering wonderful experiences.',
      features_ar: 'أقوى أداة لتصميم التطبيقات وتجربة المستخدم (UX) تعمل بنظام ماك بشكل أصلي تماماً\nمساحات عمل مشتركة للمصممين واختبار مباشر (Prototyping) على الجوال\nمئات الإضافات الذكية (Plugins) المدمجة لتسهيل سير العمل السريع',
      features_en: 'Fiercest native application engineering absolute UI/UX flows purely anchored atop Mac operating systems explicitly\nShared persistent workspaces accommodating immediate real-time mobile device Prototyping reliably natively\nHundreds embedded intelligent (Plugins) facilitating swift accelerated design operational workflows cleanly',
      price: 12.00, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sketch_Logo.svg/1024px-Sketch_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'جهاز Mac', requirements_en: 'Mac Device',
      source_url: `${Z2U}/sketch`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 12.00, source_url: `${Z2U}/sketch` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 276, updated_at: now
    },
    {
      id: 'davinci-resolve-studio', name_ar: 'دافينشي ريزولف ستوديو', name_en: 'DaVinci Resolve Studio',
      description_ar: 'وحش المونتاج وتصحيح الألوان المستخدم في السينما العالمية. مفتاح دائم للنسخة المدفوعة (Studio) بكل ميزاتها.',
      description_en: 'The editing/color-grading beast utilized globally inside Hollywood theaters. Lifetime key unlocking the (Studio) premium tier flawlessly.',
      features_ar: 'رخصة أبدية لا تتطلب اشتراك شهري تماماً لتشغيل كل ميزات الذكاء الاصطناعي\nتصحيح ألوان ومؤثرات بصرية (Fusion) وهندسة صوتية (Fairlight) بمكان واحد\nدعم التصدير السريع جداً لدقات الكاميرات السينمائية (12K / 4K)',
      features_en: 'Lifetime absolute license eliminating tedious monthly sub fees completely unlocking all premium AI tools natively\nHolistic color grading, visual effects (Fusion) & audio mastering (Fairlight) anchored cleanly centrally\nAccelerated massive rendering exports flawlessly accommodating raw cinematic (12K / 4K) resolutions aggressively',
      price: 295.00, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DaVinci_Resolve_Studio.png/1024px-DaVinci_Resolve_Studio.png',
      duration_ar: 'ترخيص مدى الحياة', duration_en: 'Lifetime License', requirements_ar: 'مفتاح تفعيل (Key)', requirements_en: 'Activation Key',
      source_url: `${Z2U}/davinci-resolve`,
      subscription_plans: [{ label_ar: 'نسخة ستوديو الدائمة', label_en: 'Lifetime Studio', price: 295.00, source_url: `${Z2U}/davinci-resolve` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 277, updated_at: now
    },
    {
      id: 'magix-vegas-pro', name_ar: 'ماجيكس فيغاس برو', name_en: 'Magix Vegas Pro',
      description_ar: 'برنامج المونتاج الشهير (Sony Vegas سابقاً). محرر فيديو متقدم يوفر لك واجهة مسارات سريعة وتأثيرات بصرية ممتازة.',
      description_en: 'The renowned editing suite (formerly Sony Vegas). Advanced video generator supplying rapid timeline tracks alongside excellent VFX natively.',
      features_ar: 'المنصة الأسهل لإنشاء مؤثرات بصرية وصوتية متزامنة عبر التراك (Track)\nتلوين متقدم يدعم (HDR) وملفات فيديو بصيغ خام ومرمزة ثقيلة\nملحقات قوية مدمجة للبث وإزالة الشاشة الخضراء (Green Screen)',
      features_en: 'The most intuitive platform originating synchronous audio/visual VFX reliably spanning active Timelines dynamically\nAdvanced colorimetric processing effectively securing (HDR) profiles decoding heavy raw film structures\nPowerful bundled plugins actively accelerating broadcast streams alongside sheer distinct Green Screen erasures',
      price: 19.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Vegas_Pro_logo.png/1024px-Vegas_Pro_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/vegas-pro`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/vegas-pro` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 278, updated_at: now
    },
    {
      id: 'fl-studio-producer', name_ar: 'إف إل ستوديو (إنتاج موسيقي)', name_en: 'FL Studio Producer',
      description_ar: 'أقوى بيئة عمل موسيقية للـ DJ ومصممي أصوات الراب. نسخة Producer تفتح قدرات التسجيل الصوتي بالكامل للابد.',
      description_en: 'The mightiest musical workstation explicitly empowering DJs/Rap producers. Producer edition permanently unlocks complete vocal recording boundaries flawlessly.',
      features_ar: 'وصول لا نهائي لمعظم الفلاتر وأدوات صناعة الـ Beats الايقاعية الأساسية\nتحديثات مجانية مدي الحياة لجميع النسخ القادمة من البرنامج (Lifetime free updates)\nالقدرة على قص وهندسة وتلوين الصوت في شريط تسجيل مستقل (Playlist)',
      features_en: 'Boundless unconstrained access covering fundamental beats/filters crucial constructing pure rhythmic patterns intuitively\nEternal explicit Lifetime Free Updates securing exclusively all forthcoming software iterations permanently\nCapabilities actively engineering/splicing direct audio clips anchoring independently tracked Playlists solidly',
      price: 199.00, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/FL_Studio_logo.svg/1024px-FL_Studio_logo.svg.png',
      duration_ar: 'ترخيص دائم', duration_en: 'Lifetime License', requirements_ar: 'لابتوب', requirements_en: 'PC / Mac',
      source_url: `${Z2U}/fl-studio`,
      subscription_plans: [{ label_ar: 'النسخة الدائمة (Producer)', label_en: 'Producer Edition (Lifetime)', price: 199.00, source_url: `${Z2U}/fl-studio` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 279, updated_at: now
    },
    {
      id: 'ableton-live-standard', name_ar: 'إيبلتون لايف لايف', name_en: 'Ableton Live Standard',
      description_ar: 'المنافس الأكبر للإنتاج الموسيقي الحي! يقدم تجربة عبقرية للارتجال أثناء الحفلات وتسجيل المقاطع بمرونة مذهلة.',
      description_en: 'The absolute fiercest rival steering live musical productions! Delivers genius improvisational realms executing flexible gigs breathtakingly swiftly.',
      features_ar: 'واجهة عرض أداء حية (Session View) مصممة خصيصاً للموسيقى الحية بلا توقف\nأصوات وآلات سيمفونية ومؤثرات ضخمة مدمجة في النسخة الأساسية (Standard)\nتكامل رهيب مع أي أجهزة ميدي (MIDI Controllers) لتعزف ببراعة',
      features_en: 'Native (Session View) interfaces engineered entirely accommodating strictly unstoppable live gig musical flows reliably\nMassive onboard symphonic instrumentations bundled broadly within fundamental (Standard) editions explicitly\nMiraculous integration thoroughly linking expansive external hardware (MIDI Controllers) performing brilliantly efficiently',
      price: 439.00, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ableton_Logo.svg/1024px-Ableton_Logo.svg.png',
      duration_ar: 'ترخيص أبدية', duration_en: 'Lifetime License', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/ableton`,
      subscription_plans: [{ label_ar: 'ترخيص Standard دائم', label_en: 'Lifetime Standard', price: 439.00, source_url: `${Z2U}/ableton` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 280, updated_at: now
    },
    {
      id: 'linkedin-learning', name_ar: 'لينكدإن ليرنينج', name_en: 'LinkedIn Learning',
      description_ar: 'آلاف الدورات المعتمدة في الإدارة والبرمجة والتصميم، لترفع من قيمة سيرتك الذاتية (CV) مباشرة على منصة LinkedIn!',
      description_en: 'Thousands of certified courses covering Management, Code, & Design, actively elevating your Resume (CV) prominently directly on LinkedIn!',
      features_ar: 'إضافة الشهادات الرسمية لحسابك المهني بضغطة زر ليرها الوظفون فورا\nمسارات تعليمية (Learning Paths) واضحة لتعلم مهنة جديدة من الصفر\nمرفق معه اشتراك LinkedIn Premium لتوسيع شبكة تواصلك الوظيفية',
      features_en: 'Attach official completion certificates visibly directly upgrading your professional profile targeting recruiters instantly\nStructured clear (Learning Paths) comprehensively nurturing brand-new careers starting natively from scratch\nBundled actively wrapping comprehensive LinkedIn Premium tiers broadly expanding prominent networking scopes',
      price: 29.99, currency: 'USD', category: 'education', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/1024px-LinkedIn_logo_initials.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب LinkedIn', requirements_en: 'LinkedIn Account',
      source_url: `${Z2U}/linkedin-learning`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 29.99, source_url: `${Z2U}/linkedin-learning` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 281, updated_at: now
    },
    {
      id: 'coursera-plus', name_ar: 'كورسيرا بلس', name_en: 'Coursera Plus',
      description_ar: 'تذكرة لدخول أكثر من 7000 دورة وتخصصات وبرامج شهادات احترافية من جامعات وشركات كبرى (Google، Meta، IBM).',
      description_en: 'An access pass unlocking 7000+ courses, specialties & strictly professional certificate programs from elite entities (Google, Meta, IBM).',
      features_ar: 'شهادات لامحدودة يمكن الحصول عليها من أقوى جامعات العالم كستانفورد وميتشيغان\nفتح التخصصات الطويلة (Specializations) دون دفع كل دورة على حدة\nملائم جداً للترقية الوظيفية واكتساب مهارات ثقيلة بالذكاء الاصطناعي وتقنية المعلومات',
      features_en: 'Uncapped certifiable credentials earned natively straight across world-dominant universities like Stanford inherently\nUnlocks intensive chained (Specializations) bypassing individual strict singular course fee barriers entirely\nExtremely viable accelerating real career advancements acquiring deep heavy AI & profound IT competencies thoroughly',
      price: 59.00, currency: 'USD', category: 'education', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1024px-Coursera-Logo_600x600.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/coursera`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 59.00, source_url: `${Z2U}/coursera` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 282, updated_at: now
    },
    {
      id: 'edx-verified', name_ar: 'إي دي إكس (شهادات موثقة)', name_en: 'edX Verified Certificates',
      description_ar: 'منصة هارفر وMIT. ادرس مجاناً، لكن اشتري الشهادة الموثقة للمقرر لتأكيد اجتيازك ووضعها بسيرتك المهنية بثقة.',
      description_en: 'Harvard & MIT\'s hub. Study freely, but purchase validated course Certificates confidently proving completion actively boosting strict resumes.',
      features_ar: 'اختبارات نهائية متقدمة تؤهل لنيل وثيقة معتمدة وموثوقة من أعرق الجامعات\nفتح المحتويات المقفلة للمادة كالواجبات والإمتحانات التي يصححها أكاديميون\nالشهادة لا تنتهي صلاحيتها ورابط إثباتها رسمي و دائم للشركات',
      features_en: 'Advanced final strictly graded examinations ultimately qualifying authentic validated documents backed thoroughly legitimately\nUnlocking fully restricted course contents incorporating academic-graded definitive assignments fundamentally\nEverlasting credentials permanently displaying valid official institutional verification rails directly impressing recruiters',
      price: 99.00, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/EdX.svg/1024px-EdX.svg.png',
      duration_ar: 'دورة واحدة', duration_en: '1 Course', requirements_ar: 'إتمام المادة', requirements_en: 'Course Completion',
      source_url: `${Z2U}/edx`,
      subscription_plans: [{ label_ar: 'رسوم شهادة موثقة (لمادة)', label_en: 'Verified Cert (1 Course)', price: 99.00, source_url: `${Z2U}/edx` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 283, updated_at: now
    },
    {
      id: 'duolingo-super', name_ar: 'سوبر دوولينجو لتعلم اللغات', name_en: 'Duolingo Super/Max',
      description_ar: 'تعلم أكثر من 40 لغة بمتعة! اشتراك السوبر يحذف الإعلانات كلياً ويعطيك "قلوب" لا نهائية لتستمر بالتعلم بطلاقة.',
      description_en: 'Learn 40+ languages joyfully! Super tiers totally banish ads granting infinite "hearts" ensuring flawlessly unbroken fluent study streaks.',
      features_ar: 'قلوب (Lives) لا نهائية مما يعني إكمال للدروس حتى لو أخطأت\nلا إعلانات مزعجة أبداً مع إمكانية تحميل الدروس\nتدريب متخصص يعتمد على أخطائك السابقة (Practice Hub) لإتقانها',
      features_en: 'Infinite hearts fundamentally allowing continuously unbroken lesson progression regardless of silly mistakes strictly\nAbsolutely zero intrusive commercial ads merged alongside native offline lesson downloads cleanly\nSpecialized automated (Practice Hub) drills relentlessly targeting previously failed linguistic nuances natively perfecting them',
      price: 6.99, currency: 'USD', category: 'education', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Duolingo_logo.svg/1024px-Duolingo_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/duolingo`,
      subscription_plans: [{ label_ar: 'شهر واحد (سوبر)', label_en: '1 Month (Super)', price: 6.99, source_url: `${Z2U}/duolingo` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 284, updated_at: now
    },
    {
      id: 'memrise-pro', name_ar: 'ميمرايز برو', name_en: 'Memrise Pro',
      description_ar: 'أفضل تطبيق لحفظ مفردات اللغات (الكلمات) مبني على فيديوهات حقيقية لأشخاص يتحدثون بلكنتهم الأصلية من الشارع.',
      description_en: 'The prime app securing vocabulary retentions explicitly relying on authentic real-world videos natively showcasing street-level dialects safely.',
      features_ar: 'الوصول لكل الفيديوهات التعليمية (Learn with Locals) الممتعة\nمسارات تعليمية مفتوحة كاملة للكلمات والقواعد بشكل غير محدود\nإحصاءات تعليمية دقيقة والتحميل أوفلاين في التطبيق',
      features_en: 'Comprehensive unlocking accessing immersive enjoyable (Learn with Locals) visual media seamlessly natively\nUnconstrained broad educational trails targeting boundless grammars/vocabularies completely explicitly\nPrecise accurate analytical study statistics complementing flawless mobile app offline downloads',
      price: 8.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Memrise_logo.svg/1024px-Memrise_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/memrise`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/memrise` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 285, updated_at: now
    },
    {
      id: 'drops-premium', name_ar: 'تطبيق دروبس', name_en: 'Drops Premium',
      description_ar: 'تطبيق بصري للغات: 5 دقائق يومياً بحفظ أشكال الكلمات لتزيد مفرداتك بأسلوب مذهل يشبه اللعب وبدون ضياع للوقت.',
      description_en: 'Visual linguistic app: 5 daily minutes memorizing word forms expanding lexicons adopting miraculously playful mechanics avoiding wasted time entirely.',
      features_ar: 'وقت تعلم مفتوح (بدل 5 دقائق بالنسخة المجانية) بدون حدود\nفتح أكثر من 50 لغة نادرة ولهجات مميزة بشكل فوري\nتخطي الكلمات التي تعرفها لتوفير وقتك وتعلم ما هو جديد فقط',
      features_en: 'Uncapped unlimited studying timers (overriding standard free 5-minute strict limits) flawlessly seamlessly\nInstantly unlocking 50+ rare exotic languages embedding highly distinct regional dialects cleanly\nBypassing known redundant vocabularies structurally saving crucial time prioritizing strictly fresh inputs securely',
      price: 9.99, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Drops_logo.png/1024px-Drops_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/drops`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/drops` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 286, updated_at: now
    },
    {
      id: 'khan-academy-donations', name_ar: 'منصة خان أكاديمي', name_en: 'Khan Academy (Donations/Accs)',
      description_ar: 'المنصة المجانية الأشهر! تبرِع أو احصل على حسابات تتبع جاهزة للأطفال للدراسة في الرياضيات والعلوم بطرق عبقرية.',
      description_en: 'The renowned free platform! Donate inherently or acquire pre-configured tracking accounts monitoring children structurally mastering rigorous Maths & Sciences brilliantly.',
      features_ar: 'منصة مجانية 100٪ بدون اعلانات نهائياً تدعم آلاف الفيديوهات التعليمية للعلوم\nيمكن مساعدة المنصة عبر التبرع الرسمي (عن طريق المتجر)\nتوفير حسابات مدرس/ولي أمر مجهزة لمتابعة تطور الأبناء بدقة',
      features_en: 'Absolutely genuine 100% free non-profit hub safely hosting thousands foundational STEM videos cleanly natively\nCapabilities safely supporting this grand infrastructure leveraging official direct (storefront) donations gracefully\nSupplying precisely tailored parent/teacher administrative arrays strictly tracking detailed childhood educational growths robustly',
      price: 5.00, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Khan_Academy_logo.svg/1024px-Khan_Academy_logo.svg.png',
      duration_ar: 'دعم / تفعيل حساب', duration_en: 'Support / Acc Setup', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/khan-academy`,
      subscription_plans: [{ label_ar: 'دعم / تجهيز حساب', label_en: 'Support / Setup Acc', price: 5.00, source_url: `${Z2U}/khan-academy` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 287, updated_at: now
    },
    {
      id: 'treehouse', name_ar: 'تري هاوس (لتعلم الويب)', name_en: 'Treehouse',
      description_ar: 'أفضل منصة تفاعلية لتعلم البرمجة (تصميم مواقع التطبيقات). اكتب الكود واستلم تصحيح فوري من بيئة الموقع.',
      description_en: 'The supreme interactive coding learning hub (Web/App designs). Write codebase natively receiving instantaneous validations directly inside website environments.',
      features_ar: 'تكويد فعلي على المتصفح (Workspaces) لاختبار الشفرة بدون تنزيل برامج ثقيلة أحيانا\nمسارات مهنية (Techdegrees) تغنيك عن الجامعات للحصول على وظيفتك الأولى بملف أعمال جاهز\nمكتبة ضخمة لتحديثات لغات البرمجة الجديدة (Swift, React, Python)',
      features_en: 'Practical active browser-native (Workspaces) safely executing code logic avoiding massive heavy IDE baseline downloads entirely\nExpansive vocational (Techdegrees) replacing standard universities targeting explicitly first hires deploying comprehensive ready Portfolios natively\nMassive continuously updated libraries anchoring modern frameworks strictly (Swift, React, Python) comprehensively',
      price: 25.00, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Treehouse_logo.svg/1024px-Treehouse_logo.svg.png',
      duration_ar: 'شهر واحد (أساسي)', duration_en: '1 Month (Basic)', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/treehouse`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month (Basic)', price: 25.00, source_url: `${Z2U}/treehouse` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 288, updated_at: now
    },
    {
      id: 'udacity-nanodegree', name_ar: 'درجات النانو من يوداسيتي', name_en: 'Udacity Nanodegrees',
      description_ar: 'برامج (النانو ديجري) القوية بالتعاون مع Google و IBM لتعليمك أحدث مجالات التكنولوجيا كالذكاء الاصطناعي بدقة.',
      description_en: 'Potent intensive (Nanodegree) tracks forged actively cooperating precisely alongside Google & IBM rigorously teaching utmost modern AI tech sectors.',
      features_ar: 'مشاريع حقيقية جداً (Real-world projects) يقوم بتصحيحها خبراء بشريون لك\nدعم وتوجيه (Mentoring) متواصل لدخول سوق العمل\nتركيز تام واستثنائي على مهارات البيانات، السايبر سكيوريتي والبرمجة',
      features_en: 'Exceptionally visceral (Real-world projects) explicitly evaluated meticulously delivering genuine human-expert feedback steadily\nContinuous active proactive career (Mentoring) accelerating direct seamless workforce entries thoroughly reliably\nMonumental hyper-focus rigorously prioritizing Data sciences, Cyber-securities & complex Software architectures actively',
      price: 399.00, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Udacity_logo.svg/1024px-Udacity_logo.svg.png',
      duration_ar: 'شهر واحد (وصول كامل)', duration_en: '1 Month Full Access', requirements_ar: 'التزام وقت كافي', requirements_en: 'Time Commitment',
      source_url: `${Z2U}/udacity`,
      subscription_plans: [{ label_ar: 'شهر واحد لدرجة النانو', label_en: '1 Month Nanodegree', price: 399.00, source_url: `${Z2U}/udacity` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 289, updated_at: now
    },
    {
      id: 'skillsoft', name_ar: 'سكيل سوفت للتدريب المؤسسي', name_en: 'Skillsoft',
      description_ar: 'منصة التدريب المصممة خصوصاً للشركات لرفع كفاءة الموظفين بشهادات ومهارات القيادة والأمان وتقنية المعلومات.',
      description_en: 'The premier corporate-engineered drilling platform explicitly scaling employee optimizations granting heavy certifications bridging crucial leadership, IT, & security scopes.',
      features_ar: 'آلاف مسارات القيادة الإدارية والامتثال (Compliance) للشركات وفرق العمل\nوصول لا محدود لكتب (Percipio) الصوتية والنصوص لسرعة التعلم\nشهادات توثقها أقوى المعاهد التقنية لإثبات كفاءة مهارة موظفك',
      features_en: 'Thousands of corporate Compliance & robust managerial Leadership developmental pipelines accommodating expansive teams distinctly\nBoundless unrestrained limits unlocking the (Percipio) audio/textual library accelerating steep learning ramps solidly\nVerifiable credentials strictly authenticated natively leveraging immense tech institutes proving outright employee competencies efficiently',
      price: 29.00, currency: 'USD', category: 'education', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Skillsoft_Logo.svg/1024px-Skillsoft_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'إيميل فرد أو شركة', requirements_en: 'Corp/Personal Email',
      source_url: `${Z2U}/skillsoft`,
      subscription_plans: [{ label_ar: 'شهر واحد (اشتراك شخصي)', label_en: '1 Month (Individual)', price: 29.00, source_url: `${Z2U}/skillsoft` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 290, updated_at: now
    },
    {
      id: 'nordvpn-complete', name_ar: 'نورد في بي إن (باقة كاملة)', name_en: 'NordVPN Complete',
      description_ar: 'ليس فقط VPN قوي! باقة (Complete) تحتوي على حماية للشبكة، و NordPass (لحفظ الباسوردات) و NordLocker للتخزين.',
      description_en: 'Not solely a dominant VPN! The integrated (Complete) tier encapsulates profound network armors, NordPass (passwords vault) & broad NordLocker storage natively.',
      features_ar: 'أكثر من 6000 سيرفر سريع لفتح منصات البث (Netflix) العالمية\nحماية متقدمة من التهديدات (Threat Protection) لمنع الإعلانات والبرامج الضارة\nتأمين شامل يشمل إدارة كل كلمات المرور وتخزين مشفر بـ 1 تيرابايت',
      features_en: 'Over 6000 ultrafast rapid servers actively bypassing geo-blocks reliably executing global streaming formats (Netflix) efficiently\nHighly advanced active native (Threat Protections) strictly blocking aggressive trackers, intrusive ads & malicious worms proactively\nHolistic shielding anchoring pure encrypted password managers alongside a fortified 1 Terabyte encrypted locker safely',
      price: 5.99, currency: 'USD', category: 'vpn', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/NordVPN_logo.svg/1024px-NordVPN_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/nordvpn`,
      subscription_plans: [{ label_ar: 'شهر واحد (باقة Ultimate)', label_en: '1 Month (Complete)', price: 5.99, source_url: `${Z2U}/nordvpn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 291, updated_at: now
    },
    {
      id: 'protonvpn-plus', name_ar: 'بروتون في بي إن بلس', name_en: 'ProtonVPN Plus',
      description_ar: 'خدمة سويسرية مبنية على الخصوصية 100%. بدون سياسة تسجيل (No-logs) وبنية تحتية تقاوم أصعب قيود المراقبة.',
      description_en: 'Swiss service constructed 100% atop flawless privacy architectures. Zero recording matrices (No-logs) operating profound rigorous censorship-resistant infrastructures natively.',
      features_ar: 'ميزة (Secure Core) التي توجه مرورك عبر دول آمنة جدا (سويسرا/أيسلندا) للخصوصية\nدعم ممتاز لمواقع التحميل (P2P/التورنت) بسرعات استثنائية\nآداة لفك حجب المواقع المنيعة وحظر الإعلانات الآلي (NetShield)',
      features_en: 'Magnificent (Secure Core) capabilities cleverly routing traffic safely threading highly protected privacy-havens essentially (Swiss/Icelandic servers)\nExcellent optimizations explicitly handling heavy torrent downloads (P2P) accelerating consistently retaining unparalleled speeds cleanly\nNative tools reliably dismantling tough web censors integrating powerful autonomous ad tracker blocks fundamentally (NetShield)',
      price: 9.99, currency: 'USD', category: 'vpn', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/ProtonVPN_logo.svg/1024px-ProtonVPN_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/protonvpn`,
      subscription_plans: [{ label_ar: 'شهر واحد (باقة بلس)', label_en: '1 Month (Plus)', price: 9.99, source_url: `${Z2U}/protonvpn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 292, updated_at: now
    },
    {
      id: 'windscribe-pro', name_ar: 'ويندسكرايب برو', name_en: 'Windscribe Pro',
      description_ar: 'تطبيق يتميز بتشفير فائق الأمان وميزة جدار الحماية (Firewall) المبنية لحجب تتبعك من مزود الإنترنت.',
      description_en: 'Application notably distinct deploying ultra-safe structural encryptions alongside built-in (Firewalls) relentlessly obstructing stealth tracking deployed via native ISPs completely.',
      features_ar: 'الوصول لخوادم بجميع دول العالم لفك مختلف الحظرات القاسية\nأداة R.O.B.E.R.T المذهلة لحجب الإعلانات وتخصيص مسارات المواقع المحظورة بدقة\nيسمح باستخدام عدد أجهزة غير محدود كليا بالحساب نفسه بدون طرد',
      features_en: 'Accessing an exhaustive global grid effectively bypassing heavily rigid rigorous country-level content bans purely flawlessly\nBreathtaking customized R.O.B.E.R.T mechanics aggressively destroying malware/ads firmly allowing granular blocking configurations strictly inherently\nPermits completely uncapped unbounded concurrent devices tied explicitly targeting identical accounts permanently omitting device limits strictly',
      price: 9.00, currency: 'USD', category: 'vpn', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Windscribe_logo.svg/1024px-Windscribe_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/windscribe`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.00, source_url: `${Z2U}/windscribe` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 293, updated_at: now
    },
    {
      id: 'mullvad-vpn', name_ar: 'مالفاد في بي إن', name_en: 'Mullvad VPN',
      description_ar: 'الأفضل للسرية المطلقة واختيار المحترفين كلياً! لا يتطلب إيميل أو باسوورد (يعطيك رقم حساب فقط) ليعزلك عن العالم.',
      description_en: 'The absolute choice assuring absolute confidentiality revered entirely amongst professionals strictly! No emails/passwords requested (assigns pure account numbers solely) cleanly isolating clients globally.',
      features_ar: 'لا يتم طلب أي معلومات شخصية لإنشاء الحساب إطلاقا للخصوصية التامة الكاملة\nتكامل وتجهيز داخلي مدمج لبروتوكول WireGuard لسرعات نقل استثنائية جدا\nسعر ثابت لن يخضع للتغيير او العروض الوهمية إطلاقاً (5 يورو بالشهر)',
      features_en: 'Collects absolutely zero personally identifiable data maintaining perfectly transparent pristine registration mechanics flawlessly strictly\nImmaculate robust interior wireframing deeply utilizing fast modern WireGuard protocol achieving remarkably steep unthrottled throughputs completely\nStable permanently fixed monthly standard flat-fees actively repelling deceptive fake sales wholly essentially (€5 generally)',
      price: 5.50, currency: 'USD', category: 'vpn', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mullvad_logo.svg/1024px-Mullvad_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'رقم حساب فقط', requirements_en: 'Account # Only',
      source_url: `${Z2U}/mullvad`,
      subscription_plans: [{ label_ar: 'شهر واحد (+/- 5€)', label_en: '1 Month (+/- 5€)', price: 5.50, source_url: `${Z2U}/mullvad` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 294, updated_at: now
    },
    {
      id: 'kaspersky-premium', name_ar: 'كاسبرسكي لمكافحة الفيروسات', name_en: 'Kaspersky Premium',
      description_ar: 'الوحش الروسي لحماية حاسوبك من فيروسات الفدية، تجسس الكاميرا، وسرقة البيانات! الباقة القصوى تشمل VPN سريع ومجاني.',
      description_en: 'The Russian juggernaut securing your workstations inherently against Ransomwares, webcam spying & sheer data thefts! Peak Premium tiers pack rapid bundled VPNs effortlessly.',
      features_ar: 'ترخيص رسمي وقوي لصد أقوى وأشرس هجمات الاختراق والفايروسات الصامتة\nتتضمن خزانة ملفات مشفرة و مراقبة صحة الـ Wi-Fi والشبكة الذكية بالمنزل\nتأمين للمدفوعات البنكية (Safe Money) لحماية أرقام بطاقتك وتضمن اشتراكاتك بالكامل',
      features_en: 'Firm official licenses flawlessly intercepting deeply malicious brute-forces alongside silent stealth Trojan attacks efficiently completely\nEncompasses robust encrypted robust digital lockers actively monitoring overarching WiFi security infrastructures persistently flawlessly internally\nSecures checkout/banking processes employing native (Safe Money) vaults reliably dodging card skimming totally safely',
      price: 19.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kaspersky_logo_2019.svg/1024px-Kaspersky_logo_2019.svg.png',
      duration_ar: 'سنة واحدة كود', duration_en: '1 Year License', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/kaspersky`,
      subscription_plans: [{ label_ar: 'ترخيص سنة لجهاز واحد', label_en: '1 Year (1 Device)', price: 19.99, source_url: `${Z2U}/kaspersky` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 295, updated_at: now
    },
    {
      id: 'bitdefender-total-security', name_ar: 'بيت ديفيندر لأمن الأجهزة الشامل', name_en: 'Bitdefender Total Security',
      description_ar: 'أخف مكافح فيروسات ولا يسبب بطء للجهاز! يوفر حماية للأجهزة المتعددة (ماك/ويندوز/موبايل) بضغطة واحدة وفحص عميق.',
      description_en: 'The lightest footprint antivirus wholly evading bothersome system sluggishness inherently! Equips sweeping Multi-Device (Mac/Win/Mobile) umbrellas executing profound robust granular scans.',
      features_ar: 'درع رائع ضد فيروسات الفدية يمنع تشفير ملفات ألعابك وصورك المهمة أبداً\nأدوات خاصة مضمنة لحماية هواتف أبنائك وتحديد مكان أجهزتهم (Parental control)\nفحص أوتوماتيكي ومستمر خفيف جداً لن يعيق أداء أو استهلاكك للرام بالكمبيوتر',
      features_en: 'Tremendous protective shield fiercely dodging terrifying ransomware stopping destructive encryption ravaging primary digital files cleanly completely\nSpecial bundled distinct utilities explicitly guarding children\'s smartphones mapping precisely locations consistently cleanly (Parental Control)\nUltra-lightweight ongoing background continuous scans firmly operating omitting severe sluggishness reserving workstation RAM capacities smoothly actively',
      price: 24.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BitDefender_Logo.svg/1024px-BitDefender_Logo.svg.png',
      duration_ar: 'سنة واحدة (تحديث)', duration_en: '1 Year Code', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/bitdefender`,
      subscription_plans: [{ label_ar: 'سنة لـ 5 أجهزة', label_en: '1 Year (5 Devices)', price: 24.99, source_url: `${Z2U}/bitdefender` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 296, updated_at: now
    },
    {
      id: 'malwarebytes-premium', name_ar: 'مالوير بايتس (مكافح البرمجيات الخبيثة)', name_en: 'Malwarebytes Premium',
      description_ar: 'شريكك الثاني بجانب أي انتي فايروس لتمشيط جهازك وتنظيفه بعنف من أقوى الديدان الخبيثة والتهديدات المخفية بذكاء.',
      description_en: 'Your trusted secondary wingman seamlessly complementing baseline antiviruses aggressively sweeping devices actively destroying covert cleverly hidden destructive malware natively purely.',
      features_ar: 'يمحي بقوة برامج الروتكيت والإعلانات الإجبارية (Adware) العنيدة التي تبطئ نظامك\nحماية ويب متقدمة تدافع ضد الروابط والصفحات الاحتيالية (Scams/Phishing) مباشرة\nسرعة فحص ومسح مذهلة بدون مسح ملفات الويندوز الأصلية للنظام الآمن كلياً',
      features_en: 'Aggressively obliterates stubborn complex rootkits alongside forced adware drastically alleviating sluggish persistent system burdens entirely\nAdvanced fluid web perimeters seamlessly defending dynamically intercepting hazardous (Scam/Phishing) URLs practically fundamentally autonomously\nPhenomenal sweeping fast checking paces strictly avoiding collateral eradications impacting essential structural localized Windows components purely',
      price: 19.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Malwarebytes_logo_2016.svg/1024px-Malwarebytes_logo_2016.svg.png',
      duration_ar: 'سنة واحدة', duration_en: '1 Year Code', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/malwarebytes`,
      subscription_plans: [{ label_ar: 'سنة لجهاز واحد', label_en: '1 Year (1 Device)', price: 19.99, source_url: `${Z2U}/malwarebytes` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 297, updated_at: now
    },
    {
      id: 'discord-nitro-full', name_ar: 'ديسكورد نايترو (النسخة الكاملة)', name_en: 'Discord Nitro (Full)',
      description_ar: 'ترقية الديسكورد القصوى! ايموجي متحركة، باج بروفايل مذهل دائم، زيادة حجم رفع الملفات لـ 500MB وجودة بث 4K.',
      description_en: 'The ultimate overarching Discord upgrade actively! Animated emojis, an everlasting flashy profile badge, uncapped 500MB uploads supporting flawlessly 4K streaming qualities strictly.',
      features_ar: 'تخصيص ملفك بالكامل (خلفية متحركة Cover، وأيقونة الأفاتار، وألوان الأسماء مخصصة)\nقدرات بث الألعاب (Go Live) رائعة جدا بشاشات 4k ودقة إطارات تصل لـ 60 للإبهار\nيعطيك تعزيزين سيرفر مجانين (2x Boosts) لتدعم السيرفرات التي تهتم بها لترفع مركزها',
      features_en: 'Completely unconstrained holistic aesthetic profile personalizations inherently (Animated covers/Avatars, Custom naming colors natively)\nAwesome gaming streaming functionalities solidly granting crisp (Go Live) streams pushing 4k 60fps flawlessly gracefully\nSupplies fundamentally 2 gratis server upgrades cleanly (2x Boosts) backing heavily populated managed communities elevating ranks inherently',
      price: 9.99, currency: 'USD', category: 'software', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Discord_Color_Text_Logo_%282015-2021%29.svg/1024px-Discord_Color_Text_Logo_%282015-2021%29.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب غير محظور', requirements_en: 'Clean Discord Acc',
      source_url: `${Z2U}/discord`,
      subscription_plans: [{ label_ar: 'شهر نايترو كامل', label_en: '1 Month Full Nitro', price: 9.99, source_url: `${Z2U}/discord` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 298, updated_at: now
    },
    {
      id: 'discord-nitro-classic', name_ar: 'ديسكورد نايترو كلاسيك / Basic', name_en: 'Discord Nitro Classic/Basic',
      description_ar: 'باقة رخيصة لمميزات الدردشة الاساسية — ايموجيات متحركة من السيرفرات وشارة في البروفايل ورفع لـ 50 ميجا.',
      description_en: 'The economical tier acquiring bare chat essentials natively — globally activated animated emojis complementing profile badges boosting uploads crossing 50MBs strictly.',
      features_ar: 'سعر منخفض جداً للحصول على ميزة الإيموجي والإستيكرات (Stickers) في أي دردشة\nاستخدام شارة (Nitro Badge) لإثبات الدعم، ورفع فيديو يبلغ حجمه 50MB لكل رسالة منفصلة\nبث شاشة بدقة 1080P ومعدل 60 إطارا ممتاز للعب واللقطات مع اصدقائك بشكل محترم',
      features_en: 'Fiercely economical rates granting unbounded global cross-server integrations securely activating explicit animated emoji/sticker accesses seamlessly natively\nActively wearing the (Nitro Badge) signifying active support accommodating 50MB discrete file loads effectively explicitly independently\nScreen-shares projecting cleanly clear 1080P frames reliably holding steady 60fps suitable effectively streaming casual friend sessions solidly purely',
      price: 2.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Discord_Color_Text_Logo_%282015-2021%29.svg/1024px-Discord_Color_Text_Logo_%282015-2021%29.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب غير محظور', requirements_en: 'Clean Discord Acc',
      source_url: `${Z2U}/discord`,
      subscription_plans: [{ label_ar: 'شهر نايترو كلاسيك', label_en: '1 Month Basic Nitro', price: 2.99, source_url: `${Z2U}/discord` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 299, updated_at: now
    },
    {
      id: 'whatsapp-api-services', name_ar: 'منصات ربط واتساب API للشركات', name_en: 'WhatsApp API Services',
      description_ar: 'مصلح للأنشطة التجارية الكبيرة لارسال الرسائل بالجملة. يشمل حساب منصة توفر لك صندوق رسائل مشترك لجميع الموظفين وربط.',
      description_en: 'Crucial for established commercial entities blasting bulk campaigns safely. Contains platform accessing shared multi-agent inboxes integrating massive systems entirely natively.',
      features_ar: 'احصل على واجهة لربط الواتساب ببرامج متجرك مثل (Shopify و منصات CRM) برقمك الرسمي\nالقدرة على تخصيص رد آلي متكامل ورسائل جماعية (Broadcast) بقوالب معتمدة من ميتا للجميع\nإدارة رقم الواتساب الواحد من أكثر من 5 أشخاص في نفس اللحظة من البرنامج بمتصفحاتهم',
      features_en: 'Gain integrated direct interfaces securely hooking standard WhatsApp endpoints targeting native external shops (Shopify/CRMs) leveraging authorized distinct official numbers thoroughly\nHolistic automated dynamic reply bots cleanly launching broad exhaustive authorized templates solidly targeting massive explicit client bases reliably entirely\nAccommodating single unified WhatsApp numbers broadly scaled navigating across distinctly diverse agent terminals concurrently firmly cleanly natively',
      price: 49.00, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/WhatsApp_Business_icon.png/1024px-WhatsApp_Business_icon.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Business/Facebook', requirements_en: 'Verified FB Business',
      source_url: `${Z2U}/whatsapp-api`,
      subscription_plans: [{ label_ar: 'اشتراك منصة شهري', label_en: '1 Month Platform', price: 49.00, source_url: `${Z2U}/whatsapp-api` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 300, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Next 100 Products (Part 8 - 25 items)...', 'color:#8b5cf6;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 8 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

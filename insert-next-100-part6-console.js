// ================================================
// SPARK STORE - INSERT NEXT 100 SUBSCRIPTIONS (PART 6: 126-150)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'britbox', name_ar: 'بريت بوكس (للمسلسلات البريطانية)', name_en: 'BritBox',
      description_ar: 'أضخم منصة للبث البريطاني! اجمع بين إنتاجات BBC و ITV ومسلسلات الغموض الشهيرة (مثل Doctor Who القديم).',
      description_en: 'The largest streaming platform covering British television! Combines BBC & ITV productions & famous mysteries prominently.',
      features_ar: 'أكبر مجموعة لمسلسلات الغموض والجريمة البريطانية\nمسلسلات كوميدية ودراما كلاسيكية غير موجودة بغيره\nعروض حصرية (BritBox Originals) مذهلة',
      features_en: 'The biggest collection holding British mysteries comprehensively\nClassic comedy & dramas inaccessible elsewhere natively\nStunning exclusive shows (BritBox Originals)',
      price: 8.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/BritBox_logo_2022.svg/1024px-BritBox_logo_2022.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا/بريطانيا)', requirements_en: 'VPN (USA/UK)',
      source_url: `${Z2U}/britbox`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/britbox` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 226, updated_at: now
    },
    {
      id: 'acorn-tv', name_ar: 'أكرون تي في (مسلسلات الغموض)', name_en: 'Acorn TV',
      description_ar: 'البديل الأرخص لعشاق مسلسلات التحقيق! منصة مخصصة بالكامل لدراما الجريمة البريطانية والأسترالية الشيقة.',
      description_en: 'The cheaper alternative attracting investigation fans! A platform entirely dedicated addressing engaging British/Australian crime dramas.',
      features_ar: 'أعمال أصلية لجرائم الغرب (مثل Murdoch Mysteries)\nتحديث مستمر بآلاف الساعات الدرامية المستقلة\nسعر منافس جداً مقارنة بالمنافسين ببريطانيا',
      features_en: 'Original western crime series simply (e.g. Murdoch Mysteries)\nConstant updates deploying thousands of independent dramatic hours\nExtremely competitive pricing comparing relative British competitors',
      price: 6.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Acorn_TV_logo.png/1024px-Acorn_TV_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/acorn-tv`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/acorn-tv` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 227, updated_at: now
    },
    {
      id: 'espn-plus', name_ar: 'إي إس بي إن بلس (للرياضة)', name_en: 'ESPN+',
      description_ar: 'أقوى شبكة رياضية حية بالعالم لآلاف الأحداث (UFC، دوريات التنس، البيسبول وكليات أمريكا) وبطولات ضخمة.',
      description_en: 'World\'s dominant live sports network streaming thousands of events (UFC, Tennis circuits, Baseball, Colleges) thoroughly.',
      features_ar: 'البطل الأساسي لبث بطولات الـ UFC (شامل الـ Fight Nights)\nآلاف المباريات الحية يومياً لبطولات التنس وجولف والتزلج\nمكتبة رائعة لأضخم الوثائقيات الرياضية (30 for 30)',
      features_en: 'The premier hub broadcasting UFC events (including Fight Nights natively)\nThousands of live daily matches (Tennis, Golf, Skiing)\nA phenomenal library compiling monumental sports documentaries (30 for 30)',
      price: 10.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ESPN_Plus_logo.svg/1024px-ESPN_Plus_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/espn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 10.99, source_url: `${Z2U}/espn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 228, updated_at: now
    },
    {
      id: 'dazn', name_ar: 'دازن (لبطولات الملاكمة والفنون القتالية)', name_en: 'DAZN (Boxing/MMA)',
      description_ar: 'الموطن الحصري لعشاق الفنون القتالية، تبُث أكثر من 50 حدث ملاكمة ضخم سنوياً مع بعض ألعاب القدم في أوروبا.',
      description_en: 'The exclusive home welcoming combat sports enthusiasts, streaming 50+ mega boxing events annually globally.',
      features_ar: 'بث مباشر لأقوى نزالات الملاكمة دون الحاجة لشراء بطاقات الدفع للمشاهدة (PPV)\nبطولات الفنون القتالية العالمية وأخبار مباشرة 24س\nبث الدوري الألماني وبعض الدوريات ببلدان متعددة',
      features_en: 'Live streaming megastars boxing matches avoiding standard Pay-Per-View fees frequently\nGlobal MMA circuits alongside direct 24/7 news reporting\nStreaming Bundesliga alongside select soccer leagues globally regionally',
      price: 19.99, currency: 'USD', category: 'streaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/DAZN_logo.svg/1024px-DAZN_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN احياناً لأسعار أقل', requirements_en: 'VPN occasionally for rates',
      source_url: `${Z2U}/dazn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/dazn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 229, updated_at: now
    },
    {
      id: 'ufc-fight-pass', name_ar: 'يو إف سي فايت باس', name_en: 'UFC Fight Pass',
      description_ar: 'المكتبة الأكبر بالعالم للفنون القتالية! أكثر من 30 بطولة ملاكمة ومصارعة مباشرة شهرياً وأرشيف كامل لـ UFC.',
      description_en: 'The greatest combat sports library inherently! Over 30 live promotions monthly packing UFC\'s full historical archives.',
      features_ar: 'كل المواجهات السابقة في تاريخ الـ UFC و Pride FC من البدايات\nبث مباشر لبطولات حصرية يومية لجميع المنظمات\nبثوث وتغطية خلف الكواليس وحلقات (The Ultimate Fighter)',
      features_en: 'Total historical matchups capturing UFC & Pride FC from their genesis\nLive streams exclusively feeding massive daily worldwide organizations\nBehind-the-scenes streams seamlessly packing (The Ultimate Fighter) effectively',
      price: 9.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/UFC_Fight_Pass_logo.png/1024px-UFC_Fight_Pass_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/ufc`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/ufc` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 230, updated_at: now
    },
    {
      id: 'nfl-plus-premium', name_ar: 'الدوري الوطني لكرة القدم الأمريكية', name_en: 'NFL+ Premium',
      description_ar: 'لعشاق الـ NFL الحقيقيين! الباقة المميزة تتيح الإعادات الكاملة للمباريات وعرض تدريبي خاص (Coaches Film).',
      description_en: 'For true NFL die-hards! The Premium package grants full match replays seamlessly revealing tactical (Coaches Film) screens.',
      features_ar: 'إعادة كاملة أو مختصرة (Ad-free) لكل مباراة بالموسم\nكاميرات Coaches Film التحليلية المميزة للملعب كاملاً\nصوتيات مباشرة وحية لمباريات الفرق كلها',
      features_en: 'Full or condensed (Ad-free) match replays persistently every season\nUnique analytical Coaches Film mapping all-22 players entirely\nLive game audios naturally broadcasting all participating teams',
      price: 14.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/800px-National_Football_League_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/nfl`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 14.99, source_url: `${Z2U}/nfl` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 231, updated_at: now
    },
    {
      id: 'mlb-tv', name_ar: 'دوري كرة القاعدة الأمريكي', name_en: 'MLB.TV',
      description_ar: 'بث مباشر وخالي من الإعلانات لأكثر من 250 مباراة أسبوعياً خارج الماركت لفريقك المفضل من الـ MLB.',
      description_en: 'Live and ad-free streams delivering roughly 250 out-of-market matches weekly tracking your favorite MLB franchise strictly.',
      features_ar: 'بث مباشر (وإعادات) لكل مباريات الموسم بالكامل\nخيارات الصوت المنزلي/الراديو أو الاستماع لإنفعالات الملعب فقط\nبرامج بيسبول حصرية على مدار 24 ساعة',
      features_en: 'Live broadcasts (merging replays) extensively spanning the entire regular season\nHome/Away radio audio options or purely ballpark ambient feeds seamlessly\nExclusive 24/7 dedicated baseball programming completely',
      price: 24.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Major_League_Baseball_logo.svg/800px-Major_League_Baseball_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'للمشاهدة الكاملة يفضل VPN', requirements_en: 'VPN preferred for blackouts',
      source_url: `${Z2U}/mlb`,
      subscription_plans: [{ label_ar: 'شهر واحد لكل الفرق', label_en: '1 Month (All Teams)', price: 24.99, source_url: `${Z2U}/mlb` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 232, updated_at: now
    },
    {
      id: 'f1-tv-pro', name_ar: 'منصة فورمولا 1 تي في برو', name_en: 'F1 TV Pro',
      description_ar: 'تابع بطولات الـ Formula 1 بكل قوتها! البث المباشر المتميز بالكاميرات المركبة فوق سيارة السائق كلياً.',
      description_en: 'Follow Formula 1 championships forcefully! The prime livestream remarkably featuring driver onboard cameras completely.',
      features_ar: 'بث مباشر للسباقات الرسمية، والتجارب التأهيلية بأكملها\nتحكم تام للتبديل بين 20 كاميرا لسيارات السائقين أونلاين\nمتابعة حية لتعديلات وإحصاءات وبيانات الإرسال التكتيكية',
      features_en: 'Live streaming all official races effectively incorporating comprehensive qualifying sessions\nTotal control seamlessly switching among 20 driver onboard cameras\nLive tracking transmitting deep tactical telemetry datasets fundamentally',
      price: 9.99, currency: 'USD', category: 'streaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/F1_TV_logo.svg/1024px-F1_TV_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'التأكد من التغطية العربية', requirements_en: 'Ensure regional coverage',
      source_url: `${Z2U}/f1`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/f1` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 233, updated_at: now
    },
    {
      id: 'wrc-plus-all-live', name_ar: 'بطولة العالم للراليات بلس', name_en: 'WRC+ All Live',
      description_ar: 'لا تفوت أي ثانية من سباقات الرالي الخطرة! بطولات الـ WRC بلاس توفر مشاهدة شاملة لمضمار السباق بالكامل.',
      description_en: 'Don\'t miss a second traversing dangerous rallies! WRC+ guarantees comprehensive viewership spanning the complete track completely.',
      features_ar: 'بث لايف مستمر لأكثر من 25 ساعة رالي لكل مسابقات الموسم\nالكاميرات المركبة داخل مقصورة المتسابقين مباشرة\nتتبع مباشر ومناقشات خبراء السباق يومياً',
      features_en: 'Continuous live streaming covering roughly 25 rally hours per season events\nBreathtaking onboard driver cockpit cameras transmitting natively\nLive mapping incorporating daily expert racing analysis broadly',
      price: 10.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/World_Rally_Championship_logo.svg/800px-World_Rally_Championship_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/wrc`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 10.99, source_url: `${Z2U}/wrc` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 234, updated_at: now
    },
    {
      id: 'motogp-videopass', name_ar: 'فيديو باس الدراجات النارية', name_en: 'MotoGP VideoPass',
      description_ar: 'عكس القنوات التي تقطع البث، يتيح لك بطاقة المشاهدة للـ MotoGP رؤية كاملة بدقة عظيمة لجميع سباقات الموتورات.',
      description_en: 'Unlike TV channels slicing broadcasts, the MotoGP pass grants flawless high-res views covering every motorcycle race continuously.',
      features_ar: 'كل السباقات المباشرة منذ العام 1992 وحتى آخر دراجة بالبطولة\nتغيير زوايا الكاميرات بشكل تفاعلي أثناء مشاهدتك اللايف\nبرامج متكاملة من التقارير الوثائقية حول الدراجين',
      features_en: 'Every direct contest extending backwards towards 1992 thoroughly\nAlter interactive camera angles whilst streaming live races perfectly\nComprehensive documentaries exploring prominent riders accurately',
      price: 29.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/MotoGP_logo.svg/1024px-MotoGP_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/motogp`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 29.99, source_url: `${Z2U}/motogp` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 235, updated_at: now
    },
    {
      id: 'curiosity-stream', name_ar: 'منصة كيوريستي ستريم الوثائقية', name_en: 'CuriosityStream',
      description_ar: 'منشئ منصة "ديسكفري"! أفضل و أرخص منصة وثائقية للأفلام العلمية العظيمة، التاريخ، والتكنولوجيا والطبيعة الخلابة.',
      description_en: 'From the creator establishing "Discovery"! The cheapest finest documentary platform targeting immense sciences, histories, & scenic natures.',
      features_ar: 'آلاف الوثائقيات الأصلية والحصرية بمختلف الأصناف المجتمعية\nدعم المشاهدة بأفضل جودة صورة للـ 4K و HD\nتنزيل الأفلام أوفلاين للأطفال والكبار بأسعار رخيصة جداً',
      features_en: 'Thousands of exclusive immersive documentaries across varied classifications routinely\nSupports watching streaming beautifully using 4K / HD resolutions purely\nDownload offline movies safely entertaining kids/adults extremely cheaply',
      price: 2.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Curiosity_Stream_logo.png/1024px-Curiosity_Stream_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/curiositystream`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${Z2U}/curiositystream` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 236, updated_at: now
    },
    {
      id: 'magellantv', name_ar: 'ماجلان تي في للأفلام الوثائقية', name_en: 'MagellanTV',
      description_ar: 'منصة ضخمة لا تعرض أي إعلانات وتركز بشدة وقوة مذهلة نحو وثائقيات وتاريخ الحروب والجغرافيا القديمة والفضاء.',
      description_en: 'Massive thoroughly ad-free streaming platform anchoring immensely into war documentaries, ancient geographies & vast spaces explicitly.',
      features_ar: 'مجموعة نقية من مسلسلات الفضاء والتاريخ القديم بعيدة عن الرعب التجارية\nمحتوى جديد يضاف اسبوعيا لضمان تعلم مستمر للمشاهد\nتطبيقات تعمل على أنظمة أندرويد وآبل تي في بثبات',
      features_en: 'Pure history/space collection explicitly alienated away from commercialization solidly\nNew contents arriving weekly guaranteeing persistent viewer studying paths\nOperates utilizing Android alongside cleanly Apple TV apps durably',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://theme.zdassets.com/theme_assets/2180556/eb8a554fd75b906fe73e32e8bf52ff2a44bb4897.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/magellantv`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/magellantv` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 237, updated_at: now
    },
    {
      id: 'history-vault', name_ar: 'قبو شبكة هيستوري التاريخية', name_en: 'History Vault',
      description_ar: 'أعظم سلسلة لوثائقيات أسرار التاريخ والأدلة من شبكة (History Channel)، تعرض أحداث عظيمة وقصص مذهلة لم تكتشفها.',
      description_en: 'The greatest documentary series uncovering historical mysteries & proofs spanning natively (History Channel). Showcases epic unrevealed stories.',
      features_ar: 'وصول لمكتبة القناة الأصلية العريقة بالكامل\nوثائقيات الغزو العتيق وقصص ملوك القديمة بلا روتوش للمعلومات\nتحميل وتشغيل المقاطع عبر الآيباد والـ Xbox بسهولة',
      features_en: 'Accessing strictly the extensive foundational Channel\'s historical library effortlessly\nAncient conquests & old royal storybooks documented preserving pristine unretouched facts\nDownload/play seamlessly across broad iPads spanning efficiently up towards Xbox',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/History_Logo.svg/1024px-History_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/history`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/history` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 238, updated_at: now
    },
    {
      id: 'tidal-hifi-plus', name_ar: 'تيدال هاي فاي بلس (أعلى جودة صوت)', name_en: 'Tidal HiFi Plus',
      description_ar: 'منصة لعشاق نقاء الصوت (Audiophiles)، الموسيقى تبث بأسلوب Master/MQA وأبعاد Dolby لتسمعها وكأنك داخل الأستوديو.',
      description_en: 'An audiophiles\' dream platform! Music broadcasted using Master/MQA definitions merging Dolby spatial realms imitating sheer studio atmospheres.',
      features_ar: 'جودة صوت لا تقارن Lossless High-Res إلى حد 9216 kbps\nإعطاء نسبة مئوية عالية مباشرة من أرباحك لفنانك المفضل\nإنتاج فيديوهات مسجلة للموسيقيين ومقابلات حصرية',
      features_en: 'Incomparable Lossless High-Res sounds reaching up until notably 9216 kbps\nDistributes steep percentages straight prioritizing specifically your listened favorite artists\nExclusive live music videos merged alongside intrinsic exclusive musician interviews',
      price: 19.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Tidal_logo.svg/1024px-Tidal_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'سماعات عالية الدقة يفضل', requirements_en: 'Hi-Fi headphones preferred',
      source_url: `${Z2U}/tidal`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/tidal` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 239, updated_at: now
    },
    {
      id: 'amazon-music-unlimited', name_ar: 'أمازون ميوزك المفتوح', name_en: 'Amazon Music Unlimited',
      description_ar: 'أكثر من 100 مليون مقطع موسيقي عالي الوضوح، استمع كما يحلو لك خالية تماماً من الإعلانات ومدعومة بشهادات أمازون.',
      description_en: '100 million+ high-definition musical tracks, listen boundlessly seamlessly totally ad-free supported profoundly utilizing expansive Amazon credentials.',
      features_ar: 'تشمل جميع الأنماط الصوتية العظمى (Ultra HD & Spatial)\nبودكاست وأغاني يمكن تحميلها بشكل لانهائي بهاتفك الذكي\nمتوافق تماماً كلياً مع جميع أجهزة المساعد أليكسا',
      features_en: 'Incorporates top-tier supreme audio formats (Ultra HD & Spatial natively)\nPodcasts/Songs downloaded utterly limitlessly targeting your smartphones actively\nCompletely compatible naturally merging via entire Amazon Alexa ecosystems',
      price: 8.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Amazon_Music_logo.svg/1024px-Amazon_Music_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Amazon', requirements_en: 'Amazon Account',
      source_url: `${Z2U}/amazon-music`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/amazon-music` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 240, updated_at: now
    },
    {
      id: 'qobuz-studio', name_ar: 'كوبوز ستوديو للموسيقى', name_en: 'Qobuz Studio',
      description_ar: 'وجهة محبي الموسيقى الكلاسيكية والفاخرة! أضخم كتالوج بالعالم بالصوت الـ Flac وأحدث الإصدارات الموثقة من الموسيقيين.',
      description_en: 'The premium classical & luxury music destination! The world\'s vastest Flac catalog alongside certified fresh releases strictly from artists.',
      features_ar: 'جودة FLAC استديو فائقة الدقة لكل الأغاني من 24-bit\nآلاف المقالات المكتوبة و المراجعات الموثقة بشغف للمقاطع الموسيقية\nخصومات ممتازة لشراء ملفات الموسيقى العالية لك للأبد',
      features_en: 'Ultimate FLAC studio qualities blanketing all songs touching roughly 24-bit\nThousands of passionately authored editorial reviews authenticating musical pieces inherently\nProminent discounts allowing purchasing ultimate lifetime audio files solidly',
      price: 10.83, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Qobuz_logo.png/1024px-Qobuz_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/qobuz`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 10.83, source_url: `${Z2U}/qobuz` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 241, updated_at: now
    },
    {
      id: 'iheartradio-all-access', name_ar: 'راديو آي هارت الشامل', name_en: 'iHeartRadio All Access',
      description_ar: 'ابحث عن أي اغنية تريدها وشغلها فوراً مع محطات الراديو الأمريكية المميزة — إمكانيات لانهائية لتخطي الإعلانات والصوتيات.',
      description_en: 'Search any track and play it instantly parallel to premium US radio stations — boundless skipping potentials securely bypassing audio ads.',
      features_ar: 'إنشاء محطات راديو مبنية بالكامل لتتوافق مع ذوقك\nامكانية الرجوع للخلف وسماع أي أغنية راديو مرة ثانية\nالاستماع لبودكاست ومقاطع موسيقية بدون الحاجة لانترنت',
      features_en: 'Formulate custom broadcast radio stations fundamentally parallel matching your unique tastes\nReplay features permitting looping backwards streaming specific radio tracks again extensively\nOffline listening actively accommodating podcasts & tracks completely avoiding network necessities',
      price: 9.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/IHeartRadio_logo.svg/1024px-IHeartRadio_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/iheartradio`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/iheartradio` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 242, updated_at: now
    },
    {
      id: 'mixcloud-pro', name_ar: 'ميكس كلاود برو للـ DJ', name_en: 'Mixcloud Pro',
      description_ar: 'أكبر بيئة ومنصة لأي (DJ) وصانع المحتوى الموسيقي. ارفع ميكسات حصرية، بث لايف بشكل احترافي واعرف من يسمعك بالتفصيل.',
      description_en: 'The greatest hub strictly supporting any DJ/Creator. Upload exclusive mixes, stream live professionally & precisely track all detailed listenership.',
      features_ar: 'بث قنوات راديو وفيديو مباشرة بدون الاهتمام بحقوق الطبع قانونياً\nاحصل على اشتراك مدفوع و إدعم الموسيقي المُنشأ للمقطوعة مباشرة\nإحصاءات قوية جدا لتفاعل المستمعين (Engagement data)',
      features_en: 'Live streaming video/radio formats fully protected legally barring copyright constraints\nObtain paid sub tiers effectively funding specific creators directly fundamentally\nAggressively robust statistics securely capturing viewer engagement data flawlessly',
      price: 15.00, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mixcloud_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/mixcloud`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 15.00, source_url: `${Z2U}/mixcloud` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 243, updated_at: now
    },
    {
      id: 'beatport-link', name_ar: 'بيت بورت لينك', name_en: 'Beatport Link',
      description_ar: 'ربط مباشر لجميع مسارات الموسيقى الإلكترونية من الموقع إلى أشهر برامج הـ DJ فوراً لتبدأ إنتاجك وعطفك للحفلات.',
      description_en: 'Direct streaming integrations natively hooking all electronic tracks extending directly toward premier DJ suites instantly readying spectacular parties.',
      features_ar: 'نقل الأغاني مباشرة بداخل (Rekordbox, Serato، وغيره) بدون التحميل\nباقة متوفرة تدعم جودات فائقة من FLAC الموسيقية للدي جي المحترف\nتخزين محدود للمقاطع (Offline Locker) لاستخدامها في الحفلة',
      features_en: 'Pull tracks instantly feeding software alike (Rekordbox, Serato) explicitly omitting standard downloads\nAccessible tier promoting high-end FLAC specs securely satisfying professional DJs\nLimited Offline Locker essentially rescuing tracks assuring usage amid isolated gigs',
      price: 14.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Beatport_logo.svg/1024px-Beatport_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Beatport', requirements_en: 'Beatport account',
      source_url: `${Z2U}/beatport`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 14.99, source_url: `${Z2U}/beatport` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 244, updated_at: now
    },
    {
      id: 'splice-sounds', name_ar: 'مكتبة أصوات سبلايس', name_en: 'Splice Sounds',
      description_ar: 'للمنتجين والفنانين: استخدم الملايين من الـ (Samples والـ Loops) الخالية من الحقوق الملكية لإنشاء نغمات موسيقاك الأصلية بضغطة زر.',
      description_en: 'For Producers/Artists: Exploit millions of royalty-free Samples & Loops cleanly engineering strictly your original harmonic tracks fluidly.',
      features_ar: 'استخراج (Samples) بصيغة مميزة وامتلاكها 100% مدى الحياة حتى بعد الإلغاء\nأصوات متخصصة جداً لأكبر نجوم الراب والتكنو\nبرامج مساعدة للإيقاع وتقنيات إنتاج حصرية داخل الموقع',
      features_en: 'Extract prominent Samples owning them 100% timelessly outlasting canceled subscriptions permanently\nHyper-specialized kits formulated accurately echoing massive Rap/Techno superstars natively\nNative cadence assistants & proprietary exclusive production techniques broadly accessible internally',
      price: 12.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Splice_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/splice`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 12.99, source_url: `${Z2U}/splice` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 245, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Next 100 Products (Part 6 - 25 items)...', 'color:#eab308;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 6 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

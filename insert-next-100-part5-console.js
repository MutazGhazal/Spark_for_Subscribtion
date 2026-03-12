// ================================================
// SPARK STORE - INSERT NEXT 100 SUBSCRIPTIONS (PART 5: 101-125)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'playstation-plus-essential', name_ar: 'بلايستيشن بلس إسنشال (الأساسي)', name_en: 'PlayStation Plus Essential',
      description_ar: 'باقة PlayStation Plus الأساسية للعب الجماعي أونلاين، والحصول على ألعاب مجانية شهرية، وخصومات حصرية في المتجر.',
      description_en: 'The essential PlayStation Plus tier for online multiplayer, monthly free games, and exclusive store discounts.',
      features_ar: 'إمكانية اللعب الجماعي عبر الإنترنت\n3 ألعاب مجانية كل شهر للتحميل والاحتفاظ بها\nتخزين سحابي لحفظ تقدم الألعاب',
      features_en: 'Online multiplayer access\n3 free monthly games to download and keep\nCloud storage for saved game progress',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PlayStation_Plus_logo.svg/2048px-PlayStation_Plus_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب PSN', requirements_en: 'PSN account',
      source_url: `${Z2U}/psn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/psn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 201, updated_at: now
    },
    {
      id: 'geforce-now-priority', name_ar: 'جي فورس ناو (باقة الأولوية)', name_en: 'GeForce NOW Priority',
      description_ar: 'العب ألعاب الكمبيوتر بدقة ممتازة على أي جهاز وبدون إنتظار بالدور مع أجهزة قوية من NVIDIA.',
      description_en: 'Play PC games in excellent resolution on any device with priority server access powered by NVIDIA.',
      features_ar: 'أولوية بالدخول للخوادم (بدون طابور انتظار طويل)\nلعب بدقة تصل لـ 1080p و 60 إطار بالثانية\nجلسات لعب مستمرة حتى 6 ساعات',
      features_en: 'Priority server access (skip standard queues)\nPlay at up to 1080p and 60fps\nExtended play sessions up to 6 hours',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/GeForce_Now_logo.svg/1024px-GeForce_Now_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'انترنت سريع', requirements_en: 'Fast internet',
      source_url: `${Z2U}/geforce-now`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/geforce-now` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 202, updated_at: now
    },
    {
      id: 'boosteroid-cloud-gaming', name_ar: 'منصة الألعاب السحابية بوسترويد', name_en: 'Boosteroid Cloud Gaming',
      description_ar: 'العب أقوى عناوين ألعاب الكمبيوتر (AAA) على أي متصفح ويب أو تليفزيون ذكي عبر منصة Boosteroid הסحابية.',
      description_en: 'Play top AAA PC game titles on any web browser or Smart TV directly via the Boosteroid cloud platform.',
      features_ar: 'دعم كامل لدقة 1080p بمعدل 60FPS\nلا يتطلب أي تحميل للألعاب أو مساحة تخزين\nالوصول لألعاب مكتبتك مثل Steam و Epic',
      features_en: 'Full 1080p 60FPS stream support\nZero downloads or local storage required\nAccess games from your Steam/Epic libraries',
      price: 9.89, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Boosteroid_Logo.png/1024px-Boosteroid_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'متصفح ويب', requirements_en: 'Web browser',
      source_url: `${Z2U}/boosteroid`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.89, source_url: `${Z2U}/boosteroid` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 203, updated_at: now
    },
    {
      id: 'xbox-live-gold', name_ar: 'إكس بوكس لايف جولد', name_en: 'Xbox Live Gold',
      description_ar: 'اشتراك Xbox Live الكلاسيكي الذي لا يزال فعالاً لتفعيل ميزات اللعب الجماعي أونلاين على أجهزة الأكس بوكس.',
      description_en: 'Classic Xbox Live subscription still functioning to unlock online multiplayer capabilities for Xbox consoles.',
      features_ar: 'إمكانية اللعب أونلاين بشكل كامل\nيعتبر ترقية أساسية لحسابات الإكس بوكس القديمة\nيتم تحويله تلقائيا لـ Game Pass Core بالبلدان المدعومة',
      features_en: 'Unlock full console online multiplayer\nEssential upgrade for classic Xbox accounts\nAuto-converts to Game Pass Core in supported regions',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Xbox_logo_2012.svg/1024px-Xbox_logo_2012.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'Xbox 360 / Xbox One', requirements_en: 'Xbox 360/One',
      source_url: `${Z2U}/xbox-live`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/xbox-live` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 204, updated_at: now
    },
    {
      id: 'ea-play-standard', name_ar: 'إي إيه بلاي (النسخة العادية)', name_en: 'EA Play (Standard)',
      description_ar: 'النسخة الأرخص من خدمة EA، توفر مكتبة رائعة من الألعاب وتجربة حصرية لأحدث الإصدارات لمدة 10 ساعات.',
      description_en: 'The cheaper EA service tier, offering a great game library and a 10-hour trial for the latest releases.',
      features_ar: 'الوصول إلى مكتبة ألعاب ضخمة من ألعاب EA السابقة\nتجربة الألعاب الجديدة كلياً لمدة 10 ساعات\nخصومات بنسبة 10% لكافة المشتريات التابعة لها',
      features_en: 'Access to a massive back-catalog of EA games\nPlay brand new releases for 10 hours max\n10% discount across all EA related purchases',
      price: 4.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Electronic_Arts_2020.svg/1024px-Electronic_Arts_2020.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'جهاز PC/Xbox/PS4', requirements_en: 'PC/Xbox/PS4',
      source_url: `${Z2U}/ea-play`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/ea-play` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 205, updated_at: now
    },
    {
      id: 'nintendo-switch-online-exp', name_ar: 'نينتندو سويتش + حزمة التوسعة', name_en: 'Nintendo Switch Online + Exp',
      description_ar: 'الباقة المتقدمة من نينتندو، تضم العاب N64 وأجهزة سيجا وكلاسيكيات جيم بوي أدفانس، وإضافات لـ Mario Kart.',
      description_en: 'Premium Nintendo tier, including N64, SEGA, GBA classics and exciting DLCs like Mario Kart tracks.',
      features_ar: 'تشمل جميع مميزات النسخة الأساسية والأونلاين\nمكتبة واسعة لألعاب أجهزة N64 و Game Boy Advance\nتوسعات لـ Mario Kart 8 و Animal Crossing مجاناً',
      features_en: 'Includes all basic/online base tier features\nWide N64 and Game Boy Advance catalogs\nFree DLCs for Mario Kart 8 and Animal Crossing',
      price: 49.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Nintendo_switch_logo.png/1024px-Nintendo_switch_logo.png',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: 'جهاز Nintendo Switch', requirements_en: 'Nintendo Switch',
      source_url: `${Z2U}/nintendo`,
      subscription_plans: [{ label_ar: 'سنة كاملة', label_en: '1 Year', price: 49.99, source_url: `${Z2U}/nintendo` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 206, updated_at: now
    },
    {
      id: 'vrchat-plus', name_ar: 'في آر تشات بلس', name_en: 'VRChat Plus',
      description_ar: 'ادعم مطوري لعبة الواقع الافتراضي الأشهر VRChat واحصل على مساحات إضافية للأفاتارات واسم مميز داخل اللعبة.',
      description_en: 'Support the devs of the famous virtual reality game VRChat while earning extra avatar slots and a unique name tag.',
      features_ar: 'زيادة مساحة الأفاتارات المفضلة (إلى 100)\nأيقونة مخصصة بجانب اسمك لدعم المنصة\nخلفيات قابلة للتخصيص لدعوات اللعب وصورك',
      features_en: 'Expanded Favorite Avatars slots (up to 100)\nCustom supporter badge beside your nametag\nCustomizable backgrounds for invites and photos',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/VRChat_logo.svg/1024px-VRChat_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب VRChat', requirements_en: 'VRChat Account',
      source_url: `${Z2U}/vrchat`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/vrchat` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 207, updated_at: now
    },
    {
      id: 'warframe-platinum', name_ar: 'حزم بلاتينيوم للعبة وارفريم', name_en: 'Warframe Platinum Packs',
      description_ar: 'احصل على البلاتينيوم لشراء الإطارات، الأسلحة، ومواد التجميل (Cosmetics) داخل اللعبة الملحمية Warframe.',
      description_en: 'Acquire Platinum to purchase Warframes, weapons, and cosmetics directly inside the epic game Warframe.',
      features_ar: 'عملة مميزة (Premium Currency) لداخل اللعبة\nتسريع صناعة الأسلحة وإطارات Warframe\nشحن مباشر وآمن للحساب الخاص بك',
      features_en: 'Premium in-game currency\nSpeed up weapon and Warframe crafting times\nDirect and safe top-up for your active account',
      price: 4.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Warframe_logo.png/800px-Warframe_logo.png',
      duration_ar: 'شحن لمرة واحدة', duration_en: 'One-time TopUp', requirements_ar: 'اسم اللاعب (IGN)', requirements_en: 'In-Game Name (IGN)',
      source_url: `${Z2U}/warframe`,
      subscription_plans: [{ label_ar: '1000 بلاتينيوم', label_en: '1000 Platinum', price: 9.99, source_url: `${Z2U}/warframe` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 208, updated_at: now
    },
    {
      id: 'clash-of-clans-gold-pass', name_ar: 'التذكرة الذهبية في كلاش أوف كلانس', name_en: 'Clash of Clans Gold Pass',
      description_ar: 'بطاقة المعركة الشهرية للعبة الجوال الشهيرة! ستحصل على تخفيض فوري بأوقات البناء، جوائز سحرية وجلود للملوك.',
      description_en: 'The monthly battle pass for the hit mobile game! Get instant building time reductions, magic items, and hero skins.',
      features_ar: 'مظهر (Skin) حصري جديد للملوك كل شهر\nتسريع أوقات وترقيات البناء والمختبر بنسبة 20%\nدّعم بالموارد السحرية والجواهر بكميات ضخمة',
      features_en: 'Exclusive new hero Skin given explicitly monthly\nAccelerated 20% building/lab upgrades times\nBoosted magically with massive resources/gems',
      price: 6.99, currency: 'USD', category: 'gaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Clash_of_Clans_logo.png/800px-Clash_of_Clans_logo.png',
      duration_ar: 'موسم (شهر)', duration_en: '1 Season (Month)', requirements_ar: 'رقم (Player Tag)', requirements_en: 'Player Tag (#)',
      source_url: `${Z2U}/clash-of-clans`,
      subscription_plans: [{ label_ar: 'تذكرة موسم كامل', label_en: '1 Full Season Pass', price: 6.99, source_url: `${Z2U}/clash-of-clans` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 209, updated_at: now
    },
    {
      id: 'pubg-mobile-uc-sub', name_ar: 'اشتراك شدات ببجي الأسبوعي/الشهري', name_en: 'PUBG Mobile UC Sub',
      description_ar: 'اشتراك Prime و Prime Plus في لعبة ببجي موبايل، يجمع لك شدات (UC) يومية بسعر أقل من الشحن العادي بكثير.',
      description_en: 'Prime & Prime Plus subscriptions in PUBG Mobile, collecting daily UC at much cheaper rates than regular top-ups.',
      features_ar: 'استلام مقسم يومي لعملات الـ UC (الشدات)\nخصومات ضخمة على متجر الـ BP وشراء صناديق حصرية\nسعر اقتصادي جداً للاعبين الدائمين',
      features_en: 'Receive structured daily UC deliveries naturally\nMassive BP store discounts mapping to exclusive crates\nHighly economical for consistent daily players',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f0/PUBG_mobile_logo.png/800px-PUBG_mobile_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'المعرف (Player ID)', requirements_en: 'Player ID',
      source_url: `${Z2U}/pubg-mobile`,
      subscription_plans: [{ label_ar: 'Prime Plus شهري', label_en: 'Prime Plus (Monthly)', price: 9.99, source_url: `${Z2U}/pubg-mobile` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 210, updated_at: now
    },
    {
      id: 'free-fire-elite-pass', name_ar: 'العضوية الشهرية لفري فاير', name_en: 'Free Fire VIP / Elite Pass',
      description_ar: 'عضويات لعبة Free Fire الأسبوعية أو الشهرية — توفر لك جواهر مستمرة للاعب والميزات الخاصة لأيقونة الحساب.',
      description_en: 'Free Fire weekly or monthly memberships — provides continuous diamonds and special VIP profile icons.',
      features_ar: 'استلام جواهر (Diamonds) يومية فور تسجيل الدخول\nشارة العضوية الحصرية للبروفايل\nخصم مميز لمتجر اللعبة وشراء شخصيات الباتل رويال',
      features_en: 'Claim Diamonds daily just by logging in precisely\nExclusive membership badge shown on profiles\nSpecial discounts accessing battle royale characters',
      price: 8.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Free_Fire_logo.png/800px-Free_Fire_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'معرف اللاعب (ID)', requirements_en: 'Player ID',
      source_url: `${Z2U}/free-fire`,
      subscription_plans: [{ label_ar: 'عضوية شهرية (VIP)', label_en: 'Monthly VIP', price: 8.99, source_url: `${Z2U}/free-fire` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 211, updated_at: now
    },
    {
      id: 'genshin-blessing', name_ar: 'بركة قمر جينشين إمباكت', name_en: 'Genshin Impact Blessing',
      description_ar: 'باقة Blessing of the Welkin Moon لأكثر الألعاب طلباً — 90 جوهرة يومياً إضافةً لـ 300 كرستالة نقية فورية.',
      description_en: 'Blessing of the Welkin Moon for the hit game — 90 daily Primogems plus 300 Genesis Crystals instantly.',
      features_ar: 'استلام 90x Primogems بمجرد تسجيل الدخول لمدة 30 يوم\nشحن مباشر لـ 300x Genesis Crystals\nأفضل وأرخص وسيلة لتجميع السحبات (Pulls)',
      features_en: 'Receive 90x Primogems upon logging in for 30 days\nDirect top-up of 300x Genesis Crystals initially\nThe best & cheapest method to gather Pulls safely',
      price: 4.99, currency: 'USD', category: 'gaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Genshin_Impact_logo.svg/1024px-Genshin_Impact_logo.svg.png',
      duration_ar: '30 يوماً', duration_en: '30 Days', requirements_ar: 'رقم (UID)', requirements_en: 'Player UID',
      source_url: `${Z2U}/genshin-impact`,
      subscription_plans: [{ label_ar: 'بركة القمر الساطع (30 يوم)', label_en: 'Welkin Moon (30 Days)', price: 4.99, source_url: `${Z2U}/genshin-impact` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 212, updated_at: now
    },
    {
      id: 'cod-battle-pass', name_ar: 'بطاقة معركة كول أوف ديوتي', name_en: 'Call of Duty Battle Pass',
      description_ar: 'شراء نقاط CP للعبة Warzone أو Modern Warfare لفتح الباتل باس وحصد أفضل المظاهر والأسلحة للموسم الحالي.',
      description_en: 'Purchase CP points for Warzone/MW to unlock the Battle Pass & grind the best seasonal skins & guns.',
      features_ar: 'فَتْح أكثر من 100 مستوى (Tiers) بالموسم\nشحن نقاط كافية لفتح الباتل باس الأساسي (1100 CP)\nاسترداد نقاط تكفي لاشتراك الموسم القادم لو ختمته',
      features_en: 'Unlock over 100 Tiers comprehensively this season\nTopping up exact CP to buy the base pass (1100 CP)\nRecoup enough points securing the next season pass essentially',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Call_of_Duty_Logo.svg/1024px-Call_of_Duty_Logo.svg.png',
      duration_ar: 'موسم كامل', duration_en: '1 Full Season', requirements_ar: 'حساب أكتيفيجن', requirements_en: 'Activision ID',
      source_url: `${Z2U}/cod`,
      subscription_plans: [{ label_ar: 'شحن 1100 CP', label_en: 'TopUp 1100 CP', price: 9.99, source_url: `${Z2U}/cod` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 213, updated_at: now
    },
    {
      id: 'apex-legends-coins', name_ar: 'باسات وعملات أبيكس ليجندز', name_en: 'Apex Legends Coins/Pass',
      description_ar: 'اشحن عملات أبيكس لشراء وتفعيل الـ Battle Pass أو لشراء شخصيات جديدة وحزم متجر اللعبة المذهلة.',
      description_en: 'Top up Apex Coins actively to activate the Battle Pass or purchase new Legends & awesome store bundles.',
      features_ar: 'عملات كافية لفتح تذاكر المعركة الممتازة تماماً\nأطقم حصرية وزينة وملصقات لأسلحتك\nشحن نظامي سريع بدون أي مخاطر حظر',
      features_en: 'Enough coins to crack premium Battle Passes completely\nExclusive skins, charms, and detailed weapon aesthetics\nLegitimate fast top-ups eliminating ban risks altogether',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Apex_Legends_logo.svg/1024px-Apex_Legends_logo.svg.png',
      duration_ar: 'مرة واحدة', duration_en: 'One-Time', requirements_ar: 'حساب EA/Steam', requirements_en: 'EA/Steam Login',
      source_url: `${Z2U}/apex`,
      subscription_plans: [{ label_ar: 'شحن 1000 عملة', label_en: '1000 Apex Coins', price: 9.99, source_url: `${Z2U}/apex` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 214, updated_at: now
    },
    {
      id: 'valorant-vp', name_ar: 'نقاط فالورانت (شحن مباشر)', name_en: 'Valorant Points (VP)',
      description_ar: 'اشحن نقاط VP لحسابك الرسمي في لعبة سيرفرات Valorant (الأوروبي / الأمريكي) لشراء الحزم والباتل باس.',
      description_en: 'Top up VP purely into your official Valorant server account (EU/US/TR) for bundles and passes.',
      features_ar: 'شحن فوري بالآيدي (لبعض السيرفرات) أو كود رقمي\nيستخدم لشراء الـ Battlepass والسكاكين وحزم الأسلحة\nرموز شحن مضمونة المصدر وفعالة',
      features_en: 'Direct ID top-up (specific servers) or Digital Code\nUtilized to buy Battlepasses, knives & tactical weapon packs\nGuaranteed legit sourced redeemable codes thoroughly',
      price: 11.99, currency: 'USD', category: 'gaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/1024px-Valorant_logo_-_pink_color_version.svg.png',
      duration_ar: 'بطاقة رقمية', duration_en: 'Digital Card', requirements_ar: 'تحديد السيرفر', requirements_en: 'Select Region',
      source_url: `${Z2U}/valorant`,
      subscription_plans: [{ label_ar: 'حزمة 1000 VP (أوروبي)', label_en: '1000 VP (EU)', price: 11.99, source_url: `${Z2U}/valorant` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 215, updated_at: now
    },
    {
      id: 'lol-rp', name_ar: 'نقاط ليج أوف ليجندز (RP)', name_en: 'League of Legends RP',
      description_ar: 'تزويد حسابك بنقاط Riot Points لشراء أزياء وسكنات (Skins) أبطالك المفضلين أو نقل سيرفرك داخل لعبة LoL.',
      description_en: 'Provide your account with Riot Points unlocking favorite Champion skins globally or handling server transfers inside LoL.',
      features_ar: 'بطاقات RP صالحة للسيرفرات (EUW / EUNE / NA)\nيفتح السكنات العادية و الأسطورية والتذاكر الحدثية\nتوصيل الرمز وتفعيله بسرعة',
      features_en: 'Valid RP cards handling regions explicitly (EUW / EUNE / NA)\nUnlocks Standard/Legendary skins and seasonal Event Passes\nPrompt code deliveries assuring instant redemptions',
      price: 10.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/1024px-League_of_Legends_2019_vector.svg.png',
      duration_ar: 'بطاقة رقمية', duration_en: 'Digital Card', requirements_ar: 'تحديد السيرفر', requirements_en: 'Select Region',
      source_url: `${Z2U}/league-of-legends`,
      subscription_plans: [{ label_ar: 'بطاقة RP بقيمة 10$', label_en: '10$ RP Card', price: 10.99, source_url: `${Z2U}/league-of-legends` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 216, updated_at: now
    },
    {
      id: 'world-of-tanks-premium', name_ar: 'الحساب المميز (دبابات العالم)', name_en: 'World of Tanks Premium',
      description_ar: 'ضاعف خبرتك وتقدميلك في اللعبة! حساب مميز يمنحك +50% زيادة في الفلوس ونقاط الـ XP لكل المعارك.',
      description_en: 'Double down on progression! A premium account grants a solid +50% boost to Credits and XP across all battles.',
      features_ar: 'تعزيز كبير لموارد الخبرة (XP) والفضة (Credits) لكل معركة\nالقدرة على اختيار استبعاد خرائط إضافية (Map veto)\nشحن مضمون من الموقع للعبة الأساسية (PC)',
      features_en: 'Massive boosts amplifying earned XP & Credits per battle\nCapability expanding map exclusions comfortably (Map veto)\nGuaranteed top-ups directing onto PC base game',
      price: 12.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/World_of_Tanks_logo.png/1024px-World_of_Tanks_logo.png',
      duration_ar: '30 يوماً', duration_en: '30 Days', requirements_ar: 'اسم الحساب', requirements_en: 'Account Name',
      source_url: `${Z2U}/world-of-tanks`,
      subscription_plans: [{ label_ar: '30 يوم مميز', label_en: '30 Premium Days', price: 12.99, source_url: `${Z2U}/world-of-tanks` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 217, updated_at: now
    },
    {
      id: 'dbd-auric-cells', name_ar: 'خلايا أوريك - ديد باي دايلايت', name_en: 'Dead by Daylight Auric Cells',
      description_ar: 'اشحن الـ Auric Cells لشراء شخصيات الناجين، والقتلة المرخصين والمشهورين، و الباتل باس، بالإضافة لأزياء حصرية.',
      description_en: 'Purchase Auric Cells to acquire licensed classic Survivors/Killers crucially, premium passes & exclusive cosmetic outfits.',
      features_ar: 'العملة الوحيدة لشراء شخصيات رعب مرخصة مثل (Michael/Ghostface)\nالقدرة على تفعيل الـ Rift Pass الموسمي\nباقات متنوعة للأجهزة المختلفة',
      features_en: 'Sole currency unlocking licensed terror icons strictly (Michael/Ghostface)\nCapacitates unlocking cyclical seasonal Rift Passes actively\nVarious bundles addressing assorted gaming platforms',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Dead_by_Daylight_logo.png/1024px-Dead_by_Daylight_logo.png',
      duration_ar: 'مرة واحدة', duration_en: 'One-Time', requirements_ar: 'حسب المنصة', requirements_en: 'Depends on Platform',
      source_url: `${Z2U}/dbd`,
      subscription_plans: [{ label_ar: 'حزمة 1000 خلية', label_en: '1000 Auric Pack', price: 9.99, source_url: `${Z2U}/dbd` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 218, updated_at: now
    },
    {
      id: 'gw2-gems', name_ar: 'جواهر لعبة جيلد وورز 2', name_en: 'Guild Wars 2 Gems',
      description_ar: 'عملة الـ Gems المدفوعة لاستخدامها في متجر لعبة Guild Wars 2 لترقية حسابك، شراء أطقم التجميل الموسمي أو أدوات.',
      description_en: 'Paid Gems currency applied explicitly inside the Guild Wars 2 Gem Store upgrading accounts or purchasing tools/glamers.',
      features_ar: 'توسعة خانات الشنطة وصندوق البنك للحساب\nشراء إضافات الحلقات (Living World Episodes)\nيمكن تحويلها قانونياً إلى ذهب اللعبة (Gold) والعكس',
      features_en: 'Expand account-wide bank tabs alongside inventory bag slots\nPurchase mandatory missing Living World narrative Episodes\nConvertible legitimately into prevailing in-game Gold economy',
      price: 12.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Guild_Wars_2_logo.png/800px-Guild_Wars_2_logo.png',
      duration_ar: 'بطاقة / شحن', duration_en: 'Card / TopUp', requirements_ar: 'حساب اللعبة الرسمي (ليس Steam)', requirements_en: 'ArenaNet Original Acc (No Steam)',
      source_url: `${Z2U}/guild-wars-2`,
      subscription_plans: [{ label_ar: 'حزمة 800 جوهرة', label_en: '800 Gem Card', price: 12.99, source_url: `${Z2U}/guild-wars-2` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 219, updated_at: now
    },
    {
      id: 'bdo-acoin', name_ar: 'عملات بلاك ديزرت أونلاين', name_en: 'Black Desert Acoin/Pearls',
      description_ar: 'اشحن حسابك بـ Acoins لشراء صندوق اللؤلؤ (Pearls) في لعبة Black Desert والذي يمنحك أزياء مبهرة وميزات راحة كبيرة.',
      description_en: 'Top up your account securely with Acoins buying Pearl Boxes precisely inside Black Desert rendering breathtaking aesthetics & comforts.',
      features_ar: 'تفعيل باقات الـ Value Pack الشهرية الهامة لتقدمك\nأزياء، وتوسيع الوزن، ونجاح حرق العتاد والخيم\nشحن لحسب سيرفرات (NA/EU)',
      features_en: 'Activate the fundamentally crucial Monthly Value Pack buff\nOutfits, weight limits, gear enhancement boosts, and camping tools\nRespective top-ups strictly addressing NA/EU regions',
      price: 10.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Black_Desert_Online_logo.png/1024px-Black_Desert_Online_logo.png',
      duration_ar: 'بطاقة شحن (Acoin)', duration_en: 'Top-Up (Acoin)', requirements_ar: 'تأكيد السيرفر', requirements_en: 'Region Validation',
      source_url: `${Z2U}/black-desert`,
      subscription_plans: [{ label_ar: 'بطاقة 1000 Acoin', label_en: '1000 Acoin Card', price: 10.99, source_url: `${Z2U}/black-desert` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 220, updated_at: now
    },
    {
      id: 'hbo-max-premium', name_ar: 'إتش بي أو ماكس (ماكس بريميوم)', name_en: 'HBO Max / Max Premium',
      description_ar: 'المنصة المتجددة "Max"! شاهد كل أعمال HBO، Game of Thrones وحصريات أستوديوهات DC و Warner Bros بدقة 4K.',
      description_en: 'The renewed "Max" platform! Watch all HBO, Game of Thrones logic & studios DC / Warner Bros exclusives fully in 4K.',
      features_ar: 'الكتالوج الأعظم والأقوى للمسلسلات الأمريكية\nمشاهدة إنتاجات سينمائية بالتزامن مع السينما أحياناً\nالباقة المميزة شاملة التحميل الأوفلاين وبدون إعلانات',
      features_en: 'The greatest, most critically acclaimed American shows catalog\nWatch theatrical productions simultaneously releasing natively\nPremium tier including Ad-Free offline download capabilities',
      price: 15.99, currency: 'USD', category: 'streaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Max_logo.svg/1024px-Max_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/hbo-max`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 15.99, source_url: `${Z2U}/hbo-max` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 221, updated_at: now
    },
    {
      id: 'crunchyroll-mega-fan', name_ar: 'كرانشي رول (المشجع الخارق)', name_en: 'Crunchyroll Mega Fan',
      description_ar: 'أضخم مكتبة أنمي بالعالم! تعرض الحلقات الجديدة بعد ساعة واحدة من اليابان وبدقة عالية ومترجمة للعربية.',
      description_en: 'The largest Anime library globally! Streams totally new episodes just one hour after Japan flawlessly localized.',
      features_ar: 'باقة الميجا فان تتيح تحميل الحلقات والمشاهدة بدون أنترنت\nمشاهدة الأنميات في وقت عرضها (Simulcast)\nترجمة عربية متقنة خالية تماماً من فواصل الاعلانات',
      features_en: 'Mega Fan tier permitting downloads unlocking offline viewing primarily\nSimulcast airings streaming right parallel alongside Japanese broadcasts\nPerfectly localized subtitles retaining totally completely Ad-Free zones',
      price: 9.99, currency: 'USD', category: 'streaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Crunchyroll_Logo.png/1024px-Crunchyroll_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/crunchyroll`,
      subscription_plans: [{ label_ar: 'شهر واحد (ميجا)', label_en: '1 Month (Mega Fan)', price: 9.99, source_url: `${Z2U}/crunchyroll` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 222, updated_at: now
    },
    {
      id: 'apple-tv-plus', name_ar: 'أبل تي في بلس', name_en: 'Apple TV+',
      description_ar: 'المنصة الحصرية لإنتاجات Apple الأصلية بالكامل (مسلسلات وأفلام) والتي فازت بعدة جوائز أوسكار وايمي!',
      description_en: 'The exclusive hub delivering sheer original Apple productions strictly (series/movies) which grabbed several Oscars!',
      features_ar: 'إنتاجات ضخمة وأصلية مثل (Ted Lasso، Severance)\nجودة صورة 4K HDR وصوت مكاني مذهل للجميع\nمشاركتها تلقائيا لعائلة من 6 أفراد',
      features_en: 'Massive, purely original hits alike (Ted Lasso, Severance)\nBreathtaking 4K HDR aesthetics wrapped within Spatial Audio\nAuto-sharing cleanly incorporating families reaching simply 6 members',
      price: 6.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/1024px-Apple_TV_Plus_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'لا تتطلب جهاز آبل', requirements_en: 'Apple Device NOT strictly required',
      source_url: `${Z2U}/apple-tv`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 6.99, source_url: `${Z2U}/apple-tv` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 223, updated_at: now
    },
    {
      id: 'amc-plus', name_ar: 'منصة إيه إم سي بلس', name_en: 'AMC+',
      description_ar: 'بديل الكيبل المليء بأفضل المسلسلات المنتقدة وأصل أعمال (The Walking Dead، Mad Men، Breaking Bad) وغيرهم.',
      description_en: 'Cable-cutting alternative packed beautifully alongside critically-acclaimed AMC hits (The Walking Dead, Breaking Bad).',
      features_ar: 'مكتبة كاملة لأعمال AMC Network الأيقونية\nترفق معها اشتراكات Shudder ،Sundance، و IFC Films\nصول لأعمال قبل نزول التلفاز',
      features_en: 'Comprehensive library accessing AMC Network\'s iconic creations directly\nBundled cleanly encapsulating Shudder, Sundance & IFC streams entirely\nAccessing productions days initially prior anticipating television broadcastings',
      price: 8.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/AMC_Plus_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/amc`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 8.99, source_url: `${Z2U}/amc` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 224, updated_at: now
    },
    {
      id: 'shudder-streaming', name_ar: 'منصة شودر (أفلام الرعب)', name_en: 'Shudder',
      description_ar: 'الوجهة الأولى والأقوى لعشاق الأدرينالين! منصة مصممة خصيصاً لأفلام الرعب، الإثارة، والتشويق فقط!',
      description_en: 'The definitive absolute prime destination crafted meticulously strictly for hardcore horror, thrillers, & suspense fans!',
      features_ar: 'أكبر محتوى لأفلام الرعب من الستينات وحتى الآن\nإنتاجات مرعبة حصرية للمنصة (Shudder Originals)\nبث لـ 24 ساعة (Shudder TV) للرعب',
      features_en: 'Grandiose content library covering 60s horror spanning towards present-day\nSolely exclusive terrorizing productions dubbed properly (Shudder Originals)\nStreaming continuous spooky 24/7 channels outrightly (Shudder TV)',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Shudder_logo.svg/1024px-Shudder_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا/بريطانيا)', requirements_en: 'VPN (USA/UK)',
      source_url: `${Z2U}/shudder`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/shudder` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 225, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Next 100 Products (Part 5 - 25 items)...', 'color:#3b82f6;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 5 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

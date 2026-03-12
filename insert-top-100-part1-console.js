// ================================================
// SPARK STORE - INSERT TOP 100 SUBSCRIPTIONS (PART 1: 1-25)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'ea-play-pro', name_ar: 'إي إيه بلاي برو', name_en: 'EA Play Pro',
      description_ar: 'اشتراك EA Play Pro للكمبيوتر — وصول غير محدود لأحدث ألعاب EA مثل EA Sports FC وBattlefield والمزيد.',
      description_en: 'EA Play Pro subscription for PC — Unlimited access to latest EA games like EA Sports FC, Battlefield, and more.',
      features_ar: 'تحميل ولعب أحدث إصدارات EA كاملة\nمكافآت داخل الألعاب وعناصر حصرية\nخصم 10% على المشتريات الرقمية من EA',
      features_en: 'Download and play latest EA releases fully\nIn-game rewards and exclusive items\n10% discount on EA digital purchases',
      price: 14.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Electronic_Arts_2020.svg/1024px-Electronic_Arts_2020.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'جهاز كمبيوتر (PC)', requirements_en: 'PC',
      source_url: `${Z2U}/ea-play`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 14.99, source_url: `${Z2U}/ea-play` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 101, updated_at: now
    },
    {
      id: 'ubisoft-plus-premium', name_ar: 'يوبي سوفت بلس بريميوم', name_en: 'Ubisoft+ Premium',
      description_ar: 'وصول لليوم الأول لجميع ألعاب Ubisoft الجديدة ، بالإضافة إلى أكثر من 100 لعبة شهيرة مثل Assassin\'s Creed وكلاسيكيات.',
      description_en: 'Day 1 access to all new Ubisoft games, plus over 100 popular titles like Assassin\'s Creed and classics.',
      features_ar: 'ألعاب من اليوم الأول للإصدار (إصدارات Premium/Ultimate)\nأكثر من 100 لعبة ضمن المكتبة\nتشمل الإضافات (DLCs) و Season Passes',
      features_en: 'Day 1 games (Premium/Ultimate editions)\nOver 100 games in library\nIncludes DLCs and Season Passes',
      price: 17.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ubisoft_logo.svg/1024px-Ubisoft_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'Xbox أو PC', requirements_en: 'Xbox or PC',
      source_url: `${Z2U}/ubisoft`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 17.99, source_url: `${Z2U}/ubisoft` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 102, updated_at: now
    },
    {
      id: 'nintendo-switch-online', name_ar: 'نينتندو سويتش أونلاين', name_en: 'Nintendo Switch Online',
      description_ar: 'لعب جماعي عبر الإنترنت لألعاب مثل Mario Kart 8 ومكتبة كبيرة من ألعاب NES و SNES الكلاسيكية مجاناً.',
      description_en: 'Online multiplayer for games like Mario Kart 8 and a large library of classic NES and SNES games for free.',
      features_ar: 'اللعب الجماعي عبر الإنترنت\nمكتبة ألعاب كلاسيكية مجانية\nحفظ التخزينات سحابيا',features_en: 'Online multiplayer\nFree classic games library\nCloud saves',
      price: 3.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Nintendo_switch_logo.png/1024px-Nintendo_switch_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'جهاز Nintendo Switch', requirements_en: 'Nintendo Switch console',
      source_url: `${Z2U}/nintendo`,
      subscription_plans: [
          { label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/nintendo` },
          { label_ar: 'سنة كاملة', label_en: '1 Year', price: 19.99, source_url: `${Z2U}/nintendo` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 103, updated_at: now
    },
    {
      id: 'geforce-now-ultimate', name_ar: 'جي فورس ناو ألتميت', name_en: 'GeForce NOW Ultimate',
      description_ar: 'العب ألعابك المفضلة للكمبيوتر على أي جهاز باستخدام أجهزة السيرفرات السحابية الجبارة من NVIDIA بجودة 4K.',
      description_en: 'Play your favorite PC games on any device using NVIDIA\'s powerful cloud servers in 4K quality.',
      features_ar: 'خوادم RTX 4080 السحابية الحصرية\nجودة تصل إلى 4K بمعدل 120 إطاراً بالثانية\nجلسات لعب أطول (حتى 8 ساعات)',
      features_en: 'Exclusive RTX 4080 cloud servers\nUp to 4K resolution at 120fps\nLonger play sessions (up to 8 hours)',
      price: 19.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/GeForce_Now_logo.svg/1024px-GeForce_Now_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'اتصال إنترنت سريع', requirements_en: 'Fast internet connection',
      source_url: `${Z2U}/geforce-now`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/geforce-now` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 104, updated_at: now
    },
    {
      id: 'roblox-premium', name_ar: 'روبلوكس بريميوم', name_en: 'Roblox Premium',
      description_ar: 'احصل على عملات Robux شهرية، وميزات تداول حصرية، والقدرة على الانضمام وبيع العناصر في لعبة Roblox.',
      description_en: 'Get a monthly Robux stipend, exclusive trading features, and the ability to join and sell items in Roblox.',
      features_ar: 'عملات Robux شهرية (الكمية حسب الباقة)\nميزة التداول مع لاعبين آخرين\nخصم عند شراء Robux إضافية',
      features_en: 'Monthly Robux stipend (amount varies)\nTrading feature with other players\nDiscount when buying extra Robux',
      price: 4.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1024px-Roblox_player_icon_black.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Roblox', requirements_en: 'Roblox account',
      source_url: `${Z2U}/roblox`,
      subscription_plans: [{ label_ar: '450 Robux شهرياً', label_en: '450 Robux/mo', price: 4.99, source_url: `${Z2U}/roblox` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 105, updated_at: now
    },
    {
      id: 'fortnite-crew', name_ar: 'فورتنايت كرو (طاقم فورتنايت)', name_en: 'Fortnite Crew',
      description_ar: 'الاشتراك الشهري الأفضل في فورتنايت — يتضمن بطاقة المعركة الحالية، 1000 V-Bucks، وحزمة Crew الحصرية.',
      description_en: 'The ultimate monthly Fortnite subscription — includes the current Battle Pass, 1000 V-Bucks, and exclusive Crew Pack.',
      features_ar: 'تضمين بطاقة المعركة (Battle Pass) للموسم\n1,000 V-Bucks شهرية مجانية\nأطقم وعناصر تجميلية حصرية للطاقم',
      features_en: 'Includes current Battle Pass\n1,000 monthly free V-Bucks\nExclusive Crew cosmetic outfits and items',
      price: 11.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/FortniteLogo.svg/1024px-FortniteLogo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Epic Games', requirements_en: 'Epic Games account',
      source_url: `${Z2U}/fortnite`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 11.99, source_url: `${Z2U}/fortnite` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 106, updated_at: now
    },
    {
      id: 'minecraft-realms-plus', name_ar: 'ماينكرافت ريلمز بلس', name_en: 'Minecraft Realms Plus',
      description_ar: 'امتلك سيرفرك الخاص للعب مع ما يصل إلى 10 أصدقاء بأمان وسهولة، مع وصول مجاني لمكتبة ضخمة لخياطة عوالم',
      description_en: 'Own your private server to play with up to 10 friends safely and easily, plus free access to a massive library of marketplace items.',
      features_ar: 'سيرفر خاص ومستقر دائماً (أونلاين)\nدعوة وتلعب مع ما يصل إلى 10 أصدقاء\nوصول لـ 150+ حزمة المحتوى بالمتجر',
      features_en: 'Private and always-online stable server\nInvite and play with up to 10 friends\nAccess to 150+ marketplace content packs',
      price: 7.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Minecraft_cover.png/800px-Minecraft_cover.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'لعبة Minecraft (Bedrock Edition)', requirements_en: 'Minecraft (Bedrock Edition)',
      source_url: `${Z2U}/minecraft`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 7.99, source_url: `${Z2U}/minecraft` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 107, updated_at: now
    },
    {
      id: 'faceit-premium', name_ar: 'فيس إت بريميوم', name_en: 'FACEIT Premium',
      description_ar: 'ارتقِ بمستواك التنافسي في Counter-Strike 2 — سيرفرات 128-tick والمكافآت الحصرية وتجنب الغشاشين.',
      description_en: 'Elevate your competitive CS2 play — 128-tick servers, exclusive rewards and avoid cheaters with strict anti-cheat.',
      features_ar: 'دخول لدوريات وبطولات حصرية (Leagues/Ladders)\nاختيار السيرفر والخرائط المفضلة المضمون\nشارات وعملات FACEIT لإسترداد الجوائز',
      features_en: 'Access to exclusive leagues and ladders\nGuaranteed server & map veto choices\nFACEIT points for rewards shop',
      price: 5.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/FACEIT_Logo.svg',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'لعبة CS2 وحساب Steam', requirements_en: 'CS2 and Steam account',
      source_url: `${Z2U}/faceit`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/faceit` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 108, updated_at: now
    },
    {
      id: 'wow-time-card', name_ar: 'بطاقة وقت لعب WoW', name_en: 'WoW Time Card',
      description_ar: 'بطاقة وقت اللعب للعبة World of Warcraft الشهيرة من بليزارد — اكتشف العوالم المذهلة وقاتل مع أصدقائك.',
      description_en: 'Game time card for Blizzard\'s famous World of Warcraft — Explore amazing realms and battle with friends.',
      features_ar: 'وقت لعب شرعي مضاف لحسابك بمنصة Battle.net\nوصول لـ WoW Classic ونسخة التوسعة الحالية\nبدون اشتراك تلقائي (نظام بطاقة مدفوعة مسبقا)',
      features_en: 'Legit game time added to Battle.net account\nAccess to WoW Classic and current retail expansion\nNo auto-renewal (prepaid card system)',
      price: 14.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/World_of_Warcraft_logo.svg/1024px-World_of_Warcraft_logo.svg.png',
      duration_ar: '30 يوماً', duration_en: '30 Days', requirements_ar: 'حساب Battle.net', requirements_en: 'Battle.net account',
      source_url: `${Z2U}/wow-time-card`,
      subscription_plans: [
        { label_ar: '30 يوماً', label_en: '30 Days', price: 14.99, source_url: `${Z2U}/wow-time-card` },
        { label_ar: '60 يوماً', label_en: '60 Days', price: 29.99, source_url: `${Z2U}/wow-time-card` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 109, updated_at: now
    },
    {
      id: 'ffxiv-sub', name_ar: 'اشتراك فاينل فانتسي 14', name_en: 'Final Fantasy XIV Sub',
      description_ar: 'تابع مغامراتك في عالم إيورزيا مع اشتراك لعبة Final Fantasy XIV الأونلاين الحائزة على جوائز.',
      description_en: 'Continue your adventures in Eorzea with a subscription to the award-winning Final Fantasy XIV online.',
      features_ar: 'لعب غير محدود للعبة FFXIV\nإنشاء شخصيات متعددة',
      features_en: 'Unlimited FFXIV gameplay\nCreate multiple characters',
      price: 12.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Final_Fantasy_XIV_logo.svg/1024px-Final_Fantasy_XIV_logo.svg.png',
      duration_ar: '30 يوماً', duration_en: '30 Days', requirements_ar: 'لعبة FFXIV الأساسية', requirements_en: 'FFXIV Base Game',
      source_url: `${Z2U}/ffxiv`,
      subscription_plans: [{ label_ar: '30 يوماً (أساسي)', label_en: '30 Days (Entry)', price: 12.99, source_url: `${Z2U}/ffxiv` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 110, updated_at: now
    },
    {
      id: 'runescape-membership', name_ar: 'عضوية رونسكيب', name_en: 'RuneScape Membership',
      description_ar: 'عضوية لعبة RuneScape تمنحك وصولاً إلى مهارات ومهام وعوالم حصرية في كل من RS3 و OSRS.',
      description_en: 'RuneScape membership granting access to exclusive skills, quests, and worlds in both RS3 and OSRS.',
      features_ar: 'وصول لكلا الإصدارين RS3 و Old School RS\nأكثر من 190 تحديث ضخم للمهام\nمساحة بنك أكبر وفرصة لبناء بيت',
      features_en: 'Access to both RS3 and Old School\nOver 190 massive quest updates\nBigger bank space and Player Owned House',
      price: 12.49, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/RuneScape_logo.png/1024px-RuneScape_logo.png',
      duration_ar: '30 يوماً', duration_en: '30 Days', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/runescape-membership`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 12.49, source_url: `${Z2U}/runescape-membership` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 111, updated_at: now
    },
    {
      id: 'twitch-turbo', name_ar: 'تويتش تيربو / اشتراكات قنوات', name_en: 'Twitch Turbo / Subs',
      description_ar: 'استمتع بمشاهدة جميع القنوات على Twitch بدون إعلانات مع Twitch Turbo، أو اطلب دعم ستريمرك المفضل باشتراك Sub مدفوع.',
      description_en: 'Enjoy watching all channels on Twitch ad-free with Twitch Turbo, or support your favorite streamer with a paid Sub.',
      features_ar: 'مشاهدة بدون إعلانات تماماً عبر تويتش (لـ Turbo)\nشارات حصرية في المحادثة (Chat badges)\nحفظ البثوث السابقة لأيام أطول',
      features_en: 'Completely ad-free viewing across Twitch (Turbo)\nExclusive chat badges\nSave broadcasts for longer days',
      price: 11.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Twitch_Glitch_Logo_Purple.svg/1024px-Twitch_Glitch_Logo_Purple.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Twitch', requirements_en: 'Twitch Account',
      source_url: `${Z2U}/twitch`,
      subscription_plans: [{ label_ar: 'شهر (Twitch Turbo)', label_en: '1 Month (Turbo)', price: 11.99, source_url: `${Z2U}/twitch` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 112, updated_at: now
    },
    {
      id: 'humble-choice', name_ar: 'همبل تشويس (للكمبيوتر)', name_en: 'Humble Choice',
      description_ar: 'تشكيلة شهرية من ألعاب أصلية رائعة — الألعاب تصبح ملكك للأبد حتى لو ألغيت الاشتراك.',
      description_en: 'A monthly curated selection of great original games — the games are yours to keep forever even if you cancel.',
      features_ar: 'ألعاب تصبح ملكك أبدياً (تحتوي عناوين شهيرة AAA)\nخصم يصل لـ 20% بمتجر الهامبل\nجزء من الأرباح يذهب للأعمال الخيرية',
      features_en: 'Games are yours to keep (usually includes AAA)\nUp to 20% discount in Humble Store\nPart of profit goes to charity',
      price: 11.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Humble_Bundle_logo.svg/1024px-Humble_Bundle_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Steam', requirements_en: 'Steam account',
      source_url: `${Z2U}/humble-choice`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 11.99, source_url: `${Z2U}/humble-choice` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 113, updated_at: now
    },
    {
      id: 'playstation-plus-extra', name_ar: 'بلايستيشن بلس إكسترا', name_en: 'PlayStation Plus Extra',
      description_ar: 'باقة PlayStation Plus Extra المميزة مع كتالوج يضم مئات الألعاب المتاحة للعب مجاناً متى ما أردت.',
      description_en: 'The PlayStation Plus Extra tier featuring a game catalog of hundreds of games available to play for free anytime.',
      features_ar: 'كتالوج ألعاب يضم تصل إلى 400 لعبة PS4/PS5\nلعب أونلاين وألعاب شهرية مجانية\nحفظ التخزين في السحابة',
      features_en: 'Game catalog featuring up to 400 PS4/PS5 titles\nOnline play and monthly free games\nCloud storage for saved data',
      price: 14.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PlayStation_Plus_logo.svg/2048px-PlayStation_Plus_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب PSN متوافق', requirements_en: 'Compatible PSN account',
      source_url: `${Z2U}/psn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 14.99, source_url: `${Z2U}/psn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 114, updated_at: now
    },
    {
      id: 'playstation-plus-premium', name_ar: 'بلايستيشن بلس بريميوم', name_en: 'PlayStation Plus Premium',
      description_ar: 'أعلى باقة! تشمل كل ميزات Extra بالإضافة لألعاب الكلاسيكيات PS1/PS2/PS3 وإمكانية تجربة الألعاب قبل شرائها.',
      description_en: 'Highest tier! Includes all Extra features plus classics (PS1/PS2/PS3) and game trials before buying.',
      features_ar: 'كتالوج الألعاب الكلاسيكية القديمة\nتجارب الألعاب الحصرية (Game Trials)\nكل مزايا Essential & Extra',
      features_en: 'Classics game catalog\nExclusive game trials\nAll benefits from Essential & Extra',
      price: 17.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/PlayStation_Plus_logo.svg/2048px-PlayStation_Plus_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب PSN', requirements_en: 'PSN account',
      source_url: `${Z2U}/psn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 17.99, source_url: `${Z2U}/psn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 115, updated_at: now
    },
    {
      id: 'gta-plus', name_ar: 'اشتراك جي تي إيه بلس', name_en: 'GTA+ (GTA Online)',
      description_ar: 'برنامج اشتراك خاص للاعبي GTA Online على PS5 و Xbox Series X|S — يمنح نقود داخل اللعبة وميزات حصرية.',
      description_en: 'Subscription program for GTA Online players on PS5 & Xbox Series X|S — grants in-game cash and exclusive perks.',
      features_ar: 'إيداع 500,000 $GTA شهرياً في حسابك\nعقارات وأزياء وتعديلات سيارات مجانية\nخصومات وبطاقات Shark بقيمة أعلى',
      features_en: 'GTA$500,000 monthly deposit\nFree properties, clothing, and vehicle upgrades\nDiscounts and extra value Shark Cards',
      price: 5.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/1024px-Rockstar_Games_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'لعبة GTA Online', requirements_en: 'GTA Online Game',
      source_url: `${Z2U}/gta-online`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/gta-online` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 116, updated_at: now
    },
    {
      id: 'discord-server-boosts', name_ar: 'تعزيزات سيرفرات ديسكورد', name_en: 'Discord Server Boosts',
      description_ar: 'عزز سيرفر مجتمعك بـ Server Boosts مستقرة لمدة 1 أو 3 أشهر لفتح مزايا الصوت والصورة والأيقونات.',
      description_en: 'Boost your community server with stable Server Boosts for 1 or 3 months to unlock premium audio, video and emotes features.',
      features_ar: 'رفع جودة الصوت (128 - 384 Kbps)\nحجم رفع أعلى الملفات للأعضاء السيرفر\nأماكن أكثر للإيموجي والملصقات الخاصة',
      features_en: 'Higher audio quality (128 - 384 Kbps)\nIncreased file upload limit for server members\nMore slots for custom emojis and stickers',
      price: 3.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
      duration_ar: 'شهر واحد (لـ 2 بوستات)', duration_en: '1 Month (x2 Boosts)', requirements_ar: 'رابط ديسكورد', requirements_en: 'Discord invite link',
      source_url: `${Z2U}/discord`,
      subscription_plans: [{ label_ar: 'تعزيزين x2 لسيرفر', label_en: 'x2 Server Boosts', price: 3.99, source_url: `${Z2U}/discord` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 117, updated_at: now
    },
    {
      id: 'iracing-membership', name_ar: 'اشتراك آي ريسينج', name_en: 'iRacing Membership',
      description_ar: 'أفضل محاكي سباق سيارات متوفر للكمبيوتر (PC). تنافس ضد خصوم حقيقيين من جميع أنحاء العالم بتصنيفات دقيقة ومحاكات مذهلة.',
      description_en: 'The premier motorsports racing simulator on PC. Compete against real opponents globally with accurate ratings and incredible simulation.',
      features_ar: 'محاكاة واقعية للغاية للسباقات والسيارات\nتنظيم بطولات حقيقية ورسمية\nسيارات وحلبات سباق مشمولة في العضوية الأساسية',
      features_en: 'Highly realistic physics and car behavior\nCentrally organized official tournaments\nIncluded base cars and laser-scanned tracks',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/IRacing_Logo_Red_Blue.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'عجلة قيادة مقترحة للـ PC', requirements_en: 'Steering wheel recommended for PC',
      source_url: `${Z2U}/iracing`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/iracing` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 118, updated_at: now
    },
    {
      id: 'eve-online-omega', name_ar: 'إيف أونلاين أوميجا', name_en: 'EVE Online Omega',
      description_ar: 'قم بترقية نسختك إلى Omega لتسريع التدريب، واستكشاف مجرات متقدمة، وقيادة كل أنواع سفن EVE Online المذهلة.',
      description_en: 'Upgrade to Omega clone state to double training speed, explore advanced galaxies, and pilot any of EVE Online\'s amazing ships.',
      features_ar: 'تدريب المهارات بسرعة مضاعفة 2X\nالوصول إلى كامل شجرة سفن الفضاء\nمكافآت يومية حصرية',
      features_en: '2X skill training speed\nAccess the entire ship tree\nExclusive daily log-in rewards',
      price: 19.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/EVE_Online_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب EVE', requirements_en: 'EVE account',
      source_url: `${Z2U}/eve`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/eve` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 119, updated_at: now
    },
    {
      id: 'xbox-game-pass-core', name_ar: 'إكس بوكس جيم باس كور', name_en: 'Xbox Game Pass Core',
      description_ar: 'البديل الجديد لـ Xbox Live Gold، يمنحك اللعب الجماعي أونلاين بالإضافة لمكتبة مختارة تضم أكثر من 25 لعبة لتبدأ بها.',
      description_en: 'The evolution of Xbox Live Gold, granting online multiplayer plus a curated catalog of over 25 games to jump into.',
      features_ar: 'إمكانية اللعب المشترك أونلاين\nمكتبة مكونة من أفضل 25+ ألعاب للـ Xbox\nخصومات وحسومات في المتجر',
      features_en: 'Console online multiplayer access\nCatalog of 25+ iconic Xbox games\nStore member deals and discounts',
      price: 9.99, currency: 'USD', category: 'gaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Xbox_logo_2012.svg/2560px-Xbox_logo_2012.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'جهاز Xbox', requirements_en: 'Xbox Console',
      source_url: `${Z2U}/xbox`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/xbox` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 120, updated_at: now
    },
    {
      id: 'hulu-ad-free', name_ar: 'هولو (بدون إعلانات)', name_en: 'Hulu (Ad-Free)',
      description_ar: 'استمتع بمئات المسلسلات الأمريكية الأصلية والأفلام بدون فواصل إعلانية مع اشتراك Hulu Ad-Free.',
      description_en: 'Enjoy hundreds of original American series and movies without ad interruptions with Hulu Ad-Free.',
      features_ar: 'مشاهدة بدون فواصل إعلانية نهائياً\nمتوفر بدقة 4K للمحتوى المدعوم\nتحميل المسلسلات لمشاهدتها عندما لا يكون هناك نت',
      features_en: 'Completely ad-free viewing experience\n4K resolution for supported content\nDownload shows to watch offline',
      price: 17.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/1024px-Hulu_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN للاتصال الأمريكي أحياناً', requirements_en: 'USA VPN sometimes required',
      source_url: `${Z2U}/hulu`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 17.99, source_url: `${Z2U}/hulu` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 121, updated_at: now
    },
    {
      id: 'paramount-plus', name_ar: 'باراماونت بلس', name_en: 'Paramount+',
      description_ar: 'شاهد مسلسلات وأفلام من استوديوهات Paramount الكبرى ومحتوى CBS و MTV و Nickelodeon.',
      description_en: 'Watch series and movies from major Paramount studios, CBS, MTV, and Nickelodeon content.',
      features_ar: 'آلاف الأفلام الكلاسيكية والجديدة\nأصل مسلسلات مثل Halo و Star Trek\nمشاهدة بطولات دوري الأبطال (باستخدام VPN)',
      features_en: 'Thousands of classic and hit movies\nHome of Halo and Star Trek series\nAccess UEFA Champions League (requires US VPN)',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Paramount_Plus.svg/1024px-Paramount_Plus.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'قد يتطلب VPN للمنطقة', requirements_en: 'Regional VPN may be needed',
      source_url: `${Z2U}/paramount`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/paramount` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 122, updated_at: now
    },
    {
      id: 'peacock-premium', name_ar: 'بيكوك بريميوم', name_en: 'Peacock Premium',
      description_ar: 'منصة شبكة NBC الأمريكية! توفر أعمال The Office، عروض المصارعة الحرة WWE، وأفلام Universal Studios.',
      description_en: 'NBC\'s streaming platform! Offers The Office, live WWE events, and blockbuster Universal Studios movies.',
      features_ar: 'يشمل شبكة مصارعة المحترفين (WWE Network)\nأفضل مسلسلات الكوميديا الأمريكية مثل The Office\nأخبار CBS مباشر وبث رياضي (EPL)',
      features_en: 'Includes WWE Network PPVs live\nBest American comedy, e.g. The Office\nLive news and sports (Premier League)',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Peacock_%28streaming_service%29_logo.svg/1024px-Peacock_%28streaming_service%29_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'اتصال أمريكي (VPN)', requirements_en: 'US Connection (VPN)',
      source_url: `${Z2U}/peacock`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/peacock` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 123, updated_at: now
    },
    {
      id: 'starzplay', name_ar: 'ستارز بلاي', name_en: 'STARZ / Starzplay',
      description_ar: 'المنصة المثالية لمشاهدة الآلاف من هوليوود، مسلسلات حصرية مع ترجمة عربية، و أنميات شهيرة مثل هجوم العمالقة',
      description_en: 'Ideal platform for Hollywood hits, exclusive series with Arabic subs, and hit anime like Attack on Titan.',
      features_ar: 'محتوى مترجم ومدبلج للعربية\nبث أفلام ومسلسلات بدقة फुल HD / 4K\nيدعم أجهزة الهواتف الذكية وشاشات ذكية',
      features_en: 'Arabic subtitled and dubbed content\nFull HD / 4K resolution\nSupports mobile devices and Smart TVs',
      price: 3.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Starz_Play_Logo.png/1024px-Starz_Play_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/starzplay`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/starzplay` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 124, updated_at: now
    },
    {
      id: 'shahid-vip', name_ar: 'شاهد VIP', name_en: 'Shahid VIP (Sports/Ent)',
      description_ar: 'شاهد VIP - باقة الرياضة أو الترفيه. تمتع بأقوى مسلسلات رمضان، الإنتاجات الأصلية، ومباريات الدوري السعودي.',
      description_en: 'Shahid VIP - Sports or Entertainment package. Enjoy the best Ramadan series, Originals, and Saudi Pro League.',
      features_ar: 'أعمال شاهد الأصلية (Shahid Originals)\nبث مباريات كرة القدم (دوري روشن وغيره) لباقة الرياضة\nجودة عالية وبدون فواصل اعلانية',
      features_en: 'Shahid Originals exclusive content\nLive football matches (Saudi League, etc.) for Sports tier\nAd-free high definition streaming',
      price: 7.99, currency: 'USD', category: 'streaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ShahidVip_logo.png/1024px-ShahidVip_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/shahid`,
      subscription_plans: [
        { label_ar: 'شهر - ترفيه فقط', label_en: '1 Month - Ent Only', price: 7.99, source_url: `${Z2U}/shahid` },
        { label_ar: 'شهر - رياضة وترفيه', label_en: '1 Month - Sports+Ent', price: 12.99, source_url: `${Z2U}/shahid` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 125, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Top 100 Products (Part 1 - 25 items)...', 'color:#3b82f6;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 1 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

// ================================================
// SPARK STORE - INSERT TOP 100 SUBSCRIPTIONS (PART 2: 26-50)
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const products = [
    {
      id: 'tod-tv', name_ar: 'تود الرياضي والترفيهي', name_en: 'TOD (Total / Sports)',
      description_ar: 'منصة TOD الشاملة من قنوات beIN، شاهد أقوى البطولات الرياضية (الدوري الإنجليزي، الأبطال) ومسلسلات ترفيهية.',
      description_en: 'TOD comprehensive platform by beIN, watch the strongest sports tournaments (Premier League, UCL) and entertainment series.',
      features_ar: 'بث قنوات beIN SPORTS بجودة 4K\nتغطية الدوري الإنجليزي والأبطال وإسبانيا\nمسلسلات وأفلام ترفيهية عربية وعالمية',
      features_en: 'Stream beIN SPORTS channels in 4K\nPremier League, UCL, La Liga coverage\nArabic and international entertainment series',
      price: 14.99, currency: 'USD', category: 'streaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/TOD_Logo.svg/1024px-TOD_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'منطقة الشرق الأوسط وشمال أفريقيا', requirements_en: 'MENA Region',
      source_url: `${Z2U}/tod`,
      subscription_plans: [
        { label_ar: 'شهر واحد (TOD TV)', label_en: '1 Month (TOD TV)', price: 14.99, source_url: `${Z2U}/tod` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 126, updated_at: now
    },
    {
      id: 'osn-plus', name_ar: 'أو إس إن بلس', name_en: 'OSN+',
      description_ar: 'الوجهة الأولى لأعمال HBO الحصرية والأفلام الأمريكية المدبلجة والمترجمة في الشرق الأوسط.',
      description_en: 'The premium destination for exclusive HBO shows and dubbed/subbed American movies in MENA.',
      features_ar: 'أعمال HBO الحصرية و HBO Max\nأعمال أصلية لـ OSN+\nمسلسلات تركية وأفلام عربية حديثة',
      features_en: 'Exclusive HBO and HBO Max shows\nOSN+ Originals\nNew Turkish series and Arabic movies',
      price: 9.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/OSN_Plus_logo_2022.svg/1024px-OSN_Plus_logo_2022.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/osn`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 9.99, source_url: `${Z2U}/osn` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 127, updated_at: now
    },
    {
      id: 'iptv-smarters-falcon', name_ar: 'اشتراكات القنوات (IPTV)', name_en: 'IPTV (Falcon/Smarters)',
      description_ar: 'اشتراك IPTV ممتاز يضم أكثر من 8000 قناة عربية وعالمية بالإضافة لمكتبة أفلام ومسلسلات ضخمة (VOD).',
      description_en: 'Premium IPTV subscription featuring over 8000 Arabic and global channels plus a massive VOD library.',
      features_ar: 'جميع القنوات الرياضية (beIN, SSC, Abu Dhabi)\nمكتبة أفلام مسلسلات ضخمة (نتفلكس وشاهد)\nثبات عالي بدون تقطيع اثناء المباريات',
      features_en: 'All sports channels (beIN, SSC, Abu Dhabi)\nHuge VOD library (Netflix, Shahid)\nHigh stability without buffering during matches',
      price: 11.99, currency: 'USD', category: 'streaming', available: true, featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/IPTV-logo.svg/1024px-IPTV-logo.svg.png',
      duration_ar: 'سنة كاملة', duration_en: '1 Year', requirements_ar: 'شاشة ذكية أو تطبيق جوال', requirements_en: 'Smart TV or Mobile app',
      source_url: `${Z2U}/iptv`,
      subscription_plans: [
        { label_ar: '6 أشهر', label_en: '6 Months', price: 6.99, source_url: `${Z2U}/iptv` },
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 11.99, source_url: `${Z2U}/iptv` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 128, updated_at: now
    },
    {
      id: 'apple-one', name_ar: 'أبل ون (باقة أبل الشاملة)', name_en: 'Apple One',
      description_ar: 'اجمع بين خدمات آبل — Apple Music و Apple TV+ و Apple Arcade ومساحة iCloud+ في اشتراك واحد مريح.',
      description_en: 'Bundle Apple services — Apple Music, Apple TV+, Apple Arcade, and iCloud+ storage in one convenient sub.',
      features_ar: 'تشمل Apple Music و Apple TV+\nتتضمن ألعاب Apple Arcade الخالية من الإعلانات\nمساحة تخزين iCloud+',
      features_en: 'Includes Apple Music and Apple TV+\nAd-free Apple Arcade games\niCloud+ storage space',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Apple_One_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'جهاز Apple (آيفون، آيباد)', requirements_en: 'Apple device (iPhone, iPad)',
      source_url: `${Z2U}/apple-one`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/apple-one` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 129, updated_at: now
    },
    {
      id: 'youtube-tv', name_ar: 'يوتيوب تي في (قنوات أمريكية)', name_en: 'YouTube TV',
      description_ar: 'تلفزيون يوتيوب الفاخر يقدم البث المباشر لأكثر من 100 فناة تلفزيونية أمريكية (أخبار، رياضة، ترفيه).',
      description_en: 'Premium YouTube television offers live streaming of over 100 US broadcast and cable networks.',
      features_ar: 'أكثر من 100 قناة أمريكية (ABC, CBS, FOX, NBC)\nتخزين سحابي DVR غير محدود\nبث قنوات الرياضة والأخبار الحية',
      features_en: '100+ US networks (ABC, CBS, FOX, NBC)\nUnlimited cloud DVR storage\nLive news and sports streaming',
      price: 24.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/YouTube_TV_logo.svg/1024px-YouTube_TV_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/youtube-tv`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 24.99, source_url: `${Z2U}/youtube-tv` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 130, updated_at: now
    },
    {
      id: 'discovery-plus', name_ar: 'ديسكفري بلس', name_en: 'Discovery+',
      description_ar: 'آلاف الساعات من برامج الواقع والحياة الطبيعية والأفلام الوثائقية من شبكات ديسكفري وأصنافها.',
      description_en: 'Thousands of hours of reality, lifestyle, and nature documentaries from Discovery networks.',
      features_ar: 'برامج HGTV, Food Network, TLC\nأفلام وثائقية لعالم الطبيعة والفضاء\nعروض أصلية لمنصة Discovery+',
      features_en: 'Shows from HGTV, Food Network, TLC\nNature and space documentaries\nDiscovery+ Exclusive Originals',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Discovery_Plus_logo.svg/1024px-Discovery_Plus_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/discovery-plus`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/discovery-plus` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 131, updated_at: now
    },
    {
      id: 'viki-pass', name_ar: 'فيكي (الدراما الكورية)', name_en: 'Viki (Rakuten Viki Pass)',
      description_ar: 'الموطن الأكبر لدراما كوريا واليابان والصين وباقي آسيا، مع ترجمات دقيقة بواسطة مجتمع المشاهدين.',
      description_en: 'The biggest home for K-Dramas, J-Dramas, and Asian entertainment, with high-quality community subtitles.',
      features_ar: 'مسلسلات كورية ويابانية وصينية أصلية\nترجمة عربية وإنجليزية عالية الدقة\nمشاهدة خالية من الإعلانات بدقة HD',
      features_en: 'Original Korean, Japanese, Chinese series\nHigh precision EN/AR subtitles\nAd-free viewing in HD quality',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Rakuten_Viki_Logo.svg/1024px-Rakuten_Viki_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/viki`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/viki` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 132, updated_at: now
    },
    {
      id: 'nba-league-pass', name_ar: 'الدوري الأمريكي للمحترفين', name_en: 'NBA League Pass',
      description_ar: 'بث مباشر لجميع مباريات دوري كرة السلة الأمريكي NBA بدون استثناء، بالإضافة للإحصائيات الحية والإعادات.',
      description_en: 'Live stream every NBA basketball game out-of-market, plus live stats and full game replays.',
      features_ar: 'مشاهدة كل مباريات الموسم NBA\nتعليق داخلي وفيديوهات كواليس\nإعادة المباريات الكلاسيكية كاملة',
      features_en: 'Watch all NBA season games\nIn-arena streams and behind-the-scenes\nReplays of classic games',
      price: 15.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/1024px-National_Basketball_Association_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب NBA', requirements_en: 'NBA Account',
      source_url: `${Z2U}/nba`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 15.99, source_url: `${Z2U}/nba` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 133, updated_at: now
    },
    {
      id: 'fubotv', name_ar: 'فوبو تي في', name_en: 'FuboTV',
      description_ar: 'بديل الكيبل للتلفزيون والمبني لعشاق الرياضة. بث حي لمئات القنوات الرياضية والترفيهية (يتطلب VPN).',
      description_en: 'The sports-focused cable TV replacement streaming service. Hundreds of live sports/ent channels (VPN needed).',
      features_ar: 'قنوات رياضية وNFL, MLB, NBA\nتخزين سحابي للمباريات DVR 1000 ساعة\nقنوات الأخبار والأفلام الشاملة',
      features_en: 'Sports channels including NFL, MLB, NBA\nCloud DVR for matches 1000 hours\nComprehensive News and Movies channels',
      price: 29.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/FuboTV_logo.svg/1024px-FuboTV_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/fubo`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 29.99, source_url: `${Z2U}/fubo` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 134, updated_at: now
    },
    {
      id: 'sling-tv', name_ar: 'سلينج تي في', name_en: 'Sling TV',
      description_ar: 'اشترك بـ Sling TV وشاهد مجموعة ضخمة من محطات التلفزة الأمريكية بسعر اقتصادي.',
      description_en: 'Subscribe to Sling TV and watch a massive selection of American television channels at an affordable price.',
      features_ar: 'باقة Orange & Blue متوفرة\nقنوات شبكة ESPN و Fox و CNN وغيرهم\nتخصيص القنوات بأسعار مخفضة',
      features_en: 'Orange & Blue packages available\nESPN networks, Fox, CNN and more\nCustomize your channel line-up cheaply',
      price: 19.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Sling_TV_logo_%282020%29.svg/1024px-Sling_TV_logo_%282020%29.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/sling-tv`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 19.99, source_url: `${Z2U}/sling-tv` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 135, updated_at: now
    },
    {
      id: 'mubi', name_ar: 'موبي (للأفلام المستقلة)', name_en: 'MUBI',
      description_ar: 'المنصة السينمائية التي تقدم مجموعة مختارة ودقيقة من أجمل الأفلام المستقلة، والكلاسيكية، العالمية والقصيرة.',
      description_en: 'The cinematic platform offering a hand-curated selection of the most beautiful indie, classic, global and short films.',
      features_ar: 'أفلام سينمائية عالية التقييم وايقونية\nيُضاف فيلم جديد استثنائي كل يوم\nعروض وتحليلات خاصة من نقاد سينمائيين',
      features_en: 'Highly rated and iconic cinema films\nA new exceptional film added every day\nSpecial insights & reviews from critics',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/MUBI_Logo.svg/1024px-MUBI_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/mubi`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/mubi` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 136, updated_at: now
    },
    {
      id: 'funimation-premium', name_ar: 'فنميشن (الأنمي المترجم والمدبلج)', name_en: 'Funimation Premium',
      description_ar: 'المنصة الأبرز لمشاهدة الانمي المدبلج والمترجم بدون اعلانات. المالك لعدة حقوق كلاسيكية شهيرة للأنمي الياباني.',
      description_en: 'The prime destination for dubbed and subbed anime without ads. Owner of several famous classic anime rights.',
      features_ar: 'مكتبة كلاسيكية للـ Anime (بما فيها المدبلج)\nجودة فيديو Full HD خالية من الإعلانات\nوصول مبكر لدبلجة الأنميات الحصرية',
      features_en: 'Classic Anime library (including dubs)\nAd-free Full HD video quality\nEarly access to exclusive anime dubs',
      price: 3.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Funimation_Logo.svg/1024px-Funimation_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'قد تحتاج حساب Crunchyroll او Funimation', requirements_en: 'May require Crunchyroll/Funimation account',
      source_url: `${Z2U}/funimation`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/funimation` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 137, updated_at: now
    },
    {
      id: 'wwe-network', name_ar: 'دابليو دابليو إي نتورك', name_en: 'WWE Network',
      description_ar: 'الشبكة الرسمية لجميع مهرجانات WWE المباشرة والمكتبة التاريخية كاملة لكل عروض RAW و Smackdown.',
      description_en: 'The official network for all Live WWE PPVs and the complete historical library of all RAW and Smackdown shows.',
      features_ar: 'مشاهدة Wrestlemania والمهرجانات لايف\nبرامج ومقابلات وثائقية، وتاريخ المصارعة\nآلاف الحلقات من Attitude Era وما بعد',
      features_en: 'Watch Wrestlemania and PPVs live\nDocumentaries, interviews, and wrestling history\nThousands of episodes from Attitude Era onwards',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/WWE_Logo.svg/1024px-WWE_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/wwe`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/wwe` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 138, updated_at: now
    },
    {
      id: 'apple-music', name_ar: 'أبل ميوزك', name_en: 'Apple Music',
      description_ar: '100 مليون أغنية بدون إعلانات مع ميزة الصوت المكاني Dolby Atmos عبر اشتراك أبل ميوزك المميز.',
      description_en: '100 million ad-free songs featuring Dolby Atmos Spatial Audio via Apple Music premium subscription.',
      features_ar: 'تحميل الأغاني والمقاطع للاستماع بدون نت\nراديو أبل الحصري للبرامج والـ DJ\nصوت مكاني عالي الدقة Lossless',
      features_en: 'Download tracks and playlists to listen offline\nExclusive Apple Radio for shows and DJs\nHigh-Res Lossless Spatial Audio',
      price: 3.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Apple_Music_logo.svg/1024px-Apple_Music_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'Apple ID', requirements_en: 'Apple ID',
      source_url: `${Z2U}/apple-music`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/apple-music` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 139, updated_at: now
    },
    {
      id: 'deezer-premium', name_ar: 'ديزر بريميوم', name_en: 'Deezer Premium',
      description_ar: 'أغاني وبودكاست وراديو بجودة وضوح عالية وتوصيات تناسب ذوقك تماماً مع ميزة SongCatcher لمعرفة الأغاني.',
      description_en: 'Songs, podcasts and radio in High Fidelity with recommendations tailored to your taste & SongCatcher feature.',
      features_ar: 'جودة صوت High Fidelity لا تتأثر\nبدون أي إعلانات أوقات الاستماع\nأداة SongCatcher المدمجة للتعرف ع الأغاني',
      features_en: 'High Fidelity sound quality\nTotally ad-free listening\nBuilt-in SongCatcher tool to identify songs',
      price: 2.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Deezer_logo.svg/1024px-Deezer_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/deezer`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${Z2U}/deezer` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 140, updated_at: now
    },
    {
      id: 'soundcloud-go-plus', name_ar: 'ساوند كلاود جو بلس', name_en: 'SoundCloud Go+',
      description_ar: 'استمع بلا إعلانات لأكثر من 300 مليون ريمكس و Covers ومقاطع موسيقية حصرية مع تحميلها للاستماع أوفلاين.',
      description_en: 'Listen ad-free to over 300 million remixes, covers and exclusive tracks with offline download capability.',
      features_ar: 'إزالة كاملة للإعلانات أوقات الاستماع\nتحميل الريمكسات غير المتاحة إلا على ساوند كلاود\nدمج مع أفضل برامج الـ DJ للتوزيع',
      features_en: 'Complete ad removal during listening\nDownload remixes exclusive to SoundCloud\nIntegration with top DJ software',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/SoundCloud_logo.svg/1024px-SoundCloud_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/soundcloud`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/soundcloud` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 141, updated_at: now
    },
    {
      id: 'anghami-plus', name_ar: 'أنغامي بلس', name_en: 'Anghami Plus',
      description_ar: 'منصة الموسيقى العربية والأجنبية الرائدة — حمل الأغاني للاستماع أوفلاين وتخطى أي إعلان للاستمتاع بدون انقطاع.',
      description_en: 'The leading Arabic and universal music platform — Download songs for offline listening and skip all ads.',
      features_ar: 'الاستماع بدون أي مقاطعات اعلانية\nتحميل الأغاني والبودكاست لجهازك الاوفلاين\nدعم البودكاست الحصرية',
      features_en: 'Uninterrupted listening with zero ads\nDownload songs and podcasts for offline\nSupport for exclusive Arabic podcasts',
      price: 2.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Anghami_logo.png/1024px-Anghami_logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'رقم هاتف أو ايميل', requirements_en: 'Phone number or email',
      source_url: `${Z2U}/anghami`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 2.99, source_url: `${Z2U}/anghami` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 142, updated_at: now
    },
    {
      id: 'audible-premium-plus', name_ar: 'أودبل للكتب الصوتية', name_en: 'Audible Premium Plus',
      description_ar: 'استمع لأفضل الكتب المسموعة من أمازون! يمنحك كريديت واحد شهرياً لكتاب مميز، بالإضافة لمكتبة أصلية كبيرة مجانية.',
      description_en: 'Listen to the best audiobooks from Amazon! Get 1 credit per month for any title and access a large free Plus catalog.',
      features_ar: 'استلم نقطة Credit لاختيار أي كتاب\nوصول لمكتبة Audible Plus الكاملة للاف الكتب\nخصومات على الكتب الصوتية الإضافية 30%',
      features_en: 'Get 1 Credit to pick any premium audiobook\nAccess full Audible Plus catalog of thousands of books\n30% discounts on additional audiobooks',
      price: 5.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Audible_logo.svg/1024px-Audible_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Amazon', requirements_en: 'Amazon account',
      source_url: `${Z2U}/audible`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 5.99, source_url: `${Z2U}/audible` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 143, updated_at: now
    },
    {
      id: 'scribd-everand', name_ar: 'سكريبد (تطبيق Everand)', name_en: 'Scribd / Everand',
      description_ar: 'قراءة وسماع الملايين من الكتب، والوثائق الشاملة، والبودكاست وملخصات المجلات — كلها في اشتراك غير محدود.',
      description_en: 'Read and listen to millions of books, extensive documents, podcasts and magazine summaries — all in one unlimited sub.',
      features_ar: 'وصول مفتوح للكتب الإلكترونية والصوتية (عبر Everand)\nوصول للوثائق ومقالات البحث الكبيرة (عبر Scribd)\nمنصة معرفية وثقافية شاملة',
      features_en: 'Open access to audiobooks & ebooks (via Everand)\nAccess to large documents & research papers (via Scribd)\nComprehensive knowledge platform',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Scribd_logo.svg/1024px-Scribd_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/scribd`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/scribd` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 144, updated_at: now
    },
    {
      id: 'tunein-premium', name_ar: 'تون إن بريميوم', name_en: 'TuneIn Premium',
      description_ar: 'أكبر محطة إذاعية شاملة لأخبار الـ CNN و Fox والراديو الرياضي لأبرز الدوريات بدون إعلانات للراديو.',
      description_en: 'The largest comprehensive radio station for CNN, Fox and live sports radio with less ads for radio stations.',
      features_ar: 'آلاف محطات الراديو الإخبارية والتجارية\nأخبار CNN, MSNBC بدون اعلانات\nتغطية رياضية صوتية مباشر (NHL, College)',
      features_en: 'Thousands of news and commercial radio stations\nAd-free CNN, MSNBC news\nLive audio sports coverage (NHL, College)',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/TuneIn_Logo.png/1024px-TuneIn_Logo.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/tunein`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/tunein` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 145, updated_at: now
    },
    {
      id: 'pandora-premium', name_ar: 'باندورا بريميوم', name_en: 'Pandora Premium',
      description_ar: 'استمتع بمحطات الراديو الموسيقية المخصصة تماماً لذوقك! مع ميزة البحث وتشغيل أي أغنية عند الطلب وأوفلاين.',
      description_en: 'Enjoy personalized music radio stations customized to your taste! Plus search and play any song on-demand or offline.',
      features_ar: 'بحث وتشغيل أي محتوى بدون تقييد\nاستماع مخصص بالكامل بدون اعلانات\nصناعة وتعديل الـ Playlists بسهولة',
      features_en: 'Search and play any content without restriction\nFully personalized listening ad-free\nEasily create and edit Playlists',
      price: 4.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Pandora_Radio_logo.svg/1024px-Pandora_Radio_logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/pandora`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/pandora` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 146, updated_at: now
    },
    {
      id: 'siriusxm', name_ar: 'سيريوس إكس إم', name_en: 'SiriusXM',
      description_ar: 'راديو القمر الصناعي الآن في تطبيقك! مئات القنوات الموسيقية والبرامج الحوارية والبودكاست وألعاب الرياضة المتنوعة.',
      description_en: 'Satellite radio now in your app! Hundreds of music, talk shows, podcasts and various live sports channels.',
      features_ar: 'برامج حوارية حصرية وبودكاست أصلية\nقنوات موسيقية متنوعة بدون تدخل المعلقين الاعلانيين\nمباريات كرة القدم الأمريكية حية (الراديو)',
      features_en: 'Exclusive talk shows and original podcasts\nVarious music channels ad-free\nLive American football matches (Audio)',
      price: 3.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Sirius_XM_Radio_Logo.svg/1024px-Sirius_XM_Radio_Logo.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'VPN (أمريكا)', requirements_en: 'VPN (USA)',
      source_url: `${Z2U}/siriusxm`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/siriusxm` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 147, updated_at: now
    },
    {
      id: 'storytel', name_ar: 'ستوريتيل للكتب الصوتية', name_en: 'Storytel',
      description_ar: 'استمع إلى آلاف الكتب الصوتية والإلكترونية العربية والعالمية عبر منصة Storytel. المكتبة الأشهر عربياً للكتب.',
      description_en: 'Listen to thousands of Arabic and global audio/e-books via Storytel platform. The most famous Arabic book library.',
      features_ar: 'الآلاف من الكتب العربية والأجنبية الصوتية\nوصول غير محدود في أي وقت لقراءة الكتب الإلكترونية\nوضعية تخزين أوفلاين',
      features_en: 'Thousands of Arabic & English audiobooks\nUnlimited access anytime to read ebooks\nOffline storage mode',
      price: 3.99, currency: 'USD', category: 'streaming', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Storytel_logo_orange.svg/1024px-Storytel_logo_orange.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/storytel`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 3.99, source_url: `${Z2U}/storytel` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 148, updated_at: now
    },
    {
      id: 'notion-ai', name_ar: 'نوشن الذكاء الاصطناعي', name_en: 'Notion AI',
      description_ar: 'قم بدمج الذكاء الاصطناعي مباشرة في مساحة عمل Notion. أداة تلخص وتترجم وتكتب وتولد أفكار للعمل والمشاريع.',
      description_en: 'Integrate AI natively inside your Notion workspace. An tool that summarizes, translates, writes & brainstorms for work/projects.',
      features_ar: 'كتابة وتعديل النصوص مباشرة بداخل Notion\nتلخيص صفحات وجداول بيانات طويلة\nمترجم وكاشف أخطاء وتوليد جداول ذكي',
      features_en: 'Write and edit texts directly inside Notion\nSummarize long pages and databases\nTranslator, spelling checker, table generator',
      price: 4.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: 'حساب Notion', requirements_en: 'Notion Account',
      source_url: `${Z2U}/notion`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 4.99, source_url: `${Z2U}/notion` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 149, updated_at: now
    },
    {
      id: 'jasper-ai', name_ar: 'جاسبر إي آي', name_en: 'Jasper AI',
      description_ar: 'مصمم لصناع المحتوى والمسوقين المحترفين — كتابة نصوص إعلانية وتسويقية قوية وحملات إيميلات متقدمة.',
      description_en: 'Built for content creators and pro marketers — generate powerful ad copy, marketing texts, and advanced email campaigns.',
      features_ar: 'تعلم هوية ونبرة العلامة التجارية (Brand Voice)\nإنشاء خطط تسويق وكتابة تغريدات واعلانات\nكتابة مقالات Blog سريعة بذكاء',
      features_en: 'Learns Brand Voice and style\nCreate marketing plans, tweets, and ad copies\nGenerate rapid Blog articles smartly',
      price: 15.99, currency: 'USD', category: 'software', available: true, featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Jasper_AI.svg/1024px-Jasper_AI.svg.png',
      duration_ar: 'شهر واحد', duration_en: '1 Month', requirements_ar: '', requirements_en: '',
      source_url: `${Z2U}/jasper`,
      subscription_plans: [{ label_ar: 'شهر واحد', label_en: '1 Month', price: 15.99, source_url: `${Z2U}/jasper` }],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }, sort_order: 150, updated_at: now
    }
  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting Top 100 Products (Part 2 - 25 items)...', 'color:#eab308;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 100)); // prevent spam
  }
  console.log(`%c🏁 Part 2 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok > 0 ? '#4ade80' : '#f87171'};font-size:13px;font-weight:bold`);
})();

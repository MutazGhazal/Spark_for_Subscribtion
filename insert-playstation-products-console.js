// ================================================
// SPARK STORE - INSERT PLAYSTATION & FORTNITE PRODUCTS
// Source: z2u.com
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  const products = [

    // ===== EA Sports FC 26 Standard =====
    {
      id: 'ps-ea-fc-26-std',
      name_ar: 'إي أيه سبورتس إف سي 26 - النسخة القياسية (حساب PSN)',
      name_en: 'EA Sports FC 26 Standard Edition (PSN Account)',
      description_ar: 'حساب بلايستيشن كامل الوصول يحتوي على لعبة EA Sports FC 26 النسخة القياسية. استمتع بتجربة كرة القدم الأكثر واقعية.',
      description_en: 'Full access PlayStation account containing EA Sports FC 26 Standard Edition. Experience the most realistic football game.',
      features_ar: 'حساب كامل الوصول (Full Access)\nلعبة EA FC 26 النسخة القياسية\nيدعم أونلاين وألتيميت تيم\nضمان كامل على الحساب',
      features_en: 'Full Access Account\nEA FC 26 Standard Edition\nSupports Online & Ultimate Team\nFull Warranty on Account',
      price: 49.99,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: true,
      image: 'https://p7.vpgame.com/news/ea-sports-fc-24-full-release-date-confirmed-as-september-29.jpg', // FC Image placeholder
      duration_ar: 'وصول دائم (حساب)', duration_en: 'Lifetime Access (Account)',
      requirements_ar: 'جهاز بلايستيشن 4 أو 5', requirements_en: 'PlayStation 4 or 5 console',
      source_url: `${Z2U}/product-677405/EA-Sports-FC-26-FUT-26-Standard-Edition-Account-Full-Access-Global-PlayStation-Network.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 60,
      updated_at: now
    },

    // ===== EA Sports FC 26 Ultimate =====
    {
      id: 'ps-ea-fc-26-ult',
      name_ar: 'إي أيه سبورتس إف سي 26 - نسخة ألتيميت (حساب PSN)',
      name_en: 'EA Sports FC 26 Ultimate Edition (PSN Account)',
      description_ar: 'حساب بلايستيشن كامل الوصول يحتوي على EA Sports FC 26 ألتيميت مع كافة الإضافات والمزايا الحصرية.',
      description_en: 'Full access PlayStation account containing EA Sports FC 26 Ultimate Edition with all DLCs and exclusive benefits.',
      features_ar: 'نسخة ألتيميت الكاملة\nنقاط فيفا / ألتيميت بوينتس إضافية\nوصول مبكر ومحتوى حصري\nحساب خاص بك بالكامل',
      features_en: 'Full Ultimate Edition\nExtra FIFA / Ultimate Points\nEarly access & exclusive content\nFully private account',
      price: 79.98,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: false,
      image: 'https://p7.vpgame.com/news/ea-sports-fc-24-full-release-date-confirmed-as-september-29.jpg',
      duration_ar: 'وصول دائم (حساب)', duration_en: 'Lifetime Access (Account)',
      requirements_ar: 'جهاز بلايستيشن 4 أو 5', requirements_en: 'PlayStation 4 or 5 console',
      source_url: `${Z2U}/product-677408/EA-Sports-FC-26-FUT-26-Ultimate-Edition-Account-Full-Access-Global-PlayStation-Network.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 61,
      updated_at: now
    },

    // ===== NBA 2K26 Standard =====
    {
      id: 'ps-nba-2k26-std',
      name_ar: 'إن بي إيه 2K26 - النسخة القياسية (حساب PSN)',
      name_en: 'NBA 2K26 Standard Edition (PSN Account)',
      description_ar: 'احصل على حساب بلايستيشن يحتوي على NBA 2K26 واستمتع بأفضل لعبة كرة سلة في العالم.',
      description_en: 'Get a PlayStation account with NBA 2K26 and enjoy the best basketball game in the world.',
      features_ar: 'لعبة NBA 2K26 النسخة القياسية\nحساب خاص مع كامل البيانات\nيدعم اللعب عبر الإنترنت\nتحديثات دورية',
      features_en: 'NBA 2K26 Standard Edition\nPrivate account with full data\nSupports online play\nRegular updates',
      price: 73.00,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: false,
      image: 'https://images.2k.com/nba2k/nba2k25/v1/nba2k25-logo.png', // NBA placeholder
      duration_ar: 'وصول دائم (حساب)', duration_en: 'Lifetime Access (Account)',
      requirements_ar: 'جهاز بلايستيشن 4 أو 5', requirements_en: 'PlayStation 4 or 5 console',
      source_url: `${Z2U}/product-672039/NBA-2K26-Standard-Edition-PlayStation-Network-Account-Full-Access.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 62,
      updated_at: now
    },

    // ===== NBA 2K26 Superstar =====
    {
      id: 'ps-nba-2k26-super',
      name_ar: 'إن بي إيه 2K26 - نسخة السوبر ستار (حساب PSN)',
      name_en: 'NBA 2K26 Superstar Edition (PSN Account)',
      description_ar: 'حساب بلايستيشن مع نسخة السوبر ستار للعبة NBA 2K26، تشمل محتوى إضافي ضخم وعملات داخل اللعبة.',
      description_en: 'PlayStation account with NBA 2K26 Superstar Edition, includes massive bonus content and in-game currency.',
      features_ar: 'نسخة Superstar الحصرية\nمحتوى إضافي وعملات VC\nحماية كاملة للحساب\nتسليم فوري ومباشر',
      features_en: 'Exclusive Superstar Edition\nBonus content & VC currency\nFull account protection\nInstant & direct delivery',
      price: 90.00,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: true,
      image: 'https://images.2k.com/nba2k/nba2k25/v1/nba2k25-logo.png',
      duration_ar: 'وصول دائم (حساب)', duration_en: 'Lifetime Access (Account)',
      requirements_ar: 'جهاز بلايستيشن 4 أو 5', requirements_en: 'PlayStation 4 or 5 console',
      source_url: `${Z2U}/product-672040/NBA-2K26-Superstar-Edition-PlayStation-Network-Account-Full-Access.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 63,
      updated_at: now
    },

    // ===== Fortnite 10K V-Bucks =====
    {
      id: 'fortnite-10k-vbucks',
      name_ar: 'فورتنايت - حساب 10,000 في باكس',
      name_en: 'Fortnite - 10,000 V-Bucks Account',
      description_ar: 'حساب Epic Games جديد يحتوي على 10,000 V-Bucks. يمكن ربطه بأي منصة (PC/Xbox/PlayStation).',
      description_en: 'New Epic Games account containing 10,000 V-Bucks. Can be linked to any platform (PC/Xbox/PlayStation).',
      features_ar: '10,000 V-Bucks مشحونة جاهزة\nحساب كامل الوصول مع الإيميل\nيمكن تغيير كافة البيانات\nيدعم PlayStation و Xbox و PC',
      features_en: '10,000 V-Bucks pre-charged\nFull Access account with Email\nAll data can be changed\nSupports PlayStation, Xbox, and PC',
      price: 36.29,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: false,
      image: 'https://logos-world.net/wp-content/uploads/2020/05/Fortnite-Logo.png',
      duration_ar: 'شحن رصيد (حساب)', duration_en: 'Credit (Account)',
      requirements_ar: 'حساب جديد أو الربط عبر الـ Console', requirements_en: 'New account or link via Console',
      source_url: `${Z2U}/product-624138/New-Epic-account-with-10000-Fortnite-V-Bucks-Can-bond-to-any-platform-Full-Access-PlayStation-Network.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 64,
      updated_at: now
    },

    // ===== Fortnite 13.5K V-Bucks =====
    {
      id: 'fortnite-13-5k-vbucks',
      name_ar: 'فورتنايت - حساب 13,500 في باكس',
      name_en: 'Fortnite - 13,500 V-Bucks Account',
      description_ar: 'حساب Epic Games يحتوي على 13,500 V-Bucks لشراء السكنات والباتل باس.',
      description_en: 'Epic Games account containing 13,500 V-Bucks to buy skins and battle pass.',
      features_ar: '13,500 V-Bucks رصيد حساب\nتسليم سريع وآمن\nحساب خاص بالكامل\nتوافق مع كافة المنصات',
      features_en: '13,500 V-Bucks account balance\nFast & secure delivery\nFully private account\nCross-platform compatibility',
      price: 42.90,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: false,
      image: 'https://logos-world.net/wp-content/uploads/2020/05/Fortnite-Logo.png',
      duration_ar: 'شحن رصيد (حساب)', duration_en: 'Credit (Account)',
      requirements_ar: 'حساب Epic جديد', requirements_en: 'New Epic account',
      source_url: `${Z2U}/product-22170/New-Epic-account-with-13-500-Fortnite-V-Bucks-Can-bond-to-any-platform-Full-Access-PlayStation-V-Bucks-Account.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 65,
      updated_at: now
    },

    // ===== Fortnite 27K V-Bucks =====
    {
      id: 'fortnite-27k-vbucks',
      name_ar: 'فورتنايت - حساب 27,000 في باكس',
      name_en: 'Fortnite - 27,000 V-Bucks Account',
      description_ar: 'حساب فخامة يحتوي على 27,000 V-Bucks لشراء كل ما تريده في متجر فورتنايت.',
      description_en: 'Luxury account containing 27,000 V-Bucks to buy everything you want in the Fortnite shop.',
      features_ar: 'كمية ضخمة 27,000 V-Bucks\nتوفير كبير مقارنة بالشحن العادي\nحساب جديد ونظيف\nضمان Spark الذهبي',
      features_en: 'Huge 27,000 V-Bucks amount\nMassive savings vs normal charging\nNew clean account\nSpark Golden Warranty',
      price: 83.05,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: true,
      image: 'https://logos-world.net/wp-content/uploads/2020/05/Fortnite-Logo.png',
      duration_ar: 'شحن رصيد (حساب)', duration_en: 'Credit (Account)',
      requirements_ar: 'حساب Epic جديد', requirements_en: 'New Epic account',
      source_url: `${Z2U}/product-9400/New-Epic-account-with-27000-Fortnite-V-Bucks-Can-bond-to-any-platform-Full-Access-PlayStation.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 66,
      updated_at: now
    },

    // ===== Fortnite 40.5K V-Bucks =====
    {
      id: 'fortnite-40-5k-vbucks',
      name_ar: 'فورتنايت - حساب 40,500 في باكس',
      name_en: 'Fortnite - 40,500 V-Bucks Account',
      description_ar: 'أكبر باقة V-Bucks متوفرة! حساب يحتوي على 40,500 في باكس لتكون الأقوى في اللعبة.',
      description_en: 'Biggest V-Bucks pack available! Account containing 40,500 V-Bucks to be the strongest in the game.',
      features_ar: 'أقصى كمية: 40,500 V-Bucks\nمثالي للمتجر والهديا\nأقل سعر لكل في باكس\nدعم فني مخصص',
      features_en: 'Maximum amount: 40,500 V-Bucks\nPerfect for store and gifts\nLowest price per V-Buck\nDedicated technical support',
      price: 132.00,
      currency: 'USD',
      category: 'gaming',
      available: true,
      featured: false,
      image: 'https://logos-world.net/wp-content/uploads/2020/05/Fortnite-Logo.png',
      duration_ar: 'شحن رصيد (حساب)', duration_en: 'Credit (Account)',
      requirements_ar: 'حساب Epic جديد', requirements_en: 'New Epic account',
      source_url: `${Z2U}/product-22539/New-Epic-account-with-40-500-Fortnite-V-Bucks-Can-bond-to-any-platform-Full-Access-PlayStation-V-Bucks-Account.html`,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 67,
      updated_at: now
    }

  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting 8 PlayStation/Fortnite products...', 'color:#0070d1;font-size:14px;font-weight:bold');
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

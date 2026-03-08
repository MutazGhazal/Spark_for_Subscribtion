// ================================================
// SPARK STORE - INSERT MICROSOFT PRODUCTS (14 items)
// Source: wmcentre.su
// Paste this in the browser console while on the ADMIN PAGE (after login)
// NOTE: microsoft-365 already exists in DB — this adds it as a separate annual entry
// ================================================
(async () => {
  const WM = 'https://wmcentre.su/en';
  const now = new Date().toISOString();
  const products = [

    // ============ Microsoft 365 / Office 365 SUBSCRIPTIONS ============

    {
      id: 'microsoft-365-annual',
      name_ar: 'مايكروسوفت 365 — 12 شهر',
      name_en: 'Microsoft 365 Personal — 12 Months',
      description_ar: 'اشتراك مايكروسوفت 365 الشخصي لمدة 12 شهراً — Word وExcel وPowerPoint وOneDrive 1TB مباشرة على حسابك',
      description_en: 'Microsoft 365 Personal 12-month subscription — Word, Excel, PowerPoint and 1TB OneDrive directly to your account',
      features_ar: 'Word, Excel, PowerPoint, Outlook كاملة\nمساحة OneDrive 1 تيرابايت\nيدعم Windows وMac وiOS وAndroid\nتحديثات مجانية مستمرة\nاشتراك يُضاف مباشرة لحسابك',
      features_en: 'Full Word, Excel, PowerPoint, Outlook\n1TB OneDrive storage\nSupports Windows, Mac, iOS and Android\nFree continuous updates\nSubscription added directly to your account',
      price: 13.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: '12 شهراً', duration_en: '12 Months', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/microsoft-365-12-mesyatsev-na-vash-akkaunt-microsoft-3994084`,
      subscription_plans: [
        { label_ar: 'سنة كاملة', label_en: '1 Year', price: 13.99, source_url: `${WM}/item/microsoft-365-12-mesyatsev-na-vash-akkaunt-microsoft-3994084` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 26,
      updated_at: now
    },

    {
      id: 'office-365-proplus-12mo',
      name_ar: 'أوفيس 365 Pro Plus — 12 شهر',
      name_en: 'Office 365 Pro Plus — 12 Months',
      description_ar: 'أوفيس 365 Pro Plus لمدة سنة كاملة — 5 أجهزة Windows أو Mac مع مساحة 5TB OneDrive',
      description_en: 'Office 365 Pro Plus for a full year — 5 Windows or Mac devices with 5TB OneDrive storage',
      features_ar: 'تثبيت على 5 أجهزة Win/Mac/iOS/Android\nمساحة OneDrive 5 تيرابايت\nجميع تطبيقات Office الكاملة\nاشتراك يُجدَّد سنوياً\nدعم فوري وتحديثات مستمرة',
      features_en: 'Install on 5 devices Win/Mac/iOS/Android\n5TB OneDrive storage\nAll full Office applications\nAnnually renewed subscription\nInstant support and continuous updates',
      price: 4.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: '12 شهراً', duration_en: '12 Months', requirements_ar: '', requirements_en: '',
      source_url: `${WM}/item/office-365-pro-plus-5-ustroystv-12-mesyatsev-3826267`,
      subscription_plans: [
        { label_ar: '3 أشهر — 5 أجهزة', label_en: '3 Months — 5 Devices', price: 6.99, source_url: `${WM}/item/office-365-proplus-5-ustroystv-na-3-mesyatsa-2312188` },
        { label_ar: 'سنة — 5 أجهزة + 5TB', label_en: '1 Year — 5 Devices + 5TB', price: 4.99, source_url: `${WM}/item/office-365-pro-plus-5-ustroystv-12-mesyatsev-3826267` },
        { label_ar: 'سنة — 5 أجهزة + 5TB OneDrive', label_en: '1 Year — 5 Devices + 5TB OneDrive', price: 4.99, source_url: `${WM}/item/office-365-5pc-win-mac-5tb-onedrive-for-1-god-3233618` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 27,
      updated_at: now
    },

    // ============ Office LIFETIME KEYS ============

    {
      id: 'office-2024-pro-plus',
      name_ar: 'أوفيس 2024 Pro Plus LTSC',
      name_en: 'Office 2024 Pro Plus LTSC',
      description_ar: 'أحدث إصدار من Microsoft Office 2024 Pro Plus — تفعيل فوري مدى الحياة بدون اشتراك شهري',
      description_en: 'Latest Microsoft Office 2024 Pro Plus — Instant lifetime activation without monthly subscription',
      features_ar: 'Word, Excel, PowerPoint, Outlook 2024\nتفعيل فوري خلال ثانية واحدة\nترخيص مدى الحياة — ادفع مرة واحدة\nيدعم Windows 10/11\nتحديثات أمنية مجانية',
      features_en: 'Word, Excel, PowerPoint, Outlook 2024\nInstant activation in one second\nLifetime license — pay once\nSupports Windows 10/11\nFree security updates',
      price: 4.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'Windows 10/11', requirements_en: 'Windows 10/11',
      source_url: `${WM}/item/office-2024-pro-plus-ltsc-bystraya-aktivatsiya-3720035`,
      subscription_plans: [
        { label_ar: 'مدى الحياة', label_en: 'Lifetime', price: 4.99, source_url: `${WM}/item/office-2024-pro-plus-ltsc-bystraya-aktivatsiya-3720035` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 28,
      updated_at: now
    },

    {
      id: 'office-2021-pro-plus',
      name_ar: 'أوفيس 2021 Pro Plus',
      name_en: 'Office 2021 Pro Plus',
      description_ar: 'Microsoft Office 2021 Pro Plus الأصلي — تفعيل فوري مدى الحياة بمفتاح رسمي',
      description_en: 'Original Microsoft Office 2021 Pro Plus — Instant lifetime activation with official key',
      features_ar: 'Word, Excel, PowerPoint, Outlook 2021\nتفعيل فوري بالبوت خلال ثانية\nترخيص مدى الحياة\nيدعم Windows 10/11\nمشمول بضمان',
      features_en: 'Word, Excel, PowerPoint, Outlook 2021\nInstant bot activation in one second\nLifetime license\nSupports Windows 10/11\nComes with warranty',
      price: 4.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'Windows 10/11', requirements_en: 'Windows 10/11',
      source_url: `${WM}/item/office-2021-pro-plus-aktivatsiya-v-1-sek-bot-4149707`,
      subscription_plans: [
        { label_ar: 'مدى الحياة', label_en: 'Lifetime', price: 4.99, source_url: `${WM}/item/office-2021-pro-plus-aktivatsiya-v-1-sek-bot-4149707` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 29,
      updated_at: now
    },

    {
      id: 'office-2019-pro-plus',
      name_ar: 'أوفيس 2019 Pro Plus',
      name_en: 'Office 2019 Pro Plus',
      description_ar: 'Microsoft Office 2019 Pro Plus بمفتاح رسمي من Microsoft Partner — تفعيل مضمون مدى الحياة',
      description_en: 'Microsoft Office 2019 Pro Plus with official Microsoft Partner key — Guaranteed lifetime activation',
      features_ar: 'Word, Excel, PowerPoint, Outlook 2019\nمفتاح رسمي من Microsoft Partner\nترخيص مدى الحياة\nيدعم Windows 7/8/10/11\nضمان التفعيل مضمون 100%',
      features_en: 'Word, Excel, PowerPoint, Outlook 2019\nOfficial Microsoft Partner key\nLifetime license\nSupports Windows 7/8/10/11\n100% guaranteed activation',
      price: 15.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'Windows 7/8/10/11', requirements_en: 'Windows 7/8/10/11',
      source_url: `${WM}/item/microsoft-office-2019-pro-plus-microsoft-partner-2527548`,
      subscription_plans: [
        { label_ar: 'مدى الحياة', label_en: 'Lifetime', price: 15.99, source_url: `${WM}/item/microsoft-office-2019-pro-plus-microsoft-partner-2527548` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 30,
      updated_at: now
    },

    {
      id: 'office-2016-pro-plus',
      name_ar: 'أوفيس 2016 Pro Plus',
      name_en: 'Office 2016 Pro Plus',
      description_ar: 'Microsoft Office 2016 Pro Plus بمفتاح رسمي — خيار مثالي للأجهزة القديمة بترخيص مدى الحياة',
      description_en: 'Microsoft Office 2016 Pro Plus with official key — Perfect for older systems with lifetime license',
      features_ar: 'Word, Excel, PowerPoint, Outlook 2016\nمفتاح رسمي من Microsoft Partner\nترخيص مدى الحياة\nيدعم Windows 7/8/10\nمثالي للأجهزة القديمة',
      features_en: 'Word, Excel, PowerPoint, Outlook 2016\nOfficial Microsoft Partner key\nLifetime license\nSupports Windows 7/8/10\nPerfect for older systems',
      price: 11.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'Windows 7/8/10', requirements_en: 'Windows 7/8/10',
      source_url: `${WM}/item/microsoft-office-2016-pro-plus-microsoft-partner-1993433`,
      subscription_plans: [
        { label_ar: 'مدى الحياة', label_en: 'Lifetime', price: 11.99, source_url: `${WM}/item/microsoft-office-2016-pro-plus-microsoft-partner-1993433` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 31,
      updated_at: now
    },

    // ============ WINDOWS ============

    {
      id: 'windows-11-pro',
      name_ar: 'ويندوز 11 Pro',
      name_en: 'Windows 11 Pro',
      description_ar: 'مفتاح Windows 11 Pro الأصلي من Microsoft Partner — تفعيل فوري وآمن مدى الحياة',
      description_en: 'Genuine Windows 11 Pro key from Microsoft Partner — Instant and secure lifetime activation',
      features_ar: 'ترخيص أصلي من Microsoft Partner\nتفعيل فوري وآمن عبر الإنترنت\nيدعم 32/64 بت\nتحديثات مجانية مستمرة من مايكروسوفت\nمضمون 100%',
      features_en: 'Genuine Microsoft Partner license\nInstant and secure online activation\nSupports 32/64-bit\nFree continuous Microsoft updates\n100% guaranteed',
      price: 6.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2560px-Windows_logo_-_2012.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'PC متوافق مع Win11', requirements_en: 'Win11 compatible PC',
      source_url: `${WM}/item/windows-11-professional-microsoft-partner-3175766`,
      subscription_plans: [
        { label_ar: 'مدى الحياة', label_en: 'Lifetime', price: 6.99, source_url: `${WM}/item/windows-11-professional-microsoft-partner-3175766` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 32,
      updated_at: now
    },

    {
      id: 'windows-10-pro',
      name_ar: 'ويندوز 10 Pro',
      name_en: 'Windows 10 Pro',
      description_ar: 'مفتاح Windows 10 Pro الأصلي — تفعيل آمن مدى الحياة يدعم 32 و64 بت على أي جهاز',
      description_en: 'Genuine Windows 10 Pro key — Secure lifetime activation supporting 32 and 64-bit on any PC',
      features_ar: 'ترخيص أصلي عالمي\nيدعم 32/64 بت\nتفعيل أونلاين آمن\nتحديثات مجانية من مايكروسوفت\nمشمول بضمان',
      features_en: 'Genuine global license\nSupports 32/64-bit\nSafe online activation\nFree Microsoft updates\nComes with warranty',
      price: 5.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2560px-Windows_logo_-_2012.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'PC متوافق مع Win10', requirements_en: 'Win10 compatible PC',
      source_url: `${WM}/item/windows-10-11-pro-home-onlayn-privyazka-3720021`,
      subscription_plans: [
        { label_ar: 'مدى الحياة', label_en: 'Lifetime', price: 5.99, source_url: `${WM}/item/windows-10-11-pro-home-onlayn-privyazka-3720021` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 33,
      updated_at: now
    },

    {
      id: 'windows-11-home',
      name_ar: 'ويندوز 11 Home',
      name_en: 'Windows 11 Home',
      description_ar: 'مفتاح Windows 11 Home الأصلي من Microsoft Partner — خيار مثالي للاستخدام الشخصي المنزلي',
      description_en: 'Genuine Windows 11 Home key from Microsoft Partner — Perfect choice for personal home use',
      features_ar: 'ترخيص أصلي من Microsoft Partner\nتفعيل فوري وآمن\nكامل ميزات ويندوز 11\nتحديثات مجانية\nمثالي للاستخدام المنزلي',
      features_en: 'Genuine Microsoft Partner license\nInstant and secure activation\nFull Windows 11 features\nFree updates\nPerfect for home use',
      price: 6.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2560px-Windows_logo_-_2012.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'PC متوافق مع Win11', requirements_en: 'Win11 compatible PC',
      source_url: `${WM}/item/windows-11-home-domashnyaya-microsoft-partner-3175769`,
      subscription_plans: [
        { label_ar: 'مدى الحياة', label_en: 'Lifetime', price: 6.99, source_url: `${WM}/item/windows-11-home-domashnyaya-microsoft-partner-3175769` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 34,
      updated_at: now
    },

    {
      id: 'windows-office-bundle',
      name_ar: 'باقة ويندوز + أوفيس',
      name_en: 'Windows 10/11 + Office 2024 Bundle',
      description_ar: 'باقة شاملة تجمع ويندوز 10/11 Pro مع Office 2021/2024 — الحل المتكامل لجهازك الجديد',
      description_en: 'All-in-one bundle combining Windows 10/11 Pro with Office 2021/2024 — Complete solution for your new PC',
      features_ar: 'مفتاح Windows 10 أو 11 Pro/Home\nمفتاح Office 2021 أو 2024\nتوفير كبير مقارنة بالشراء المنفصل\nتفعيل فوري لكليهما\nضمان مدى الحياة',
      features_en: 'Windows 10 or 11 Pro/Home key\nOffice 2021 or 2024 key\nBig savings vs buying separately\nInstant activation for both\nLifetime warranty',
      price: 8.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: true,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/2560px-Windows_logo_-_2012.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'Windows 10/11', requirements_en: 'Windows 10/11',
      source_url: `${WM}/item/komplekt-win-10-11-pro-home-office-2021-2024-3706216`,
      subscription_plans: [
        { label_ar: 'باقة Win + Office', label_en: 'Win + Office Bundle', price: 8.99, source_url: `${WM}/item/komplekt-win-10-11-pro-home-office-2021-2024-3706216` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 35,
      updated_at: now
    },

    // ============ أدوات مايكروسوفت المتخصصة ============

    {
      id: 'microsoft-visio-2021',
      name_ar: 'مايكروسوفت Visio Pro 2021',
      name_en: 'Microsoft Visio Pro 2021',
      description_ar: 'أداة رسم المخططات والدياجرام الاحترافية من مايكروسوفت — مثالية للمهندسين والمحللين',
      description_en: 'Microsoft\'s professional diagrams and flowcharts tool — Perfect for engineers and analysts',
      features_ar: 'رسم مخططات تدفق احترافية\nقوالب Visio الاحترافية الشاملة\nتكامل مع Office وSharePoint\nتصدير لـ PDF وصور عالية الجودة\nترخيص جهاز واحد مدى الحياة',
      features_en: 'Professional flowchart drawing\nComprehensive Visio professional templates\nIntegration with Office and SharePoint\nExport to PDF and high-quality images\nSingle-PC lifetime license',
      price: 7.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'Windows 10/11', requirements_en: 'Windows 10/11',
      source_url: `${WM}/item/microsoft-visio-pro-2021-1-pk-microsoft-partner-3315982`,
      subscription_plans: [
        { label_ar: 'مدى الحياة — جهاز واحد', label_en: 'Lifetime — 1 PC', price: 7.99, source_url: `${WM}/item/microsoft-visio-pro-2021-1-pk-microsoft-partner-3315982` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 36,
      updated_at: now
    },

    {
      id: 'microsoft-project-2021',
      name_ar: 'مايكروسوفت Project Pro 2021',
      name_en: 'Microsoft Project Pro 2021',
      description_ar: 'أداة إدارة المشاريع الاحترافية من مايكروسوفت — خطط وتابع مشاريعك بدقة عالية',
      description_en: 'Microsoft\'s professional project management tool — Plan and track your projects with high precision',
      features_ar: 'إدارة مشاريع احترافية متكاملة\nجداول Gantt وتتبع المهام\nإدارة الموارد والميزانيات\nتقارير تفصيلية ومرئيات\nترخيص جهاز واحد مدى الحياة',
      features_en: 'Comprehensive professional project management\nGantt charts and task tracking\nResource and budget management\nDetailed reports and visualizations\nSingle-PC lifetime license',
      price: 7.99,
      currency: 'USD',
      category: 'software',
      available: true,
      featured: false,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar: 'مدى الحياة', duration_en: 'Lifetime', requirements_ar: 'Windows 10/11', requirements_en: 'Windows 10/11',
      source_url: `${WM}/item/microsoft-project-pro-2021-1-pk-microsoft-partner-3315983`,
      subscription_plans: [
        { label_ar: 'مدى الحياة — جهاز واحد', label_en: 'Lifetime — 1 PC', price: 7.99, source_url: `${WM}/item/microsoft-project-pro-2021-1-pk-microsoft-partner-3315983` }
      ],
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
      sort_order: 37,
      updated_at: now
    }

  ];

  let ok = 0, fail = 0;
  console.log('%c⚡ Spark - Inserting 12 Microsoft products...', 'color:#00a4ef;font-size:14px;font-weight:bold');
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

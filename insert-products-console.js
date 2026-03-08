// ================================================
// SPARK STORE - INSERT 20 PRODUCTS
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const now = new Date().toISOString();
  const products = [
    {
      id:'netflix-premium-4k',
      name_ar:'نتفلكس بريميوم 4K', name_en:'Netflix Premium 4K',
      description_ar:'اشتراك نتفلكس أصلي بجودة 4K UHD — شاهد أفضل الأفلام والمسلسلات العالمية بوضوح لا مثيل له على أي جهاز',
      description_en:'Original Netflix subscription with 4K UHD quality — Watch the best movies and series worldwide in stunning clarity',
      features_ar:'جودة بث 4K UHD كاملة\nيدعم التلفزيون الذكي والموبايل والكمبيوتر\nتحميل المحتوى للمشاهدة أوفلاين\nبدون إعلانات\nآلاف الأفلام والمسلسلات الأصلية',
      features_en:'Full 4K UHD streaming quality\nSupports Smart TV, Mobile and PC\nDownload content for offline viewing\nAd-free experience\nThousands of original movies and series',
      price:4.99, currency:'USD', category:'streaming', available:true, featured:true,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-30948/Personal-Account-Netflix-30days-4K-UHD-Premium-1-Month.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:4.99,source_url:'https://www.z2u.com/product-30948/Personal-Account-Netflix-30days-4K-UHD-Premium-1-Month.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:12.99,source_url:'https://www.z2u.com/netflix/accounts-5-8229'},
        {label_ar:'6 أشهر',label_en:'6 Months',price:22.99,source_url:'https://www.z2u.com/netflix/accounts-5-8229'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:39.99,source_url:'https://www.z2u.com/netflix/accounts-5-8229'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:1, updated_at:now
    },
    {
      id:'linkedin-premium-career',
      name_ar:'لينكدإن بريميوم Career', name_en:'LinkedIn Premium Career',
      description_ar:'ارفع مستوى ملفك المهني على لينكدإن — وصول مباشر لمسؤولي التوظيف وأدوات التطوير المهني الشاملة',
      description_en:'Elevate your LinkedIn profile — Direct access to recruiters and comprehensive professional development tools',
      features_ar:'5 رسائل InMail شهرياً للتواصل المباشر\nمعرفة من زار ملفك الشخصي\nرؤى الراتب والمقارنة الوظيفية\nشارة Premium المميزة على ملفك\nدورات LinkedIn Learning مجانية',
      features_en:'5 InMail messages per month\nSee who viewed your profile\nSalary insights and job comparisons\nPremium badge on your profile\nFree LinkedIn Learning courses',
      price:14.99, currency:'USD', category:'software', available:true, featured:true,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-76325/LinkedIn-Premium-Career-1-Month-Top-Up.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:14.99,source_url:'https://www.z2u.com/product-76325/LinkedIn-Premium-Career-1-Month-Top-Up.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:39.99,source_url:'https://www.z2u.com/linkedin/subscriptions-12-15224'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:129.99,source_url:'https://www.z2u.com/product-76328/LinkedIn-Premium-Career-12-Month-Top-Up.html'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:2, updated_at:now
    },
    {
      id:'spotify-premium',
      name_ar:'سبوتيفاي بريميوم', name_en:'Spotify Premium',
      description_ar:'استمع للموسيقى بجودة عالية بدون إعلانات — ملايين الأغاني والبودكاست في متناول يدك في أي وقت',
      description_en:'Listen to music in high quality without ads — Millions of songs and podcasts at your fingertips anytime',
      features_ar:'استماع بدون إعلانات\nتحميل الأغاني للاستماع أوفلاين\nجودة صوت عالية 320kbps\nتخطي الأغاني بدون حد\nمتاح على جميع الأجهزة',
      features_en:'Ad-free listening\nDownload songs for offline listening\nHigh quality audio 320kbps\nUnlimited song skips\nAvailable on all devices',
      price:2.99, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-22500/Spotify-Premium-Individual-for-1-month.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:2.99,source_url:'https://www.z2u.com/product-22500/Spotify-Premium-Individual-for-1-month.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:7.99,source_url:'https://www.z2u.com/spotify/accounts-5-8224'},
        {label_ar:'6 أشهر',label_en:'6 Months',price:13.99,source_url:'https://www.z2u.com/spotify/accounts-5-8224'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:24.99,source_url:'https://www.z2u.com/spotify/accounts-5-8224'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:3, updated_at:now
    },
    {
      id:'youtube-premium',
      name_ar:'يوتيوب بريميوم', name_en:'YouTube Premium',
      description_ar:'استمتع بيوتيوب بدون إعلانات مع تشغيل في الخلفية — يشمل YouTube Music بدون تكلفة إضافية',
      description_en:'Enjoy YouTube without ads with background playback — Includes YouTube Music at no extra cost',
      features_ar:'مشاهدة بدون إعلانات\nتشغيل الفيديو في الخلفية\nتحميل الفيديوهات أوفلاين\nيشمل YouTube Music بريميوم\nوضع Picture-in-Picture',
      features_en:'Watch without ads\nBackground video playback\nDownload videos offline\nIncludes YouTube Music Premium\nPicture-in-Picture mode',
      price:2.99, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-22746/Youtube-Premium-1-Month-individual-Youtube.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:2.99,source_url:'https://www.z2u.com/product-22746/Youtube-Premium-1-Month-individual-Youtube.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:7.99,source_url:'https://www.z2u.com/youtube/accounts-5-8242'},
        {label_ar:'سنة كاملة (عائلي)',label_en:'1 Year (Family)',price:27.99,source_url:'https://www.z2u.com/youtube/accounts-5-8242'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:4, updated_at:now
    },
    {
      id:'disney-plus',
      name_ar:'ديزني بلاس', name_en:'Disney+',
      description_ar:'منصة بث عالمية تضم محتوى ديزني وماريفل وستار وورز وبيكسار — آلاف الأفلام والمسلسلات الحصرية',
      description_en:'Global streaming platform featuring Disney, Marvel, Star Wars and Pixar — Thousands of exclusive movies and series',
      features_ar:'محتوى ديزني وماريفل وستار وورز حصري\nجودة 4K HDR\nتحميل للمشاهدة أوفلاين\nحتى 4 شاشات في نفس الوقت\nمحتوى حصري لا يُرى في أي مكان آخر',
      features_en:'Exclusive Disney, Marvel and Star Wars content\n4K HDR quality\nDownload for offline viewing\nUp to 4 simultaneous screens\nExclusive content not found anywhere else',
      price:2.99, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-31063/Account-Disney-Basic-Plan-1-month-1-Month.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:2.99,source_url:'https://www.z2u.com/product-31063/Account-Disney-Basic-Plan-1-month-1-Month.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:7.99,source_url:'https://www.z2u.com/disney-plus/accounts-5-8241'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:24.99,source_url:'https://www.z2u.com/disney-plus/accounts-5-8241'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:5, updated_at:now
    },
    {
      id:'chatgpt-plus',
      name_ar:'ChatGPT Plus', name_en:'ChatGPT Plus',
      description_ar:'اشتراك ChatGPT Plus الأصلي من OpenAI — وصول لأقوى نماذج الذكاء الاصطناعي GPT-4o وتوليد الصور',
      description_en:'Original ChatGPT Plus from OpenAI — Access to the most powerful AI models GPT-4o and image generation',
      features_ar:'وصول لأحدث نماذج GPT-4o\nتوليد صور بـ DALL-E 3\nاستجابة أسرع في أوقات الذروة\nأولوية في الميزات الجديدة\nتحليل الملفات والصور والبيانات',
      features_en:'Access to latest GPT-4o models\nImage generation with DALL-E 3\nFaster responses during peak times\nPriority access to new features\nFile, image and data analysis',
      price:9.99, currency:'USD', category:'software', available:true, featured:true,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-31019/ChatGPT-Plus-1-month.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:9.99,source_url:'https://www.z2u.com/product-31019/ChatGPT-Plus-1-month.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:26.99,source_url:'https://www.z2u.com/chatgpt/accounts-5-22631'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:89.99,source_url:'https://www.z2u.com/chatgpt/accounts-5-22631'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:6, updated_at:now
    },
    {
      id:'microsoft-365',
      name_ar:'مايكروسوفت 365', name_en:'Microsoft 365',
      description_ar:'حزمة مايكروسوفت 365 الكاملة — Word وExcel وPowerPoint مع مساحة OneDrive 1TB',
      description_en:'Complete Microsoft 365 suite — Word, Excel and PowerPoint with 1TB OneDrive storage',
      features_ar:'Word, Excel, PowerPoint كاملة\nمساحة OneDrive 1 تيرابايت\nتثبيت على 5 أجهزة\nتحديثات مجانية مستمرة\nيعمل على Windows وMac',
      features_en:'Full Word, Excel and PowerPoint\n1TB OneDrive storage\nInstall on 5 devices\nFree continuous updates\nWorks on Windows and Mac',
      price:4.99, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/2560px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/items-10731851/Office-365-account.html',
      subscription_plans:[
        {label_ar:'3 أشهر',label_en:'3 Months',price:4.99,source_url:'https://www.z2u.com/items-10731851/Office-365-account.html'},
        {label_ar:'6 أشهر',label_en:'6 Months',price:8.99,source_url:'https://www.z2u.com/windows-software/accounts-5-18914'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:14.99,source_url:'https://www.z2u.com/windows-software/accounts-5-18914'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:7, updated_at:now
    },
    {
      id:'canva-pro',
      name_ar:'كانفا برو', name_en:'Canva Pro',
      description_ar:'أداة التصميم الاحترافية الأشهر عالمياً — آلاف القوالب المدفوعة وأدوات AI متقدمة',
      description_en:'The world most popular professional design tool — Thousands of premium templates and advanced AI tools',
      features_ar:'أكثر من 100 مليون صورة وعنصر مدفوع\nإزالة الخلفية بنقرة واحدة\nأدوات تصميم AI متقدمة\nتخزين سحابي 1000 GB\nنماذج جاهزة احترافية لكل مناسبة',
      features_en:'Over 100 million premium images and elements\nOne-click background removal\nAdvanced AI design tools\n1000 GB cloud storage\nProfessional templates for every occasion',
      price:2.49, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/2048px-Canva_icon_2021.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-44208/Canva-Pro-1-Months-Upgrade-Your-Own-Account-Instant-Delivery-.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:2.49,source_url:'https://www.z2u.com/product-44208/Canva-Pro-1-Months-Upgrade-Your-Own-Account-Instant-Delivery-.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:6.49,source_url:'https://www.z2u.com/canva/accounts-5-8240'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:19.99,source_url:'https://www.z2u.com/canva/accounts-5-8240'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:8, updated_at:now
    },
    {
      id:'discord-nitro',
      name_ar:'ديسكورد نيترو', name_en:'Discord Nitro',
      description_ar:'الاشتراك الذهبي لـ Discord — إيموجي مخصص ونيترو بوست للسيرفرات وجودة بث لا تتوقف',
      description_en:'Discord premium subscription — Custom emoji, server Nitro Boosts and non-stop high quality streaming',
      features_ar:'استخدام الإيموجي المخصص في أي سيرفر\n2 نيترو بوست مجانية للسيرفرات\nرفع ملفات حتى 500 MB\nجودة بث 1080p 60fps\nشخصية مخصصة كاملة للملف الشخصي',
      features_en:'Custom emoji in any server\n2 free server Nitro Boosts\nFile uploads up to 500 MB\n1080p 60fps streaming quality\nFull custom profile personalization',
      price:7.99, currency:'USD', category:'gaming', available:true, featured:false,
      image:'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-22500/1-Month-Premium-Nitro-Discord.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:7.99,source_url:'https://www.z2u.com/product-22500/1-Month-Premium-Nitro-Discord.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:21.99,source_url:'https://www.z2u.com/discord/accounts-5-8243'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:69.99,source_url:'https://www.z2u.com/discord/accounts-5-8243'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:9, updated_at:now
    },
    {
      id:'adobe-creative-cloud',
      name_ar:'أدوبي كريتيف كلاود', name_en:'Adobe Creative Cloud',
      description_ar:'حزمة أدوبي الكاملة — Photoshop وPremiere وIllustrator والمزيد بمساحة سحابية 100GB',
      description_en:'Complete Adobe suite — Photoshop, Premiere, Illustrator and more with 100GB cloud storage',
      features_ar:'Photoshop لتعديل الصور الاحترافي\nPremiere Pro لتحرير الفيديو\nIllustrator للتصميم الجرافيكي\nمساحة Creative Cloud 100GB\nتحديثات مستمرة لجميع التطبيقات',
      features_en:'Photoshop for professional photo editing\nPremiere Pro for video editing\nIllustrator for graphic design\n100GB Creative Cloud storage\nContinuous updates for all apps',
      price:14.99, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/2101px-Adobe_Premiere_Pro_CC_icon.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-868091/Adobe-Creative-Cloud-Standard-Individual-Subscription-1-Month-Account.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:14.99,source_url:'https://www.z2u.com/product-868091/Adobe-Creative-Cloud-Standard-Individual-Subscription-1-Month-Account.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:39.99,source_url:'https://www.z2u.com/adobe/accounts-5-18155'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:139.99,source_url:'https://www.z2u.com/adobe/accounts-5-18155'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:10, updated_at:now
    },
    {
      id:'amazon-prime',
      name_ar:'أمازون برايم', name_en:'Amazon Prime',
      description_ar:'عضوية أمازون برايم الكاملة — Prime Video وتوصيل مجاني وPrime Music بسعر واحد',
      description_en:'Full Amazon Prime membership — Prime Video, free shipping and Prime Music all in one price',
      features_ar:'Prime Video بآلاف الأفلام والمسلسلات\nتوصيل مجاني سريع\nPrime Music مجاناً\nخصومات Prime Day الحصرية\nPrime Gaming ألعاب مجانية',
      features_en:'Prime Video with thousands of movies and series\nFree fast shipping\nPrime Music included free\nExclusive Prime Day deals\nPrime Gaming with free games',
      price:3.49, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/2560px-Amazon_Prime_Logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-864467/Amazon-Prime-Video-1-Month-Private-Account.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:3.49,source_url:'https://www.z2u.com/product-864467/Amazon-Prime-Video-1-Month-Private-Account.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:8.99,source_url:'https://www.z2u.com/amazon/accounts-5-8238'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:29.99,source_url:'https://www.z2u.com/amazon/accounts-5-8238'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:11, updated_at:now
    },
    {
      id:'apple-tv-plus',
      name_ar:'Apple TV+', name_en:'Apple TV+',
      description_ar:'منصة بث أبل بمحتوى أصلي حصري — أفلام ومسلسلات فائزة بجوائز إيمي وأوسكار بجودة 4K HDR',
      description_en:'Apple streaming platform with exclusive original content — Emmy and Oscar winning movies and series in 4K HDR',
      features_ar:'محتوى أصلي حصري من Apple\nجودة 4K HDR وDolby Vision\nDolby Atmos للصوت المحيطي\nمتاح على جميع أجهزة Apple وغيرها\nتحميل للمشاهدة أوفلاين',
      features_en:'Exclusive Apple Original content\n4K HDR and Dolby Vision\nDolby Atmos surround sound\nAvailable on Apple devices and others\nDownload for offline viewing',
      price:2.99, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/apple-tv/accounts-5-11072',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:2.99,source_url:'https://www.z2u.com/apple-tv/accounts-5-11072'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:7.99,source_url:'https://www.z2u.com/apple-tv/accounts-5-11072'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:24.99,source_url:'https://www.z2u.com/apple-tv/accounts-5-11072'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:12, updated_at:now
    },
    {
      id:'duolingo-super',
      name_ar:'دوولينجو سوبر', name_en:'Duolingo Super',
      description_ar:'تعلم اللغات بدون إعلانات ومع قلوب غير محدودة — أسرع طريقة ممتعة لتعلم لغة جديدة',
      description_en:'Learn languages without ads and unlimited hearts — The fastest fun way to learn a new language',
      features_ar:'تعلم بدون إعلانات\nقلوب غير محدودة لا تنتهي\nتجربة تعلم غير منقطعة\nتتبع التقدم المتقدم\nمتاح بأكثر من 40 لغة',
      features_en:'Learn without ads\nUnlimited hearts that never run out\nUninterrupted learning experience\nAdvanced progress tracking\nAvailable in 40 plus languages',
      price:2.49, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Duolingo-App-Icon.png/1200px-Duolingo-App-Icon.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-627957/Duolingo-Super-Individual-Plan-1-Month-Personal-Account.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:2.49,source_url:'https://www.z2u.com/product-627957/Duolingo-Super-Individual-Plan-1-Month-Personal-Account.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:6.49,source_url:'https://www.z2u.com/duolingo/accounts-5-18154'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:19.99,source_url:'https://www.z2u.com/duolingo/accounts-5-18154'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:13, updated_at:now
    },
    {
      id:'crunchyroll-mega-fan',
      name_ar:'كرانشيرول Mega Fan', name_en:'Crunchyroll Mega Fan',
      description_ar:'المنصة الأولى للأنمي — آلاف المسلسلات بدون إعلانات مع وصول فوري لأحدث الحلقات',
      description_en:'The number one anime platform — Thousands of series without ads with instant access to the latest episodes',
      features_ar:'أكثر من 45,000 حلقة أنمي\nمشاهدة بدون إعلانات\nوصول فوري لأحدث الحلقات\nتحميل للمشاهدة أوفلاين\nجودة 1080p Full HD',
      features_en:'Over 45,000 anime episodes\nAd-free viewing\nInstant access to latest episodes\nDownload for offline viewing\n1080p Full HD quality',
      price:4.99, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Crunchyroll_Logo.png/1200px-Crunchyroll_Logo.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-623851/Crunchyroll-MEGA-FAN-Account-Ownership-Transfer-1-month.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:4.99,source_url:'https://www.z2u.com/product-623851/Crunchyroll-MEGA-FAN-Account-Ownership-Transfer-1-month.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:12.99,source_url:'https://www.z2u.com/crunchyroll/accounts-5-8244'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:39.99,source_url:'https://www.z2u.com/crunchyroll/accounts-5-8244'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:14, updated_at:now
    },
    {
      id:'hbo-max',
      name_ar:'HBO Max', name_en:'HBO Max',
      description_ar:'منصة Max بمحتوى HBO الحصري — أفضل المسلسلات الأمريكية وأفلام Warner Bros بجودة 4K',
      description_en:'Max platform with exclusive HBO content — Best American series and Warner Bros movies in 4K',
      features_ar:'جميع مسلسلات HBO الحصرية\nأفلام Warner Bros فور صدورها\nجودة 4K Ultra HD\nحتى 3 شاشات في نفس الوقت\nمحتوى DC Comics والأفلام الكوميدية',
      features_en:'All exclusive HBO series\nWarner Bros movies as they release\n4K Ultra HD quality\nUp to 3 simultaneous screens\nDC Comics content and comedy specials',
      price:4.99, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/2560px-HBO_Max_Logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-862795/HBO-Max-Standard-1-Months-Account-No-Ads.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:4.99,source_url:'https://www.z2u.com/product-862795/HBO-Max-Standard-1-Months-Account-No-Ads.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:12.99,source_url:'https://www.z2u.com/hbo-max/accounts-5-11069'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:39.99,source_url:'https://www.z2u.com/hbo-max/accounts-5-11069'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:15, updated_at:now
    },
    {
      id:'grammarly-premium',
      name_ar:'جرامرلي بريميوم', name_en:'Grammarly Premium',
      description_ar:'المساعد الذكي الأول للكتابة بالإنجليزية — تصحيح نحوي متقدم وكاشف انتحال واقتراحات أسلوبية',
      description_en:'The number one AI writing assistant — Advanced grammar correction, plagiarism detection and style suggestions',
      features_ar:'تصحيح الأخطاء النحوية والإملائية\nكاشف الانتحال والسرقة الأدبية\nاقتراحات لتحسين أسلوب الكتابة\nيعمل في كل صفحات الإنترنت\nتحليل نبرة الكتابة والأسلوب',
      features_en:'Grammar and spelling error correction\nPlagiarism detection\nWriting style improvement suggestions\nWorks on all websites\nTone and style analysis',
      price:4.99, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Grammarly_logo.svg/2560px-Grammarly_logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-871170/Gly-For-Education-Personal-Account-1-Month.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:4.99,source_url:'https://www.z2u.com/product-871170/Gly-For-Education-Personal-Account-1-Month.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:12.99,source_url:'https://www.z2u.com/grammarly/accounts-5-8245'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:39.99,source_url:'https://www.z2u.com/grammarly/accounts-5-8245'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:16, updated_at:now
    },
    {
      id:'picsart-gold',
      name_ar:'بيكساَرت جولد', name_en:'Picsart Gold',
      description_ar:'أحد أشهر تطبيقات تعديل الصور بالذكاء الاصطناعي — إزالة الخلفية وفلاتر احترافية وتصميم',
      description_en:'One of the most popular AI photo editing apps — Background removal, professional filters and design',
      features_ar:'إزالة الخلفية تلقائياً بالذكاء الاصطناعي\nأكثر من 10,000 قالب تصميم\nفلاتر وتأثيرات احترافية\nأدوات تعديل صور متقدمة\nبدون إعلانات وإمكانيات غير محدودة',
      features_en:'Automatic AI background removal\nOver 10,000 design templates\nProfessional filters and effects\nAdvanced photo editing tools\nAd-free with unlimited features',
      price:2.99, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/PicsArt_Photo_Editor_icon.png/1024px-PicsArt_Photo_Editor_icon.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/items-12669090/Picsart-Pro-1-month-Private-account-Fast-delivery-max-15-minutes.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:2.99,source_url:'https://www.z2u.com/items-12669090/Picsart-Pro-1-month-Private-account-Fast-delivery-max-15-minutes.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:7.99,source_url:'https://www.z2u.com/picsart/acc-5-33008'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:24.99,source_url:'https://www.z2u.com/picsart/acc-5-33008'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:17, updated_at:now
    },
    {
      id:'tidal-hifi',
      name_ar:'تايدال HiFi', name_en:'Tidal HiFi',
      description_ar:'منصة الموسيقى بأعلى جودة صوت في العالم — استمع بجودة Lossless وDolby Atmos الاستثنائية',
      description_en:'The world highest quality music platform — Listen in Lossless and exceptional Dolby Atmos quality',
      features_ar:'جودة صوت Lossless عالية الدقة\nDolby Atmos وSony 360 Reality\nبدون إعلانات\nأكثر من 100 مليون أغنية\nتحميل للاستماع أوفلاين',
      features_en:'High-fidelity Lossless audio quality\nDolby Atmos and Sony 360 Reality Audio\nAd-free listening\nOver 100 million songs\nDownload for offline listening',
      price:3.49, currency:'USD', category:'streaming', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Tidal_%28service%29_logo.svg/2560px-Tidal_%28service%29_logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-31191/Account-Tidal-HiFi-1-Month-1-month.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:3.49,source_url:'https://www.z2u.com/product-31191/Account-Tidal-HiFi-1-Month-1-month.html'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:9.49,source_url:'https://www.z2u.com/tidal/accounts-5-8226'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:29.99,source_url:'https://www.z2u.com/tidal/accounts-5-8226'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:18, updated_at:now
    },
    {
      id:'linkedin-business',
      name_ar:'لينكدإن بريميوم Business', name_en:'LinkedIn Premium Business',
      description_ar:'اشتراك لينكدإن Business لأصحاب الأعمال والمسوّقين — رؤى متقدمة ورسائل InMail أكثر',
      description_en:'LinkedIn Business for entrepreneurs and marketers — Advanced insights and more InMail messages',
      features_ar:'15 رسالة InMail شهرياً\nرؤى متقدمة عن الشركات والمنافسين\nمعلومات غير محدودة عن العملاء\nأولوية في ظهور الملف الشخصي\nتحليلات متقدمة لصفحة الشركة',
      features_en:'15 InMail messages per month\nAdvanced company and competitor insights\nUnlimited information on prospects\nPriority profile visibility\nAdvanced company page analytics',
      price:19.99, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/product-868589/LinkedIn-Premium-Business-2-Months-Top-Up-Global.html',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:19.99,source_url:'https://www.z2u.com/linkedin/subscriptions-12-15224'},
        {label_ar:'3 أشهر',label_en:'3 Months',price:54.99,source_url:'https://www.z2u.com/product-868589/LinkedIn-Premium-Business-2-Months-Top-Up-Global.html'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:179.99,source_url:'https://www.z2u.com/linkedin/subscriptions-12-15224'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:19, updated_at:now
    },
    {
      id:'nordvpn',
      name_ar:'نورد VPN', name_en:'NordVPN',
      description_ar:'أسرع وأأمن VPN في العالم — تصفح الإنترنت بخصوصية كاملة وأمان عالي من أي مكان',
      description_en:'The fastest and safest VPN in the world — Browse with full privacy and high security from anywhere',
      features_ar:'تشفير عسكري لحماية بياناتك\nأكثر من 6000 خادم في 111 دولة\nحماية من التجسس وتتبع الإعلانات\nفتح المحتوى المحجوب في أي دولة\nيغطي 6 أجهزة في نفس الوقت',
      features_en:'Military-grade encryption for your data\nOver 6,000 servers in 111 countries\nProtection from spying and ad tracking\nUnblock content in any country\nCovers 6 devices simultaneously',
      price:3.99, currency:'USD', category:'software', available:true, featured:false,
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/NordVPN_logo.svg/2560px-NordVPN_logo.svg.png',
      duration_ar:'', duration_en:'', requirements_ar:'', requirements_en:'',
      source_url:'https://www.z2u.com/vpn/accounts-5-8246',
      subscription_plans:[
        {label_ar:'شهر واحد',label_en:'1 Month',price:3.99,source_url:'https://www.z2u.com/vpn/accounts-5-8246'},
        {label_ar:'6 أشهر',label_en:'6 Months',price:17.99,source_url:'https://www.z2u.com/vpn/accounts-5-8246'},
        {label_ar:'سنة كاملة',label_en:'1 Year',price:29.99,source_url:'https://www.z2u.com/vpn/accounts-5-8246'},
        {label_ar:'سنتان',label_en:'2 Years',price:49.99,source_url:'https://www.z2u.com/vpn/accounts-5-8246'}
      ],
      payment_links:{paypal:'',stripe:'',whatsapp_message:''}, sort_order:20, updated_at:now
    }
  ];

  let ok=0, fail=0;
  console.log('%c⚡ Spark - Inserting 20 products...', 'color:#a78bfa;font-size:14px;font-weight:bold');
  for (const p of products) {
    try {
      const { error } = await sb.from('products').upsert(p, { onConflict: 'id' });
      if (error) { console.error('❌', p.name_ar, error.message); fail++; }
      else { console.log('%c✅ ' + p.name_ar, 'color:#4ade80'); ok++; }
    } catch(e) { console.error('❌', p.name_ar, e.message); fail++; }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log(`%c🏁 Done! ✅ ${ok} added | ❌ ${fail} failed`, `color:${ok>0?'#4ade80':'#f87171'};font-size:13px;font-weight:bold`);
})();

(function () {
  'use strict';

  let products = [];
  let currentPaymentProduct = null;
  let settings = {};
  let currentLang = localStorage.getItem('lang') || 'ar';
  let currentCategory = 'all';
  let searchQuery = '';

  let visitorCurrency = 'USD';
  let exchangeRates = {};
  let ratesLoaded = false;
  let ratesTimestamp = 0;
  const RATES_CACHE_KEY = 'exchange_rates_cache';
  const RATES_REFRESH_MS = 10 * 60 * 1000;

  // ===== CURRENCY DETECTION & CONVERSION =====
  const TIMEZONE_CURRENCY = {
    'Asia/Riyadh': 'SAR', 'Asia/Baghdad': 'IQD', 'Asia/Amman': 'JOD',
    'Asia/Damascus': 'SYP', 'Asia/Beirut': 'LBP', 'Africa/Cairo': 'EGP',
    'Africa/Tripoli': 'LYD', 'Africa/Tunis': 'TND', 'Africa/Algiers': 'DZD',
    'Africa/Casablanca': 'MAD', 'Asia/Aden': 'YER', 'Asia/Muscat': 'OMR',
    'Asia/Qatar': 'QAR', 'Asia/Bahrain': 'BHD', 'Asia/Kuwait': 'KWD',
    'Asia/Dubai': 'AED', 'Asia/Gaza': 'ILS', 'Asia/Hebron': 'ILS',
    'Europe/London': 'GBP', 'Europe/Berlin': 'EUR', 'Europe/Paris': 'EUR',
    'Europe/Rome': 'EUR', 'Europe/Madrid': 'EUR', 'Europe/Amsterdam': 'EUR',
    'Europe/Istanbul': 'TRY', 'America/New_York': 'USD', 'America/Chicago': 'USD',
    'America/Los_Angeles': 'USD', 'America/Toronto': 'CAD', 'Asia/Karachi': 'PKR',
    'Asia/Kolkata': 'INR', 'Asia/Calcutta': 'INR', 'Asia/Jakarta': 'IDR',
    'Asia/Kuala_Lumpur': 'MYR', 'Asia/Tokyo': 'JPY', 'Asia/Seoul': 'KRW',
    'Asia/Shanghai': 'CNY', 'Australia/Sydney': 'AUD', 'Pacific/Auckland': 'NZD',
    'America/Sao_Paulo': 'BRL', 'America/Mexico_City': 'MXN',
    'Africa/Khartoum': 'SDG', 'Africa/Mogadishu': 'SOS', 'Asia/Tehran': 'IRR'
  };

  const CURRENCY_SYMBOLS = {
    USD: '$', EUR: '€', GBP: '£', SAR: 'ر.س', AED: 'د.إ', EGP: 'ج.م',
    KWD: 'د.ك', BHD: 'د.ب', QAR: 'ر.ق', OMR: 'ر.ع', JOD: 'د.أ',
    IQD: 'د.ع', LBP: 'ل.ل', SYP: 'ل.س', TND: 'د.ت', DZD: 'د.ج',
    MAD: 'د.م', LYD: 'د.ل', YER: 'ر.ي', ILS: '₪', TRY: '₺',
    CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', INR: '₹', PKR: 'Rs',
    MYR: 'RM', IDR: 'Rp', KRW: '₩', BRL: 'R$', MXN: 'MX$',
    NZD: 'NZ$', SDG: 'ج.س', SOS: 'Sh', IRR: '﷼'
  };

  const CURRENCY_NAMES = {
    ar: { USD:'دولار أمريكي',EUR:'يورو',GBP:'جنيه إسترليني',SAR:'ريال سعودي',AED:'درهم إماراتي',EGP:'جنيه مصري',KWD:'دينار كويتي',BHD:'دينار بحريني',QAR:'ريال قطري',OMR:'ريال عماني',JOD:'دينار أردني',IQD:'دينار عراقي',LBP:'ليرة لبنانية',SYP:'ليرة سورية',TND:'دينار تونسي',DZD:'دينار جزائري',MAD:'درهم مغربي',LYD:'دينار ليبي',YER:'ريال يمني',ILS:'شيكل',TRY:'ليرة تركية',CAD:'دولار كندي',AUD:'دولار أسترالي',JPY:'ين ياباني',CNY:'يوان صيني',INR:'روبية هندية',PKR:'روبية باكستانية',MYR:'رينغيت ماليزي',IDR:'روبية إندونيسية',KRW:'وون كوري',BRL:'ريال برازيلي',MXN:'بيزو مكسيكي',NZD:'دولار نيوزيلندي',SDG:'جنيه سوداني',SOS:'شلن صومالي',IRR:'ريال إيراني' },
    en: { USD:'US Dollar',EUR:'Euro',GBP:'British Pound',SAR:'Saudi Riyal',AED:'UAE Dirham',EGP:'Egyptian Pound',KWD:'Kuwaiti Dinar',BHD:'Bahraini Dinar',QAR:'Qatari Riyal',OMR:'Omani Rial',JOD:'Jordanian Dinar',IQD:'Iraqi Dinar',LBP:'Lebanese Pound',SYP:'Syrian Pound',TND:'Tunisian Dinar',DZD:'Algerian Dinar',MAD:'Moroccan Dirham',LYD:'Libyan Dinar',YER:'Yemeni Rial',ILS:'Israeli Shekel',TRY:'Turkish Lira',CAD:'Canadian Dollar',AUD:'Australian Dollar',JPY:'Japanese Yen',CNY:'Chinese Yuan',INR:'Indian Rupee',PKR:'Pakistani Rupee',MYR:'Malaysian Ringgit',IDR:'Indonesian Rupiah',KRW:'South Korean Won',BRL:'Brazilian Real',MXN:'Mexican Peso',NZD:'New Zealand Dollar',SDG:'Sudanese Pound',SOS:'Somali Shilling',IRR:'Iranian Rial' }
  };

  function detectVisitorCurrency() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TIMEZONE_CURRENCY[tz]) return TIMEZONE_CURRENCY[tz];
      const locale = navigator.language || 'en-US';
      const regionMatch = locale.match(/-([A-Z]{2})$/);
      if (regionMatch) {
        const region = regionMatch[1];
        const regionMap = { US: 'USD', GB: 'GBP', SA: 'SAR', AE: 'AED', EG: 'EGP', JO: 'JOD', IQ: 'IQD', KW: 'KWD', QA: 'QAR', BH: 'BHD', OM: 'OMR', YE: 'YER', LB: 'LBP', SY: 'SYP', PS: 'ILS', DZ: 'DZD', MA: 'MAD', TN: 'TND', LY: 'LYD', SD: 'SDG', TR: 'TRY', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', CA: 'CAD', AU: 'AUD', JP: 'JPY', IN: 'INR', PK: 'PKR', BR: 'BRL', MX: 'MXN' };
        if (regionMap[region]) return regionMap[region];
      }
    } catch (e) { /* fallback */ }
    return 'USD';
  }

  function loadCachedRates() {
    try {
      const cached = JSON.parse(localStorage.getItem(RATES_CACHE_KEY));
      if (cached && cached.rates && cached.ts && (Date.now() - cached.ts < RATES_REFRESH_MS)) {
        exchangeRates = cached.rates;
        ratesTimestamp = cached.ts;
        ratesLoaded = true;
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  }

  function saveCachedRates() {
    try {
      localStorage.setItem(RATES_CACHE_KEY, JSON.stringify({ rates: exchangeRates, ts: ratesTimestamp }));
    } catch (e) { /* ignore */ }
  }

  async function fetchFromAPI(url, extractRates) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) return null;
      const data = await res.json();
      return extractRates(data);
    } catch (e) {
      clearTimeout(timeout);
      return null;
    }
  }

  async function loadExchangeRates() {
    if (loadCachedRates()) return;

    const apis = [
      {
        url: 'https://latest.currency-api.pages.dev/v1/currencies/usd.json',
        extract: d => d && d.usd ? Object.fromEntries(Object.entries(d.usd).map(([k,v]) => [k.toUpperCase(), v])) : null
      },
      {
        url: 'https://open.er-api.com/v6/latest/USD',
        extract: d => d && d.rates ? d.rates : null
      },
      {
        url: 'https://api.exchangerate-api.com/v4/latest/USD',
        extract: d => d && d.rates ? d.rates : null
      }
    ];

    for (const api of apis) {
      const rates = await fetchFromAPI(api.url, api.extract);
      if (rates && Object.keys(rates).length > 10) {
        exchangeRates = rates;
        ratesTimestamp = Date.now();
        ratesLoaded = true;
        saveCachedRates();
        return;
      }
    }
  }

  function startRatesAutoRefresh() {
    setInterval(async () => {
      const old = { ...exchangeRates };
      ratesLoaded = false;
      localStorage.removeItem(RATES_CACHE_KEY);
      await loadExchangeRates();
      if (ratesLoaded && visitorCurrency !== 'USD') {
        const changed = old[visitorCurrency] !== exchangeRates[visitorCurrency];
        if (changed) {
          renderProducts();
          renderRateInfo();
        }
      }
    }, RATES_REFRESH_MS);
  }

  function renderRateInfo() {
    const el = document.getElementById('rateInfo');
    if (!el) return;
    if (!ratesLoaded || visitorCurrency === 'USD') { el.style.display = 'none'; return; }

    const rate = exchangeRates[visitorCurrency];
    if (!rate) { el.style.display = 'none'; return; }

    const sym = CURRENCY_SYMBOLS[visitorCurrency] || visitorCurrency;
    const name = (CURRENCY_NAMES[currentLang] || CURRENCY_NAMES.ar)[visitorCurrency] || visitorCurrency;
    const rateStr = rate < 10 ? rate.toFixed(4) : rate < 1000 ? rate.toFixed(2) : Math.round(rate).toLocaleString();

    const ago = ratesTimestamp ? timeSince(ratesTimestamp) : '';

    el.style.display = '';
    el.innerHTML = currentLang === 'ar'
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> <span>1$ = ${rateStr} ${sym} <span class="rate-name">(${name})</span></span><span class="rate-time">${ago}</span>`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> <span>1$ = ${rateStr} ${sym} <span class="rate-name">(${name})</span></span><span class="rate-time">${ago}</span>`;
  }

  function timeSince(ts) {
    const sec = Math.floor((Date.now() - ts) / 1000);
    if (sec < 60) return currentLang === 'ar' ? 'الآن' : 'just now';
    const min = Math.floor(sec / 60);
    if (min < 60) return currentLang === 'ar' ? `منذ ${min} د` : `${min}m ago`;
    const hr = Math.floor(min / 60);
    return currentLang === 'ar' ? `منذ ${hr} س` : `${hr}h ago`;
  }

  function parseUTC(ts) {
    if (!ts) return NaN;
    const s = String(ts);
    if (/[Zz]$/.test(s) || /[+-]\d{2}:\d{2}$/.test(s)) return new Date(s).getTime();
    return new Date(s + 'Z').getTime();
  }

  let gitHubLastCommit = null;

  async function fetchGitHubLastCommit() {
    try {
      const cached = localStorage.getItem('gh_last_commit');
      const cachedTime = localStorage.getItem('gh_last_commit_ts');
      if (cached && cachedTime && Date.now() - Number(cachedTime) < 5 * 60 * 1000) {
        gitHubLastCommit = parseUTC(cached);
        return;
      }
      const res = await fetch('https://api.github.com/repos/MutazGhazal/Spark_for_Subscribtion/commits?per_page=1');
      if (!res.ok) return;
      const data = await res.json();
      if (data[0]?.commit?.committer?.date) {
        const d = data[0].commit.committer.date;
        gitHubLastCommit = parseUTC(d);
        localStorage.setItem('gh_last_commit', d);
        localStorage.setItem('gh_last_commit_ts', String(Date.now()));
      }
    } catch (e) {}
  }

  function renderLastUpdated() {
    const bar = document.getElementById('lastUpdatedBar');
    if (!bar) return;

    const timestamps = [];

    if (settings.last_modified) timestamps.push(parseUTC(settings.last_modified));
    if (gitHubLastCommit) timestamps.push(gitHubLastCommit);

    products.forEach(p => {
      if (p.updated_at) timestamps.push(parseUTC(p.updated_at));
      else if (p.created_at) timestamps.push(parseUTC(p.created_at));
    });

    const valid = timestamps.filter(t => !isNaN(t));
    if (valid.length === 0) { bar.style.display = 'none'; return; }

    const latest = new Date(Math.max(...valid));
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const opts = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: tz };
    const formatted = latest.toLocaleString(currentLang === 'ar' ? 'ar-EG' : 'en-US', opts);

    bar.style.display = '';
    bar.textContent = currentLang === 'ar'
      ? `آخر تحديث: ${formatted}`
      : `Last updated: ${formatted}`;
  }

  function convertPrice(priceUSD, fromCurrency) {
    if (!ratesLoaded) return null;
    let usd = priceUSD;
    if (fromCurrency && fromCurrency !== 'USD' && exchangeRates[fromCurrency]) {
      usd = priceUSD / exchangeRates[fromCurrency];
    }
    if (visitorCurrency === 'USD') return null;
    const rate = exchangeRates[visitorCurrency];
    if (!rate) return null;
    return usd * rate;
  }

  function formatLocalPrice(priceUSD, fromCurrency) {
    const converted = convertPrice(priceUSD, fromCurrency);
    if (converted === null) return '';
    const sym = CURRENCY_SYMBOLS[visitorCurrency] || visitorCurrency;
    const rounded = converted < 10 ? converted.toFixed(2) : Math.round(converted).toLocaleString();
    return `≈ ${rounded} ${sym}`;
  }

  function formatUSDEquiv(price, fromCurrency) {
    if (!fromCurrency || fromCurrency === 'USD') return `$${price}`;
    if (!ratesLoaded || !exchangeRates[fromCurrency]) return `${price} ${fromCurrency}`;
    const usd = (price / exchangeRates[fromCurrency]).toFixed(2);
    return `≈ $${usd} USD`;
  }

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ===== TRANSLATIONS =====
  const t = {
    ar: {
      buyNow: 'اشتري الآن', choosePay: 'اختر طريقة الدفع',
      noResults: 'لا توجد نتائج', searchPlaceholder: 'ابحث عن اشتراك...',
      paymentTitle: 'طرق الدفع المتاحة', paymentSubtitle: 'اختر الطريقة الأنسب لك للدفع بسهولة وأمان',
      paypalDesc: 'ادفع بسهولة عبر حساب باي بال الخاص بك',
      stripeDesc: 'ادفع ببطاقة الائتمان أو الخصم بأمان',
      whatsappDesc: 'تواصل معنا عبر واتساب لإتمام الدفع',
      cryptoDesc: 'ادفع بالعملات الرقمية USDT',
      featured: 'مميز', unavailable: 'غير متوفر حالياً',
      available: 'متوفر',
      copied: 'تم النسخ!', copy: 'نسخ',
      sendVia: 'إرسال عبر واتساب', cryptoTitle: 'الدفع بالعملات الرقمية',
      cryptoInstructions: 'حوّل المبلغ لأحد العناوين التالية ثم أرسل إيصال الدفع عبر واتساب',
      copyright: 'جميع الحقوق محفوظة',
      whatsappContact: 'واتساب', telegramContact: 'تيليجرام', emailContact: 'البريد الإلكتروني',
      featuresTitle: 'تفاصيل الاشتراك', viewDetails: 'عرض التفاصيل',
      reqTitle: 'بيانات الطلب', reqName: 'اسمك', reqEmail: 'بريدك الإلكتروني',
      reqContinue: 'متابعة للدفع', reqNote: 'بياناتك آمنة ولن تُشارك مع أي طرف ثالث',
      orderSaved: 'تم تسجيل طلبك بنجاح!', orderFailed: 'فشل تسجيل الطلب',
      emailSubject: 'طلب جديد', sendViaEmail: 'إرسال عبر الإيميل',
      proofTitle: '📸 إثبات الدفع',
      proofMsg: 'بعد إتمام الدفع، يرجى إرسال صورة أو لقطة شاشة لعملية الدفع عبر واتساب لتأكيد طلبك',
      proofBtn: 'إرسال إثبات الدفع عبر واتساب',
      proofDone: '✅ تم اختيار طريقة الدفع'
    },
    en: {
      buyNow: 'Buy Now', choosePay: 'Choose Payment Method',
      noResults: 'No results found', searchPlaceholder: 'Search for a subscription...',
      paymentTitle: 'Available Payment Methods', paymentSubtitle: 'Choose the most convenient way to pay securely',
      paypalDesc: 'Pay easily through your PayPal account',
      stripeDesc: 'Pay securely with credit or debit card',
      whatsappDesc: 'Contact us on WhatsApp to complete payment',
      cryptoDesc: 'Pay with USDT cryptocurrency',
      featured: 'Featured', unavailable: 'Currently Unavailable',
      available: 'Available',
      copied: 'Copied!', copy: 'Copy',
      sendVia: 'Send via WhatsApp', cryptoTitle: 'Pay with Crypto',
      cryptoInstructions: 'Transfer the amount to one of the addresses below, then send the receipt via WhatsApp',
      copyright: 'All rights reserved',
      whatsappContact: 'WhatsApp', telegramContact: 'Telegram', emailContact: 'Email',
      featuresTitle: 'Subscription Details', viewDetails: 'View Details',
      reqTitle: 'Order Details', reqName: 'Your Name', reqEmail: 'Your Email',
      reqContinue: 'Continue to Payment', reqNote: 'Your data is secure and will not be shared with third parties',
      orderSaved: 'Your order has been submitted!', orderFailed: 'Failed to submit order',
      emailSubject: 'New Order', sendViaEmail: 'Send via Email',
      proofTitle: '📸 Payment Proof',
      proofMsg: 'After completing payment, please send a screenshot of the transaction via WhatsApp to confirm your order',
      proofBtn: 'Send Payment Proof via WhatsApp',
      proofDone: '✅ Payment method selected'
    }
  };

  function txt(key) { return t[currentLang]?.[key] || t.ar[key] || key; }
  function langVal(obj, field) { return obj[field + '_' + currentLang] || obj[field + '_ar'] || ''; }

  // ===== THEME =====
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon();
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    $('#themeToggle').innerHTML = isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // ===== LANGUAGE =====
  function initLang() { applyLang(); }

  function toggleLang() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', currentLang);
    applyLang();
    renderCategories();
    renderProducts();
    renderPaymentSection();
    renderFooter();
    renderRateInfo();
    renderLastUpdated();
  }

  function applyLang() {
    const html = document.documentElement;
    if (currentLang === 'ar') {
      html.setAttribute('dir', 'rtl'); html.setAttribute('lang', 'ar');
      document.body.classList.add('rtl'); document.body.classList.remove('ltr');
      $('#langToggle').textContent = 'EN';
    } else {
      html.setAttribute('dir', 'ltr'); html.setAttribute('lang', 'en');
      document.body.classList.remove('rtl'); document.body.classList.add('ltr');
      $('#langToggle').textContent = 'عربي';
    }

    $('#storeName').textContent = 'Spark';
    $('#heroTitle').textContent = langVal(settings.store || {}, 'hero') || '';
    $('#heroSub').textContent = langVal(settings.store || {}, 'hero_sub') || '';
    $('#searchInput').placeholder = txt('searchPlaceholder');
    $('#noResultsText').textContent = txt('noResults');
    $('#paymentTitle').textContent = txt('paymentTitle');
    $('#paymentSubtitle').textContent = txt('paymentSubtitle');

    $$('[data-ar]').forEach(el => {
      el.textContent = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
    });
  }

  // ===== DATA LOADING (Supabase with JSON fallback) =====
  async function loadData() {
    if (typeof sb !== 'undefined' && typeof isSupabaseConfigured === 'function' && isSupabaseConfigured()) {
      try {
        const [prodRes, catRes, storeRes, payRes, socialRes, lastModRes] = await Promise.all([
          sb.from('products').select('*').order('sort_order'),
          sb.from('categories').select('*').order('sort_order'),
          sb.from('site_settings').select('value').eq('key', 'store').maybeSingle(),
          sb.from('site_settings').select('value').eq('key', 'payment').maybeSingle(),
          sb.from('site_settings').select('value').eq('key', 'social').maybeSingle(),
          sb.from('site_settings').select('value').eq('key', 'last_modified').maybeSingle()
        ]);

        products = prodRes.data || [];
        const cats = catRes.data || [];
        settings = {
          store: storeRes.data?.value || {},
          payment: payRes.data?.value || {},
          social: socialRes.data?.value || {},
          last_modified: lastModRes.data?.value || null,
          categories: [{ id: 'all', name_ar: 'الكل', name_en: 'All', icon: 'grid' }, ...cats]
        };
        return true;
      } catch (e) {
        console.warn('Supabase load failed, falling back to JSON:', e);
      }
    }

    try {
      const [prodRes, settRes] = await Promise.all([
        fetch('data/products.json'),
        fetch('data/settings.json')
      ]);
      const prodData = await prodRes.json();
      const settData = await settRes.json();
      products = prodData.products || [];
      settings = settData;
      return true;
    } catch (e) {
      console.error('Failed to load data:', e);
      products = [];
      settings = {};
      return false;
    }
  }

  // ===== CATEGORIES =====
  function renderCategories() {
    const cats = settings.categories || [
      { id: 'all', name_ar: 'الكل', name_en: 'All' },
      { id: 'streaming', name_ar: 'بث ومشاهدة', name_en: 'Streaming' },
      { id: 'software', name_ar: 'برامج وتطبيقات', name_en: 'Software' },
      { id: 'gaming', name_ar: 'ألعاب', name_en: 'Gaming' }
    ];

    const icons = {
      all: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
      streaming: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>',
      software: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>',
      gaming: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>'
    };

    const bar = $('#categoriesBar');
    bar.innerHTML = cats.map(cat => `
      <button class="cat-btn ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}">
        ${icons[cat.id] || icons.all}
        ${langVal(cat, 'name')}
      </button>
    `).join('');

    bar.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.dataset.category;
        bar.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts();
      });
    });
  }

  // ===== PRODUCTS =====
  function getFilteredProducts() {
    return products.filter(p => {
      const matchCat = currentCategory === 'all' || p.category === currentCategory;
      if (!matchCat) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (p.name_ar || '').toLowerCase().includes(q) || (p.name_en || '').toLowerCase().includes(q) ||
        (p.description_ar || '').toLowerCase().includes(q) || (p.description_en || '').toLowerCase().includes(q);
    });
  }

  function getCategoryLabel(catId) {
    const cat = (settings.categories || []).find(c => c.id === catId);
    return cat ? langVal(cat, 'name') : catId;
  }

  function renderProducts() {
    const filtered = getFilteredProducts();
    const grid = $('#productsGrid');
    const noRes = $('#noResults');

    if (filtered.length === 0) { grid.innerHTML = ''; noRes.style.display = 'block'; return; }
    noRes.style.display = 'none';

    grid.innerHTML = filtered.map(p => {
      const name = langVal(p, 'name');
      const desc = langVal(p, 'description');
      const duration = langVal(p, 'duration');
      const isAvailable = p.available !== false;

      return `
        <div class="product-card animate-in" data-id="${p.id}">
          ${!isAvailable ? `<div class="unavailable-overlay"><span class="unavailable-text">${txt('unavailable')}</span></div>` : ''}
          ${p.featured ? `<div class="product-badge">${txt('featured')}</div>` : ''}
          <div class="product-image">
            <img src="${p.image}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
            <svg class="placeholder-icon" style="display:none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <div class="product-info">
            <span class="product-category">${getCategoryLabel(p.category)}</span>
            <h3 class="product-name">${name}</h3>
            <p class="product-desc">${desc}</p>
            <div class="product-meta">
              <span class="product-price">${p.price} <span class="currency">${p.currency || 'USD'}</span>${formatLocalPrice(p.price, p.currency) ? `<span class="local-price">${formatLocalPrice(p.price, p.currency)}</span>` : ''}</span>
              <span class="product-duration">${duration}</span>
            </div>
            <div class="product-actions">
              <button class="btn btn-primary buy-btn" data-id="${p.id}" ${!isAvailable ? 'disabled' : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                ${txt('buyNow')}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        startBuyFlow(btn.dataset.id);
      });
    });

    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => openProductDetail(card.dataset.id));
    });
  }

  // ===== PRODUCT DETAIL MODAL =====
  function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = $('#productDetailModal');
    const body = $('#productDetailBody');
    const name = langVal(product, 'name');
    const desc = langVal(product, 'description');
    const duration = langVal(product, 'duration');
    const features = langVal(product, 'features');
    const isAvailable = product.available !== false;
    const localPrice = formatLocalPrice(product.price, product.currency);

    const featuresList = features
      ? features.split('\n').filter(f => f.trim())
      : [];

    body.innerHTML = `
      <div class="pd-hero">
        <div class="pd-badges">
          ${product.featured ? `<span class="pd-badge featured">${txt('featured')}</span>` : ''}
          <span class="pd-badge ${isAvailable ? 'available' : 'unavailable'}">${isAvailable ? txt('available') : txt('unavailable')}</span>
        </div>
        <img src="${product.image}" alt="${name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
        <svg class="placeholder-icon" style="display:none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </div>
      <div class="pd-body">
        <div class="pd-category">${getCategoryLabel(product.category)}</div>
        <h2 class="pd-name">${name}</h2>
        ${desc ? `<p class="pd-desc">${desc}</p>` : ''}
        ${featuresList.length > 0 ? `
          <div class="pd-features">
            <div class="pd-features-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              ${txt('featuresTitle')}
            </div>
            <ul class="pd-features-list">
              ${featuresList.map(f => `<li>${f.trim()}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        <div class="pd-meta">
          <div class="pd-price">
            ${product.price} <span class="currency">${product.currency || 'USD'}</span>
            ${localPrice ? `<span class="local-price">${localPrice}</span>` : ''}
          </div>
          ${duration ? `
            <div class="pd-duration">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${duration}
            </div>
          ` : ''}
        </div>
        <div class="pd-actions">
          <button class="btn btn-primary pd-buy-btn" data-id="${product.id}" ${!isAvailable ? 'disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            ${txt('buyNow')}
          </button>
        </div>
      </div>
    `;

    body.querySelector('.pd-buy-btn')?.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => startBuyFlow(productId), 200);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ===== BUY FLOW =====
  let pendingOrder = null;

  function startBuyFlow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const reqs = langVal(product, 'requirements');
    const reqList = reqs ? reqs.split('\n').filter(r => r.trim()) : [];

    pendingOrder = { productId, customerName: '', customerEmail: '', requirements: {} };

    if (reqList.length > 0) {
      openRequirementsForm(product, reqList);
    } else {
      openPaymentModal(productId);
    }
  }

  function openRequirementsForm(product, reqList) {
    const modal = $('#requirementsModal');
    const body = $('#reqModalBody');
    const name = langVal(product, 'name');

    $('#reqModalTitle').textContent = txt('reqTitle') + ' - ' + name;

    let html = `
      <div class="req-product-info">
        <img src="${product.image}" alt="${name}" onerror="this.style.display='none'">
        <div>
          <div class="req-prod-name">${name}</div>
          <div class="req-prod-price">${product.price} ${product.currency || 'USD'}</div>
        </div>
      </div>
      <form class="req-form" id="reqForm">
        <div class="form-group">
          <label>${txt('reqName')} *</label>
          <input type="text" id="reqCustName" required placeholder="${currentLang === 'ar' ? 'مثال: أحمد محمد' : 'e.g. John Doe'}">
        </div>
        <div class="form-group">
          <label>${txt('reqEmail')} *</label>
          <input type="email" id="reqCustEmail" required placeholder="email@example.com" dir="ltr">
        </div>
    `;

    reqList.forEach((req, i) => {
      const label = req.trim();
      const isPassword = label.match(/كلمة.*مرور|password|pass/i);
      const inputType = isPassword ? 'password' : 'text';
      html += `
        <div class="form-group">
          <label>${label} *</label>
          <input type="${inputType}" class="req-field" data-label="${label}" required placeholder="${label}">
        </div>
      `;
    });

    html += `
        <p class="req-note">${txt('reqNote')}</p>
        <button type="submit" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          ${txt('reqContinue')}
        </button>
      </form>
    `;

    body.innerHTML = html;

    $('#reqForm').addEventListener('submit', (e) => {
      e.preventDefault();
      pendingOrder.customerName = $('#reqCustName').value.trim();
      pendingOrder.customerEmail = $('#reqCustEmail').value.trim();
      const reqData = {};
      body.querySelectorAll('.req-field').forEach(input => {
        reqData[input.dataset.label] = input.value.trim();
      });
      pendingOrder.requirements = reqData;

      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => openPaymentModal(product.id), 200);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ===== PAYMENT MODAL =====
  function getProductUrl(product) {
    return `${window.location.origin}${window.location.pathname}?product=${product.id}`;
  }

  function buildOrderMessage(product, method) {
    const name = langVal(product, 'name');
    const desc = langVal(product, 'description');
    const order = pendingOrder || {};
    const hasReqs = order.customerName || Object.keys(order.requirements || {}).length > 0;

    let lines = [];
    lines.push(`🛒 *${currentLang === 'ar' ? 'طلب جديد' : 'New Order'}*`);
    lines.push(`━━━━━━━━━━━━━━━`);
    lines.push(`📦 *${name}*`);
    if (desc) lines.push(`📝 ${desc}`);
    lines.push(`💰 ${product.price} ${product.currency || 'USD'}`);
    if (product.duration) lines.push(`⏱ ${product.duration}`);
    if (method) lines.push(`💳 ${method}`);

    if (hasReqs) {
      lines.push('');
      lines.push(`━━━━━━━━━━━━━━━`);
      lines.push(`👤 ${order.customerName || ''}`);
      if (order.customerEmail) lines.push(`📧 ${order.customerEmail}`);
      const reqs = order.requirements || {};
      Object.entries(reqs).forEach(([label, value]) => {
        if (value) lines.push(`• ${label}: ${value}`);
      });
    }

    if (typeof ReferralTracker !== 'undefined') {
      const ref = ReferralTracker.getCode?.() || '';
      if (ref) lines.push(`\n🔗 Ref: ${ref}`);
    }

    return lines.join('\n');
  }


  async function saveCustomerOrder(product, method) {
    if (!sb) return;
    const order = pendingOrder || {};
    const name = langVal(product, 'name');
    let refCode = '';
    if (typeof ReferralTracker !== 'undefined') {
      refCode = ReferralTracker.getCode?.() || '';
    }

    try {
      await sb.from('customer_orders').insert({
        product_id: product.id,
        product_name: name,
        amount: product.price,
        currency: product.currency || 'USD',
        customer_name: order.customerName || '',
        customer_email: order.customerEmail || '',
        requirements_data: order.requirements || {},
        referral_code: refCode,
        payment_method: method
      });
    } catch (e) {
      console.error('[Order] save failed:', e);
    }
  }

  function openPaymentModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    currentPaymentProduct = product;

    const modal = $('#paymentModal');
    const body = $('#modalBody');
    const pay = settings.payment || {};
    const name = langVal(product, 'name');
    const pl = product.payment_links || {};

    $('#modalTitle').textContent = txt('choosePay') + ' - ' + name;

    const priceDisplay = `${product.price} ${product.currency || 'USD'}`;
    const localEquiv = formatLocalPrice(product.price, product.currency);
    const usdEquiv = formatUSDEquiv(product.price, product.currency);

    let html = `<div class="modal-price-summary">
      <span class="modal-price-main">${priceDisplay}</span>
      ${localEquiv ? `<span class="modal-price-local">${localEquiv}</span>` : ''}
      ${product.currency !== 'USD' ? `<span class="modal-price-usd">${usdEquiv}</span>` : ''}
    </div>`;

    const social = settings.social || {};
    const emailAddr = social.email;
    const waNum = pay.whatsapp?.number?.replace(/[^0-9]/g, '') || '';

    // Step 1: WhatsApp only
    const waActive = pay.whatsapp?.enabled && pay.whatsapp?.number;
    html += `<p style="text-align:center;color:var(--text-secondary);font-size:0.85rem;margin-bottom:0.5rem;">${currentLang === 'ar' ? 'أرسل طلبك أولاً عبر واتساب' : 'Send your order first via WhatsApp'}</p>`;
    html += `<div class="payment-option ${waActive ? 'pay-clickable' : 'disabled'}" data-method="WhatsApp" data-wa="true">
      <div class="payment-icon whatsapp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></div>
      <div class="payment-info"><h4>${txt('sendVia')}</h4><p>${txt('whatsappDesc')}</p></div>
    </div>`;

    // Step 2: Other payment methods (hidden initially, shown after WhatsApp)
    html += `<div id="otherPayMethods" style="display:none;">
      <div class="proof-divider"></div>
      <p style="text-align:center;color:var(--success);font-weight:600;font-size:0.9rem;margin-bottom:0.8rem;">${currentLang === 'ar' ? '✅ تم إرسال الطلب — اختر طريقة الدفع' : '✅ Order sent — Choose payment method'}</p>`;

    // PayPal
    const paypalActive = pay.paypal?.enabled;
    const paypalLink = pl.paypal || (pay.paypal?.link ? pay.paypal.link + '/' + product.price : '');
    if (paypalActive) {
      html += `<div class="payment-option pay-clickable" data-method="PayPal" ${paypalLink ? `data-href="${paypalLink}"` : ''}>
        <div class="payment-icon paypal"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z"/></svg></div>
        <div class="payment-info"><h4>PayPal</h4><p>${txt('paypalDesc')}</p></div>
      </div>`;
    }

    // Stripe
    const stripeActive = pay.stripe?.enabled;
    if (stripeActive) {
      html += `<div class="payment-option pay-clickable" data-method="Stripe" ${pl.stripe ? `data-href="${pl.stripe}"` : ''}>
        <div class="payment-icon stripe"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>
        <div class="payment-info"><h4>${langVal(pay.stripe || {}, 'label') || 'Stripe'}</h4><p>${txt('stripeDesc')}</p></div>
      </div>`;
    }

    // Email
    const emailActive = pay.email?.enabled && emailAddr;
    if (emailActive) {
      html += `<div class="payment-option pay-clickable" data-method="Email" data-email="true">
        <div class="payment-icon email" style="background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
        <div class="payment-info"><h4>${txt('sendViaEmail')}</h4><p>${emailAddr}</p></div>
      </div>`;
    }

    // Crypto
    const wallets = pay.crypto?.wallets || {};
    const usdtNetworks = [
      { key: 'trc20', label: 'TRC20 (Tron)' },
      { key: 'bep20', label: 'BEP20 (BSC)' },
      { key: 'apt', label: 'Aptos (APT)' },
      { key: 'pol', label: 'Polygon (POL)' },
      { key: 'sol', label: 'Solana (SOL)' }
    ].filter(n => wallets[n.key + '_enabled'] && wallets[n.key + '_addr']);
    const binanceOn = wallets.binance_enabled && wallets.binance_id;
    const hasAnyWallet = usdtNetworks.length > 0 || binanceOn;
    const cryptoActive = pay.crypto?.enabled && hasAnyWallet;
    if (cryptoActive) {
      let cryptoInner = '';
      if (usdtNetworks.length > 0) {
        cryptoInner += `<div class="crypto-usdt-section">
          <label style="font-weight:600;font-size:0.85rem;margin-bottom:0.4rem;display:block;">USDT — ${currentLang === 'ar' ? 'اختر الشبكة:' : 'Choose network:'}</label>
          <div class="usdt-network-tabs">
            ${usdtNetworks.map((n, i) => `<button type="button" class="usdt-net-btn ${i === 0 ? 'active' : ''}" data-net="${n.key}">${n.label}</button>`).join('')}
          </div>
          <div class="usdt-address-display">
            ${usdtNetworks.map((n, i) => `<div class="usdt-addr-item ${i === 0 ? 'active' : ''}" data-net="${n.key}">
              <div class="crypto-copy-row"><input type="text" value="${wallets[n.key + '_addr']}" readonly><button type="button" class="crypto-copy-btn">${txt('copy')}</button></div>
            </div>`).join('')}
          </div>
        </div>`;
      }
      if (binanceOn) {
        cryptoInner += `<div class="crypto-address-item" style="margin-top:0.8rem;"><label>Binance ID (Pay)</label><div class="crypto-copy-row"><input type="text" value="${wallets.binance_id}" readonly><button type="button" class="crypto-copy-btn">${txt('copy')}</button></div></div>`;
      }
      html += `
        <div class="payment-option" data-method="Crypto" style="cursor:default; flex-direction:column; align-items:stretch;">
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem;">
            <div class="payment-icon crypto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
            <div class="payment-info"><h4>${txt('cryptoTitle')}</h4><p>${txt('cryptoInstructions')}</p></div>
          </div>
          <div class="crypto-addresses">${cryptoInner}</div>
        </div>`;
    }

    // Proof of payment section
    html += `<div class="proof-divider"></div>
      <div class="proof-box">
        <h4>${txt('proofTitle')}</h4>
        <p>${txt('proofMsg')}</p>
        ${waNum ? `<button class="proof-wa-btn" id="proofWaBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          ${txt('proofBtn')}
        </button>` : ''}
      </div>
    </div>`;

    body.innerHTML = html;

    function openWhatsApp(msgText) {
      const encoded = encodeURIComponent(msgText);
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const webLink = isMobile
        ? `https://api.whatsapp.com/send?phone=${waNum}&text=${encoded}`
        : `https://web.whatsapp.com/send?phone=${waNum}&text=${encoded}`;
      const appLink = `whatsapp://send?phone=${waNum}&text=${encoded}`;
      const frame = document.createElement('iframe');
      frame.style.display = 'none';
      frame.src = appLink;
      document.body.appendChild(frame);
      setTimeout(() => {
        frame.remove();
        if (!document.hidden) {
          if (isMobile) window.location.href = webLink;
          else window.open(webLink, '_blank');
        }
      }, 1500);
    }

    function revealOtherMethods() {
      const otherSection = document.getElementById('otherPayMethods');
      if (otherSection) {
        otherSection.style.display = 'block';
        otherSection.style.pointerEvents = 'auto';
        otherSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Proof WhatsApp button
    const proofBtn = document.getElementById('proofWaBtn');
    if (proofBtn) {
      proofBtn.addEventListener('click', () => {
        const proofMsg = currentLang === 'ar'
          ? `📸 إثبات دفع للطلب:\n📦 ${name}\n💰 ${product.price} ${product.currency || 'USD'}`
          : `📸 Payment proof for:\n📦 ${name}\n💰 ${product.price} ${product.currency || 'USD'}`;
        openWhatsApp(proofMsg);
      });
    }

    body.querySelectorAll('.pay-clickable').forEach(opt => {
      opt.style.cursor = 'pointer';
      opt.addEventListener('click', async () => {
        const method = opt.dataset.method;

        if (opt.dataset.wa === 'true') {
          saveCustomerOrder(product, 'WhatsApp');
          const msg = buildOrderMessage(product, 'WhatsApp');
          const productLink = getProductUrl(product);
          const fullMsg = msg + '\n\n' + productLink;
          openWhatsApp(fullMsg);
          opt.classList.add('selected');
          showToast(txt('orderSaved'));
          revealOtherMethods();
        } else if (opt.dataset.email === 'true') {
          saveCustomerOrder(product, 'Email');
          const msg = buildOrderMessage(product, 'Email');
          const subject = encodeURIComponent(txt('emailSubject') + ' - ' + name);
          const emailBody = encodeURIComponent(msg);
          window.location.href = `mailto:${emailAddr}?subject=${subject}&body=${emailBody}`;
          opt.classList.add('selected');
        } else if (opt.dataset.href) {
          saveCustomerOrder(product, method);
          window.open(opt.dataset.href, '_blank');
          opt.classList.add('selected');
        }
      });
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePaymentModal() {
    $('#paymentModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  window.copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(txt('copied'));
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      showToast(txt('copied'));
    });
  };

  // ===== PAYMENT SECTION =====
  function renderPaymentSection() {
    const pay = settings.payment || {};
    const grid = $('#paymentGrid');
    if (!grid) return;

    const disabledLabel = currentLang === 'ar' ? 'غير مفعّل' : 'Disabled';
    let html = '';

    const ppOk = pay.paypal?.enabled && pay.paypal?.link;
    html += `<div class="payment-card ${ppOk ? '' : 'disabled'}"><div class="payment-card-icon paypal"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z"/></svg></div><h3>PayPal</h3><p>${txt('paypalDesc')}</p>${ppOk ? '' : `<span class="payment-disabled-label">${disabledLabel}</span>`}</div>`;

    const stOk = pay.stripe?.enabled;
    html += `<div class="payment-card ${stOk ? '' : 'disabled'}"><div class="payment-card-icon stripe"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div><h3>${langVal(pay.stripe || {}, 'label') || 'Stripe'}</h3><p>${txt('stripeDesc')}</p>${stOk ? '' : `<span class="payment-disabled-label">${disabledLabel}</span>`}</div>`;

    const waOk = pay.whatsapp?.enabled && pay.whatsapp?.number;
    html += `<div class="payment-card ${waOk ? '' : 'disabled'}"><div class="payment-card-icon whatsapp"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></div><h3>${langVal(pay.whatsapp || {}, 'label') || 'WhatsApp'}</h3><p>${txt('whatsappDesc')}</p>${waOk ? '' : `<span class="payment-disabled-label">${disabledLabel}</span>`}</div>`;

    const emSocial = settings.social || {};
    const emOk = pay.email?.enabled && emSocial.email;
    html += `<div class="payment-card ${emOk ? '' : 'disabled'}"><div class="payment-card-icon email" style="background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><h3>${txt('sendViaEmail')}</h3><p>${emOk ? emSocial.email : ''}</p>${emOk ? '' : `<span class="payment-disabled-label">${disabledLabel}</span>`}</div>`;

    const crWallets = pay.crypto?.wallets || {};
    const crHasUsdt = ['trc20','bep20','apt','pol','sol'].some(n => crWallets[n+'_enabled'] && crWallets[n+'_addr']);
    const crOk = pay.crypto?.enabled && (crHasUsdt || crWallets.binance_enabled && crWallets.binance_id);
    html += `<div class="payment-card ${crOk ? '' : 'disabled'}"><div class="payment-card-icon crypto"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><h3>${langVal(pay.crypto || {}, 'label') || 'Crypto'}</h3><p>${txt('cryptoDesc')}</p>${crOk ? '' : `<span class="payment-disabled-label">${disabledLabel}</span>`}</div>`;

    grid.innerHTML = html;
  }

  // ===== FOOTER =====
  function renderFooter() {
    const social = settings.social || {};
    const links = $('#footerLinks');
    const copy = $('#footerCopy');
    let html = '';

    if (social.whatsapp) {
      html += `<a href="https://api.whatsapp.com/send?phone=${social.whatsapp}" target="_blank" class="footer-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>${txt('whatsappContact')}</a>`;
    }
    if (social.telegram) {
      html += `<a href="https://t.me/${social.telegram}" target="_blank" class="footer-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>${txt('telegramContact')}</a>`;
    }
    if (social.email) {
      html += `<a href="mailto:${social.email}" class="footer-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${txt('emailContact')}</a>`;
    }

    links.innerHTML = html;
    copy.textContent = `© ${new Date().getFullYear()} Spark. ${txt('copyright')}.`;
  }

  // ===== TOAST =====
  function showToast(msg) {
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // ===== SEARCH =====
  function initSearch() {
    const toggle = $('#searchToggle');
    const wrapper = $('#searchWrapper');
    const input = $('#searchInput');

    toggle.addEventListener('click', () => {
      const visible = wrapper.style.display !== 'none';
      wrapper.style.display = visible ? 'none' : 'block';
      if (!visible) input.focus();
      else { input.value = ''; searchQuery = ''; renderProducts(); }
    });

    input.addEventListener('input', () => { searchQuery = input.value.trim(); renderProducts(); });
  }

  // ===== AMBIENT SPARKLES =====
  function initSparkles() {
    const canvas = document.getElementById('sparklesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;
    const particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#ffdc00','#ff8f00','#ff6a00','#ffab00','#fff5cc','#ffffff'];

    class Sparkle {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : -10;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.6 + 0.2;
        this.fadeIn = true;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.twinkle += this.twinkleSpeed;
        if (this.fadeIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) this.fadeIn = false;
        } else {
          this.opacity -= this.fadeSpeed * 0.5;
        }
        if (this.opacity <= 0 || this.y > H + 10 || this.x < -10 || this.x > W + 10) {
          this.reset(false);
        }
      }
      draw() {
        const flicker = 0.5 + 0.5 * Math.sin(this.twinkle);
        const a = this.opacity * flicker;
        if (a <= 0.01) return;

        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        const s = this.size;
        ctx.moveTo(this.x, this.y - s * 2);
        ctx.quadraticCurveTo(this.x + s * 0.5, this.y - s * 0.5, this.x + s * 2, this.y);
        ctx.quadraticCurveTo(this.x + s * 0.5, this.y + s * 0.5, this.x, this.y + s * 2);
        ctx.quadraticCurveTo(this.x - s * 0.5, this.y + s * 0.5, this.x - s * 2, this.y);
        ctx.quadraticCurveTo(this.x - s * 0.5, this.y - s * 0.5, this.x, this.y - s * 2);
        ctx.fill();

        ctx.globalAlpha = a * 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, s * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    const count = Math.min(40, Math.floor(W * H / 30000));
    for (let i = 0; i < count; i++) particles.push(new Sparkle());

    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();
  }

  // ===== SPARK SPLASH =====
  function initFireSplash() {
    const canvas = document.getElementById('fireCanvas');
    const splash = document.getElementById('splash');
    if (!canvas || !splash) return;

    const ctx = canvas.getContext('2d');
    let W, H, animId;
    const sparks = [];
    const t0 = performance.now();

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();

    function color() {
      const pick = Math.random();
      if (pick > 0.55) return [255, 255, 255];
      if (pick > 0.25) return [180 + Math.random()*75, 210 + Math.random()*45, 255];
      if (pick > 0.1)  return [100 + Math.random()*80, 160 + Math.random()*60, 255];
      return [60, 130, 255];
    }

    function emit(x, y, n, pwr, spread) {
      for (let i = 0; i < n; i++) {
        const a = spread !== undefined
          ? spread + (Math.random() - 0.5) * 1.2
          : Math.random() * Math.PI * 2;
        const spd = Math.random() * pwr + pwr * 0.2;
        const c = color();
        sparks.push({
          x, y, px: x, py: y,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd,
          sz: Math.random() * 2 + 0.6,
          life: 1,
          dec: Math.random() * 0.012 + 0.006,
          r: c[0], g: c[1], b: c[2],
          grav: 0.15 + Math.random() * 0.1,
          fric: 0.975 + Math.random() * 0.015
        });
      }
    }

    function animate(now) {
      const ms = now - t0;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5, 8, 20, 0.25)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      const cx = W / 2, cy = H * 0.43;

      if (ms < 800) {
        emit(cx, cy, 6, 8);
        emit(cx - 4, cy + 2, 3, 6, -Math.PI / 2);
        emit(cx + 4, cy - 2, 3, 6, -Math.PI / 2);
      }

      if (ms > 400 && ms < 900) {
        emit(cx, cy, 10, 12);
      }

      if (ms > 800 && ms < 850) {
        emit(cx, cy, 60, 16);
        emit(cx, cy, 30, 10);
      }

      if (ms > 1100 && ms < 1400) {
        const prog = (ms - 1100) / 300;
        const lx = cx - W * 0.3 + prog * W * 0.6;
        emit(lx, cy, 4, 5, -Math.PI / 2);
      }

      if (ms > 1400 && ms < 1700) {
        emit(cx, cy, 8, 10);
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.px = s.x; s.py = s.y;
        s.vx *= s.fric;
        s.vy *= s.fric;
        s.vy += s.grav;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.dec;
        s.sz *= 0.994;

        if (s.life <= 0 || s.y > H + 30 || s.sz < 0.15) {
          sparks.splice(i, 1);
          continue;
        }

        if (s.y > H - 3 && s.vy > 0) {
          s.vy *= -0.25;
          s.vx *= 0.7;
          s.y = H - 3;
        }

        const al = s.life;

        const dx = s.x - s.px, dy = s.y - s.py;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 1) {
          ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${al * 0.9})`;
          ctx.lineWidth = s.sz;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.px, s.py);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.sz * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${al})`;
        ctx.fill();

        if (al > 0.5) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.sz * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${al * 0.12})`;
          ctx.fill();
        }

        if (al > 0.7 && s.sz > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.sz * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${al * 0.8})`;
          ctx.fill();
        }
      }

      if (ms < 1200) {
        const p = Math.sin(ms * 0.01) * 0.3 + 0.7;
        const gr = 50 * p;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, gr);
        grd.addColorStop(0, `rgba(200, 230, 255, ${0.35 * p})`);
        grd.addColorStop(0.4, `rgba(100, 170, 255, ${0.12 * p})`);
        grd.addColorStop(1, 'rgba(60, 130, 255, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(cx - gr, cy - gr, gr * 2, gr * 2);
      }

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    let splashHidden = false;
    const hideSplash = () => {
      if (splashHidden || !splash.parentNode) return;
      splashHidden = true;
      splash.classList.add('done');
      setTimeout(() => { try { cancelAnimationFrame(animId); } catch(e){} splash.remove(); }, 900);
    };
    setTimeout(hideSplash, 2800);
    setTimeout(hideSplash, 4500);
    splash.addEventListener('click', hideSplash, { once: true });
  }

  // ===== INIT =====
  function forceSplashHide() {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('done');
      setTimeout(() => splash.remove(), 900);
    }
  }

  async function init() {
    initFireSplash();
    initSupabase();
    initTheme();
    visitorCurrency = detectVisitorCurrency();
    try {
      await Promise.all([loadData(), loadExchangeRates(), fetchGitHubLastCommit()]);
    } catch (e) {
      console.warn('Init load warning:', e);
    }
    initLang();
    renderCategories();
    renderProducts();
    renderPaymentSection();
    renderFooter();
    renderRateInfo();
    renderLastUpdated();
    initSearch();
    startRatesAutoRefresh();

    $('#themeToggle').addEventListener('click', toggleTheme);
    $('#langToggle').addEventListener('click', toggleLang);
    $('#modalClose').addEventListener('click', closePaymentModal);
    $('#paymentModal').addEventListener('click', (e) => {
      if (e.target === $('#paymentModal')) { closePaymentModal(); return; }
      const netBtn = e.target.closest('.usdt-net-btn');
      const copyBtn = e.target.closest('.crypto-copy-btn');
      if (netBtn) {
        e.preventDefault();
        const body = $('#modalBody');
        if (!body) return;
        body.querySelectorAll('.usdt-net-btn').forEach(b => b.classList.remove('active'));
        body.querySelectorAll('.usdt-addr-item').forEach(a => a.classList.remove('active'));
        netBtn.classList.add('active');
        const item = body.querySelector(`.usdt-addr-item[data-net="${netBtn.dataset.net}"]`);
        if (item) item.classList.add('active');
        return;
      }
      if (copyBtn) {
        e.preventDefault();
        const input = copyBtn.parentElement?.querySelector('input');
        if (input) {
          navigator.clipboard.writeText(input.value).then(() => {
            showToast(txt('copied'));
          }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = input.value; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
            showToast(txt('copied'));
          });
        }
        if (currentPaymentProduct) saveCustomerOrder(currentPaymentProduct, 'Crypto');
        return;
      }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePaymentModal(); });

    initScrollReveal();
    initHeaderScroll();
    initSparkles();
    handleDeepLink();
  }

  function handleDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('product');
    if (pid) {
      setTimeout(() => {
        const p = products.find(x => x.id === pid);
        if (p) updateOGTags(p);
        openProductDetail(pid);
      }, 600);
    }
  }

  function updateOGTags(product) {
    const name = langVal(product, 'name');
    const desc = langVal(product, 'description');
    const url = getProductUrl(product);
    const setMeta = (id, val) => { const el = document.getElementById(id); if (el) el.setAttribute('content', val); };
    setMeta('ogTitle', `${name} | Spark`);
    setMeta('ogDesc', desc || `${name} - ${product.price} ${product.currency || 'USD'}`);
    setMeta('ogImage', product.image || '');
    setMeta('ogUrl', url);
    document.title = `${name} | Spark`;
  }

  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function initHeaderScroll() {
    const header = $('.header');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function () {
  'use strict';

  let products = [];
  let currentPaymentProduct = null;
  let settings = {};
  let currentLang = localStorage.getItem('lang') || 'en';
  // nameLang controls ONLY product names display — always defaults to English
  let nameLang = localStorage.getItem('nameLang') || 'en';
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
      proofDone: '✅ تم اختيار طريقة الدفع',
      reviewsTitle: 'التقييمات والمراجعات',
      addReviewTitle: 'أضف تقييمك',
      reviewNameLabel: 'الاسم',
      reviewRatingLabel: 'التقييم',
      reviewCommentLabel: 'التعليق (اختياري)',
      btnSubmitReview: 'إرسال التقييم',
      noReviews: 'لا توجد تقييمات حتى الآن. كن الأول!',
      reviewSuccess: 'تم إرسال التقييم بنجاح. قد يحتاج لموافقة الإدارة ليظهر.',
      reviewError: 'حدث خطأ أثناء إرسال التقييم. حاول مرة أخرى.',
      durationTitle: 'اختر مدة الاشتراك',
      durationPrompt: 'اختر المدة المناسبة لك:',
      durationReadAgree: 'قرأت',
      durationDetailsLink: 'تفاصيل الاشتراك',
      durationAgreeEnd: 'وأوافق عليها',
      durationContinue: 'متابعة للدفع',
      chooseNetwork: 'اختر الشبكة:',
      newOrder: 'طلب جديد',
      sendOrderFirst: 'أرسل طلبك أولاً عبر واتساب',
      orderSentChoose: '✅ تم إرسال الطلب — اختر طريقة الدفع',
      reviewsCount: 'تقييم',
      proofPrefix: 'إثبات دفع للطلب:',
      share: 'مشاركة',
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
      proofDone: '✅ Payment method selected',
      reviewsTitle: 'Reviews & Ratings',
      addReviewTitle: 'Add your review',
      reviewNameLabel: 'Name',
      reviewRatingLabel: 'Rating',
      reviewCommentLabel: 'Comment (Optional)',
      btnSubmitReview: 'Submit Review',
      noReviews: 'No reviews yet. Be the first!',
      reviewSuccess: 'Review submitted successfully. It may require admin approval.',
      reviewError: 'An error occurred while submitting. Please try again.',
      durationTitle: 'Choose Duration',
      durationPrompt: 'Choose the duration that suits you:',
      durationReadAgree: 'I have read the',
      durationDetailsLink: 'subscription details',
      durationAgreeEnd: 'and agree',
      durationContinue: 'Continue to Payment',
      chooseNetwork: 'Choose network:',
      newOrder: 'New Order',
      sendOrderFirst: 'Send your order first via WhatsApp',
      orderSentChoose: '✅ Order sent — Choose payment method',
      reviewsCount: 'reviews',
      proofPrefix: 'Payment proof for:',
      share: 'Share',
    }
  };

  function txt(key) { return t[currentLang]?.[key] || t.ar[key] || key; }
  function langVal(obj, field) { return obj[field + '_' + currentLang] || obj[field + '_ar'] || ''; }
  // nameVal: uses nameLang (independent) — always English unless user toggles
  function nameVal(obj) { return obj['name_' + nameLang] || obj['name_en'] || obj['name_ar'] || ''; }

  // Toggle only product/card names EN <-> AR
  window.toggleNameLang = function() {
    nameLang = nameLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('nameLang', nameLang);
    const btn = document.getElementById('nameToggle');
    if (btn) btn.textContent = nameLang === 'en' ? 'AR أسماء' : 'EN Names';
    renderProducts(); // re-render cards only
  };

  // Global handlers for crypto (inline onclick - works when delegation fails)
  window.switchUsdtTab = function(btn) {
    const body = document.getElementById('modalBody');
    if (!body) return;
    body.querySelectorAll('.usdt-net-btn').forEach(b => b.classList.remove('active'));
    body.querySelectorAll('.usdt-addr-item').forEach(a => a.classList.remove('active'));
    btn.classList.add('active');
    const item = body.querySelector('.usdt-addr-item[data-net="' + (btn.getAttribute('data-net') || '') + '"]');
    if (item) item.classList.add('active');
  };
  window.handleCryptoCopy = function(btn) {
    const row = btn.closest('.crypto-copy-row');
    const input = row && row.querySelector('input');
    if (input) {
      navigator.clipboard.writeText(input.value).then(() => showToast(txt('copied'))).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = input.value; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        showToast(txt('copied'));
      });
    }
    if (currentPaymentProduct) saveCustomerOrder(currentPaymentProduct, 'Crypto');
  };

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
    
    // Reviews Translation
    const reviewsTitle = $('#reviewsTitle');
    if(reviewsTitle) reviewsTitle.textContent = txt('reviewsTitle');
    const addReviewTitle = $('#addReviewTitle');
    if(addReviewTitle) addReviewTitle.textContent = txt('addReviewTitle');
    const reviewNameLabel = $('#reviewNameLabel');
    if(reviewNameLabel) reviewNameLabel.textContent = txt('reviewNameLabel');
    const reviewRatingLabel = $('#reviewRatingLabel');
    if(reviewRatingLabel) reviewRatingLabel.textContent = txt('reviewRatingLabel');
    const reviewCommentLabel = $('#reviewCommentLabel');
    if(reviewCommentLabel) reviewCommentLabel.textContent = txt('reviewCommentLabel');
    const btnSubmitReview = $('#btnSubmitReview');
    if(btnSubmitReview) btnSubmitReview.textContent = txt('btnSubmitReview');

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
        
        // Fetch average ratings and counts for products concurrently
        const ratingPromises = products.map(async (p) => {
          try {
            const { data, error } = await sb.rpc('get_product_rating', { pid: p.id });
            const { data: countData } = await sb.rpc('get_product_review_count', { pid: p.id });
            p.avg_rating = !error && data !== null ? parseFloat(data) : 0;
            p.review_count = countData || 0;
          } catch (err) {
            p.avg_rating = 0;
            p.review_count = 0;
          }
        });
        await Promise.all(ratingPromises);

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

  function getProductMinPrice(p) {
    if (p.subscription_plans && p.subscription_plans.length > 0) {
      const prices = p.subscription_plans.map(plan => plan.price).filter(p => p > 0);
      if (prices.length > 0) return Math.min(...prices);
    }
    return p.price || 0;
  }

  // ===== AUDIO EFFECTS =====
  let sparkAudioCtx;
  const initAudioCtx = () => {
    if (!sparkAudioCtx) {
      try { sparkAudioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    if (sparkAudioCtx && sparkAudioCtx.state === 'suspended') {
      try { sparkAudioCtx.resume(); } catch(e) {}
    }
  };

  window.playHoverSound = function() {
    try {
      initAudioCtx();
      if (!sparkAudioCtx) return;
      const osc = sparkAudioCtx.createOscillator();
      const gain = sparkAudioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, sparkAudioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, sparkAudioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0, sparkAudioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, sparkAudioCtx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, sparkAudioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(sparkAudioCtx.destination);
      osc.start();
      osc.stop(sparkAudioCtx.currentTime + 0.05);
    } catch(e) {}
  };

  window.playClickSound = function() {
    try {
      initAudioCtx();
      if (!sparkAudioCtx) return;
      const osc1 = sparkAudioCtx.createOscillator();
      const osc2 = sparkAudioCtx.createOscillator();
      const gain = sparkAudioCtx.createGain();
      
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(600, sparkAudioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1200, sparkAudioCtx.currentTime + 0.08);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(900, sparkAudioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1800, sparkAudioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0, sparkAudioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, sparkAudioCtx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, sparkAudioCtx.currentTime + 0.15);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(sparkAudioCtx.destination);
      
      osc1.start(); osc2.start();
      osc1.stop(sparkAudioCtx.currentTime + 0.15);
      osc2.stop(sparkAudioCtx.currentTime + 0.15);
    } catch(e) {}
  };

  // ===== PRODUCTS =====
  function getFilteredProducts() {
    return products.filter(p => {
      const matchCat = currentCategory === 'all' || p.category === currentCategory;
      if (!matchCat) return false;
      if (p.is_active === false) return false;
      
      const minPrice = getProductMinPrice(p);

      // Stop Ad Logic: Hide if Selling Price > Official Price
      // If product has an official price, and the lowest price we offer is higher, hide it.
      if (p.official_price && minPrice > p.official_price) return false;

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
      const name = nameVal(p); // always use nameLang for product names
      const desc = langVal(p, 'description');
      const duration = langVal(p, 'duration');
      const isAvailable = p.available !== false;
      const displayPrice = getProductMinPrice(p);

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
            <div class="product-rating">
              ${renderStars(p.avg_rating)} 
              <span class="review-count">(${p.review_count || 0})</span>
            </div>
            <div class="product-meta">
              <div class="product-price-box">
                <span class="product-price">${displayPrice} <span class="currency">${p.currency || 'USD'}</span>${formatLocalPrice(displayPrice, p.currency) ? `<span class="local-price">${formatLocalPrice(displayPrice, p.currency)}</span>` : ''}</span>
              </div>
              <span class="product-duration">${duration}</span>
            </div>
            <div class="product-actions" style="display:flex; gap:8px;">
              <button class="btn btn-primary buy-btn" data-id="${p.id}" ${!isAvailable ? 'disabled' : ''} style="flex:1;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                ${txt('buyNow')}
              </button>
              <button class="btn card-share-btn" data-id="${p.id}" title="${txt('share')}" aria-label="${txt('share')}" style="display:flex; align-items:center; justify-content:center; padding:0 0.8rem; border:1px solid var(--border); border-radius:12px; background:var(--bg-card); color:var(--text); cursor:pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
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

    grid.querySelectorAll('.card-share-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        shareProductBtnClick(btn, btn.dataset.id);
      });
    });

    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (window.playHoverSound) window.playHoverSound();
      });
      card.addEventListener('click', () => {
        if (window.playClickSound) window.playClickSound();
        openProductDetail(card.dataset.id);
      });
    });
  }

  // ===== PRODUCT DETAIL MODAL =====
  function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = $('#productDetailModal');
    const body = $('#productDetailBody');
    const name = nameVal(product); // always use nameLang for product names
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
        
        <div class="pd-rating" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem;">
          ${renderStars(product.avg_rating)}
          <span class="review-count" style="font-size:0.85rem; color:var(--text-secondary)">(${product.review_count || 0} ${txt('reviewsCount')})</span>
        </div>

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
          <div class="pd-price-box" style="display:flex; flex-direction:column; gap:4px;">
            <div class="pd-price" style="font-size:1.8rem; font-weight:800; color:var(--primary); line-height:1;">
              ${getProductMinPrice(product)} <span class="currency" style="font-size:1rem; opacity:0.8;">${product.currency || 'USD'}</span>
            </div>
            ${formatLocalPrice(getProductMinPrice(product), product.currency) ? `<div class="pd-local-price" style="font-size:0.9rem; color:var(--text-muted); opacity:0.8;">${formatLocalPrice(getProductMinPrice(product), product.currency)}</div>` : ''}
          </div>
          ${duration ? `
            <div class="pd-duration">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${duration}
            </div>
          ` : ''}
        </div>
        <div class="pd-actions" style="display:flex; gap:10px;">
          <button class="btn btn-primary pd-buy-btn" data-id="${product.id}" ${!isAvailable ? 'disabled' : ''} style="flex:1;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            ${txt('buyNow')}
          </button>
          <button class="btn pd-share-btn" data-id="${product.id}" style="display:flex; align-items:center; justify-content:center; gap:5px; padding:0.5rem 1rem; border:1px solid var(--border); border-radius:12px; background:var(--bg-card); color:var(--text); cursor:pointer;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            ${txt('share')}
          </button>
        </div>
      </div>
    `;

    body.querySelector('.pd-buy-btn')?.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => startBuyFlow(productId), 200);
    });

    body.querySelector('.pd-share-btn')?.addEventListener('click', (e) => {
      shareProductBtnClick(e.currentTarget, productId);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load Reviews
    loadProductReviews(productId);
    
    // Handle Review Submit
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
      reviewForm.onsubmit = async (e) => {
        e.preventDefault();
        const rName = document.getElementById('reviewName').value.trim();
        const rComment = document.getElementById('reviewComment').value.trim();
        const rRating = document.querySelector('input[name="rating"]:checked').value;
        const submitBtn = document.getElementById('btnSubmitReview');

        if (!rName || !rRating) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner" style="display:inline-block; width:16px; height:16px; border:2px solid; border-radius:50%; border-right-color:transparent; animation:spin 1s linear infinite;"></span>';

        try {
          const { error } = await sb.from('reviews').insert({
            product_id: productId,
            author_name: rName,
            rating: parseInt(rRating),
            comment: rComment,
            is_approved: true // Typically handled by trigger or defaults, assumed true for now
          });

          if (error) throw error;
          
          showToast(txt('reviewSuccess'));
          reviewForm.reset();
          loadProductReviews(productId); // Reload reviews
        } catch (err) {
          console.error("Review submit error", err);
          showToast(txt('reviewError'));
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = txt('btnSubmitReview');
        }
      };
    }
  }

  async function generateShareImage(product) {
    return new Promise((resolve, reject) => {
      if (!product.image) return reject(new Error('No image'));
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = 1080;
        const height = (img.height / img.width) * width;
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
        gradient.addColorStop(0.4, 'rgba(0, 0, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        const name = nameVal(product);
        let desc = langVal(product, 'description') || '';
        if (desc.length > 100) desc = desc.substring(0, 97) + '...';
        
        const priceVal = getProductMinPrice(product);
        const priceStr = `${priceVal} ${product.currency || 'USD'}`;
        const local = formatLocalPrice(priceVal, product.currency);
        const localStr = local ? ` (${local})` : '';
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 75px "Tajawal", "Cairo", system-ui, sans-serif';
        ctx.fillText(name, width / 2, 80);
        
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '45px "Tajawal", "Cairo", system-ui, sans-serif';
        
        const maxWidth = width - 100;
        const words = desc.split(' ');
        let line = '';
        let y = 190;
        for(let n = 0; n < words.length; n++) {
          let testLine = line + words[n] + ' ';
          let metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, width / 2, y);
            line = words[n] + ' ';
            y += 65;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, width / 2, y);
        
        ctx.font = 'bold 65px "Tajawal", "Cairo", system-ui, sans-serif';
        const priceText = `${priceStr}${localStr}`;
        const priceWidth = ctx.measureText(priceText).width;
        
        ctx.fillStyle = 'rgba(99, 102, 241, 0.95)';
        const boxY = y + 100;
        const boxPadX = 50;
        const boxPadY = 25;
        ctx.beginPath();
        // Fallback for roundRect if not perfectly supported
        if(ctx.roundRect) {
            ctx.roundRect((width / 2) - (priceWidth / 2) - boxPadX, boxY, priceWidth + (boxPadX * 2), 65 + (boxPadY * 2), 25);
        } else {
            ctx.rect((width / 2) - (priceWidth / 2) - boxPadX, boxY, priceWidth + (boxPadX * 2), 65 + (boxPadY * 2));
        }
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText(priceText, width / 2, boxY + boxPadY);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        if(ctx.roundRect) ctx.roundRect(width - 240, height - 100, 220, 80, 15);
        else ctx.rect(width - 240, height - 100, 220, 80);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 35px system-ui';
        ctx.fillText('Spark', width - 130, height - 80);
        
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Canvas toBlob failed'));
          const file = new File([blob], `spark_${product.id}.png`, { type: blob.type });
          resolve({ file, urltext: `اطلبه الآن من متجر Spark:\n${window.location.origin}${window.location.pathname}?product=${product.id}` });
        }, 'image/png');
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = product.image;
    });
  }

  async function shareProductBtnClick(btn, productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const prevHtml = btn.innerHTML;
    btn.innerHTML = '<span class="spinner" style="display:inline-block;width:14px;height:14px;border:2px solid;border-radius:50%;border-right-color:transparent;animation:spin 1s linear infinite;"></span>';
    btn.style.pointerEvents = 'none';

    try {
      const { file, urltext } = await generateShareImage(product);
      const shareData = {
        title: nameVal(product),
        text: urltext,
        files: [file]
      };
      
      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share(shareData);
      } else {
        downloadFile(file, file.name);
        copyToClipboard(urltext);
        showToast((txt('copied') || 'تم النسخ') + ' - جاري تحميل الصورة');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        const url = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
        copyToClipboard(url);
        showToast(txt('copied'));
      }
    } finally {
      btn.innerHTML = prevHtml;
      btn.style.pointerEvents = 'auto';
    }
  }

  function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  }

  // ===== REVIEWS HELPER =====
  function renderStars(rating) {
    const full = Math.floor(rating || 0);
    const half = (rating || 0) - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    
    const fullStar = '<svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    const halfStar = '<svg width="14" height="14" viewBox="0 0 24 24" fill="url(#halfGrad)" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="halfGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="50%" stop-color="#f59e0b"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    const emptyStar = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';

    return `<div class="stars-container" style="display:flex; gap:2px; color:#f59e0b;" title="${rating || 0} / 5">` + 
      fullStar.repeat(full) + 
      (half ? halfStar : '') + 
      emptyStar.repeat(empty) + 
      `</div>`;
  }

  async function loadProductReviews(productId) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList || typeof sb === 'undefined') return;
    
    reviewsList.innerHTML = `<div style="text-align:center; padding:1rem;"><span class="spinner" style="display:inline-block; width:24px; height:24px; border:3px solid var(--primary); border-radius:50%; border-right-color:transparent; animation:spin 1s linear infinite;"></span></div>`;
    
    try {
      const { data, error } = await sb
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        reviewsList.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:1rem 0;">${txt('noReviews')}</p>`;
        return;
      }
      
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const opts = { year: 'numeric', month: 'short', day: 'numeric', timeZone: tz };
      
      reviewsList.innerHTML = data.map(r => `
        <div class="review-item" style="padding:1rem 0; border-bottom:1px solid var(--border);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
            <div>
              <strong style="display:block; font-size:0.95rem;">${r.author_name}</strong>
              ${renderStars(r.rating)}
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted);">${new Date(r.created_at).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', opts)}</span>
          </div>
          ${r.comment ? `<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem; line-height:1.5;">${r.comment}</p>` : ''}
        </div>
      `).join('');
      
    } catch (err) {
      console.warn("Failed to load reviews:", err);
      reviewsList.innerHTML = `<p style="text-align:center; color:#ef4444; padding:1rem 0;">Failed to load reviews.</p>`;
    }
  }

  // ===== BUY FLOW =====
  let pendingOrder = null;

  function startBuyFlow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const reqs = langVal(product, 'requirements');
    const reqList = reqs ? reqs.split('\n').filter(r => r.trim()) : [];

    pendingOrder = { productId, customerName: '', customerEmail: '', requirements: {}, selectedPlan: null };

    if (reqList.length > 0) {
      openRequirementsForm(product, reqList);
    } else {
      const plans = product.subscription_plans || [];
      if (plans.length > 0) {
        openDurationModal(product);
      } else {
        openPaymentModal(productId);
      }
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

      const plans = product.subscription_plans || [];
      if (plans.length > 0) {
        setTimeout(() => openDurationModal(product), 200);
      } else {
        setTimeout(() => openPaymentModal(product.id), 200);
      }
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ===== DURATION SELECTION MODAL =====
  function openDurationModal(product) {
    const modal = document.getElementById('durationModal');
    const body = document.getElementById('durationModalBody');
    const titleEl = document.getElementById('durationModalTitle');
    const closeBtn = document.getElementById('durationModalClose');
    const plans = product.subscription_plans || [];
    const name = langVal(product, 'name');

    titleEl.textContent = txt('durationTitle') + ' — ' + name;
    closeBtn.onclick = () => { modal.classList.remove('active'); document.body.style.overflow = ''; };

    let selectedPlanIndex = -1;

    body.innerHTML = `
      <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:1rem;">${txt('durationPrompt')}</p>
      <div id="plansList" style="display:flex;flex-direction:column;gap:0.65rem;margin-bottom:1.2rem;">
        ${plans.filter(plan => !(plan.official_price && plan.price > plan.official_price)).map((plan, i) => {
          const label = currentLang === 'ar' ? (plan.label_ar || plan.label_en) : (plan.label_en || plan.label_ar);
          return `
            <div class="plan-option" data-index="${i}" style="border:2px solid var(--border);border-radius:12px;padding:0.9rem 1rem;cursor:pointer;transition:border-color 0.18s,background 0.18s;display:flex;justify-content:space-between;align-items:center;">
              <div style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:700;font-size:0.97rem;">${label}</span>
              </div>
              <span style="font-size:1.1rem;font-weight:800;color:var(--primary);">${plan.price} ${product.currency || 'USD'}</span>
            </div>
          `;
        }).join('')}
      </div>
      <div style="background:var(--bg-secondary);border-radius:10px;padding:0.9rem 1rem;margin-bottom:1.2rem;border-right:3px solid var(--primary);">
        <label style="display:flex;align-items:center;gap:0.7rem;cursor:pointer;">
          <input type="checkbox" id="readDetailsCheck" style="width:18px;height:18px;cursor:pointer;flex-shrink:0;">
          <span style="font-size:0.9rem;font-weight:600;line-height:1.4;">${txt('durationReadAgree')} <a id="detailsLink" href="#" style="color:var(--primary);text-decoration:underline;">${txt('durationDetailsLink')}</a> ${txt('durationAgreeEnd')}</span>
        </label>
      </div>
      <button id="durationContinueBtn" class="btn btn-primary" style="width:100%;opacity:0.45;cursor:not-allowed;" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        ${txt('durationContinue')}
      </button>
    `;

    const continueBtn = body.querySelector('#durationContinueBtn');
    const checkbox = body.querySelector('#readDetailsCheck');

    // "تفاصيل الاشتراك" link opens product detail modal
    const detailsLink = body.querySelector('#detailsLink');
    if (detailsLink) {
      detailsLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => openProductDetail(product.id), 200);
      });
    }

    function updateBtn() {
      const ok = selectedPlanIndex >= 0 && checkbox.checked;
      continueBtn.disabled = !ok;
      continueBtn.style.opacity = ok ? '1' : '0.45';
      continueBtn.style.cursor = ok ? 'pointer' : 'not-allowed';
    }

    body.querySelectorAll('.plan-option').forEach(opt => {
      opt.addEventListener('click', () => {
        body.querySelectorAll('.plan-option').forEach(o => {
          o.style.borderColor = 'var(--border)';
          o.style.background = '';
        });
        opt.style.borderColor = 'var(--primary)';
        opt.style.background = 'color-mix(in srgb, var(--primary) 8%, transparent)';
        selectedPlanIndex = parseInt(opt.dataset.index);
        updateBtn();
      });
    });

    checkbox.addEventListener('change', updateBtn);

    continueBtn.addEventListener('click', () => {
      if (selectedPlanIndex < 0 || !checkbox.checked) return;
      pendingOrder.selectedPlan = plans[selectedPlanIndex];
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

    // Use selected plan if available
    const plan = order.selectedPlan;
    const displayPrice = plan ? `${plan.price} ${product.currency || 'USD'}` : `${product.price} ${product.currency || 'USD'}`;
    const displayDuration = plan
      ? (currentLang === 'ar' ? (plan.label_ar || plan.label_en) : (plan.label_en || plan.label_ar))
      : langVal(product, 'duration');

    let lines = [];
    lines.push(`🛍️ *${txt('newOrder')}*`);
    lines.push(`━━━━━━━━━━━━━━━`);
    lines.push(`📦 *${name}*`);
    if (desc) lines.push(`📝 ${desc}`);
    lines.push(`💰 ${displayPrice}`);
    if (displayDuration) lines.push(`⏱ ${displayDuration}`);
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

    const priceDisplay = pendingOrder?.selectedPlan
      ? `${pendingOrder.selectedPlan.price} ${product.currency || 'USD'}`
      : `${product.price} ${product.currency || 'USD'}`;
    const localEquiv = pendingOrder?.selectedPlan
      ? formatLocalPrice(pendingOrder.selectedPlan.price, product.currency)
      : formatLocalPrice(product.price, product.currency);
    const usdEquiv = pendingOrder?.selectedPlan
      ? formatUSDEquiv(pendingOrder.selectedPlan.price, product.currency)
      : formatUSDEquiv(product.price, product.currency);
    const effectivePrice = pendingOrder?.selectedPlan ? pendingOrder.selectedPlan.price : product.price;

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
    html += `<p style="text-align:center;color:var(--text-secondary);font-size:0.85rem;margin-bottom:0.5rem;">${txt('sendOrderFirst')}</p>`;
    html += `<div class="payment-option ${waActive ? 'pay-clickable' : 'disabled'}" data-method="WhatsApp" data-wa="true">
      <div class="payment-icon whatsapp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></div>
      <div class="payment-info"><h4>${txt('sendVia')}</h4><p>${txt('whatsappDesc')}</p></div>
    </div>`;

    // Step 2: Other payment methods (hidden initially, shown after WhatsApp)
    html += `<div id="otherPayMethods" style="display:none;">
      <div class="proof-divider"></div>
      <p style="text-align:center;color:var(--success);font-weight:600;font-size:0.9rem;margin-bottom:0.8rem;">${txt('orderSentChoose')}</p>`;

    // PayPal
    const paypalActive = pay.paypal?.enabled;
    const paypalLink = pl.paypal || (pay.paypal?.link ? pay.paypal.link + '/' + effectivePrice : '');
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
          <label style="font-weight:600;font-size:0.85rem;margin-bottom:0.4rem;display:block;">USDT — ${txt('chooseNetwork')}</label>
          <div class="usdt-network-tabs">
            ${usdtNetworks.map((n, i) => `<button type="button" class="usdt-net-btn ${i === 0 ? 'active' : ''}" data-net="${n.key}" onclick="window.switchUsdtTab(this)">${n.label}</button>`).join('')}
          </div>
          <div class="usdt-address-display">
            ${usdtNetworks.map((n, i) => `<div class="usdt-addr-item ${i === 0 ? 'active' : ''}" data-net="${n.key}">
              <div class="crypto-copy-row"><input type="text" value="${wallets[n.key + '_addr']}" readonly><button type="button" class="crypto-copy-btn" onclick="window.handleCryptoCopy(this)">${txt('copy')}</button></div>
            </div>`).join('')}
          </div>
        </div>`;
      }
      if (binanceOn) {
        cryptoInner += `<div class="crypto-address-item" style="margin-top:0.8rem;"><label>Binance ID (Pay)</label><div class="crypto-copy-row"><input type="text" value="${wallets.binance_id}" readonly><button type="button" class="crypto-copy-btn" onclick="window.handleCryptoCopy(this)">${txt('copy')}</button></div></div>`;
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
        const proofMsg = `📸 ${txt('proofPrefix')}\n📦 ${name}\n💰 ${product.price} ${product.currency || 'USD'}`;
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
    const splash = document.getElementById('splash');
    const splashVideo = document.getElementById('splashVideo');
    if (!splash) return;

    let splashHidden = false;
    const hideSplash = () => {
      if (splashHidden || !splash.parentNode) return;
      splashHidden = true;
      splash.classList.add('done');
      setTimeout(() => { 
        splash.remove(); 
        document.body.style.overflow = 'auto';
      }, 900);
    };
    
    // Video splash - stop after 3 seconds
    if (splashVideo) {
      setTimeout(() => {
        if (splashVideo) splashVideo.pause();
        hideSplash();
      }, 6500);
    } else {
      setTimeout(hideSplash, 6500);
    }
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
      if (e.target === $('#paymentModal')) closePaymentModal();
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

// Video unmute logic and Auto-play Permission
document.addEventListener('DOMContentLoaded', () => {
  const splashVideo = document.getElementById('splashVideo');
  const unmuteBtn = document.getElementById('unmuteBtn');
  
  if (splashVideo) {
    let audioEnabled = false;
    const pref = localStorage.getItem('spark_audio_permission');

    const enableAudio = () => {
      if (audioEnabled || splashVideo.muted === false) return;
      audioEnabled = true;
      splashVideo.muted = false;
      splashVideo.volume = 0.7;
      if (unmuteBtn) unmuteBtn.style.display = 'none';
      console.log('Audio manually enabled by user action');
    };

    if (pref === 'granted') {
      splashVideo.muted = false;
      splashVideo.volume = 0.7;
      if (unmuteBtn) unmuteBtn.style.display = 'none';
      
      const playPromise = splashVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioEnabled = true; 
        }).catch(() => {
          splashVideo.muted = true;
          if (unmuteBtn) unmuteBtn.style.display = 'flex';
          splashVideo.play().catch(e => console.warn("Video blocked entirely", e));
        });
      }
    } else if (!pref) {
      const modalHtml = `
        <div id="audioPermModal" style="position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(5px); transition:opacity 0.3s;">
          <div style="background:var(--bg-card,#ffffff);border-radius:20px;padding:25px;text-align:center;max-width:350px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div style="font-size:3rem;margin-bottom:15px;">🔊</div>
            <h3 style="margin:0 0 10px;font-size:1.3rem;color:var(--text,#1e293b);">السماح بتشغيل الصوت؟</h3>
            <p style="margin:0 0 20px;font-size:0.95rem;color:var(--text-secondary,#64748b);">للحصول على أفضل تجربة، هل تود تفعيل تشغيل الصوتيات تلقائياً؟</p>
            <div style="display:flex;gap:10px;justify-content:center;">
              <button id="btnAllowAudio" style="flex:1;background:var(--primary,#6366f1);color:#fff;border:none;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;">نعم، تفعيل</button>
              <button id="btnDenyAudio" style="flex:1;background:transparent;color:var(--text-secondary,#64748b);border:1px solid var(--border,#cbd5e1);padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;">بدون صوت</button>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      const audioModal = document.getElementById('audioPermModal');
      
      document.getElementById('btnAllowAudio').addEventListener('click', () => {
        localStorage.setItem('spark_audio_permission', 'granted');
        enableAudio();
        audioModal.style.opacity = '0';
        setTimeout(() => audioModal.remove(), 300);
      });
      
      document.getElementById('btnDenyAudio').addEventListener('click', () => {
        localStorage.setItem('spark_audio_permission', 'denied');
        audioModal.style.opacity = '0';
        setTimeout(() => audioModal.remove(), 300);
      });
    }

    if (unmuteBtn) {
      unmuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.setItem('spark_audio_permission', 'granted');
        enableAudio();
      });
    }
  }
});

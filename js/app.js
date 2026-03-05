(function () {
  'use strict';

  let products = [];
  let settings = {};
  let currentLang = localStorage.getItem('lang') || 'ar';
  let currentCategory = 'all';
  let searchQuery = '';

  let visitorCurrency = 'USD';
  let exchangeRates = {};
  let ratesLoaded = false;

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

  async function loadExchangeRates() {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) return;
      const data = await res.json();
      if (data.rates) { exchangeRates = data.rates; ratesLoaded = true; }
    } catch (e) { console.warn('Could not load exchange rates:', e); }
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
      cryptoDesc: 'ادفع بالعملات الرقمية USDT أو BTC',
      featured: 'مميز', unavailable: 'غير متوفر حالياً',
      copied: 'تم النسخ!', copy: 'نسخ',
      sendVia: 'إرسال عبر واتساب', cryptoTitle: 'الدفع بالعملات الرقمية',
      cryptoInstructions: 'حوّل المبلغ لأحد العناوين التالية ثم أرسل إيصال الدفع عبر واتساب',
      copyright: 'جميع الحقوق محفوظة',
      whatsappContact: 'واتساب', telegramContact: 'تيليجرام', emailContact: 'البريد الإلكتروني'
    },
    en: {
      buyNow: 'Buy Now', choosePay: 'Choose Payment Method',
      noResults: 'No results found', searchPlaceholder: 'Search for a subscription...',
      paymentTitle: 'Available Payment Methods', paymentSubtitle: 'Choose the most convenient way to pay securely',
      paypalDesc: 'Pay easily through your PayPal account',
      stripeDesc: 'Pay securely with credit or debit card',
      whatsappDesc: 'Contact us on WhatsApp to complete payment',
      cryptoDesc: 'Pay with USDT or BTC cryptocurrency',
      featured: 'Featured', unavailable: 'Currently Unavailable',
      copied: 'Copied!', copy: 'Copy',
      sendVia: 'Send via WhatsApp', cryptoTitle: 'Pay with Crypto',
      cryptoInstructions: 'Transfer the amount to one of the addresses below, then send the receipt via WhatsApp',
      copyright: 'All rights reserved',
      whatsappContact: 'WhatsApp', telegramContact: 'Telegram', emailContact: 'Email'
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

    $('#storeName').textContent = langVal(settings.store || {}, 'name') || (currentLang === 'ar' ? 'متجر الاشتراكات الرقمية' : 'Digital Subscriptions Store');
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
        const [prodRes, catRes, storeRes, payRes, socialRes] = await Promise.all([
          sb.from('products').select('*').order('sort_order'),
          sb.from('categories').select('*').order('sort_order'),
          sb.from('site_settings').select('value').eq('key', 'store').maybeSingle(),
          sb.from('site_settings').select('value').eq('key', 'payment').maybeSingle(),
          sb.from('site_settings').select('value').eq('key', 'social').maybeSingle()
        ]);

        products = prodRes.data || [];
        const cats = catRes.data || [];
        settings = {
          store: storeRes.data?.value || {},
          payment: payRes.data?.value || {},
          social: socialRes.data?.value || {},
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
      btn.addEventListener('click', () => openPaymentModal(btn.dataset.id));
    });
  }

  // ===== PAYMENT MODAL =====
  function openPaymentModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

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

    // PayPal
    const paypalActive = pay.paypal?.enabled && (pl.paypal || pay.paypal?.link);
    const paypalLink = pl.paypal || (pay.paypal?.link + '/' + product.price);
    const tag1 = paypalActive ? 'a' : 'div';
    html += `<${tag1} ${paypalActive ? `href="${paypalLink}" target="_blank"` : ''} class="payment-option ${paypalActive ? '' : 'disabled'}">
      <div class="payment-icon paypal"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z"/></svg></div>
      <div class="payment-info"><h4>PayPal</h4><p>${txt('paypalDesc')}</p></div>
    </${tag1}>`;

    // Stripe
    const stripeActive = pay.stripe?.enabled && pl.stripe;
    const tag2 = stripeActive ? 'a' : 'div';
    html += `<${tag2} ${stripeActive ? `href="${pl.stripe}" target="_blank"` : ''} class="payment-option ${stripeActive ? '' : 'disabled'}">
      <div class="payment-icon stripe"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>
      <div class="payment-info"><h4>${langVal(pay.stripe || {}, 'label') || 'Stripe'}</h4><p>${txt('stripeDesc')}</p></div>
    </${tag2}>`;

    // WhatsApp (with referral code)
    const waActive = pay.whatsapp?.enabled && pay.whatsapp?.number;
    let waMsg = pl.whatsapp_message || name + ' - $' + product.price;
    if (typeof ReferralTracker !== 'undefined') {
      waMsg = ReferralTracker.appendToMessage(waMsg);
    }
    const waLink = `https://wa.me/${pay.whatsapp?.number}?text=${encodeURIComponent(waMsg)}`;
    const tag3 = waActive ? 'a' : 'div';
    html += `<${tag3} ${waActive ? `href="${waLink}" target="_blank"` : ''} class="payment-option ${waActive ? '' : 'disabled'}">
      <div class="payment-icon whatsapp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></div>
      <div class="payment-info"><h4>${txt('sendVia')}</h4><p>${txt('whatsappDesc')}</p></div>
    </${tag3}>`;

    // Crypto
    const wallets = pay.crypto?.wallets || {};
    const hasAnyWallet = wallets.usdt_trc20 || wallets.btc || wallets.binance_id;
    const cryptoActive = pay.crypto?.enabled && hasAnyWallet;
    html += `
      <div class="payment-option ${cryptoActive ? '' : 'disabled'}" style="cursor:default; flex-direction:column; align-items:stretch;">
        <div style="display:flex;align-items:center;gap:1rem;${cryptoActive ? 'margin-bottom:0.75rem;' : ''}">
          <div class="payment-icon crypto"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
          <div class="payment-info"><h4>${txt('cryptoTitle')}</h4><p>${txt(cryptoActive ? 'cryptoInstructions' : 'cryptoDesc')}</p></div>
        </div>
        ${cryptoActive ? `<div class="crypto-addresses">
          ${wallets.usdt_trc20 ? `<div class="crypto-address-item"><label>USDT (TRC20)</label><div class="crypto-copy-row"><input type="text" value="${wallets.usdt_trc20}" readonly><button onclick="copyToClipboard('${wallets.usdt_trc20}')">${txt('copy')}</button></div></div>` : ''}
          ${wallets.btc ? `<div class="crypto-address-item"><label>BTC</label><div class="crypto-copy-row"><input type="text" value="${wallets.btc}" readonly><button onclick="copyToClipboard('${wallets.btc}')">${txt('copy')}</button></div></div>` : ''}
          ${wallets.binance_id ? `<div class="crypto-address-item"><label>Binance ID (Pay)</label><div class="crypto-copy-row"><input type="text" value="${wallets.binance_id}" readonly><button onclick="copyToClipboard('${wallets.binance_id}')">${txt('copy')}</button></div></div>` : ''}
        </div>` : ''}
      </div>
    `;

    body.innerHTML = html;
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

    const crWallets = pay.crypto?.wallets || {};
    const crOk = pay.crypto?.enabled && (crWallets.usdt_trc20 || crWallets.btc || crWallets.binance_id);
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
      html += `<a href="https://wa.me/${social.whatsapp}" target="_blank" class="footer-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>${txt('whatsappContact')}</a>`;
    }
    if (social.telegram) {
      html += `<a href="https://t.me/${social.telegram}" target="_blank" class="footer-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>${txt('telegramContact')}</a>`;
    }
    if (social.email) {
      html += `<a href="mailto:${social.email}" class="footer-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${txt('emailContact')}</a>`;
    }

    links.innerHTML = html;
    const storeName = langVal(settings.store || {}, 'name') || (currentLang === 'ar' ? 'متجر الاشتراكات الرقمية' : 'Digital Subscriptions Store');
    copy.textContent = `© ${new Date().getFullYear()} ${storeName}. ${txt('copyright')}.`;
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

  // ===== FIRE SPLASH =====
  function initFireSplash() {
    const canvas = document.getElementById('fireCanvas');
    const splash = document.getElementById('splash');
    if (!canvas || !splash) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    let animId;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = W * 0.3 + Math.random() * W * 0.4;
        this.y = H + 10;
        this.size = Math.random() * 6 + 2;
        this.speedY = -(Math.random() * 4 + 2);
        this.speedX = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.008;
        const colors = [
          [255, 100, 0],
          [255, 160, 20],
          [255, 60, 30],
          [255, 200, 50],
          [236, 72, 153],
          [255, 80, 60]
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX + (Math.random() - 0.5) * 0.5;
        this.y += this.speedY;
        this.speedY *= 0.99;
        this.life -= this.decay;
        this.size *= 0.995;
        if (this.life <= 0 || this.size < 0.5) this.reset();
      }
      draw() {
        const [r, g, b] = this.color;
        const a = this.life * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.2})`;
        ctx.fill();
      }
    }

    const count = Math.min(180, Math.floor(W * H / 5000));
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = Math.random() * H;
      p.life = Math.random();
      particles.push(p);
    }

    function animate() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(11, 15, 26, 0.15)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
      splash.classList.add('done');
      setTimeout(() => {
        cancelAnimationFrame(animId);
        splash.remove();
      }, 900);
    }, 2600);
  }

  // ===== INIT =====
  async function init() {
    initFireSplash();
    initSupabase();
    initTheme();
    visitorCurrency = detectVisitorCurrency();
    await Promise.all([loadData(), loadExchangeRates()]);
    initLang();
    renderCategories();
    renderProducts();
    renderPaymentSection();
    renderFooter();
    initSearch();

    $('#themeToggle').addEventListener('click', toggleTheme);
    $('#langToggle').addEventListener('click', toggleLang);
    $('#modalClose').addEventListener('click', closePaymentModal);
    $('#paymentModal').addEventListener('click', (e) => { if (e.target === $('#paymentModal')) closePaymentModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePaymentModal(); });

    initScrollReveal();
    initHeaderScroll();
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

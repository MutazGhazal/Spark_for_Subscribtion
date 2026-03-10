(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  let currentAdmin = null;
  let products = [];
  let categories = [];
  let siteSettings = {};
  let paymentSettings = {};
  let socialSettings = {};
  let admins = [];
  let allReviews = [];
  let currentTab = 'products';
  let isBootstrap = false;

  async function updateLastModified() {
    try { await sb.from('site_settings').upsert({ key: 'last_modified', value: new Date().toISOString() }); } catch (e) {}
  }

  // ===== TRANSLATE HELPERS =====
  function debounce(fn, delay) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
  }

  async function translateText(text, from, to) {
    if (!text || !text.trim()) return '';

    async function translateChunk(chunk) {
      if (!chunk.trim()) return chunk;
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(chunk.trim())}`;
        const res = await fetch(url);
        if (!res.ok) return '';
        const data = await res.json();
        const parts = data[0];
        if (!parts) return '';
        return parts.map(p => p[0] || '').join('');
      } catch(e) { return ''; }
    }

    // If multiline text, translate each line separately to preserve full content
    if (text.includes('\n')) {
      const lines = text.split('\n');
      const translated = await Promise.all(lines.map(line => line.trim() ? translateChunk(line) : Promise.resolve('')));
      return translated.join('\n');
    }

    // Single line: translate up to 1500 chars
    return translateChunk(text.slice(0, 1500));
  }

  function setupBilingualFields(arEl, enEl) {
    if (!arEl || !enEl) return;
    let lockAr = false, lockEn = false;
    arEl.addEventListener('input', debounce(async () => {
      if (lockAr || !arEl.value.trim()) return;
      lockEn = true;
      const t = await translateText(arEl.value, 'ar', 'en');
      if (t) enEl.value = t;
      lockEn = false;
    }, 800));
    enEl.addEventListener('input', debounce(async () => {
      if (lockEn || !enEl.value.trim()) return;
      lockAr = true;
      const t = await translateText(enEl.value, 'en', 'ar');
      if (t) arEl.value = t;
      lockAr = false;
    }, 800));
  }

  const AR_DURATIONS = ['شهر', 'شهرين', '3 أشهر', '4 أشهر', '5 أشهر', '6 أشهر', '7 أشهر', '8 أشهر', '9 أشهر', '10 أشهر', '11 شهر', 'سنة'];
  const EN_DURATIONS = ['1 Month', '2 Months', '3 Months', '4 Months', '5 Months', '6 Months', '7 Months', '8 Months', '9 Months', '10 Months', '11 Months', '1 Year'];
  function getNextDurationLabel(count) {
    return {
      ar: AR_DURATIONS[count] || `${count + 1} أشهر`,
      en: EN_DURATIONS[count] || `${count + 1} Months`
    };
  }

  // ===== AUTH =====
  async function checkBootstrap() {
    const { data, error } = await sb.rpc('admin_count');
    isBootstrap = (!error && data === 0);
    if (isBootstrap) {
      $('#nameGroup').style.display = '';
      $('#adminName').required = true;
      $('#loginTitle').textContent = 'إعداد Spark';
      $('#loginSubtitle').textContent = 'أنشئ حساب الأدمن الرئيسي';
      $('#loginBtnText').textContent = 'إنشاء الحساب';
      $('#loginNote').textContent = 'ستكون الأدمن الرئيسي (Super Admin) للمتجر';
    } else {
      $('#nameGroup').style.display = 'none';
      $('#adminName').required = false;
      $('#loginTitle').textContent = 'Spark - لوحة التحكم';
      $('#loginSubtitle').textContent = 'أدخل إيميلك وكلمة المرور';
      $('#loginBtnText').textContent = 'دخول';
      $('#loginNote').textContent = 'أدخل بياناتك وسيتم التعرف عليك تلقائياً';
    }
  }

  async function handleAuth(e) {
    e.preventDefault();
    const btn = $('#loginBtn');
    btn.disabled = true;
    $('#loginBtnText').textContent = 'جاري الاتصال...';

    const email = $('#adminEmail').value.trim().toLowerCase();
    const password = $('#adminPassword').value;
    const name = $('#adminName').value.trim();

    try {
      console.log('[Auth] isBootstrap:', isBootstrap, '| email:', email);

      if (isBootstrap) {
        console.log('[Auth] Bootstrap: signing up...');
        const { data: suData, error: suErr } = await sb.auth.signUp({ email, password });
        if (suErr) throw suErr;

        if (!suData.session) {
          const { data: siData, error: siErr } = await sb.auth.signInWithPassword({ email, password });
          if (siErr) throw siErr;
        }

        const { data: bData, error: bErr } = await sb.rpc('bootstrap_admin', {
          admin_name: name || email.split('@')[0],
          ref_code: email.split('@')[0]
        });
        if (bErr) throw bErr;
        if (bData?.error) throw new Error(bData.error);
      } else {
        console.log('[Auth] Normal login: signing in...');
        const loginRes = await sb.auth.signInWithPassword({ email, password });

        if (loginRes.error) {
          const errMsg = loginRes.error.message || '';
          // If the user doesn't exist at all in Auth, try to sign them up (auto-reg for new invited admins)
          if (errMsg.includes('Invalid login') || errMsg.includes('invalid_credentials')) {
            console.log('[Auth] Login failed, trying signup fallback...');
            const { data: suData, error: suErr } = await sb.auth.signUp({ email, password });
            
            if (suErr) {
              // If signup also fails with "already registered", it means the password was just wrong
              if (suErr.message.includes('already registered')) {
                throw new Error('invalid_credentials');
              }
              throw suErr;
            }
            
            if (!suData.session) {
              const { data: siData, error: siErr } = await sb.auth.signInWithPassword({ email, password });
              if (siErr) throw siErr;
            }
          } else {
            throw loginRes.error;
          }
        }
      }

      const { data: linkData, error: linkErr } = await sb.rpc('link_admin_user');
      if (linkErr) throw linkErr;
      if (linkData?.error) throw new Error(linkData.error);

      currentAdmin = linkData;
      await loadAllData();
      showDashboard();
    } catch (err) {
      console.error('[Auth] ERROR:', err.message, err);
      let msg = err.message || 'فشل تسجيل الدخول';
      
      if (msg.includes('Invalid login') || msg.includes('invalid_credentials')) {
        msg = 'كلمة المرور غير صحيحة أو الحساب غير موجود';
      } else if (msg.includes('Not authorized')) {
        msg = 'إيميلك غير مسجل كأدمن. تواصل مع المدير لإضافتك';
      } else if (msg.includes('already registered')) {
        msg = 'هذا الإيميل مسجل بالفعل كأدمن. جرب تسجيل الدخول بكلمة المرور الصحيحة';
      } else if (msg.includes('Email not confirmed')) {
        msg = 'يرجى تأكيد الإيميل أو تفعيله من لوحة Supabase';
      }
      
      showToast(msg);
      btn.disabled = false;
      $('#loginBtnText').textContent = isBootstrap ? 'إنشاء الحساب' : 'دخول';
    }
  }

  async function checkSession() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return false;

    const { data, error } = await sb.rpc('link_admin_user');
    if (error || data?.error) {
      await sb.auth.signOut();
      return false;
    }

    currentAdmin = data;
    return true;
  }

  async function logout() {
    await sb.auth.signOut();
    currentAdmin = null;
    $('#loginScreen').style.display = '';
    $('#dashboard').style.display = 'none';
    $('#adminPassword').value = '';
    await checkBootstrap();
  }

  // ===== FORGOT PASSWORD =====
  let isForgotMode = false;

  function toggleForgotMode(e) {
    if (e) e.preventDefault();
    isForgotMode = !isForgotMode;
    const toggle = $('#toggleForgot');

    if (isForgotMode) {
      $('#loginForm').style.display = 'none';
      $('#forgotForm').style.display = '';
      $('#loginTitle').textContent = 'استرداد كلمة المرور';
      $('#loginSubtitle').textContent = 'أدخل إيميلك وسنرسل لك رابط لإعادة تعيين كلمة المرور';
      $('#loginNote').textContent = 'سيصلك رابط على بريدك الإلكتروني';
      if (toggle) toggle.textContent = 'رجوع لتسجيل الدخول';
    } else {
      $('#loginForm').style.display = '';
      $('#forgotForm').style.display = 'none';
      if (toggle) toggle.textContent = 'نسيت كلمة المرور؟';
      // Reset text based on bootstrap state without overriding display
      if (isBootstrap) {
        $('#loginTitle').textContent = 'إعداد Spark';
        $('#loginSubtitle').textContent = 'أنشئ حساب الأدمن الرئيسي';
        $('#loginNote').textContent = 'ستكون الأدمن الرئيسي (Super Admin) للمتجر';
      } else {
        $('#loginTitle').textContent = 'Spark - لوحة التحكم';
        $('#loginSubtitle').textContent = 'أدخل إيميلك وكلمة المرور';
        $('#loginNote').textContent = 'أدخل بياناتك وسيتم التعرف عليك تلقائياً';
      }
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    const email = $('#forgotEmail').value.trim().toLowerCase();
    if (!email) { showToast('أدخل بريدك الإلكتروني'); return; }

    const btn = $('#forgotBtn');
    btn.disabled = true;
    $('#forgotBtnText').textContent = 'جاري الإرسال...';

    try {
      // Build redirect URL to reset-password.html (same origin)
      const currentUrl = window.location.href;
      const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
      const redirectTo = baseUrl + 'reset-password.html';

      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;

      showToast('✅ تم إرسال رابط الاسترداد لبريدك! تفقد صندوق الوارد');
      $('#forgotBtnText').textContent = 'تم الإرسال ✉️';
      setTimeout(() => {
        btn.disabled = false;
        $('#forgotBtnText').textContent = 'إرسال رابط الاسترداد';
      }, 5000);
    } catch (err) {
      console.error('[ForgotPassword] Error:', err);
      showToast('خطأ: ' + (err.message || 'فشل إرسال الرابط'));
      btn.disabled = false;
      $('#forgotBtnText').textContent = 'إرسال رابط الاسترداد';
    }
  }

  function showDashboard() {
    $('#loginScreen').style.display = 'none';
    $('#dashboard').style.display = 'flex';

    const isSuperAdmin = currentAdmin?.role === 'super_admin';
    $$('.super-only').forEach(el => {
      el.style.display = isSuperAdmin ? '' : 'none';
    });

    $('#adminInfo').innerHTML = `
      <span class="admin-name">${currentAdmin?.name || ''}</span>
      <span class="admin-role-badge ${currentAdmin?.role}">${currentAdmin?.role === 'super_admin' ? 'أدمن رئيسي' : 'أدمن'}</span>
    `;

    renderProductsList();
    renderCategoriesList();
    renderSettingsForm();
    renderPaymentForm();
    renderReferralDashboard();
    if (isSuperAdmin) {
      renderAdminsList();
      renderOrdersList();
    }
  }

  // ===== DATA LOADING =====
  async function loadAllData() {
    try {
      const [prodRes, catRes, storeRes, payRes, socialRes] = await Promise.all([
        sb.from('products').select('*').order('sort_order'),
        sb.from('categories').select('*').order('sort_order'),
        sb.from('site_settings').select('value').eq('key', 'store').maybeSingle(),
        sb.from('site_settings').select('value').eq('key', 'payment').maybeSingle(),
        sb.from('site_settings').select('value').eq('key', 'social').maybeSingle()
      ]);

      products = prodRes.data || [];
      categories = catRes.data || [];
      siteSettings = storeRes.data?.value || {};
      paymentSettings = payRes.data?.value || {};
      socialSettings = socialRes.data?.value || {};

      // Load all reviews
      const { data: revData } = await sb.from('reviews').select('*').order('created_at', { ascending: false });
      allReviews = revData || [];

      if (currentAdmin?.role === 'super_admin') {
        const { data: adminsData } = await sb.from('admins').select('*').order('created_at');
        admins = adminsData || [];
      }
    } catch (e) {
      console.error('Load data error:', e);
      showToast('تعذر تحميل البيانات');
    }
  }

  // ===== TABS =====
  function initTabs() {
    $$('.nav-item[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTab = btn.dataset.tab;
        $$('.nav-item[data-tab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        $$('.tab-content').forEach(t => t.classList.remove('active'));
        $(`#tab-${currentTab}`).classList.add('active');

        if (currentTab === 'referral') renderReferralDashboard();
        if (currentTab === 'orders') renderOrdersList();
        if (currentTab === 'reviews') renderReviewsDashboard();
      });
    });
  }

  // ===== PRODUCTS =====
  function renderProductsList() {
    const list = $('#adminProductsList');
    if (products.length === 0) {
      list.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>لا توجد منتجات - أضف أول منتج</p></div>`;
      return;
    }

    list.innerHTML = products.map((p, i) => {
      const plans = p.subscription_plans || [];
      const hasPlans = plans.length > 0;
      const hasSource = hasPlans || p.source_url;
      return `
        <div class="admin-product-card ${hasSource ? 'has-source' : ''}" data-index="${i}">
          <div class="admin-product-img">
            <img src="${p.image}" alt="" onerror="this.style.display='none'">
          </div>
          <div class="admin-product-details">
            <h4>${p.name_ar || p.name_en || 'بدون اسم'}</h4>
            <p>${p.category} &bull; ${p.duration_ar || p.duration_en || ''} &bull; <span class="status-badge ${p.available !== false ? 'available' : 'unavailable'}">${p.available !== false ? 'متوفر' : 'غير متوفر'}</span></p>
            ${hasPlans
              ? `<span class="source-link" style="cursor:pointer;" onclick="event.stopPropagation();window._showPlans(${i})">🔗 ${plans.length} مدة اشتراك</span>`
              : (p.source_url ? `<a href="${p.source_url}" target="_blank" class="source-link" title="مصدر الشراء" onclick="event.stopPropagation()">🔗 مصدر الشراء</a>` : '')
            }
          </div>
          <span class="admin-product-price">${p.price} ${p.currency || 'USD'}</span>
          <div class="admin-product-actions">
            <button class="btn-icon duplicate" data-index="${i}" title="نسخ (تدبيل)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
            <button class="btn-icon edit" data-index="${i}" title="تعديل"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="btn-icon delete" data-index="${i}" title="حذف"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
          </div>
        </div>
      `;
    }).join('');

    // Global helper to show plans popup in admin
    window._showPlans = function(idx) {
      const p = products[idx];
      if (!p) return;
      const plans = p.subscription_plans || [];
      if (plans.length === 0) return;
      const existing = document.getElementById('adminPlansPopup');
      if (existing) existing.remove();
      const popup = document.createElement('div');
      popup.id = 'adminPlansPopup';
      popup.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;';
      popup.innerHTML = `
        <div style="background:var(--bg-card);border-radius:16px;padding:1.5rem;min-width:340px;max-width:480px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.4);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="margin:0;font-size:1.1rem;">📋 ${p.name_ar || p.name_en} — مدد الاشتراك</h3>
            <button onclick="document.getElementById('adminPlansPopup').remove()" style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--text-muted);line-height:1;">&times;</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:0.6rem;">
            ${plans.map((plan, i) => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:var(--bg-secondary);border-radius:10px;">
                <div>
                  <div style="font-weight:700;">${plan.label_ar || plan.label_en}</div>
                  <div style="font-size:0.85rem;color:var(--text-muted);">${plan.label_en || ''}</div>
                </div>
                <div style="display:flex;align-items:center;gap:0.75rem;">
                  <span style="font-weight:800;color:var(--primary);">${plan.price} ${p.currency || 'USD'}</span>
                  ${plan.source_url ? `<a href="${plan.source_url}" target="_blank" style="background:var(--primary);color:#fff;padding:0.3rem 0.8rem;border-radius:8px;text-decoration:none;font-size:0.85rem;">🔗 فتح</a>` : '<span style="color:var(--text-muted);font-size:0.8rem;">بدون رابط</span>'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      popup.addEventListener('click', (e) => { if (e.target === popup) popup.remove(); });
      document.body.appendChild(popup);
    };

    list.querySelectorAll('.admin-product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-icon') || e.target.closest('.source-link') || e.target.closest('a')) return;
        const idx = parseInt(card.dataset.index);
        const p = products[idx];
        const plans = p?.subscription_plans || [];
        if (plans.length > 0) {
          window._showPlans(idx);
        } else if (p?.source_url) {
          window.open(p.source_url, '_blank');
        }
      });
    });

    list.querySelectorAll('.btn-icon.edit').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); openProductModal(parseInt(btn.dataset.index)); });
    });
    list.querySelectorAll('.btn-icon.duplicate').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); duplicateProduct(parseInt(btn.dataset.index)); });
    });
    list.querySelectorAll('.btn-icon.delete').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); deleteProduct(parseInt(btn.dataset.index)); });
    });
  }

  function getCustomCategories() {
    return categories.filter(c => c.id !== 'all');
  }

  function openProductModal(index, duplicateData = null) {
    const isNew = index === -1;
    let p;
    
    if (duplicateData) {
      p = { ...duplicateData, id: '' };
    } else if (isNew) {
      p = {
        id: '', name_ar: '', name_en: '', description_ar: '', description_en: '',
        features_ar: '', features_en: '', source_url: '',
        requirements_ar: '', requirements_en: '',
        price: 0, currency: 'USD', category: categories[0]?.id || 'streaming', image: '',
        duration_ar: '', duration_en: '', available: true, featured: false,
        subscription_plans: [],
        payment_links: { paypal: '', stripe: '', whatsapp_message: '' }
      };
    } else {
      p = { ...products[index], payment_links: { ...(products[index].payment_links || {}) } };
    }

    $('#productModalTitle').textContent = duplicateData ? 'تدبيل المنتج (إضافة نسخة)' : (isNew ? 'إضافة منتج جديد' : 'تعديل المنتج');
    const body = $('#productModalBody');
    const cats = getCustomCategories();

    body.innerHTML = `
      <form class="modal-form" id="productForm">
        <div class="form-row">
          <div class="form-group"><label>اسم المنتج (عربي)</label><input type="text" id="pNameAr" value="${p.name_ar}" required></div>
          <div class="form-group"><label>Product Name (English)</label><input type="text" id="pNameEn" value="${p.name_en}" required></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>الوصف (عربي)</label><textarea id="pDescAr">${p.description_ar}</textarea></div>
          <div class="form-group"><label>Description (English)</label><textarea id="pDescEn">${p.description_en}</textarea></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>تفاصيل الاشتراك (عربي) <small style="color:var(--text-muted)">سطر لكل تفصيل</small></label><textarea id="pFeatAr" rows="3" placeholder="اشتراك أصلي&#10;تفعيل فوري&#10;دعم فني">${p.features_ar || ''}</textarea></div>
          <div class="form-group"><label>Subscription Details (English) <small style="color:var(--text-muted)">one per line</small></label><textarea id="pFeatEn" rows="3" placeholder="Original subscription&#10;Instant activation&#10;Technical support">${p.features_en || ''}</textarea></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>السعر</label><input type="number" id="pPrice" value="${p.price}" step="0.01" min="0" required></div>
          <div class="form-group"><label>العملة</label>
            <select id="pCurrency">
              ${['USD','EUR','SAR','AED','EGP'].map(c => `<option value="${c}" ${p.currency===c?'selected':''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>الفئة</label>
            <select id="pCategory">
              ${cats.map(c => `<option value="${c.id}" ${p.category===c.id?'selected':''}>${c.name_ar} / ${c.name_en}</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label>المدة (عربي / إنجليزي)</label>
            <div class="form-row" style="gap:0.5rem">
              <input type="text" id="pDurAr" value="${p.duration_ar}" placeholder="شهر واحد">
              <input type="text" id="pDurEn" value="${p.duration_en}" placeholder="1 Month">
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>صورة المنتج</label>
          <div class="image-upload" id="imageUploadArea">
            <input type="file" id="pImageFile" accept="image/*">
            <svg class="upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p>اسحب صورة هنا أو انقر للاختيار</p>
            ${p.image ? `<div class="image-preview"><img src="${p.image}" alt=""><span>${p.image}</span></div>` : ''}
          </div>
          <div class="form-group" style="margin-top:0.5rem;">
            <label>أو أدخل رابط الصورة مباشرة</label>
            <input type="text" id="pImageUrl" value="${p.image}" placeholder="images/product.png">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="checkbox-label"><input type="checkbox" id="pAvailable" ${p.available!==false?'checked':''}> متوفر للبيع</label></div>
          <div class="form-group"><label class="checkbox-label"><input type="checkbox" id="pFeatured" ${p.featured?'checked':''}> منتج مميز</label></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>متطلبات الاشتراك (عربي) <small style="color:var(--text-muted)">سطر لكل متطلب</small></label><textarea id="pReqAr" rows="3" placeholder="الإيميل&#10;كلمة المرور&#10;نوع الجهاز">${p.requirements_ar || ''}</textarea></div>
          <div class="form-group"><label>Requirements (English) <small style="color:var(--text-muted)">one per line</small></label><textarea id="pReqEn" rows="3" placeholder="Email&#10;Password&#10;Device type">${p.requirements_en || ''}</textarea></div>
        </div>
        <div class="form-group" style="margin-top:1rem;border-top:1px dashed var(--border);padding-top:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
            <label style="margin:0;">📋 مدد الاشتراك <small style="color:var(--text-muted)">لكل مدة رابط مصدر خاص (للأدمن فقط)</small></label>
            <button type="button" class="btn btn-secondary" id="addPlanBtn" style="padding:0.35rem 0.8rem;font-size:0.85rem;">+ إضافة مدة</button>
          </div>
          <div id="plansContainer">
            ${(p.subscription_plans || []).map((plan, i) => `
              <div class="plan-row" style="display:grid;grid-template-columns:1fr 1fr 80px 1fr auto;gap:0.4rem;align-items:center;margin-bottom:0.5rem;background:var(--bg-secondary);padding:0.6rem;border-radius:8px;">
                <input type="text" class="plan-label-ar" value="${plan.label_ar || ''}" placeholder="شهر واحد" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
                <input type="text" class="plan-label-en" value="${plan.label_en || ''}" placeholder="1 Month" dir="ltr" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
                <input type="number" class="plan-price" value="${plan.price || 0}" placeholder="0" min="0" step="0.01" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
                <input type="text" class="plan-source" value="${plan.source_url || ''}" placeholder="https://رابط المصدر" dir="ltr" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
                <button type="button" class="btn-icon delete remove-plan" title="حذف"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
              </div>
            `).join('')}
          </div>
          <p style="font-size:0.78rem;color:var(--text-muted);margin-top:0.4rem;">عربي | إنجليزي | سعر | رابط المصدر</p>
        </div>
        <h4 style="margin:1rem 0 0.5rem;font-weight:600;">روابط الدفع</h4>
        <div class="form-group"><label>رابط PayPal</label><input type="text" id="pPaypal" value="${p.payment_links?.paypal||''}" placeholder="https://paypal.me/username/5"></div>
        <div class="form-group"><label>رابط Stripe</label><input type="text" id="pStripe" value="${p.payment_links?.stripe||''}" placeholder="https://buy.stripe.com/xxx"></div>
        <div class="form-group"><label>رسالة واتساب</label><input type="text" id="pWhatsapp" value="${p.payment_links?.whatsapp_message||''}" placeholder="أريد شراء..."></div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancelProduct">إلغاء</button>
          <button type="submit" class="btn btn-primary">${isNew ? 'إضافة' : 'حفظ التعديلات'}</button>
        </div>
      </form>
    `;

    $('#pImageFile').addEventListener('change', handleImagePreview);
    $('#cancelProduct').addEventListener('click', closeProductModal);
    $('#productForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveProduct(isNew, index);
    });

    // Plans: add row with auto-fill duration
    $('#addPlanBtn').addEventListener('click', () => {
      const container = $('#plansContainer');
      const existingCount = container.querySelectorAll('.plan-row').length;
      const nextDur = getNextDurationLabel(existingCount);
      const row = document.createElement('div');
      row.className = 'plan-row';
      row.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 80px 1fr auto;gap:0.4rem;align-items:center;margin-bottom:0.5rem;background:var(--bg-secondary);padding:0.6rem;border-radius:8px;';
      row.innerHTML = `
        <input type="text" class="plan-label-ar" value="${nextDur.ar}" placeholder="شهر واحد" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
        <input type="text" class="plan-label-en" value="${nextDur.en}" placeholder="1 Month" dir="ltr" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
        <input type="number" class="plan-price" value="0" min="0" step="0.01" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
        <input type="text" class="plan-source" placeholder="https://رابط الشراء" dir="ltr" style="padding:0.4rem;border:1px solid var(--border);border-radius:6px;background:var(--bg-card);color:var(--text);">
        <button type="button" class="btn-icon delete remove-plan" title="حذف"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
      `;
      row.querySelector('.remove-plan').addEventListener('click', () => row.remove());
      setupBilingualFields(row.querySelector('.plan-label-ar'), row.querySelector('.plan-label-en'));
      container.appendChild(row);
    });

    // Plans: remove existing rows
    $('#plansContainer').querySelectorAll('.remove-plan').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.plan-row').remove());
    });

    // Auto-translate for main fields
    setupBilingualFields($('#pNameAr'), $('#pNameEn'));
    setupBilingualFields($('#pDescAr'), $('#pDescEn'));
    setupBilingualFields($('#pFeatAr'), $('#pFeatEn'));

    // Auto-translate for existing plan rows
    $('#plansContainer').querySelectorAll('.plan-row').forEach(row => {
      setupBilingualFields(row.querySelector('.plan-label-ar'), row.querySelector('.plan-label-en'));
    });

    $('#productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function duplicateProduct(index) {
    const source = products[index];
    if (!source) return;
    
    const copy = { 
      ...source, 
      name_ar: source.name_ar + ' (نسخة)',
      name_en: source.name_en + ' (Copy)',
      payment_links: { ...(source.payment_links || {}) }
    };
    
    openProductModal(-1, copy);
  }

  function handleImagePreview(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const old = document.querySelector('#imageUploadArea .image-preview');
      if (old) old.remove();
      const div = document.createElement('div');
      div.className = 'image-preview';
      div.innerHTML = `<img src="${ev.target.result}" alt=""><span>${file.name}</span>`;
      $('#imageUploadArea').appendChild(div);
    };
    reader.readAsDataURL(file);
  }

  async function saveProduct(isNew, index) {
    const nameAr = $('#pNameAr').value.trim();
    const nameEn = $('#pNameEn').value.trim();
    if (!nameAr && !nameEn) { showToast('يجب إدخال اسم المنتج'); return; }

    const id = isNew ? generateId(nameEn || nameAr) : products[index].id;

    let imagePath = $('#pImageUrl').value.trim();
    const imageFile = $('#pImageFile').files[0];
    if (imageFile) {
      setSaveStatus('saving', 'جاري رفع الصورة...');
      try {
        const ext = imageFile.name.split('.').pop();
        const filePath = `products/${id}.${ext}`;
        const { error: upErr } = await sb.storage.from('images').upload(filePath, imageFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: urlData } = sb.storage.from('images').getPublicUrl(filePath);
        imagePath = urlData.publicUrl;
      } catch (e) {
        showToast('فشل رفع الصورة: ' + e.message);
      }
    }

    // Collect subscription plans
    const planRows = document.querySelectorAll('#plansContainer .plan-row');
    const subscriptionPlans = [];
    planRows.forEach(row => {
      const labelAr = row.querySelector('.plan-label-ar')?.value.trim() || '';
      const labelEn = row.querySelector('.plan-label-en')?.value.trim() || '';
      const price = parseFloat(row.querySelector('.plan-price')?.value) || 0;
      const sourceUrl = row.querySelector('.plan-source')?.value.trim() || '';
      if (labelAr || labelEn) {
        subscriptionPlans.push({ label_ar: labelAr, label_en: labelEn, price, source_url: sourceUrl });
      }
    });

    const productData = {
      id,
      name_ar: nameAr, name_en: nameEn,
      description_ar: $('#pDescAr').value.trim(),
      description_en: $('#pDescEn').value.trim(),
      features_ar: $('#pFeatAr').value.trim(),
      features_en: $('#pFeatEn').value.trim(),
      requirements_ar: $('#pReqAr').value.trim(),
      requirements_en: $('#pReqEn').value.trim(),
      source_url: subscriptionPlans.length > 0 ? subscriptionPlans[0].source_url : '',
      price: parseFloat($('#pPrice').value) || 0,
      currency: $('#pCurrency').value,
      category: $('#pCategory').value,
      image: imagePath,
      duration_ar: $('#pDurAr').value.trim(),
      duration_en: $('#pDurEn').value.trim(),
      available: $('#pAvailable').checked,
      featured: $('#pFeatured').checked,
      subscription_plans: subscriptionPlans,
      payment_links: {
        paypal: $('#pPaypal').value.trim(),
        stripe: $('#pStripe').value.trim(),
        whatsapp_message: $('#pWhatsapp').value.trim()
      },
      sort_order: isNew ? products.length + 1 : (products[index]?.sort_order || 0),
      updated_at: new Date().toISOString()
    };

    setSaveStatus('saving', 'جاري الحفظ...');
    try {
      if (isNew) {
        const { error } = await sb.from('products').insert(productData);
        if (error) throw error;
        products.push(productData);
      } else {
        const { error } = await sb.from('products').update(productData).eq('id', id);
        if (error) throw error;
        products[index] = productData;
      }
      setSaveStatus('saved', 'تم الحفظ');
      showToast('تم حفظ المنتج بنجاح');
      updateLastModified();
      renderProductsList();
      closeProductModal();
    } catch (e) {
      setSaveStatus('error', 'فشل الحفظ');
      showToast('فشل الحفظ: ' + e.message);
    }
  }

  async function deleteProduct(index) {
    const p = products[index];
    if (!confirm(`هل أنت متأكد من حذف "${p.name_ar || p.name_en}"؟`)) return;
    try {
      const { error } = await sb.from('products').delete().eq('id', p.id);
      if (error) throw error;
      products.splice(index, 1);
      showToast('تم حذف المنتج');
      updateLastModified();
      renderProductsList();
    } catch (e) {
      showToast('فشل الحذف: ' + e.message);
    }
  }

  function closeProductModal() {
    $('#productModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== CATEGORIES =====
  function renderCategoriesList() {
    const list = $('#adminCategoriesList');
    if (categories.length === 0) {
      list.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg><p>لا توجد فئات - أضف أول فئة</p></div>`;
      return;
    }

    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'];
    list.innerHTML = categories.map((c, i) => {
      const prodCount = products.filter(p => p.category === c.id).length;
      return `
        <div class="admin-cat-card" data-index="${i}">
          <span class="cat-color-dot" style="background:${colors[i % colors.length]}"></span>
          <div class="admin-cat-details"><h4>${c.name_ar} / ${c.name_en}</h4><p>ID: ${c.id} &bull; ${prodCount} منتج</p></div>
          <span class="admin-cat-id">${c.id}</span>
          <div class="admin-cat-actions">
            <button class="btn-icon edit" data-index="${i}" title="تعديل"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="btn-icon delete" data-index="${i}" title="حذف"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.btn-icon.edit').forEach(btn => {
      btn.addEventListener('click', () => showCategoryForm(parseInt(btn.dataset.index)));
    });
    list.querySelectorAll('.btn-icon.delete').forEach(btn => {
      btn.addEventListener('click', () => deleteCategory(parseInt(btn.dataset.index)));
    });
  }

  function showCategoryForm(index) {
    const isNew = index === -1;
    const cat = isNew ? { id: '', name_ar: '', name_en: '' } : { ...categories[index] };
    const list = $('#adminCategoriesList');
    const existing = list.querySelector('.cat-inline-form');
    if (existing) existing.remove();

    const form = document.createElement('div');
    form.className = 'cat-inline-form';
    form.innerHTML = `
      <div class="form-group"><label>المعرّف (ID)</label><input type="text" id="catId" value="${cat.id}" placeholder="education" ${!isNew ? 'readonly style="opacity:0.6"' : ''}></div>
      <div class="form-group"><label>الاسم بالعربي</label><input type="text" id="catNameAr" value="${cat.name_ar}" placeholder="تعليم"></div>
      <div class="form-group"><label>Name in English</label><input type="text" id="catNameEn" value="${cat.name_en}" placeholder="Education"></div>
      <div class="cat-form-actions">
        <button class="btn btn-primary" id="saveCatBtn">${isNew ? 'إضافة' : 'حفظ'}</button>
        <button class="btn btn-secondary" id="cancelCatBtn">إلغاء</button>
      </div>
    `;

    if (isNew) list.prepend(form);
    else {
      const card = list.querySelector(`[data-index="${index}"]`);
      if (card) card.after(form);
    }

    form.querySelector('#saveCatBtn').addEventListener('click', async () => {
      const id = $('#catId').value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      const nameAr = $('#catNameAr').value.trim();
      const nameEn = $('#catNameEn').value.trim();
      if (!id || !nameAr || !nameEn) { showToast('يجب تعبئة جميع الحقول'); return; }

      try {
        if (isNew) {
          if (categories.some(c => c.id === id)) { showToast('هذا المعرّف موجود مسبقاً'); return; }
          const newCat = { id, name_ar: nameAr, name_en: nameEn, icon: 'tag', sort_order: categories.length + 1 };
          const { error } = await sb.from('categories').insert(newCat);
          if (error) throw error;
          categories.push(newCat);
        } else {
          const { error } = await sb.from('categories').update({ name_ar: nameAr, name_en: nameEn }).eq('id', id);
          if (error) throw error;
          categories[index].name_ar = nameAr;
          categories[index].name_en = nameEn;
        }
        showToast(isNew ? 'تمت إضافة الفئة' : 'تم تحديث الفئة');
        renderCategoriesList();
      } catch (e) {
        showToast('فشل الحفظ: ' + e.message);
      }
    });

    form.querySelector('#cancelCatBtn').addEventListener('click', () => form.remove());
    form.querySelector('#catId')?.focus();
  }

  async function deleteCategory(index) {
    const cat = categories[index];
    const usedCount = products.filter(p => p.category === cat.id).length;
    let msg = `هل أنت متأكد من حذف فئة "${cat.name_ar}"؟`;
    if (usedCount > 0) msg += `\n\nتنبيه: يوجد ${usedCount} منتج مرتبط بهذه الفئة.`;
    if (!confirm(msg)) return;

    try {
      const { error } = await sb.from('categories').delete().eq('id', cat.id);
      if (error) throw error;
      categories.splice(index, 1);
      showToast('تم حذف الفئة');
      renderCategoriesList();
    } catch (e) {
      showToast('فشل الحذف: ' + e.message);
    }
  }

  // ===== SETTINGS =====
  function renderSettingsForm() {
    const store = siteSettings;
    const social = socialSettings;
    const form = $('#settingsForm');
    form.innerHTML = `
      <div class="settings-section">
        <h3>معلومات المتجر</h3>
        <div class="form-row">
          <div class="form-group"><label>اسم المتجر (عربي)</label><input type="text" id="sNameAr" value="${store.name_ar||''}"></div>
          <div class="form-group"><label>Store Name (English)</label><input type="text" id="sNameEn" value="${store.name_en||''}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>الوصف (عربي)</label><textarea id="sDescAr">${store.description_ar||''}</textarea></div>
          <div class="form-group"><label>Description (English)</label><textarea id="sDescEn">${store.description_en||''}</textarea></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>عنوان البانر (عربي)</label><input type="text" id="sHeroAr" value="${store.hero_ar||''}"></div>
          <div class="form-group"><label>Hero Title (English)</label><input type="text" id="sHeroEn" value="${store.hero_en||''}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>نص البانر الفرعي (عربي)</label><textarea id="sHeroSubAr">${store.hero_sub_ar||''}</textarea></div>
          <div class="form-group"><label>Hero Subtitle (English)</label><textarea id="sHeroSubEn">${store.hero_sub_en||''}</textarea></div>
        </div>
      </div>
      <div class="settings-section">
        <h3>روابط التواصل</h3>
        <div class="form-group"><label>رقم واتساب (بدون +)</label><input type="text" id="sSocialWa" value="${social.whatsapp||''}" placeholder="966500000000"></div>
        <div class="form-group"><label>يوزر تيليجرام</label><input type="text" id="sSocialTg" value="${social.telegram||''}" placeholder="username"></div>
        <div class="form-group"><label>البريد الإلكتروني</label><input type="email" id="sSocialEmail" value="${social.email||''}" placeholder="contact@example.com"></div>
      </div>
    `;
  }

  async function collectAndSaveSettings() {
    const storeVal = {
      ...siteSettings,
      name_ar: $('#sNameAr').value.trim(), name_en: $('#sNameEn').value.trim(),
      description_ar: $('#sDescAr').value.trim(), description_en: $('#sDescEn').value.trim(),
      hero_ar: $('#sHeroAr').value.trim(), hero_en: $('#sHeroEn').value.trim(),
      hero_sub_ar: $('#sHeroSubAr').value.trim(), hero_sub_en: $('#sHeroSubEn').value.trim()
    };
    const socialVal = {
      whatsapp: $('#sSocialWa').value.trim(),
      telegram: $('#sSocialTg').value.trim(),
      email: $('#sSocialEmail').value.trim()
    };

    setSaveStatus('saving', 'جاري الحفظ...');
    try {
      await sb.from('site_settings').upsert({ key: 'store', value: storeVal });
      await sb.from('site_settings').upsert({ key: 'social', value: socialVal });
      siteSettings = storeVal;
      socialSettings = socialVal;
      setSaveStatus('saved', 'تم الحفظ');
      showToast('تم حفظ الإعدادات');
      updateLastModified();
    } catch (e) {
      setSaveStatus('error', 'فشل الحفظ');
      showToast('فشل الحفظ: ' + e.message);
    }
  }

  // ===== PAYMENT =====
  function renderPaymentForm() {
    const pay = paymentSettings;
    const form = $('#paymentForm');
    form.innerHTML = `
      <div class="settings-section">
        <h3>PayPal</h3>
        <div class="switch-wrapper"><span>تفعيل PayPal</span><label class="switch"><input type="checkbox" id="payPaypalEnabled" ${pay.paypal?.enabled?'checked':''}><span class="switch-slider"></span></label></div>
        <div class="form-group"><label>رابط PayPal.me</label><input type="text" id="payPaypalLink" value="${pay.paypal?.link||''}" placeholder="https://paypal.me/username"></div>
      </div>
      <div class="settings-section">
        <h3>Stripe Payment Links</h3>
        <div class="switch-wrapper"><span>تفعيل Stripe</span><label class="switch"><input type="checkbox" id="payStripeEnabled" ${pay.stripe?.enabled?'checked':''}><span class="switch-slider"></span></label></div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">أنشئ رابط دفع لكل منتج من <a href="https://dashboard.stripe.com/payment-links" target="_blank" style="color:var(--primary);">لوحة Stripe</a></p>
      </div>
      <div class="settings-section">
        <h3>واتساب</h3>
        <div class="switch-wrapper"><span>تفعيل واتساب</span><label class="switch"><input type="checkbox" id="payWhatsappEnabled" ${pay.whatsapp?.enabled?'checked':''}><span class="switch-slider"></span></label></div>
        <div class="form-group"><label>رقم واتساب (بدون +)</label><input type="text" id="payWhatsappNumber" value="${pay.whatsapp?.number||''}" placeholder="966500000000"></div>
      </div>
      <div class="settings-section">
        <h3>البريد الإلكتروني</h3>
        <div class="switch-wrapper"><span>تفعيل إرسال الطلبات عبر الإيميل</span><label class="switch"><input type="checkbox" id="payEmailEnabled" ${pay.email?.enabled?'checked':''}><span class="switch-slider"></span></label></div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">يظهر كخيار دفع يفتح رسالة إيميل جاهزة بتفاصيل الطلب (يستخدم إيميل التواصل من الإعدادات)</p>
      </div>
      <div class="settings-section">
        <h3>عملات رقمية</h3>
        <div class="switch-wrapper"><span>تفعيل العملات الرقمية</span><label class="switch"><input type="checkbox" id="payCryptoEnabled" ${pay.crypto?.enabled?'checked':''}><span class="switch-slider"></span></label></div>
        <h4 style="margin:1rem 0 0.5rem;color:var(--text-secondary);">شبكات USDT</h4>
        ${['trc20','bep20','apt','pol','sol'].map(net => {
          const labels = {trc20:'TRC20 (Tron)',bep20:'BEP20 (BSC)',apt:'Aptos (APT)',pol:'Polygon (POL)',sol:'Solana (SOL)'};
          const placeholders = {trc20:'TXxxx...',bep20:'0xxxx...',apt:'0xxxx...',pol:'0xxxx...',sol:'xxx...'};
          const w = pay.crypto?.wallets || {};
          return `<div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:0.8rem;margin-bottom:0.5rem;">
            <div class="switch-wrapper" style="margin:0;"><span>${labels[net]}</span><label class="switch"><input type="checkbox" class="usdt-net-toggle" data-net="${net}" ${w[net+'_enabled']?'checked':''}><span class="switch-slider"></span></label></div>
            <div class="form-group" style="margin-top:0.5rem;margin-bottom:0;"><input type="text" class="usdt-net-addr" data-net="${net}" value="${w[net+'_addr']||w['usdt_'+net]||''}" placeholder="${placeholders[net]}"></div>
          </div>`;
        }).join('')}
        <h4 style="margin:1rem 0 0.5rem;color:var(--text-secondary);">Binance</h4>
        <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:0.8rem;">
          <div class="switch-wrapper" style="margin:0;"><span>Binance ID (Pay)</span><label class="switch"><input type="checkbox" id="payCryptoBinanceEnabled" ${pay.crypto?.wallets?.binance_enabled?'checked':''}><span class="switch-slider"></span></label></div>
          <div class="form-group" style="margin-top:0.5rem;margin-bottom:0;"><input type="text" id="payCryptoBinance" value="${pay.crypto?.wallets?.binance_id||''}" placeholder="123456789"></div>
        </div>
      </div>
    `;
  }

  async function collectAndSavePayment() {
    const payVal = {
      paypal: { enabled: $('#payPaypalEnabled').checked, link: $('#payPaypalLink').value.trim(), label_ar: 'باي بال', label_en: 'PayPal' },
      stripe: { enabled: $('#payStripeEnabled').checked, label_ar: 'بطاقة ائتمان', label_en: 'Credit Card (Stripe)' },
      whatsapp: { enabled: $('#payWhatsappEnabled').checked, number: $('#payWhatsappNumber').value.trim(), label_ar: 'واتساب', label_en: 'WhatsApp' },
      email: { enabled: $('#payEmailEnabled').checked, label_ar: 'البريد الإلكتروني', label_en: 'Email' },
      crypto: {
        enabled: $('#payCryptoEnabled').checked,
        wallets: (() => {
          const w = { binance_id: $('#payCryptoBinance').value.trim(), binance_enabled: $('#payCryptoBinanceEnabled').checked };
          document.querySelectorAll('.usdt-net-toggle').forEach(el => { w[el.dataset.net + '_enabled'] = el.checked; });
          document.querySelectorAll('.usdt-net-addr').forEach(el => { w[el.dataset.net + '_addr'] = el.value.trim(); });
          return w;
        })(),
        label_ar: 'عملات رقمية', label_en: 'Cryptocurrency'
      }
    };

    setSaveStatus('saving', 'جاري الحفظ...');
    try {
      await sb.from('site_settings').upsert({ key: 'payment', value: payVal });
      paymentSettings = payVal;
      setSaveStatus('saved', 'تم الحفظ');
      showToast('تم حفظ طرق الدفع');
      updateLastModified();
    } catch (e) {
      setSaveStatus('error', 'فشل الحفظ');
      showToast('فشل الحفظ: ' + e.message);
    }
  }

  // ===== ADMIN MANAGEMENT (super_admin) =====
  function renderAdminsList() {
    const container = $('#adminsList');
    if (!container) return;

    container.innerHTML = admins.map(a => `
      <div class="admin-card">
        <div class="admin-card-avatar">${(a.name || a.email)[0].toUpperCase()}</div>
        <div class="admin-card-info">
          <h4>${a.name || 'بدون اسم'}</h4>
          <p>${a.email}</p>
          <div class="admin-card-meta">
            <span class="admin-role-badge ${a.role}">${a.role === 'super_admin' ? 'أدمن رئيسي' : 'أدمن'}</span>
            <span class="admin-ref-code">Ref: ${a.referral_code || '—'}</span>
            <span>عمولة: ${a.commission_percent}%</span>
            <span class="admin-link-status ${a.user_id ? 'linked' : 'pending'}">${a.user_id ? 'مفعّل' : 'بانتظار التسجيل'}</span>
          </div>
        </div>
        <div class="admin-card-actions">
          ${a.role !== 'super_admin' ? `<button class="btn-icon delete" data-id="${a.id}" title="حذف"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>` : ''}
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-icon.delete').forEach(btn => {
      btn.addEventListener('click', () => deleteAdmin(btn.dataset.id));
    });
  }

  function openAdminModal() {
    $('#adminModalTitle').textContent = 'إضافة أدمن جديد';
    const body = $('#adminModalBody');
    body.innerHTML = `
      <form id="addAdminForm">
        <div class="form-group"><label>الاسم</label><input type="text" id="newAdminName" required placeholder="اسم الأدمن"></div>
        <div class="form-group"><label>البريد الإلكتروني</label><input type="email" id="newAdminEmail" required placeholder="admin@example.com"></div>
        <div class="form-group"><label>الدور</label>
          <select id="newAdminRole">
            <option value="admin">أدمن (تعديل محتوى + ريفيرال)</option>
            <option value="super_admin">أدمن رئيسي (تحكم كامل)</option>
          </select>
        </div>
        <div class="form-group"><label>كود الريفيرال</label><input type="text" id="newAdminRef" placeholder="ahmed123"></div>
        <div class="form-group"><label>نسبة العمولة (%)</label><input type="number" id="newAdminCommission" value="10" min="0" max="100" step="1"></div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;">الأدمن الجديد سيحتاج أن يسجل حسابه من صفحة تسجيل الدخول بنفس الإيميل</p>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('adminModal').classList.remove('active');document.body.style.overflow=''">إلغاء</button>
          <button type="submit" class="btn btn-primary">إضافة</button>
        </div>
      </form>
    `;

    body.querySelector('#addAdminForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#newAdminName').value.trim();
      const email = $('#newAdminEmail').value.trim();
      const role = $('#newAdminRole').value;
      const refCode = $('#newAdminRef').value.trim() || email.split('@')[0];
      const commission = parseFloat($('#newAdminCommission').value) || 10;

      try {
        const { error } = await sb.from('admins').insert({
          email, name, role, referral_code: refCode, commission_percent: commission
        });
        if (error) throw error;
        showToast('تمت إضافة الأدمن بنجاح');
        const { data: newAdmins } = await sb.from('admins').select('*').order('created_at');
        admins = newAdmins || [];
        renderAdminsList();
        $('#adminModal').classList.remove('active');
        document.body.style.overflow = '';
      } catch (e) {
        showToast('فشل الإضافة: ' + e.message);
      }
    });

    $('#adminModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  async function deleteAdmin(id) {
    const admin = admins.find(a => a.id === id);
    if (!admin) return;
    if (!confirm(`هل أنت متأكد من حذف "${admin.name || admin.email}"؟`)) return;

    try {
      const { error } = await sb.from('admins').delete().eq('id', id);
      if (error) throw error;
      admins = admins.filter(a => a.id !== id);
      showToast('تم حذف الأدمن');
      renderAdminsList();
    } catch (e) {
      showToast('فشل الحذف: ' + e.message);
    }
  }

  // ===== REVIEWS MANAGEMENT =====
  window.renderReviewsDashboard = function() {
    const list = $('#reviewsDashboardList');
    if (!list) return;

    if (allReviews.length === 0) {
      list.innerHTML = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><p>لا توجد مراجعات حتى الآن.</p></div>`;
      return;
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateOpts = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: tz };

    list.innerHTML = allReviews.map(r => {
      const p = products.find(prod => prod.id === r.product_id);
      const pName = p ? (p.name_ar || p.name_en) : r.product_id;
      
      const full = Math.floor(r.rating || 0);
      const half = (r.rating || 0) - full >= 0.5 ? 1 : 0;
      const empty = 5 - full - half;
      const starSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      const emptyStarSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      const starsHtml = starSvg.repeat(full) + (half ? starSvg : '') + emptyStarSvg.repeat(empty);

      return `
        <div class="admin-review-card ${!r.is_approved ? 'unapproved' : ''}" data-id="${r.id}">
          <div class="review-card-header">
            <div>
              <div class="review-author">${r.author_name}</div>
              <div class="review-date">${new Date(r.created_at).toLocaleString('ar-EG', dateOpts)}</div>
            </div>
            <div class="review-product-badge">${pName}</div>
          </div>
          <div class="review-stars-val" style="display:flex; gap:2px; margin:0.5rem 0;">${starsHtml}</div>
          <p class="review-comment-val">${r.comment || '<i>بدون تعليق</i>'}</p>
          <div class="review-actions">
            <button class="btn btn-sm ${r.is_approved ? 'btn-secondary' : 'btn-success'}" onclick="window.toggleReviewApproval('${r.id}', ${r.is_approved})">
              ${r.is_approved ? 'إخفاء (عدم الموافقة)' : 'موافقة وعرض'}
            </button>
            <button class="btn btn-sm btn-danger" onclick="window.deleteReview('${r.id}')">حذف</button>
          </div>
        </div>
      `;
    }).join('');
  };

  window.toggleReviewApproval = async function(id, currentStatus) {
    if (!confirm(`هل تريد ${currentStatus ? 'إخفاء' : 'الموافقة على'} هذا التقييم؟`)) return;
    try {
      setSaveStatus('saving', 'جاري التحديث...');
      const { error } = await sb.from('reviews').update({ is_approved: !currentStatus }).eq('id', id);
      if (error) throw error;
      
      const idx = allReviews.findIndex(r => r.id === id);
      if (idx !== -1) allReviews[idx].is_approved = !currentStatus;
      
      setSaveStatus('saved', 'تم التحديث');
      renderReviewsDashboard();
    } catch (e) {
      setSaveStatus('error', 'فشل التحديث');
      showToast('فشل التحديث: ' + e.message);
    }
  };

  window.deleteReview = async function(id) {
    if (!confirm('هل أنت متأكد من حذف هذا التقييم نهائياً؟')) return;
    try {
      setSaveStatus('saving', 'جاري الحذف...');
      const { error } = await sb.from('reviews').delete().eq('id', id);
      if (error) throw error;
      
      allReviews = allReviews.filter(r => r.id !== id);
      
      setSaveStatus('saved', 'تم الحذف');
      renderReviewsDashboard();
    } catch (e) {
      setSaveStatus('error', 'فشل الحذف');
      showToast('فشل الحذف: ' + e.message);
    }
  };

  // ===== REFERRAL DASHBOARD =====
  async function renderReferralDashboard() {
    const container = $('#referralDashboard');
    if (!container) return;

    const myCode = currentAdmin?.referral_code;
    const isSuperAdmin = currentAdmin?.role === 'super_admin';

    const storeUrl = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
    const referralLink = myCode ? `${storeUrl}?ref=${myCode}` : '';

    let visitsData = [], ordersData = [];

    try {
      if (isSuperAdmin) {
        const { data: v } = await sb.from('referral_visits').select('*').order('created_at', { ascending: false });
        visitsData = v || [];
        const { data: o } = await sb.from('referral_orders').select('*').order('created_at', { ascending: false });
        ordersData = o || [];
      } else if (myCode) {
        const { data: v } = await sb.from('referral_visits').select('*').eq('referral_code', myCode).order('created_at', { ascending: false });
        visitsData = v || [];
        const { data: o } = await sb.from('referral_orders').select('*').eq('referral_code', myCode).order('created_at', { ascending: false });
        ordersData = o || [];
      }
    } catch (e) {
      console.error('Referral data error:', e);
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart); weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart); monthStart.setDate(weekStart.getDate() - 30);

    const myVisits = myCode ? visitsData.filter(v => v.referral_code === myCode) : visitsData;
    const myOrders = myCode && !isSuperAdmin ? ordersData : ordersData;

    const visitsToday = myVisits.filter(v => new Date(v.created_at) >= todayStart).length;
    const visitsWeek = myVisits.filter(v => new Date(v.created_at) >= weekStart).length;
    const visitsMonth = myVisits.filter(v => new Date(v.created_at) >= monthStart).length;
    const visitsTotal = myVisits.length;

    const confirmedOrders = myOrders.filter(o => o.status === 'confirmed' || o.status === 'paid');
    const totalSales = confirmedOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const commission = currentAdmin?.commission_percent || 0;
    const totalCommission = totalSales * commission / 100;

    container.innerHTML = `
      ${myCode ? `
      <div class="referral-link-box">
        <label>رابط الريفيرال الخاص بك</label>
        <div class="referral-link-row">
          <input type="text" value="${referralLink}" readonly id="refLinkInput">
          <button class="btn btn-primary" onclick="navigator.clipboard.writeText(document.getElementById('refLinkInput').value).then(()=>{document.getElementById('toast').textContent='تم النسخ!';document.getElementById('toast').classList.add('show');setTimeout(()=>document.getElementById('toast').classList.remove('show'),2500)})">نسخ</button>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">شارك هذا الرابط - كل زائر وكل عملية شراء تُحتسب لك</p>
      </div>` : ''}

      <div class="stats-grid">
        <div class="stat-card"><div class="stat-value">${visitsToday}</div><div class="stat-label">زوار اليوم</div></div>
        <div class="stat-card"><div class="stat-value">${visitsWeek}</div><div class="stat-label">زوار الأسبوع</div></div>
        <div class="stat-card"><div class="stat-value">${visitsMonth}</div><div class="stat-label">زوار الشهر</div></div>
        <div class="stat-card"><div class="stat-value">${visitsTotal}</div><div class="stat-label">إجمالي الزوار</div></div>
        <div class="stat-card highlight"><div class="stat-value">${confirmedOrders.length}</div><div class="stat-label">مبيعات مؤكدة</div></div>
        <div class="stat-card highlight"><div class="stat-value">$${totalSales.toFixed(2)}</div><div class="stat-label">إجمالي المبيعات</div></div>
        <div class="stat-card accent"><div class="stat-value">$${totalCommission.toFixed(2)}</div><div class="stat-label">العمولة المستحقة (${commission}%)</div></div>
        <div class="stat-card"><div class="stat-value">${myOrders.filter(o => o.status === 'pending').length}</div><div class="stat-label">طلبات معلّقة</div></div>
      </div>

      ${myOrders.length > 0 ? `
      <h3 style="margin:2rem 0 1rem;font-weight:600;">سجل المبيعات</h3>
      <div class="orders-table-wrapper">
        <table class="orders-table">
          <thead><tr><th>المنتج</th><th>المبلغ</th><th>كود الريفيرال</th><th>الحالة</th><th>التاريخ</th></tr></thead>
          <tbody>
            ${myOrders.slice(0, 50).map(o => `
              <tr>
                <td>${o.product_name || o.product_id || '—'}</td>
                <td>$${(o.amount||0).toFixed(2)}</td>
                <td><code>${o.referral_code}</code></td>
                <td><span class="order-status ${o.status}">${o.status === 'confirmed' ? 'مؤكد' : o.status === 'paid' ? 'مدفوع' : 'معلّق'}</span></td>
                <td>${new Date(o.created_at).toLocaleDateString('ar-EG')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>` : '<p style="text-align:center;color:var(--text-muted);padding:2rem;">لا توجد مبيعات بعد</p>'}
    `;
  }

  // ===== ORDERS MANAGEMENT (super_admin) =====
  async function renderOrdersList() {
    const container = $('#ordersList');
    if (!container) return;

    let custOrders = [];
    let refOrders = [];
    try {
      const { data: c } = await sb.from('customer_orders').select('*').order('created_at', { ascending: false });
      custOrders = c || [];
    } catch (e) { console.error(e); }
    try {
      const { data: r } = await sb.from('referral_orders').select('*').order('created_at', { ascending: false });
      refOrders = r || [];
    } catch (e) { console.error(e); }

    let html = '';

    // Customer Orders
    html += `<h3 style="margin:0 0 1rem;font-weight:700;">طلبات العملاء</h3>`;
    if (custOrders.length === 0) {
      html += '<p style="text-align:center;color:var(--text-muted);padding:1rem;">لا توجد طلبات عملاء بعد</p>';
    } else {
      html += `<div class="orders-table-wrapper"><table class="orders-table">
        <thead><tr><th>المنتج</th><th>العميل</th><th>المبلغ</th><th>طريقة الدفع</th><th>الحالة</th><th>التاريخ</th><th>تفاصيل</th><th>إجراء</th></tr></thead>
        <tbody>${custOrders.map(o => {
          const reqs = o.requirements_data || {};
          const reqEntries = Object.entries(reqs);
          const statusLabels = { pending: 'بانتظار', confirmed: 'مؤكد', completed: 'مكتمل' };
          return `<tr>
            <td>${o.product_name || '—'}</td>
            <td><strong>${o.customer_name || '—'}</strong>${o.customer_email ? `<br><small>${o.customer_email}</small>` : ''}</td>
            <td>${(o.amount||0)} ${o.currency||'USD'}</td>
            <td>${o.payment_method || '—'}</td>
            <td><span class="order-status ${o.status}">${statusLabels[o.status] || o.status}</span></td>
            <td>${new Date(o.created_at).toLocaleDateString('ar-EG')}</td>
            <td>${reqEntries.length > 0 ? `<button class="btn btn-secondary" style="padding:0.3rem 0.6rem;font-size:0.75rem;" data-toggle-reqs="${o.id}">عرض</button><div class="req-details" id="reqs-${o.id}" style="display:none;margin-top:0.5rem;">${reqEntries.map(([k,v]) => `<div style="font-size:0.78rem;"><strong>${k}:</strong> ${v}</div>`).join('')}</div>` : '—'}</td>
            <td>
              <select class="cust-status-select" data-cust-id="${o.id}" style="padding:0.3rem;font-size:0.78rem;border-radius:4px;border:1px solid var(--border);">
                <option value="pending" ${o.status==='pending'?'selected':''}>بانتظار</option>
                <option value="confirmed" ${o.status==='confirmed'?'selected':''}>مؤكد</option>
                <option value="completed" ${o.status==='completed'?'selected':''}>مكتمل</option>
              </select>
            </td>
          </tr>`;
        }).join('')}</tbody>
      </table></div>`;
    }

    // Referral Orders
    html += `<h3 style="margin:2rem 0 1rem;font-weight:700;">طلبات الريفيرال</h3>`;
    if (refOrders.length === 0) {
      html += '<p style="text-align:center;color:var(--text-muted);padding:1rem;">لا توجد طلبات ريفيرال بعد</p>';
    } else {
      html += `<div class="orders-table-wrapper"><table class="orders-table">
        <thead><tr><th>المنتج</th><th>المبلغ</th><th>كود الريفيرال</th><th>الحالة</th><th>التاريخ</th><th>إجراء</th></tr></thead>
        <tbody>${refOrders.map(o => `<tr>
          <td>${o.product_name || '—'}</td>
          <td>$${(o.amount||0).toFixed(2)}</td>
          <td><code>${o.referral_code}</code></td>
          <td><span class="order-status ${o.status}">${o.status === 'confirmed' ? 'مؤكد' : o.status === 'paid' ? 'مدفوع' : 'معلّق'}</span></td>
          <td>${new Date(o.created_at).toLocaleDateString('ar-EG')}</td>
          <td>
            ${o.status === 'pending' ? `<button class="btn btn-primary" style="padding:0.4rem 0.8rem;font-size:0.8rem;" data-ref-order-id="${o.id}" data-action="confirm">تأكيد</button>` : ''}
            ${o.status === 'confirmed' ? `<button class="btn btn-primary" style="padding:0.4rem 0.8rem;font-size:0.8rem;" data-ref-order-id="${o.id}" data-action="pay">دفع عمولة</button>` : ''}
          </td>
        </tr>`).join('')}</tbody>
      </table></div>`;
    }

    container.innerHTML = html;

    // Toggle requirements details
    container.querySelectorAll('[data-toggle-reqs]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.toggleReqs;
        const el = document.getElementById('reqs-' + id);
        if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
      });
    });

    // Customer order status change
    container.querySelectorAll('.cust-status-select').forEach(sel => {
      sel.addEventListener('change', async () => {
        try {
          const { error } = await sb.from('customer_orders').update({ status: sel.value }).eq('id', sel.dataset.custId);
          if (error) throw error;
          showToast('تم تحديث حالة الطلب');
        } catch (e) { showToast('فشل: ' + e.message); }
      });
    });

    // Referral order actions
    container.querySelectorAll('[data-ref-order-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const orderId = btn.dataset.refOrderId;
        const action = btn.dataset.action;
        const newStatus = action === 'confirm' ? 'confirmed' : 'paid';
        try {
          const { error } = await sb.from('referral_orders').update({
            status: newStatus,
            confirmed_by: currentAdmin?.id
          }).eq('id', orderId);
          if (error) throw error;
          showToast(action === 'confirm' ? 'تم تأكيد الطلب' : 'تم تسجيل الدفع');
          renderOrdersList();
        } catch (e) { showToast('فشل: ' + e.message); }
      });
    });
  }

  function openOrderModal() {
    $('#orderModalTitle').textContent = 'تسجيل طلب جديد';
    const body = $('#orderModalBody');

    const adminOptions = admins.filter(a => a.referral_code).map(a =>
      `<option value="${a.referral_code}">${a.name} (${a.referral_code})</option>`
    ).join('');

    const productOptions = products.map(p =>
      `<option value="${p.id}" data-price="${p.price}" data-name="${p.name_ar}">${p.name_ar} - $${p.price}</option>`
    ).join('');

    body.innerHTML = `
      <form id="addOrderForm">
        <div class="form-group"><label>كود الريفيرال</label>
          <select id="orderRefCode"><option value="">— بدون ريفيرال —</option>${adminOptions}</select>
        </div>
        <div class="form-group"><label>المنتج</label>
          <select id="orderProduct">${productOptions}</select>
        </div>
        <div class="form-group"><label>المبلغ</label><input type="number" id="orderAmount" step="0.01" min="0"></div>
        <div class="form-group"><label>الحالة</label>
          <select id="orderStatus"><option value="pending">معلّق</option><option value="confirmed">مؤكد</option><option value="paid">مدفوع</option></select>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('orderModal').classList.remove('active');document.body.style.overflow=''">إلغاء</button>
          <button type="submit" class="btn btn-primary">تسجيل</button>
        </div>
      </form>
    `;

    const prodSel = body.querySelector('#orderProduct');
    const amtInput = body.querySelector('#orderAmount');
    if (prodSel.options.length > 0) {
      amtInput.value = prodSel.options[0].dataset.price || 0;
    }
    prodSel.addEventListener('change', () => {
      const opt = prodSel.options[prodSel.selectedIndex];
      amtInput.value = opt.dataset.price || 0;
    });

    body.querySelector('#addOrderForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const refCode = $('#orderRefCode').value;
      const prodEl = $('#orderProduct');
      const prodOpt = prodEl.options[prodEl.selectedIndex];

      const refAdmin = refCode ? admins.find(a => a.referral_code === refCode) : null;

      try {
        const { error } = await sb.from('referral_orders').insert({
          referral_code: refCode || 'direct',
          admin_id: refAdmin?.id || null,
          product_id: prodEl.value,
          product_name: prodOpt?.dataset?.name || '',
          amount: parseFloat($('#orderAmount').value) || 0,
          currency: 'USD',
          status: $('#orderStatus').value,
          confirmed_by: currentAdmin?.id
        });
        if (error) throw error;
        showToast('تم تسجيل الطلب');
        renderOrdersList();
        $('#orderModal').classList.remove('active');
        document.body.style.overflow = '';
      } catch (e) {
        showToast('فشل: ' + e.message);
      }
    });

    $('#orderModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ===== HELPERS =====
  function generateId(name) {
    return name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').substring(0, 40) || 'product-' + Date.now();
  }

  function showToast(msg) {
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function setSaveStatus(type, text) {
    const el = $('#saveStatus');
    el.className = 'save-status ' + type;
    el.textContent = text;
    if (type === 'saved') setTimeout(() => { el.className = 'save-status'; el.textContent = ''; }, 3000);
  }

  // ===== THEME =====
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // ===== SIDEBAR =====
  function initSidebar() {
    const toggle = $('#sidebarToggle');
    const sidebar = $('#sidebar');
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    sidebar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
      });
    });
  }

  // ===== MODAL HELPERS =====
  function initModals() {
    const modals = ['productModal', 'adminModal', 'orderModal'];
    modals.forEach(id => {
      const modal = $(`#${id}`);
      const close = $(`#${id}Close`);
      if (close) close.addEventListener('click', () => { modal.classList.remove('active'); document.body.style.overflow = ''; });
      if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modals.forEach(id => { $(`#${id}`).classList.remove('active'); document.body.style.overflow = ''; });
    });
  }

  // ===== INIT =====
  async function init() {
    initSupabase();
    initTheme();
    initSidebar();
    initTabs();
    initModals();

    $('#adminThemeToggle').addEventListener('click', toggleTheme);
    $('#logoutBtn').addEventListener('click', logout);
    $('#addProductBtn').addEventListener('click', () => openProductModal(-1));
    $('#addCategoryBtn').addEventListener('click', () => showCategoryForm(-1));
    if ($('#addAdminBtn')) $('#addAdminBtn').addEventListener('click', openAdminModal);
    if ($('#addOrderBtn')) $('#addOrderBtn').addEventListener('click', openOrderModal);

    $('#saveSettingsBtn').addEventListener('click', collectAndSaveSettings);
    $('#savePaymentBtn').addEventListener('click', collectAndSavePayment);

    $('#loginForm').addEventListener('submit', handleAuth);
    $('#forgotForm').addEventListener('submit', handleForgotPassword);
    $('#toggleForgot').addEventListener('click', toggleForgotMode);

    if (!isSupabaseConfigured()) {
      showToast('يجب إعداد Supabase أولاً - عدّل js/supabase-config.js');
      return;
    }

    await checkBootstrap();

    const hasSession = await checkSession();
    if (hasSession) {
      await loadAllData();
      showDashboard();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

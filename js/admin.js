(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  let ghConfig = { owner: '', repo: '', token: '' };
  let products = [];
  let settings = {};
  let productsSha = '';
  let settingsSha = '';
  let currentTab = 'products';

  // ===== GITHUB API =====
  const gh = {
    baseUrl: 'https://api.github.com',

    headers() {
      return {
        'Authorization': `token ${ghConfig.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      };
    },

    async getFile(path) {
      const res = await fetch(`${this.baseUrl}/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${path}`, {
        headers: this.headers()
      });
      if (!res.ok) throw new Error(`Failed to get ${path}: ${res.status}`);
      const data = await res.json();
      const bytes = Uint8Array.from(atob(data.content), c => c.charCodeAt(0));
      const decoded = new TextDecoder('utf-8').decode(bytes);
      const content = JSON.parse(decoded);
      return { content, sha: data.sha };
    },

    async updateFile(path, content, sha, message) {
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));
      const body = { message, content: encoded, sha };

      const res = await fetch(`${this.baseUrl}/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${path}`, {
        method: 'PUT',
        headers: this.headers(),
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `Failed to update ${path}`);
      }
      const data = await res.json();
      return data.content.sha;
    },

    async uploadImage(path, base64Data, message) {
      const existing = await this.checkFileExists(path);
      const body = { message, content: base64Data };
      if (existing) body.sha = existing;

      const res = await fetch(`${this.baseUrl}/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${path}`, {
        method: 'PUT',
        headers: this.headers(),
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(`Failed to upload image: ${res.status}`);
      return await res.json();
    },

    async checkFileExists(path) {
      try {
        const res = await fetch(`${this.baseUrl}/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${path}`, {
          headers: this.headers()
        });
        if (res.ok) {
          const data = await res.json();
          return data.sha;
        }
      } catch (e) { /* file doesn't exist */ }
      return null;
    },

    async verifyAccess() {
      const res = await fetch(`${this.baseUrl}/repos/${ghConfig.owner}/${ghConfig.repo}`, {
        headers: this.headers()
      });
      if (!res.ok) throw new Error('Cannot access repository');
      return await res.json();
    }
  };

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

  // ===== LOGIN =====
  function initLogin() {
    const saved = localStorage.getItem('ghConfig');
    if (saved) {
      try {
        ghConfig = JSON.parse(saved);
        if (ghConfig.owner && ghConfig.repo && ghConfig.token) {
          $('#ghOwner').value = ghConfig.owner;
          $('#ghRepo').value = ghConfig.repo;
          $('#ghToken').value = ghConfig.token;
        }
      } catch (e) { /* invalid saved config */ }
    }

    $('#loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> جاري الاتصال...';

      ghConfig.owner = $('#ghOwner').value.trim();
      ghConfig.repo = $('#ghRepo').value.trim();
      ghConfig.token = $('#ghToken').value.trim();

      try {
        await gh.verifyAccess();
        localStorage.setItem('ghConfig', JSON.stringify(ghConfig));
        await loadAdminData();
        showDashboard();
      } catch (err) {
        showToast('فشل الاتصال: تأكد من البيانات والصلاحيات');
        btn.disabled = false;
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> دخول`;
      }
    });
  }

  function showDashboard() {
    $('#loginScreen').style.display = 'none';
    $('#dashboard').style.display = 'flex';
    renderProductsList();
    renderSettingsForm();
    renderPaymentForm();
    renderCategoriesList();
  }

  function logout() {
    localStorage.removeItem('ghConfig');
    ghConfig = { owner: '', repo: '', token: '' };
    $('#loginScreen').style.display = '';
    $('#dashboard').style.display = 'none';
    $('#ghToken').value = '';
  }

  // ===== DATA =====
  async function loadAdminData() {
    try {
      const [prodData, settData] = await Promise.all([
        gh.getFile('data/products.json'),
        gh.getFile('data/settings.json')
      ]);
      products = prodData.content.products || [];
      productsSha = prodData.sha;
      settings = settData.content;
      settingsSha = settData.sha;
    } catch (e) {
      console.error('Load data error:', e);
      products = [];
      settings = {};
      showToast('تعذر تحميل البيانات - تأكد من وجود ملفات JSON في الريبو');
    }
  }

  async function saveProducts(message) {
    setSaveStatus('saving', 'جاري الحفظ...');
    try {
      const data = { products };
      productsSha = await gh.updateFile('data/products.json', data, productsSha, message || 'Update products');
      setSaveStatus('saved', 'تم الحفظ');
      showToast('تم حفظ المنتجات بنجاح');
    } catch (e) {
      setSaveStatus('error', 'فشل الحفظ');
      showToast('فشل في الحفظ: ' + e.message);
    }
  }

  async function saveSettings(message) {
    setSaveStatus('saving', 'جاري الحفظ...');
    try {
      settingsSha = await gh.updateFile('data/settings.json', settings, settingsSha, message || 'Update settings');
      setSaveStatus('saved', 'تم الحفظ');
      showToast('تم حفظ الإعدادات بنجاح');
    } catch (e) {
      setSaveStatus('error', 'فشل الحفظ');
      showToast('فشل في الحفظ: ' + e.message);
    }
  }

  function setSaveStatus(type, text) {
    const el = $('#saveStatus');
    el.className = 'save-status ' + type;
    el.textContent = text;
    if (type === 'saved') {
      setTimeout(() => { el.className = 'save-status'; el.textContent = ''; }, 3000);
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
      });
    });
  }

  // ===== PRODUCTS LIST =====
  function renderProductsList() {
    const list = $('#adminProductsList');

    if (products.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>لا توجد منتجات بعد - أضف أول منتج</p>
        </div>
      `;
      return;
    }

    list.innerHTML = products.map((p, i) => `
      <div class="admin-product-card" data-index="${i}">
        <div class="admin-product-img">
          <img src="${p.image}" alt="" onerror="this.style.display='none'">
        </div>
        <div class="admin-product-details">
          <h4>${p.name_ar || p.name_en || 'بدون اسم'}</h4>
          <p>${p.category} &bull; ${p.duration_ar || p.duration_en || ''} &bull; <span class="status-badge ${p.available !== false ? 'available' : 'unavailable'}">${p.available !== false ? 'متوفر' : 'غير متوفر'}</span></p>
        </div>
        <span class="admin-product-price">${p.price} ${p.currency || 'USD'}</span>
        <div class="admin-product-actions">
          <button class="btn-icon edit" data-index="${i}" title="تعديل">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon delete" data-index="${i}" title="حذف">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.btn-icon.edit').forEach(btn => {
      btn.addEventListener('click', () => openProductModal(parseInt(btn.dataset.index)));
    });

    list.querySelectorAll('.btn-icon.delete').forEach(btn => {
      btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.index)));
    });
  }

  // ===== PRODUCT MODAL =====
  function openProductModal(index) {
    const isNew = index === -1;
    const p = isNew ? {
      id: '', name_ar: '', name_en: '', description_ar: '', description_en: '',
      price: 0, currency: 'USD', category: 'streaming', image: '',
      duration_ar: '', duration_en: '', available: true, featured: false,
      payment_links: { paypal: '', stripe: '', whatsapp_message: '' }
    } : { ...products[index], payment_links: { ...products[index].payment_links } };

    $('#productModalTitle').textContent = isNew ? 'إضافة منتج جديد' : 'تعديل المنتج';

    const body = $('#productModalBody');
    body.innerHTML = `
      <form class="modal-form" id="productForm">
        <div class="form-row">
          <div class="form-group">
            <label>اسم المنتج (عربي)</label>
            <input type="text" id="pNameAr" value="${p.name_ar}" required>
          </div>
          <div class="form-group">
            <label>Product Name (English)</label>
            <input type="text" id="pNameEn" value="${p.name_en}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>الوصف (عربي)</label>
            <textarea id="pDescAr">${p.description_ar}</textarea>
          </div>
          <div class="form-group">
            <label>Description (English)</label>
            <textarea id="pDescEn">${p.description_en}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>السعر</label>
            <input type="number" id="pPrice" value="${p.price}" step="0.01" min="0" required>
          </div>
          <div class="form-group">
            <label>العملة</label>
            <select id="pCurrency">
              <option value="USD" ${p.currency === 'USD' ? 'selected' : ''}>USD</option>
              <option value="EUR" ${p.currency === 'EUR' ? 'selected' : ''}>EUR</option>
              <option value="SAR" ${p.currency === 'SAR' ? 'selected' : ''}>SAR</option>
              <option value="AED" ${p.currency === 'AED' ? 'selected' : ''}>AED</option>
              <option value="EGP" ${p.currency === 'EGP' ? 'selected' : ''}>EGP</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>الفئة</label>
            <select id="pCategory">
              ${getCustomCategories().map(c => `<option value="${c.id}" ${p.category === c.id ? 'selected' : ''}>${c.name_ar} / ${c.name_en}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>المدة (عربي / إنجليزي)</label>
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
            <svg class="upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p>اسحب صورة هنا أو انقر للاختيار</p>
            ${p.image ? `<div class="image-preview"><img src="${p.image}" alt=""><span>${p.image}</span></div>` : ''}
          </div>
          <div class="form-group" style="margin-top:0.5rem;">
            <label>أو أدخل رابط الصورة مباشرة</label>
            <input type="text" id="pImageUrl" value="${p.image}" placeholder="images/product.png">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="pAvailable" ${p.available !== false ? 'checked' : ''}>
              متوفر للبيع
            </label>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="pFeatured" ${p.featured ? 'checked' : ''}>
              منتج مميز
            </label>
          </div>
        </div>

        <h4 style="margin:1rem 0 0.5rem;font-weight:600;">روابط الدفع</h4>
        <div class="form-group">
          <label>رابط PayPal</label>
          <input type="text" id="pPaypal" value="${p.payment_links?.paypal || ''}" placeholder="https://paypal.me/username/5">
        </div>
        <div class="form-group">
          <label>رابط Stripe</label>
          <input type="text" id="pStripe" value="${p.payment_links?.stripe || ''}" placeholder="https://buy.stripe.com/xxx">
        </div>
        <div class="form-group">
          <label>رسالة واتساب</label>
          <input type="text" id="pWhatsapp" value="${p.payment_links?.whatsapp_message || ''}" placeholder="أريد شراء...">
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancelProduct">إلغاء</button>
          <button type="submit" class="btn btn-primary">${isNew ? 'إضافة' : 'حفظ التعديلات'}</button>
        </div>
      </form>
    `;

    const imageFile = $('#pImageFile');
    imageFile.addEventListener('change', handleImagePreview);

    $('#cancelProduct').addEventListener('click', closeProductModal);
    $('#productForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveProduct(isNew, index);
    });

    $('#productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function handleImagePreview(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = document.querySelector('#imageUploadArea .image-preview');
      if (preview) preview.remove();

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

    if (!nameAr && !nameEn) {
      showToast('يجب إدخال اسم المنتج');
      return;
    }

    const product = {
      id: isNew ? generateId(nameEn || nameAr) : products[index].id,
      name_ar: nameAr,
      name_en: nameEn,
      description_ar: $('#pDescAr').value.trim(),
      description_en: $('#pDescEn').value.trim(),
      price: parseFloat($('#pPrice').value) || 0,
      currency: $('#pCurrency').value,
      category: $('#pCategory').value,
      image: $('#pImageUrl').value.trim(),
      duration_ar: $('#pDurAr').value.trim(),
      duration_en: $('#pDurEn').value.trim(),
      available: $('#pAvailable').checked,
      featured: $('#pFeatured').checked,
      payment_links: {
        paypal: $('#pPaypal').value.trim(),
        stripe: $('#pStripe').value.trim(),
        whatsapp_message: $('#pWhatsapp').value.trim()
      }
    };

    const imageFile = $('#pImageFile').files[0];
    if (imageFile) {
      try {
        setSaveStatus('saving', 'جاري رفع الصورة...');
        const base64 = await fileToBase64(imageFile);
        const ext = imageFile.name.split('.').pop();
        const imagePath = `images/${product.id}.${ext}`;
        await gh.uploadImage(imagePath, base64, `Upload image for ${product.id}`);
        product.image = imagePath;
      } catch (e) {
        showToast('فشل رفع الصورة: ' + e.message);
      }
    }

    if (isNew) {
      products.push(product);
    } else {
      products[index] = product;
    }

    await saveProducts(isNew ? `Add product: ${product.name_en || product.name_ar}` : `Update product: ${product.name_en || product.name_ar}`);
    renderProductsList();
    closeProductModal();
  }

  async function deleteProduct(index) {
    const p = products[index];
    if (!confirm(`هل أنت متأكد من حذف "${p.name_ar || p.name_en}"؟`)) return;

    products.splice(index, 1);
    await saveProducts(`Delete product: ${p.name_en || p.name_ar}`);
    renderProductsList();
  }

  function closeProductModal() {
    $('#productModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== SETTINGS FORM =====
  function renderSettingsForm() {
    const store = settings.store || {};
    const social = settings.social || {};

    const form = $('#settingsForm');
    form.innerHTML = `
      <div class="settings-section">
        <h3>معلومات المتجر</h3>
        <div class="form-row">
          <div class="form-group">
            <label>اسم المتجر (عربي)</label>
            <input type="text" id="sNameAr" value="${store.name_ar || ''}">
          </div>
          <div class="form-group">
            <label>Store Name (English)</label>
            <input type="text" id="sNameEn" value="${store.name_en || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>الوصف (عربي)</label>
            <textarea id="sDescAr">${store.description_ar || ''}</textarea>
          </div>
          <div class="form-group">
            <label>Description (English)</label>
            <textarea id="sDescEn">${store.description_en || ''}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>عنوان البانر (عربي)</label>
            <input type="text" id="sHeroAr" value="${store.hero_ar || ''}">
          </div>
          <div class="form-group">
            <label>Hero Title (English)</label>
            <input type="text" id="sHeroEn" value="${store.hero_en || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>نص البانر الفرعي (عربي)</label>
            <textarea id="sHeroSubAr">${store.hero_sub_ar || ''}</textarea>
          </div>
          <div class="form-group">
            <label>Hero Subtitle (English)</label>
            <textarea id="sHeroSubEn">${store.hero_sub_en || ''}</textarea>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h3>روابط التواصل</h3>
        <div class="form-group">
          <label>رقم واتساب (بدون +)</label>
          <input type="text" id="sSocialWa" value="${social.whatsapp || ''}" placeholder="966500000000">
        </div>
        <div class="form-group">
          <label>يوزر تيليجرام</label>
          <input type="text" id="sSocialTg" value="${social.telegram || ''}" placeholder="username">
        </div>
        <div class="form-group">
          <label>البريد الإلكتروني</label>
          <input type="email" id="sSocialEmail" value="${social.email || ''}" placeholder="contact@example.com">
        </div>
      </div>
    `;
  }

  function collectSettings() {
    settings.store = {
      ...settings.store,
      name_ar: $('#sNameAr').value.trim(),
      name_en: $('#sNameEn').value.trim(),
      description_ar: $('#sDescAr').value.trim(),
      description_en: $('#sDescEn').value.trim(),
      hero_ar: $('#sHeroAr').value.trim(),
      hero_en: $('#sHeroEn').value.trim(),
      hero_sub_ar: $('#sHeroSubAr').value.trim(),
      hero_sub_en: $('#sHeroSubEn').value.trim()
    };
    settings.social = {
      whatsapp: $('#sSocialWa').value.trim(),
      telegram: $('#sSocialTg').value.trim(),
      email: $('#sSocialEmail').value.trim()
    };
  }

  // ===== PAYMENT FORM =====
  function renderPaymentForm() {
    const pay = settings.payment || {};
    const form = $('#paymentForm');

    form.innerHTML = `
      <div class="settings-section">
        <h3>PayPal</h3>
        <div class="switch-wrapper">
          <span>تفعيل PayPal</span>
          <label class="switch">
            <input type="checkbox" id="payPaypalEnabled" ${pay.paypal?.enabled ? 'checked' : ''}>
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="form-group">
          <label>رابط PayPal.me</label>
          <input type="text" id="payPaypalLink" value="${pay.paypal?.link || ''}" placeholder="https://paypal.me/username">
        </div>
      </div>

      <div class="settings-section">
        <h3>Stripe Payment Links</h3>
        <div class="switch-wrapper">
          <span>تفعيل Stripe</span>
          <label class="switch">
            <input type="checkbox" id="payStripeEnabled" ${pay.stripe?.enabled ? 'checked' : ''}>
            <span class="switch-slider"></span>
          </label>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">أنشئ رابط دفع لكل منتج من <a href="https://dashboard.stripe.com/payment-links" target="_blank" style="color:var(--primary);">لوحة Stripe</a> ثم أضفه في إعدادات المنتج</p>
      </div>

      <div class="settings-section">
        <h3>واتساب</h3>
        <div class="switch-wrapper">
          <span>تفعيل واتساب</span>
          <label class="switch">
            <input type="checkbox" id="payWhatsappEnabled" ${pay.whatsapp?.enabled ? 'checked' : ''}>
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="form-group">
          <label>رقم واتساب (بدون +)</label>
          <input type="text" id="payWhatsappNumber" value="${pay.whatsapp?.number || ''}" placeholder="966500000000">
        </div>
      </div>

      <div class="settings-section">
        <h3>عملات رقمية</h3>
        <div class="switch-wrapper">
          <span>تفعيل العملات الرقمية</span>
          <label class="switch">
            <input type="checkbox" id="payCryptoEnabled" ${pay.crypto?.enabled ? 'checked' : ''}>
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="form-group">
          <label>عنوان USDT (TRC20)</label>
          <input type="text" id="payCryptoUsdt" value="${pay.crypto?.wallets?.usdt_trc20 || ''}" placeholder="TXxxxxxxxxxxxxxxxxxxxxxxxxxxxx">
        </div>
        <div class="form-group">
          <label>عنوان BTC</label>
          <input type="text" id="payCryptoBtc" value="${pay.crypto?.wallets?.btc || ''}" placeholder="bc1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx">
        </div>
        <div class="form-group">
          <label>Binance ID (Pay)</label>
          <input type="text" id="payCryptoBinance" value="${pay.crypto?.wallets?.binance_id || ''}" placeholder="123456789">
        </div>
      </div>
    `;
  }

  function collectPayment() {
    settings.payment = {
      paypal: {
        enabled: $('#payPaypalEnabled').checked,
        link: $('#payPaypalLink').value.trim(),
        label_ar: 'باي بال',
        label_en: 'PayPal'
      },
      stripe: {
        enabled: $('#payStripeEnabled').checked,
        label_ar: 'بطاقة ائتمان',
        label_en: 'Credit Card (Stripe)'
      },
      whatsapp: {
        enabled: $('#payWhatsappEnabled').checked,
        number: $('#payWhatsappNumber').value.trim(),
        label_ar: 'واتساب',
        label_en: 'WhatsApp'
      },
      crypto: {
        enabled: $('#payCryptoEnabled').checked,
        wallets: {
          usdt_trc20: $('#payCryptoUsdt').value.trim(),
          btc: $('#payCryptoBtc').value.trim(),
          binance_id: $('#payCryptoBinance').value.trim()
        },
        label_ar: 'عملات رقمية',
        label_en: 'Cryptocurrency'
      }
    };
  }

  // ===== CATEGORIES =====
  function getCustomCategories() {
    return (settings.categories || []).filter(c => c.id !== 'all');
  }

  function renderCategoriesList() {
    const list = $('#adminCategoriesList');
    const cats = settings.categories || [];

    if (cats.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          <p>لا توجد فئات - أضف أول فئة</p>
        </div>
      `;
      return;
    }

    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'];

    list.innerHTML = cats.map((c, i) => {
      const isAll = c.id === 'all';
      const prodCount = isAll ? products.length : products.filter(p => p.category === c.id).length;
      return `
        <div class="admin-cat-card ${isAll ? 'is-all' : ''}" data-index="${i}">
          <span class="cat-color-dot" style="background:${colors[i % colors.length]}"></span>
          <div class="admin-cat-details">
            <h4>${c.name_ar} / ${c.name_en}</h4>
            <p>ID: ${c.id} &bull; ${prodCount} منتج</p>
          </div>
          <span class="admin-cat-id">${c.id}</span>
          ${!isAll ? `
            <div class="admin-cat-actions">
              <button class="btn-icon edit" data-index="${i}" title="تعديل">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn-icon delete" data-index="${i}" title="حذف">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          ` : '<span style="font-size:0.75rem;color:var(--text-muted);">تلقائي</span>'}
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
    const cat = isNew ? { id: '', name_ar: '', name_en: '' } : { ...settings.categories[index] };
    const list = $('#adminCategoriesList');

    const existingForm = list.querySelector('.cat-inline-form');
    if (existingForm) existingForm.remove();

    const form = document.createElement('div');
    form.className = 'cat-inline-form';
    form.innerHTML = `
      <div class="form-group">
        <label>المعرّف (ID) - إنجليزي بدون مسافات</label>
        <input type="text" id="catId" value="${cat.id}" placeholder="education" ${!isNew ? 'readonly style="opacity:0.6"' : ''}>
      </div>
      <div class="form-group">
        <label>الاسم بالعربي</label>
        <input type="text" id="catNameAr" value="${cat.name_ar}" placeholder="تعليم">
      </div>
      <div class="form-group">
        <label>Name in English</label>
        <input type="text" id="catNameEn" value="${cat.name_en}" placeholder="Education">
      </div>
      <div class="cat-form-actions">
        <button class="btn btn-primary" id="saveCatBtn">${isNew ? 'إضافة' : 'حفظ'}</button>
        <button class="btn btn-secondary" id="cancelCatBtn">إلغاء</button>
      </div>
    `;

    if (isNew) {
      list.prepend(form);
    } else {
      const card = list.querySelector(`[data-index="${index}"]`);
      if (card) card.after(form);
    }

    form.querySelector('#saveCatBtn').addEventListener('click', async () => {
      const id = $('#catId').value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      const nameAr = $('#catNameAr').value.trim();
      const nameEn = $('#catNameEn').value.trim();

      if (!id || !nameAr || !nameEn) {
        showToast('يجب تعبئة جميع الحقول');
        return;
      }

      if (isNew && settings.categories.some(c => c.id === id)) {
        showToast('هذا المعرّف موجود مسبقاً');
        return;
      }

      if (isNew) {
        settings.categories.push({ id, name_ar: nameAr, name_en: nameEn, icon: 'tag' });
      } else {
        settings.categories[index].name_ar = nameAr;
        settings.categories[index].name_en = nameEn;
      }

      await saveSettings(isNew ? `Add category: ${nameEn}` : `Update category: ${nameEn}`);
      renderCategoriesList();
    });

    form.querySelector('#cancelCatBtn').addEventListener('click', () => form.remove());

    form.querySelector('#catId')?.focus();
  }

  async function deleteCategory(index) {
    const cat = settings.categories[index];
    const usedCount = products.filter(p => p.category === cat.id).length;

    let msg = `هل أنت متأكد من حذف فئة "${cat.name_ar}"؟`;
    if (usedCount > 0) {
      msg += `\n\nتنبيه: يوجد ${usedCount} منتج مرتبط بهذه الفئة. المنتجات لن تُحذف لكن فئتها ستصبح غير معروفة.`;
    }

    if (!confirm(msg)) return;

    settings.categories.splice(index, 1);
    await saveSettings(`Delete category: ${cat.name_en || cat.name_ar}`);
    renderCategoriesList();
  }

  // ===== HELPERS =====
  function generateId(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 40) || 'product-' + Date.now();
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function showToast(msg) {
    const toast = $('#toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ===== SIDEBAR MOBILE =====
  function initSidebar() {
    const toggle = $('#sidebarToggle');
    const sidebar = $('#sidebar');

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    sidebar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
      });
    });
  }

  // ===== INIT =====
  function init() {
    initTheme();
    initLogin();
    initTabs();
    initSidebar();

    $('#adminThemeToggle').addEventListener('click', toggleTheme);
    $('#logoutBtn').addEventListener('click', logout);
    $('#addProductBtn').addEventListener('click', () => openProductModal(-1));
    $('#addCategoryBtn').addEventListener('click', () => showCategoryForm(-1));
    $('#productModalClose').addEventListener('click', closeProductModal);
    $('#productModal').addEventListener('click', (e) => {
      if (e.target === $('#productModal')) closeProductModal();
    });

    $('#saveSettingsBtn').addEventListener('click', async () => {
      collectSettings();
      await saveSettings('Update store settings');
    });

    $('#savePaymentBtn').addEventListener('click', async () => {
      collectPayment();
      await saveSettings('Update payment settings');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProductModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

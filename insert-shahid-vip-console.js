// ================================================
// SPARK STORE - INSERT SHAHID VIP PRODUCT
// Source: z2u.com
// Paste this in the browser console while on the ADMIN PAGE (after login)
// ================================================
(async () => {
  const Z2U = 'https://www.z2u.com';
  const now = new Date().toISOString();
  
  const product = {
    id: 'shahid-vip-shared-global',
    name_ar: 'شاهد VIP حساب مشترك - عالمي',
    name_en: 'Shahid VIP Shared account - Global',
    description_ar: 'عالم من الترفيه VIP ومميزاته + دوري روشن السعودي، WWE، رياضات قتالية والمزيد عن طريق حساب مشترك رسمي. تفعيل عالمي.',
    description_en: 'The world of VIP entertainment and its benefits + Saudi Roshen League, WWE, Fight Sports and more via shared official account. Global activation.',
    features_ar: 'دوري روشن السعودي و WWE\nشاهد الأعمال الأصلية والعروض الأولى الحصرية\nبث حي بدقة Full HD\nإمكانية المشاهدة بدون إنترنت (تحميل)\nمحتوى آمن للأطفال\nيعمل على جميع الأجهزة',
    features_en: 'Saudi Roshen League & WWE\nWatch original works and exclusive premieres\nLive broadcast in Full HD\nWatch offline (Download)\nSafe content for children\nWorks on all devices',
    price: 5.19, // Starting from (1.99 * 1.1 + 3)
    currency: 'USD',
    category: 'entertainment', // Standard category for streaming
    available: true,
    featured: true,
    image: 'https://img.z2u.com/images/product/20230526/418664/1685116800.jpg',
    duration_ar: 'تبدأ من شهر', duration_en: 'Starting from 1 Month', 
    requirements_ar: 'يتم إرسال بيانات الحساب (إيميل وباسورد)', requirements_en: 'Account details (Email & Password) will be sent',
    source_url: `https://www.z2u.com/product-418664/Shahid-vip-Shared-account-1-month-Global.html`,
    subscription_plans: [
      { 
        label_ar: 'شهر واحد', label_en: '1 Month', 
        cost_price: 1.99, profit_margin: 1.1, fixed_fee: 3, 
        price: 5.19, 
        source_url: `https://www.z2u.com/product-418664/Shahid-vip-Shared-account-1-month-Global.html`,
        is_active: true
      },
      { 
        label_ar: '3 أشهر', label_en: '3 Months', 
        cost_price: 4.49, profit_margin: 1.1, fixed_fee: 3, 
        price: 7.94, 
        source_url: `https://www.z2u.com/Shahid-vip-Shared-account-3-months-Global.html`, // Estimated search URL
        is_active: true
      },
      { 
        label_ar: 'سنة كاملة', label_en: '1 Year', 
        cost_price: 13.00, profit_margin: 1.1, fixed_fee: 3, 
        price: 17.30, 
        source_url: `https://www.z2u.com/Shahid-vip-Shared-account-12-months-Global.html`, // Estimated search URL
        is_active: true
      }
    ],
    payment_links: { paypal: '', stripe: '', whatsapp_message: '' },
    sort_order: 10,
    updated_at: now
  };

  console.log('%c⚡ Spark - Inserting Shahid VIP...', 'color:#00d46a;font-size:14px;font-weight:bold');
  try {
    const { error } = await sb.from('products').upsert(product, { onConflict: 'id' });
    if (error) { console.error('❌ Error:', error.message); }
    else { console.log('%c✅ Product Added Successfully: ' + product.name_ar, 'color:#4ade80;font-weight:bold'); }
  } catch(e) { console.error('❌ Exception:', e.message); }
})();

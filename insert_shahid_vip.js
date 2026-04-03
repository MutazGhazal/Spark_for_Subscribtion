const { createClient } = require('@supabase/supabase-client');

const SUPABASE_URL = 'https://qzxtafvehitiwxnyydbg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eHRhZnZlaGl0aXd4bnl5ZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzgzMDksImV4cCI6MjA4ODIxNDMwOX0.acSLZxnzmODs9UMR6zZPSqs_eRVpSjS3isaCY0TqhAk';

const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const product = {
  id: 'shahid-vip-shared-global',
  name_ar: 'شاهد VIP حساب مشترك - عالمي',
  name_en: 'Shahid VIP Shared account - Global',
  description_ar: 'عالم من الترفيه VIP ومميزاته + دوري روشن السعودي، WWE، رياضات قتالية والمزيد...',
  description_en: 'The world of VIP entertainment and its benefits + Saudi Roshen League, WWE, Fight Sports and more.',
  image: 'https://img.z2u.com/images/product/20230526/418664/1685116800.jpg',
  category: 'shahid-accounts', // Assuming this is the correct ID based on Z2U category name
  price: 5.19, // Cheapest plan selling price
  currency: 'USD',
  available: true,
  is_active: true,
  subscription_plans: [
    {
      label_ar: 'شهر واحد',
      label_en: '1 Month',
      cost_price: 1.99,
      price: 5.19,
      source_url: 'https://www.z2u.com/product-418664/Shahid-vip-Shared-account-1-month-Global.html',
      is_active: true
    },
    {
      label_ar: '3 أشهر',
      label_en: '3 Months',
      cost_price: 4.49,
      price: 7.94,
      source_url: 'https://www.z2u.com/product-418664/Shahid-vip-Shared-account-3-months-Global.html',
      is_active: true
    },
    {
      label_ar: 'سنة كاملة',
      label_en: '1 Year',
      cost_price: 13.00,
      price: 17.30,
      source_url: 'https://www.z2u.com/product-418664/Shahid-vip-Shared-account-12-months-Global.html',
      is_active: true
    }
  ]
};

async function insertProduct() {
  try {
    // Check if category exists or find closest
    const { data: cats } = await sb.from('categories').select('id, name_en');
    const cat = cats.find(c => c.name_en.toLowerCase().includes('shahid')) || cats[0];
    if (cat) product.category = cat.id;

    const { data, error } = await sb.from('products').upsert(product);
    if (error) throw error;
    console.log('Product inserted successfully:', product.id);
  } catch (e) {
    console.error('Error inserting product:', e.message);
  }
}

insertProduct();

const { createClient } = require('@supabase/supabase-client');
const config = require('./js/supabase-config.js');
const sb = createClient(config.supabaseUrl, config.supabaseKey);

async function listCats() {
  try {
    const { data, error } = await sb.from('categories').select('id, name_ar, name_en');
    if (error) throw error;
    console.log(JSON.stringify(data, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

listCats();

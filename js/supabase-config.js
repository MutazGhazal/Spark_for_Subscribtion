// Supabase Configuration
// Replace these with your project credentials from supabase.com
const SUPABASE_URL = 'YOUR_SUPABASE_URL';       // e.g. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Public anon key (safe for frontend)

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
}

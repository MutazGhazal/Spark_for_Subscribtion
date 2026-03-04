// Supabase Configuration
// Replace these with your project credentials from supabase.com
const SUPABASE_URL = 'https://qzxtafvehitiwxnyydbg.supabase.co';       // e.g. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eHRhZnZlaGl0aXd4bnl5ZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzgzMDksImV4cCI6MjA4ODIxNDMwOX0.acSLZxnzmODs9UMR6zZPSqs_eRVpSjS3isaCY0TqhAk'; // Public anon key (safe for frontend)

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
}

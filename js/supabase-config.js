// Supabase Configuration
const SUPABASE_URL = 'https://qzxtafvehitiwxnyydbg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6eHRhZnZlaGl0aXd4bnl5ZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzgzMDksImV4cCI6MjA4ODIxNDMwOX0.acSLZxnzmODs9UMR6zZPSqs_eRVpSjS3isaCY0TqhAk';

var sb = null;
try { if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } catch(e) {}

function initSupabase() {
  if (!sb && window.supabase) {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return !!sb;
}

function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
}

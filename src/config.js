// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://archinav-api.vercel.app/api/v1'
  : 'http://localhost:8000/api/v1';

// Supabase Configuration (legacy - for backward compatibility)
const SUPABASE_URL = 'https://atcccjseaxwognnnpqak.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Y2NjanNlYXh3b2dubm5wcWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1MDYwMTEsImV4cCI6MjA1MzA4MjAxMX0.K6kWT0r2QDPsm2RUCMGCthLOYMBnHyP6VCI0bsUFAzo';

export { API_BASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY }; 
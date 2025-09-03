import { createClient } from '@supabase/supabase-js';

// These come from .env/.env.local and must start with VITE_
const url = import.meta.env.VITE_SUPABASE_URL!;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});

// Optional: warn in console if envs are missing
if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn('Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
}

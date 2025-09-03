import { createClient } from '@supabase/supabase-js';

const url  = import.meta.env.VITE_SUPABASE_URL?.trim();
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!url || !anon) {
  // Helpful console log for debugging in prod
  // (Will show booleans, not your keys)
  console.error('Missing envs', { hasUrl: !!url, hasAnon: !!anon });
  throw new Error('Missing env: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(url, anon);

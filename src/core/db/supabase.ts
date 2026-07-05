import { createClient } from '@supabase/supabase-js';

// Define the environment variables safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:1';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key';

if (supabaseUrl === 'http://127.0.0.1:1') {
  console.warn('⚠️ Supabase environment variables are missing. Using dummy credentials.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

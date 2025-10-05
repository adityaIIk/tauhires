import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Singleton client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to set session if needed
export const getSupabaseClient = async (supabaseAccessToken) => {
  if (supabaseAccessToken) {
    const { error } = await supabase.auth.setSession({ access_token: supabaseAccessToken });
    if (error) {
      console.error('Error setting Supabase session:', error);
    }
  }
  return supabase;
};

export default getSupabaseClient;
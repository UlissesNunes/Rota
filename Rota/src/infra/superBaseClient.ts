import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env";

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,      // não guarda sessão no localStorage
    autoRefreshToken: false,    // não renova token automaticamente
  },
});
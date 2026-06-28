import { createClient } from "@supabase/supabase-js";
import { appConfig, requireEnv } from "./config";

export function createSupabaseClient() {
  const supabaseUrl = requireEnv(
    appConfig.supabaseUrl,
    "NEXT_PUBLIC_SUPABASE_URL"
  );
  const supabaseAnonKey = requireEnv(
    appConfig.supabaseAnonKey,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );

  return createClient(supabaseUrl, supabaseAnonKey);
}

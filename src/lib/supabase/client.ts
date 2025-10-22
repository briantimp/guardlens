import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

let browserClient:
  | ReturnType<typeof createBrowserClient<Database>>
  | undefined;

export function getBrowserSupabaseClient() {
  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase env vars missing. Populate NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  browserClient = createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  );

  return browserClient;
}

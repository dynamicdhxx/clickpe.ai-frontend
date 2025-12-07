import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return a mock client if Supabase is not configured
  if (!supabaseUrl || !supabaseKey) {
    return {
      auth: {
        signInWithPassword: async () => ({ error: { message: "Supabase not configured. Use demo mode." } }),
        signUp: async () => ({ error: { message: "Supabase not configured. Use demo mode." } }),
        signInWithOAuth: async () => ({ error: { message: "Supabase not configured. Use demo mode." } }),
        signOut: async () => ({}),
        getUser: async () => ({ data: { user: null } }),
      },
      from: () => ({
        select: () => ({ data: null, error: { message: "Supabase not configured" } }),
      }),
    } as ReturnType<typeof createBrowserClient<Database>>;
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}


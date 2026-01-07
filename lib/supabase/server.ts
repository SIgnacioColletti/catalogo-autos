import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignorar errores en middleware
          }
        },
      },
    }
  );
}

// Exportación para compatibilidad con código antiguo
export const createServerSupabaseClient = createClient;

// Cliente server para usar directamente (lazy initialization)
let _supabaseServer: Awaited<ReturnType<typeof createClient>> | null = null;

export async function getSupabaseServer() {
  if (!_supabaseServer) {
    _supabaseServer = await createClient();
  }
  return _supabaseServer;
}

// Para queries que necesitan el cliente directamente
export const supabaseServer = await createClient();

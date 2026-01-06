import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// ==============================================
// SUPABASE SERVER CLIENT
// Cliente para usar en Server Components y Server Actions
// ==============================================

export async function createServerSupabaseClient() {
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
            // Puede fallar en Server Components
          }
        },
      },
    }
  );
}

// Mantener exportación legacy
export const supabaseServer = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
  }
);

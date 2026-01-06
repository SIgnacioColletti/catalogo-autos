import { createBrowserClient } from "@supabase/ssr";

// ==============================================
// SUPABASE BROWSER CLIENT
// Cliente que maneja cookies automáticamente
// ==============================================

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Exportar una instancia por defecto
export const supabase = createClient();

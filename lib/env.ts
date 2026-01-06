// ==============================================
// VERIFICACIÓN DE VARIABLES DE ENTORNO
// ==============================================

function getEnvVar(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  supabase: {
    url: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  },
} as const;

// Validar al iniciar la aplicación
if (typeof window === "undefined") {
  console.log("✅ Environment variables validated");
}

// ==============================================
// SISTEMA DE AUTENTICACIÓN MOCK
// Simula login/logout con localStorage
// ==============================================

const AUTH_KEY = "admin_authenticated";
const USER_KEY = "admin_user";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

// Usuario mock (en producción vendría del backend)
const MOCK_USER: AdminUser = {
  id: "1",
  name: "Administrador",
  email: "admin@automaxrosario.com.ar",
  role: "admin",
};

// Credenciales mock (SOLO PARA DESARROLLO)
const MOCK_CREDENTIALS = {
  email: "admin@automaxrosario.com.ar",
  password: "admin123",
};

/**
 * Simula login
 */
export const login = (email: string, password: string): boolean => {
  if (
    email === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  ) {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, "true");
      localStorage.setItem(USER_KEY, JSON.stringify(MOCK_USER));
    }
    return true;
  }
  return false;
};

/**
 * Cierra sesión
 */
export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

/**
 * Verifica si está autenticado
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
};

/**
 * Obtiene el usuario actual
 */
export const getCurrentUser = (): AdminUser | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

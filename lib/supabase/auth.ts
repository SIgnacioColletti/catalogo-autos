"use client";

import { createClient } from "./client";

// ==============================================
// FUNCIONES DE AUTENTICACIÓN
// ==============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

// ==============================================
// LOGIN
// ==============================================
export async function login(credentials: LoginCredentials) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error("Login error:", error);
      return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error("Login exception:", error);
    return { user: null, error: "Error al iniciar sesión" };
  }
}

// ==============================================
// LOGOUT
// ==============================================
export async function logout() {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    console.error("Logout exception:", error);
    return { error: "Error al cerrar sesión" };
  }
}

// ==============================================
// OBTENER USUARIO ACTUAL
// ==============================================
export async function getCurrentUser() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Get user error:", error);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Get user exception:", error);
    return null;
  }
}

// ==============================================
// OBTENER SESIÓN ACTUAL
// ==============================================
export async function getCurrentSession() {
  try {
    const supabase = createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Get session error:", error);
      return null;
    }

    return session;
  } catch (error) {
    console.error("Get session exception:", error);
    return null;
  }
}

// ==============================================
// VERIFICAR SI ESTÁ AUTENTICADO
// ==============================================
export async function isAuthenticated() {
  const session = await getCurrentSession();
  return !!session;
}

// ==============================================
// ESCUCHAR CAMBIOS DE AUTENTICACIÓN
// ==============================================
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const supabase = createClient();

  return supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email || "",
      });
    } else {
      callback(null);
    }
  });
}

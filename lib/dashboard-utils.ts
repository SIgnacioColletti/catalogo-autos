import {
  getDashboardStats as getSupabaseDashboardStats,
  getVehiclesByBrand as getSupabaseVehiclesByBrand,
  getRecentVehicles as getSupabaseRecentVehicles,
  getMostViewedVehicles as getSupabaseMostViewedVehicles,
} from "@/lib/supabase/queries";
import type { Vehicle } from "@/lib/types";

// ==============================================
// UTILIDADES PARA CÁLCULOS DEL DASHBOARD
// ==============================================

/**
 * Calcula estadísticas generales
 * Ahora usa datos de Supabase
 */
export const getDashboardStats = async () => {
  return await getSupabaseDashboardStats();
};

/**
 * Agrupa vehículos por marca con conteo
 * Ahora usa datos de Supabase
 */
export const getVehiclesByBrand = async () => {
  return await getSupabaseVehiclesByBrand();
};

/**
 * Obtiene vehículos más recientes
 * Ahora usa datos de Supabase
 */
export const getRecentVehicles = async (
  limit: number = 5
): Promise<Vehicle[]> => {
  return await getSupabaseRecentVehicles(limit);
};

/**
 * Obtiene vehículos más vistos
 * Ahora usa datos de Supabase
 */
export const getTopViewedVehicles = async (
  limit: number = 5
): Promise<Vehicle[]> => {
  return await getSupabaseMostViewedVehicles(limit);
};

/**
 * Formatea fecha relativa (hace X días)
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Hoy";
  if (diffInDays === 1) return "Ayer";
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  return `Hace ${Math.floor(diffInDays / 30)} meses`;
};

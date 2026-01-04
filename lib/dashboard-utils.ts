import { mockVehicles } from "@/lib/data/vehicles";
import type { Vehicle } from "@/lib/types";

// ==============================================
// UTILIDADES PARA CÁLCULOS DEL DASHBOARD
// ==============================================

/**
 * Calcula estadísticas generales
 */
export const getDashboardStats = () => {
  const totalVehicles = mockVehicles.length;
  const availableVehicles = mockVehicles.filter(
    (v) => v.status === "available"
  ).length;
  const soldVehicles = mockVehicles.filter((v) => v.status === "sold").length;
  const reservedVehicles = mockVehicles.filter(
    (v) => v.status === "reserved"
  ).length;
  const featuredVehicles = mockVehicles.filter((v) => v.is_featured).length;
  const totalViews = mockVehicles.reduce((sum, v) => sum + v.views, 0);

  return {
    totalVehicles,
    availableVehicles,
    soldVehicles,
    reservedVehicles,
    featuredVehicles,
    totalViews,
  };
};

/**
 * Agrupa vehículos por marca con conteo
 */
export const getVehiclesByBrand = () => {
  const brandCount: Record<string, number> = {};

  mockVehicles.forEach((vehicle) => {
    if (brandCount[vehicle.brand]) {
      brandCount[vehicle.brand]++;
    } else {
      brandCount[vehicle.brand] = 1;
    }
  });

  // Convertir a array y ordenar por cantidad
  return Object.entries(brandCount)
    .map(([brand, count]) => ({
      brand,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Obtiene vehículos más recientes
 */
export const getRecentVehicles = (limit: number = 5): Vehicle[] => {
  return [...mockVehicles]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, limit);
};

/**
 * Obtiene vehículos más vistos
 */
export const getTopViewedVehicles = (limit: number = 5): Vehicle[] => {
  return [...mockVehicles].sort((a, b) => b.views - a.views).slice(0, limit);
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

"use client";

// ==============================================
// UTILIDADES PARA TRACKING DE VISTAS
// ==============================================

const VIEWS_KEY_PREFIX = "vehicle_view_";
const VIEW_EXPIRY_HOURS = 24;

/**
 * Verifica si el usuario ya vio este vehículo recientemente
 */
export function hasRecentlyViewed(vehicleId: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const key = `${VIEWS_KEY_PREFIX}${vehicleId}`;
    const viewData = localStorage.getItem(key);

    if (!viewData) return false;

    const { timestamp } = JSON.parse(viewData);
    const hoursSinceView = (Date.now() - timestamp) / (1000 * 60 * 60);

    // Si han pasado más de 24 horas, considerarlo como nueva vista
    return hoursSinceView < VIEW_EXPIRY_HOURS;
  } catch (error) {
    console.error("Error checking recent view:", error);
    return false;
  }
}

/**
 * Marca el vehículo como visto
 */
export function markAsViewed(vehicleId: string): void {
  if (typeof window === "undefined") return;

  try {
    const key = `${VIEWS_KEY_PREFIX}${vehicleId}`;
    const viewData = {
      timestamp: Date.now(),
      vehicleId,
    };
    localStorage.setItem(key, JSON.stringify(viewData));
  } catch (error) {
    console.error("Error marking as viewed:", error);
  }
}

/**
 * Limpia vistas antiguas del localStorage
 */
export function cleanOldViews(): void {
  if (typeof window === "undefined") return;

  try {
    const now = Date.now();
    const expiryMs = VIEW_EXPIRY_HOURS * 60 * 60 * 1000;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(VIEWS_KEY_PREFIX)) {
        const viewData = localStorage.getItem(key);
        if (viewData) {
          const { timestamp } = JSON.parse(viewData);
          if (now - timestamp > expiryMs) {
            localStorage.removeItem(key);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error cleaning old views:", error);
  }
}

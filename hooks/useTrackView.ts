"use client";

import { useEffect } from "react";
import {
  hasRecentlyViewed,
  markAsViewed,
  cleanOldViews,
} from "@/lib/utils/views";

// ==============================================
// HOOK PARA TRACKEAR VISTAS DE VEHÍCULOS
// ==============================================

export function useTrackView(vehicleId: string, onView: () => void) {
  useEffect(() => {
    // Limpiar vistas antiguas al cargar la página
    cleanOldViews();

    // Verificar si ya vio este vehículo recientemente
    if (hasRecentlyViewed(vehicleId)) {
      console.log("Usuario ya vio este vehículo en las últimas 24h");
      return;
    }

    // Incrementar vista después de 3 segundos (tiempo mínimo de visualización)
    const timer = setTimeout(() => {
      console.log("Registrando vista única para vehículo:", vehicleId);
      markAsViewed(vehicleId);
      onView();
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [vehicleId, onView]);
}

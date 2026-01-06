"use client";

import { useCallback } from "react";
import { useTrackView } from "@/hooks/useTrackView";

// ==============================================
// COMPONENTE PARA TRACKEAR VISTAS
// ==============================================

interface ViewTrackerProps {
  vehicleId: string;
}

export const ViewTracker = ({ vehicleId }: ViewTrackerProps) => {
  const handleView = useCallback(async () => {
    try {
      await fetch("/api/vehicles/track-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vehicleId }),
      });
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  }, [vehicleId]);

  useTrackView(vehicleId, handleView);

  return null; // Este componente no renderiza nada
};

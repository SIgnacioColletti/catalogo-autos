"use client";

import { useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/client";

interface ViewTrackerProps {
  vehicleId: string;
}

export const ViewTracker = ({ vehicleId }: ViewTrackerProps) => {
  useEffect(() => {
    const incrementView = async () => {
      try {
        // Intentar usar la función RPC
        const { error: rpcError } = await supabaseClient.rpc(
          "increment_views",
          {
            vehicle_id: vehicleId,
          }
        );

        if (rpcError) {
          // Si falla, hacerlo manualmente
          const { data: vehicle } = await supabaseClient
            .from("vehicles")
            .select("views")
            .eq("id", vehicleId)
            .single();

          if (vehicle) {
            await supabaseClient
              .from("vehicles")
              .update({ views: (vehicle.views || 0) + 1 })
              .eq("id", vehicleId);
          }
        }
      } catch (error) {
        console.error("Error tracking view:", error);
      }
    };

    // Esperar 3 segundos antes de incrementar (evitar bots)
    const timer = setTimeout(() => {
      incrementView();
    }, 3000);

    return () => clearTimeout(timer);
  }, [vehicleId]);

  return null;
};

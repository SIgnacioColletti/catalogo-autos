"use client";

import { VehicleCard } from "../VehicleCard";
import type { Vehicle } from "@/lib/types";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { FadeIn } from "@/components/animations/FadeIn";

// ==============================================
// GRID DE VEHÍCULOS
// ==============================================

interface VehicleGridProps {
  vehicles: Vehicle[];
  isFiltered?: boolean;
}

export const VehicleGrid = ({
  vehicles,
  isFiltered = false,
}: VehicleGridProps) => {
  if (vehicles.length === 0) {
    return (
      <FadeIn>
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500 text-lg">
            {isFiltered
              ? "No se encontraron vehículos con los filtros seleccionados."
              : "No hay vehículos disponibles en este momento."}
          </p>
          {isFiltered && (
            <p className="text-gray-400 text-sm mt-2">
              Intenta ajustar los filtros para ver más resultados.
            </p>
          )}
        </div>
      </FadeIn>
    );
  }

  return (
    <StaggerContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <FadeIn key={vehicle.id}>
            <VehicleCard vehiculo={vehicle} />
          </FadeIn>
        ))}
      </div>
    </StaggerContainer>
  );
};

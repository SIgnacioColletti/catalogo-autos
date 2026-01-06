"use client";

import { VehiclesSearch } from "./VehiclesSearch";
import { VehiclesTable } from "./VehiclesTable";
import { useVehicleFilters } from "@/hooks/useVehicleFilters";
import type { Vehicle } from "@/lib/types";

// ==============================================
// WRAPPER CLIENT PARA TABLA DE VEHÍCULOS
// ==============================================

interface VehiclesTableClientProps {
  vehicles: Vehicle[];
}

export const VehiclesTableClient = ({ vehicles }: VehiclesTableClientProps) => {
  const {
    filteredVehicles,
    setSearchQuery,
    setStatusFilter,
    setFeaturedFilter,
  } = useVehicleFilters(vehicles);

  return (
    <div className="space-y-6">
      {/* Búsqueda y filtros */}
      <VehiclesSearch
        onSearch={setSearchQuery}
        onFilterStatus={setStatusFilter}
        onFilterFeatured={setFeaturedFilter}
      />

      {/* Contador de resultados */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Mostrando{" "}
          <span className="font-semibold">{filteredVehicles.length}</span> de{" "}
          <span className="font-semibold">{vehicles.length}</span> vehículos
        </p>
      </div>

      {/* Tabla */}
      <VehiclesTable vehicles={filteredVehicles} />
    </div>
  );
};

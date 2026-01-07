import { VehicleCard } from "@/components/VehicleCard";
import { TrendingUp, Eye } from "lucide-react";
import type { Vehicle } from "@/lib/types";

// ==============================================
// VEHÍCULOS RELACIONADOS - DISEÑO MEJORADO
// ==============================================

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
}

export const RelatedVehicles = ({ vehicles }: RelatedVehiclesProps) => {
  if (vehicles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
      {/* Header con iconos */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-3 rounded-xl">
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Vehículos Similares
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            También te pueden interesar estos vehículos
          </p>
        </div>
      </div>

      {/* Grid de vehículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehiculo={vehicle} />
        ))}
      </div>

      {/* Footer informativo */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Eye className="h-4 w-4" />
          <span>
            Mostrando {vehicles.length} vehículo
            {vehicles.length !== 1 ? "s" : ""} con características similares
          </span>
        </div>
      </div>
    </div>
  );
};

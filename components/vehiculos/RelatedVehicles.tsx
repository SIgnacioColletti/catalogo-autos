import { VehicleCard } from "@/components/VehicleCard";
import type { Vehicle } from "@/lib/types";

// ==============================================
// VEHÍCULOS RELACIONADOS
// ==============================================

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
}

export const RelatedVehicles = ({ vehicles }: RelatedVehiclesProps) => {
  if (vehicles.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Vehículos Similares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehiculo={vehicle} />
        ))}
      </div>
    </div>
  );
};

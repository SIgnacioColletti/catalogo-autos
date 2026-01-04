import { VehicleCard } from "@/components/VehicleCard";
import type { Vehicle } from "@/lib/types";

// ==============================================
// VEHÍCULOS SIMILARES
// ==============================================

interface SimilarVehiclesProps {
  vehicles: Vehicle[];
  currentVehicleId: string;
}

export const SimilarVehicles = ({
  vehicles,
  currentVehicleId,
}: SimilarVehiclesProps) => {
  // Filtrar vehículos disponibles, excluyendo el actual
  const similarVehicles = vehicles
    .filter((v) => v.id !== currentVehicleId && v.status === "available")
    .slice(0, 3); // Máximo 3 vehículos

  if (similarVehicles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Vehículos Similares
        </h2>
        <p className="text-gray-600">
          Estas opciones también podrían interesarte
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehiculo={vehicle} />
        ))}
      </div>
    </section>
  );
};

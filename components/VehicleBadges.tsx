import { Badge } from "@/components/ui/badge";
import {
  statusColors,
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";
import type {
  VehicleStatus,
  FuelType,
  Transmission,
  BodyType,
} from "@/lib/types";

// ==============================================
// COMPONENTE: BADGE DE ESTADO
// ==============================================
interface StatusBadgeProps {
  status: VehicleStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const labels = {
    available: "Disponible",
    sold: "Vendido",
    reserved: "Reservado",
  };

  return <Badge className={statusColors[status]}>{labels[status]}</Badge>;
};

// ==============================================
// COMPONENTE: BADGE DE DESTACADO
// ==============================================
export const FeaturedBadge = () => {
  return (
    <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
      ⭐ Destacado
    </Badge>
  );
};

// ==============================================
// COMPONENTE: BADGES DE CARACTERÍSTICAS
// ==============================================
interface FeatureBadgesProps {
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  doors: number;
}

export const FeatureBadges = ({
  fuelType,
  transmission,
  bodyType,
  doors,
}: FeatureBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="secondary"
        className="bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        {fuelTypeLabels[fuelType]}
      </Badge>
      <Badge
        variant="secondary"
        className="bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        {transmissionLabels[transmission]}
      </Badge>
      <Badge
        variant="secondary"
        className="bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        {bodyTypeLabels[bodyType]}
      </Badge>
      <Badge
        variant="secondary"
        className="bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        {doors} puertas
      </Badge>
    </div>
  );
};

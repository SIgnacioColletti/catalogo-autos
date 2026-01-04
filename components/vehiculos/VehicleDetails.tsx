import {
  formatPrice,
  formatKilometers,
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/VehicleBadges";
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Car,
  DoorClosed,
  Palette,
  Eye,
} from "lucide-react";
import type { Vehicle } from "@/lib/types";

// ==============================================
// DETALLES TÉCNICOS DEL VEHÍCULO
// ==============================================

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export const VehicleDetails = ({ vehicle }: VehicleDetailsProps) => {
  const specs = [
    { icon: Calendar, label: "Año", value: vehicle.year.toString() },
    {
      icon: Gauge,
      label: "Kilómetros",
      value: formatKilometers(vehicle.kilometers),
    },
    {
      icon: Fuel,
      label: "Combustible",
      value: fuelTypeLabels[vehicle.fuel_type],
    },
    {
      icon: Settings,
      label: "Transmisión",
      value: transmissionLabels[vehicle.transmission],
    },
    {
      icon: Car,
      label: "Carrocería",
      value: bodyTypeLabels[vehicle.body_type],
    },
    { icon: DoorClosed, label: "Puertas", value: `${vehicle.doors} puertas` },
    { icon: Palette, label: "Color", value: vehicle.color },
    { icon: Eye, label: "Vistas", value: vehicle.views.toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      {/* Header con título y badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <StatusBadge status={vehicle.status} />
          {vehicle.is_featured && (
            <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
              ⭐ Destacado
            </Badge>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {vehicle.brand} {vehicle.model}
        </h1>
        <p className="text-lg text-gray-600">
          {vehicle.year} • {formatKilometers(vehicle.kilometers)}
        </p>
      </div>

      {/* Precio */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <p className="text-sm text-gray-600 mb-1">Precio</p>
        <p className="text-4xl font-bold text-primary">
          {formatPrice(vehicle.price)}
        </p>
      </div>

      {/* Especificaciones técnicas */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Especificaciones Técnicas
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-gray-100 rounded-lg p-2">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{spec.label}</p>
                  <p className="font-semibold text-gray-900">{spec.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {vehicle.description}
        </p>
      </div>
    </div>
  );
};

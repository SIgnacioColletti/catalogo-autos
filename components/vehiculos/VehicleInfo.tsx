import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatKilometers } from "@/lib/utils";
import {
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Car,
  Eye,
} from "lucide-react";
import type { Vehicle } from "@/lib/types";

// ==============================================
// INFORMACIÓN DEL VEHÍCULO - DISEÑO PREMIUM
// ==============================================

interface VehicleInfoProps {
  vehicle: Vehicle;
}

export const VehicleInfo = ({ vehicle }: VehicleInfoProps) => {
  const fuelLabels: Record<string, string> = {
    nafta: "Nafta",
    diesel: "Diésel",
    gnc: "GNC",
    electrico: "Eléctrico",
    hibrido: "Híbrido",
  };

  const transmissionLabels: Record<string, string> = {
    manual: "Manual",
    automatica: "Automática",
  };

  const bodyTypeLabels: Record<string, string> = {
    sedan: "Sedán",
    suv: "SUV",
    hatchback: "Hatchback",
    pickup: "Pickup",
    coupe: "Coupé",
    familiar: "Familiar",
  };

  const specs = [
    {
      icon: Calendar,
      label: "Año",
      value: vehicle.year.toString(),
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      icon: Gauge,
      label: "Kilómetros",
      value: formatKilometers(vehicle.kilometers),
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      icon: Fuel,
      label: "Combustible",
      value: fuelLabels[vehicle.fuel_type] || vehicle.fuel_type,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-100",
    },
    {
      icon: Settings,
      label: "Transmisión",
      value: transmissionLabels[vehicle.transmission] || vehicle.transmission,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
    {
      icon: Car,
      label: "Carrocería",
      value: bodyTypeLabels[vehicle.body_type] || vehicle.body_type,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      icon: Palette,
      label: "Color",
      value: vehicle.color,
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header con Título y Badges */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white relative overflow-hidden">
          {/* Efecto de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative">
            <div className="flex items-start justify-between gap-3 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
                  {vehicle.brand}
                </h1>
                <p className="text-xl md:text-2xl font-bold text-blue-100">
                  {vehicle.model}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {vehicle.is_featured && (
                  <Badge className="bg-amber-400 hover:bg-amber-500 text-amber-950 border-0 shadow-lg font-bold">
                    ⭐ Destacado
                  </Badge>
                )}
                <Badge
                  className={`border-0 shadow-lg font-bold ${
                    vehicle.status === "available"
                      ? "bg-emerald-400 hover:bg-emerald-500 text-emerald-950"
                      : vehicle.status === "reserved"
                      ? "bg-amber-400 hover:bg-amber-500 text-amber-950"
                      : "bg-red-400 hover:bg-red-500 text-red-950"
                  }`}
                >
                  {vehicle.status === "available"
                    ? "✓ Disponible"
                    : vehicle.status === "reserved"
                    ? "⏱ Reservado"
                    : "✕ Vendido"}
                </Badge>
              </div>
            </div>

            {/* Precio Destacado */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-sm font-bold text-blue-100 mb-2 uppercase tracking-wider">
                Precio
              </p>
              <p className="text-5xl md:text-6xl font-black">
                {formatPrice(vehicle.price)}
              </p>
              <p className="text-sm text-blue-100 mt-2">Año {vehicle.year}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Especificaciones Técnicas */}
      <Card className="border-0 shadow-xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Especificaciones Técnicas
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {specs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div
                  key={index}
                  className={`${spec.bg} ${spec.border} border-2 rounded-2xl p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 group cursor-default`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <Icon className={`h-6 w-6 ${spec.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        {spec.label}
                      </p>
                      <p className="text-lg font-black text-gray-900 truncate capitalize">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Descripción */}
      {vehicle.description && (
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Descripción
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {vehicle.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Vistas */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <Eye className="h-5 w-5 text-gray-600" />
              </div>
              <span className="font-bold text-gray-700">Visualizaciones</span>
            </div>
            <span className="text-3xl font-black text-gray-900">
              {(vehicle.views || 0).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

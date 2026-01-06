import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
// INFORMACIÓN DEL VEHÍCULO
// ==============================================

interface VehicleInfoProps {
  vehicle: Vehicle;
}

export const VehicleInfo = ({ vehicle }: VehicleInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Título y precio */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h1>
            {vehicle.is_featured && (
              <Badge className="bg-yellow-500 text-black">Destacado</Badge>
            )}
          </div>
          <p className="text-4xl font-bold text-primary mb-2">
            {formatPrice(vehicle.price)}
          </p>
          <Badge
            variant={
              vehicle.status === "available"
                ? "default"
                : vehicle.status === "reserved"
                ? "secondary"
                : "destructive"
            }
          >
            {vehicle.status === "available"
              ? "Disponible"
              : vehicle.status === "reserved"
              ? "Reservado"
              : "Vendido"}
          </Badge>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Año</p>
              <p className="font-semibold">{vehicle.year}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Gauge className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Kilómetros</p>
              <p className="font-semibold">
                {formatKilometers(vehicle.kilometers)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Fuel className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Combustible</p>
              <p className="font-semibold capitalize">{vehicle.fuel_type}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Settings className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Transmisión</p>
              <p className="font-semibold capitalize">{vehicle.transmission}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Palette className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Color</p>
              <p className="font-semibold">{vehicle.color}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Car className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-gray-500">Carrocería</p>
              <p className="font-semibold capitalize">{vehicle.body_type}</p>
            </div>
          </div>
        </div>

        {/* Descripción */}
        {vehicle.description && (
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {vehicle.description}
            </p>
          </div>
        )}

        {/* Vistas */}
        <div className="pt-4 border-t flex items-center gap-2 text-sm text-gray-500">
          <Eye className="h-4 w-4" />
          <span>{vehicle.views || 0} visualizaciones</span>
        </div>
      </CardContent>
    </Card>
  );
};

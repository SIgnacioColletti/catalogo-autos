"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatKilometers } from "@/lib/utils";
import { Calendar, Gauge, Fuel, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";

// ==============================================
// CARD DE VEHÍCULO
// ==============================================

interface VehicleCardProps {
  vehiculo: Vehicle;
  priority?: boolean;
}

export const VehicleCard = ({
  vehiculo,
  priority = false,
}: VehicleCardProps) => {
  const precioFormateado = formatPrice(vehiculo.price);
  const kilometrosFormateados = formatKilometers(vehiculo.kilometers);

  return (
    <Link href={`/vehiculos/${vehiculo.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
        {/* Imagen del vehículo */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image
            src={vehiculo.images[0]}
            alt={`${vehiculo.brand} ${vehiculo.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority={priority}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {vehiculo.is_featured && (
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
                Destacado
              </Badge>
            )}
            {vehiculo.status === "reserved" && (
              <Badge variant="secondary">Reservado</Badge>
            )}
          </div>
        </div>

        {/* Contenido */}
        <CardContent className="p-4 space-y-3">
          {/* Título */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
              {vehiculo.brand} {vehiculo.model}
            </h3>
            <p className="text-sm text-gray-500">{vehiculo.year}</p>
          </div>

          {/* Precio */}
          <p className="text-2xl font-bold text-primary">{precioFormateado}</p>

          {/* Características principales */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 pt-2 border-t">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{vehiculo.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-gray-400" />
              <span>{kilometrosFormateados}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-gray-400" />
              <span className="capitalize">{vehiculo.fuel_type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Settings className="h-4 w-4 text-gray-400" />
              <span className="capitalize">{vehiculo.transmission}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

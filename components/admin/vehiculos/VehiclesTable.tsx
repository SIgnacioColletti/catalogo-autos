"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { VehicleActions } from "./VehicleActions";
import {
  formatPrice,
  formatKilometers,
  statusLabels,
  statusColors,
} from "@/lib/utils";
import type { Vehicle } from "@/lib/types";
import Image from "next/image";

// ==============================================
// TABLA DE VEHÍCULOS
// ==============================================

interface VehiclesTableProps {
  vehicles: Vehicle[];
}

export const VehiclesTable = ({ vehicles }: VehiclesTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Imagen</TableHead>
            <TableHead>Vehículo</TableHead>
            <TableHead>Año</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Kilómetros</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Visitas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                No se encontraron vehículos
              </TableCell>
            </TableRow>
          ) : (
            vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                {/* Imagen */}
                <TableCell>
                  <div className="relative w-12 h-12 rounded overflow-hidden">
                    <Image
                      src={vehicle.images[0]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </TableCell>

                {/* Vehículo */}
                <TableCell className="font-medium">
                  <div>
                    <p className="font-semibold">
                      {vehicle.brand} {vehicle.model}
                    </p>
                    {vehicle.is_featured && (
                      <Badge className="mt-1 bg-yellow-100 text-yellow-800 text-xs">
                        ⭐ Destacado
                      </Badge>
                    )}
                  </div>
                </TableCell>

                {/* Año */}
                <TableCell>{vehicle.year}</TableCell>

                {/* Precio */}
                <TableCell className="font-semibold">
                  {formatPrice(vehicle.price)}
                </TableCell>

                {/* Kilómetros */}
                <TableCell>{formatKilometers(vehicle.kilometers)}</TableCell>

                {/* Estado */}
                <TableCell>
                  <Badge className={statusColors[vehicle.status]}>
                    {statusLabels[vehicle.status]}
                  </Badge>
                </TableCell>

                {/* Visitas */}
                <TableCell>{vehicle.views.toLocaleString()}</TableCell>

                {/* Acciones */}
                <TableCell className="text-right">
                  <VehicleActions vehicle={vehicle} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

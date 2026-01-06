"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "./DeleteButton";
import { StatusButton } from "./StatusButton";
import { formatPrice, formatKilometers } from "@/lib/utils";
import type { Vehicle } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Eye, Edit, Copy } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ==============================================
// TABLA DE VEHÍCULOS
// ==============================================

interface VehiclesTableProps {
  vehicles: Vehicle[];
}

export const VehiclesTable = ({ vehicles }: VehiclesTableProps) => {
  const router = useRouter();

  const handleDuplicate = (vehicle: Vehicle) => {
    const { id, views, ...vehicleCopy } = vehicle;
    localStorage.setItem("duplicateVehicle", JSON.stringify(vehicleCopy));
    toast.success("Vehículo copiado", {
      description: "Redirigiendo al formulario...",
    });
    setTimeout(() => {
      router.push("/admin/vehiculos/nuevo");
    }, 500);
  };

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
                  <StatusButton
                    vehicleId={vehicle.id}
                    vehicleName={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                    currentStatus={vehicle.status}
                  />
                </TableCell>

                {/* Visitas */}
                <TableCell>{vehicle.views.toLocaleString()}</TableCell>

                {/* Acciones */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Ver en sitio */}
                    <Link href={`/vehiculos/${vehicle.id}`} target="_blank">
                      <Button size="sm" variant="ghost" title="Ver en sitio">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>

                    {/* Editar */}
                    <Link href={`/admin/vehiculos/${vehicle.id}/editar`}>
                      <Button size="sm" variant="ghost" title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>

                    {/* Duplicar */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDuplicate(vehicle)}
                      title="Duplicar"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>

                    {/* Eliminar */}
                    <DeleteButton
                      vehicleId={vehicle.id}
                      vehicleName={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

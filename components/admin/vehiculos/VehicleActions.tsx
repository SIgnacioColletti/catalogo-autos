"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Copy, Trash2 } from "lucide-react";
import Link from "next/link";
import { useVehiclesStore } from "@/lib/store/useVehiclesStore";
import { DeleteVehicleDialog } from "./DeleteVehicleDialog";
import type { Vehicle } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ==============================================
// MENÚ DE ACCIONES POR VEHÍCULO
// ==============================================

interface VehicleActionsProps {
  vehicle: Vehicle;
}

export const VehicleActions = ({ vehicle }: VehicleActionsProps) => {
  const router = useRouter();
  const { deleteVehicle, duplicateVehicle } = useVehiclesStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    deleteVehicle(vehicle.id);
    setShowDeleteDialog(false);

    toast.success("Vehículo eliminado", {
      description: `${vehicle.brand} ${vehicle.model} fue eliminado correctamente`,
    });
  };

  const handleDuplicate = () => {
    duplicateVehicle(vehicle.id);

    toast.success("Vehículo duplicado", {
      description: `Se creó una copia de ${vehicle.brand} ${vehicle.model}`,
    });

    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={`/vehiculos/${vehicle.id}`}
              target="_blank"
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Ver en catálogo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/admin/vehiculos/${vehicle.id}/editar`}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteVehicleDialog
        vehicle={vehicle}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />
    </>
  );
};

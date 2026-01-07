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
import { DeleteVehicleDialog } from "./DeleteVehicleDialog";
import type { Vehicle } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteVehicle } from "@/app/admin/vehiculos/actions";

interface VehicleActionsProps {
  vehicle: Vehicle;
}

export const VehicleActions = ({ vehicle }: VehicleActionsProps) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await deleteVehicle(vehicle.id);

      if (result?.error) {
        toast.error("Error al eliminar", {
          description: result.error,
        });
        return;
      }

      toast.success("Vehículo eliminado", {
        description: `${vehicle.brand} ${vehicle.model} fue eliminado correctamente`,
      });

      setShowDeleteDialog(false);
      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description: "Ocurrió un error al eliminar el vehículo",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" disabled={isLoading}>
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

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600 focus:text-red-600"
            disabled={isLoading}
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

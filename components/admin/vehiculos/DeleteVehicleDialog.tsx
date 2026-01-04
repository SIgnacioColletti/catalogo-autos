"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Vehicle } from "@/lib/types";

// ==============================================
// MODAL DE CONFIRMACIÓN PARA ELIMINAR
// ==============================================

interface DeleteVehicleDialogProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteVehicleDialog = ({
  vehicle,
  open,
  onOpenChange,
  onConfirm,
}: DeleteVehicleDialogProps) => {
  if (!vehicle) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar el vehículo:
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <p className="font-semibold text-gray-900">
                {vehicle.brand} {vehicle.model} {vehicle.year}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {vehicle.kilometers.toLocaleString()} km
              </p>
            </div>
            <p className="mt-4 text-sm">
              Esta acción no se puede deshacer. El vehículo será eliminado
              permanentemente del inventario.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

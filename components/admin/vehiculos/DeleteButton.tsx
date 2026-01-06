"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteVehicle } from "@/app/admin/vehiculos/actions";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

interface DeleteButtonProps {
  vehicleId: string;
  vehicleName: string;
}

export const DeleteButton = ({ vehicleId, vehicleName }: DeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log("🗑️ Eliminando:", vehicleId);

    const result = await deleteVehicle(vehicleId);

    if (result.error) {
      toast.error("Error", { description: result.error });
      setIsDeleting(false);
      return;
    }

    toast.success("¡Eliminado!", {
      description: "El vehículo se eliminó correctamente",
    });

    window.location.href = "/admin/vehiculos";
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Eliminar"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl">
              ¿Eliminar vehículo?
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-base pt-4">
            Estás por eliminar permanentemente:{" "}
            <span className="font-semibold text-gray-900">{vehicleName}</span>
            <br />
            <br />
            Esta acción no se puede deshacer. El vehículo será eliminado de la
            base de datos y dejará de aparecer en el catálogo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isDeleting ? "Eliminando..." : "Sí, eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

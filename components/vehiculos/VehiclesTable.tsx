"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { deleteVehicle } from "@/app/admin/vehiculos/actions";
import { toast } from "sonner";
import { MoreVertical, Eye, Edit, Copy, Trash2, Loader2 } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import Image from "next/image";

interface VehiclesTableProps {
  vehicles: Vehicle[];
}

export const VehiclesTable = ({ vehicles }: VehiclesTableProps) => {
  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    vehicle: Vehicle | null;
  }>({ open: false, vehicle: null });

  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      available: "default",
      sold: "destructive",
      reserved: "secondary",
    } as const;

    const labels = {
      available: "Disponible",
      sold: "Vendido",
      reserved: "Reservado",
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleDelete = async () => {
    if (!deleteModal.vehicle) return;

    console.log("🎯 Starting delete process for:", deleteModal.vehicle.id);
    setIsDeleting(true);

    try {
      console.log("📞 Calling deleteVehicle action...");
      const result = await deleteVehicle(deleteModal.vehicle.id);

      console.log("📨 Action result:", result);

      if (result.error) {
        console.error("❌ Delete failed:", result.error);
        toast.error("Error", {
          description: result.error,
        });
        setIsDeleting(false);
        return;
      }

      console.log("✅ Delete successful, showing toast...");
      toast.success("¡Eliminado!", {
        description: "El vehículo se eliminó correctamente",
      });

      // Cerrar modal
      setDeleteModal({ open: false, vehicle: null });
      setIsDeleting(false);

      console.log("🔄 Reloading page...");
      // Esperar un momento para que se vea el toast
      setTimeout(() => {
        window.location.href = "/admin/vehiculos";
      }, 1000);
    } catch (error) {
      console.error("💥 Unexpected error:", error);
      toast.error("Error", {
        description: "Ocurrió un error inesperado al eliminar",
      });
      setIsDeleting(false);
    }
  };

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

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay vehículos registrados</p>
        <Link href="/admin/vehiculos/nuevo">
          <Button className="mt-4">Crear primer vehículo</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Km
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vistas
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={vehicle.images[0]}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </p>
                        <p className="text-sm text-gray-500">{vehicle.year}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {formatPrice(vehicle.price)}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-gray-700">
                      {vehicle.kilometers.toLocaleString()} km
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(vehicle.status)}
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-gray-700">{vehicle.views || 0}</p>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/vehiculos/${vehicle.id}`}
                            target="_blank"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver en sitio
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href={`/admin/vehiculos/${vehicle.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleDuplicate(vehicle);
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            setDeleteModal({ open: true, vehicle });
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {/* MODAL */}
      <Dialog open={deleteModal.open} onOpenChange={() => {}}>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Estás por eliminar{" "}
              <strong>
                {deleteModal.vehicle?.brand} {deleteModal.vehicle?.model}{" "}
                {deleteModal.vehicle?.year}
              </strong>
              . Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() => {
                console.log("❌ Cancelando...");
                setDeleteModal({ open: false, vehicle: null });
              }}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🔴 BOTÓN CLICKEADO - Ejecutando handleDelete");
                handleDelete();
              }}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { updateVehicleStatus } from "@/app/admin/vehiculos/actions";
import { CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react";

interface StatusButtonProps {
  vehicleId: string;
  vehicleName: string;
  currentStatus: "available" | "reserved" | "sold";
}

export const StatusButton = ({
  vehicleId,
  vehicleName,
  currentStatus,
}: StatusButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (
    newStatus: "available" | "reserved" | "sold"
  ) => {
    if (newStatus === currentStatus) return;

    // Confirmación solo para vendido
    if (newStatus === "sold") {
      if (
        !confirm(
          `¿Marcar "${vehicleName}" como VENDIDO?\n\nEsta acción moverá el vehículo fuera del catálogo público.`
        )
      ) {
        return;
      }
    }

    setIsUpdating(true);

    const result = await updateVehicleStatus(vehicleId, newStatus);

    if (result.error) {
      toast.error("Error", { description: result.error });
      setIsUpdating(false);
      return;
    }

    const statusLabels = {
      available: "Disponible",
      reserved: "Reservado",
      sold: "Vendido",
    };

    toast.success("Estado actualizado", {
      description: `${vehicleName} marcado como ${statusLabels[newStatus]}`,
    });

    window.location.reload();
  };

  const statusConfig = {
    available: {
      label: "Disponible",
      icon: CheckCircle,
      color: "text-green-600",
    },
    reserved: {
      label: "Reservado",
      icon: Clock,
      color: "text-yellow-600",
    },
    sold: {
      label: "Vendido",
      icon: XCircle,
      color: "text-red-600",
    },
  };

  const CurrentIcon = statusConfig[currentStatus].icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          className="min-w-[130px]"
        >
          <CurrentIcon
            className={`h-4 w-4 mr-2 ${statusConfig[currentStatus].color}`}
          />
          {statusConfig[currentStatus].label}
          <ChevronDown className="h-3 w-3 ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {currentStatus !== "available" && (
          <DropdownMenuItem
            onClick={() => handleStatusChange("available")}
            disabled={isUpdating}
          >
            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            Marcar como Disponible
          </DropdownMenuItem>
        )}

        {currentStatus !== "reserved" && (
          <DropdownMenuItem
            onClick={() => handleStatusChange("reserved")}
            disabled={isUpdating}
          >
            <Clock className="h-4 w-4 mr-2 text-yellow-600" />
            Marcar como Reservado
          </DropdownMenuItem>
        )}

        {currentStatus !== "sold" && (
          <DropdownMenuItem
            onClick={() => handleStatusChange("sold")}
            disabled={isUpdating}
            className="text-red-600"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Marcar como Vendido
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

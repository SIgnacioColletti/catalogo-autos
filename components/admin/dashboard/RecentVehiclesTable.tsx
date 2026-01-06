import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/lib/types";
import Link from "next/link";
import { Eye } from "lucide-react";

// ==============================================
// TABLA DE VEHÍCULOS RECIENTES
// ==============================================

interface RecentVehiclesTableProps {
  vehicles: Vehicle[];
}

export const RecentVehiclesTable = ({ vehicles }: RecentVehiclesTableProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos Vehículos Agregados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <Link
                  href={`/admin/vehiculos/${vehicle.id}/editar`}
                  className="font-medium text-gray-900 hover:text-primary"
                >
                  {vehicle.brand} {vehicle.model} {vehicle.year}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {formatPrice(vehicle.price)} •{" "}
                  {vehicle.kilometers.toLocaleString()} km
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{vehicle.views || 0}</span>
                </div>
                {getStatusBadge(vehicle.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

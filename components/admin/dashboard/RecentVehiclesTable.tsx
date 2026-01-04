"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRecentVehicles, getRelativeTime } from "@/lib/dashboard-utils";
import { formatPrice } from "@/lib/utils";
import { Eye, Edit } from "lucide-react";
import Link from "next/link";
import { SlideIn } from "@/components/animations/SlideIn";

export const RecentVehiclesTable = () => {
  const recentVehicles = getRecentVehicles(5);

  const getStatusBadge = (status: string) => {
    const variants = {
      available: "bg-green-100 text-green-800",
      sold: "bg-red-100 text-red-800",
      reserved: "bg-yellow-100 text-yellow-800",
    };
    const labels = {
      available: "Disponible",
      sold: "Vendido",
      reserved: "Reservado",
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <SlideIn direction="up" delay={0.4}>
      <Card>
        <CardHeader>
          <CardTitle>Últimos Vehículos Agregados</CardTitle>
          <CardDescription>
            Los 5 vehículos más recientes del inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehículo</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Agregado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {vehicle.year} • {vehicle.kilometers.toLocaleString()}{" "}
                        km
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(vehicle.price)}</TableCell>
                  <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {getRelativeTime(vehicle.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/vehiculos/${vehicle.id}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/admin/vehiculos/${vehicle.id}/editar`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </SlideIn>
  );
};

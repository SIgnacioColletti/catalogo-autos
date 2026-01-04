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
import { Button } from "@/components/ui/button";
import { getTopViewedVehicles } from "@/lib/dashboard-utils";
import { formatPrice } from "@/lib/utils";
import { Eye, TrendingUp, Edit } from "lucide-react";
import Link from "next/link";
import { SlideIn } from "@/components/animations/SlideIn";

export const TopViewedTable = () => {
  const topVehicles = getTopViewedVehicles(5);

  return (
    <SlideIn direction="up" delay={0.5}>
      <Card>
        <CardHeader>
          <CardTitle>Vehículos Más Vistos</CardTitle>
          <CardDescription>Top 5 vehículos con más visitas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ranking</TableHead>
                <TableHead>Vehículo</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Visitas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topVehicles.map((vehicle, index) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {index === 0 && (
                        <TrendingUp className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="font-bold text-lg">{index + 1}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-gray-500">{vehicle.year}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(vehicle.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold">
                        {vehicle.views.toLocaleString()}
                      </span>
                    </div>
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

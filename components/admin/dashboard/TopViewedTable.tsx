"use client";

import { useState, useEffect } from "react";
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
import { Eye, TrendingUp, Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { SlideIn } from "@/components/animations/SlideIn";
import type { Vehicle } from "@/lib/types";

export const TopViewedTable = () => {
  const [topVehicles, setTopVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopVehicles = async () => {
      setIsLoading(true);
      try {
        const vehicles = await getTopViewedVehicles(5);
        setTopVehicles(vehicles);
      } catch (error) {
        console.error("Error fetching top vehicles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopVehicles();
  }, []);

  return (
    <SlideIn direction="up" delay={0.5}>
      <Card>
        <CardHeader>
          <CardTitle>Vehículos Más Vistos</CardTitle>
          <CardDescription>Top 5 vehículos con más visitas</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : topVehicles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay vehículos para mostrar
            </div>
          ) : (
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
                          <Link
                            href={`/vehiculos/${vehicle.id}`}
                            target="_blank"
                          >
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
          )}
        </CardContent>
      </Card>
    </SlideIn>
  );
};

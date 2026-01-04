"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleCard } from "@/components/VehicleCard";
import type { Vehicle } from "@/lib/types";

// ==============================================
// VISTA PREVIA DEL VEHÍCULO
// ==============================================

interface VehiclePreviewProps {
  data: Partial<Vehicle>;
}

export const VehiclePreview = ({ data }: VehiclePreviewProps) => {
  // Crear vehículo mock para preview
  const previewVehicle: Vehicle = {
    id: "preview",
    agency_id: "1",
    brand: data.brand || "Marca",
    model: data.model || "Modelo",
    year: data.year || new Date().getFullYear(),
    price: data.price || 0,
    kilometers: data.kilometers || 0,
    fuel_type: data.fuel_type || "nafta",
    transmission: data.transmission || "manual",
    color: data.color || "Sin especificar",
    body_type: data.body_type || "sedan",
    doors: data.doors || 4,
    description: data.description || "Descripción del vehículo...",
    features: data.features || [],
    images:
      data.images && data.images.length > 0
        ? data.images
        : [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
          ],
    is_featured: data.is_featured || false,
    status: data.status || "available",
    views: 0,
    created_at: new Date().toISOString(),
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Vista Previa</CardTitle>
      </CardHeader>
      <CardContent>
        <VehicleCard vehiculo={previewVehicle} priority={false} />
      </CardContent>
    </Card>
  );
};

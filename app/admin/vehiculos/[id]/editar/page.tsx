import { VehicleForm } from "@/components/admin/vehiculos/VehicleForm";
import { mockVehicles } from "@/lib/data/vehicles";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// ==============================================
// PÁGINA EDITAR VEHÍCULO
// ==============================================

interface EditVehiculoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditVehiculoPage({
  params,
}: EditVehiculoPageProps) {
  const { id } = await params;
  const vehicle = mockVehicles.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/vehiculos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Editar Vehículo</h2>
          <p className="text-gray-600">
            {vehicle.brand} {vehicle.model} {vehicle.year}
          </p>
        </div>
      </div>

      {/* Formulario */}
      <VehicleForm initialData={vehicle} isEdit />
    </div>
  );
}

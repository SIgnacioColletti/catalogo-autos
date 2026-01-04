import { VehicleForm } from "@/components/admin/vehiculos/VehicleForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// ==============================================
// PÁGINA CREAR NUEVO VEHÍCULO
// ==============================================

export default function NuevoVehiculoPage() {
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
          <h2 className="text-3xl font-bold text-gray-900">Nuevo Vehículo</h2>
          <p className="text-gray-600">
            Agrega un nuevo vehículo al inventario
          </p>
        </div>
      </div>

      {/* Formulario */}
      <VehicleForm />
    </div>
  );
}

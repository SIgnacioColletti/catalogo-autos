import { getVehicles } from "@/lib/supabase/queries";
import { VehiclesTableClient } from "@/components/admin/vehiculos/VehiclesTableClient";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

// ==============================================
// PÁGINA: LISTADO ADMIN VEHÍCULOS
// ==============================================

export default async function AdminVehiculosPage() {
  // En el admin traemos TODOS los vehículos (incluidos vendidos)
  const { vehicles } = await getVehicles({
    limit: 100,
    filters: { status: ["available", "reserved", "sold"] }, // 👈 AGREGAR ESTO
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehículos</h1>
          <p className="text-gray-600 mt-2">
            Gestiona tu inventario de vehículos ({vehicles.length} totales)
          </p>
        </div>
        <Link href="/admin/vehiculos/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Vehículo
          </Button>
        </Link>
      </div>

      <VehiclesTableClient vehicles={vehicles} />
    </div>
  );
}

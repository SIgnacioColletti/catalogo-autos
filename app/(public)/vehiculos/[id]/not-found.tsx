import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import Link from "next/link";

export default function VehicleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Car className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Vehículo no encontrado
        </h1>

        <p className="text-gray-600 mb-6">
          El vehículo que buscas no existe, fue vendido o ya no está disponible.
        </p>

        <Link href="/vehiculos">
          <Button>Ver todos los vehículos</Button>
        </Link>
      </div>
    </div>
  );
}

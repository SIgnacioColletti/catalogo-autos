import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

// ==============================================
// PÁGINA 404 PARA VEHÍCULOS NO ENCONTRADOS
// ==============================================

export default function VehicleNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Vehículo no encontrado
        </h1>
        <p className="text-gray-600 mb-6">
          El vehículo que buscás no existe o fue dado de baja.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/vehiculos">Ver Todos los Vehículos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <FileQuestion className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Página no encontrada
        </h2>

        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>

          <Link href="/vehiculos">
            <Button variant="outline">Ver vehículos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

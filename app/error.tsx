"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Algo salio mal
        </h1>

        <p className="text-gray-600 mb-6">
          Lo sentimos, ocurrio un error inesperado. Por favor, intenta
          nuevamente.
        </p>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()}>Intentar nuevamente</Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

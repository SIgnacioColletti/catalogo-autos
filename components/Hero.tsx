import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Encontrá tu próximo vehículo en Rosario, Santa Fe
        </h1>

        <p className="text-xl sm:text-2xl mb-8 text-blue-100">
          30+ vehículos usados seleccionados. Calidad garantizada, financiación
          disponible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/vehiculos">Ver Vehículos</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
          >
            <a href="tel:+543414567890">
              <Phone className="mr-2 h-5 w-5" />
              Contactar Asesor
            </a>
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-400 rounded-full" />
            <span>Financiación disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-400 rounded-full" />
            <span>Vehículos verificados</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-400 rounded-full" />
            <span>Atención personalizada</span>
          </div>
        </div>
      </div>
    </section>
  );
};

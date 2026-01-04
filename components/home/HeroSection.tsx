"use client";

import { Button } from "@/components/ui/button";
import { Phone, Search } from "lucide-react";
import Link from "next/link";
import type { Agency } from "@/lib/types";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";

// ==============================================
// HERO SECTION
// ==============================================

interface HeroSectionProps {
  agency: Agency;
  totalVehicles: number;
}

export const HeroSection = ({ agency, totalVehicles }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Encontrá tu próximo vehículo en {agency.city}
          </h1>
        </FadeIn>

        <SlideIn direction="up" delay={0.2}>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {totalVehicles}+ vehículos usados seleccionados. Calidad
            garantizada, financiación disponible.
          </p>
        </SlideIn>

        <SlideIn direction="up" delay={0.4}>
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/vehiculos">
                <Search className="mr-2 h-5 w-5" />
                Ver Vehículos
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-white hover:bg-gray-100 text-primary border-2 border-white"
            >
              <Link href="/contacto">
                <Phone className="mr-2 h-5 w-5" />
                Contactar Asesor
              </Link>
            </Button>
          </div>
        </SlideIn>

        {/* Información adicional */}
        <SlideIn direction="up" delay={0.6}>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Financiación disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Vehículos verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Atención personalizada</span>
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
};

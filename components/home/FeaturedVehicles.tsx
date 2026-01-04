"use client";

import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { SlideIn } from "@/components/animations/SlideIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

// ==============================================
// SECCIÓN DE VEHÍCULOS DESTACADOS (CON ANIMACIONES)
// ==============================================

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export const FeaturedVehicles = ({ vehicles }: FeaturedVehiclesProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con animación */}
        <SlideIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vehículos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestra selección premium de vehículos. Renovamos el stock
              semanalmente.
            </p>
          </div>
        </SlideIn>

        {/* Grid con animaciones escalonadas */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {vehicles.map((vehiculo, index) => (
            <StaggerItem key={vehiculo.id}>
              <VehicleCard vehiculo={vehiculo} priority={index < 3} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Botón con animación */}
        <SlideIn direction="up" delay={0.4}>
          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/vehiculos">
                Ver Todos los Vehículos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </SlideIn>
      </div>
    </section>
  );
};

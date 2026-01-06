"use client";

import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car } from "lucide-react";
import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { SlideIn } from "@/components/animations/SlideIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export const FeaturedVehicles = ({ vehicles }: FeaturedVehiclesProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {vehicles.length === 0 ? (
          <SlideIn direction="up" delay={0.2}>
            <div className="text-center py-12">
              <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-6">
                No hay vehículos destacados en este momento
              </p>
              <Button asChild>
                <Link href="/vehiculos">Ver todos los vehículos</Link>
              </Button>
            </div>
          </SlideIn>
        ) : (
          <>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {vehicles.map((vehicle) => (
                <StaggerItem key={vehicle.id}>
                  <VehicleCard vehiculo={vehicle} />
                </StaggerItem>
              ))}
            </StaggerContainer>

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
          </>
        )}
      </div>
    </section>
  );
};

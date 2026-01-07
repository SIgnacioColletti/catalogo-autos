import { getVehicles, getUniqueBrands } from "@/lib/supabase/queries";
import { VehiclesClient } from "@/components/vehiculos/VehiclesClient";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import type { VehicleSortBy } from "@/lib/supabase/queries";
// Revalidar cada 60 segundos
export const revalidate = 60;
export const dynamic = "force-dynamic";
// Generar metadata dinámica
export async function generateMetadata() {
  return {
    title: "Vehículos Disponibles - AutoMax Rosario",
    description: "Explora nuestro catálogo de vehículos usados de calidad.",
  };
}
// ==============================================
// PÁGINA: VEHÍCULOS CON FILTROS
// ==============================================

interface VehiculosPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    brands?: string;
    yearFrom?: string;
    yearTo?: string;
    priceFrom?: string;
    priceTo?: string;
    kilometersFrom?: string;
    kilometersTo?: string;
    fuelTypes?: string;
    transmissions?: string;
    bodyTypes?: string;
    sortBy?: VehicleSortBy;
  }>;
}

export default async function VehiculosPage({
  searchParams,
}: VehiculosPageProps) {
  // Await searchParams
  const params = await searchParams;

  const page = parseInt(params.page || "1");
  const sortBy = (params.sortBy || "recent") as VehicleSortBy;

  // Construir filtros desde params
  const filters = {
    search: params.search || undefined,
    brands: params.brands?.split(",") || undefined,
    yearFrom: params.yearFrom ? parseInt(params.yearFrom) : undefined,
    yearTo: params.yearTo ? parseInt(params.yearTo) : undefined,
    priceFrom: params.priceFrom ? parseInt(params.priceFrom) : undefined,
    priceTo: params.priceTo ? parseInt(params.priceTo) : undefined,
    kilometersFrom: params.kilometersFrom
      ? parseInt(params.kilometersFrom)
      : undefined,
    kilometersTo: params.kilometersTo
      ? parseInt(params.kilometersTo)
      : undefined,
    fuelTypes: params.fuelTypes?.split(",") || undefined,
    transmissions: params.transmissions?.split(",") || undefined,
    bodyTypes: params.bodyTypes?.split(",") || undefined,
  };

  // Obtener datos de Supabase
  const [{ vehicles, total }, uniqueBrands] = await Promise.all([
    getVehicles({
      filters,
      sortBy,
      page,
      limit: 12,
    }),
    getUniqueBrands(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Vehículos Disponibles
          </h1>
        </FadeIn>

        <SlideIn direction="up" delay={0.1}>
          <VehiclesClient
            initialVehicles={vehicles}
            total={total}
            uniqueBrands={uniqueBrands}
          />
        </SlideIn>
      </div>
    </div>
  );
}

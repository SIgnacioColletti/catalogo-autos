"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { VehicleGrid } from "@/components/vehiculos/VehicleGrid";
import { FilterSidebarClient } from "@/components/vehiculos/FilterSidebarClient";
import { SearchBarClient } from "@/components/vehiculos/SearchBarClient";
import { MobileFiltersClient } from "@/components/vehiculos/MobileFiltersClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Vehicle } from "@/lib/types";
import type { VehicleSortBy } from "@/lib/supabase/queries";

// ==============================================
// CLIENT COMPONENT PARA FILTROS
// ==============================================

interface VehiclesClientProps {
  initialVehicles: Vehicle[];
  total: number;
  uniqueBrands: string[];
}

export const VehiclesClient = ({
  initialVehicles,
  total,
  uniqueBrands,
}: VehiclesClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = (searchParams.get("sortBy") || "recent") as VehicleSortBy;

  const handleSortChange = (value: VehicleSortBy) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.delete("page"); // Reset a página 1
    router.push(`/vehiculos?${params.toString()}`);
  };

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/vehiculos?${params.toString()}`);
  };

  const handleFilterChange = (filters: Record<string, any>) => {
    const params = new URLSearchParams();

    // Agregar cada filtro a los params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value) && value.length > 0) {
          params.set(key, value.join(","));
        } else if (!Array.isArray(value)) {
          params.set(key, value.toString());
        }
      }
    });

    // Mantener sortBy si existe
    if (sortBy) {
      params.set("sortBy", sortBy);
    }

    router.push(`/vehiculos?${params.toString()}`);
  };

  // Verificar si hay filtros activos
  const hasActiveFilters =
    searchParams.get("search") ||
    searchParams.get("brands") ||
    searchParams.get("yearFrom") ||
    searchParams.get("yearTo") ||
    searchParams.get("priceFrom") ||
    searchParams.get("priceTo") ||
    searchParams.get("kilometersFrom") ||
    searchParams.get("kilometersTo") ||
    searchParams.get("fuelTypes") ||
    searchParams.get("transmissions") ||
    searchParams.get("bodyTypes");

  return (
    <>
      {/* Barra de búsqueda */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <SearchBarClient
            defaultValue={searchParams.get("search") || ""}
            onSearch={handleSearch}
          />
        </div>
        <div className="lg:hidden">
          <MobileFiltersClient
            uniqueBrands={uniqueBrands}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de filtros - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebarClient
            uniqueBrands={uniqueBrands}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          {/* Barra de acciones */}
          <div className="bg-white rounded-lg border p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Mostrando{" "}
              <span className="font-semibold text-gray-900">{total}</span>{" "}
              vehículo{total !== 1 ? "s" : ""}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más recientes</SelectItem>
                  <SelectItem value="price-asc">Menor precio</SelectItem>
                  <SelectItem value="price-desc">Mayor precio</SelectItem>
                  <SelectItem value="year-desc">Más nuevo</SelectItem>
                  <SelectItem value="year-asc">Más antiguo</SelectItem>
                  <SelectItem value="km-asc">Menos km</SelectItem>
                  <SelectItem value="km-desc">Más km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid de vehículos */}
          <VehicleGrid
            vehicles={initialVehicles}
            isFiltered={!!hasActiveFilters}
          />
        </div>
      </div>
    </>
  );
};

"use client";

import { useState, useMemo } from "react";
import { VehicleGrid } from "@/components/vehiculos/VehicleGrid";
import { SearchBar } from "@/components/vehiculos/SearchBar";
import { FilterSidebar } from "@/components/vehiculos/FilterSidebar";
import { FilterBadges } from "@/components/vehiculos/FilterBadges";
import { MobileFilters } from "@/components/vehiculos/MobileFilters";
import { Pagination } from "@/components/vehiculos/Pagination";
import { useFilterStore } from "@/lib/store/useFilterStore";
import { mockVehicles } from "@/lib/data/vehicles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";

export default function VehiculosPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");

  const filters = useFilterStore();

  // Filtrar vehículos
  const filteredVehicles = useMemo(() => {
    let result = mockVehicles.filter((v) => v.status !== "sold");

    // Filtro de búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (v) =>
          v.brand.toLowerCase().includes(searchLower) ||
          v.model.toLowerCase().includes(searchLower) ||
          v.year.toString().includes(searchLower)
      );
    }

    // Filtro de marcas
    if (filters.brands.length > 0) {
      result = result.filter((v) => filters.brands.includes(v.brand));
    }

    // Filtro de año
    if (filters.yearFrom !== null) {
      result = result.filter((v) => v.year >= filters.yearFrom!);
    }
    if (filters.yearTo !== null) {
      result = result.filter((v) => v.year <= filters.yearTo!);
    }

    // Filtro de precio
    if (filters.priceFrom !== null) {
      result = result.filter((v) => v.price >= filters.priceFrom!);
    }
    if (filters.priceTo !== null) {
      result = result.filter((v) => v.price <= filters.priceTo!);
    }

    // Filtro de kilómetros
    if (filters.kilometersFrom !== null) {
      result = result.filter((v) => v.kilometers >= filters.kilometersFrom!);
    }
    if (filters.kilometersTo !== null) {
      result = result.filter((v) => v.kilometers <= filters.kilometersTo!);
    }

    // Filtro de combustible
    if (filters.fuelTypes.length > 0) {
      result = result.filter((v) => filters.fuelTypes.includes(v.fuel_type));
    }

    // Filtro de transmisión
    if (filters.transmissions.length > 0) {
      result = result.filter((v) =>
        filters.transmissions.includes(v.transmission)
      );
    }

    // Filtro de carrocería
    if (filters.bodyTypes.length > 0) {
      result = result.filter((v) => filters.bodyTypes.includes(v.body_type));
    }

    return result;
  }, [filters]);

  // Ordenar vehículos
  const sortedVehicles = useMemo(() => {
    const sorted = [...filteredVehicles];

    switch (sortBy) {
      case "recent":
        return sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "year-desc":
        return sorted.sort((a, b) => b.year - a.year);
      case "year-asc":
        return sorted.sort((a, b) => a.year - b.year);
      case "km-asc":
        return sorted.sort((a, b) => a.kilometers - b.kilometers);
      case "km-desc":
        return sorted.sort((a, b) => b.kilometers - a.kilometers);
      default:
        return sorted;
    }
  }, [filteredVehicles, sortBy]);

  // Paginación
  const totalPages = Math.ceil(sortedVehicles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedVehicles = sortedVehicles.slice(startIndex, endIndex);

  // Resetear a página 1 cuando cambian los filtros
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  // Verificar si hay filtros activos
  const hasActiveFilters =
    filters.search ||
    filters.brands.length > 0 ||
    filters.yearFrom !== null ||
    filters.yearTo !== null ||
    filters.priceFrom !== null ||
    filters.priceTo !== null ||
    filters.kilometersFrom !== null ||
    filters.kilometersTo !== null ||
    filters.fuelTypes.length > 0 ||
    filters.transmissions.length > 0 ||
    filters.bodyTypes.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Vehículos Disponibles
          </h1>
        </FadeIn>

        {/* Barra de búsqueda y filtros mobile */}
        <SlideIn direction="up" delay={0.1}>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <SearchBar />
            </div>
            <div className="lg:hidden">
              <MobileFilters vehicles={mockVehicles} />
            </div>
          </div>
        </SlideIn>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <SlideIn direction="right" delay={0.2}>
              <FilterSidebar vehicles={mockVehicles} />
            </SlideIn>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            <SlideIn direction="up" delay={0.3}>
              {/* Barra de acciones */}
              <div className="bg-white rounded-lg border p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Mostrando{" "}
                  <span className="font-semibold text-gray-900">
                    {sortedVehicles.length}
                  </span>{" "}
                  vehículo{sortedVehicles.length !== 1 ? "s" : ""}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
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

              {/* Badges de filtros activos */}
              {hasActiveFilters && <FilterBadges />}

              {/* Grid de vehículos */}
              <VehicleGrid
                vehicles={paginatedVehicles}
                isFiltered={!!hasActiveFilters}
              />

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  );
}

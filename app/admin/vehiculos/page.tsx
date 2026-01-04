"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VehiclesTable } from "@/components/admin/vehiculos/VehiclesTable";
import { useVehiclesStore } from "@/lib/store/useVehiclesStore";
import { Plus, Search, Filter, RotateCcw } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { useDebounce } from "@/hooks/useDebounce";

// ==============================================
// PÁGINA DE GESTIÓN DE VEHÍCULOS
// ==============================================

export default function AdminVehiculosPage() {
  const { vehicles, resetVehicles } = useVehiclesStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("recent");

  // Debounce search
  const debouncedSearch = useDebounce(search, 300);

  // Filtrar y ordenar vehículos
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Filtro de búsqueda
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (v) =>
          v.brand.toLowerCase().includes(searchLower) ||
          v.model.toLowerCase().includes(searchLower) ||
          v.year.toString().includes(searchLower)
      );
    }

    // Filtro de estado
    if (statusFilter !== "all") {
      result = result.filter((v) => v.status === statusFilter);
    }

    // Ordenamiento
    switch (sortBy) {
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "views":
        result.sort((a, b) => b.views - a.views);
        break;
    }

    return result;
  }, [vehicles, debouncedSearch, statusFilter, sortBy]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehículos</h2>
            <p className="text-gray-600">Gestiona tu inventario de vehículos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetVehicles} size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetear
            </Button>
            <Button asChild>
              <Link href="/admin/vehiculos/nuevo">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Vehículo
              </Link>
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Filtros */}
      <SlideIn direction="up" delay={0.1}>
        <div className="bg-white p-4 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4" />
            Filtros y Búsqueda
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por marca, modelo o año..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Filtro de estado */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="available">Disponibles</SelectItem>
                <SelectItem value="reserved">Reservados</SelectItem>
                <SelectItem value="sold">Vendidos</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenamiento */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="price-asc">Menor precio</SelectItem>
                <SelectItem value="price-desc">Mayor precio</SelectItem>
                <SelectItem value="views">Más vistos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contador de resultados */}
          <div className="text-sm text-gray-600">
            Mostrando{" "}
            <span className="font-semibold">{filteredVehicles.length}</span> de{" "}
            <span className="font-semibold">{vehicles.length}</span> vehículos
          </div>
        </div>
      </SlideIn>

      {/* Tabla */}
      <SlideIn direction="up" delay={0.2}>
        <VehiclesTable vehicles={filteredVehicles} />
      </SlideIn>
    </div>
  );
}

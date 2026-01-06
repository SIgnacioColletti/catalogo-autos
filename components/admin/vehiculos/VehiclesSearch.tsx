"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

// ==============================================
// BÚSQUEDA Y FILTROS ADMIN
// ==============================================

interface VehiclesSearchProps {
  onSearch: (query: string) => void;
  onFilterStatus: (status: string) => void;
  onFilterFeatured: (featured: string) => void;
}

export const VehiclesSearch = ({
  onSearch,
  onFilterStatus,
  onFilterFeatured,
}: VehiclesSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleClear = () => {
    setSearchQuery("");
    onFilterStatus("all");
    onFilterFeatured("all");
  };

  return (
    <div className="space-y-4">
      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por marca, modelo, año..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-4">
        {/* Estado */}
        <div className="flex-1 min-w-[200px]">
          <Select onValueChange={onFilterStatus} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="reserved">Reservado</SelectItem>
              <SelectItem value="sold">Vendido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Destacados */}
        <div className="flex-1 min-w-[200px]">
          <Select onValueChange={onFilterFeatured} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Destacados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Solo destacados</SelectItem>
              <SelectItem value="false">No destacados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Limpiar filtros */}
        <Button variant="outline" onClick={handleClear}>
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
};

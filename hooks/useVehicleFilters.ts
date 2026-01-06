"use client";

import { useState, useMemo } from "react";
import type { Vehicle } from "@/lib/types";

// ==============================================
// HOOK PARA FILTRAR VEHÍCULOS
// ==============================================

export function useVehicleFilters(vehicles: Vehicle[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      // Filtro de búsqueda
      const matchesSearch =
        searchQuery === "" ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.year.toString().includes(searchQuery) ||
        vehicle.color.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro de estado
      const matchesStatus =
        statusFilter === "all" || vehicle.status === statusFilter;

      // Filtro de destacados
      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "true" && vehicle.is_featured) ||
        (featuredFilter === "false" && !vehicle.is_featured);

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [vehicles, searchQuery, statusFilter, featuredFilter]);

  return {
    filteredVehicles,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    featuredFilter,
    setFeaturedFilter,
  };
}

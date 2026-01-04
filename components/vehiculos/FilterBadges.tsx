"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useFilterStore } from "@/lib/store/useFilterStore";
import {
  formatPrice,
  formatKilometers,
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";

// ==============================================
// BADGES DE FILTROS ACTIVOS
// ==============================================

export const FilterBadges = () => {
  const filters = useFilterStore();

  const activeBrands = filters.brands || [];
  const activeFuelTypes = filters.fuelTypes || [];
  const activeTransmissions = filters.transmissions || [];
  const activeBodyTypes = filters.bodyTypes || [];

  const hasFilters =
    activeBrands.length > 0 ||
    filters.yearFrom !== null ||
    filters.yearTo !== null ||
    filters.priceFrom !== null ||
    filters.priceTo !== null ||
    filters.kilometersFrom !== null ||
    filters.kilometersTo !== null ||
    activeFuelTypes.length > 0 ||
    activeTransmissions.length > 0 ||
    activeBodyTypes.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* Marcas */}
      {activeBrands.map((brand) => (
        <Badge
          key={brand}
          variant="secondary"
          className="pl-3 pr-2 py-1.5 text-sm"
        >
          {brand}
          <button
            onClick={() => filters.toggleBrand(brand)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {/* Año */}
      {(filters.yearFrom !== null || filters.yearTo !== null) && (
        <Badge variant="secondary" className="pl-3 pr-2 py-1.5 text-sm">
          Año: {filters.yearFrom ?? 2015} - {filters.yearTo ?? 2024}
          <button
            onClick={() => filters.setYearRange(null, null)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {/* Precio */}
      {(filters.priceFrom !== null || filters.priceTo !== null) && (
        <Badge variant="secondary" className="pl-3 pr-2 py-1.5 text-sm">
          Precio: {formatPrice(filters.priceFrom ?? 5000000)} -{" "}
          {formatPrice(filters.priceTo ?? 42000000)}
          <button
            onClick={() => filters.setPriceRange(null, null)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {/* Kilómetros */}
      {(filters.kilometersFrom !== null || filters.kilometersTo !== null) && (
        <Badge variant="secondary" className="pl-3 pr-2 py-1.5 text-sm">
          Km: {formatKilometers(filters.kilometersFrom ?? 0)} -{" "}
          {formatKilometers(filters.kilometersTo ?? 300000)}
          <button
            onClick={() => filters.setKilometersRange(null, null)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {/* Combustible */}
      {activeFuelTypes.map((fuelType) => (
        <Badge
          key={fuelType}
          variant="secondary"
          className="pl-3 pr-2 py-1.5 text-sm"
        >
          {fuelTypeLabels[fuelType as keyof typeof fuelTypeLabels]}
          <button
            onClick={() => filters.toggleFuelType(fuelType)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {/* Transmisión */}
      {activeTransmissions.map((transmission) => (
        <Badge
          key={transmission}
          variant="secondary"
          className="pl-3 pr-2 py-1.5 text-sm"
        >
          {transmissionLabels[transmission as keyof typeof transmissionLabels]}
          <button
            onClick={() => filters.toggleTransmission(transmission)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {/* Carrocería */}
      {activeBodyTypes.map((bodyType) => (
        <Badge
          key={bodyType}
          variant="secondary"
          className="pl-3 pr-2 py-1.5 text-sm"
        >
          {bodyTypeLabels[bodyType as keyof typeof bodyTypeLabels]}
          <button
            onClick={() => filters.toggleBodyType(bodyType)}
            className="ml-2 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
};

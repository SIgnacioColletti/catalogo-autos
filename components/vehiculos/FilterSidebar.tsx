"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useFilterStore } from "@/lib/store/useFilterStore";
import {
  formatPrice,
  formatKilometers,
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import type { Vehicle } from "@/lib/types";

// ==============================================
// SIDEBAR DE FILTROS
// ==============================================

interface FilterSidebarProps {
  vehicles: Vehicle[];
}

export const FilterSidebar = ({ vehicles }: FilterSidebarProps) => {
  const filters = useFilterStore();

  // Estados locales para collapsar secciones
  const [showBrandFilter, setShowBrandFilter] = useState(true);
  const [showYearFilter, setShowYearFilter] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showKilometersFilter, setShowKilometersFilter] = useState(false);
  const [showFuelFilter, setShowFuelFilter] = useState(false);
  const [showTransmissionFilter, setShowTransmissionFilter] = useState(false);
  const [showBodyTypeFilter, setShowBodyTypeFilter] = useState(false);

  // Obtener marcas únicas
  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(vehicles.map((v) => v.brand))];
    return brands.sort();
  }, [vehicles]);

  // Contar vehículos por marca
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    vehicles.forEach((v) => {
      counts[v.brand] = (counts[v.brand] || 0) + 1;
    });
    return counts;
  }, [vehicles]);

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

  const handleClearFilters = () => {
    filters.clearFilters();
  };

  // Componente reutilizable para header de sección
  const SectionHeader = ({
    title,
    section,
    expanded,
    onToggle,
  }: {
    title: string;
    section: string;
    expanded: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-2 text-sm font-semibold hover:text-primary transition-colors"
    >
      {title}
      {expanded ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <Card className="bg-white rounded-lg border p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0 space-y-6">
        {/* FILTRO: MARCAS */}
        <div>
          <SectionHeader
            title="Marca"
            section="brands"
            expanded={showBrandFilter}
            onToggle={() => setShowBrandFilter(!showBrandFilter)}
          />
          {showBrandFilter && (
            <div className="space-y-2 max-h-48 overflow-y-auto mt-2">
              {uniqueBrands.map((brand) => {
                const count = brandCounts[brand] || 0;
                const isChecked = filters.brands.includes(brand);

                return (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={isChecked}
                      onCheckedChange={() => filters.toggleBrand(brand)}
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="flex-1 cursor-pointer text-sm font-normal"
                    >
                      {brand} ({count})
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Separator />

        {/* FILTRO: AÑO */}
        <div>
          <SectionHeader
            title="Año"
            section="year"
            expanded={showYearFilter}
            onToggle={() => setShowYearFilter(!showYearFilter)}
          />
          {showYearFilter && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{filters.yearFrom ?? 2010}</span>
                <span>{filters.yearTo ?? 2024}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Desde</Label>
                  <Slider
                    value={[filters.yearFrom ?? 2015]}
                    onValueChange={(value) =>
                      filters.setYearRange(value[0], filters.yearTo)
                    }
                    min={2015}
                    max={2024}
                    step={1}
                    className="my-2"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Hasta</Label>
                  <Slider
                    value={[filters.yearTo ?? 2024]}
                    onValueChange={(value) =>
                      filters.setYearRange(filters.yearFrom, value[0])
                    }
                    min={2015}
                    max={2024}
                    step={1}
                    className="my-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* FILTRO: PRECIO */}
        <div>
          <SectionHeader
            title="Precio"
            section="price"
            expanded={showPriceFilter}
            onToggle={() => setShowPriceFilter(!showPriceFilter)}
          />
          {showPriceFilter && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceFrom ?? 5000000)}</span>
                <span>{formatPrice(filters.priceTo ?? 42000000)}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Desde</Label>
                  <Slider
                    value={[filters.priceFrom ?? 5000000]}
                    onValueChange={(value) =>
                      filters.setPriceRange(value[0], filters.priceTo)
                    }
                    min={5000000}
                    max={42000000}
                    step={500000}
                    className="my-2"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Hasta</Label>
                  <Slider
                    value={[filters.priceTo ?? 42000000]}
                    onValueChange={(value) =>
                      filters.setPriceRange(filters.priceFrom, value[0])
                    }
                    min={5000000}
                    max={42000000}
                    step={500000}
                    className="my-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* FILTRO: KILÓMETROS */}
        <div>
          <SectionHeader
            title="Kilómetros"
            section="kilometers"
            expanded={showKilometersFilter}
            onToggle={() => setShowKilometersFilter(!showKilometersFilter)}
          />
          {showKilometersFilter && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatKilometers(filters.kilometersFrom ?? 0)}</span>
                <span>{formatKilometers(filters.kilometersTo ?? 300000)}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Desde</Label>
                  <Slider
                    value={[filters.kilometersFrom ?? 0]}
                    onValueChange={(value) =>
                      filters.setKilometersRange(value[0], filters.kilometersTo)
                    }
                    min={0}
                    max={300000}
                    step={5000}
                    className="my-2"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Hasta</Label>
                  <Slider
                    value={[filters.kilometersTo ?? 300000]}
                    onValueChange={(value) =>
                      filters.setKilometersRange(
                        filters.kilometersFrom,
                        value[0]
                      )
                    }
                    min={0}
                    max={300000}
                    step={5000}
                    className="my-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* FILTRO: COMBUSTIBLE */}
        <div>
          <SectionHeader
            title="Combustible"
            section="fuel"
            expanded={showFuelFilter}
            onToggle={() => setShowFuelFilter(!showFuelFilter)}
          />
          {showFuelFilter && (
            <div className="space-y-2 mt-2">
              {Object.entries(fuelTypeLabels).map(([value, label]) => {
                const isChecked = filters.fuelTypes.includes(value);

                return (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fuel-${value}`}
                      checked={isChecked}
                      onCheckedChange={() => filters.toggleFuelType(value)}
                    />
                    <Label
                      htmlFor={`fuel-${value}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {label}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Separator />

        {/* FILTRO: TRANSMISIÓN */}
        <div>
          <SectionHeader
            title="Transmisión"
            section="transmission"
            expanded={showTransmissionFilter}
            onToggle={() => setShowTransmissionFilter(!showTransmissionFilter)}
          />
          {showTransmissionFilter && (
            <div className="space-y-2 mt-2">
              {Object.entries(transmissionLabels).map(([value, label]) => {
                const isChecked = filters.transmissions.includes(value);

                return (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`transmission-${value}`}
                      checked={isChecked}
                      onCheckedChange={() => filters.toggleTransmission(value)}
                    />
                    <Label
                      htmlFor={`transmission-${value}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {label}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Separator />

        {/* FILTRO: CARROCERÍA */}
        <div>
          <SectionHeader
            title="Tipo de Carrocería"
            section="bodyType"
            expanded={showBodyTypeFilter}
            onToggle={() => setShowBodyTypeFilter(!showBodyTypeFilter)}
          />
          {showBodyTypeFilter && (
            <div className="space-y-2 mt-2">
              {Object.entries(bodyTypeLabels).map(([value, label]) => {
                const isChecked = filters.bodyTypes.includes(value);

                return (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`body-${value}`}
                      checked={isChecked}
                      onCheckedChange={() => filters.toggleBodyType(value)}
                    />
                    <Label
                      htmlFor={`body-${value}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {label}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

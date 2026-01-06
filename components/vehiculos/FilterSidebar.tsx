"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  formatPrice,
  formatKilometers,
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterSidebarProps {
  uniqueBrands: string[];
}

export const FilterSidebar = ({ uniqueBrands }: FilterSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados de secciones colapsables
  const [showBrandFilter, setShowBrandFilter] = useState(true);
  const [showYearFilter, setShowYearFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showKilometersFilter, setShowKilometersFilter] = useState(false);
  const [showFuelFilter, setShowFuelFilter] = useState(false);
  const [showTransmissionFilter, setShowTransmissionFilter] = useState(false);
  const [showBodyTypeFilter, setShowBodyTypeFilter] = useState(false);

  // Leer estado actual de la URL
  const selectedBrands = searchParams.get("brands")?.split(",") || [];
  const yearFrom = parseInt(searchParams.get("yearFrom") || "2015");
  const yearTo = parseInt(searchParams.get("yearTo") || "2024");
  const priceFrom = parseInt(searchParams.get("priceFrom") || "5000000");
  const priceTo = parseInt(searchParams.get("priceTo") || "42000000");
  const kilometersFrom = parseInt(searchParams.get("kilometersFrom") || "0");
  const kilometersTo = parseInt(searchParams.get("kilometersTo") || "300000");
  const selectedFuelTypes = searchParams.get("fuelTypes")?.split(",") || [];
  const selectedTransmissions =
    searchParams.get("transmissions")?.split(",") || [];
  const selectedBodyTypes = searchParams.get("bodyTypes")?.split(",") || [];

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.delete("page"); // Reset página
    router.push(`/vehiculos?${params.toString()}`);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    updateFilters({
      brands: newBrands.length > 0 ? newBrands.join(",") : null,
    });
  };

  const handleClearFilters = () => {
    router.push("/vehiculos");
  };

  const hasActiveFilters = searchParams.toString() !== "";

  const SectionHeader = ({
    title,
    expanded,
    onToggle,
  }: {
    title: string;
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
        {/* MARCAS */}
        <div>
          <SectionHeader
            title="Marca"
            expanded={showBrandFilter}
            onToggle={() => setShowBrandFilter(!showBrandFilter)}
          />
          {showBrandFilter && (
            <div className="space-y-2 max-h-48 overflow-y-auto mt-2">
              {uniqueBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="flex-1 cursor-pointer text-sm font-normal"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* AÑO */}
        <div>
          <SectionHeader
            title="Año"
            expanded={showYearFilter}
            onToggle={() => setShowYearFilter(!showYearFilter)}
          />
          {showYearFilter && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{yearFrom}</span>
                <span>{yearTo}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Desde</Label>
                  <Slider
                    value={[yearFrom]}
                    onValueChange={([value]) =>
                      updateFilters({ yearFrom: value.toString() })
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
                    value={[yearTo]}
                    onValueChange={([value]) =>
                      updateFilters({ yearTo: value.toString() })
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

        {/* PRECIO */}
        <div>
          <SectionHeader
            title="Precio"
            expanded={showPriceFilter}
            onToggle={() => setShowPriceFilter(!showPriceFilter)}
          />
          {showPriceFilter && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(priceFrom)}</span>
                <span>{formatPrice(priceTo)}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Desde</Label>
                  <Slider
                    value={[priceFrom]}
                    onValueChange={([value]) =>
                      updateFilters({ priceFrom: value.toString() })
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
                    value={[priceTo]}
                    onValueChange={([value]) =>
                      updateFilters({ priceTo: value.toString() })
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

        {/* KILÓMETROS */}
        <div>
          <SectionHeader
            title="Kilómetros"
            expanded={showKilometersFilter}
            onToggle={() => setShowKilometersFilter(!showKilometersFilter)}
          />
          {showKilometersFilter && (
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatKilometers(kilometersFrom)}</span>
                <span>{formatKilometers(kilometersTo)}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Desde</Label>
                  <Slider
                    value={[kilometersFrom]}
                    onValueChange={([value]) =>
                      updateFilters({ kilometersFrom: value.toString() })
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
                    value={[kilometersTo]}
                    onValueChange={([value]) =>
                      updateFilters({ kilometersTo: value.toString() })
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

        {/* COMBUSTIBLE */}
        <div>
          <SectionHeader
            title="Combustible"
            expanded={showFuelFilter}
            onToggle={() => setShowFuelFilter(!showFuelFilter)}
          />
          {showFuelFilter && (
            <div className="space-y-2 mt-2">
              {Object.entries(fuelTypeLabels).map(([value, label]) => {
                const isChecked = selectedFuelTypes.includes(value);
                return (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fuel-${value}`}
                      checked={isChecked}
                      onCheckedChange={() => {
                        const newTypes = isChecked
                          ? selectedFuelTypes.filter((t) => t !== value)
                          : [...selectedFuelTypes, value];
                        updateFilters({
                          fuelTypes:
                            newTypes.length > 0 ? newTypes.join(",") : null,
                        });
                      }}
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

        {/* TRANSMISIÓN */}
        <div>
          <SectionHeader
            title="Transmisión"
            expanded={showTransmissionFilter}
            onToggle={() => setShowTransmissionFilter(!showTransmissionFilter)}
          />
          {showTransmissionFilter && (
            <div className="space-y-2 mt-2">
              {Object.entries(transmissionLabels).map(([value, label]) => {
                const isChecked = selectedTransmissions.includes(value);
                return (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`transmission-${value}`}
                      checked={isChecked}
                      onCheckedChange={() => {
                        const newTypes = isChecked
                          ? selectedTransmissions.filter((t) => t !== value)
                          : [...selectedTransmissions, value];
                        updateFilters({
                          transmissions:
                            newTypes.length > 0 ? newTypes.join(",") : null,
                        });
                      }}
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

        {/* CARROCERÍA */}
        <div>
          <SectionHeader
            title="Tipo de Carrocería"
            expanded={showBodyTypeFilter}
            onToggle={() => setShowBodyTypeFilter(!showBodyTypeFilter)}
          />
          {showBodyTypeFilter && (
            <div className="space-y-2 mt-2">
              {Object.entries(bodyTypeLabels).map(([value, label]) => {
                const isChecked = selectedBodyTypes.includes(value);
                return (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`body-${value}`}
                      checked={isChecked}
                      onCheckedChange={() => {
                        const newTypes = isChecked
                          ? selectedBodyTypes.filter((t) => t !== value)
                          : [...selectedBodyTypes, value];
                        updateFilters({
                          bodyTypes:
                            newTypes.length > 0 ? newTypes.join(",") : null,
                        });
                      }}
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

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import {
  formatPrice,
  formatKilometers,
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";
import type { VehicleRanges } from "./VehiclesClient";

// ==============================================
// SIDEBAR DE FILTROS CLIENT CON RANGOS DINÁMICOS
// ==============================================

interface FilterSidebarClientProps {
  uniqueBrands: string[];
  vehicleRanges: VehicleRanges;
  onFilterChange: (filters: Record<string, any>) => void;
}

export const FilterSidebarClient = ({
  uniqueBrands,
  vehicleRanges,
  onFilterChange,
}: FilterSidebarClientProps) => {
  const searchParams = useSearchParams();

  // Estados de filtros
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const [kmFrom, setKmFrom] = useState<string>("");
  const [kmTo, setKmTo] = useState<string>("");
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    []
  );
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);

  // Estados para colapsar secciones
  const [showBrands, setShowBrands] = useState(true);
  const [showYear, setShowYear] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showKm, setShowKm] = useState(false);
  const [showFuel, setShowFuel] = useState(false);
  const [showTransmission, setShowTransmission] = useState(false);
  const [showBodyType, setShowBodyType] = useState(false);

  // Cargar filtros desde URL
  useEffect(() => {
    const brands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
    const fuelTypes =
      searchParams.get("fuelTypes")?.split(",").filter(Boolean) || [];
    const transmissions =
      searchParams.get("transmissions")?.split(",").filter(Boolean) || [];
    const bodyTypes =
      searchParams.get("bodyTypes")?.split(",").filter(Boolean) || [];

    setSelectedBrands(brands);
    setYearFrom(searchParams.get("yearFrom") || "");
    setYearTo(searchParams.get("yearTo") || "");
    setPriceFrom(searchParams.get("priceFrom") || "");
    setPriceTo(searchParams.get("priceTo") || "");
    setKmFrom(searchParams.get("kilometersFrom") || "");
    setKmTo(searchParams.get("kilometersTo") || "");
    setSelectedFuelTypes(fuelTypes);
    setSelectedTransmissions(transmissions);
    setSelectedBodyTypes(bodyTypes);
  }, [searchParams]);

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    applyFilters({ brands: newBrands });
  };

  const handleFuelToggle = (fuel: string) => {
    const newFuels = selectedFuelTypes.includes(fuel)
      ? selectedFuelTypes.filter((f) => f !== fuel)
      : [...selectedFuelTypes, fuel];
    setSelectedFuelTypes(newFuels);
    applyFilters({ fuelTypes: newFuels });
  };

  const handleTransmissionToggle = (transmission: string) => {
    const newTransmissions = selectedTransmissions.includes(transmission)
      ? selectedTransmissions.filter((t) => t !== transmission)
      : [...selectedTransmissions, transmission];
    setSelectedTransmissions(newTransmissions);
    applyFilters({ transmissions: newTransmissions });
  };

  const handleBodyTypeToggle = (bodyType: string) => {
    const newBodyTypes = selectedBodyTypes.includes(bodyType)
      ? selectedBodyTypes.filter((b) => b !== bodyType)
      : [...selectedBodyTypes, bodyType];
    setSelectedBodyTypes(newBodyTypes);
    applyFilters({ bodyTypes: newBodyTypes });
  };

  const applyFilters = (updates: Partial<Record<string, any>> = {}) => {
    const filters: Record<string, any> = {
      brands: selectedBrands,
      yearFrom: yearFrom || undefined,
      yearTo: yearTo || undefined,
      priceFrom: priceFrom || undefined,
      priceTo: priceTo || undefined,
      kilometersFrom: kmFrom || undefined,
      kilometersTo: kmTo || undefined,
      fuelTypes: selectedFuelTypes,
      transmissions: selectedTransmissions,
      bodyTypes: selectedBodyTypes,
      ...updates,
    };

    // Limpiar valores vacíos
    Object.keys(filters).forEach((key) => {
      if (
        filters[key] === undefined ||
        filters[key] === "" ||
        (Array.isArray(filters[key]) && filters[key].length === 0)
      ) {
        delete filters[key];
      }
    });

    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setYearFrom("");
    setYearTo("");
    setPriceFrom("");
    setPriceTo("");
    setKmFrom("");
    setKmTo("");
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
    setSelectedBodyTypes([]);
    onFilterChange({});
  };

  // Contar filtros activos
  const activeFiltersCount =
    selectedBrands.length +
    (yearFrom || yearTo ? 1 : 0) +
    (priceFrom || priceTo ? 1 : 0) +
    (kmFrom || kmTo ? 1 : 0) +
    selectedFuelTypes.length +
    selectedTransmissions.length +
    selectedBodyTypes.length;

  const CollapsibleHeader = ({
    title,
    expanded,
    onToggle,
    count,
  }: {
    title: string;
    expanded: boolean;
    onToggle: () => void;
    count?: number;
  }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-2 text-sm font-semibold hover:text-blue-600 transition-colors"
    >
      <span className="flex items-center gap-2">
        {title}
        {count !== undefined && count > 0 && (
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </span>
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
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar ({activeFiltersCount})
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0 space-y-2">
        {/* MARCA */}
        <div>
          <CollapsibleHeader
            title="Marca"
            expanded={showBrands}
            onToggle={() => setShowBrands(!showBrands)}
            count={selectedBrands.length}
          />
          {showBrands && (
            <div className="space-y-2 max-h-48 overflow-y-auto mt-2 pl-1">
              {uniqueBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="cursor-pointer text-sm font-normal flex-1"
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
          <CollapsibleHeader
            title="Año"
            expanded={showYear}
            onToggle={() => setShowYear(!showYear)}
            count={yearFrom || yearTo ? 1 : 0}
          />
          {showYear && (
            <div className="space-y-3 mt-2 pl-1">
              <p className="text-xs text-gray-500">
                Rango disponible: {vehicleRanges.minYear} -{" "}
                {vehicleRanges.maxYear}
              </p>
              <div>
                <Label className="text-xs text-gray-600">Desde</Label>
                <Input
                  type="number"
                  placeholder={vehicleRanges.minYear.toString()}
                  min={vehicleRanges.minYear}
                  max={vehicleRanges.maxYear}
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Hasta</Label>
                <Input
                  type="number"
                  placeholder={vehicleRanges.maxYear.toString()}
                  min={vehicleRanges.minYear}
                  max={vehicleRanges.maxYear}
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* PRECIO */}
        <div>
          <CollapsibleHeader
            title="Precio"
            expanded={showPrice}
            onToggle={() => setShowPrice(!showPrice)}
            count={priceFrom || priceTo ? 1 : 0}
          />
          {showPrice && (
            <div className="space-y-3 mt-2 pl-1">
              <p className="text-xs text-gray-500">
                Rango disponible: {formatPrice(vehicleRanges.minPrice)} -{" "}
                {formatPrice(vehicleRanges.maxPrice)}
              </p>
              <div>
                <Label className="text-xs text-gray-600">Desde</Label>
                <Input
                  type="number"
                  placeholder={vehicleRanges.minPrice.toString()}
                  min={vehicleRanges.minPrice}
                  max={vehicleRanges.maxPrice}
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="mt-1"
                />
                {priceFrom && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatPrice(parseInt(priceFrom))}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-xs text-gray-600">Hasta</Label>
                <Input
                  type="number"
                  placeholder={vehicleRanges.maxPrice.toString()}
                  min={vehicleRanges.minPrice}
                  max={vehicleRanges.maxPrice}
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="mt-1"
                />
                {priceTo && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatPrice(parseInt(priceTo))}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* KILÓMETROS */}
        <div>
          <CollapsibleHeader
            title="Kilómetros"
            expanded={showKm}
            onToggle={() => setShowKm(!showKm)}
            count={kmFrom || kmTo ? 1 : 0}
          />
          {showKm && (
            <div className="space-y-3 mt-2 pl-1">
              <p className="text-xs text-gray-500">
                Rango disponible: {formatKilometers(vehicleRanges.minKm)} -{" "}
                {formatKilometers(vehicleRanges.maxKm)}
              </p>
              <div>
                <Label className="text-xs text-gray-600">Desde</Label>
                <Input
                  type="number"
                  placeholder={vehicleRanges.minKm.toString()}
                  min={vehicleRanges.minKm}
                  max={vehicleRanges.maxKm}
                  value={kmFrom}
                  onChange={(e) => setKmFrom(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="mt-1"
                />
                {kmFrom && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatKilometers(parseInt(kmFrom))}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-xs text-gray-600">Hasta</Label>
                <Input
                  type="number"
                  placeholder={vehicleRanges.maxKm.toString()}
                  min={vehicleRanges.minKm}
                  max={vehicleRanges.maxKm}
                  value={kmTo}
                  onChange={(e) => setKmTo(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="mt-1"
                />
                {kmTo && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatKilometers(parseInt(kmTo))}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* COMBUSTIBLE */}
        <div>
          <CollapsibleHeader
            title="Combustible"
            expanded={showFuel}
            onToggle={() => setShowFuel(!showFuel)}
            count={selectedFuelTypes.length}
          />
          {showFuel && (
            <div className="space-y-2 mt-2 pl-1">
              {Object.entries(fuelTypeLabels).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fuel-${value}`}
                    checked={selectedFuelTypes.includes(value)}
                    onCheckedChange={() => handleFuelToggle(value)}
                  />
                  <Label
                    htmlFor={`fuel-${value}`}
                    className="cursor-pointer text-sm font-normal flex-1"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* TRANSMISIÓN */}
        <div>
          <CollapsibleHeader
            title="Transmisión"
            expanded={showTransmission}
            onToggle={() => setShowTransmission(!showTransmission)}
            count={selectedTransmissions.length}
          />
          {showTransmission && (
            <div className="space-y-2 mt-2 pl-1">
              {Object.entries(transmissionLabels).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`transmission-${value}`}
                    checked={selectedTransmissions.includes(value)}
                    onCheckedChange={() => handleTransmissionToggle(value)}
                  />
                  <Label
                    htmlFor={`transmission-${value}`}
                    className="cursor-pointer text-sm font-normal flex-1"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* CARROCERÍA */}
        <div>
          <CollapsibleHeader
            title="Tipo de Carrocería"
            expanded={showBodyType}
            onToggle={() => setShowBodyType(!showBodyType)}
            count={selectedBodyTypes.length}
          />
          {showBodyType && (
            <div className="space-y-2 mt-2 pl-1">
              {Object.entries(bodyTypeLabels).map(([value, label]) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`body-${value}`}
                    checked={selectedBodyTypes.includes(value)}
                    onCheckedChange={() => handleBodyTypeToggle(value)}
                  />
                  <Label
                    htmlFor={`body-${value}`}
                    className="cursor-pointer text-sm font-normal flex-1"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

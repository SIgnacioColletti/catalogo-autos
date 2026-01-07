"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  formatPrice,
  formatKilometers,
  fuelTypeLabels,
  transmissionLabels,
  bodyTypeLabels,
} from "@/lib/utils";
import type { VehicleRanges } from "./VehiclesClient";

// ==============================================
// FILTROS MOBILE CLIENT CON RANGOS DINÁMICOS
// ==============================================

interface MobileFiltersClientProps {
  uniqueBrands: string[];
  vehicleRanges: VehicleRanges;
  onFilterChange: (filters: Record<string, any>) => void;
}

export const MobileFiltersClient = ({
  uniqueBrands,
  vehicleRanges,
  onFilterChange,
}: MobileFiltersClientProps) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

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

  // Cargar filtros desde URL al abrir
  useEffect(() => {
    if (isOpen) {
      const brands =
        searchParams.get("brands")?.split(",").filter(Boolean) || [];
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
    }
  }, [isOpen, searchParams]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleFuelToggle = (fuel: string) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };

  const handleTransmissionToggle = (transmission: string) => {
    setSelectedTransmissions((prev) =>
      prev.includes(transmission)
        ? prev.filter((t) => t !== transmission)
        : [...prev, transmission]
    );
  };

  const handleBodyTypeToggle = (bodyType: string) => {
    setSelectedBodyTypes((prev) =>
      prev.includes(bodyType)
        ? prev.filter((b) => b !== bodyType)
        : [...prev, bodyType]
    );
  };

  const handleApplyFilters = () => {
    const filters: Record<string, any> = {};

    if (selectedBrands.length > 0) filters.brands = selectedBrands;
    if (yearFrom) filters.yearFrom = yearFrom;
    if (yearTo) filters.yearTo = yearTo;
    if (priceFrom) filters.priceFrom = priceFrom;
    if (priceTo) filters.priceTo = priceTo;
    if (kmFrom) filters.kilometersFrom = kmFrom;
    if (kmTo) filters.kilometersTo = kmTo;
    if (selectedFuelTypes.length > 0) filters.fuelTypes = selectedFuelTypes;
    if (selectedTransmissions.length > 0)
      filters.transmissions = selectedTransmissions;
    if (selectedBodyTypes.length > 0) filters.bodyTypes = selectedBodyTypes;

    onFilterChange(filters);
    setIsOpen(false);
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
    setIsOpen(false);
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

  // Componente para header colapsable
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
      className="flex items-center justify-between w-full py-3 text-sm font-semibold hover:text-blue-600 transition-colors"
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] overflow-y-auto pb-24"
      >
        <SheetHeader>
          <SheetTitle>Filtros de Búsqueda</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {/* MARCA */}
          <div>
            <CollapsibleHeader
              title="Marca"
              expanded={showBrands}
              onToggle={() => setShowBrands(!showBrands)}
              count={selectedBrands.length}
            />
            {showBrands && (
              <div className="space-y-3 mt-2 max-h-48 overflow-y-auto pl-1">
                {uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <Label
                      htmlFor={`mobile-brand-${brand}`}
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
                  Rango: {vehicleRanges.minYear} - {vehicleRanges.maxYear}
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
                  Rango: {formatPrice(vehicleRanges.minPrice)} -{" "}
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
                  Rango: {formatKilometers(vehicleRanges.minKm)} -{" "}
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
              <div className="space-y-3 mt-2 pl-1">
                {Object.entries(fuelTypeLabels).map(([value, label]) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-fuel-${value}`}
                      checked={selectedFuelTypes.includes(value)}
                      onCheckedChange={() => handleFuelToggle(value)}
                    />
                    <Label
                      htmlFor={`mobile-fuel-${value}`}
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
              <div className="space-y-3 mt-2 pl-1">
                {Object.entries(transmissionLabels).map(([value, label]) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-transmission-${value}`}
                      checked={selectedTransmissions.includes(value)}
                      onCheckedChange={() => handleTransmissionToggle(value)}
                    />
                    <Label
                      htmlFor={`mobile-transmission-${value}`}
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
              <div className="space-y-3 mt-2 pl-1">
                {Object.entries(bodyTypeLabels).map(([value, label]) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-body-${value}`}
                      checked={selectedBodyTypes.includes(value)}
                      onCheckedChange={() => handleBodyTypeToggle(value)}
                    />
                    <Label
                      htmlFor={`mobile-body-${value}`}
                      className="cursor-pointer text-sm font-normal flex-1"
                    >
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción fijos */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t space-y-2 w-[300px] sm:w-[400px]">
          <Button onClick={handleApplyFilters} className="w-full" size="lg">
            Aplicar Filtros
            {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
          </Button>
          {activeFiltersCount > 0 && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar Filtros
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

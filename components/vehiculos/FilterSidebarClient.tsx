"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// ==============================================
// SIDEBAR DE FILTROS CLIENT
// ==============================================

interface FilterSidebarClientProps {
  uniqueBrands: string[];
  onFilterChange: (filters: Record<string, any>) => void;
}

export const FilterSidebarClient = ({
  uniqueBrands,
  onFilterChange,
}: FilterSidebarClientProps) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleBrandToggle = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(newBrands);
    onFilterChange({ brands: newBrands });
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    onFilterChange({});
  };

  return (
    <Card className="bg-white rounded-lg border p-6 sticky top-20">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros</CardTitle>
          {selectedBrands.length > 0 && (
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
      <CardContent className="px-0 pb-0">
        <div>
          <h3 className="font-semibold mb-3">Marca</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {uniqueBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
                <Label
                  htmlFor={`brand-${brand}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

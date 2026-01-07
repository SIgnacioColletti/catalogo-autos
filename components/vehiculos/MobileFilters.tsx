// components/vehiculos/MobileFilters.tsx
"use client";

import { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./FilterSidebar";
import { Vehicle } from "@/lib/types";

interface MobileFiltersProps {
  vehicles: Vehicle[];
  resultCount: number;
}

export const MobileFilters = ({
  vehicles,
  resultCount,
}: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  // ✅ Calcular marcas únicas a partir de los vehículos
  const uniqueBrands = useMemo(() => {
    const brands = vehicles.map((v) => v.brand);
    return Array.from(new Set(brands)).sort();
  }, [vehicles]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full md:hidden">
          <Filter className="mr-2 h-4 w-4" />
          Filtros ({resultCount} resultados)
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filtros de búsqueda</SheetTitle>
          <SheetDescription>Refina tu búsqueda de vehículos</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {/* ✅ CORRECCIÓN: Pasar uniqueBrands como prop */}
          <FilterSidebar uniqueBrands={uniqueBrands} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

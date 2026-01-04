"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./FilterSidebar";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { Vehicle } from "@/lib/types";

// ==============================================
// FILTROS MÓVILES (DRAWER)
// ==============================================

interface MobileFiltersProps {
  vehicles: Vehicle[];
}

export const MobileFilters = ({ vehicles }: MobileFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden w-full">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar vehicles={vehicles} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

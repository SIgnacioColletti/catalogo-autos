"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

// ==============================================
// FILTROS MOBILE CLIENT (SIMPLIFICADO)
// ==============================================

interface MobileFiltersClientProps {
  uniqueBrands: string[];
  onFilterChange: (filters: Record<string, any>) => void;
}

export const MobileFiltersClient = ({
  uniqueBrands,
  onFilterChange,
}: MobileFiltersClientProps) => {
  return (
    <Button variant="outline">
      <SlidersHorizontal className="h-4 w-4 mr-2" />
      Filtros
    </Button>
  );
};

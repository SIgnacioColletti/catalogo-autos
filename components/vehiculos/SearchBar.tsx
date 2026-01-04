"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useFilterStore } from "@/lib/store/useFilterStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

// ==============================================
// BARRA DE BÚSQUEDA
// ==============================================

export const SearchBar = () => {
  const { search, setSearch } = useFilterStore();
  const [localSearch, setLocalSearch] = useState(search);

  // Aplicar debounce al valor de búsqueda
  const debouncedSearch = useDebounce(localSearch, 500);

  // Actualizar el store cuando cambie el valor con debounce
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  // Sincronizar con el store cuando cambie externamente
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Buscar por marca, modelo, año..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

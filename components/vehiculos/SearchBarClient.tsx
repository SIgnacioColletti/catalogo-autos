"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

// ==============================================
// BARRA DE BÚSQUEDA CLIENT CON AUTOCOMPLETADO
// ==============================================

interface SearchBarClientProps {
  defaultValue?: string;
  onSearch: (value: string) => void;
}

export const SearchBarClient = ({
  defaultValue = "",
  onSearch,
}: SearchBarClientProps) => {
  const [localSearch, setLocalSearch] = useState(defaultValue);

  // Búsqueda automática con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localSearch);
    }, 500); // Espera 500ms después de que el usuario deja de escribir

    return () => clearTimeout(timer);
  }, [localSearch, onSearch]);

  const handleClear = () => {
    setLocalSearch("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Buscar por marca, modelo, año..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="pl-10 pr-10"
      />
      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

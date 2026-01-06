"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// ==============================================
// BARRA DE BÚSQUEDA CLIENT
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por marca, modelo, año..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit">Buscar</Button>
    </form>
  );
};

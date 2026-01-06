"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

// ==============================================
// EDITOR DE CARACTERÍSTICAS
// ==============================================

interface FeaturesEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export const FeaturesEditor = ({ features, onChange }: FeaturesEditorProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && !features.includes(inputValue.trim())) {
      onChange([...features, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  // Características predefinidas comunes
  const commonFeatures = [
    "Aire acondicionado",
    "Dirección asistida",
    "Cierre centralizado",
    "Alarma",
    "ABS",
    "Airbags",
    "Bluetooth",
    "Cámara de retroceso",
    "Sensores de estacionamiento",
    "Control de crucero",
    "Asientos de cuero",
    "Techo solar",
    "Llantas de aleación",
    "Faros LED",
    "Computadora de bordo",
  ];

  const availableFeatures = commonFeatures.filter((f) => !features.includes(f));

  return (
    <div className="space-y-4">
      {/* Input para agregar */}
      <div className="flex gap-2">
        <Input
          placeholder="Escribe una característica..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button type="button" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Características agregadas */}
      {features.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Características agregadas:</p>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="pr-1">
                {feature}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="ml-2 hover:bg-red-100 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Sugerencias rápidas */}
      {availableFeatures.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Agregar rápido:</p>
          <div className="flex flex-wrap gap-2">
            {availableFeatures.slice(0, 8).map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => onChange([...features, feature])}
              >
                <Plus className="h-3 w-3 mr-1" />
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

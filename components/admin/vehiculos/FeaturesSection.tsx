"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { COMMON_FEATURES } from "@/lib/constants";
import { Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

// ==============================================
// SECCIÓN DE CARACTERÍSTICAS
// ==============================================

interface FeaturesSectionProps {
  form: UseFormReturn<any>;
}

export const FeaturesSection = ({ form }: FeaturesSectionProps) => {
  const [customFeature, setCustomFeature] = useState("");
  const selectedFeatures = form.watch("features") || [];

  const handleToggleFeature = (feature: string) => {
    const current = selectedFeatures;
    const updated = current.includes(feature)
      ? current.filter((f: string) => f !== feature)
      : [...current, feature];
    form.setValue("features", updated);
  };

  const handleAddCustomFeature = () => {
    if (
      customFeature.trim() &&
      !selectedFeatures.includes(customFeature.trim())
    ) {
      form.setValue("features", [...selectedFeatures, customFeature.trim()]);
      setCustomFeature("");
    }
  };

  const handleRemoveFeature = (feature: string) => {
    form.setValue(
      "features",
      selectedFeatures.filter((f: string) => f !== feature)
    );
  };

  // Características personalizadas (no están en la lista predefinida)
  const customFeatures = selectedFeatures.filter(
    (f: string) => !COMMON_FEATURES.includes(f)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Características y Equipamiento</CardTitle>
        <CardDescription>
          Selecciona las características del vehículo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Características comunes */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Características Comunes
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMMON_FEATURES.map((feature) => {
              const isSelected = selectedFeatures.includes(feature);
              return (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature}`}
                    checked={isSelected}
                    onCheckedChange={() => handleToggleFeature(feature)}
                  />
                  <Label
                    htmlFor={`feature-${feature}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {feature}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agregar característica personalizada */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Agregar Característica Personalizada
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Ej: Techo panorámico"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustomFeature();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddCustomFeature}
              disabled={!customFeature.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>
        </div>

        {/* Características personalizadas agregadas */}
        {customFeatures.length > 0 && (
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Características Personalizadas
            </Label>
            <div className="flex flex-wrap gap-2">
              {customFeatures.map((feature: string) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="gap-1 pl-3 pr-2 cursor-pointer hover:bg-gray-300"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Contador */}
        <div className="text-sm text-gray-600">
          {selectedFeatures.length} característica
          {selectedFeatures.length !== 1 ? "s" : ""} seleccionada
          {selectedFeatures.length !== 1 ? "s" : ""}
        </div>
      </CardContent>
    </Card>
  );
};

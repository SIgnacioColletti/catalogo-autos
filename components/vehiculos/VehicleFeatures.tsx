import { Check } from "lucide-react";

// ==============================================
// CARACTERÍSTICAS - TEMA CLARO
// ==============================================

interface VehicleFeaturesProps {
  features: string[];
}

export const VehicleFeatures = ({ features }: VehicleFeaturesProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h2 className="text-blue-600 text-xl font-bold mb-6">
        Características y Equipamiento
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 text-gray-700">
            <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

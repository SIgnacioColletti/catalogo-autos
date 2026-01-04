import { Check } from "lucide-react";

// ==============================================
// LISTA DE CARACTERÍSTICAS
// ==============================================

interface VehicleFeaturesProps {
  features: string[];
}

export const VehicleFeatures = ({ features }: VehicleFeaturesProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Características y Equipamiento
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="bg-green-100 rounded-full p-1 mt-0.5">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

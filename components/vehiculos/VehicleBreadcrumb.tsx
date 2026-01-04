import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { Vehicle } from "@/lib/types";

// ==============================================
// BREADCRUMBS DE NAVEGACIÓN
// ==============================================

interface VehicleBreadcrumbProps {
  vehicle: Vehicle;
}

export const VehicleBreadcrumb = ({ vehicle }: VehicleBreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link
        href="/"
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home className="h-4 w-4" />
        Inicio
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/vehiculos" className="hover:text-primary transition-colors">
        Vehículos
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">
        {vehicle.brand} {vehicle.model}
      </span>
    </nav>
  );
};

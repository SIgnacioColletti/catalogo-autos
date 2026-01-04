import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ==============================================
// COMPONENTE: SKELETON PARA VEHICLECARD
// Se muestra mientras cargan los datos
// ==============================================

export const VehicleCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      {/* Skeleton de la imagen */}
      <Skeleton className="h-48 w-full rounded-t-lg" />

      {/* Skeleton del contenido */}
      <CardContent className="p-4 space-y-3">
        {/* Título */}
        <Skeleton className="h-6 w-3/4" />

        {/* Año y kilómetros */}
        <Skeleton className="h-4 w-1/2" />

        {/* Precio */}
        <Skeleton className="h-8 w-2/3" />

        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Botón */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};

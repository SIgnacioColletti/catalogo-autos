import { notFound } from "next/navigation";
import {
  getVehicleById,
  getRelatedVehicles,
  getAgency,
} from "@/lib/supabase/queries";
import { ImageGallery } from "@/components/vehiculos/ImageGallery";
import { VehicleInfo } from "@/components/vehiculos/VehicleInfo";
import { VehicleFeatures } from "@/components/vehiculos/VehicleFeatures";
import { RelatedVehicles } from "@/components/vehiculos/RelatedVehicles";
import { ShareButtons } from "@/components/vehiculos/ShareButtons";
import { Button } from "@/components/ui/button";
import { Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { mockAgency } from "@/lib/data/agency";
import { ViewTracker } from "@/components/vehiculos/ViewTracker";

// Revalidar cada 60 segundos
export const revalidate = 60;

// ==============================================
// PÁGINA: DETALLE DE VEHÍCULO
// ==============================================

interface VehiclePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  // Await params (Next.js 15)
  const { id } = await params;

  // Obtener vehículo por ID
  const vehicle = await getVehicleById(id);

  // Si no existe, mostrar 404
  if (!vehicle) {
    notFound();
  }

  // El tracking de vistas ahora se hace client-side con ViewTracker

  // Obtener vehículos relacionados y agencia en paralelo
  const [relatedVehicles, agency] = await Promise.all([
    getRelatedVehicles(vehicle.brand, vehicle.id, 3),
    getAgency("automax-rosario"),
  ]);

  const agencyData = agency || mockAgency;

  // Mensaje de WhatsApp prellenado
  const whatsappMessage = encodeURIComponent(
    `Hola! Estoy interesado en el ${vehicle.brand} ${vehicle.model} ${vehicle.year}. ¿Está disponible?`
  );

  const whatsappUrl = `https://wa.me/${agencyData.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tracker de vistas (invisible) */}
      <ViewTracker vehicleId={id} />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <FadeIn>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/vehiculos" className="hover:text-primary">
              Vehículos
            </Link>
            <span>/</span>
            <span className="text-gray-900">
              {vehicle.brand} {vehicle.model}
            </span>
          </div>

          {/* Botón volver */}
          <Link href="/vehiculos">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al listado
            </Button>
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Galería */}
          <div className="lg:col-span-2">
            <SlideIn direction="left">
              <ImageGallery images={vehicle.images} />
            </SlideIn>

            {/* Características */}
            <SlideIn direction="left" delay={0.2}>
              <div className="mt-8">
                <VehicleFeatures features={vehicle.features} />
              </div>
            </SlideIn>
          </div>

          {/* Columna derecha: Información */}
          <div className="lg:col-span-1">
            <SlideIn direction="right">
              <div className="sticky top-24 space-y-6">
                <VehicleInfo vehicle={vehicle} />

                {/* Botones de acción */}
                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Consultar por WhatsApp
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <a href={`tel:${agencyData.phone}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Llamar ahora
                    </a>
                  </Button>
                </div>

                {/* Compartir */}
                <ShareButtons vehicle={vehicle} />
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Vehículos relacionados */}
        {relatedVehicles.length > 0 && (
          <SlideIn direction="up" delay={0.4}>
            <div className="mt-16">
              <RelatedVehicles vehicles={relatedVehicles} />
            </div>
          </SlideIn>
        )}
      </div>
    </div>
  );
}

// ==============================================
// METADATA DINÁMICA
// ==============================================
export async function generateMetadata({ params }: VehiclePageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return {
      title: "Vehículo no encontrado",
    };
  }

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} - AutoMax Rosario`,
    description: vehicle.description,
  };
}

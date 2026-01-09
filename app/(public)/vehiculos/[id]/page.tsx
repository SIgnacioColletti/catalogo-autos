import { notFound } from "next/navigation";
import {
  getVehicleById,
  getRelatedVehicles,
  getAgency,
} from "@/lib/supabase/queries";
import { ImageGallery } from "@/components/vehiculos/ImageGallery";
import { VehicleFeatures } from "@/components/vehiculos/VehicleFeatures";
import { RelatedVehicles } from "@/components/vehiculos/RelatedVehicles";
import { ShareButtons } from "@/components/vehiculos/ShareButtons";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  Phone,
  ArrowLeft,
  MessageCircle,
  MapPin,
  Eye,
  Star,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { mockAgency } from "@/lib/data/agency";
import { ViewTracker } from "@/components/vehiculos/ViewTracker";
export const dynamic = "force-dynamic";
export const revalidate = 60;

interface VehiclePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }
  const [relatedVehicles, agency] = await Promise.all([
    getRelatedVehicles(vehicle.brand, vehicle.id, 6),
    getAgency("automax-rosario"),
  ]);
  const agencyData = agency || mockAgency;

  const whatsappMessage = encodeURIComponent(
    `Hola! Estoy interesado en el ${vehicle.brand} ${vehicle.model} ${vehicle.year}. ¿Está disponible?`
  );

  const whatsappUrl = `https://wa.me/5493413245783?text=${whatsappMessage}`;

  const fuelLabels: Record<string, string> = {
    nafta: "Nafta",
    diesel: "Diésel",
    gnc: "GNC",
    electrico: "Eléctrico",
    hibrido: "Híbrido",
  };

  const transmissionLabels: Record<string, string> = {
    manual: "Manual",
    automatica: "Automática",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ViewTracker vehicleId={id} />

      {/* Header con breadcrumbs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <FadeIn>
            <Link href="/vehiculos">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 -ml-2 mb-3"
                size="sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al listado
              </Button>
            </Link>

            {/* Título principal */}
            <h1 className="text-gray-900 text-2xl md:text-3xl font-bold uppercase tracking-wide">
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </h1>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Galería y descripción */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galería */}
            <SlideIn direction="left">
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                <ImageGallery images={vehicle.images} />
              </div>
            </SlideIn>

            {/* Descripción ampliada */}
            {vehicle.description && (
              <SlideIn direction="left" delay={0.1}>
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                  <h2 className="text-blue-600 text-xl font-bold mb-4">
                    Descripción ampliada
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {vehicle.description}
                  </p>
                </div>
              </SlideIn>
            )}

            {/* Características */}
            <SlideIn direction="left" delay={0.2}>
              <VehicleFeatures features={vehicle.features} />
            </SlideIn>

            {/* Compartir - Desktop */}
            <SlideIn direction="left" delay={0.3}>
              <div className="hidden lg:block bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <ShareButtons vehicle={vehicle} />
              </div>
            </SlideIn>
          </div>

          {/* Columna derecha: Sidebar con info */}
          <div className="lg:col-span-1">
            <SlideIn direction="right">
              <div className="sticky top-6 space-y-6">
                {/* Card de Descripción del anuncio */}
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                  <h2 className="text-blue-600 text-xl font-bold mb-4">
                    Descripción del anuncio
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex">
                      <span className="text-gray-500 w-32">Marca:</span>
                      <span className="text-gray-900 font-semibold">
                        {vehicle.brand}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Versión:</span>
                      <span className="text-gray-900 font-semibold">
                        {vehicle.model}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Transmisión:</span>
                      <span className="text-gray-900 font-semibold capitalize">
                        {transmissionLabels[vehicle.transmission] ||
                          vehicle.transmission}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Año:</span>
                      <span className="text-gray-900 font-semibold">
                        {vehicle.year}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Kilometraje:</span>
                      <span className="text-gray-900 font-semibold">
                        {vehicle.kilometers.toLocaleString()} Km.
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-32">Combustible:</span>
                      <span className="text-gray-900 font-semibold capitalize">
                        {fuelLabels[vehicle.fuel_type] || vehicle.fuel_type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card de Precio */}
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                  <h2 className="text-blue-600 text-xl font-bold mb-4">
                    Precio
                  </h2>
                  <p className="text-gray-900 text-4xl font-bold">
                    {formatPrice(vehicle.price)}
                  </p>
                </div>

                {/* Card de Datos de contacto */}
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                  <h2 className="text-blue-600 text-xl font-bold mb-4">
                    Datos de contacto
                  </h2>

                  <div className="space-y-4 mb-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                      <span className="text-gray-900 font-semibold">
                        {agencyData.name || "Agencia"}
                      </span>
                    </div>

                    {/* Ubicación */}
                    {agencyData.address && (
                      <>
                        <div className="flex gap-2 text-sm">
                          <span className="text-gray-500">Provincia:</span>
                          <span className="text-gray-900 font-semibold">
                            {agencyData.city || "Santa Fe"}
                          </span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <span className="text-gray-500">Ciudad:</span>
                          <span className="text-gray-900 font-semibold">
                            Rosario
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">
                            {agencyData.address}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Visitas */}
                    <div className="flex items-center gap-2 text-sm pt-3 border-t border-gray-200">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">
                        {vehicle.views || 0} visualizaciones
                      </span>
                    </div>
                  </div>

                  {/* Botón WhatsApp grande */}
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold shadow-lg"
                  >
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-6 w-6" />
                      Contactanos por WhatsApp
                    </a>
                  </Button>

                  {/* Botón Llamar */}
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full h-12 mt-3 border-2 border-gray-300 text-gray-900 hover:bg-gray-50"
                  >
                    <a href={`tel:${agencyData.phone}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Llamar ahora
                    </a>
                  </Button>
                </div>

                {/* Compartir - Mobile */}
                <div className="lg:hidden bg-white rounded-lg p-6 shadow-md border border-gray-200">
                  <ShareButtons vehicle={vehicle} />
                </div>
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

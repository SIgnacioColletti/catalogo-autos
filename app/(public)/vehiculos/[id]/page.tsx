import { notFound } from "next/navigation";
import { mockVehicles } from "@/lib/data/vehicles";
import { mockAgency } from "@/lib/data/agency";
import { ImageGallery } from "@/components/vehiculos/ImageGallery";
import { VehicleBreadcrumb } from "@/components/vehiculos/VehicleBreadcrumb";
import { VehicleDetails } from "@/components/vehiculos/VehicleDetails";
import { VehicleFeatures } from "@/components/vehiculos/VehicleFeatures";
import { SimilarVehicles } from "@/components/vehiculos/SimilarVehicles";
import { ShareButton } from "@/components/vehiculos/ShareButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Phone } from "lucide-react";
import { generateWhatsAppMessage } from "@/lib/utils";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";

// ==============================================
// PÁGINA DE DETALLE DE VEHÍCULO
// ==============================================

interface VehiclePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generar metadata dinámica para SEO
export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = mockVehicles.find((v) => v.id === id);

  if (!vehicle) {
    return {
      title: "Vehículo no encontrado",
    };
  }

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${mockAgency.name}`,
    description: vehicle.description.substring(0, 160),
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  // IMPORTANTE: await params en Next.js 15+
  const { id } = await params;

  // Buscar vehículo por ID
  const vehicle = mockVehicles.find((v) => v.id === id);

  // Si no existe, mostrar 404
  if (!vehicle) {
    notFound();
  }

  // Generar mensaje de WhatsApp
  const whatsappMessage = generateWhatsAppMessage(vehicle);
  const whatsappUrl = `https://wa.me/${mockAgency.whatsapp.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(whatsappMessage)}`;

  // Filtrar vehículos similares
  const similarVehicles = mockVehicles.filter(
    (v) =>
      v.id !== vehicle.id &&
      (v.brand === vehicle.brand || v.body_type === vehicle.body_type) &&
      v.status === "available"
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <VehicleBreadcrumb vehicle={vehicle} />

        {/* Layout principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* COLUMNA IZQUIERDA: Galería + Detalles */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galería de imágenes CON ANIMACIÓN */}
            <FadeIn>
              <ImageGallery
                images={vehicle.images}
                alt={`${vehicle.brand} ${vehicle.model}`}
              />
            </FadeIn>

            {/* Detalles del vehículo CON ANIMACIÓN */}
            <SlideIn direction="up" delay={0.2}>
              <VehicleDetails vehicle={vehicle} />
            </SlideIn>

            <Separator />

            {/* Características CON ANIMACIÓN */}
            <SlideIn direction="up" delay={0.3}>
              <VehicleFeatures features={vehicle.features} />
            </SlideIn>
          </div>

          {/* COLUMNA DERECHA: Sticky sidebar con contacto */}
          <SlideIn direction="left" delay={0.4}>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6 sticky top-20 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  ¿Te interesa este vehículo?
                </h3>
                <p className="text-sm text-gray-600">
                  Contactanos para coordinar una visita o despejar tus dudas.
                </p>

                {/* Botón WhatsApp principal */}
                <Button
                  asChild
                  className="w-full h-12 text-base bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Consultar por WhatsApp
                  </a>
                </Button>

                {/* Botón llamar */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12"
                  size="lg"
                >
                  <a href={`tel:${mockAgency.phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Llamar
                  </a>
                </Button>

                <Separator />

                {/* Información de contacto */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Información de Contacto
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Teléfono:</strong>
                      <br />
                      {mockAgency.phone}
                    </p>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Email:</strong>
                      <br />
                      {mockAgency.email}
                    </p>
                    <p className="text-gray-600">
                      <strong className="text-gray-900">Dirección:</strong>
                      <br />
                      {mockAgency.address}, {mockAgency.city}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Compartir */}
                <ShareButton
                  title={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                  text={vehicle.description.substring(0, 100)}
                />
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Vehículos similares CON ANIMACIÓN */}
        <SlideIn direction="up" delay={0.5}>
          <SimilarVehicles
            vehicles={similarVehicles}
            currentVehicleId={vehicle.id}
          />
        </SlideIn>
      </div>
    </div>
  );
}

// Generar rutas estáticas para todos los vehículos
export async function generateStaticParams() {
  return mockVehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

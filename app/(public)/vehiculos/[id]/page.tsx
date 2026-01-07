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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Car,
  Eye,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { mockAgency } from "@/lib/data/agency";
import { ViewTracker } from "@/components/vehiculos/ViewTracker";
import { formatPrice, formatKilometers } from "@/lib/utils";

export const revalidate = 60;
export const dynamic = "force-dynamic";

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
    getRelatedVehicles(vehicle.brand, vehicle.id, 3),
    getAgency("automax-rosario"),
  ]);

  const agencyData = agency || mockAgency;

  const whatsappMessage = encodeURIComponent(
    `Hola! Estoy interesado en el ${vehicle.brand} ${vehicle.model} ${vehicle.year}. ¿Está disponible?`
  );

  const whatsappUrl = `https://wa.me/${agencyData.whatsapp}?text=${whatsappMessage}`;

  const statusConfig = {
    available: {
      label: "Disponible",
      variant: "default" as const,
      color: "bg-green-500",
    },
    reserved: {
      label: "Reservado",
      variant: "secondary" as const,
      color: "bg-yellow-500",
    },
    sold: {
      label: "Vendido",
      variant: "destructive" as const,
      color: "bg-red-500",
    },
  };

  const status = statusConfig[vehicle.status];

  return (
    <div className="min-h-screen bg-gray-50">
      <ViewTracker vehicleId={id} />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <FadeIn>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/vehiculos"
              className="hover:text-primary transition-colors"
            >
              Vehículos
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </span>
          </div>

          <Link href="/vehiculos">
            <Button variant="ghost" className="mb-6 hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al listado
            </Button>
          </Link>
        </FadeIn>

        {/* Título y badges */}
        <SlideIn direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-xl text-gray-600">{vehicle.year}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={status.variant} className="text-sm px-4 py-2">
                <span className={`w-2 h-2 rounded-full ${status.color} mr-2`} />
                {status.label}
              </Badge>
              {vehicle.is_featured && (
                <Badge
                  variant="outline"
                  className="text-sm px-4 py-2 border-yellow-500 text-yellow-700"
                >
                  ⭐ Destacado
                </Badge>
              )}
            </div>
          </div>
        </SlideIn>

        {/* Layout principal: Imágenes + Descripción */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Columna izquierda: Galería */}
          <SlideIn direction="left">
            <ImageGallery images={vehicle.images} />
          </SlideIn>

          {/* Columna derecha: Descripción y características */}
          <div className="space-y-6">
            {/* Especificaciones técnicas */}
            <SlideIn direction="right">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Especificaciones Técnicas
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Año</p>
                        <p className="font-semibold">{vehicle.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Gauge className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Kilómetros</p>
                        <p className="font-semibold text-sm">
                          {formatKilometers(vehicle.kilometers)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Fuel className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Combustible</p>
                        <p className="font-semibold capitalize">
                          {vehicle.fuel_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Settings className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Transmisión</p>
                        <p className="font-semibold capitalize">
                          {vehicle.transmission}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Car className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Carrocería</p>
                        <p className="font-semibold capitalize">
                          {vehicle.body_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xl flex-shrink-0">🚪</span>
                      <div>
                        <p className="text-xs text-gray-500">Puertas</p>
                        <p className="font-semibold">{vehicle.doors}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xl flex-shrink-0">🎨</span>
                      <div>
                        <p className="text-xs text-gray-500">Color</p>
                        <p className="font-semibold">{vehicle.color}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Eye className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Vistas</p>
                        <p className="font-semibold">{vehicle.views}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Descripción */}
            <SlideIn direction="right" delay={0.1}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Descripción</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {vehicle.description}
                  </p>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Características */}
            <SlideIn direction="right" delay={0.2}>
              <VehicleFeatures features={vehicle.features} />
            </SlideIn>
          </div>
        </div>

        {/* Sección inferior: Precio, Contacto y Compartir */}
        <SlideIn direction="up" delay={0.3}>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Precio y financiación */}
            <Card className="border-2 border-primary">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Precio</p>
                  <p className="text-4xl font-bold text-primary mb-4">
                    {formatPrice(vehicle.price)}
                  </p>
                  <Separator className="my-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    💳 Financiación disponible
                  </p>
                  <p className="text-xs text-gray-500">
                    Consulta por nuestros planes de pago
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-center">Contacto</h3>
                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      WhatsApp
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
                      Llamar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ubicación y compartir */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-center">
                  Ubicación
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">
                        {agencyData.address}
                      </p>
                      <p className="text-xs text-gray-500">{agencyData.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-sm font-medium">{agencyData.phone}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3 text-center">
                      Compartir
                    </p>
                    <ShareButtons vehicle={vehicle} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideIn>

        {/* Vehículos relacionados */}
        {relatedVehicles.length > 0 && (
          <SlideIn direction="up" delay={0.4}>
            <RelatedVehicles vehicles={relatedVehicles} />
          </SlideIn>
        )}
      </div>

      {/* Botón flotante en mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-50">
        <Button asChild size="lg" className="w-full">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Phone className="mr-2 h-5 w-5" />
            Consultar por WhatsApp
          </a>
        </Button>
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

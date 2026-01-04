import { Card, CardContent } from "@/components/ui/card";
import { mockAgency } from "@/lib/data/agency";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import { Award, Users, Target, Heart } from "lucide-react";
import Image from "next/image";

// ==============================================
// PÁGINA: NOSOTROS
// ==============================================

export default function NosotrosPage() {
  const valores = [
    {
      icon: Award,
      title: "Calidad",
      description:
        "Vehículos seleccionados con los más altos estándares de calidad.",
    },
    {
      icon: Users,
      title: "Atención Personalizada",
      description:
        "Asesoramiento profesional para encontrar el vehículo perfecto para ti.",
    },
    {
      icon: Target,
      title: "Transparencia",
      description: "Información clara y honesta sobre cada vehículo.",
    },
    {
      icon: Heart,
      title: "Compromiso",
      description: "Compromiso total con la satisfacción de nuestros clientes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 15 años conectando personas con sus vehículos ideales
            </p>
          </div>
        </FadeIn>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <SlideIn direction="left">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Quiénes Somos
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  En{" "}
                  <span className="font-semibold text-primary">
                    {mockAgency.name}
                  </span>
                  , somos una agencia especializada en la compra y venta de
                  vehículos usados de alta calidad en {mockAgency.city}.
                </p>
                <p>
                  Nuestro compromiso es ofrecer vehículos en excelente estado,
                  garantizando transparencia en cada transacción y brindando un
                  servicio personalizado que supere las expectativas de nuestros
                  clientes.
                </p>
                <p>
                  Con años de experiencia en el mercado automotor, hemos
                  construido una reputación basada en la confianza, la
                  honestidad y el profesionalismo.
                </p>
                <p>
                  Cada vehículo de nuestro catálogo es cuidadosamente
                  seleccionado y revisado para asegurar que cumpla con nuestros
                  estándares de calidad.
                </p>
              </div>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&auto=format&fit=crop"
                alt="Showroom de autos"
                fill
                className="object-cover"
              />
            </div>
          </SlideIn>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FadeIn delay={0.3}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Nuestra Misión
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Facilitar la compra y venta de vehículos usados mediante un
                  servicio profesional, transparente y confiable, ayudando a
                  nuestros clientes a tomar decisiones informadas y encontrar el
                  vehículo que mejor se adapte a sus necesidades y presupuesto.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Nuestra Visión
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ser la agencia de vehículos usados más confiable y reconocida
                  de la región, destacándonos por la calidad de nuestros
                  vehículos, la excelencia en el servicio al cliente y nuestro
                  compromiso con la satisfacción total de quienes confían en
                  nosotros.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Valores */}
        <FadeIn delay={0.5}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((valor, index) => (
                <SlideIn key={valor.title} direction="up" delay={0.1 * index}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        <valor.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {valor.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {valor.description}
                      </p>
                    </CardContent>
                  </Card>
                </SlideIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Call to Action */}
        <FadeIn delay={0.7}>
          <Card className="bg-primary text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para encontrar tu vehículo ideal?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Explora nuestro catálogo de vehículos seleccionados o
                contáctanos para recibir asesoramiento personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/vehiculos"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Ver Vehículos
                </a>

                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
                >
                  Contáctanos
                </a>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

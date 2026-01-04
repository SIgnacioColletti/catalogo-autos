"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockAgency } from "@/lib/data/agency";
import { FadeIn } from "@/components/animations/FadeIn";
import { SlideIn } from "@/components/animations/SlideIn";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ==============================================
// PÁGINA: CONTACTO
// ==============================================

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (en producción conectarías con tu backend)
    setTimeout(() => {
      toast.success("Mensaje enviado", {
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Mensaje prellenado para WhatsApp
  const whatsappMessage = encodeURIComponent(
    "¡Hola! Estoy interesado en obtener más información sobre sus vehículos."
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contacto
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¿Tienes alguna consulta? Estamos aquí para ayudarte
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Formulario de contacto */}
          <SlideIn direction="left" className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre completo</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono (opcional)</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="+54 9 341 123-4567"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      placeholder="¿En qué podemos ayudarte?"
                      rows={6}
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </SlideIn>

          {/* Información de contacto */}
          <SlideIn direction="right" delay={0.2}>
            <div className="space-y-6">
              {/* Datos de contacto */}
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Dirección</p>
                      <p className="text-sm text-gray-600">
                        {mockAgency.address}
                        <br />
                        {mockAgency.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Teléfono</p>

                      <a
                        href={`tel:${mockAgency.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {mockAgency.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>

                      <a
                        href={`mailto:${mockAgency.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {mockAgency.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Horarios</p>
                      <p className="text-sm text-gray-600">
                        Lun - Vie: 9:00 - 19:00
                        <br />
                        Sábados: 9:00 - 13:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Redes sociales */}
              {(mockAgency.instagram || mockAgency.facebook) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Síguenos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockAgency.instagram && (
                      <a
                        href={mockAgency.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span className="text-sm font-medium">Instagram</span>
                      </a>
                    )}
                    {mockAgency.facebook && (
                      <a
                        href={mockAgency.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">Facebook</span>
                      </a>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* WhatsApp */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <p className="font-semibold text-gray-900 mb-3">
                    ¿Prefieres WhatsApp?
                  </p>

                  <a
                    href={`https://wa.me/${mockAgency.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="mr-2 h-4 w-4" />
                      Chatear por WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </SlideIn>
        </div>

        {/* Mapa (opcional - puedes agregar Google Maps después) */}
        <FadeIn delay={0.4}>
          <Card className="mt-12 max-w-6xl mx-auto">
            <CardContent className="p-0">
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Aquí puedes integrar Google Maps en el futuro
                </p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// ==============================================
// BOTÓN FLOTANTE DE WHATSAPP
// ==============================================

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export const WhatsAppButton = ({
  phoneNumber,
  message = "¡Hola! Estoy interesado en conocer más sobre los vehículos disponibles.",
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    // Limpiar número (quitar espacios, guiones, paréntesis)
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");

    // Encodear el mensaje
    const encodedMessage = encodeURIComponent(message);

    // Construir URL de WhatsApp
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    // Abrir en nueva pestaña
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-green-500 hover:bg-green-600 p-0"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </Button>
  );
};

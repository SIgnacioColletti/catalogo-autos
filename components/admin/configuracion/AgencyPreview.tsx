"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import type { Agency } from "@/lib/types";

// ==============================================
// VISTA PREVIA DE LA AGENCIA
// ==============================================

interface AgencyPreviewProps {
  agency: Partial<Agency>;
}

export const AgencyPreview = ({ agency }: AgencyPreviewProps) => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Vista Previa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Logo y nombre */}
        <div className="text-center">
          {agency.logo_url ? (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-100">
              <img
                src={agency.logo_url}
                alt={agency.name || "Logo"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400">
              {agency.name?.charAt(0) || "A"}
            </div>
          )}
          <h3
            className="text-2xl font-bold"
            style={{ color: agency.primary_color || "#3b82f6" }}
          >
            {agency.name || "Nombre de la Agencia"}
          </h3>
          <p className="text-gray-600 mt-1">{agency.city || "Ciudad"}</p>
        </div>

        {/* Colores */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Colores de Marca
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <div
                className="h-12 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: agency.primary_color || "#3b82f6" }}
              />
              <p className="text-xs text-gray-600 mt-1 text-center">Primario</p>
            </div>
            <div className="flex-1">
              <div
                className="h-12 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: agency.secondary_color || "#8b5cf6" }}
              />
              <p className="text-xs text-gray-600 mt-1 text-center">
                Secundario
              </p>
            </div>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Información de Contacto
          </p>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {agency.phone || "Sin teléfono"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              WhatsApp: {agency.whatsapp || "Sin WhatsApp"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">{agency.email || "Sin email"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-gray-700">
              {agency.address || "Sin dirección"}
            </span>
          </div>
        </div>

        {/* Redes sociales */}
        {(agency.instagram || agency.facebook) && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">
              Redes Sociales
            </p>
            <div className="flex gap-2">
              {agency.instagram && (
                <Badge variant="secondary" className="gap-1">
                  <Instagram className="h-3 w-3" />
                  Instagram
                </Badge>
              )}
              {agency.facebook && (
                <Badge variant="secondary" className="gap-1">
                  <Facebook className="h-3 w-3" />
                  Facebook
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

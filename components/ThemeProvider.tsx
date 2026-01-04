"use client";

import { useEffect } from "react";
import { useAgencyStore } from "@/lib/store/useAgencyStore";

// ==============================================
// PROVIDER DE TEMA DINÁMICO
// Aplica los colores de la agencia en toda la app
// ==============================================

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { agency, loadAgencyFromStorage } = useAgencyStore();

  useEffect(() => {
    // Cargar configuración de agencia
    loadAgencyFromStorage();
  }, [loadAgencyFromStorage]);

  useEffect(() => {
    // Aplicar colores como CSS variables
    if (typeof window !== "undefined") {
      const root = document.documentElement;

      // Convertir hex a HSL para mejor manejo de colores
      const hexToHSL = (hex: string) => {
        // Remover el # si existe
        hex = hex.replace("#", "");

        // Convertir a RGB
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
              break;
            case g:
              h = ((b - r) / d + 2) / 6;
              break;
            case b:
              h = ((r - g) / d + 4) / 6;
              break;
          }
        }

        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100),
        };
      };

      if (agency.primary_color) {
        const primary = hexToHSL(agency.primary_color);
        root.style.setProperty(
          "--primary",
          `${primary.h} ${primary.s}% ${primary.l}%`
        );
      }

      if (agency.secondary_color) {
        const secondary = hexToHSL(agency.secondary_color);
        root.style.setProperty(
          "--secondary",
          `${secondary.h} ${secondary.s}% ${secondary.l}%`
        );
      }
    }
  }, [agency.primary_color, agency.secondary_color]);

  return <>{children}</>;
};

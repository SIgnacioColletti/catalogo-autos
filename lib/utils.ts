import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Función de shadcn para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==============================================
// UTILIDADES PARA FORMATEO
// ==============================================

/**
 * Formatea un precio en pesos argentinos
 * Ejemplo: 15000000 → "$15.000.000"
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Formatea kilómetros
 * Ejemplo: 45000 → "45.000 km"
 */
export const formatKilometers = (km: number): string => {
  return `${km.toLocaleString("es-AR")} km`;
};

/**
 * Formatea año
 * Ejemplo: 2020 → "2020"
 */
export const formatYear = (year: number): string => {
  return year.toString();
};

/**
 * Traduce tipos de combustible a español
 */
export const fuelTypeLabels: Record<string, string> = {
  nafta: "Nafta",
  diesel: "Diésel",
  gnc: "GNC",
  electrico: "Eléctrico",
  hibrido: "Híbrido",
};

/**
 * Traduce tipos de transmisión
 */
export const transmissionLabels: Record<string, string> = {
  manual: "Manual",
  automatica: "Automática",
};

/**
 * Traduce tipos de carrocería
 */
export const bodyTypeLabels: Record<string, string> = {
  sedan: "Sedán",
  suv: "SUV",
  hatchback: "Hatchback",
  pickup: "Pickup",
  coupe: "Coupé",
  familiar: "Familiar",
};

/**
 * Traduce estados de vehículo
 */
export const statusLabels: Record<string, string> = {
  available: "Disponible",
  sold: "Vendido",
  reserved: "Reservado",
};

/**
 * Colores para badges según el estado
 */
export const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  sold: "bg-red-100 text-red-800",
  reserved: "bg-yellow-100 text-yellow-800",
};
//  * Genera un mensaje de WhatsApp prellenado para consultar por un vehículo
//  */
export const generateWhatsAppMessage = (vehicle: {
  brand: string;
  model: string;
  year: number;
  price: number;
}): string => {
  return `¡Hola! Estoy interesado en el ${vehicle.brand} ${vehicle.model} ${
    vehicle.year
  } publicado en ${formatPrice(
    vehicle.price
  )}. ¿Podrían darme más información?`;
};
// Helper para mostrar toast de error genérico
export const showErrorToast = (message: string = "Ocurrió un error") => {
  if (typeof window !== "undefined") {
    const { toast } = require("sonner");
    toast.error(message);
  }
};

// Helper para mostrar toast de éxito genérico
export const showSuccessToast = (message: string) => {
  if (typeof window !== "undefined") {
    const { toast } = require("sonner");
    toast.success(message);
  }
};

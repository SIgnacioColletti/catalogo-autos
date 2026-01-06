import { z } from "zod";

// ==============================================
// SCHEMA DE VALIDACIÓN PARA VEHÍCULOS
// ==============================================

export const vehicleSchema = z.object({
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z
    .number()
    .min(1900, "Año inválido")
    .max(new Date().getFullYear() + 1, "Año inválido"),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  kilometers: z.number().min(0, "Los kilómetros deben ser mayores a 0"),
  fuel_type: z.enum(["nafta", "diesel", "gnc", "electrico", "hibrido"]),
  transmission: z.enum(["manual", "automatica"]),
  color: z.string().min(1, "El color es requerido"),
  body_type: z.enum([
    "sedan",
    "suv",
    "hatchback",
    "pickup",
    "coupe",
    "familiar",
  ]),
  doors: z.number().min(2).max(5),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  features: z
    .array(z.string())
    .min(1, "Debe agregar al menos una característica"),
  images: z.array(z.string().url()).min(1, "Debe agregar al menos una imagen"),
  is_featured: z.boolean().default(false),
  status: z.enum(["available", "sold", "reserved"]).default("available"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

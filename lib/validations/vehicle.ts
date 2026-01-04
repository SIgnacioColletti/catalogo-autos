import { z } from "zod";

// ==============================================
// SCHEMAS DE VALIDACIÓN CON ZOD
// ==============================================

export const vehicleSchema = z.object({
  // Información básica
  brand: z
    .string()
    .min(2, "La marca debe tener al menos 2 caracteres")
    .max(50, "La marca no puede superar 50 caracteres"),

  model: z
    .string()
    .min(1, "El modelo es requerido")
    .max(100, "El modelo no puede superar 100 caracteres"),

  year: z
    .number()
    .int("El año debe ser un número entero")
    .min(1990, "El año mínimo es 1990")
    .max(new Date().getFullYear() + 1, "El año no puede ser futuro"),

  price: z
    .number()
    .positive("El precio debe ser positivo")
    .min(100000, "El precio mínimo es $100.000")
    .max(100000000, "El precio máximo es $100.000.000"),

  // Detalles técnicos
  kilometers: z
    .number()
    .int("Los kilómetros deben ser un número entero")
    .min(0, "Los kilómetros no pueden ser negativos")
    .max(1000000, "Los kilómetros no pueden superar 1.000.000"),

  fuel_type: z
    .string()
    .refine(
      (val) => ["nafta", "diesel", "gnc", "electrico", "hibrido"].includes(val),
      { message: "El tipo de combustible es requerido" }
    ),

  transmission: z
    .string()
    .refine((val) => ["manual", "automatica"].includes(val), {
      message: "El tipo de transmisión es requerido",
    }),

  color: z
    .string()
    .min(2, "El color debe tener al menos 2 caracteres")
    .max(30, "El color no puede superar 30 caracteres"),

  body_type: z
    .string()
    .refine(
      (val) =>
        ["sedan", "suv", "hatchback", "pickup", "coupe", "familiar"].includes(
          val
        ),
      { message: "El tipo de carrocería es requerido" }
    ),

  doors: z
    .number()
    .int("Las puertas deben ser un número entero")
    .min(2, "Mínimo 2 puertas")
    .max(5, "Máximo 5 puertas"),

  // Descripción
  description: z
    .string()
    .min(50, "La descripción debe tener al menos 50 caracteres")
    .max(1000, "La descripción no puede superar 1000 caracteres"),

  // Estado y destacado
  status: z
    .string()
    .refine((val) => ["available", "sold", "reserved"].includes(val), {
      message: "El estado es requerido",
    }),

  is_featured: z.boolean().default(false),

  // Features (lo haremos en DÍA 12)
  features: z.array(z.string()).default([]),

  // Imágenes (lo haremos en DÍA 12)
  images: z.array(z.string()).min(1, "Debe tener al menos 1 imagen"),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

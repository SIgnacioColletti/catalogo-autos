// ==============================================
// TIPOS PRINCIPALES DE LA APLICACIÓN
// ==============================================

// Tipo para la agencia
export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  primary_color: string;
  secondary_color: string;
  instagram?: string;
  facebook?: string;
}

// Tipos literales para campos específicos
export type FuelType = "nafta" | "diesel" | "gnc" | "electrico" | "hibrido";
export type Transmission = "manual" | "automatica";
export type BodyType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "pickup"
  | "coupe"
  | "familiar";
export type VehicleStatus = "available" | "sold" | "reserved";

// Tipo principal para vehículos
export interface Vehicle {
  id: string;
  agency_id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  kilometers: number;
  fuel_type: FuelType;
  transmission: Transmission;
  color: string;
  body_type: BodyType;
  doors: number;
  description: string;
  features: string[];
  images: string[];
  is_featured: boolean;
  status: VehicleStatus;
  views: number;
  created_at: string;
}

// Tipo para filtros (lo usaremos en días 4-5)
export interface VehicleFilters {
  search?: string;
  brands?: string[];
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  kilometersFrom?: number;
  kilometersTo?: number;
  fuelTypes?: FuelType[];
  transmissions?: Transmission[];
  bodyTypes?: BodyType[];
}

import { create } from "zustand";

// ==============================================
// STORE DE FILTROS
// ==============================================

interface FilterState {
  // Búsqueda
  search: string;
  setSearch: (search: string) => void;

  // Marcas
  brands: string[];
  toggleBrand: (brand: string) => void;

  // Año
  yearFrom: number | null;
  yearTo: number | null;
  setYearRange: (from: number | null, to: number | null) => void;

  // Precio
  priceFrom: number | null;
  priceTo: number | null;
  setPriceRange: (from: number | null, to: number | null) => void;

  // Kilómetros
  kilometersFrom: number | null;
  kilometersTo: number | null;
  setKilometersRange: (from: number | null, to: number | null) => void;

  // Combustible
  fuelTypes: string[];
  toggleFuelType: (fuelType: string) => void;

  // Transmisión
  transmissions: string[];
  toggleTransmission: (transmission: string) => void;

  // Carrocería
  bodyTypes: string[];
  toggleBodyType: (bodyType: string) => void;

  // Limpiar filtros
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  // Estado inicial
  search: "",
  brands: [],
  yearFrom: null,
  yearTo: null,
  priceFrom: null,
  priceTo: null,
  kilometersFrom: null,
  kilometersTo: null,
  fuelTypes: [],
  transmissions: [],
  bodyTypes: [],

  // Acciones
  setSearch: (search) => set({ search }),

  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),

  setYearRange: (from, to) =>
    set({
      yearFrom: from,
      yearTo: to,
    }),

  setPriceRange: (from, to) =>
    set({
      priceFrom: from,
      priceTo: to,
    }),

  setKilometersRange: (from, to) =>
    set({
      kilometersFrom: from,
      kilometersTo: to,
    }),

  toggleFuelType: (fuelType) =>
    set((state) => ({
      fuelTypes: state.fuelTypes.includes(fuelType)
        ? state.fuelTypes.filter((f) => f !== fuelType)
        : [...state.fuelTypes, fuelType],
    })),

  toggleTransmission: (transmission) =>
    set((state) => ({
      transmissions: state.transmissions.includes(transmission)
        ? state.transmissions.filter((t) => t !== transmission)
        : [...state.transmissions, transmission],
    })),

  toggleBodyType: (bodyType) =>
    set((state) => ({
      bodyTypes: state.bodyTypes.includes(bodyType)
        ? state.bodyTypes.filter((b) => b !== bodyType)
        : [...state.bodyTypes, bodyType],
    })),

  clearFilters: () =>
    set({
      search: "",
      brands: [],
      yearFrom: null,
      yearTo: null,
      priceFrom: null,
      priceTo: null,
      kilometersFrom: null,
      kilometersTo: null,
      fuelTypes: [],
      transmissions: [],
      bodyTypes: [],
    }),
}));

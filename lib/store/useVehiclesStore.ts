import { create } from "zustand";
import { mockVehicles } from "@/lib/data/vehicles";
import type { Vehicle } from "@/lib/types";

// ==============================================
// STORE PARA GESTIÓN DE VEHÍCULOS (MOCK)
// En producción esto se conectaría a Supabase
// ==============================================

interface VehiclesState {
  vehicles: Vehicle[];
  deleteVehicle: (id: string) => void;
  duplicateVehicle: (id: string) => void;
  addVehicle: (
    vehicle: Omit<Vehicle, "id" | "agency_id" | "views" | "created_at">
  ) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  resetVehicles: () => void;
}

export const useVehiclesStore = create<VehiclesState>((set) => ({
  // Estado inicial con datos mock
  vehicles: [...mockVehicles],

  // Eliminar vehículo
  deleteVehicle: (id: string) =>
    set((state) => ({
      vehicles: state.vehicles.filter((v) => v.id !== id),
    })),

  // Duplicar vehículo (crear copia con nuevo ID)
  duplicateVehicle: (id: string) =>
    set((state) => {
      const vehicle = state.vehicles.find((v) => v.id === id);
      if (!vehicle) return state;

      const newVehicle: Vehicle = {
        ...vehicle,
        id: `${Date.now()}`, // Nuevo ID único
        created_at: new Date().toISOString(),
        is_featured: false, // Los duplicados no son destacados por defecto
      };

      return {
        vehicles: [newVehicle, ...state.vehicles],
      };
    }),

  // Agregar nuevo vehículo
  addVehicle: (
    vehicle: Omit<Vehicle, "id" | "agency_id" | "views" | "created_at">
  ) =>
    set((state) => {
      const newVehicle: Vehicle = {
        ...vehicle,
        id: `${Date.now()}`,
        agency_id: "1",
        views: 0,
        created_at: new Date().toISOString(),
      };

      return {
        vehicles: [newVehicle, ...state.vehicles],
      };
    }),

  // Actualizar vehículo existente
  updateVehicle: (id: string, updates: Partial<Vehicle>) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),

  // Resetear a datos originales
  resetVehicles: () =>
    set({
      vehicles: [...mockVehicles],
    }),
}));

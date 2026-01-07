import { create } from "zustand";
import type { Vehicle } from "@/lib/types";

// ==============================================
// STORE PARA GESTIÓN DE VEHÍCULOS
// NOTA: Este store ya no se usa, todas las operaciones
// se hacen directamente con Supabase
// Se mantiene por compatibilidad pero está vacío
// ==============================================

interface VehiclesState {
  vehicles: Vehicle[];
}

export const useVehiclesStore = create<VehiclesState>(() => ({
  vehicles: [],
}));

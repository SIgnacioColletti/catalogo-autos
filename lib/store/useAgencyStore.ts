import { create } from "zustand";
import { mockAgency } from "@/lib/data/agency";
import type { Agency } from "@/lib/types";

// ==============================================
// STORE PARA CONFIGURACIÓN DE AGENCIA
// ==============================================

interface AgencyState {
  agency: Agency;
  updateAgency: (updates: Partial<Agency>) => void;
  resetAgency: () => void;
  loadAgencyFromStorage: () => void;
  saveAgencyToStorage: () => void;
}

const STORAGE_KEY = "agency_config";

export const useAgencyStore = create<AgencyState>((set, get) => ({
  // Estado inicial con datos mock
  agency: mockAgency,

  // Actualizar agencia
  updateAgency: (updates: Partial<Agency>) =>
    set((state) => ({
      agency: { ...state.agency, ...updates },
    })),

  // Resetear a datos originales
  resetAgency: () => {
    set({ agency: mockAgency });
    localStorage.removeItem(STORAGE_KEY);
  },

  // Cargar desde localStorage
  loadAgencyFromStorage: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const agency = JSON.parse(stored);
        set({ agency });
      } catch (error) {
        console.error("Error loading agency from storage:", error);
      }
    }
  },

  // Guardar en localStorage
  saveAgencyToStorage: () => {
    if (typeof window === "undefined") return;

    const { agency } = get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agency));
  },
}));

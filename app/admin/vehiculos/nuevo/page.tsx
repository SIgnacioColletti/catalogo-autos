"use client";

import { useEffect, useState } from "react";
import { VehicleForm } from "@/components/admin/vehiculos/VehicleForm";
import type { Vehicle } from "@/lib/types";

export default function NuevoVehiculoPage() {
  const [duplicateVehicle, setDuplicateVehicle] = useState<Vehicle | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("duplicateVehicle");
    if (stored) {
      setDuplicateVehicle(JSON.parse(stored));
      localStorage.removeItem("duplicateVehicle");
    }
  }, []);

  return <VehicleForm mode="create" vehicle={duplicateVehicle} />;
}

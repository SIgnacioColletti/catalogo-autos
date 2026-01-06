import { getVehicleById } from "@/lib/supabase/queries";
import { VehicleForm } from "@/components/admin/vehiculos/VehicleForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarVehiculoPage({ params }: Props) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return <VehicleForm mode="edit" vehicle={vehicle} />;
}

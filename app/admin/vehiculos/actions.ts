"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { vehicleSchema } from "@/lib/validations/vehicle";
import { uploadVehicleImage } from "@/lib/supabase/storage";
// ==============================================
// SERVER ACTIONS PARA VEHÍCULOS
// ==============================================

export async function createVehicle(formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient();

    // Parsear FormData a objeto
    const data = {
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      year: parseInt(formData.get("year") as string),
      price: parseFloat(formData.get("price") as string),
      kilometers: parseFloat(formData.get("kilometers") as string),
      fuel_type: formData.get("fuel_type") as string,
      transmission: formData.get("transmission") as string,
      color: formData.get("color") as string,
      body_type: formData.get("body_type") as string,
      doors: parseInt(formData.get("doors") as string),
      description: formData.get("description") as string,
      features: JSON.parse(formData.get("features") as string),
      images: JSON.parse(formData.get("images") as string),
      is_featured: formData.get("is_featured") === "true",
      status: formData.get("status") as string,
    };

    console.log("Data to validate:", data);

    // Validar datos
    const validatedData = vehicleSchema.parse(data);

    console.log("Validated data:", validatedData);

    // Obtener el agency_id de la primera agencia (temporal)
    const { data: agencies } = await supabase
      .from("agencies")
      .select("id")
      .limit(1)
      .single();

    if (!agencies) {
      return { error: "No se encontró ninguna agencia" };
    }

    // Agregar agency_id
    const vehicleData = {
      ...validatedData,
      agency_id: agencies.id,
    };

    console.log("Final vehicle data:", vehicleData);

    // Insertar en Supabase
    const { data: newVehicle, error } = await supabase
      .from("vehicles")
      .insert(vehicleData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return { error: `Error en la base de datos: ${error.message}` };
    }

    console.log("Vehicle created:", newVehicle);

    // Revalidar caché
    revalidatePath("/admin/vehiculos");
    revalidatePath("/vehiculos");
    revalidatePath("/");

    return { success: true, vehicle: newVehicle };
  } catch (error: any) {
    console.error("Error in createVehicle:", error);
    return { error: error.message || "Error al crear el vehículo" };
  }
}

export async function updateVehicle(id: string, formData: FormData) {
  try {
    const supabase = await createServerSupabaseClient();

    // Parsear FormData a objeto
    const data = {
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      year: parseInt(formData.get("year") as string),
      price: parseFloat(formData.get("price") as string),
      kilometers: parseFloat(formData.get("kilometers") as string),
      fuel_type: formData.get("fuel_type") as string,
      transmission: formData.get("transmission") as string,
      color: formData.get("color") as string,
      body_type: formData.get("body_type") as string,
      doors: parseInt(formData.get("doors") as string),
      description: formData.get("description") as string,
      features: JSON.parse(formData.get("features") as string),
      images: JSON.parse(formData.get("images") as string),
      is_featured: formData.get("is_featured") === "true",
      status: formData.get("status") as string,
    };

    // Validar datos
    const validatedData = vehicleSchema.parse(data);

    // Actualizar en Supabase
    const { data: updatedVehicle, error } = await supabase
      .from("vehicles")
      .update(validatedData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return { error: `Error en la base de datos: ${error.message}` };
    }

    // Revalidar caché
    revalidatePath("/admin/vehiculos");
    revalidatePath("/vehiculos");
    revalidatePath(`/vehiculos/${id}`);
    revalidatePath("/");

    return { success: true, vehicle: updatedVehicle };
  } catch (error: any) {
    console.error("Error in updateVehicle:", error);
    return { error: error.message || "Error al actualizar el vehículo" };
  }
}

// ==============================================
// ELIMINAR VEHÍCULO
// ==============================================
export async function deleteVehicle(id: string) {
  console.log("🗑️ Attempting to delete vehicle:", id);

  try {
    const supabase = await createServerSupabaseClient();

    console.log("🔄 Executing DELETE query...");

    const { error, data } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id)
      .select();

    console.log("📊 Delete result:", { error, data });

    if (error) {
      console.error("❌ Supabase error:", error);
      return { error: `Error al eliminar: ${error.message}` };
    }

    console.log("✅ Vehicle deleted successfully");

    // Revalidar caché
    revalidatePath("/admin/vehiculos");
    revalidatePath("/vehiculos");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    console.error("❌ Error in deleteVehicle:", error);
    return { error: error.message || "Error al eliminar el vehículo" };
  }
}
// ==============================================
// CAMBIAR ESTADO DE VEHÍCULO
// ==============================================
export async function updateVehicleStatus(
  id: string,
  status: "available" | "reserved" | "sold"
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("vehicles")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return { error: `Error al cambiar estado: ${error.message}` };
    }

    // Revalidar caché
    revalidatePath("/admin/vehiculos");
    revalidatePath("/vehiculos");
    revalidatePath("/");

    return { success: true, vehicle: data };
  } catch (error: any) {
    console.error("Error in updateVehicleStatus:", error);
    return { error: error.message || "Error al cambiar el estado" };
  }
}
// ==============================================
// SUBIR IMAGEN DE VEHÍCULO
// ==============================================
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { error: "No se proporcionó ningún archivo" };
    }

    // Validar tipo de archivo
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return { error: "Tipo de archivo no válido. Solo JPG, PNG o WEBP" };
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { error: "El archivo es demasiado grande. Máximo 5MB" };
    }

    const imageUrl = await uploadVehicleImage(file);

    if (!imageUrl) {
      return { error: "Error al subir la imagen" };
    }

    return { success: true, imageUrl };
  } catch (error: any) {
    console.error("Error in uploadImage:", error);
    return { error: error.message || "Error al subir la imagen" };
  }
}

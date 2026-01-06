import { createServerSupabaseClient } from "./server";

// ==============================================
// UTILIDADES PARA SUPABASE STORAGE
// ==============================================

export async function uploadVehicleImage(file: File): Promise<string | null> {
  try {
    const supabase = await createServerSupabaseClient();

    // Generar nombre único para el archivo
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;
    const filePath = `vehicles/${fileName}`;

    // Subir archivo
    const { data, error } = await supabase.storage
      .from("vehicle-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage
      .from("vehicle-images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadVehicleImage:", error);
    return null;
  }
}

export async function deleteVehicleImage(imageUrl: string): Promise<boolean> {
  try {
    const supabase = await createServerSupabaseClient();

    // Extraer el path del archivo de la URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/");
    const filePath = pathParts.slice(-2).join("/"); // vehicles/filename.jpg

    const { error } = await supabase.storage
      .from("vehicle-images")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting image:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteVehicleImage:", error);
    return false;
  }
}

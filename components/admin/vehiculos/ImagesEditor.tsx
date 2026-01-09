"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  X,
  Plus,
  AlertCircle,
  MoveUp,
  MoveDown,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/app/admin/vehiculos/actions";
import { toast } from "sonner";

// ==============================================
// EDITOR DE IMÁGENES CON UPLOAD MÚLTIPLE
// (Sin dependencia de componente Progress)
// ==============================================

interface ImagesEditorProps {
  images: string[];
  onChange: (images: string[]) => void;
}

interface UploadProgress {
  file: File;
  status: "uploading" | "success" | "error";
  progress: number;
  error?: string;
  url?: string;
}

export const ImagesEditor = ({ images, onChange }: ImagesEditorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [uploadQueue, setUploadQueue] = useState<UploadProgress[]>([]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.startsWith("http://") || url.startsWith("https://");
    } catch {
      return false;
    }
  };

  const handleAddUrl = () => {
    if (!inputValue.trim()) {
      setError("Ingresa una URL");
      return;
    }

    if (!isValidUrl(inputValue)) {
      setError("URL inválida. Debe comenzar con http:// o https://");
      return;
    }

    if (images.includes(inputValue)) {
      setError("Esta imagen ya fue agregada");
      return;
    }

    onChange([...images, inputValue]);
    setInputValue("");
    setError("");
  };

  // ==============================================
  // UPLOAD MÚLTIPLE DE ARCHIVOS
  // ==============================================
  const handleMultipleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validar archivos
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      const errorMsg =
        invalidFiles.length === 1
          ? "Un archivo no es válido (debe ser JPG, PNG o WEBP y menor a 5MB)"
          : `${invalidFiles.length} archivos no son válidos (deben ser JPG, PNG o WEBP y menores a 5MB)`;
      toast.error("Error", { description: errorMsg });
      e.target.value = "";
      return;
    }

    // Inicializar cola de upload
    const initialQueue: UploadProgress[] = files.map((file) => ({
      file,
      status: "uploading",
      progress: 0,
    }));

    setUploadQueue(initialQueue);

    // Array para acumular las URLs exitosas
    const uploadedUrls: string[] = [];

    // Subir archivos en paralelo y recopilar resultados
    const uploadPromises = files.map((file, index) =>
      uploadFileWithProgress(file, index, uploadedUrls)
    );

    await Promise.all(uploadPromises);

    // Actualizar las imágenes UNA SOLA VEZ con todas las URLs exitosas
    if (uploadedUrls.length > 0) {
      onChange([...images, ...uploadedUrls]);
      toast.success("¡Listo!", {
        description: `${uploadedUrls.length} imagen(es) subida(s) correctamente`,
      });
    }

    // Limpiar input
    e.target.value = "";
  };

  const uploadFileWithProgress = async (
    file: File,
    index: number,
    uploadedUrls: string[]
  ) => {
    try {
      // Simular progreso
      const progressInterval = setInterval(() => {
        setUploadQueue((prev) =>
          prev.map((item, i) =>
            i === index && item.progress < 90
              ? { ...item, progress: item.progress + 10 }
              : item
          )
        );
      }, 100);

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);

      clearInterval(progressInterval);

      if (result.error) {
        setUploadQueue((prev) =>
          prev.map((item, i) =>
            i === index
              ? { ...item, status: "error", progress: 100, error: result.error }
              : item
          )
        );
        return;
      }

      if (result.imageUrl) {
        setUploadQueue((prev) =>
          prev.map((item, i) =>
            i === index
              ? {
                  ...item,
                  status: "success",
                  progress: 100,
                  url: result.imageUrl,
                }
              : item
          )
        );

        // Agregar URL al array compartido
        uploadedUrls.push(result.imageUrl);
      }
    } catch (error: any) {
      setUploadQueue((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                status: "error",
                progress: 100,
                error: "Error al subir",
              }
            : item
        )
      );
    }
  };

  const clearUploadQueue = () => {
    setUploadQueue([]);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [
      newImages[index],
      newImages[index - 1],
    ];
    onChange(newImages);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index], newImages[index + 1]] = [
      newImages[index + 1],
      newImages[index],
    ];
    onChange(newImages);
  };

  const isUploading = uploadQueue.some((item) => item.status === "uploading");
  const successCount = uploadQueue.filter(
    (item) => item.status === "success"
  ).length;
  const errorCount = uploadQueue.filter(
    (item) => item.status === "error"
  ).length;

  return (
    <div className="space-y-4">
      {/* Upload de archivos múltiples */}
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button
                type="button"
                disabled={isUploading}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {isUploading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUploading
                  ? `Subiendo ${uploadQueue.length} imagen(es)...`
                  : "Subir Imágenes"}
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleMultipleFileUpload}
              className="hidden"
              disabled={isUploading}
              multiple // 👈 ESTO PERMITE MÚLTIPLES ARCHIVOS
            />
          </div>
          <p className="text-sm text-gray-500">
            Selecciona una o más imágenes (JPG, PNG o WEBP, máx. 5MB c/u)
          </p>
        </div>
      </div>

      {/* Cola de subida */}
      {uploadQueue.length > 0 && (
        <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">
              Subiendo {uploadQueue.length} imagen(es)
            </h4>
            {!isUploading && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearUploadQueue}
              >
                Limpiar
              </Button>
            )}
          </div>

          {/* Resumen */}
          {!isUploading && (
            <div className="flex gap-4 text-sm">
              {successCount > 0 && (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  {successCount} exitosa(s)
                </span>
              )}
              {errorCount > 0 && (
                <span className="text-red-600 flex items-center gap-1">
                  <XCircle className="h-4 w-4" />
                  {errorCount} fallida(s)
                </span>
              )}
            </div>
          )}

          {/* Lista de archivos */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uploadQueue.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 bg-white rounded border"
              >
                {/* Icono de estado */}
                <div className="flex-shrink-0">
                  {item.status === "uploading" && (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  )}
                  {item.status === "success" && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                  {item.status === "error" && (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>

                {/* Nombre del archivo y progreso */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.file.name}
                  </p>
                  {item.status === "uploading" && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {item.status === "error" && item.error && (
                    <p className="text-xs text-red-600 mt-0.5">{item.error}</p>
                  )}
                </div>

                {/* Tamaño del archivo */}
                <div className="text-xs text-gray-500 flex-shrink-0">
                  {(item.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Separador */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O agregar URL</span>
        </div>
      </div>

      {/* Input para URL */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="https://ejemplo.com/imagen.jpg"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError("");
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
          />
          <Button type="button" onClick={handleAddUrl}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Preview de imágenes */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Imágenes agregadas ({images.length}):
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden bg-gray-100"
              >
                <div className="relative aspect-video">
                  <Image
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Overlay con acciones */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center gap-2">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    {index > 0 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => moveUp(index)}
                        title="Mover arriba"
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                    )}
                    {index < images.length - 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => moveDown(index)}
                        title="Mover abajo"
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(index)}
                      title="Eliminar"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Badge de orden */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">No hay imágenes agregadas</p>
          <p className="text-sm text-gray-400 mt-1">
            Sube una o más imágenes, o agrega una URL
          </p>
        </div>
      )}
    </div>
  );
};

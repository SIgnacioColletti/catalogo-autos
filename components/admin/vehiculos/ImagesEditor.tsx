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
} from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/app/admin/vehiculos/actions";
import { toast } from "sonner";

// ==============================================
// EDITOR DE IMÁGENES CON UPLOAD
// ==============================================

interface ImagesEditorProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export const ImagesEditor = ({ images, onChange }: ImagesEditorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);

    if (result.error) {
      setError(result.error);
      toast.error("Error", { description: result.error });
      setIsUploading(false);
      return;
    }

    if (result.imageUrl) {
      onChange([...images, result.imageUrl]);
      toast.success("¡Imagen subida!", {
        description: "La imagen se subió correctamente",
      });
    }

    setIsUploading(false);
    // Resetear input
    e.target.value = "";
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

  return (
    <div className="space-y-4">
      {/* Upload de archivo */}
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
                {isUploading ? "Subiendo..." : "Subir Imagen"}
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </div>
          <p className="text-sm text-gray-500">JPG, PNG o WEBP (máx. 5MB)</p>
        </div>
      </div>

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
            Sube una imagen o agrega una URL
          </p>
        </div>
      )}
    </div>
  );
};

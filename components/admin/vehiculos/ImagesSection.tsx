"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, GripVertical, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

// ==============================================
// SECCIÓN DE IMÁGENES
// ==============================================

interface ImagesSectionProps {
  form: UseFormReturn<any>;
}

export const ImagesSection = ({ form }: ImagesSectionProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const images = form.watch("images") || [];

  const handleAddImage = () => {
    if (imageUrl.trim() && !images.includes(imageUrl.trim())) {
      form.setValue("images", [...images, imageUrl.trim()]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_: string, i: number) => i !== index);
    form.setValue("images", updated);
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...images];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < images.length) {
      [newImages[index], newImages[targetIndex]] = [
        newImages[targetIndex],
        newImages[index],
      ];
      form.setValue("images", newImages);
    }
  };

  // URLs de imágenes de ejemplo de Unsplash
  const exampleImages = [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop",
  ];

  const handleUseExample = (url: string) => {
    if (!images.includes(url)) {
      form.setValue("images", [...images, url]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imágenes</CardTitle>
        <CardDescription>
          Agrega imágenes del vehículo (la primera será la imagen principal)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agregar imagen por URL */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Agregar Imagen por URL
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="https://ejemplo.com/imagen.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddImage();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddImage}
              disabled={!imageUrl.trim()}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>
        </div>

        {/* Imágenes de ejemplo */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Usar Imágenes de Ejemplo
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {exampleImages.map((url, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleUseExample(url)}
                className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors"
              >
                <Image
                  src={url}
                  alt={`Ejemplo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Lista de imágenes */}
        {images.length > 0 && (
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Imágenes Agregadas ({images.length})
            </Label>
            <div className="space-y-2">
              {images.map((url: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={url}
                      alt={`Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      Imagen {index + 1}
                      {index === 0 && (
                        <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">
                          Principal
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{url}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveImage(index, "up")}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveImage(index, "down")}
                      disabled={index === images.length - 1}
                    >
                      ↓
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error si no hay imágenes */}
        {images.length === 0 && (
          <div className="text-sm text-red-600">
            Debe agregar al menos 1 imagen
          </div>
        )}
      </CardContent>
    </Card>
  );
};

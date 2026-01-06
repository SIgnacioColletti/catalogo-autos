"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ==============================================
// GALERÍA DE IMÁGENES
// ==============================================

interface ImageGalleryProps {
  images: string[];
  alt?: string; // ← AGREGAR ESTA LÍNEA (hacerla opcional)
}

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={images[currentIndex]}
          alt={alt || `Imagen ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          className="object-cover"
          priority
        />

        {/* Controles */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Indicador */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-primary scale-105"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={
                  alt
                    ? `${alt} - miniatura ${index + 1}`
                    : `Miniatura ${index + 1}`
                }
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

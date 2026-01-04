"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ==============================================
// GALERÍA DE IMÁGENES CON THUMBNAILS
// ==============================================

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[selectedIndex]}
              alt={`${alt} - Imagen ${selectedIndex + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Contador de imágenes */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm font-medium">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-video overflow-hidden rounded-md border-2 transition-all ${
                index === selectedIndex
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`${alt} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

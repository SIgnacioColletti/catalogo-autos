"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

// ==============================================
// BOTÓN DE COMPARTIR (CLIENT COMPONENT)
// ==============================================

interface ShareButtonProps {
  title: string;
  text: string;
}

export const ShareButton = ({ title, text }: ShareButtonProps) => {
  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          title,
          text,
          url: window.location.href,
        })
        .catch(() => {
          // Si el usuario cancela, no hacer nada
        });
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado al portapapeles");
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleShare}>
      <Share2 className="mr-2 h-4 w-4" />
      Compartir
    </Button>
  );
};

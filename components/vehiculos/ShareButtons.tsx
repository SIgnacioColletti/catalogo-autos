"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import type { Vehicle } from "@/lib/types";

// ==============================================
// BOTONES DE COMPARTIR
// ==============================================

interface ShareButtonsProps {
  vehicle: Vehicle;
}

export const ShareButtons = ({ vehicle }: ShareButtonsProps) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copiado", {
      description: "El enlace fue copiado al portapapeles",
    });
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Compartir
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={handleCopyLink}
        >
          <LinkIcon className="mr-2 h-4 w-4" />
          Copiar enlace
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={handleShareFacebook}
        >
          <Facebook className="mr-2 h-4 w-4" />
          Compartir en Facebook
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={handleShareTwitter}
        >
          <Twitter className="mr-2 h-4 w-4" />
          Compartir en Twitter
        </Button>
      </CardContent>
    </Card>
  );
};

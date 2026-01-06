import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AutoMax Rosario - Venta de Autos Usados",
    template: "%s | AutoMax Rosario",
  },
  description:
    "Encontrá tu próximo auto usado en AutoMax Rosario. Amplio stock de vehículos seleccionados, financiación y garantía. Rosario, Santa Fe, Argentina.",
  keywords: [
    "autos usados",
    "venta de autos",
    "AutoMax",
    "Rosario",
    "Santa Fe",
    "Argentina",
    "vehículos",
    "financiación",
  ],
  authors: [{ name: "AutoMax Rosario" }],
  creator: "AutoMax Rosario",
  publisher: "AutoMax Rosario",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://automaxrosario.com.ar",
    siteName: "AutoMax Rosario",
    title: "AutoMax Rosario - Venta de Autos Usados",
    description:
      "Encontrá tu próximo auto usado en AutoMax Rosario. Amplio stock de vehículos seleccionados.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoMax Rosario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoMax Rosario - Venta de Autos Usados",
    description:
      "Encontrá tu próximo auto usado en AutoMax Rosario. Amplio stock de vehículos seleccionados.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

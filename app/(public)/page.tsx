import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import {
  getFeaturedVehicles,
  getAgency,
  getTotalVehiclesCount,
} from "@/lib/supabase/queries";
import { mockAgency } from "@/lib/data/agency";

// Revalidar cada 5 minutos
export const revalidate = 300;
export const dynamic = "force-dynamic";
// Metadata
export const metadata = {
  title: "AutoMax Rosario - Vehículos Usados de Calidad",
  description:
    "Encuentra tu próximo vehículo en AutoMax Rosario. Vehículos usados seleccionados con calidad garantizada.",
};

// ==============================================
// PÁGINA PRINCIPAL
// ==============================================

export default async function HomePage() {
  // Obtener datos de Supabase en paralelo
  const [featuredVehicles, agency, totalVehicles] = await Promise.all([
    getFeaturedVehicles(6),
    getAgency("automax-rosario"),
    getTotalVehiclesCount(),
  ]);

  // Fallback a datos mock si no hay agencia
  const agencyData = agency || mockAgency;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection agency={agencyData} totalVehicles={totalVehicles} />
        <FeaturedVehicles vehicles={featuredVehicles} />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber={agencyData.whatsapp} />
    </>
  );
}

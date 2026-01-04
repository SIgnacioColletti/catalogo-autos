import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { mockAgency } from "@/lib/data/agency";
import { mockVehicles } from "@/lib/data/vehicles";

export default function HomePage() {
  const featuredVehicles = mockVehicles.filter(
    (v) => v.is_featured && v.status === "available"
  );

  return (
    <>
      <Navbar />
      <main>
        <HeroSection agency={mockAgency} totalVehicles={mockVehicles.length} />
        <FeaturedVehicles vehicles={featuredVehicles} />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber={mockAgency.whatsapp} />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { mockAgency } from "@/lib/data/agency";

// ==============================================
// FOOTER
// ==============================================

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/vehiculos", label: "Vehículos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la agencia */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10">
                <Image
                  src={mockAgency.logo_url}
                  alt={mockAgency.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {mockAgency.name}
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Tu agencia de confianza para la compra y venta de vehículos usados
              en {mockAgency.city}.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              {mockAgency.instagram && (
                <a
                  href={mockAgency.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {mockAgency.facebook && (
                <a
                  href={mockAgency.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  {mockAgency.address}, {mockAgency.city}
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />

                <a
                  href={`tel:${mockAgency.phone}`}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {mockAgency.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />

                <a
                  href={`mailto:${mockAgency.email}`}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {mockAgency.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Horarios</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Lunes - Viernes</span>
                <span className="text-white">9:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábados</span>
                <span className="text-white">9:00 - 13:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos</span>
                <span className="text-white">Cerrado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} {mockAgency.name}. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/terminos"
                className="hover:text-primary transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/privacidad"
                className="hover:text-primary transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

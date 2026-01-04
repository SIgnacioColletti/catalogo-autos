"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { mockAgency } from "@/lib/data/agency";

// ==============================================
// NAVBAR
// ==============================================

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/vehiculos", label: "Vehículos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image
                src={mockAgency.logo_url}
                alt={mockAgency.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">
                {mockAgency.name}
              </span>
              <p className="text-xs text-gray-500">{mockAgency.city}</p>
            </div>
          </Link>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Botón Llamar */}
          <div className="hidden md:block">
            <Button asChild>
              <a href={`tel:${mockAgency.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </a>
            </Button>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-primary font-medium transition-colors px-2 py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="w-full">
                <a href={`tel:${mockAgency.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

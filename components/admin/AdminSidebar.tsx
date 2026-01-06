"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Car, Settings, LogOut, Home } from "lucide-react";
import { logout } from "@/lib/supabase/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ==============================================
// SIDEBAR ADMIN
// ==============================================

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await logout();

      if (error) {
        toast.error("Error", {
          description: "No se pudo cerrar sesión",
        });
        return;
      }

      toast.success("Sesión cerrada", {
        description: "Hasta pronto",
      });

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error", {
        description: "Ocurrió un error al cerrar sesión",
      });
    }
  };

  const menuItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/vehiculos",
      label: "Vehículos",
      icon: Car,
    },
    {
      href: "/admin/configuracion",
      label: "Configuración",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6 flex flex-col">
      {/* Logo / Título */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Panel Admin</h2>
        <p className="text-sm text-gray-500">Gestión de vehículos</p>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Botones inferiores */}
      <div className="mt-auto pt-6 border-t space-y-2">
        {/* Botón Volver al Catálogo */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Ver Catálogo Público</span>
        </Link>

        {/* Botón Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
};

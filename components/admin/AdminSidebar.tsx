"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Car, Settings, LogOut, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

// ==============================================
// SIDEBAR DEL ADMIN
// ==============================================

interface AdminSidebarProps {
  onClose?: () => void; // Para cerrar en mobile
}

export const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: Car,
      label: "Vehículos",
      href: "/admin/vehiculos",
    },
    {
      icon: Settings,
      label: "Configuración",
      href: "/admin/configuracion",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header del sidebar */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-bold">AutoMax Admin</h2>
          <p className="text-xs text-gray-400">Panel de Control</p>
        </div>
        {/* Botón cerrar (solo mobile) */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {/* Separador */}
      <div className="mt-auto pt-6 border-t space-y-2">
        {/* Botón Volver al Catálogo */}
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <Link href="/">
            <Home className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700" />
            Ver Catálogo Público
          </Link>
        </Button>

        {/* Botón Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
      {/* Footer con logout */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-gray-300 hover:bg-red-900/20 hover:text-red-400"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

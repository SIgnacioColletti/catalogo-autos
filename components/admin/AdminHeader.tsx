"use client";

import { Button } from "@/components/ui/button";
import { Menu, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/lib/supabase/auth";
import { toast } from "sonner";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getCurrentUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Sesión cerrada");
      window.location.replace("/admin/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white border-b px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900">Administración</h1>
            <p className="text-sm text-gray-500">
              Gestiona tu inventario de vehículos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userEmail && (
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userEmail}</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          )}

          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
              <Home className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Ver Catálogo</span>
            </Link>
          </Button>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">
              {isLoggingOut ? "Saliendo..." : "Salir"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

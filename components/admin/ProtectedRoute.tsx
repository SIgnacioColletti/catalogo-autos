"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

// ==============================================
// COMPONENTE PARA PROTEGER RUTAS ADMIN
// ==============================================

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Marcar como montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // NO proteger la ruta de login
    if (pathname === "/admin/login") {
      setIsChecking(false);
      return;
    }

    // Verificar autenticación para otras rutas
    if (!isAuthenticated()) {
      router.push("/admin/login");
    } else {
      setIsChecking(false);
    }
  }, [router, pathname, isMounted]);

  // Si es la ruta de login, mostrar directamente
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Mostrar loading mientras verifica o mientras no está montado
  if (isChecking || !isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

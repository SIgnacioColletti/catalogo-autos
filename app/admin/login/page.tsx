"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/supabase/auth";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Error", {
        description: "Por favor completa todos los campos",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { user, error } = await login({ email, password });

      if (error || !user) {
        toast.error("Error de autenticación", {
          description: error || "Credenciales inválidas",
        });
        setIsLoading(false);
        return;
      }

      toast.success("¡Bienvenido!");

      // CRÍTICO: Hard redirect para forzar cookies
      window.location.replace("/admin");
    } catch (error) {
      console.error("Excepción en login:", error);
      toast.error("Error", {
        description: "Ocurrió un error al iniciar sesión",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-blue-700 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="relative h-16 w-16">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=100&h=100&fit=crop"
                alt="Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Panel de Administración
          </CardTitle>
          <p className="text-sm text-gray-600 text-center">
            Ingresa tus credenciales para continuar
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@automax.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Credenciales de prueba:
            </p>
            <p className="text-xs text-blue-700">Email: admin@automax.com</p>
            <p className="text-xs text-blue-700">Contraseña: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

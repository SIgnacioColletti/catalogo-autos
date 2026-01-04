"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AdminSidebar } from "./AdminSidebar";
import { getCurrentUser } from "@/lib/auth";

// ==============================================
// HEADER DEL ADMIN (con menú mobile)
// ==============================================

export const AdminHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" className="lg:hidden" disabled>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-gray-900">
              Panel de Administración
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-gray-900">
              Panel de Administración
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {user?.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <AdminSidebar onClose={() => setIsMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
};

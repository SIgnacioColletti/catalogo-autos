import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Toaster } from "@/components/ui/sonner";

// ==============================================
// LAYOUT DEL PANEL ADMIN
// ==============================================

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Solo desktop */}
        <aside className="hidden lg:block w-64 border-r">
          <AdminSidebar />
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />

          <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
        </div>
      </div>

      {/* Toaster para notificaciones */}
      <Toaster position="top-right" richColors />
    </ProtectedRoute>
  );
}

import { StatsCards } from "@/components/admin/dashboard/StatsCards";
import { VehiclesByBrandChart } from "@/components/admin/dashboard/VehiclesByBrandChart";
import { RecentVehiclesTable } from "@/components/admin/dashboard/RecentVehiclesTable";
import { TopViewedTable } from "@/components/admin/dashboard/TopViewedTable";
import { FadeIn } from "@/components/animations/FadeIn";

// ==============================================
// DASHBOARD ADMIN COMPLETO
// ==============================================

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <FadeIn>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">
            Resumen general de tu inventario y métricas
          </p>
        </div>
      </FadeIn>

      {/* Cards de estadísticas */}
      <StatsCards />

      {/* Gráfico de marcas */}
      <VehiclesByBrandChart />

      {/* Tablas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentVehiclesTable />
        <TopViewedTable />
      </div>
    </div>
  );
}

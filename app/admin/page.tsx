import {
  getDashboardStats,
  getVehiclesByBrand,
  getRecentVehicles,
  getMostViewedVehicles,
} from "@/lib/supabase/queries";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { BrandChart } from "@/components/admin/dashboard/BrandChart";
import { RecentVehiclesTable } from "@/components/admin/dashboard/RecentVehiclesTable";
import { Car, TrendingUp, Star, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const dynamic = "force-dynamic";
export default async function AdminDashboard() {
  const [stats, brandData, recentVehicles, mostViewedVehicles] =
    await Promise.all([
      getDashboardStats(),
      getVehiclesByBrand(),
      getRecentVehicles(5),
      getMostViewedVehicles(5),
    ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Resumen de tu inventario
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Vehiculos"
          value={stats.totalVehicles}
          icon={Car}
          color="blue"
        />
        <StatsCard
          title="Vendidos"
          value={stats.soldVehicles}
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Destacados"
          value={stats.featuredVehicles}
          icon={Star}
          color="yellow"
        />
        <StatsCard
          title="Total Visitas"
          value={stats.totalViews}
          icon={Eye}
          color="purple"
        />
      </div>

      {/* Charts y Tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Gráfico */}
        <Card>
          <CardHeader>
            <CardTitle>Vehiculos por Marca</CardTitle>
          </CardHeader>
          <CardContent>
            <BrandChart data={brandData} />
          </CardContent>
        </Card>

        {/* Tabla Recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Ultimos Agregados</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentVehiclesTable vehicles={recentVehicles} />
          </CardContent>
        </Card>
      </div>

      {/* Más Vistos */}
      <Card>
        <CardHeader>
          <CardTitle>Vehiculos Mas Vistos</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentVehiclesTable vehicles={mostViewedVehicles} />
        </CardContent>
      </Card>
    </div>
  );
}

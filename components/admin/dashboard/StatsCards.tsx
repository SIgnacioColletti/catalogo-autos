"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, CheckCircle, Star, Eye, TrendingUp, Clock } from "lucide-react";
import { getDashboardStats } from "@/lib/dashboard-utils";
import { SlideIn } from "@/components/animations/SlideIn";

// ==============================================
// CARDS DE ESTADÍSTICAS
// ==============================================

export const StatsCards = () => {
  const stats = getDashboardStats();

  const cards = [
    {
      title: "Total Vehículos",
      value: stats.totalVehicles,
      description: `${stats.availableVehicles} disponibles`,
      icon: Car,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Vendidos",
      value: stats.soldVehicles,
      description: "Este mes",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Destacados",
      value: stats.featuredVehicles,
      description: "En portada",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Visitas Totales",
      value: stats.totalViews.toLocaleString(),
      description: "Todas las publicaciones",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Reservados",
      value: stats.reservedVehicles,
      description: "Pendientes",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Conversión",
      value: `${((stats.soldVehicles / stats.totalVehicles) * 100).toFixed(
        1
      )}%`,
      description: "Tasa de venta",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <SlideIn key={card.title} direction="up" delay={index * 0.1}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`${card.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </SlideIn>
        );
      })}
    </div>
  );
};

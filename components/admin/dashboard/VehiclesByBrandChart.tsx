"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getVehiclesByBrand } from "@/lib/dashboard-utils";
import { SlideIn } from "@/components/animations/SlideIn";

// ==============================================
// GRÁFICO DE VEHÍCULOS POR MARCA
// ==============================================

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
];

export const VehiclesByBrandChart = () => {
  const data = getVehiclesByBrand();

  return (
    <SlideIn direction="up" delay={0.3}>
      <Card>
        <CardHeader>
          <CardTitle>Vehículos por Marca</CardTitle>
          <CardDescription>Distribución del inventario actual</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </SlideIn>
  );
};

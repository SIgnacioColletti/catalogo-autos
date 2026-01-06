"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ==============================================
// GRÁFICO DE VEHÍCULOS POR MARCA
// ==============================================

interface BrandChartProps {
  data: { brand: string; count: number }[];
}

export const BrandChart = ({ data }: BrandChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehículos por Marca</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="brand" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

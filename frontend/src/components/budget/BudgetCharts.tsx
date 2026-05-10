"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetChartsProps {
  breakdown?: Record<string, { estimated: number; actual: number }>;
}

const CATEGORY_COLORS: Record<string, string> = {
  TRANSPORT: "#3B82F6",
  ACCOMMODATION: "#8B5CF6",
  FOOD: "#F59E0B",
  ACTIVITY: "#10B981",
  SHOPPING: "#EC4899",
  MISCELLANEOUS: "#6B7280",
};

export function BudgetCharts({ breakdown = {} }: BudgetChartsProps) {
  const pieData = Object.entries(breakdown).map(([key, val]) => ({
    name: key.charAt(0) + key.slice(1).toLowerCase(),
    value: val.actual,
    color: CATEGORY_COLORS[key] || "#6B7280",
  })).filter(item => item.value > 0);

  // If no data, show empty state or placeholder
  const displayPieData = pieData.length > 0 ? pieData : [{ name: "No Data", value: 1, color: "#E5E7EB" }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <Card className="border-none shadow-sm glass">
        <CardHeader>
          <CardTitle className="font-display font-bold">Cost by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {displayPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm glass">
        <CardHeader>
          <CardTitle className="font-display font-bold">Category Comparison</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pieData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                radius={[10, 10, 0, 0]}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

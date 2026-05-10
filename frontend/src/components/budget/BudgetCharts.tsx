"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORY_DATA = [
  { name: "Transport", value: 450, color: "#3B82F6" },
  { name: "Accommodation", value: 800, color: "#8B5CF6" },
  { name: "Food", value: 300, color: "#F59E0B" },
  { name: "Activities", value: 250, color: "#10B981" },
  { name: "Shopping", value: 150, color: "#EC4899" },
  { name: "Misc", value: 100, color: "#6B7280" },
];

const DAILY_DATA = [
  { day: "Day 1", cost: 120, limit: 150 },
  { day: "Day 2", cost: 180, limit: 150 },
  { day: "Day 3", cost: 90, limit: 150 },
  { day: "Day 4", cost: 210, limit: 150 },
  { day: "Day 5", cost: 130, limit: 150 },
  { day: "Day 6", cost: 160, limit: 150 },
  { day: "Day 7", cost: 110, limit: 150 },
];

export function BudgetCharts() {
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
                data={CATEGORY_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {CATEGORY_DATA.map((entry, index) => (
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
          <CardTitle className="font-display font-bold">Daily Spending</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DAILY_DATA}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="cost" 
                radius={[10, 10, 0, 0]}
              >
                {DAILY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cost > entry.limit ? "#EF4444" : "#F59E0B"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

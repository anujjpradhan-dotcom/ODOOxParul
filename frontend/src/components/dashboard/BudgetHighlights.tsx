import { Wallet, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function BudgetHighlights() {
  const stats = [
    {
      label: "Total Spent (2024)",
      value: 12500,
      icon: Wallet,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Upcoming Budget",
      value: 4200,
      icon: Calendar,
      color: "text-teal-600",
      bg: "bg-teal-100",
    },
    {
      label: "Avg. Daily Cost",
      value: 150,
      icon: TrendingUp,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-none shadow-sm glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", stat.bg)}>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display">
                {formatCurrency(stat.value)}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

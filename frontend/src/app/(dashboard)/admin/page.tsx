"use client";

import { Users, Map, Activity, TrendingUp, Search, MoreHorizontal, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const STATS = [
  { label: "Total Users", value: "2,543", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Total Trips", value: "8,921", icon: Map, color: "text-amber-600", bg: "bg-amber-100" },
  { label: "Active Users (30d)", value: "1,204", icon: Activity, color: "text-teal-600", bg: "bg-teal-100" },
  { label: "Avg Trips/User", value: "3.5", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
];

const RECENT_USERS = [
  { name: "Alice Johnson", email: "alice@example.com", trips: 12, joined: "2 days ago", status: "Active" },
  { name: "Bob Smith", email: "bob@smith.com", trips: 4, joined: "5 days ago", status: "Active" },
  { name: "Charlie Brown", email: "charlie@gmail.com", trips: 0, joined: "1 week ago", status: "Pending" },
  { name: "Diana Prince", email: "diana@themyscira.com", trips: 28, joined: "2 weeks ago", status: "Active" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and user management.</p>
        </div>
        <Button className="rounded-2xl h-12 px-6 gap-2 bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-none shadow-sm glass animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={cn("p-2 rounded-xl", stat.bg)}>
                  <Icon className={cn("h-4 w-4", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-display">{stat.value}</div>
                <p className="text-xs text-teal-600 font-bold mt-1">+12% from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm glass rounded-[32px] overflow-hidden">
            <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="font-display font-bold text-2xl">Users Overview</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-9 h-10 rounded-xl bg-muted/50 border-none" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="px-8 py-4">User</th>
                      <th className="px-8 py-4">Trips</th>
                      <th className="px-8 py-4">Joined</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {RECENT_USERS.map((user) => (
                      <tr key={user.email} className="hover:bg-muted/10 transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="text-xs font-bold bg-muted">{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm">{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm font-medium">{user.trips}</td>
                        <td className="px-8 py-4 text-sm text-muted-foreground">{user.joined}</td>
                        <td className="px-8 py-4">
                          <Badge variant="outline" className={cn(
                            "rounded-full border-none px-3",
                            user.status === "Active" ? "bg-teal-50 text-teal-600" : "bg-amber-50 text-amber-600"
                          )}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t text-center">
                <Button variant="link" className="text-brand-primary font-bold">View All Users</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
           <Card className="border-none shadow-sm glass rounded-[32px]">
              <CardHeader className="px-8 pt-8">
                <CardTitle className="font-display font-bold text-xl">Top Cities</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                {[
                  { name: "Paris", count: 120, percentage: 85 },
                  { name: "Tokyo", count: 98, percentage: 70 },
                  { name: "London", count: 85, percentage: 60 },
                  { name: "Bali", count: 72, percentage: 50 },
                ].map((city) => (
                  <div key={city.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold">{city.name}</span>
                      <span className="text-muted-foreground">{city.count} trips</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary rounded-full" style={{ width: `${city.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
           </Card>

           <div className="p-8 bg-brand-primary rounded-[32px] text-white space-y-4">
              <h3 className="text-xl font-bold font-display">System Health</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
                <span className="text-sm font-medium">All systems operational</span>
              </div>
              <p className="text-sm opacity-80">Server load is currently low (12%). Backup completed 4 hours ago.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

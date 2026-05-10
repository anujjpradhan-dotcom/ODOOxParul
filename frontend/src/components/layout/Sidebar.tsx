"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Compass, 
  Wallet, 
  Package, 
  FileText, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { useTripStore } from "@/stores/trip.store";
import { useAuthStore } from "@/stores/auth.store";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { activeTripId } = useTripStore();
  const { user } = useAuthStore();

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: ROUTES.DASHBOARD },
    { icon: Map, label: "My Trips", href: ROUTES.TRIPS },
    { icon: Compass, label: "Explore", href: ROUTES.EXPLORE },
    { 
      icon: Wallet, 
      label: "Budget", 
      href: activeTripId ? `/trips/${activeTripId}/budget` : "#", 
      disabled: !activeTripId 
    },
    { 
      icon: Package, 
      label: "Packing", 
      href: activeTripId ? `/trips/${activeTripId}/packing` : "#", 
      disabled: !activeTripId 
    },
    { 
      icon: FileText, 
      label: "Notes", 
      href: activeTripId ? `/trips/${activeTripId}/notes` : "#", 
      disabled: !activeTripId 
    },
  ];

  const isAdmin = user?.role === "ADMIN" || user?.email?.includes("admin");

  return (
    <aside 
      className={cn(
        "h-[calc(100vh-4rem)] border-r sticky top-16 hidden md:flex flex-col transition-all duration-300 ease-in-out bg-white dark:bg-stone-950",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                isActive 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                item.disabled && "opacity-40 cursor-not-allowed grayscale pointer-events-none"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", !isActive && "group-hover:scale-110 transition-transform")} />
              {!isCollapsed && (
                <span className="font-medium text-sm truncate">{item.label}</span>
              )}
              {item.disabled && !isCollapsed && (
                <span className="ml-auto text-[10px] font-bold uppercase tracking-tighter opacity-50">Trip Only</span>
              )}
            </Link>
          );
        })}

        {isAdmin && (
          <div className="pt-4 mt-4 border-t">
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Administration</p>
            )}
            <Link
              href={ROUTES.ADMIN}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                pathname === ROUTES.ADMIN 
                  ? "bg-stone-900 text-white shadow-lg shadow-stone-900/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <ShieldCheck className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm truncate">Admin Panel</span>
              )}
            </Link>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center rounded-xl h-10 text-muted-foreground"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
    </aside>
  );
}

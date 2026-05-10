import Link from "next/link";
import { Plus, Search, Map as MapIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export function QuickActions() {
  const actions = [
    { 
      label: "Plan New Trip", 
      icon: Plus, 
      href: ROUTES.CREATE_TRIP,
      variant: "default" as const,
      className: "bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20"
    },
    { 
      label: "Explore Cities", 
      icon: Search, 
      href: ROUTES.EXPLORE,
      variant: "outline" as const,
      className: ""
    },
    { 
      label: "View My Trips", 
      icon: MapIcon, 
      href: ROUTES.TRIPS,
      variant: "outline" as const,
      className: ""
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            variant={action.variant}
            className={cn("h-14 rounded-2xl gap-3 text-base font-semibold", action.className)}
            asChild
          >
            <Link href={action.href}>
              <Icon className="h-5 w-5" />
              {action.label}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}

// Utility to merge classes inside the same file for simplicity since I can't export it from here easily if I keep it separate
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

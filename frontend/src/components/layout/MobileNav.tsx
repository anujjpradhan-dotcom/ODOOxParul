"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Compass, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

const navItems = [
  { icon: Home, label: "Home", href: ROUTES.DASHBOARD },
  { icon: Map, label: "Trips", href: ROUTES.TRIPS },
  { icon: Compass, label: "Explore", href: ROUTES.EXPLORE },
  { icon: User, label: "Profile", href: ROUTES.PROFILE },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t flex items-center justify-around h-16 px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
              isActive ? "text-brand-primary" : "text-muted-foreground"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive && "fill-brand-primary/20")} />
            <span className="text-[10px] font-medium">{item.label}</span>
            {isActive && (
              <div className="absolute bottom-0 w-1 h-1 bg-brand-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

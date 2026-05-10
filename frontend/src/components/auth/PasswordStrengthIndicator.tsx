"use client";

import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  strength: number; // 0 to 4
}

export function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  const getLabel = () => {
    switch (strength) {
      case 0: return "Too weak";
      case 1: return "Weak";
      case 2: return "Medium";
      case 3: return "Strong";
      case 4: return "Very strong";
      default: return "";
    }
  };

  const getColorClass = () => {
    switch (strength) {
      case 0: return "bg-destructive";
      case 1: return "bg-orange-500";
      case 2: return "bg-amber-500";
      case 3: return "bg-teal-500";
      case 4: return "bg-green-500";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1 h-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              i < strength ? getColorClass() : "bg-muted"
            )}
          />
        ))}
      </div>
      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground text-right">
        Strength: <span className={cn("transition-colors", strength > 0 ? "text-foreground" : "")}>{getLabel()}</span>
      </p>
    </div>
  );
}

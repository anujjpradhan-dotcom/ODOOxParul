import Link from "next/link";
import { Compass } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-teal-50 dark:from-stone-950 dark:to-stone-900">
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <Link href="/" className="flex items-center gap-2 mb-8 group transition-transform hover:scale-105">
          <div className="p-2 rounded-xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20">
            <Compass className="h-8 w-8" />
          </div>
          <span className="text-3xl font-bold font-display tracking-tight">Traveloop</span>
        </Link>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

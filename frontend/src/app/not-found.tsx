import Link from "next/link";
import { Compass, Map, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 px-6 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-8 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="relative p-6 bg-white dark:bg-stone-900 rounded-[40px] shadow-2xl border">
          <Compass className="h-24 w-24 text-brand-primary animate-spin-slow" />
        </div>
        <div className="absolute -bottom-4 -right-4 p-3 bg-brand-secondary text-white rounded-2xl shadow-xl">
          <Map className="h-8 w-8" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-md">
        <h1 className="text-6xl font-bold font-display tracking-tighter text-brand-primary">404</h1>
        <h2 className="text-3xl font-bold font-display">Looks like you took a wrong turn!</h2>
        <p className="text-muted-foreground text-lg">
          The page you're looking for has wandered off the map. Let's get you back on track.
        </p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="rounded-2xl h-14 px-8 bg-brand-primary hover:bg-brand-primary/90 text-lg font-bold gap-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 text-lg font-bold" asChild>
          <Link href="/explore">
            Explore Destinations
          </Link>
        </Button>
      </div>
    </div>
  );
}

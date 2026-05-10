"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 px-6 text-center">
      <div className="p-6 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-[40px] mb-8 border border-red-200 dark:border-red-900/30">
        <AlertTriangle className="h-16 w-16" />
      </div>
      
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-bold font-display tracking-tight">Something went wrong!</h1>
        <p className="text-muted-foreground text-lg">
          We encountered an unexpected turbulence while loading this page. 
        </p>
        {error.message && (
          <div className="p-3 bg-muted rounded-xl text-xs font-mono text-left break-all opacity-70">
            {error.message}
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="rounded-2xl h-14 px-8 bg-brand-primary hover:bg-brand-primary/90 text-lg font-bold gap-2"
          onClick={() => reset()}
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </Button>
        <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 text-lg font-bold gap-2" asChild>
          <Link href="/">
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </Button>
      </div>
      
      <p className="mt-8 text-sm text-muted-foreground">
        If the problem persists, please <Link href="/support" className="underline font-bold">contact support</Link>.
      </p>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { Compass, Map, Wallet, Share2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b glass sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Compass className="h-6 w-6 text-brand-primary" />
          <span className="ml-2 text-2xl font-bold font-display">Traveloop</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href={ROUTES.LOGIN}>
            Login
          </Link>
          <Button asChild size="sm">
            <Link href={ROUTES.SIGNUP}>Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-amber-50 to-teal-50 dark:from-stone-900 dark:to-stone-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-display">
                  Your Journey, <span className="text-brand-primary">Perfectly Planned</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create personalized itineraries, manage your travel budget, and share your adventures with the world. All in one place.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-brand-primary/20" asChild>
                  <Link href={ROUTES.SIGNUP}>Start Planning Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-2xl bg-card shadow-sm hover:shadow-md transition-all">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <Map className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display">Itinerary Builder</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Drag-and-drop stops and activities to build your perfect trip day by day.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-2xl bg-card shadow-sm hover:shadow-md transition-all">
                <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display">Budget Tracking</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Monitor your expenses in real-time and stay within your travel budget.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-2xl bg-card shadow-sm hover:shadow-md transition-all">
                <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display">Explore Cities</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Discover popular activities and top-rated cities for your next adventure.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-2xl bg-card shadow-sm hover:shadow-md transition-all">
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display">Share & Inspire</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Make your trips public and share beautiful itineraries with friends and family.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 px-4 md:px-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Traveloop. Built for adventurers.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingTrips } from "@/components/dashboard/UpcomingTrips";
import { RecommendedDestinations } from "@/components/dashboard/RecommendedDestinations";
import { BudgetHighlights } from "@/components/dashboard/BudgetHighlights";
import { useTrips } from "@/hooks/useTrips";
import { useCities } from "@/hooks/useCities";

export default function DashboardPage() {
  const { trips, fetchTrips, isLoading: isTripsLoading } = useTrips();
  const { cities, searchCities, isLoading: isCitiesLoading } = useCities();

  useEffect(() => {
    // Fetch upcoming trips (PLANNED status)
    fetchTrips({ status: "PLANNED", limit: 3 });
    // Fetch some recommended cities
    searchCities("", { limit: 4 });
  }, [fetchTrips, searchCities]);

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-8">
        <WelcomeSection />
        <QuickActions />
      </div>

      <div className="space-y-12">
        <section>
          <BudgetHighlights />
        </section>

        <section>
          <UpcomingTrips trips={trips} isLoading={isTripsLoading} />
        </section>

        <section>
          <RecommendedDestinations cities={cities} isLoading={isCitiesLoading} />
        </section>
      </div>
    </div>
  );
}

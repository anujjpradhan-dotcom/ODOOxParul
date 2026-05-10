"use client";

import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingTrips } from "@/components/dashboard/UpcomingTrips";
import { RecommendedDestinations } from "@/components/dashboard/RecommendedDestinations";
import { BudgetHighlights } from "@/components/dashboard/BudgetHighlights";
import { useDashboard } from "@/hooks/useDashboard";
import { useCities } from "@/hooks/useCities";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboard();
  const { cities, searchCities, isLoading: isCitiesLoading } = useCities();

  useEffect(() => {
    // Fetch some recommended cities if not already loaded
    searchCities("", { limit: 4 });
  }, [searchCities]);

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      <div className="space-y-8">
        <WelcomeSection />
        <QuickActions />
      </div>

      <div className="space-y-12">
        <section className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <BudgetHighlights 
            stats={dashboardData?.stats} 
            isLoading={isDashboardLoading} 
          />
        </section>

        <section className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <UpcomingTrips 
            trips={dashboardData?.upcomingTrips || []} 
            isLoading={isDashboardLoading} 
          />
        </section>

        <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <RecommendedDestinations 
            cities={cities} 
            isLoading={isCitiesLoading} 
          />
        </section>
      </div>
    </div>
  );
}

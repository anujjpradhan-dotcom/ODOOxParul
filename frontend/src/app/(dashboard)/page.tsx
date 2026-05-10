"use client";

import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingTrips } from "@/components/dashboard/UpcomingTrips";
import { RecommendedDestinations } from "@/components/dashboard/RecommendedDestinations";
import { BudgetHighlights } from "@/components/dashboard/BudgetHighlights";
import { Trip, City } from "@/types";

const MOCK_UPCOMING_TRIPS: Trip[] = [
  {
    id: "1",
    userId: "u1",
    name: "Summer in Kyoto",
    startDate: "2024-07-15",
    endDate: "2024-07-25",
    stopsCount: 3,
    status: "PLANNED",
    isPublic: false,
    shareSlug: "kyoto-2024",
    coverImageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    userId: "u1",
    name: "Amalfi Coast Road Trip",
    startDate: "2024-09-05",
    endDate: "2024-09-15",
    stopsCount: 5,
    status: "PLANNED",
    isPublic: true,
    shareSlug: "amalfi-roadtrip",
    coverImageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    createdAt: "",
    updatedAt: "",
  }
];

const MOCK_CITIES: City[] = [
  {
    id: "c1",
    name: "Paris",
    country: "France",
    region: "Europe",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop",
    costLevel: 3,
    popularity: 4.9,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c2",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop",
    costLevel: 3,
    popularity: 4.8,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c3",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop",
    costLevel: 1,
    popularity: 4.7,
    latitude: 0,
    longitude: 0,
  },
  {
    id: "c4",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop",
    costLevel: 4,
    popularity: 4.9,
    latitude: 0,
    longitude: 0,
  },
];

export default function DashboardPage() {
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
          <UpcomingTrips trips={MOCK_UPCOMING_TRIPS} />
        </section>

        <section>
          <RecommendedDestinations cities={MOCK_CITIES} />
        </section>
      </div>
    </div>
  );
}

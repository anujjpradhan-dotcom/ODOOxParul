import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TripCard } from "@/components/shared/TripCard";
import { ROUTES } from "@/lib/constants";
import { Trip } from "@/types";

interface UpcomingTripsProps {
  trips: Trip[];
}

export function UpcomingTrips({ trips }: UpcomingTripsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">Upcoming Trips</h2>
        <Link 
          href={ROUTES.TRIPS} 
          className="text-brand-primary text-sm font-semibold flex items-center hover:underline"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.slice(0, 3).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-3xl p-12 text-center space-y-4 bg-white/50">
          <p className="text-muted-foreground">No upcoming trips planned yet.</p>
          <Link href={ROUTES.CREATE_TRIP} className="text-brand-primary font-bold hover:underline">
            Create your first trip
          </Link>
        </div>
      )}
    </div>
  );
}

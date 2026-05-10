import Link from "next/link";
import { Calendar, MapPin, MoreVertical, Edit2, Trash2, Share2, Copy } from "lucide-react";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trip } from "@/types";
import { cn, formatDateRange } from "@/lib/utils";

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export function TripCard({ trip, onDelete, onDuplicate }: TripCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT": return "bg-gray-500";
      case "PLANNED": return "bg-blue-500";
      case "ONGOING": return "bg-teal-500";
      case "COMPLETED": return "bg-violet-500";
      case "CANCELLED": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none glass animate-fade-in">
      <Link href={`/trips/${trip.id}`} className="block relative h-48 overflow-hidden">
        {trip.coverImageUrl ? (
          <img 
            src={trip.coverImageUrl} 
            alt={trip.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <MapPin className="h-12 w-12 text-white/50" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={cn("text-white border-none shadow-sm", getStatusColor(trip.status))}>
            {trip.status}
          </Badge>
        </div>
      </Link>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Link href={`/trips/${trip.id}`} className="hover:text-brand-primary transition-colors">
            <h3 className="font-bold font-display text-xl line-clamp-1">{trip.name}</h3>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/trips/${trip.id}/builder`} className="cursor-pointer">
                  <Edit2 className="mr-2 h-4 w-4" />
                  <span>Edit Itinerary</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate?.(trip.id)} className="cursor-pointer">
                <Copy className="mr-2 h-4 w-4" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(trip.id)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 pb-4 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <MapPin className="h-4 w-4" />
          <span>{trip.stopsCount} {trip.stopsCount === 1 ? "Stop" : "Stops"}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t bg-muted/20">
        <div className="text-xs font-medium text-muted-foreground">
          {trip.isPublic ? (
            <span className="flex items-center gap-1"><Share2 className="h-3 w-3" /> Public</span>
          ) : (
            <span className="flex items-center gap-1">Private</span>
          )}
        </div>
        <Button variant="link" size="sm" className="h-auto p-0 text-brand-primary" asChild>
          <Link href={`/trips/${trip.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

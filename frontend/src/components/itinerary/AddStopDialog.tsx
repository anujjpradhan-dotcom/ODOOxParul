"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, MapPin, Loader2, Search } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCities } from "@/hooks/useCities";
import { City, Trip } from "@/types";
import { cn } from "@/lib/utils";

const addStopSchema = z.object({
  cityId: z.string().min(1, "Please select a city"),
  arrivalDate: z.string().min(1, "Arrival date is required"),
  departureDate: z.string().min(1, "Departure date is required"),
  notes: z.string().optional(),
}).refine((data) => new Date(data.departureDate) >= new Date(data.arrivalDate), {
  message: "Departure date must be after or equal to arrival date",
  path: ["departureDate"],
});

type AddStopFormValues = z.infer<typeof addStopSchema>;

interface AddStopDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStop: (data: any) => Promise<any>;
  trip: Trip;
}

export function AddStopDialog({ isOpen, onOpenChange, onAddStop, trip }: AddStopDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cities, isLoading: isLoadingCities, searchCities } = useCities();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddStopFormValues>({
    resolver: zodResolver(addStopSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset();
      setSelectedCity(null);
      setSearchTerm("");
      
      // Default dates to trip dates if it's the first stop
      const tripStart = new Date(trip.startDate).toISOString().split("T")[0];
      const tripEnd = new Date(trip.endDate).toISOString().split("T")[0];
      setValue("arrivalDate", tripStart);
      setValue("departureDate", tripEnd);
    }
  }, [isOpen, reset, setValue, trip]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length >= 2) {
        searchCities(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchCities]);

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setValue("cityId", city.id);
    setSearchTerm(city.name);
  };

  const onSubmit = async (values: AddStopFormValues) => {
    setIsSubmitting(true);
    try {
      await onAddStop({
        ...values,
        arrivalDate: new Date(values.arrivalDate).toISOString(),
        departureDate: new Date(values.departureDate).toISOString(),
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add stop:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-display">Add a Destination</DialogTitle>
          <DialogDescription>
            Choose a city and set your stay dates for this stop.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="citySearch">Where are you going?</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="citySearch"
                placeholder="Search for a city..."
                className="pl-10 h-11 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
              />
            </div>
            
            {searchTerm.length >= 2 && !selectedCity && (
              <div className="absolute z-50 w-[calc(100%-3rem)] max-h-48 overflow-y-auto bg-background border rounded-xl shadow-lg mt-1">
                {isLoadingCities ? (
                  <div className="p-4 flex justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-brand-primary" />
                  </div>
                ) : cities.length > 0 ? (
                  cities.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex flex-col"
                      onClick={() => handleSelectCity(city)}
                    >
                      <span className="font-medium">{city.name}</span>
                      <span className="text-xs text-muted-foreground">{city.country}</span>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No cities found
                  </div>
                )}
              </div>
            )}
            {errors.cityId && <p className="text-xs text-destructive">{errors.cityId.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="arrivalDate">Arrival</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="arrivalDate"
                  type="date"
                  className="pl-10 h-11 rounded-xl"
                  min={new Date(trip.startDate).toISOString().split("T")[0]}
                  max={new Date(trip.endDate).toISOString().split("T")[0]}
                  {...register("arrivalDate")}
                />
              </div>
              {errors.arrivalDate && <p className="text-xs text-destructive">{errors.arrivalDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="departureDate"
                  type="date"
                  className="pl-10 h-11 rounded-xl"
                  min={new Date(trip.startDate).toISOString().split("T")[0]}
                  max={new Date(trip.endDate).toISOString().split("T")[0]}
                  {...register("departureDate")}
                />
              </div>
              {errors.departureDate && <p className="text-xs text-destructive">{errors.departureDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Accommodation, things to remember..."
              className="rounded-xl resize-none"
              {...register("notes")}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl h-11"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl h-11 bg-brand-primary hover:bg-brand-primary/90 px-8"
              disabled={isSubmitting || !selectedCity}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add to Itinerary"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

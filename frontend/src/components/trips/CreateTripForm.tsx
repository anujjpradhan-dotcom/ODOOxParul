"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, Map, DollarSign, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrips } from "@/hooks/useTrips";
import { ROUTES } from "@/lib/constants";

const createTripSchema = z.object({
  name: z.string().min(3, "Trip name must be at least 3 characters").max(100),
  description: z.string().max(500).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  coverImageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  budgetLimit: z.coerce.number().min(0).optional(),
  isPublic: z.boolean().default(false),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

type CreateTripFormValues = z.infer<typeof createTripSchema>;

export function CreateTripForm() {
  const router = useRouter();
  const { createTrip, isLoading } = useTrips();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripFormValues>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      isPublic: false,
    },
  });

  const onSubmit = async (data: CreateTripFormValues) => {
    try {
      const trip = await createTrip(data);
      if (trip?.id) {
        router.push(`/trips/${trip.id}/builder`);
      } else {
        // Fallback for mock/local development
        router.push(ROUTES.TRIPS);
      }
    } catch (error) {
      // Error handled in hook
    }
  };

  return (
    <Card className="border-none shadow-2xl glass max-w-2xl mx-auto animate-slide-up">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-display">Plan a New Trip</CardTitle>
        <CardDescription>
          Fill in the basics to start building your perfect itinerary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Trip Name</Label>
            <div className="relative">
              <Map className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="name" 
                placeholder="e.g. Summer in Japan" 
                className="pl-10 h-11"
                {...register("name")} 
              />
            </div>
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Tell us more about your trip..." 
              className="resize-none"
              {...register("description")} 
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="startDate" type="date" className="pl-10 h-11" {...register("startDate")} />
              </div>
              {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="endDate" type="date" className="pl-10 h-11" {...register("endDate")} />
              </div>
              {errors.endDate && <p className="text-sm text-destructive">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetLimit">Budget Limit (Optional)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="budgetLimit" 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-10 h-11"
                  {...register("budgetLimit")} 
                />
              </div>
              {errors.budgetLimit && <p className="text-sm text-destructive">{errors.budgetLimit.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">Cover Image URL (Optional)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="coverImageUrl" 
                  placeholder="https://..." 
                  className="pl-10 h-11"
                  {...register("coverImageUrl")} 
                />
              </div>
              {errors.coverImageUrl && <p className="text-sm text-destructive">{errors.coverImageUrl.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
            <div className="space-y-0.5">
              <Label className="text-base">Make Trip Public</Label>
              <p className="text-sm text-muted-foreground">
                Anyone with the link can view this trip.
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-brand-primary" {...register("isPublic")} />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 h-12 rounded-2xl"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 rounded-2xl bg-brand-primary hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Trip...
                </>
              ) : (
                "Create Trip"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

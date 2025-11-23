import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

type AvailabilityCalendarProps = {
  packageName: string;
};

type AvailabilityData = {
  [key: string]: {
    available_slots: number;
    max_slots: number;
  };
};

export function AvailabilityCalendar({ packageName }: AvailabilityCalendarProps) {
  const [availability, setAvailability] = useState<AvailabilityData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    fetchAvailability();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('availability-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'package_availability',
          filter: `package_name=eq.${packageName}`,
        },
        () => {
          fetchAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [packageName]);

  async function fetchAvailability() {
    try {
      const { data, error } = await supabase
        .from("package_availability")
        .select("*")
        .eq("package_name", packageName)
        .gte("date", format(new Date(), "yyyy-MM-dd"));

      if (error) throw error;

      const availabilityMap: AvailabilityData = {};
      data?.forEach((item) => {
        availabilityMap[item.date] = {
          available_slots: item.available_slots,
          max_slots: item.max_slots,
        };
      });

      setAvailability(availabilityMap);
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getDateAvailability = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availability[dateStr];
  };

  const isDateAvailable = (date: Date) => {
    const avail = getDateAvailability(date);
    return avail && avail.available_slots > 0;
  };

  const modifiers = {
    available: (date: Date) => {
      const avail = getDateAvailability(date);
      return !!avail && avail.available_slots > 0;
    },
    fullyBooked: (date: Date) => {
      const avail = getDateAvailability(date);
      return !!avail && avail.available_slots === 0;
    },
    limitedAvailability: (date: Date) => {
      const avail = getDateAvailability(date);
      return !!avail && avail.available_slots > 0 && avail.available_slots <= avail.max_slots / 2;
    },
  };

  const modifiersClassNames = {
    available: "bg-green-100 text-green-900 hover:bg-green-200",
    fullyBooked: "bg-red-100 text-red-900 line-through opacity-50",
    limitedAvailability: "bg-orange-100 text-orange-900 hover:bg-orange-200",
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  const selectedDateAvailability = selectedDate ? getDateAvailability(selectedDate) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Live Availability</span>
          <div className="flex gap-2 text-xs">
            <Badge variant="outline" className="bg-green-100 text-green-900 border-green-200">
              Available
            </Badge>
            <Badge variant="outline" className="bg-orange-100 text-orange-900 border-orange-200">
              Limited
            </Badge>
            <Badge variant="outline" className="bg-red-100 text-red-900 border-red-200">
              Full
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date() || !isDateAvailable(date)}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          className="rounded-md border pointer-events-auto"
        />
        
        {selectedDate && selectedDateAvailability && (
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="text-sm font-semibold mb-2">
              {format(selectedDate, "MMMM d, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">
                {selectedDateAvailability.available_slots}
              </span>{" "}
              out of {selectedDateAvailability.max_slots} slots available
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          * Availability updates in real-time. Book quickly to secure your preferred date!
        </p>
      </CardContent>
    </Card>
  );
}
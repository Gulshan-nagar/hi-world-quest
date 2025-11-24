import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type AvailabilityCalendarProps = {
  packageName: string;
};

export function AvailabilityCalendar({ packageName }: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Preferred Date</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date()}
          className="rounded-md border pointer-events-auto"
        />
        
        {selectedDate && (
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="text-sm font-semibold mb-2">
              Selected Date: {format(selectedDate, "MMMM d, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">
              This date is available for booking. Please proceed with the booking form.
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          * We will confirm availability when you submit your booking.
        </p>
      </CardContent>
    </Card>
  );
}

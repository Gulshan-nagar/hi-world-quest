import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
  date: z.date({
    required_error: "Please select a date",
  }),
  packageOption: z.string().optional(),
  groupSize: z.string().min(1, "Please select group size"),
  specialRequests: z.string().max(500).optional(),
});

type BookingFormProps = {
  packageName: string;
  packageTitle: string;
  basePrice: number;
  packageOptions?: string[];
  onSuccess?: () => void;
};

export function BookingForm({ packageName, packageTitle, basePrice, packageOptions, onSuccess }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    setIsSubmitting(true);
    
    try {
      const groupSize = parseInt(values.groupSize);
      const totalPrice = basePrice;

      // Insert booking
      const packageNameWithOption = values.packageOption 
        ? `${packageName} - ${values.packageOption}`
        : packageName;
      
      const { data, error } = await supabase
        .from("bookings")
        .insert({
          package_name: packageNameWithOption,
          customer_name: values.name,
          customer_email: values.email,
          customer_phone: values.phone,
          booking_date: format(values.date, "yyyy-MM-dd"),
          group_size: groupSize,
          total_price: totalPrice,
          special_requests: values.specialRequests || null,
        })
        .select()
        .single();

      if (error) throw error;

      // Send booking confirmation emails
      try {
        const packageDetails = values.packageOption 
          ? `${packageTitle} - ${values.packageOption}`
          : packageTitle;
          
        await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            customerName: values.name,
            customerEmail: values.email,
            customerPhone: values.phone,
            packageName: packageDetails,
            bookingDate: format(values.date, "MMMM d, yyyy"),
            groupSize: groupSize,
            totalPrice: totalPrice,
            specialRequests: values.specialRequests || '',
          },
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the booking if email fails
      }

      // Send WhatsApp message to business number with customer details
      const whatsappMessage = encodeURIComponent(
        `New Booking Request!\n\n` +
        `Package: ${values.packageOption ? `${packageTitle} - ${values.packageOption}` : packageTitle}\n` +
        `Customer Name: ${values.name}\n` +
        `Customer Phone: ${values.phone}\n` +
        `Customer Email: ${values.email}\n` +
        `Date: ${format(values.date, "MMMM d, yyyy")}\n` +
        `Group Size: ${groupSize} people\n` +
        `Total Price: ₹${totalPrice}\n` +
        (values.specialRequests ? `Special Requests: ${values.specialRequests}\n` : '') +
        `\nPlease contact the customer to confirm booking.`
      );
      
      // Open WhatsApp in new tab (non-blocking)
      window.open(`https://wa.me/918690305357?text=${whatsappMessage}`, '_blank');

      setBookingDetails({
        ...data,
        packageTitle,
      });
      setShowConfirmation(true);
      form.reset();
      toast.success("Booking confirmed!");
      onSuccess?.();
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 98765 43210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {packageOptions && packageOptions.length > 0 && (
            <FormField
              control={form.control}
              name="packageOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Option</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {packageOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Booking Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                      }
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {num} {num === 1 ? "Person" : "People"}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requirements or requests..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-royal hover:opacity-90"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </form>
      </Form>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Booking Confirmed! 🎉</DialogTitle>
            <DialogDescription>
              Your booking has been successfully confirmed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Package:</p>
              <p className="text-sm text-muted-foreground">{bookingDetails?.packageTitle}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Booking Date:</p>
              <p className="text-sm text-muted-foreground">
                {bookingDetails?.booking_date && format(new Date(bookingDetails.booking_date), "PPP")}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Group Size:</p>
              <p className="text-sm text-muted-foreground">{bookingDetails?.group_size} people</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Total Amount:</p>
              <p className="text-lg font-bold text-primary">₹{bookingDetails?.total_price}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Confirmation Details:</p>
              <p className="text-xs text-muted-foreground">
                A confirmation email has been sent to {bookingDetails?.customer_email}. 
                We'll contact you at {bookingDetails?.customer_phone} for further details.
              </p>
            </div>
          </div>
          <Button onClick={() => setShowConfirmation(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
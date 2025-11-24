import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Calendar, Star, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import camelSafari from "@/assets/camel-safari.jpg";
import jeepSafari from "@/assets/jeep-safari.jpg";
import luxuryTent from "@/assets/luxury-tent.jpg";
import heroDesert from "@/assets/hero-desert.jpg";
import { BookingForm } from "@/components/BookingForm";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const packageData: Record<string, any> = {
    "jeep-desert-safari": {
      title: "Jeep Desert Safari",
      subtitle: "Thrilling Dune Experience",
      images: [jeepSafari, heroDesert, camelSafari, luxuryTent],
      originalPrice: "₹6,000",
      price: "₹4,500",
      basePrice: 4500,
      packageSlug: "jeep-desert-safari",
      rating: 5,
      duration: "6-8 Hours",
      capacity: "Up to 6 people per jeep",
      timing: "4:00 PM - 7:00 PM",
      location: "Sam Sand Dunes, Jaisalmer",
      options: ["Sunrise Safari", "Sunset Safari"],
      description: "The price is for a complete jeep, not per person. Each booking includes a private 4x4 jeep that can accommodate up to 6 people, perfect for couples, families, or small groups looking for an exclusive experience.",
      expectations: [
        {
          title: "Thrilling Dune Bashing",
          description: "Experience heart-pounding action as our expert drivers navigate through massive sand dunes in powerful 4x4 vehicles."
        },
        {
          title: "Village Visits",
          description: "Discover authentic desert life by visiting traditional Rajasthani villages and interacting with local communities."
        },
        {
          title: "Professional Guide",
          description: "Learn fascinating insights about the Thar Desert ecosystem and local culture from our experienced guides."
        },
        {
          title: "Photo Opportunities",
          description: "Capture stunning desert landscapes with multiple photo stops at the most scenic locations."
        }
      ],
      inclusions: [
        "Private 4x4 jeep with experienced driver",
        "Dune bashing adventure",
        "Visit to local villages",
        "Professional guide",
        "Bottled water and snacks",
        "Photo stops at scenic points",
        "Hotel pick-up and drop-off"
      ],
      meetingPoint: "Thar Desert Safari Pick-up Point, Sam - Conveniently located with parking facilities and a warm welcome from our friendly team.",
      relatedPackages: ["camel-desert-safari", "night-desert-safari"]
    },
    "camel-desert-safari": {
      title: "Camel Desert Safari",
      subtitle: "Classic Desert Experience",
      images: [camelSafari, heroDesert, jeepSafari, luxuryTent],
      originalPrice: "₹4,000",
      price: "₹2,500",
      basePrice: 2500,
      packageSlug: "camel-desert-safari",
      rating: 5,
      duration: "3-4 Hours",
      capacity: "Up to 4 people",
      timing: "4:00 PM - 7:00 PM or 5:00 AM - 8:00 AM",
      location: "Sam Sand Dunes, Jaisalmer",
      options: ["Sunrise Safari", "Sunset Safari"],
      description: "The price is for a complete camel safari experience, not per person. Each booking includes traditional camel rides that can accommodate up to 4 people, perfect for couples and families looking for an authentic desert experience.",
      expectations: [
        {
          title: "Traditional Camel Ride",
          description: "Experience the timeless way of desert travel on our well-trained camels, guided by experienced handlers."
        },
        {
          title: "Stunning Desert Views",
          description: "Watch the golden dunes transform under the magical light of sunrise or sunset."
        },
        {
          title: "Tea & Snacks",
          description: "Enjoy authentic Rajasthani tea and traditional snacks at a scenic desert location."
        },
        {
          title: "Cultural Experience",
          description: "Learn about desert life and the historical importance of camels in Rajasthani culture."
        }
      ],
      inclusions: [
        "Traditional camel ride",
        "Experienced camel handler",
        "Sunrise or sunset viewing",
        "Rajasthani tea and snacks",
        "Photo opportunities",
        "Cultural insights from guide",
        "Hotel pick-up and drop-off"
      ],
      meetingPoint: "Thar Desert Safari Pick-up Point, Sam - Conveniently located with parking facilities and a warm welcome from our friendly team.",
      relatedPackages: ["jeep-desert-safari", "night-desert-safari"]
    },
    "night-desert-safari": {
      title: "Night Desert Safari",
      subtitle: "Premium Desert Experience",
      images: [luxuryTent, heroDesert, camelSafari, jeepSafari],
      originalPrice: "₹5,000",
      price: "₹3,500",
      basePrice: 3500,
      packageSlug: "night-desert-safari",
      rating: 5,
      duration: "5-6 Hours",
      capacity: "Up to 6 people",
      timing: "5:00 PM - 11:00 PM",
      location: "Sam Sand Dunes, Jaisalmer",
      options: ["With Dinner", "Without Dinner"],
      description: "The price is for a complete night safari experience. Each booking includes desert activities and stargazing that can accommodate up to 6 people, perfect for groups looking for a magical evening under the stars.",
      expectations: [
        {
          title: "Star Gazing",
          description: "Experience the pristine desert sky filled with countless stars, away from city lights."
        },
        {
          title: "Bonfire Experience",
          description: "Enjoy a traditional bonfire while sharing stories and experiencing desert hospitality."
        },
        {
          title: "Cultural Show",
          description: "Watch authentic Rajasthani folk dance and music performances by local artists."
        },
        {
          title: "Desert Camping",
          description: "Experience the tranquility of the desert night with comfortable seating arrangements."
        }
      ],
      inclusions: [
        "Sunset camel or jeep ride",
        "Bonfire experience",
        "Cultural folk performances",
        "Traditional Rajasthani dinner (if selected)",
        "Star gazing session",
        "Desert camping setup",
        "Hotel pick-up and drop-off"
      ],
      meetingPoint: "Thar Desert Safari Pick-up Point, Sam - Conveniently located with parking facilities and a warm welcome from our friendly team.",
      relatedPackages: ["jeep-desert-safari", "camel-desert-safari"]
    },
    "desert-safari-camp": {
      title: "Desert Safari Camp",
      subtitle: "Ultimate Desert Experience",
      images: [luxuryTent, heroDesert, camelSafari, jeepSafari],
      originalPrice: "₹12,999",
      price: "₹8,999",
      basePrice: 8999,
      packageSlug: "desert-safari-camp",
      rating: 5,
      duration: "24 Hours",
      capacity: "Up to 2 people per tent",
      timing: "3:00 PM - 11:00 AM (Next Day)",
      location: "Sam Sand Dunes, Jaisalmer",
      options: [],
      description: "The price is for a complete overnight camping experience per tent. Each booking includes a premium tent that can accommodate up to 2 people, perfect for couples looking for a luxurious desert stay.",
      expectations: [
        {
          title: "Premium Tent Stay",
          description: "Sleep in comfortable Swiss tents equipped with modern amenities and traditional décor."
        },
        {
          title: "Dinner & Breakfast",
          description: "Enjoy authentic Rajasthani cuisine with traditional dinner and breakfast included."
        },
        {
          title: "Cultural Evening",
          description: "Experience folk dance, music performances, and bonfire under the starlit sky."
        },
        {
          title: "Overnight Camping",
          description: "Wake up to stunning desert sunrise and the peaceful sounds of nature."
        }
      ],
      inclusions: [
        "Premium Swiss tent accommodation",
        "Welcome drink on arrival",
        "Camel or jeep safari",
        "Cultural folk performances",
        "Traditional dinner",
        "Bonfire under the stars",
        "Star gazing experience",
        "Morning breakfast",
        "Modern attached washroom"
      ],
      meetingPoint: "Thar Desert Safari Pick-up Point, Sam - Conveniently located with parking facilities and a warm welcome from our friendly team.",
      relatedPackages: ["jeep-desert-safari", "night-desert-safari"]
    },
    "complete-packages": {
      title: "Complete Packages",
      subtitle: "All-in-One Experience",
      images: [jeepSafari, camelSafari, luxuryTent, heroDesert],
      originalPrice: "₹4,000",
      price: "₹2,500",
      basePrice: 2500,
      packageSlug: "complete-packages",
      rating: 5,
      duration: "Flexible",
      capacity: "Varies by package",
      timing: "Customizable",
      location: "Sam Sand Dunes, Jaisalmer",
      options: ["Jeep Safari", "Camel Safari", "Night Safari", "Camp Stay"],
      description: "Choose from our flexible package options. Mix and match different safari types to create your perfect desert experience. Prices vary based on selected activities.",
      expectations: [
        {
          title: "All Safari Types",
          description: "Access to jeep safaris, camel rides, night experiences, and camp stays."
        },
        {
          title: "Flexible Options",
          description: "Customize your experience by combining different activities."
        },
        {
          title: "Custom Combinations",
          description: "Build your ideal desert adventure with our mix-and-match packages."
        },
        {
          title: "Best Value Deals",
          description: "Save more when you book multiple activities together."
        }
      ],
      inclusions: [
        "Choice of safari activities",
        "Experienced guides",
        "All equipment and facilities",
        "Flexible timing options",
        "Hotel pick-up and drop-off",
        "Custom itinerary planning",
        "Group discounts available"
      ],
      meetingPoint: "Thar Desert Safari Pick-up Point, Sam - Conveniently located with parking facilities and a warm welcome from our friendly team.",
      relatedPackages: ["jeep-desert-safari", "camel-desert-safari"]
    }
  };

  const pkg = packageData[id || ""] || packageData["jeep-desert-safari"];

  const handleBooking = () => {
    window.open(
      `https://wa.me/918690305357?text=Hi Gulshan, I'm interested in booking ${pkg.title}`,
      "_blank"
    );
  };

  const relatedPackagesData = pkg.relatedPackages.map((relId: string) => packageData[relId]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={pkg.images[selectedImage]}
                alt={pkg.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {pkg.images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${pkg.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Package Details */}
          <div>
            <Badge className="mb-2 bg-gradient-royal">{pkg.subtitle}</Badge>
            <h1 className="text-4xl font-serif font-bold mb-2 text-foreground">
              {pkg.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              {[...Array(pkg.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-primary">{pkg.price}</span>
              <span className="text-lg text-muted-foreground line-through">{pkg.originalPrice}</span>
              <Badge variant="secondary">Sale</Badge>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Duration: {pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <span>Capacity: {pkg.capacity}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Timings: {pkg.timing}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Location: {pkg.location}</span>
              </div>
            </div>


            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">Quantity</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-gradient-royal hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Book {pkg.title}</DialogTitle>
                    <DialogDescription>
                      Fill in your details to complete the booking
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="booking" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="booking">Booking Form</TabsTrigger>
                      <TabsTrigger value="availability">Check Availability</TabsTrigger>
                    </TabsList>
                    <TabsContent value="booking" className="mt-6">
                      <BookingForm
                        packageName={pkg.packageSlug}
                        packageTitle={pkg.title}
                        basePrice={pkg.basePrice}
                        packageOptions={pkg.options}
                      />
                    </TabsContent>
                    <TabsContent value="availability" className="mt-6">
                      <AvailabilityCalendar packageName={pkg.packageSlug} />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={handleBooking}
              >
                Contact via WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <Card className="mb-12 border-l-4 border-l-primary">
          <CardContent className="p-6">
            <h2 className="text-2xl font-serif font-bold mb-4 text-foreground flex items-center gap-2">
              <span className="text-primary">💰</span>
              Is the price for 1 person or a complete booking?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {pkg.description}
            </p>
          </CardContent>
        </Card>

        {/* What to Expect */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">
            What to Expect in This {pkg.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pkg.expectations.map((item: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Inclusions */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">
            What's Included
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-3">
                {pkg.inclusions.map((item: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meeting Point */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            Meeting Point
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">{pkg.meetingPoint}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Now CTA */}
        <Card className="mb-12 bg-gradient-sunset text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Book Now - Limited Spots Available!
            </h2>
            <p className="text-white/90 mb-6">Reserve Your {pkg.title} Today</p>
            <Button
              size="lg"
              className="bg-white text-foreground hover:bg-white/90"
              onClick={handleBooking}
            >
              Book Now via WhatsApp
            </Button>
          </CardContent>
        </Card>

        {/* You May Also Like */}
        <div>
          <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">
            You may also like
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPackagesData.map((relPkg: any, index: number) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-luxury transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/packages/${pkg.relatedPackages[index]}`)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={relPkg.images[0]}
                    alt={relPkg.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-gradient-royal text-xs">{relPkg.subtitle}</Badge>
                  <h3 className="text-xl font-serif font-bold mb-2 text-foreground">
                    {relPkg.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-semibold text-primary">{relPkg.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {relPkg.originalPrice}
                    </span>
                    <Badge variant="secondary" className="text-xs">Sale</Badge>
                  </div>
                  <Button className="w-full bg-gradient-royal hover:opacity-90" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;

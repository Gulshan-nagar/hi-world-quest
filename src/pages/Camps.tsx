import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Utensils } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BookingForm } from "@/components/BookingForm";
import camelSafari5 from "@/assets/camel-safari-5.jpeg";
import camelSafari8 from "@/assets/camel-safari-8.jpeg";
import culturalProgram from "@/assets/cultural-program-1.png";
import luxuryTent from "@/assets/luxury-tent-interior-1.png";
import culturalDining from "@/assets/cultural-dining.png";

const Camps = () => {
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    price: string;
    extraPerson: string;
  } | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const packageOptions = [
    {
      name: "Cultural Program Package",
      category: "Essential",
      price: "₹4,899",
      extraPerson: "₹2,399",
      image: culturalProgram,
      description:
        "Perfect for couples seeking authentic Rajasthani culture with traditional welcome, camel ride, and cultural show.",
      highlights: [
        "Luxury stay in Swiss tent",
        "Welcome drink & traditional tilak",
        "Buffet dinner with Rajasthani cuisine",
        "Breakfast included",
        "Camel safari experience",
        "Folk dance & music show",
      ],
    },
    {
      name: "MAP + Cultural Program + Jeep & Camel Safari",
      category: "Popular",
      price: "₹6,899",
      extraPerson: "₹3,399",
      image: camelSafari5,
      description:
        "Complete desert adventure with jeep safari, camel ride, cultural night, and MAP plan for a memorable experience.",
      highlights: [
        "MAP plan (breakfast + dinner)",
        "Jeep safari adventure",
        "Camel ride at sunset",
        "Rajasthani cultural night",
        "Traditional buffet meals",
        "Bonfire & stargazing",
      ],
    },
    {
      name: "MAP + Cultural Program + Jeep + Night + Camel Safari",
      category: "Premium",
      price: "₹7,899",
      extraPerson: "₹3,899",
      image: camelSafari8,
      description:
        "Ultimate safari package with sunset jeep safari, exclusive night leopard safari, music show, and all meals included.",
      highlights: [
        "MAP plan (breakfast + dinner)",
        "Sunset jeep safari",
        "Night leopard safari experience",
        "Camel safari at dusk",
        "Cultural music & dance show",
        "Premium buffet dining",
      ],
    },
    {
      name: "Premium All-Safari Package (Full Experience)",
      category: "Luxury",
      price: "₹9,899",
      extraPerson: "₹4,899",
      image: luxuryTent,
      description:
        "The complete luxury desert experience with all safaris, full cultural night, and premium accommodations for unforgettable memories.",
      highlights: [
        "All safari experiences included",
        "Full cultural night program",
        "Premium Swiss luxury stay",
        "MAP plan with gourmet meals",
        "Private bonfire setup",
        "Personalized service & attention",
      ],
    },
  ];

  const handleBooking = (pkg: typeof packageOptions[0]) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      {/* Header */}
      <div className="px-4 mb-16">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
            Desert Safari Packages
          </h1>
          <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
        </div>
      </div>

      {/* Tent Types */}
      <section className="px-4 mb-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-foreground">
            Choose Your Perfect Package
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {packageOptions.map((pkg, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-luxury transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden relative">
                  <Badge className="absolute top-4 right-4 bg-gradient-royal z-10">
                    {pkg.category}
                  </Badge>
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-serif font-bold mb-2 text-foreground line-clamp-2 min-h-[3.5rem]">
                    {pkg.name}
                  </h3>
                  <div className="mb-3">
                    <p className="text-2xl font-semibold text-primary">{pkg.price}</p>
                    <p className="text-sm text-muted-foreground">per couple</p>
                    <p className="text-sm text-accent font-medium mt-1">
                      Extra person: {pkg.extraPerson}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {pkg.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Includes:</h4>
                    <ul className="space-y-1.5">
                      {pkg.highlights.slice(0, 4).map((highlight, i) => (
                        <li key={i} className="flex items-start text-xs text-muted-foreground">
                          <Star className="h-3 w-3 mr-2 text-primary flex-shrink-0 mt-0.5 fill-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="w-full bg-gradient-royal hover:opacity-90 transition-opacity"
                    onClick={() => handleBooking(pkg)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Dining Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">
                Culinary Excellence
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Indulge in authentic Rajasthani cuisine prepared by expert chefs using traditional
                recipes passed down through generations. Our menu features:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Traditional Dal Baati Churma",
                  "Gatte ki Sabzi and local delicacies",
                  "Fresh tandoor-cooked breads",
                  "Vegetarian and non-vegetarian options",
                  "Continental breakfast spread",
                  "Special dietary requirements accommodated",
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <Utensils className="h-4 w-4 mr-3 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fade-in">
              <img
                src={culturalDining}
                alt="Camp dining"
                className="rounded-lg shadow-luxury w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-sunset text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Experience Desert Luxury?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book your stay at our premium desert camps and create unforgettable memories
          </p>
          <Button
            size="lg"
            className="bg-white text-foreground hover:bg-white/90 transition-opacity text-lg px-8"
            onClick={() => setIsBookingOpen(true)}
          >
            Book Your Stay
          </Button>
        </div>
      </section>

      {/* Booking Form Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <BookingForm
            packageName={selectedPackage?.name || "Desert Safari Package"}
            packageTitle={selectedPackage?.name || "Desert Safari Package"}
            basePrice={parseInt(selectedPackage?.price.replace(/[^0-9]/g, "") || "0")}
            onSuccess={() => setIsBookingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Camps;

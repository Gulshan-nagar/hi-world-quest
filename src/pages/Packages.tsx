import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin, Check } from "lucide-react";
import camelSafari from "@/assets/camel-safari.jpg";
import jeepSafari from "@/assets/jeep-safari.jpg";
import luxuryTent from "@/assets/luxury-tent.jpg";

const Packages = () => {
  const packages = [
    {
      id: 1,
      title: "Sunset Camel Safari",
      subtitle: "Classic Desert Experience",
      image: camelSafari,
      duration: "3-4 Hours",
      groupSize: "2-10 People",
      timing: "4:00 PM - 8:00 PM",
      price: "₹2,500 per person",
      description:
        "Experience the timeless beauty of the Thar Desert with a traditional camel ride through golden dunes. Watch the sun paint the sky in magnificent colors as you traverse ancient caravan routes.",
      inclusions: [
        "Pick-up and drop from hotel",
        "Experienced camel handler",
        "Sunset viewing at prime location",
        "Traditional Rajasthani tea",
        "Photo stops at scenic points",
        "Cultural insights from local guide",
      ],
    },
    {
      id: 2,
      title: "Jeep Desert Adventure",
      subtitle: "Thrilling Dune Experience",
      image: jeepSafari,
      duration: "6-8 Hours",
      groupSize: "4-6 People",
      timing: "Morning or Evening",
      price: "₹4,500 per person",
      description:
        "Get your adrenaline pumping with an exciting jeep safari through the towering dunes. Visit remote villages, explore ancient temples, and experience the raw beauty of the desert landscape.",
      inclusions: [
        "4x4 Jeep with experienced driver",
        "Dune bashing adventure",
        "Visit to local villages",
        "Traditional Rajasthani lunch",
        "Sunrise or sunset viewing",
        "Photography guidance",
        "Bottled water and snacks",
      ],
    },
    {
      id: 3,
      title: "Luxury Overnight Camp",
      subtitle: "Premium Desert Stay",
      image: luxuryTent,
      duration: "24 Hours",
      groupSize: "2-4 People",
      timing: "3:00 PM - 11:00 AM",
      price: "₹8,999 per person",
      description:
        "Immerse yourself in luxury with our premium overnight desert camp experience. Enjoy world-class amenities, cultural performances, and the magic of sleeping under a blanket of stars.",
      inclusions: [
        "Private luxury Swiss tent",
        "Welcome drink on arrival",
        "Camel or jeep safari",
        "Cultural folk dance & music",
        "Traditional Rajasthani dinner",
        "Bonfire under the stars",
        "Star-gazing experience",
        "Morning breakfast",
        "Attached modern washroom",
      ],
    },
    {
      id: 4,
      title: "Royal Desert Expedition",
      subtitle: "Multi-Day Adventure",
      image: camelSafari,
      duration: "2 Days / 1 Night",
      groupSize: "2-8 People",
      timing: "Flexible Start Time",
      price: "₹12,999 per person",
      description:
        "The ultimate desert adventure combining the best of camel and jeep safaris with luxury camping. Explore deeper into the Thar, visit ancient sites, and create unforgettable memories.",
      inclusions: [
        "All meals (lunch, dinner, breakfast)",
        "Luxury camp accommodation",
        "Jeep and camel safari combination",
        "Visit to Jaisalmer Fort",
        "Haveli and temple tours",
        "Cultural evening program",
        "Professional photography session",
        "Personal guide throughout",
        "All transportation",
      ],
    },
  ];

  const handleBooking = () => {
    window.open(
      "https://wa.me/919876543210?text=Hello, I'm interested in booking a safari package",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
            Safari Packages
          </h1>
          <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Choose from our carefully crafted safari experiences, each designed to showcase the
            magic of the Thar Desert in its own unique way
          </p>
        </div>

        {/* Packages Grid */}
        <div className="space-y-12">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`overflow-hidden hover:shadow-luxury transition-all duration-300 ${
                index % 2 === 0 ? "animate-fade-in" : "animate-fade-in"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className={`h-full min-h-[300px] ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`p-8 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  <div className="mb-4">
                    <Badge className="mb-2 bg-gradient-royal">{pkg.subtitle}</Badge>
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                      {pkg.title}
                    </h2>
                    <p className="text-2xl font-semibold text-primary">{pkg.price}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center text-center">
                      <Clock className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Users className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{pkg.groupSize}</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <MapPin className="h-5 w-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{pkg.timing}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">What's Included:</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {pkg.inclusions.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-royal hover:opacity-90 transition-opacity"
                    size="lg"
                    onClick={handleBooking}
                  >
                    Book This Package
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-secondary/50 rounded-lg p-8">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            Need a Custom Package?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We can create a personalized safari experience tailored to your preferences, group size,
            and schedule. Contact us to discuss your dream desert adventure.
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={handleBooking}
            className="hover:bg-primary hover:text-white transition-all"
          >
            Request Custom Package
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;

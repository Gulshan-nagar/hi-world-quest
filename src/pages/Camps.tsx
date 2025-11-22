import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Wifi, Coffee, Star, Music, Utensils } from "lucide-react";
import luxuryTent from "@/assets/luxury-tent.jpg";

const Camps = () => {
  const tentTypes = [
    {
      name: "Swiss Luxury Tent",
      category: "Premium",
      price: "₹8,999 per night",
      image: luxuryTent,
      description:
        "Our flagship accommodation offering the perfect blend of traditional charm and modern luxury. Spacious interiors with elegant Rajasthani decor.",
      amenities: [
        "King-size bed with premium linens",
        "Attached modern washroom",
        "Hot & cold water",
        "Private veranda",
        "Air cooler",
        "Charging points",
      ],
    },
    {
      name: "Super Deluxe Tent",
      category: "Deluxe",
      price: "₹6,999 per night",
      image: luxuryTent,
      description:
        "Comfortable and well-appointed tents that provide an authentic desert camping experience without compromising on essential comforts.",
      amenities: [
        "Double bed with quality bedding",
        "Attached washroom",
        "Running water facility",
        "Seating area",
        "Adequate lighting",
        "Storage space",
      ],
    },
    {
      name: "Private Desert Villa",
      category: "Ultra Premium",
      price: "₹15,999 per night",
      image: luxuryTent,
      description:
        "For those seeking the ultimate in desert luxury. A standalone villa-style tent with exclusive amenities and personalized service.",
      amenities: [
        "Separate living and sleeping areas",
        "Premium bathroom with bathtub",
        "Private outdoor lounge",
        "Personal butler service",
        "Mini bar",
        "Premium toiletries",
      ],
    },
  ];

  const campActivities = [
    {
      icon: Music,
      title: "Folk Dance & Music",
      description: "Traditional Rajasthani performances every evening",
    },
    {
      icon: Star,
      title: "Star Gazing",
      description: "Astronomy sessions under the pristine desert sky",
    },
    {
      icon: Utensils,
      title: "Gourmet Dining",
      description: "Authentic Rajasthani cuisine with modern twists",
    },
    {
      icon: Coffee,
      title: "Bonfire Evenings",
      description: "Warm gatherings under the stars with chai and stories",
    },
  ];

  const handleBooking = () => {
    window.open(
      "https://wa.me/919876543210?text=Hello, I'd like to book a luxury camp stay",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      {/* Header */}
      <div className="px-4 mb-16">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
            Luxury Desert Camps
          </h1>
          <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Experience unparalleled comfort in the heart of the Thar Desert. Our camps combine
            traditional Rajasthani hospitality with modern luxury amenities.
          </p>
        </div>
      </div>

      {/* Tent Types */}
      <section className="px-4 mb-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-foreground">
            Choose Your Accommodation
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tentTypes.map((tent, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-luxury transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden relative">
                  <Badge className="absolute top-4 right-4 bg-gradient-royal z-10">
                    {tent.category}
                  </Badge>
                  <img
                    src={tent.image}
                    alt={tent.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-2 text-foreground">
                    {tent.name}
                  </h3>
                  <p className="text-2xl font-semibold text-primary mb-4">{tent.price}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {tent.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Amenities:</h4>
                    <ul className="space-y-2">
                      {tent.amenities.map((amenity, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <Bed className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="w-full bg-gradient-royal hover:opacity-90 transition-opacity"
                    onClick={handleBooking}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Camp Activities */}
      <section className="px-4 py-20 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-foreground">
            Camp Activities & Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {campActivities.map((activity, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-luxury transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-royal rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <activity.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{activity.title}</h3>
                  <p className="text-muted-foreground">{activity.description}</p>
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
                src={luxuryTent}
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
            onClick={handleBooking}
          >
            Book Your Stay
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Camps;

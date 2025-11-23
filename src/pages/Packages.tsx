import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin, Award } from "lucide-react";
import camelSafari from "@/assets/camel-safari.jpg";
import jeepSafari from "@/assets/jeep-safari.jpg";
import luxuryTent from "@/assets/luxury-tent.jpg";
import { NavLink } from "@/components/NavLink";

const Packages = () => {
  const packages = [
    {
      id: 1,
      title: "Sunset Camel Safari",
      image: camelSafari,
      duration: "3-4 Hours",
      groupSize: "2-10 People",
      timing: "4:00 PM - 8:00 PM",
      price: "From ₹2,500",
      highlights: ["Traditional camel ride", "Sunset viewing", "Rajasthani tea", "Photo stops", "Cultural insights", "Hotel pickup & drop"],
    },
    {
      id: 2,
      title: "Jeep Desert Adventure",
      image: jeepSafari,
      duration: "6-8 Hours",
      groupSize: "4-6 People",
      timing: "Morning or Evening",
      price: "From ₹4,500",
      highlights: ["4x4 Jeep safari", "Dune bashing", "Village visits", "Traditional lunch", "Sunrise/sunset", "Photography guidance"],
    },
    {
      id: 3,
      title: "Luxury Overnight Camp",
      image: luxuryTent,
      duration: "24 Hours",
      groupSize: "2-4 People",
      timing: "3:00 PM - 11:00 AM",
      price: "From ₹8,999",
      highlights: ["Luxury Swiss tent", "Camel/jeep safari", "Folk dance & music", "Traditional dinner", "Bonfire", "Star-gazing", "Breakfast included"],
    },
    {
      id: 4,
      title: "Royal Desert Expedition",
      image: camelSafari,
      duration: "2 Days / 1 Night",
      groupSize: "2-8 People",
      timing: "Flexible Start Time",
      price: "From ₹12,999",
      highlights: ["All meals included", "Luxury camping", "Jeep & camel safari", "Fort & haveli tours", "Cultural program", "Professional photography"],
    },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="overflow-hidden hover:shadow-luxury transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-serif font-bold mb-2 text-foreground">
                  {pkg.title}
                </h3>
                <div className="mb-3">
                  <span className="text-primary font-semibold text-lg">{pkg.price}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex flex-col items-center text-center">
                    <Clock className="h-4 w-4 text-primary mb-1" />
                    <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-4 w-4 text-primary mb-1" />
                    <p className="text-xs text-muted-foreground">{pkg.groupSize}</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <MapPin className="h-4 w-4 text-primary mb-1" />
                    <p className="text-xs text-muted-foreground line-clamp-2">{pkg.timing}</p>
                  </div>
                </div>
                <ul className="space-y-1 mb-4">
                  {pkg.highlights.slice(0, 4).map((highlight, i) => (
                    <li key={i} className="flex items-center text-xs text-muted-foreground">
                      <Award className="h-3 w-3 mr-1 text-primary flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <NavLink to={`/packages/${pkg.title.toLowerCase().replace(/ /g, '-')}`}>
                  <Button className="w-full bg-gradient-royal hover:opacity-90 transition-opacity" size="sm">
                    View Details
                  </Button>
                </NavLink>
              </CardContent>
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
          <NavLink to="/contact">
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-primary hover:text-white transition-all"
            >
              Request Custom Package
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Packages;

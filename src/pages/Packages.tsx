import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import camelSafari from "@/assets/camel-safari.jpg";
import jeepSafari from "@/assets/jeep-safari.jpg";
import luxuryTent from "@/assets/luxury-tent.jpg";
import { NavLink } from "@/components/NavLink";

const Packages = () => {
  const packages = [
    {
      id: 1,
      title: "Jeep Desert Safari",
      image: jeepSafari,
      options: ["Sunrise Safari", "Sunset Safari"],
      price: "From ₹4,500",
      highlights: ["Thrilling dune bashing", "Village visits", "Professional guide", "Photo stops"],
    },
    {
      id: 2,
      title: "Camel Desert Safari",
      image: camelSafari,
      options: ["Sunrise Safari", "Sunset Safari"],
      price: "From ₹2,500",
      highlights: ["Traditional camel ride", "Desert views", "Tea & snacks", "Cultural experience"],
    },
    {
      id: 3,
      title: "Night Desert Safari",
      image: luxuryTent,
      options: ["With Dinner", "Without Dinner"],
      price: "From ₹3,500",
      highlights: ["Star gazing", "Bonfire experience", "Cultural show", "Desert camping"],
    },
    {
      id: 4,
      title: "Desert Safari Camp",
      image: luxuryTent,
      price: "From ₹8,999",
      highlights: ["Premium tent stay", "Dinner & Breakfast", "Cultural evening", "Overnight camping"],
    },
    {
      id: 5,
      title: "Complete Packages",
      image: jeepSafari,
      options: ["Jeep Safari", "Camel Safari", "Night Safari", "Camp Stay"],
      price: "From ₹2,500",
      highlights: ["All safari types", "Flexible options", "Custom combinations", "Best value deals"],
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
                {pkg.options && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Options:</p>
                    <div className="flex flex-wrap gap-1">
                      {pkg.options.map((option, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <ul className="space-y-1 mb-4">
                  {pkg.highlights.map((highlight, i) => (
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

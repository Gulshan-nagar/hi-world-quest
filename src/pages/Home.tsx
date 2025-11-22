import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Tent, Compass, Moon, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-desert.jpg";
import camelSafari from "@/assets/camel-safari.jpg";
import jeepSafari from "@/assets/jeep-safari.jpg";
import luxuryTent from "@/assets/luxury-tent.jpg";
import featureLuxuryTent from "@/assets/feature-luxury-tent.jpg";
import featureCamelSafari from "@/assets/feature-camel-safari.jpg";
import featureStargazing from "@/assets/feature-stargazing.jpg";
import featureCultural from "@/assets/feature-cultural.jpg";
import clientSarah from "@/assets/client-sarah.jpg";
import clientRahul from "@/assets/client-rahul.jpg";
import clientEmma from "@/assets/client-emma.jpg";
import { NavLink } from "@/components/NavLink";

const Home = () => {
  const features = [
    {
      icon: Tent,
      title: "Premium Swiss Tents",
      description: "Luxurious accommodations with modern amenities in the heart of the desert",
      image: featureLuxuryTent,
    },
    {
      icon: Compass,
      title: "Private Safari Experience",
      description: "Personalized tours with expert local guides who know every dune",
      image: featureCamelSafari,
    },
    {
      icon: Moon,
      title: "Star-Gazing Nights",
      description: "Unforgettable evenings under pristine desert skies filled with stars",
      image: featureStargazing,
    },
    {
      icon: Users,
      title: "Cultural Evenings",
      description: "Authentic folk performances and traditional Rajasthani hospitality",
      image: featureCultural,
    },
  ];

  const packages = [
    {
      title: "Sunset Camel Safari",
      image: camelSafari,
      duration: "3-4 Hours",
      price: "From ₹2,500",
      highlights: ["Sunset views", "Traditional camel ride", "Desert tea", "Photo stops"],
    },
    {
      title: "Jeep Desert Adventure",
      image: jeepSafari,
      duration: "Full Day",
      price: "From ₹4,500",
      highlights: ["Thrilling dune bashing", "Village visits", "Lunch included", "Sunrise/Sunset"],
    },
    {
      title: "Luxury Camp Stay",
      image: luxuryTent,
      duration: "Overnight",
      price: "From ₹8,999",
      highlights: ["Premium tent", "Cultural show", "Dinner & Breakfast", "Bonfire night"],
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "United Kingdom",
      rating: 5,
      text: "An absolutely magical experience! The sunset camel ride was breathtaking, and the camp was luxurious beyond expectations.",
      image: clientSarah,
    },
    {
      name: "Rahul Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "Perfect blend of adventure and comfort. The staff was incredibly hospitable, and the cultural evening was authentic and beautiful.",
      image: clientRahul,
    },
    {
      name: "Emma Williams",
      location: "Australia",
      rating: 5,
      text: "Best desert safari experience ever! The jeep tour was thrilling, and sleeping under the stars in such luxury was unforgettable.",
      image: clientEmma,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Safari Packages Section */}
      <section className="py-8 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
              Our Safari Packages
            </h2>
            <div className="w-24 h-1 bg-gradient-royal mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
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
                  <div className="flex justify-between items-center mb-3 text-muted-foreground text-sm">
                    <span>{pkg.duration}</span>
                    <span className="text-primary font-semibold">{pkg.price}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {pkg.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center text-xs text-muted-foreground">
                        <Award className="h-3 w-3 mr-1 text-primary flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-royal hover:opacity-90 transition-opacity" size="sm">
                    <NavLink to="/packages">View Details</NavLink>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="hover:bg-primary hover:text-white transition-all">
              <NavLink to="/packages">View All Packages</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the perfect blend of adventure, luxury, and authentic Rajasthani culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-luxury transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-royal rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              What Our Guests Say
            </h2>
            <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-sunset text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready for Your Desert Adventure?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book your unforgettable Jaisalmer safari experience today and create memories that last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 transition-opacity text-lg px-8"
              onClick={() => window.open("https://wa.me/919876543210?text=Hello, I'm interested in booking a desert safari", "_blank")}
            >
              Book via WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-foreground transition-all text-lg px-8"
            >
              <NavLink to="/contact">Contact Us</NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

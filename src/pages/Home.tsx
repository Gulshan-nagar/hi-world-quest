import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Tent, Compass, Moon, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-desert.jpg";
import camelSafariImg from "@/assets/camel-safari-8.jpeg";
import jeepSafari from "@/assets/jeep-safari.jpg";
import luxuryTent from "@/assets/luxury-tent.jpg";
import iataLogo from "@/assets/iata-logo.png";
import tripadvisorLogo from "@/assets/tripadvisor-logo.png";
import trustpilotLogo from "@/assets/trustpilot-logo.png";
// Client testimonial images - Add your own images to assets folder
import clientSarah from "@/assets/client-sarah-real.jpg";  // Replace with your image
import clientRahul from "@/assets/client-rahul-real.jpg";  // Replace with your image
import clientEmma from "@/assets/client-emma-real.jpg";    // Replace with your image

// Feature images - Real images from assets
import featureSwissTent from "@/assets/luxury-tent-interior-1.png";
import featureStargazing from "@/assets/stargazing-camp.png";
import featureCultural from "@/assets/cultural-program-1.png";
// Video import
import desertVideo from "@/assets/jaisalmer desert camp - 9636693406 (2).mp4";
import sunsetSeating from "@/assets/sunset-seating.png";
import specialSetup from "@/assets/special-setup-night.png";
import culturalProgram2 from "@/assets/cultural-program-2.png";
// Additional camel safari images
import camelSafari1 from "@/assets/camel-safari-1.jpeg";
import camelSafari2 from "@/assets/camel-safari-2.jpeg";
import camelSafari5 from "@/assets/camel-safari-5.jpeg";
import camelSafari7 from "@/assets/camel-safari-7.jpeg";
import camelSafari8 from "@/assets/camel-safari-8.jpeg";
import { NavLink } from "@/components/NavLink";

const Home = () => {
  const features = [
    {
      icon: Tent,
      title: "Premium Swiss Tents",
      description: "Luxurious accommodations with modern amenities in the heart of the desert",
      image: featureSwissTent,
    },
    {
      icon: Compass,
      title: "Private Safari Experience",
      description: "Personalized tours with expert local guides who know every dune",
      image: camelSafari7,
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
      title: "Jeep Desert Safari",
      image: jeepSafari,
      options: ["Sunrise Safari", "Sunset Safari"],
      price: "From ₹4,500",
      highlights: ["Thrilling dune bashing", "Village visits", "Professional guide", "Photo stops"],
    },
    {
      title: "Camel Desert Safari",
      image: camelSafariImg,
      options: ["Sunrise Safari", "Sunset Safari"],
      price: "From ₹2,500",
      highlights: ["Traditional camel ride", "Desert views", "Tea & snacks", "Cultural experience"],
    },
    {
      title: "Night Desert Safari",
      image: luxuryTent,
      options: ["With Dinner", "Without Dinner"],
      price: "From ₹3,500",
      highlights: ["Star gazing", "Bonfire experience", "Cultural show", "Desert camping"],
    },
    {
      title: "Desert Safari Packages",
      image: luxuryTent,
      price: "From ₹4,899",
      highlights: ["Premium tent stay", "Multiple safari options", "Cultural evening", "Customizable packages"],
      isLuxuryCamps: true,
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
      {/* Hero Section - will be added */}
      
      {/* Safari Packages Section */}
      <section className="py-16 px-4 bg-background my-12">
        <div className="container mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
              Desert Safari Packages
            </h2>
            <div className="w-24 h-1 bg-gradient-royal mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.slice(0, 3).map((pkg, index) => (
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
                  <NavLink to={pkg.isLuxuryCamps ? "/camps" : `/packages/${pkg.title.toLowerCase().replace(/ /g, '-')}`}>
                    <Button className="w-full bg-gradient-royal hover:opacity-90 transition-opacity" size="sm">
                      View Details
                    </Button>
                  </NavLink>
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

      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-background">
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
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-3">
                      <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                      <AvatarFallback className="bg-primary text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
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

      {/* Experience Video Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              Experience the Desert Magic
            </h2>
            <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch our guests experience the beauty and adventure of Jaisalmer
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-luxury">
            <video 
              controls 
              className="w-full"
              poster={heroImage}
            >
              <source src={desertVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Jaisalmer Gallery Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              Jaisalmer Gallery
            </h2>
            <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the beauty of the Thar Desert through our collection
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[camelSafariImg, camelSafari8, camelSafari7, camelSafari5, sunsetSeating, featureStargazing, featureCultural, specialSetup, culturalProgram2, camelSafari2, camelSafari1, luxuryTent].map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg hover:shadow-luxury transition-all duration-300">
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Associates Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
              Our Associates
            </h2>
            <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted partners in creating exceptional desert experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center max-w-4xl mx-auto">
            <Card className="hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-8 flex items-center justify-center">
                <img src={iataLogo} alt="IATA" className="h-16 object-contain" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-8 flex items-center justify-center">
                <img src={trustpilotLogo} alt="Trustpilot" className="h-12 object-contain" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-8 flex items-center justify-center">
                <img src={tripadvisorLogo} alt="TripAdvisor" className="h-16 object-contain" />
              </CardContent>
            </Card>
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

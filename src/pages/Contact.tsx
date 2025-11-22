import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    packageType: "",
    guests: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp message
    const message = `Hello! I'd like to make a booking inquiry:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Date: ${formData.date}
Package: ${formData.packageType}
Number of Guests: ${formData.guests}
Message: ${formData.message}`;

    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    toast({
      title: "Redirecting to WhatsApp",
      description: "We'll respond to your inquiry shortly!",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: ["Sam Sand Dunes Road", "Jaisalmer, Rajasthan 345001"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@jaisalmersafariluxury.com", "bookings@jaisalmersafariluxury.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sun: 9:00 AM - 9:00 PM", "24/7 Emergency Support"],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-foreground">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-royal mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get in touch with us to plan your perfect desert adventure. We're here to help make
            your Jaisalmer experience unforgettable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover:shadow-luxury transition-all duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="package">Package Type</Label>
                    <Select
                      value={formData.packageType}
                      onValueChange={(value) => setFormData({ ...formData, packageType: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="camel">Sunset Camel Safari</SelectItem>
                        <SelectItem value="jeep">Jeep Desert Adventure</SelectItem>
                        <SelectItem value="overnight">Luxury Overnight Camp</SelectItem>
                        <SelectItem value="expedition">Royal Desert Expedition</SelectItem>
                        <SelectItem value="custom">Custom Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      placeholder="2"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your preferences, special requirements, or any questions..."
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-royal hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Send Message via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-royal rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Map Placeholder */}
            <Card className="overflow-hidden hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-secondary/30 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
                    <p>Interactive Map</p>
                    <p className="text-sm">Sam Sand Dunes, Jaisalmer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="mt-16 text-center bg-secondary/30 rounded-lg p-8">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
            Prefer Direct Contact?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Reach out to us instantly through your preferred channel
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => window.open("tel:+919876543210")}
              className="bg-gradient-royal hover:opacity-90 transition-opacity"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                window.open(
                  "https://wa.me/919876543210?text=Hello, I have a question about your safari packages",
                  "_blank"
                )
              }
              className="hover:bg-primary hover:text-white transition-all"
            >
              WhatsApp Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("mailto:info@jaisalmersafariluxury.com")}
              className="hover:bg-primary hover:text-white transition-all"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

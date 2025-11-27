import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/packages", label: "Safari Packages" },
    { to: "/camps", label: "Luxury Camps" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-bold text-primary">
              Thar Desert Safari
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-foreground hover:text-primary transition-colors font-medium"
                activeClassName="text-primary"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("tel:+919876543210")}
              className="gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button
              size="sm"
              onClick={() => window.open("https://wa.me/7296967119?text=Hello, I'm interested in booking a desert safari", "_blank")}
              className="bg-gradient-royal hover:opacity-90 transition-opacity"
            >
              Book via WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu with Smooth Animations */}
        <div
          className={`md:hidden fixed inset-0 top-20 bg-background z-40 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-6 px-4 py-8 animate-fade-in">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-primary transition-all duration-200 text-lg transform hover:translate-x-2"
                activeClassName="text-primary font-semibold"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="space-y-3 pt-4">
              <Button 
                className="w-full bg-gradient-royal hover:opacity-90 transition-all duration-200 hover:scale-105" 
                size="lg"
                onClick={() => window.open("tel:+919876543210")}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
              <Button
                variant="outline"
                className="w-full transition-all duration-200 hover:scale-105"
                size="lg"
                onClick={() => {
                  window.open(
                    "https://wa.me/919876543210?text=Hello, I'm interested in booking a desert safari",
                    "_blank"
                  );
                  setIsOpen(false);
                }}
              >
                Book via WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 top-20 bg-black/20 z-30 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

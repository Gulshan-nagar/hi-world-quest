import { NavLink } from "@/components/NavLink";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-desert-night text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Jaisalmer Safari Luxury
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the royal Thar Desert with premium safaris, luxury camps, and authentic Rajasthani hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/packages" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Safari Packages
                </NavLink>
              </li>
              <li>
                <NavLink to="/camps" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Luxury Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span>Sam Sand Dunes Road, Jaisalmer, Rajasthan 345001</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:info@jaisalmersafariluxury.com" className="hover:text-primary transition-colors">
                  info@jaisalmersafariluxury.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary p-3 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/10 hover:bg-primary p-3 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Jaisalmer Safari Luxury. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

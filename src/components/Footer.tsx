/**
 * Footer.tsx — Comprehensive multi-column footer
 *
 * DESIGN NOTES:
 * - Viator-style mega footer with multiple columns
 * - Updated contact details
 * - Tour links, destination links, company info
 * - Social media and trust badges
 */

import { Compass, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,18%,10%)] text-white/70 pt-16 pb-8 px-6">
      <div className="container mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <Compass className="h-5 w-5 text-primary" />
              <span className="text-lg font-heading font-bold text-white">
                TravelDeal<span className="text-primary">SL</span>
              </span>
            </a>
            <p className="text-sm font-body leading-relaxed mb-6 max-w-xs">
              Handcrafted Sri Lanka travel experiences with private chauffeurs,
              expert guides, and 24/7 support. Explore ancient ruins, misty
              mountains, and pristine beaches — your way.
            </p>
            {/* Social links placeholder */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/94766424532"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[hsl(142,70%,40%)] transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:traveldealsrilanka@gmail.com"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="tel:+94766424532"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Phone"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tours column */}
          <div>
            <h4 className="text-xs font-body font-semibold text-white uppercase tracking-wider mb-5">
              Our Tours
            </h4>
            <ul className="space-y-3">
              {tours.map((tour) => (
                <li key={tour.id}>
                  <a
                    href="#tours"
                    className="text-sm font-body hover:text-white transition-colors duration-200"
                  >
                    {tour.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm font-body hover:text-white transition-colors duration-200"
                >
                  Custom Tour →
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations column */}
          <div>
            <h4 className="text-xs font-body font-semibold text-white uppercase tracking-wider mb-5">
              Destinations
            </h4>
            <ul className="space-y-3">
              {destinations.slice(0, 6).map((dest) => (
                <li key={dest.id}>
                  <a
                    href="#destinations"
                    className="text-sm font-body hover:text-white transition-colors duration-200"
                  >
                    {dest.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-xs font-body font-semibold text-white uppercase tracking-wider mb-5">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm font-body">
              <a
                href="tel:+94766424532"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                +94 766 424 532
              </a>
              <a
                href="mailto:traveldealsrilanka@gmail.com"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                traveldealsrilanka@gmail.com
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                Colombo, Sri Lanka
              </span>
            </div>

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-body">
                <span className="text-primary">★</span>
                <span>4.9/5 — 120+ Verified Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-body">
                <span className="text-emerald-400">✓</span>
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-body">
                <span className="text-emerald-400">✓</span>
                <span>Free Cancellation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-white/40">
            © {new Date().getFullYear()} Travel Deal Sri Lanka. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-body text-white/40">
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

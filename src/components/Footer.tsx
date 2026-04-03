/**
 * Footer.tsx — Clean, minimal Nordic-style footer
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Very light background (secondary), not dark
 * - Minimal content: logo, links, contact info, copyright
 * - Sans-serif throughout, no heavy styling
 * - Subtle top border for section separation
 */

import { Compass, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    /* Nordic footer: light background, thin top border, generous padding */
    <footer className="bg-secondary py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        {/* ── Top: Logo + nav + contact ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <Compass className="h-5 w-5 text-primary" />
              <span className="text-lg font-heading font-bold text-foreground">
                TravelDeal<span className="text-primary">SL</span>
              </span>
            </a>
            <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-xs">
              Handcrafted Sri Lanka travel experiences with premium vehicles, expert guides, and 24/7 support.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {["Destinations", "Services", "Itinerary", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-xs font-body font-semibold text-foreground uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 text-sm font-body text-muted-foreground">
              <a href="tel:+94776293107" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5" /> +94 77 62 93 107
              </a>
              <a href="mailto:info@TravelDealL.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5" /> TravelDealSriLanka@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Katunayaka, Sri Lanka
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom: copyright ── */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs font-body text-muted-foreground">
            © 2026 TravelDealL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

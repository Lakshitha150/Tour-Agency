/**
 * Navbar.tsx — Premium transparent-to-solid navigation
 *
 * DESIGN NOTES (Blacklane + Viator hybrid):
 * - Starts transparent over the dark hero
 * - Transitions to solid white with shadow on scroll
 * - Logo, nav links, and gold "Book Now" CTA
 * - Mobile: hamburger → full-screen overlay
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", href: "#destinations" },
    { label: "Tours", href: "#tours" },
    { label: "Attractions", href: "#attractions" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/98 backdrop-blur-md shadow-nordic"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <Compass
              className={`h-6 w-6 transition-colors duration-500 ${
                scrolled ? "text-primary" : "text-white"
              }`}
            />
            <span
              className={`text-xl font-heading font-bold tracking-wide transition-colors duration-500 ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              TravelDeal<span className="text-primary">SL</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-[13px] font-body font-medium uppercase tracking-widest transition-colors duration-300 ${
                    scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+94766040066"
              className={`flex items-center gap-2 text-sm font-body font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">+94 766 040 066</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Close button row */}
              <div className="flex items-center justify-between px-6 py-4">
                <a href="#" className="flex items-center gap-2.5">
                  <Compass className="h-6 w-6 text-primary" />
                  <span className="text-xl font-heading font-bold tracking-wide text-foreground">
                    TravelDeal<span className="text-primary">SL</span>
                  </span>
                </a>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col items-center justify-center flex-1 gap-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-heading font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                >
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-body font-semibold text-base"
                  >
                    Book Now
                  </a>
                </motion.li>
              </ul>

              {/* Bottom contact */}
              <div className="px-6 py-6 text-center border-t border-border">
                <a
                  href="tel:+94766040066"
                  className="text-sm font-body text-muted-foreground"
                >
                  📞 +94 766 040 066
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

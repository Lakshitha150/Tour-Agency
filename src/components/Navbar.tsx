/**
 * Navbar.tsx — Nordic-style clean navigation
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - White background with subtle bottom border (no glassmorphism)
 * - Logo uses serif font for brand, sans-serif for tagline
 * - Minimal nav links in sans-serif, widely spaced
 * - Single gold "Book Now" CTA — the ONLY colored element in the nav
 * - On scroll: adds a very subtle shadow for depth separation
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Menu, X } from "lucide-react";

const Navbar = () => {
  /* Track scroll position to add subtle shadow */
  const [scrolled, setScrolled] = useState(false);
  /* Mobile menu toggle */
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Navigation links — Nordic sites keep these minimal and functional */
  const navLinks = [
    { label: "Destinations", href: "#tours" },
    { label: "Services", href: "#services" },
    { label: "Itinerary", href: "#itinerary" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      /* Subtle fade-in on mount */
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "shadow-nordic" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* ── Logo: Compass icon + brand name ──
            Nordic pattern: serif brand name, minimal icon, no heavy styling */}
        <a href="#" className="flex items-center gap-2.5">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-heading font-bold tracking-wide text-foreground">
            TravelDeal<span className="text-primary">SL</span>
          </span>
        </a>

        {/* ── Desktop nav links ──
            Nordic approach: lightweight, widely-spaced, uppercase tracking */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[13px] font-body font-medium text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── CTA: "Book Now" — the ONLY gold element in the nav (Nordic accent rule) ── */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
        >
          Book Now
        </a>

        {/* ── Mobile hamburger toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile dropdown ──
          Clean white dropdown with subtle top border */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-t border-border px-6 pb-6"
        >
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-body font-semibold text-sm"
              >
                Book Now
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

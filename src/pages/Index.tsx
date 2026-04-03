/**
 * Index.tsx — Main landing page with Nordic Visitor-inspired layout
 *
 * LAYOUT ORDER:
 * 1. Navbar (fixed, clean white with subtle scroll shadow)
 * 2. Hero (full viewport, Ken Burns parallax)
 * 3. Tours (destination grid with Travel Style Switcher)
 * 4. Services (4-card "Why Travel With Us" on light gray)
 * 5. Itinerary (interactive vertical timeline with sticky value bar)
 * 6. Contact (inquiry form + WhatsApp CTA)
 * 7. Footer (light, minimal)
 *
 * FLOATING ELEMENTS:
 * - VerifiedReviewsBadge (bottom-left, expands on hover)
 * - StickyValueBar mobile bar (fixed bottom on small screens)
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ToursSection from "@/components/ToursSection";
import ServicesSection from "@/components/ServicesSection";
import ItinerarySection from "@/components/ItinerarySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyValueBar from "@/components/StickyValueBar";
import VerifiedReviewsBadge from "@/components/VerifiedReviewsBadge";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed clean navigation */}
      <Navbar />

      {/* Full-screen hero with Ken Burns + parallax */}
      <HeroSection />

      {/* Tour packages with travel style filter */}
      <ToursSection />

      {/* Services / value propositions */}
      <ServicesSection />

      {/* ── Itinerary section with sticky sidebar ──
          On desktop: 2-column layout with itinerary left, sticky bar right
          On mobile: single column with fixed bottom price bar */}
      <section className="py-24 px-6 bg-background" id="itinerary-wrapper">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Itinerary timeline takes full width on mobile */}
            <ItinerarySection />
            {/* Sticky value bar — only visible on desktop as sidebar */}
            <StickyValueBar />
          </div>
        </div>
      </section>

      {/* Contact / inquiry form */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* ── Floating trust elements ── */}
      <VerifiedReviewsBadge />
    </div>
  );
};

export default Index;

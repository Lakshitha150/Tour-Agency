/**
 * Index.tsx — Main landing page with Viator/Blacklane-inspired layout
 *
 * LAYOUT ORDER:
 * 1. Navbar (fixed, transparent → solid on scroll)
 * 2. Hero (Blacklane-style dark cinematic with search widget)
 * 3. Top Destinations (Viator horizontal scrolling shelf)
 * 4. Featured Tours (tour cards with real data, ratings, pricing)
 * 5. Top Attractions (grid of Sri Lanka landmarks)
 * 6. Why Travel With Us (Blacklane "Expect Excellence" dark section)
 * 7. Testimonials (scrollable review cards)
 * 8. WhatsApp CTA Banner (dark gradient contact section)
 * 9. Contact (inquiry form + WhatsApp)
 * 10. Footer (comprehensive dark multi-column)
 *
 * FLOATING ELEMENTS:
 * - VerifiedReviewsBadge (bottom-left, expands on hover)
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TopDestinations from "@/components/TopDestinations";
import ToursSection from "@/components/ToursSection";
import TopAttractions from "@/components/TopAttractions";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VerifiedReviewsBadge from "@/components/VerifiedReviewsBadge";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed navigation — transparent over hero, solid on scroll */}
      <Navbar />

      {/* Full-screen dark cinematic hero with search widget */}
      <HeroSection />

      {/* Top Destinations horizontal carousel */}
      <TopDestinations />

      {/* Featured tour packages with real data */}
      <ToursSection />

      {/* Top Attractions grid */}
      <TopAttractions />

      {/* "Expect Excellence" — premium value propositions */}
      <ServicesSection />

      {/* Traveler testimonials carousel */}
      <TestimonialsSection />

      {/* WhatsApp CTA banner */}
      <WhatsAppBanner />

      {/* Contact inquiry form */}
      <ContactSection />

      {/* Comprehensive footer */}
      <Footer />

      {/* Floating trust badge */}
      <VerifiedReviewsBadge />
    </div>
  );
};

export default Index;

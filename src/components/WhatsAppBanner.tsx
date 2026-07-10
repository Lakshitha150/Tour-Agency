/**
 * WhatsAppBanner.tsx — Full-width CTA banner for WhatsApp contact
 *
 * DESIGN NOTES:
 * - Eye-catching gradient background section
 * - Clear headline + subtitle + large WhatsApp button
 * - Builds urgency and provides easy contact path
 */

import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";

const WhatsAppBanner = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,20%,10%)] via-[hsl(220,18%,14%)] to-[hsl(220,20%,10%)]" />

      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Emoji accent */}
          <span className="inline-block text-4xl mb-4">🌴</span>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Plan Your Dream Trip{" "}
            <span className="italic font-normal text-gold-gradient">
              in Minutes
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base font-body font-light text-white/60 mb-10 leading-relaxed max-w-lg mx-auto">
            Chat directly with our Sri Lanka travel experts. We'll craft a
            personalized itinerary just for you — no booking fees, no hidden
            costs.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* WhatsApp primary CTA */}
            <a
              href="https://wa.me/94766040066?text=Hi!%20I'm%20interested%20in%20booking%20a%20tour%20in%20Sri%20Lanka."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[hsl(142,70%,40%)] text-white font-body font-semibold text-base hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* Phone secondary CTA */}
            <a
              href="tel:+94766040066"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/20 text-white/80 font-body font-medium text-sm hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              +94 766 040 066
            </a>
          </div>

          {/* Trust note */}
          <p className="text-xs font-body text-white/40 mt-6">
            Average response time: 5 minutes • Available 24/7
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsAppBanner;

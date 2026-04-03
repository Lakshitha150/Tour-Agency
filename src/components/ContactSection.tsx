/**
 * ContactSection.tsx — Clean, Nordic-style inquiry form + WhatsApp CTA
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Minimalist single-column inquiry form on white background
 * - Form fields use thin borders, generous padding, no heavy styling
 * - WhatsApp CTA as secondary option below the form
 * - Section split: left side has heading + trust points, right has form
 * - Trust points use green checkmarks (Nordic verified pattern)
 */

import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  /* Simple form state */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dates: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* In production, this would send to an API or email service */
    console.log("Inquiry submitted:", formData);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ── Left column: Heading + trust points ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Plan Your Journey
            </h2>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
              Fill out the form and our travel specialists will craft a personalized 
              itinerary within 24 hours. Or chat with us directly on WhatsApp.
            </p>

            {/* Trust points — Nordic "Book with Confidence" pattern */}
            <div className="space-y-4 mb-8">
              {[
                "No booking fees or hidden costs",
                "Free cancellation up to 48 hours",
                "Handpicked hotels & verified drivers",
                "24/7 WhatsApp support during your trip",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald flex-shrink-0" />
                  <span className="text-sm font-body text-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp alternative CTA */}
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-whatsapp text-white font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* ── Right column: Inquiry form ──
              Nordic form style: clean, single-column, thin borders, lots of padding */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  required
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  required
                />
              </div>

              {/* Travel dates */}
              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Preferred Travel Dates
                </label>
                <input
                  type="text"
                  value={formData.dates}
                  onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                  placeholder="e.g., March 15 – March 22, 2026"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Tell Us About Your Trip
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Number of travellers, interests, special requests…"
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit button — gold accent (the single CTA color) */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
              >
                <Send className="h-4 w-4" />
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

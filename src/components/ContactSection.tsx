/**
 * ContactSection.tsx — Inquiry form with updated contact details
 *
 * DESIGN NOTES:
 * - Split layout: left (heading + trust points + WhatsApp), right (form)
 * - Updated phone, email, and WhatsApp to new business details
 * - Added "Preferred Tour" dropdown and "Number of Travelers" field
 */

import { motion } from "framer-motion";
import { MessageCircle, CheckCircle2, Send, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { tours } from "@/data/tours";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tour: "",
    travelers: "",
    dates: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* In production, this would send to an API or email service */
    const whatsappMsg = encodeURIComponent(
      `Hi! I'd like to book a tour.\n\nName: ${formData.name}\nTour: ${formData.tour || "Not decided"}\nTravelers: ${formData.travelers || "Not specified"}\nDates: ${formData.dates || "Flexible"}\nMessage: ${formData.message || "N/A"}`
    );
    window.open(`https://wa.me/94766040066?text=${whatsappMsg}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column: Heading + trust points */}
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

            {/* Trust points */}
            <div className="space-y-4 mb-8">
              {[
                "No booking fees or hidden costs",
                "Free cancellation up to 48 hours",
                "Handpicked hotels & verified drivers",
                "24/7 WhatsApp support during your trip",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-body text-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="space-y-3 mb-8">
              <a
                href="tel:+94766040066"
                className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +94 766 040 066
              </a>
              <a
                href="mailto:traveldealsrilanka@gmail.com"
                className="flex items-center gap-3 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                traveldealsrilanka@gmail.com
              </a>
              <span className="flex items-center gap-3 text-sm font-body text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Colombo, Sri Lanka
              </span>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/94766040066?text=Hi!%20I'm%20interested%20in%20booking%20a%20tour%20in%20Sri%20Lanka."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[hsl(142,70%,40%)] text-white font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right column: Inquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  required
                />
              </div>

              {/* Tour + Travelers row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preferred Tour */}
                <div>
                  <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Preferred Tour
                  </label>
                  <select
                    value={formData.tour}
                    onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  >
                    <option value="">Select a tour</option>
                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.name}>
                        {tour.name}
                      </option>
                    ))}
                    <option value="Custom">Custom / Not sure</option>
                  </select>
                </div>

                {/* Number of Travelers */}
                <div>
                  <label className="block text-xs font-body font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Travelers
                  </label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  >
                    <option value="">How many?</option>
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3-4">3–4 people</option>
                    <option value="5-8">5–8 people</option>
                    <option value="9+">9+ people</option>
                  </select>
                </div>
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
                  placeholder="e.g., August 15 – August 22, 2026"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
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
                  placeholder="Interests, special requests, dietary needs…"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
              >
                <Send className="h-4 w-4" />
                Send Inquiry via WhatsApp
              </button>

              <p className="text-[11px] font-body text-muted-foreground text-center">
                Submitting will open WhatsApp with your inquiry pre-filled
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

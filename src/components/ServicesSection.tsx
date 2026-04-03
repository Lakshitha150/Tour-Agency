/**
 * ServicesSection.tsx — "Why Travel With Us" value propositions
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Clean 4-column grid on a very subtle gray background (#F8F8F8)
 * - Each card is white with a thin border, NOT glassmorphism
 * - Icons use the gold accent color — consistent single-accent rule
 * - Checkmark/verified pattern: green emerald checkmarks for trust
 * - Generous padding, minimal text, scannable at a glance
 */

import { motion } from "framer-motion";
import { Plane, Map, Shield, Clock, CheckCircle2 } from "lucide-react";

/* Service data — each includes a trust "verified" point */
const services = [
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "24/7 Katunayaka pickups & drop-offs with meet-and-greet service.",
    verified: "On-time guarantee",
  },
  {
    icon: Map,
    title: "Custom Itineraries",
    description: "Personalized island routes tailored to your interests and pace.",
    verified: "Local expert crafted",
  },
  {
    icon: Shield,
    title: "Premium Fleet",
    description: "Air-conditioned vehicles maintained to international standards.",
    verified: "Fully insured",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Reach our team anytime via WhatsApp for instant assistance.",
    verified: "Average reply: 5 min",
  },
];

/* Stagger animation for grid entrance */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ServicesSection = () => {
  return (
    /* Slightly off-white background to separate sections — Nordic whitespace layering */
    <section id="services" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Why Travel With Us
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Everything you need for a seamless, stress-free journey across Sri Lanka.
          </p>
        </motion.div>

        {/* ── 4-column responsive grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              /* Nordic card: white, thin border, subtle shadow, gentle lift */
              className="bg-card rounded-lg border border-border p-6 hover:-translate-y-1 hover:shadow-nordic-hover transition-all duration-500 group"
            >
              {/* Icon — gold accent in a light gold circle */}
              <div className="w-12 h-12 mb-5 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                <service.icon className="h-5 w-5 text-primary" />
              </div>

              <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>

              {/* ── Verified trust signal — green checkmark (Nordic trust pattern) ── */}
              <div className="flex items-center gap-1.5 text-emerald">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="text-xs font-body font-medium">{service.verified}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

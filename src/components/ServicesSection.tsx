/**
 * ServicesSection.tsx — Blacklane "Expect Excellence" premium feature section
 *
 * DESIGN NOTES:
 * - Dark background section for visual contrast
 * - 4 premium feature cards with icons
 * - Emotional headline + supporting subtitle (Blacklane pattern)
 * - Trust signals with verified checkmarks
 */

import { motion } from "framer-motion";
import { Car, Users, CalendarCheck, Headphones, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Private & Safe",
    description: "Licensed air-conditioned vehicles with professional, vetted drivers for every journey.",
    verified: "Fully insured",
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "Born-and-raised Sri Lankan guides who know every hidden gem and local secret.",
    verified: "English-speaking",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Booking",
    description: "No upfront payments. Free cancellation up to 48 hours before your tour.",
    verified: "No booking fees",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Reach our team instantly via WhatsApp — before, during, and after your trip.",
    verified: "5-min avg reply",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,18%,10%)] to-[hsl(220,20%,8%)]" />

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="container mx-auto relative z-10">
        {/* Section heading — Blacklane emotional headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Expect Excellence.
          </h2>
          <p className="font-body text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
            Every detail is taken care of so you can focus on what matters — making unforgettable memories.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/8 hover:border-white/15 transition-all duration-500 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 mb-5 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>

              <h3 className="text-lg font-heading font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm font-body text-white/50 leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Verified trust signal */}
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="text-xs font-body font-medium">{feature.verified}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

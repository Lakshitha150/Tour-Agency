/**
 * TopAttractions.tsx — Viator-style "Top Attractions" grid
 *
 * DESIGN NOTES:
 * - Grid of attraction cards with images
 * - Each card: attraction image, name, location, type badge
 * - Hover: subtle lift + overlay reveal
 */

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { attractions } from "@/data/attractions";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const TopAttractions = () => {
  return (
    <section id="attractions" className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Top Attractions
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Must-visit landmarks and experiences that make Sri Lanka one of the
            world's most extraordinary destinations.
          </p>
        </motion.div>

        {/* Attractions grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {attractions.map((att) => (
            <motion.div
              key={att.id}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-tour-card hover:shadow-tour-card-hover transition-shadow duration-500"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={att.image}
                  alt={att.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Type badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-body font-semibold text-foreground uppercase tracking-wider">
                  {att.type}
                </span>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-white mb-1 leading-tight">
                    {att.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/70">
                    <MapPin className="h-3 w-3" />
                    <span className="text-[11px] font-body">
                      {att.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover overlay with description */}
              <div className="absolute inset-0 bg-primary/90 flex items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <p className="text-sm font-body text-white text-center leading-relaxed">
                  {att.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopAttractions;

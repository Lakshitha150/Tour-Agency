/**
 * TopDestinations.tsx — Viator-style horizontal scrolling destination shelf
 *
 * DESIGN NOTES:
 * - Horizontal scrollable carousel with snap points
 * - Each card: destination image, name, region, tour count badge
 * - Arrow navigation buttons on desktop
 * - Scroll-snap on mobile for smooth swiping
 */

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { destinations } from "@/data/destinations";

const TopDestinations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Check if we are near the end
      if (scrollLeft + clientWidth >= scrollWidth - 15) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 3500); // Auto-scroll every 3.5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">
              Top Destinations
            </h2>
            <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-lg">
              Explore the pearl of the Indian Ocean — from ancient ruins to
              pristine beaches.
            </p>
          </div>

          {/* Desktop arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal scrollable carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-5 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-6 px-6"
        >
          {destinations.map((dest, i) => (
            <motion.a
              key={dest.id}
              href="#tours"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="scroll-snap-start flex-shrink-0 w-[260px] sm:w-[280px] group cursor-pointer"
            >
              {/* Image container */}
              <div className="relative h-[320px] rounded-2xl overflow-hidden mb-3 shadow-tour-card group-hover:shadow-tour-card-hover transition-shadow duration-500">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Tour count badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-body font-semibold text-foreground">
                  {dest.tourCount}+ Tours
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-heading font-bold text-white mb-1">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs font-body">{dest.region}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5">
                {dest.highlights.slice(0, 3).map((h) => (
                  <span
                    key={h}
                    className="text-[11px] font-body font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDestinations;

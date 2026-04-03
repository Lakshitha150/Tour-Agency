/**
 * ToursSection.tsx — "Trending Destinations" grid with Travel Style Switcher
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Clean white background, generous whitespace
 * - Cards have subtle shadow, no heavy borders
 * - Image takes up top half of card, minimal text below
 * - "Travel Style" toggle filters cards with layout animation shuffle
 * - Each card has a category badge and price in gold (the single accent)
 * - Hover: gentle lift + slightly deeper shadow (not gold glow)
 */

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import tourSigiriya from "@/assets/tour-sigiriya.jpg";
import tourElla from "@/assets/tour-ella.jpg";
import tourMirissa from "@/assets/tour-mirissa.jpg";
import TravelStyleSwitcher from "./TravelStyleSwitcher";

/* Tour package data — tagged with available travel styles for filtering */
const tours = [
  {
    id: "sigiriya",
    name: "Sigiriya Rock Fortress",
    tag: "Cultural",
    price: "From $00",
    image: tourSigiriya,
    alt: "Tourists climbing Sigiriya Rock Fortress at sunset",
    styles: ["self-drive", "chauffeur"] as const,
    description: "Explore the ancient rock fortress, a UNESCO World Heritage site rising 200m above the jungle.",
  },
  {
    id: "ella",
    name: "Ella Train Journey",
    tag: "Scenic",
    price: "From $00",
    image: tourElla,
    alt: "Blue train crossing Nine Arches Bridge in Ella Sri Lanka",
    styles: ["chauffeur"] as const,
    description: "Ride through misty tea plantations on one of the world's most scenic railway journeys.",
  },
  {
    id: "mirissa",
    name: "Mirissa Whale Watching",
    tag: "Adventure",
    price: "From $00",
    image: tourMirissa,
    alt: "Whale tail emerging from ocean near Mirissa Sri Lanka",
    styles: ["self-drive", "chauffeur"] as const,
    description: "Witness majestic blue whales and dolphins off Sri Lanka's stunning southern coast.",
  },
];

const ToursSection = () => {
  /* State for travel style filter */
  const [activeStyle, setActiveStyle] = useState<"self-drive" | "chauffeur">("chauffeur");

  /* Filter tours based on selected travel style */
  const filteredTours = tours.filter((t) => (t.styles as readonly string[]).includes(activeStyle));

  return (
    <section id="tours" className="py-24 px-6 bg-background">
      <div className="container mx-auto">
        {/* Section heading — Nordic pattern: centered, serif H2, muted subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Hand-picked experiences across the pearl of the Indian Ocean, crafted for every type of traveller.
          </p>
        </motion.div>

        {/* ── Travel Style Switcher — toggles between Self-Drive and Chauffeur ── */}
        <TravelStyleSwitcher activeStyle={activeStyle} onStyleChange={setActiveStyle} />

        {/* ── Responsive tour grid with layout animations ──
            AnimatePresence + LayoutGroup enables the "shuffle" effect on filter */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTours.map((tour) => (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" as const }}
                  /* Nordic card: white bg, subtle shadow, gentle hover lift */
                  className="group bg-card rounded-lg overflow-hidden shadow-nordic hover:shadow-nordic-hover hover:-translate-y-1 transition-all duration-500"
                >
                  {/* ── Image with subtle zoom on hover ── */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Category badge — small, gold-tinted, top-left (Nordic single-accent rule) */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-body font-semibold uppercase tracking-wider">
                      {tour.tag}
                    </span>
                  </div>

                  {/* ── Card body ── */}
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      {tour.name}
                    </h3>
                    <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed">
                      {tour.description}
                    </p>
                    {/* Price + CTA row */}
                    <div className="flex items-center justify-between">
                      {/* Gold price — accent color used sparingly */}
                      <span className="text-primary font-body font-bold text-base">
                        {tour.price}
                      </span>
                      {/* Ghost button — Nordic style: no fill, just text + underline */}
                      <a
                        href="#itinerary"
                        className="text-sm font-body font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-primary transition-colors duration-300"
                      >
                        View Details →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};

export default ToursSection;

/**
 * ItinerarySection.tsx — Interactive Vertical Day-by-Day Itinerary
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Vertical timeline with a thin gold line connecting the days
 * - Each day is a collapsible card that expands with Framer Motion layout
 * - Expanded state shows an image and detailed description
 * - Clean white cards with subtle borders
 * - Day numbers use gold accent, all text in sans-serif
 * - Smooth expand/collapse with AnimatePresence
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import tourSigiriya from "@/assets/tour-sigiriya.jpg";
import tourElla from "@/assets/tour-ella.jpg";
import tourMirissa from "@/assets/tour-mirissa.jpg";

/* Itinerary data — Sigiriya to Ella to Mirissa multi-day tour */
const itinerary = [
  {
    day: 1,
    title: "Arrive in Colombo & Transfer to Sigiriya",
    location: "Colombo → Sigiriya",
    image: tourSigiriya,
    description:
      "Your private chauffeur meets you at Bandaranaike Airport. Enjoy a scenic 4-hour drive through lush countryside to Sigiriya. Check into your handpicked boutique hotel and unwind by the pool.",
    highlights: ["Airport meet & greet", "Private vehicle transfer", "Boutique hotel check-in"],
  },
  {
    day: 2,
    title: "Sigiriya Rock Fortress & Dambulla Cave Temple",
    location: "Sigiriya",
    image: tourSigiriya,
    description:
      "Rise early to climb the iconic Sigiriya Rock Fortress at sunrise. After, visit the ancient Dambulla Cave Temple with its stunning Buddhist murals. Return to your hotel for afternoon tea.",
    highlights: ["Sunrise climb", "UNESCO World Heritage sites", "Expert local guide"],
  },
  {
    day: 3,
    title: "Scenic Train Journey to Ella",
    location: "Sigiriya → Ella",
    image: tourElla,
    description:
      "Board the famous blue train for one of the world's most scenic railway journeys. Wind through emerald tea plantations, misty mountains, and the iconic Nine Arches Bridge.",
    highlights: ["First-class train seats", "Tea plantation views", "Nine Arches Bridge"],
  },
  {
    day: 4,
    title: "Ella Exploration & Transfer to Mirissa",
    location: "Ella → Mirissa",
    image: tourMirissa,
    description:
      "Hike to Little Adam's Peak for panoramic views, then drive south to the coastal town of Mirissa. Arrive in time for a spectacular Indian Ocean sunset from your beachfront villa.",
    highlights: ["Little Adam's Peak hike", "Coastal drive", "Beachfront accommodation"],
  },
  {
    day: 5,
    title: "Mirissa Whale Watching & Departure",
    location: "Mirissa → Colombo",
    image: tourMirissa,
    description:
      "Set out on a morning whale watching expedition to spot blue whales and dolphins. After lunch by the beach, your chauffeur drives you to the airport for your departure.",
    highlights: ["Blue whale spotting", "Beach lunch", "Airport transfer included"],
  },
];

const ItinerarySection = () => {
  /* Track which day is expanded — null means all collapsed */
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  /* Toggle: clicking same day closes it, clicking another opens it */
  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div id="itinerary" className="max-w-3xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Sample Itinerary
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            A 5-day journey from ancient fortresses to coastal paradise. Click each day to explore.
          </p>
        </motion.div>

        {/* ── Vertical timeline ──
            The gold line runs down the left side connecting day markers */}
        <div className="relative">
          {/* Vertical gold line — positioned behind the day cards */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-4">
            {itinerary.map((item) => {
              const isExpanded = expandedDay === item.day;

              return (
                <motion.div
                  key={item.day}
                  layout
                  transition={{ duration: 0.5, ease: "easeInOut" as const }}
                  className="relative pl-16"
                >
                  {/* ── Day number circle on the timeline ── */}
                  <div
                    className={`absolute left-3 top-5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-bold transition-colors duration-300 ${
                      isExpanded
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground border border-border"
                    }`}
                  >
                    {item.day}
                  </div>

                  {/* ── Collapsible day card ── */}
                  <motion.div
                    layout
                    className={`bg-card rounded-lg border transition-colors duration-300 overflow-hidden ${
                      isExpanded ? "border-primary/30" : "border-border"
                    }`}
                  >
                    {/* Card header — always visible, clickable */}
                    <button
                      onClick={() => toggleDay(item.day)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div>
                        <p className="text-[11px] font-body text-primary font-semibold uppercase tracking-wider mb-1">
                          Day {item.day}
                        </p>
                        <h3 className="text-base font-body font-semibold text-foreground">
                          {item.title}
                        </h3>
                        {/* Location tag */}
                        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs font-body">{item.location}</span>
                        </div>
                      </div>

                      {/* Chevron rotates on expand */}
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded content — image + description + highlights */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" as const }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">
                            {/* Day image */}
                            <div className="rounded-lg overflow-hidden mb-4">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                              />
                            </div>

                            {/* Description */}
                            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                              {item.description}
                            </p>

                            {/* Highlights with gold checkmarks */}
                            <div className="flex flex-wrap gap-3">
                              {item.highlights.map((h) => (
                                <span
                                  key={h}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-body font-medium text-foreground"
                                >
                                  <span className="w-1 h-1 rounded-full bg-primary" />
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    
  );
};

export default ItinerarySection;

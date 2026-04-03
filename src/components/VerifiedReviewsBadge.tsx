/**
 * VerifiedReviewsBadge.tsx — Floating "Verified Reviews" trust badge
 *
 * DESIGN NOTES (nordicvisitor.com trust pattern):
 * - Fixed bottom-left floating badge
 * - Default state: compact pill with star + "Verified Reviews"
 * - Hover state: expands to show 5-star rating + review snippet
 * - Uses Framer Motion for smooth expand animation
 * - Green "verified" dot pulses subtly to draw attention
 * - Minimally intrusive — enhances trust without blocking content
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const VerifiedReviewsBadge = () => {
  /* Track hover state for expansion */
  const [isHovered, setIsHovered] = useState(false);

  return (
    /* Fixed positioning — bottom-left, above the mobile sticky bar on lg+ screens */
    <div
      className="fixed bottom-6 left-6 z-50 hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        className="bg-card rounded-lg border border-border shadow-nordic-hover overflow-hidden cursor-pointer"
        transition={{ duration: 0.3, ease: "easeInOut" as const }}
      >
        {/* ── Compact state: pill badge ── */}
        <div className="flex items-center gap-2.5 px-4 py-3">
          {/* Pulsing green verified dot */}
          <span className="w-2 h-2 rounded-full bg-emerald pulse-dot" />

          {/* Star icon in gold */}
          <Star className="h-3.5 w-3.5 text-primary fill-primary" />

          <span className="text-xs font-body font-semibold text-foreground whitespace-nowrap">
            4.9 — Verified Reviews
          </span>
        </div>

        {/* ── Expanded state: review snippet ── */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 pt-1 border-t border-border">
                {/* 5-star rating row */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 text-primary fill-primary"
                    />
                  ))}
                  <span className="text-[11px] font-body text-muted-foreground ml-1.5">
                    128 reviews
                  </span>
                </div>

                {/* Review snippet */}
                <p className="text-xs font-body text-muted-foreground italic leading-relaxed max-w-[220px]">
                  "Incredible experience! Our driver was professional and the
                  itinerary was perfectly planned."
                </p>
                <p className="text-[11px] font-body font-medium text-foreground mt-1.5">
                  — Sarah M., London
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VerifiedReviewsBadge;

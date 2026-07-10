/**
 * VerifiedReviewsBadge.tsx — Floating trust badge (bottom-left)
 *
 * DESIGN NOTES:
 * - Fixed bottom-left position
 * - Compact by default, expands on hover to show details
 * - Uses real aggregate rating data
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield } from "lucide-react";
import { aggregateRating } from "@/data/reviews";

const VerifiedReviewsBadge = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-40 hidden sm:block"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="bg-card rounded-xl shadow-tour-card-hover border border-border overflow-hidden cursor-pointer">
        {/* Compact view — always visible */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Green pulse dot */}
          <div className="relative">
            <Shield className="h-5 w-5 text-emerald-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-3 w-3 ${
                    s <= Math.round(aggregateRating.average)
                      ? "star-filled fill-current"
                      : "star-empty"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-body font-bold text-foreground">
              {aggregateRating.average}
            </span>
            <span className="text-xs font-body text-muted-foreground">
              ({aggregateRating.total}+)
            </span>
          </div>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 border-t border-border pt-3">
                <p className="text-xs font-body font-semibold text-foreground mb-2">
                  Verified Traveler Reviews
                </p>

                {/* Rating breakdown */}
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count =
                      aggregateRating.breakdown[
                        rating as keyof typeof aggregateRating.breakdown
                      ];
                    const percentage = Math.round(
                      (count / aggregateRating.total) * 100
                    );
                    return (
                      <div
                        key={rating}
                        className="flex items-center gap-2 text-[11px] font-body"
                      >
                        <span className="text-muted-foreground w-3">
                          {rating}
                        </span>
                        <Star className="h-2.5 w-2.5 star-filled fill-current" />
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground w-6 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[10px] font-body text-muted-foreground mt-2">
                  ✓ All reviews from real travelers
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VerifiedReviewsBadge;

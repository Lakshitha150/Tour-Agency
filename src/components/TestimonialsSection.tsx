/**
 * TestimonialsSection.tsx — Social proof section with traveler reviews
 *
 * DESIGN NOTES:
 * - Horizontal scrollable review cards
 * - Each card: reviewer name, country flag, rating, review text, tour name
 * - Overall rating summary on the left
 * - Builds trust and social proof (Viator review pattern)
 */

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews, aggregateRating } from "@/data/reviews";

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -380 : 380,
      behavior: "smooth",
    });
  };

  return (
    <section id="reviews" className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              What Travelers Say
            </h2>
            <div className="flex items-center gap-4">
              {/* Big rating */}
              <span className="text-5xl font-heading font-bold text-foreground">
                {aggregateRating.average}
              </span>
              <div>
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= Math.round(aggregateRating.average)
                          ? "star-filled fill-current"
                          : "star-empty"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm font-body text-muted-foreground">
                  Based on{" "}
                  <strong className="text-foreground">
                    {aggregateRating.total}+
                  </strong>{" "}
                  verified reviews
                </p>
              </div>
            </div>
          </div>

          {/* Desktop arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Scrollable review cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-6 px-6"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="scroll-snap-start flex-shrink-0 w-[340px] sm:w-[380px] bg-card rounded-2xl p-6 shadow-tour-card hover:shadow-tour-card-hover transition-shadow duration-500"
            >
              {/* Quote icon */}
              <Quote className="h-6 w-6 text-primary/30 mb-4" />

              {/* Review text */}
              <p className="text-sm font-body text-foreground leading-relaxed mb-5 line-clamp-4">
                "{review.text}"
              </p>

              {/* Rating stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s <= review.rating
                        ? "star-filled fill-current"
                        : "star-empty"
                    }`}
                  />
                ))}
              </div>

              {/* Reviewer info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs font-body text-muted-foreground">
                    {review.countryFlag} {review.country}
                  </p>
                </div>
                <span className="text-[10px] font-body font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                  {review.tourName}
                </span>
              </div>

              {/* Date */}
              <p className="text-[11px] font-body text-muted-foreground mt-3">
                {review.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

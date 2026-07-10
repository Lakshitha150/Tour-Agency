/**
 * HeroSection.tsx — Blacklane-inspired dark cinematic hero
 *
 * DESIGN NOTES:
 * - Full viewport dark hero with auto-rotating background images
 * - Large serif display headline with staggered animation
 * - Search/filter widget overlay (Blacklane booking widget pattern)
 * - Trust bar at the bottom with key stats
 * - Parallax scroll effect on the background
 */

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Star, MapPin, Shield, Clock } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const heroImages = [
  "/hero/sigiriya.png",
  "/hero/kandy.png",
  "/hero/tea.png",
];

const heroSlides = [
  {
    headline: "Explore Sri Lanka,",
    highlight: "Your Way",
    subtitle: "Curated day tours, wildlife safaris & cultural experiences with private chauffeurs.",
  },
  {
    headline: "Discover the Cultural",
    highlight: "Heart",
    subtitle: "From sacred temples to elephant encounters — immerse yourself in Sri Lanka's heritage.",
  },
  {
    headline: "Adventures Through",
    highlight: "Paradise",
    subtitle: "Tea plantations, ancient fortresses & pristine beaches — all in one incredible island.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const tourTypes = ["All Tours", "Day Tours", "Wildlife Safari", "Cultural"];

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);

  /* Auto-rotate slides every 6 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background images with crossfade */}
      {heroImages.map((img, i) => (
        <motion.div
          key={img}
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <img
            src={img}
            alt={`Sri Lanka landscape ${i + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-[2000ms] ${
              activeSlide === i ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: `kenburns 30s ease-in-out infinite alternate`,
              animationDelay: `${i * -10}s`,
            }}
            width={1920}
            height={1080}
          />
        </motion.div>
      ))}

      {/* Dark gradient overlay — Blacklane pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,8%)] via-[hsl(220,20%,8%,0.55)] to-[hsl(220,20%,8%,0.35)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,20%,8%,0.3)] to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            className="text-center mb-12"
          >
            {/* Small category label */}
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs font-body font-medium tracking-[0.2em] uppercase text-white/80 mb-6 backdrop-blur-sm">
                🇱🇰 Sri Lanka Tour Experiences
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.08] mb-6 text-white"
            >
              {slide.headline}{" "}
              <span className="italic font-normal text-gold-gradient">
                {slide.highlight}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-body font-light text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              {slide.subtitle}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#tours"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-bold text-sm hover:brightness-110 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Explore Day Tours
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 text-white font-body font-semibold text-sm transition-all duration-300 text-center"
              >
                Plan Custom Trip
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeSlide === i
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust bar at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-gradient-to-t from-[hsl(220,20%,8%)] to-transparent pt-12 pb-6">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white/60 text-sm font-body">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 star-filled" />
                <span>
                  <strong className="text-white">4.9</strong> Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">120+</span>
                <span>Verified Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#destinations"
          className="text-white/30 hover:text-white/60 transition-colors"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;

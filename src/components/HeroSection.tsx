/**
 * HeroSection.tsx — Full-viewport hero with Ken Burns parallax effect
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Full h-screen with immersive hero image
 * - Ken Burns effect: slow zoom + subtle pan creates cinematic depth
 * - Parallax: image moves slower than scroll for depth perception
 * - Text overlay uses a soft dark gradient (not heavy black)
 * - Typography: large serif headline, crisp sans-serif subtext
 * - Minimal CTAs: one gold primary, one white outline secondary
 * - Floating "Verified" badge anchors trust at bottom-left
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-sigiriya.jpg";

/* Stagger container: children animate sequentially */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.5 },
  },
};

/* Each child fades up gently */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const HeroSection = () => {
  /* Ref for parallax scroll tracking */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Parallax: image scrolls 30% slower than viewport */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* ── Background image with Ken Burns effect ──
          Ken Burns: CSS animation slowly zooms and pans the image over 25s
          Parallax: Framer Motion translateY based on scroll position */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img
          src={heroImage}
          alt="Sigiriya Rock Fortress in Sri Lanka at golden hour"
          className="w-full h-full object-cover animate-[kenburns_25s_ease-in-out_infinite_alternate]"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* ── Gradient overlay ──
          Nordic pattern: softer gradient than dark-luxury sites.
          Uses a warm charcoal-to-transparent for readability without heaviness */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

      {/* ── Hero content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-3xl px-6"
      >
        {/* Subtle category label — Nordic sites use small uppercase labels */}
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 text-xs font-body font-medium tracking-[0.2em] uppercase text-white/90 mb-6">
            Curated Sri Lanka Experiences
          </span>
        </motion.div>

        {/* Main heading — Playfair Display serif for editorial elegance */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-6 text-white"
        >
          Discover Sri Lanka,{" "}
          <span className="italic font-normal">Your Way</span>
        </motion.h1>

        {/* Subtext — Inter sans-serif, lightweight */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg font-body font-light text-white/80 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Handcrafted itineraries, premium vehicles, and local expertise — 
          everything you need for an unforgettable journey.
        </motion.p>

        {/* CTA buttons — Nordic pattern: one solid, one ghost */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary gold CTA */}
          <a
            href="#tours"
            className="px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
          >
            Explore Destinations
          </a>

          {/* Ghost outline CTA */}
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-md border border-white/40 text-white font-body font-medium text-sm hover:bg-white/10 transition-all duration-300"
          >
            Plan My Trip
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator — subtle bouncing arrow ──
          Nordic sites often have this to hint at more content below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#tours" className="text-white/50 hover:text-white/80 transition-colors">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </motion.div>

      {/* ── Ken Burns CSS animation ── */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

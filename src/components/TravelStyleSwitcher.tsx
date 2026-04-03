/**
 * TravelStyleSwitcher.tsx — "Self-Drive vs. Private Chauffeur" toggle
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Horizontal pill toggle sitting above the tour grid
 * - Clean segmented control look: one side active (gold bg), other inactive
 * - When toggled, the tour grid filters with a layout animation "shuffle"
 * - This is a controlled component that passes the active style to parent
 */

import { motion } from "framer-motion";

interface TravelStyleSwitcherProps {
  /** Currently selected style */
  activeStyle: "self-drive" | "chauffeur";
  /** Callback when user switches style */
  onStyleChange: (style: "self-drive" | "chauffeur") => void;
}

const TravelStyleSwitcher = ({ activeStyle, onStyleChange }: TravelStyleSwitcherProps) => {
  return (
    /* Nordic-style segmented control — minimal, centered */
    <div className="flex items-center justify-center mb-12">
      <div className="inline-flex items-center bg-secondary rounded-lg p-1 gap-1">
        {/* Self-Drive option */}
        <button
          onClick={() => onStyleChange("self-drive")}
          className={`relative px-6 py-2.5 rounded-md text-sm font-body font-medium transition-colors duration-300 ${
            activeStyle === "self-drive"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {/* Animated pill background — slides between options */}
          {activeStyle === "self-drive" && (
            <motion.div
              layoutId="activeStyle"
              className="absolute inset-0 bg-primary rounded-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">Self-Drive</span>
        </button>

        {/* Private Chauffeur option */}
        <button
          onClick={() => onStyleChange("chauffeur")}
          className={`relative px-6 py-2.5 rounded-md text-sm font-body font-medium transition-colors duration-300 ${
            activeStyle === "chauffeur"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {activeStyle === "chauffeur" && (
            <motion.div
              layoutId="activeStyle"
              className="absolute inset-0 bg-primary rounded-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">Private Chauffeur</span>
        </button>
      </div>
    </div>
  );
};

export default TravelStyleSwitcher;

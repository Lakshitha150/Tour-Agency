/**
 * StickyValueBar.tsx — Nordic-style "Book with Confidence" sticky sidebar
 *
 * DESIGN NOTES (nordicvisitor.com pattern):
 * - Appears on the right side of tour/itinerary pages
 * - Sticky positioning so it follows the user while scrolling
 * - Contains: price summary, inclusion list, and a gold CTA button
 * - Clean white card with subtle shadow, thin border
 * - Inclusions use green checkmarks (trust signal pattern)
 * - On mobile: collapses to a fixed bottom bar with price + CTA
 */

import { CheckCircle2, Shield } from "lucide-react";

/* Inclusions list — what's included in every tour package */
const inclusions = [
  "Handpicked Hotels",
  "24/7 WhatsApp Support",
  "Local Expert Guide",
  "Airport Transfers",
  "All Entry Tickets",
];

const StickyValueBar = () => {
  return (
    <>
      {/* ── Desktop: Sticky sidebar card ── */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-lg border border-border shadow-nordic p-6 space-y-6">
          {/* "Book with Confidence" header with shield icon */}
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-body font-semibold text-foreground">
              Book with Confidence
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Inclusions list with green checkmarks */}
          <div className="space-y-3">
            <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
              Included in every tour
            </p>
            {inclusions.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{item}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Price summary */}
          <div>
            <p className="text-xs font-body text-muted-foreground mb-1">Starting from</p>
            <p className="text-2xl font-heading font-bold text-foreground">
              $00 <span className="text-sm font-body font-normal text-muted-foreground">/ person</span>
            </p>
          </div>

          {/* Gold CTA button */}
          <a
            href="#contact"
            className="block w-full text-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-body font-semibold text-sm hover:brightness-110 transition-all duration-300"
          >
            Start Planning
          </a>

          {/* Fine print */}
          <p className="text-[11px] font-body text-muted-foreground text-center">
            Free cancellation up to 48 hours before departure
          </p>
        </div>
      </div>

      {/* ── Mobile: Fixed bottom bar ──
          On small screens, shows a slim bar at the bottom with price + CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-nordic-hover p-4 flex items-center justify-between lg:hidden">
        <div>
          <p className="text-xs font-body text-muted-foreground">From</p>
          <p className="text-lg font-heading font-bold text-foreground">$00 <span className="text-xs font-body font-normal text-muted-foreground">/ person</span></p>
        </div>
        <a
          href="#contact"
          className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-body font-semibold text-sm"
        >
          Start Planning
        </a>
      </div>
    </>
  );
};

export default StickyValueBar;

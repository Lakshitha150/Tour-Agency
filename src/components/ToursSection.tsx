/**
 * FeaturedTours.tsx — Viator-style "Top Tours" section with detailed itineraries,
 * optional experiences, flyer display, an interactive fullscreen zoomable lightbox,
 * and a custom PDF itinerary brochure generator.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Star, Clock, MapPin, CheckCircle2, X, AlertCircle, 
  ZoomIn, ZoomOut, RotateCcw, MessageCircle, ArrowRight, Eye,
  FileText, Calendar, User, DollarSign
} from "lucide-react";
import { tours, TourPackage } from "@/data/tours";

const filterTabs = ["All", "Day Tour", "Cultural", "Wildlife", "Adventure"];

const FeaturedTours = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [usePricedFlyer, setUsePricedFlyer] = useState(false);

  // Customizer States
  const [guestName, setGuestName] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Reset customizer state when changing tours
  useEffect(() => {
    setGuestName("");
    setTravelDate("");
    setSelectedOptions([]);
  }, [selectedTour]);

  // Filter tours based on category
  const filteredTours =
    activeTab === "All"
      ? tours
      : tours.filter((t) => t.type.includes(activeTab));

  // Lock scroll when details modal is open
  useEffect(() => {
    if (selectedTour) {
      document.body.style.overflow = "hidden";
      setUsePricedFlyer(!!selectedTour.flyerImagePriced);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTour]);

  // Reset zoom/pan when lightbox opens/closes
  useEffect(() => {
    if (isLightboxOpen) {
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [isLightboxOpen]);

  // Handle escape key to close modal/lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (selectedTour) {
          setSelectedTour(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTour, isLightboxOpen]);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetZoom = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleWhatsAppInquiry = (tour: TourPackage) => {
    let optString = "";
    if (selectedOptions.length > 0) {
      optString = `\n*Selected Options:* ${selectedOptions.join(", ")}`;
    }
    const dateString = travelDate ? `\n*Travel Date:* ${travelDate}` : "";
    const nameString = guestName ? `\n*Guest Name:* ${guestName}` : "";

    const message = encodeURIComponent(
      `Hi! I'm interested in booking the *${tour.name}*.${nameString}${dateString}${optString}\n\nCould you please confirm the itinerary and price?`
    );
    window.open(`https://wa.me/94766424532?text=${message}`, "_blank");
  };

  const toggleOption = (optionName: string) => {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter((name) => name !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  };

  const triggerPrintItinerary = () => {
    window.print();
  };

  const currentFlyerUrl = usePricedFlyer && selectedTour?.flyerImagePriced
    ? selectedTour.flyerImagePriced
    : selectedTour?.flyerImage;

  return (
    <section id="tours" className="py-20 px-6 bg-secondary">
      <div className="container mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Featured Tour Packages
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Hand-picked experiences with private vehicles, expert guides, and detailed itineraries tailored for your comfort.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tour Cards Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredTours.map((tour) => (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-tour-card hover:shadow-tour-card-hover hover:-translate-y-1 transition-all duration-500"
                >
                  {/* Card Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Bestseller/Popular Badges */}
                    {tour.badge && (
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-body font-bold uppercase tracking-wider ${
                          tour.badge === "BESTSELLER"
                            ? "badge-bestseller"
                            : tour.badge === "POPULAR"
                            ? "badge-popular"
                            : "badge-new"
                        }`}
                      >
                        {tour.badge}
                      </span>
                    )}

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-body font-medium flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {tour.duration}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {tour.type.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-body font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground uppercase tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      {tour.name}
                    </h3>

                    <p className="text-sm font-body text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {tour.tagline}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-3.5 w-3.5 ${
                              s <= Math.round(tour.rating)
                                ? "star-filled fill-current"
                                : "star-empty"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-body font-semibold text-foreground">
                        {tour.rating}
                      </span>
                      <span className="text-xs font-body text-muted-foreground">
                        ({tour.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Quick itinerary points */}
                    <div className="space-y-2 mb-5">
                      {tour.attractions.slice(0, 3).map((att) => (
                        <div
                          key={att.name}
                          className="flex items-center gap-2 text-sm font-body text-foreground"
                        >
                          <span className="text-base">{att.icon}</span>
                          <span className="font-medium text-xs sm:text-sm line-clamp-1">{att.name}</span>
                        </div>
                      ))}
                      {tour.attractions.length > 3 && (
                        <span className="text-xs font-body text-primary font-medium block pl-6">
                          +{tour.attractions.length - 3} more attractions & experiences
                        </span>
                      )}
                    </div>

                    {/* Pickup info */}
                    <div className="flex items-center gap-2 mb-5 text-sm font-body text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Pickup: {tour.pickup}</span>
                    </div>

                    {/* Key features */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {["Private Tour", "Free Cancellation", "All-Inclusive Options"].map(
                        (feat) => (
                          <div key={feat} className="flex items-center gap-1 text-emerald-600">
                            <CheckCircle2 className="h-3 w-3" />
                            <span className="text-[11px] font-body font-medium">{feat}</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Price + Action Buttons */}
                    <div className="mt-auto border-t border-border pt-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-body text-muted-foreground uppercase">From</p>
                        <p className="text-xl font-heading font-bold text-foreground">
                          ${tour.priceFrom}
                          <span className="text-xs font-body font-normal text-muted-foreground ml-0.5">/ person</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedTour(tour)}
                          className="px-4 py-2.5 rounded-lg border border-border hover:bg-secondary text-foreground font-body font-medium text-xs transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Details
                        </button>
                        <button
                          onClick={() => handleWhatsAppInquiry(tour)}
                          className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-xs hover:brightness-110 transition-all flex items-center gap-1.5"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* ── DETAILED TOUR MODAL ── */}
      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 no-print">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTour(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] sm:h-[80vh] bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border bg-card">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground flex items-center gap-2">
                    {selectedTour.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-muted-foreground mt-1">
                    Pickup: {selectedTour.pickup} • Duration: {selectedTour.duration} ({selectedTour.durationHours})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTour(null)}
                  className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Body (Split Grid) */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Side: Comprehensive Details & Customizer */}
                <div className="lg:col-span-7 p-6 space-y-8 border-b lg:border-b-0 lg:border-r border-border">
                  {/* Overview */}
                  <div>
                    <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-primary mb-2">Overview</h4>
                    <p className="text-sm font-body leading-relaxed text-foreground mb-4">
                      {selectedTour.tagline}. Travel in comfort with our dedicated vehicle packages.
                    </p>
                    {selectedTour.vehiclePrice && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-body font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        Vehicle Package Price: {selectedTour.vehiclePrice}
                      </div>
                    )}
                  </div>

                  {/* ─── LIVE ITINERARY CUSTOMIZER ─── */}
                  <div className="p-4 bg-secondary/40 border border-border rounded-xl space-y-4">
                    <h4 className="text-xs font-body font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-primary" /> Plan & Customise Your Itinerary
                    </h4>
                    <p className="text-[11px] font-body text-muted-foreground leading-relaxed">
                      Select your preferred optional add-ons below, add your details, and generate a customized PDF brochure of your personalized trip.
                    </p>

                    {/* Guest Name & Date inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-body font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                          <User className="h-3 w-3" /> Guest Name
                        </label>
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Alice & Bob"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-body font-bold text-muted-foreground uppercase mb-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Travel Date
                        </label>
                        <input
                          type="text"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                          placeholder="e.g. August 20, 2026"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Live Estimate Cost Box */}
                    <div className="p-3 bg-card border border-border rounded-lg flex items-center justify-between text-xs font-body">
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-semibold">Custom Add-on Cost Summary:</span>
                        <span className="font-semibold text-foreground">
                          {selectedOptions.length === 0 
                            ? "No options selected (Base package only)" 
                            : `${selectedOptions.length} option(s) selected`}
                        </span>
                      </div>
                      <button
                        onClick={triggerPrintItinerary}
                        className="px-3.5 py-2 bg-primary text-primary-foreground hover:brightness-110 rounded-lg font-semibold text-xs transition-all flex items-center gap-1.5"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Generate Itinerary PDF
                      </button>
                    </div>
                  </div>

                  {/* Main Tour Plan / Itinerary */}
                  <div>
                    <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-primary mb-4">Main Tour Plan</h4>
                    <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                      {selectedTour.attractions.map((att) => (
                        <div key={att.name} className="relative pl-8 flex flex-col gap-1">
                          {/* Dot / Icon */}
                          <div className="absolute left-[3px] top-1 -translate-x-1/2 w-[22px] h-[22px] rounded-full bg-card border border-border flex items-center justify-center text-xs">
                            {att.icon}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h5 className="font-heading font-bold text-sm text-foreground">{att.name}</h5>
                            {att.price && (
                              <span className="text-[10px] font-body px-2 py-0.5 rounded bg-secondary text-primary font-semibold">
                                Ticket: {att.price}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-body text-muted-foreground leading-relaxed">
                            {att.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Optional Experiences Grid */}
                  {selectedTour.optionalExperiences && selectedTour.optionalExperiences.length > 0 && (
                    <div>
                      <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-primary mb-3">
                        Optional Experiences / Add-ons (Check to add to PDF plan)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedTour.optionalExperiences.map((opt) => {
                          const isSelected = selectedOptions.includes(opt.name);
                          return (
                            <label
                              key={opt.name}
                              className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                                isSelected
                                  ? "bg-primary/5 border-primary/45 shadow-sm"
                                  : "bg-secondary/40 border-border hover:border-border/80"
                              }`}
                            >
                              {/* Custom Checkbox */}
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleOption(opt.name)}
                                className="mt-0.5 h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary focus:ring-opacity-20 cursor-pointer"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-body font-bold text-foreground flex items-center gap-1">
                                  <span>{opt.icon}</span>
                                  <span className="truncate">{opt.name}</span>
                                </p>
                                {opt.price && <p className="text-[10px] font-body font-semibold text-primary/90 mt-0.5">{opt.price}</p>}
                                {opt.description && <p className="text-[10px] font-body text-muted-foreground leading-tight mt-0.5">{opt.description}</p>}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Inclusions & Exclusions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border">
                    <div>
                      <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-emerald-600 mb-3">What's Included</h4>
                      <ul className="space-y-2">
                        {selectedTour.included.map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-xs font-body text-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-red-600 mb-3">What's Excluded</h4>
                      <ul className="space-y-2">
                        {selectedTour.notIncluded.map((exc) => (
                          <li key={exc} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                            <AlertCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right Side: Flyer Showcase & Booking CTA */}
                <div className="lg:col-span-5 p-6 bg-secondary/30 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-primary">Tour Flyer</h4>
                      {selectedTour.flyerImagePriced && (
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-body text-muted-foreground">Show Prices</span>
                          <button
                            onClick={() => setUsePricedFlyer(!usePricedFlyer)}
                            className={`w-7 h-4 rounded-full p-0.5 transition-colors duration-200 ${
                              usePricedFlyer ? "bg-primary" : "bg-muted"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${
                                usePricedFlyer ? "translate-x-3" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Flyer Preview Container */}
                    <div 
                      onClick={() => setIsLightboxOpen(true)}
                      className="relative border border-border rounded-xl overflow-hidden cursor-pointer group bg-card aspect-[3/4] shadow-md hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                    >
                      <img
                        src={currentFlyerUrl}
                        alt="Tour Flyer Preview"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      {/* Zoom Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg text-white font-body text-xs font-medium flex items-center gap-1.5">
                          <ZoomIn className="h-4 w-4" />
                          Click to Zoom Flyer
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] font-body text-center text-muted-foreground">
                      Click the flyer to view it in full screen with zoom capability.
                    </p>
                  </div>

                  {/* Booking CTA Footer */}
                  <div className="mt-8 pt-4 border-t border-border space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-body text-muted-foreground">Base Price from:</span>
                        <p className="text-2xl font-heading font-bold text-foreground">
                          ${selectedTour.priceFrom} <span className="text-xs font-body font-normal text-muted-foreground">/ person</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-body text-muted-foreground block">Instant Booking</span>
                        <span className="text-xs font-body font-semibold text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" /> Online
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWhatsAppInquiry(selectedTour)}
                      className="w-full py-3 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white rounded-xl font-body font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Inquire / Book via WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FULL SCREEN ZOOMABLE LIGHTBOX ── */}
      <AnimatePresence>
        {isLightboxOpen && selectedTour && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 no-print">
            {/* Close Overlay */}
            <div className="absolute inset-0" onClick={() => setIsLightboxOpen(false)} />

            {/* Top Bar Controls */}
            <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between text-white">
              <div className="bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 text-xs font-body max-w-[70%] truncate">
                {selectedTour.name} - Flyer View
              </div>

              <div className="flex items-center gap-2">
                {/* Custom Toggle inside Lightbox if priced version exists */}
                {selectedTour.flyerImagePriced && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUsePricedFlyer(!usePricedFlyer);
                    }}
                    className="px-3 py-1.5 bg-black/60 hover:bg-black/80 rounded-lg border border-white/10 text-xs font-body flex items-center gap-1.5 transition-colors"
                  >
                    {usePricedFlyer ? "Show Clean" : "Show Prices"}
                  </button>
                )}

                {/* Zoom Controls */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                  disabled={zoomScale <= 1}
                  className="p-2 bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-white/10 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-xs font-body bg-black/60 px-2 py-1.5 rounded-lg border border-white/10">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                  disabled={zoomScale >= 4}
                  className="p-2 bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-white/10 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
                  className="p-2 bg-black/60 hover:bg-black/80 rounded-lg border border-white/10 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg border border-red-500/20 transition-colors ml-2"
                  title="Close Lightbox"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Interactive Image Container */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <motion.div
                className="cursor-grab active:cursor-grabbing max-w-[95vw] max-h-[90vh] flex items-center justify-center"
                style={{
                  x: panPosition.x,
                  y: panPosition.y,
                  scale: zoomScale,
                }}
                drag={zoomScale > 1}
                dragConstraints={{ left: -400 * (zoomScale - 1), right: 400 * (zoomScale - 1), top: -600 * (zoomScale - 1), bottom: 600 * (zoomScale - 1) }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                animate={isDragging ? undefined : { x: panPosition.x, y: panPosition.y }}
                onDrag={(e, info) => {
                  setPanPosition({
                    x: panPosition.x + info.delta.x,
                    y: panPosition.y + info.delta.y
                  });
                }}
              >
                <img
                  src={currentFlyerUrl}
                  alt={`${selectedTour.name} Flyer High Resolution`}
                  draggable="false"
                  className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle Zoom on Double/Single Click
                    if (zoomScale > 1) {
                      handleResetZoom();
                    } else {
                      setZoomScale(2);
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Bottom Hints */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 text-[11px] font-body text-white/80 pointer-events-none text-center">
              {zoomScale > 1 ? "Drag the image to pan. Click again or tap Reset (↺) to zoom out." : "Click image to zoom in 2x. Drag to look around."}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── PREMIUM A4 PRINT BROCHURE TEMPLATE (PRINT ONLY) ─── */}
      {selectedTour && (
        <div className="print-container-wrapper hidden print:block bg-white text-black font-sans leading-normal relative overflow-hidden">
          {/* Faded Background Image Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] z-0 flex items-center justify-center">
            <img
              src={selectedTour.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Branded Letterhead Content (Relative to stay above background watermark) */}
          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold font-serif text-black uppercase tracking-wide">
                  Travel Deal Sri Lanka
                </h1>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5 font-sans font-semibold">
                  Curated Travel Experiences & Luxury Chauffeur Rides
                </p>
              </div>
              <div className="text-right text-xs">
              <p className="font-semibold text-black">📞 +94 766 424 532</p>
                <p className="text-gray-600">📧 traveldealsrilanka@gmail.com</p>
                <p className="text-gray-500 text-[10px]">Colombo, Sri Lanka</p>
              </div>
            </div>

            {/* Title & Personalization info */}
            <div className="bg-gray-50 border border-gray-200/80 p-4 rounded-xl mb-6 flex justify-between items-start">
              <div>
                <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest block">Proposed Tour Plan</span>
                <h2 className="text-lg font-bold font-serif text-black">{selectedTour.name}</h2>
                <p className="text-xs text-gray-600 mt-0.5">
                  Duration: {selectedTour.duration} ({selectedTour.durationHours}) • Pickup: {selectedTour.pickup}
                </p>
              </div>
              <div className="text-right text-xs">
                <p className="font-bold text-black uppercase text-[10px] tracking-wide">Prepared For:</p>
                <p className="text-primary font-bold text-sm">{guestName || "Valued Guest"}</p>
                {travelDate && <p className="text-gray-500 text-[10px] mt-0.5">Scheduled Date: {travelDate}</p>}
              </div>
            </div>

            {/* Overview text */}
            <div className="mb-6 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-2">Introduction</h3>
              <p className="text-xs text-gray-700 leading-relaxed italic">
                "{selectedTour.tagline}. This curated day tour is designed for your ultimate comfort and luxury. Enjoy private transportation with our safe, vetted chauffeur guides."
              </p>
            </div>

            {/* Main Plan Details */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-3">Main Tour Plan</h3>
              <div className="space-y-3">
                {selectedTour.attractions.map((att, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-base flex-shrink-0 mt-0.5">{att.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-black flex items-center gap-2">
                        {att.name}
                        {att.price && <span className="text-[8px] font-normal text-gray-500 font-sans border border-gray-200 px-1.5 py-0.2 rounded bg-gray-50">Ticket cost: {att.price}</span>}
                      </h4>
                      <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">
                        {att.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customized Selected Add-ons */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1 mb-3">Custom Selected Options & Activities</h3>
              {selectedOptions.length === 0 ? (
                <p className="text-xs text-gray-400 italic pl-2">No optional activities selected. (Base package only).</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTour.optionalExperiences
                    ?.filter((opt) => selectedOptions.includes(opt.name))
                    .map((opt, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-sm mt-0.5">{opt.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-black leading-tight">{opt.name}</p>
                          {opt.price && <p className="text-[9px] font-bold text-[#D4AF37] mt-0.5">{opt.price}</p>}
                          {opt.description && <p className="text-[9px] text-gray-500 leading-tight mt-0.5">{opt.description}</p>}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-4 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">What is Included</h4>
                <ul className="space-y-1 text-[10px] text-gray-700">
                  {selectedTour.included.map((inc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-600">✓</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2">What is Excluded</h4>
                <ul className="space-y-1 text-[10px] text-gray-500">
                  {selectedTour.notIncluded.map((exc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-red-500">•</span> {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing Summary & Footer Notes */}
            <div className="border-t border-gray-200 pt-4 flex justify-between items-end mb-6">
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Important Notes:</p>
                <p className="text-[9px] text-gray-500 mt-0.5 max-w-sm">
                  * Final pricing depends on group size. Private vehicle services estimate base is {selectedTour.vehiclePrice || "USD 100/day"} (fuel, parking tolls, English-speaking driver included).
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-400 uppercase">Estimated Base Rate:</p>
                <p className="text-lg font-bold text-black">${selectedTour.priceFrom} <span className="text-xs font-normal text-gray-500">/ person</span></p>
              </div>
            </div>

            {/* Final Call to Action booking information */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center text-xs">
              <p className="font-bold text-black">Ready to lock in this itinerary and book?</p>
              <p className="inline-flex items-center justify-center gap-1.5 text-gray-600 mt-1">
              Contact us on WhatsApp: <strong>+94 766 424 532</strong> or email <strong>traveldealsrilanka@gmail.com</strong>
              </p>
              <p className="text-gray-400 text-[9px] mt-2">
                Generated by Travel Deal Sri Lanka. Creating Unforgettable Memories.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedTours;

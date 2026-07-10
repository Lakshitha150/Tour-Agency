/**
 * Admin.tsx — Premium client-side Admin Panel
 *
 * Provides a form-based interface to manage tours, destinations, attractions, and reviews.
 * Saves to localStorage, combining with static data at runtime.
 * Includes JSON export/import for backing up and restoring data.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, Lock, LogOut, Plus, Trash2, Shield, Eye, Download, Upload, Check, AlertCircle, RefreshCw
} from "lucide-react";
import { tours as initialTours, TourPackage, TourAttraction, OptionalExperience } from "@/data/tours";
import { destinations as initialDestinations, Destination } from "@/data/destinations";
import { attractions as initialAttractions, Attraction } from "@/data/attractions";
import { reviews as initialReviews, Review } from "@/data/reviews";

const PASSCODE = "admin123";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"tours" | "destinations" | "attractions" | "reviews" | "system">("tours");

  // Custom data state
  const [customTours, setCustomTours] = useState<TourPackage[]>([]);
  const [customDestinations, setCustomDestinations] = useState<Destination[]>([]);
  const [customAttractions, setCustomAttractions] = useState<Attraction[]>([]);
  const [customReviews, setCustomReviews] = useState<Review[]>([]);

  // Notification state
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load custom data from localStorage on mount
  useEffect(() => {
    const loadedTours = localStorage.getItem("traveldeal_custom_tours");
    const loadedDestinations = localStorage.getItem("traveldeal_custom_destinations");
    const loadedAttractions = localStorage.getItem("traveldeal_custom_attractions");
    const loadedReviews = localStorage.getItem("traveldeal_custom_reviews");
    const sessionAuth = sessionStorage.getItem("traveldeal_admin_auth");

    if (loadedTours) setCustomTours(JSON.parse(loadedTours));
    if (loadedDestinations) setCustomDestinations(JSON.parse(loadedDestinations));
    if (loadedAttractions) setCustomAttractions(JSON.parse(loadedAttractions));
    if (loadedReviews) setCustomReviews(JSON.parse(loadedReviews));
    if (sessionAuth === "true") setIsAuthenticated(true);
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem("traveldeal_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("traveldeal_admin_auth");
  };

  const saveCustomData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // ─── TOUR FORM STATE & MANAGEMENT ───
  const [tourName, setTourName] = useState("");
  const [tourTagline, setTourTagline] = useState("");
  const [tourDuration, setTourDuration] = useState("Full Day");
  const [tourDurationHours, setTourDurationHours] = useState("");
  const [tourTypes, setTourTypes] = useState("Day Tour");
  const [tourPickup, setTourPickup] = useState("Colombo Area");
  const [tourPrice, setTourPrice] = useState("");
  const [tourBadge, setTourBadge] = useState<"" | "BESTSELLER" | "NEW" | "POPULAR">("");
  const [tourImageUrl, setTourImageUrl] = useState("/placeholder.svg");
  const [tourFlyerUrl, setTourFlyerUrl] = useState("/placeholder.svg");
  const [tourVehiclePrice, setTourVehiclePrice] = useState("USD 100 / Day");

  // Sub-lists
  const [tempAttraction, setTempAttraction] = useState({ icon: "🏛️", name: "", description: "", price: "" });
  const [tourAttractionsList, setTourAttractionsList] = useState<TourAttraction[]>([]);

  const [tempOptExperience, setTempOptExperience] = useState({ icon: "💆", name: "", price: "", description: "" });
  const [tourOptExperiencesList, setTourOptExperiencesList] = useState<OptionalExperience[]>([]);

  const [tempInclusion, setTempInclusion] = useState("");
  const [tourInclusionsList, setTourInclusionsList] = useState<string[]>([]);

  const [tempExclusion, setTempExclusion] = useState("");
  const [tourExclusionsList, setTourExclusionsList] = useState<string[]>([]);

  const handleAddAttraction = () => {
    if (!tempAttraction.name || !tempAttraction.description) {
      triggerNotification("error", "Attraction name and description are required.");
      return;
    }
    setTourAttractionsList([...tourAttractionsList, { ...tempAttraction }]);
    setTempAttraction({ icon: "🏛️", name: "", description: "", price: "" });
  };

  const handleAddOptExperience = () => {
    if (!tempOptExperience.name) {
      triggerNotification("error", "Experience name is required.");
      return;
    }
    setTourOptExperiencesList([...tourOptExperiencesList, { ...tempOptExperience }]);
    setTempOptExperience({ icon: "💆", name: "", price: "", description: "" });
  };

  const handleAddInclusion = () => {
    if (!tempInclusion) return;
    setTourInclusionsList([...tourInclusionsList, tempInclusion]);
    setTempInclusion("");
  };

  const handleAddExclusion = () => {
    if (!tempExclusion) return;
    setTourExclusionsList([...tourExclusionsList, tempExclusion]);
    setTempExclusion("");
  };

  const handleAddTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourName || !tourTagline || !tourPrice) {
      triggerNotification("error", "Tour name, tagline, and price are required.");
      return;
    }
    if (tourAttractionsList.length === 0) {
      triggerNotification("error", "At least one attraction must be added to the tour plan.");
      return;
    }

    const newTour: TourPackage = {
      id: `custom-tour-${Date.now()}`,
      name: tourName,
      slug: tourName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tagline: tourTagline,
      duration: tourDuration,
      durationHours: tourDurationHours || "12-14 hours",
      type: tourTypes.split(",").map(t => t.trim()),
      pickup: tourPickup,
      rating: 5.0,
      reviewCount: 1,
      priceFrom: parseFloat(tourPrice),
      currency: "USD",
      image: tourImageUrl,
      heroImage: tourImageUrl,
      flyerImage: tourFlyerUrl,
      vehiclePrice: tourVehiclePrice,
      attractions: tourAttractionsList,
      optionalExperiences: tourOptExperiencesList,
      highlights: tourInclusionsList.slice(0, 4), // simple highlights mapping
      included: tourInclusionsList,
      notIncluded: tourExclusionsList,
      tags: tourName.toLowerCase().split(" "),
      badge: tourBadge || undefined
    };

    const updated = [...customTours, newTour];
    setCustomTours(updated);
    saveCustomData("traveldeal_custom_tours", updated);

    // Reset Form
    setTourName("");
    setTourTagline("");
    setTourDuration("Full Day");
    setTourDurationHours("");
    setTourPrice("");
    setTourBadge("");
    setTourAttractionsList([]);
    setTourOptExperiencesList([]);
    setTourInclusionsList([]);
    setTourExclusionsList([]);
    triggerNotification("success", "Tour Package added successfully!");
  };

  // ─── DESTINATION FORM STATE ───
  const [destName, setDestName] = useState("");
  const [destRegion, setDestRegion] = useState("");
  const [destDescription, setDestDescription] = useState("");
  const [destHighlights, setDestHighlights] = useState("");
  const [destImageUrl, setDestImageUrl] = useState("/placeholder.svg");

  const handleAddDestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destName || !destRegion || !destDescription) {
      triggerNotification("error", "All fields are required for destinations.");
      return;
    }

    const newDest: Destination = {
      id: `custom-dest-${Date.now()}`,
      name: destName,
      region: destRegion,
      description: destDescription,
      tourCount: 1,
      image: destImageUrl,
      highlights: destHighlights.split(",").map(h => h.trim()).filter(Boolean)
    };

    const updated = [...customDestinations, newDest];
    setCustomDestinations(updated);
    saveCustomData("traveldeal_custom_destinations", updated);

    setDestName("");
    setDestRegion("");
    setDestDescription("");
    setDestHighlights("");
    triggerNotification("success", "Destination added successfully!");
  };

  // ─── ATTRACTION FORM STATE ───
  const [attrName, setAttrName] = useState("");
  const [attrLocation, setAttrLocation] = useState("");
  const [attrType, setAttrType] = useState("Sightseeing");
  const [attrDescription, setAttrDescription] = useState("");
  const [attrImageUrl, setAttrImageUrl] = useState("/placeholder.svg");

  const handleAddAttrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attrName || !attrLocation || !attrDescription) {
      triggerNotification("error", "Name, Location, and Description are required.");
      return;
    }

    const newAttr: Attraction = {
      id: `custom-attr-${Date.now()}`,
      name: attrName,
      location: attrLocation,
      type: attrType,
      description: attrDescription,
      image: attrImageUrl,
      tourIds: []
    };

    const updated = [...customAttractions, newAttr];
    setCustomAttractions(updated);
    saveCustomData("traveldeal_custom_attractions", updated);

    setAttrName("");
    setAttrLocation("");
    setAttrDescription("");
    triggerNotification("success", "Attraction added successfully!");
  };

  // ─── REVIEW FORM STATE ───
  const [revName, setRevName] = useState("");
  const [revCountry, setRevCountry] = useState("");
  const [revFlag, setRevFlag] = useState("🌍");
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState("");
  const [revTourName, setRevTourName] = useState("");

  const handleAddRevSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName || !revCountry || !revText) {
      triggerNotification("error", "Name, Country, and Review Text are required.");
      return;
    }

    const newRev: Review = {
      id: `custom-rev-${Date.now()}`,
      name: revName,
      country: revCountry,
      countryFlag: revFlag,
      avatar: "",
      rating: revRating,
      text: revText,
      tourName: revTourName || "Custom Tour",
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
    };

    const updated = [...customReviews, newRev];
    setCustomReviews(updated);
    saveCustomData("traveldeal_custom_reviews", updated);

    setRevName("");
    setRevCountry("");
    setRevText("");
    setRevTourName("");
    triggerNotification("success", "Traveler Review added successfully!");
  };

  // ─── GENERAL DELETE ACTIONS ───
  const handleDeleteCustomItem = (key: string, id: string, list: any[], setList: any) => {
    const updated = list.filter(item => item.id !== id);
    setList(updated);
    saveCustomData(key, updated);
    triggerNotification("success", "Item deleted successfully!");
  };

  // ─── SYSTEM BACKUP AND RESTORE ───
  const handleExportData = () => {
    const backupData = {
      customTours,
      customDestinations,
      customAttractions,
      customReviews
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `traveldeal_backup_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    triggerNotification("success", "JSON database backup downloaded!");
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.customTours) {
          setCustomTours(parsed.customTours);
          saveCustomData("traveldeal_custom_tours", parsed.customTours);
        }
        if (parsed.customDestinations) {
          setCustomDestinations(parsed.customDestinations);
          saveCustomData("traveldeal_custom_destinations", parsed.customDestinations);
        }
        if (parsed.customAttractions) {
          setCustomAttractions(parsed.customAttractions);
          saveCustomData("traveldeal_custom_attractions", parsed.customAttractions);
        }
        if (parsed.customReviews) {
          setCustomReviews(parsed.customReviews);
          saveCustomData("traveldeal_custom_reviews", parsed.customReviews);
        }
        triggerNotification("success", "Database imported successfully! Page will refresh.");
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        triggerNotification("error", "Invalid file format. Please upload a valid backup JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all custom admin items? Initial static items will remain.")) {
      localStorage.removeItem("traveldeal_custom_tours");
      localStorage.removeItem("traveldeal_custom_destinations");
      localStorage.removeItem("traveldeal_custom_attractions");
      localStorage.removeItem("traveldeal_custom_reviews");
      setCustomTours([]);
      setCustomDestinations([]);
      setCustomAttractions([]);
      setCustomReviews([]);
      triggerNotification("success", "Custom database reset. Page will refresh.");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[hsl(220,18%,10%)] flex items-center justify-center p-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
              <Compass className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-center">TravelDealSL Admin</h2>
            <p className="text-xs font-body text-white/50 mt-1">Access restricted to authorized personnel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-body font-medium uppercase tracking-wider text-white/60 mb-2">
                Enter Admin Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl font-body text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-body flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
            >
              <Shield className="h-4 w-4" />
              Authenticate
            </button>
          </form>
          <p className="text-[10px] font-body text-white/30 text-center mt-6">
            Tip: The default passcode is <code className="text-white/50">admin123</code>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── TOP NAV BAR ── */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-heading font-bold">
            TravelDeal<span className="text-primary">SL</span> Admin Dashboard
          </h2>
          <span className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase ml-2">
            Local DB Mode
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-secondary text-xs font-body text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </header>

      {/* ── LAYOUT SHELL ── */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 border-r border-border bg-card/50 flex flex-col py-6">
          <nav className="space-y-1 px-4 flex-1">
            {[
              { id: "tours", label: "Tour Packages", count: initialTours.length + customTours.length },
              { id: "destinations", label: "Top Destinations", count: initialDestinations.length + customDestinations.length },
              { id: "attractions", label: "Attractions", count: initialAttractions.length + customAttractions.length },
              { id: "reviews", label: "Testimonials", count: initialReviews.length + customReviews.length },
              { id: "system", label: "Data & Systems", count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats Summary */}
          <div className="px-6 py-4 border-t border-border mt-auto hidden md:block">
            <h5 className="text-[10px] font-body font-bold uppercase tracking-wider text-muted-foreground mb-3">Database Health</h5>
            <div className="space-y-2 text-xs font-body">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Custom Items:</span>
                <span className="font-semibold">{customTours.length + customDestinations.length + customAttractions.length + customReviews.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage Usage:</span>
                <span className="font-semibold">~{(JSON.stringify(localStorage).length / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT VIEWPORTS ─── */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl">
          {/* Notification Alert overlay */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl border shadow-lg font-body text-xs ${
                  notification.type === "success"
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-red-500/10 text-red-600 border-red-500/20"
                }`}
              >
                {notification.type === "success" ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ──── VIEW: TOUR PACKAGES ──── */}
          {activeTab === "tours" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">Manage Tours</h3>
                <p className="text-xs text-muted-foreground">Add new day packages or edit existing entries saved in browser memory.</p>
              </div>

              {/* Grid: Forms & Existing */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form to Add New Tour */}
                <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 space-y-6">
                  <h4 className="font-heading font-bold text-base flex items-center gap-1.5 border-b border-border pb-3">
                    <Plus className="h-5 w-5 text-primary" /> Add New Tour Package
                  </h4>
                  <form onSubmit={handleAddTourSubmit} className="space-y-4">
                    {/* Grid Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Tour Name *</label>
                        <input
                          type="text"
                          value={tourName}
                          onChange={(e) => setTourName(e.target.value)}
                          placeholder="e.g. Galle Day Tour"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Base Price (USD) *</label>
                        <input
                          type="number"
                          value={tourPrice}
                          onChange={(e) => setTourPrice(e.target.value)}
                          placeholder="e.g. 99"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Tour Tagline *</label>
                      <input
                        type="text"
                        value={tourTagline}
                        onChange={(e) => setTourTagline(e.target.value)}
                        placeholder="e.g. Discover colonial history and coastal beauty in Galle Fort"
                        className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Duration</label>
                        <input
                          type="text"
                          value={tourDuration}
                          onChange={(e) => setTourDuration(e.target.value)}
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Duration Hours</label>
                        <input
                          type="text"
                          value={tourDurationHours}
                          onChange={(e) => setTourDurationHours(e.target.value)}
                          placeholder="e.g. 12–14 hours"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Vehicle Price Tag</label>
                        <input
                          type="text"
                          value={tourVehiclePrice}
                          onChange={(e) => setTourVehiclePrice(e.target.value)}
                          placeholder="e.g. USD 100 / Day"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Pickup Location</label>
                        <input
                          type="text"
                          value={tourPickup}
                          onChange={(e) => setTourPickup(e.target.value)}
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Ribbon Badge</label>
                        <select
                          value={tourBadge}
                          onChange={(e) => setTourBadge(e.target.value as any)}
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        >
                          <option value="">None</option>
                          <option value="BESTSELLER">Bestseller</option>
                          <option value="NEW">New</option>
                          <option value="POPULAR">Popular</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Card Image URL</label>
                        <input
                          type="text"
                          value={tourImageUrl}
                          onChange={(e) => setTourImageUrl(e.target.value)}
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Flyer Image URL</label>
                        <input
                          type="text"
                          value={tourFlyerUrl}
                          onChange={(e) => setTourFlyerUrl(e.target.value)}
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Tour Types (Comma separated)</label>
                      <input
                        type="text"
                        value={tourTypes}
                        onChange={(e) => setTourTypes(e.target.value)}
                        placeholder="Day Tour, Cultural, Coastal"
                        className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    {/* DYNAMIC PLAN/ATTRACTIONS LIST */}
                    <div className="border border-border/80 rounded-lg p-4 bg-secondary/30 space-y-3">
                      <h5 className="text-xs font-body font-bold uppercase text-primary">Dynamic Tour Plan (Add step-by-step)</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <input
                          type="text"
                          placeholder="Icon (e.g. 🏛️)"
                          value={tempAttraction.icon}
                          onChange={(e) => setTempAttraction({ ...tempAttraction, icon: e.target.value })}
                          className="sm:col-span-2 px-2 py-1.5 border border-border bg-background rounded text-xs text-center"
                        />
                        <input
                          type="text"
                          placeholder="Attraction Name"
                          value={tempAttraction.name}
                          onChange={(e) => setTempAttraction({ ...tempAttraction, name: e.target.value })}
                          className="sm:col-span-5 px-3 py-1.5 border border-border bg-background rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Ticket Price (e.g. LKR 2,000)"
                          value={tempAttraction.price}
                          onChange={(e) => setTempAttraction({ ...tempAttraction, price: e.target.value })}
                          className="sm:col-span-5 px-3 py-1.5 border border-border bg-background rounded text-xs"
                        />
                      </div>
                      <textarea
                        placeholder="Attraction brief description..."
                        rows={2}
                        value={tempAttraction.description}
                        onChange={(e) => setTempAttraction({ ...tempAttraction, description: e.target.value })}
                        className="w-full px-3 py-1.5 border border-border bg-background rounded text-xs resize-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddAttraction}
                        className="px-3 py-1.5 rounded bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30 transition-colors text-xs font-body font-medium flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Save Plan Step
                      </button>

                      {/* Display added attractions */}
                      {tourAttractionsList.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border space-y-1.5">
                          {tourAttractionsList.map((att, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-card p-2 rounded border border-border/50 text-[11px] font-body">
                              <span className="truncate flex items-center gap-1.5">
                                <span>{att.icon}</span> <strong>{att.name}</strong> {att.price && `(${att.price})`}
                              </span>
                              <button
                                type="button"
                                onClick={() => setTourAttractionsList(tourAttractionsList.filter((_, i) => i !== idx))}
                                className="text-red-500 hover:text-red-700 font-bold ml-2"
                              >
                                remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* DYNAMIC OPTIONAL EXPERIENCES LIST */}
                    <div className="border border-border/80 rounded-lg p-4 bg-secondary/30 space-y-3">
                      <h5 className="text-xs font-body font-bold uppercase text-primary">Optional Experiences / Add-ons</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <input
                          type="text"
                          placeholder="Icon"
                          value={tempOptExperience.icon}
                          onChange={(e) => setTempOptExperience({ ...tempOptExperience, icon: e.target.value })}
                          className="sm:col-span-2 px-2 py-1.5 border border-border bg-background rounded text-xs text-center"
                        />
                        <input
                          type="text"
                          placeholder="Experience Name"
                          value={tempOptExperience.name}
                          onChange={(e) => setTempOptExperience({ ...tempOptExperience, name: e.target.value })}
                          className="sm:col-span-5 px-3 py-1.5 border border-border bg-background rounded text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Pricing (e.g. Free, LKR 500)"
                          value={tempOptExperience.price}
                          onChange={(e) => setTempOptExperience({ ...tempOptExperience, price: e.target.value })}
                          className="sm:col-span-5 px-3 py-1.5 border border-border bg-background rounded text-xs"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Brief note/description (optional)..."
                        value={tempOptExperience.description}
                        onChange={(e) => setTempOptExperience({ ...tempOptExperience, description: e.target.value })}
                        className="w-full px-3 py-1.5 border border-border bg-background rounded text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddOptExperience}
                        className="px-3 py-1.5 rounded bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30 transition-colors text-xs font-body font-medium flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" /> Save Experience
                      </button>

                      {/* Display added optional */}
                      {tourOptExperiencesList.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border space-y-1.5">
                          {tourOptExperiencesList.map((opt, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-card p-2 rounded border border-border/50 text-[11px] font-body">
                              <span className="truncate flex items-center gap-1.5">
                                <span>{opt.icon}</span> <strong>{opt.name}</strong> {opt.price && `(${opt.price})`}
                              </span>
                              <button
                                type="button"
                                onClick={() => setTourOptExperiencesList(tourOptExperiencesList.filter((_, i) => i !== idx))}
                                className="text-red-500 hover:text-red-700 font-bold ml-2"
                              >
                                remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* DYNAMIC INCLUSIONS & EXCLUSIONS LISTS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Inclusions */}
                      <div className="border border-border/80 rounded-lg p-4 bg-secondary/30 space-y-2">
                        <h5 className="text-xs font-body font-bold uppercase text-emerald-600">What's Included</h5>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            placeholder="Add inclusion..."
                            value={tempInclusion}
                            onChange={(e) => setTempInclusion(e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-border bg-background rounded text-xs focus:outline-none"
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddInclusion(); } }}
                          />
                          <button
                            type="button"
                            onClick={handleAddInclusion}
                            className="px-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-xs"
                          >
                            Add
                          </button>
                        </div>
                        {tourInclusionsList.length > 0 && (
                          <div className="space-y-1 max-h-36 overflow-y-auto pt-2">
                            {tourInclusionsList.map((inc, i) => (
                              <div key={i} className="flex items-center justify-between text-[10px] font-body bg-card p-1.5 rounded border border-border/50 text-foreground">
                                <span className="truncate">{inc}</span>
                                <button type="button" onClick={() => setTourInclusionsList(tourInclusionsList.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 font-bold ml-1">x</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Exclusions */}
                      <div className="border border-border/80 rounded-lg p-4 bg-secondary/30 space-y-2">
                        <h5 className="text-xs font-body font-bold uppercase text-red-600">What's Excluded</h5>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            placeholder="Add exclusion..."
                            value={tempExclusion}
                            onChange={(e) => setTempExclusion(e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-border bg-background rounded text-xs focus:outline-none"
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddExclusion(); } }}
                          />
                          <button
                            type="button"
                            onClick={handleAddExclusion}
                            className="px-2.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                          >
                            Add
                          </button>
                        </div>
                        {tourExclusionsList.length > 0 && (
                          <div className="space-y-1 max-h-36 overflow-y-auto pt-2">
                            {tourExclusionsList.map((exc, i) => (
                              <div key={i} className="flex items-center justify-between text-[10px] font-body bg-card p-1.5 rounded border border-border/50 text-foreground">
                                <span className="truncate">{exc}</span>
                                <button type="button" onClick={() => setTourExclusionsList(tourExclusionsList.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 font-bold ml-1">x</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-primary-foreground font-body font-bold rounded-xl text-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" /> Save Complete Tour Package
                    </button>
                  </form>
                </div>

                {/* Existing Tours List */}
                <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 flex flex-col h-[fit-content] space-y-4">
                  <h4 className="font-heading font-bold text-base border-b border-border pb-3">Active Packages</h4>
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                    {/* Render static packages */}
                    {initialTours.map((tour) => (
                      <div key={tour.id} className="p-3 bg-secondary/30 border border-border rounded-lg flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Static (Locked)</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{tour.name}</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5">${tour.priceFrom} / person</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="p-2 rounded bg-muted text-[10px] font-body font-semibold text-muted-foreground flex items-center gap-1">
                            <Lock className="h-3 w-3" /> Locked
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Render custom packages */}
                    {customTours.map((tour) => (
                      <div key={tour.id} className="p-3 bg-white border border-border rounded-lg flex items-center justify-between gap-3 shadow-sm">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-primary uppercase block">Admin Custom</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{tour.name}</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5">${tour.priceFrom} / person</p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleDeleteCustomItem("traveldeal_custom_tours", tour.id, customTours, setCustomTours)}
                            className="p-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete custom package"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {customTours.length === 0 && (
                      <p className="text-xs font-body text-center text-muted-foreground py-4">No custom packages added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──── VIEW: DESTINATIONS ──── */}
          {activeTab === "destinations" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">Manage Top Destinations</h3>
                <p className="text-xs text-muted-foreground">Add new destinations that appear in the horizontal looping carousel shelf.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form to Add Destination */}
                <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 space-y-6">
                  <h4 className="font-heading font-bold text-base flex items-center gap-1.5 border-b border-border pb-3">
                    <Plus className="h-5 w-5 text-primary" /> Add New Destination
                  </h4>
                  <form onSubmit={handleAddDestSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Destination Name *</label>
                        <input
                          type="text"
                          value={destName}
                          onChange={(e) => setDestName(e.target.value)}
                          placeholder="e.g. Hikkaduwa"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Region *</label>
                        <input
                          type="text"
                          value={destRegion}
                          onChange={(e) => setDestRegion(e.target.value)}
                          placeholder="e.g. Southwest Coast"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Card Image URL</label>
                      <input
                        type="text"
                        value={destImageUrl}
                        onChange={(e) => setDestImageUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Brief Description *</label>
                      <textarea
                        value={destDescription}
                        onChange={(e) => setDestDescription(e.target.value)}
                        placeholder="Describe the beauty, style, and highlight attractions of this destination..."
                        rows={3}
                        className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Highlights / Key Landmarks (Comma separated)</label>
                      <input
                        type="text"
                        value={destHighlights}
                        onChange={(e) => setDestHighlights(e.target.value)}
                        placeholder="Beach, Coral Reefs, Surfing"
                        className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-primary-foreground font-body font-bold rounded-xl text-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" /> Save Destination
                    </button>
                  </form>
                </div>

                {/* Destinations List */}
                <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 flex flex-col h-[fit-content] space-y-4">
                  <h4 className="font-heading font-bold text-base border-b border-border pb-3">Active Destinations</h4>
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                    {/* Static list */}
                    {initialDestinations.map((dest) => (
                      <div key={dest.id} className="p-3 bg-secondary/30 border border-border rounded-lg flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Static (Locked)</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{dest.name}</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5">{dest.region}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="p-2 rounded bg-muted text-[10px] font-body font-semibold text-muted-foreground flex items-center gap-1">
                            <Lock className="h-3 w-3" /> Locked
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Custom list */}
                    {customDestinations.map((dest) => (
                      <div key={dest.id} className="p-3 bg-white border border-border rounded-lg flex items-center justify-between gap-3 shadow-sm">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-primary uppercase block">Admin Custom</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{dest.name}</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5">{dest.region}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleDeleteCustomItem("traveldeal_custom_destinations", dest.id, customDestinations, setCustomDestinations)}
                            className="p-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──── VIEW: ATTRACTIONS ──── */}
          {activeTab === "attractions" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">Manage Attractions</h3>
                <p className="text-xs text-muted-foreground">Add landmark attractions shown in the Viator-style grid layout.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form to Add Attraction */}
                <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 space-y-6">
                  <h4 className="font-heading font-bold text-base flex items-center gap-1.5 border-b border-border pb-3">
                    <Plus className="h-5 w-5 text-primary" /> Add New Attraction
                  </h4>
                  <form onSubmit={handleAddAttrSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Attraction Name *</label>
                        <input
                          type="text"
                          value={attrName}
                          onChange={(e) => setAttrName(e.target.value)}
                          placeholder="e.g. Galle Fort Lighthouse"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Type</label>
                        <input
                          type="text"
                          value={attrType}
                          onChange={(e) => setAttrType(e.target.value)}
                          placeholder="e.g. Landmark"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Location *</label>
                        <input
                          type="text"
                          value={attrLocation}
                          onChange={(e) => setAttrLocation(e.target.value)}
                          placeholder="e.g. Galle"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Image URL</label>
                        <input
                          type="text"
                          value={attrImageUrl}
                          onChange={(e) => setAttrImageUrl(e.target.value)}
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Attraction Description *</label>
                      <textarea
                        value={attrDescription}
                        onChange={(e) => setAttrDescription(e.target.value)}
                        placeholder="Write a descriptive summary of this iconic spot..."
                        rows={3}
                        className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-primary-foreground font-body font-bold rounded-xl text-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" /> Save Attraction
                    </button>
                  </form>
                </div>

                {/* Attractions List */}
                <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 flex flex-col h-[fit-content] space-y-4">
                  <h4 className="font-heading font-bold text-base border-b border-border pb-3">Active Attractions</h4>
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                    {/* Static list */}
                    {initialAttractions.map((attr) => (
                      <div key={attr.id} className="p-3 bg-secondary/30 border border-border rounded-lg flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Static (Locked)</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{attr.name}</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5">{attr.location}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="p-2 rounded bg-muted text-[10px] font-body font-semibold text-muted-foreground flex items-center gap-1">
                            <Lock className="h-3 w-3" /> Locked
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Custom list */}
                    {customAttractions.map((attr) => (
                      <div key={attr.id} className="p-3 bg-white border border-border rounded-lg flex items-center justify-between gap-3 shadow-sm">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-primary uppercase block">Admin Custom</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{attr.name}</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5">{attr.location}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleDeleteCustomItem("traveldeal_custom_attractions", attr.id, customAttractions, setCustomAttractions)}
                            className="p-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──── VIEW: TESTIMONIALS ──── */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">Manage Testimonials</h3>
                <p className="text-xs text-muted-foreground">Add verified customer reviews. Ratings automatically update floating badges and statistics.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form to Add Review */}
                <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 space-y-6">
                  <h4 className="font-heading font-bold text-base flex items-center gap-1.5 border-b border-border pb-3">
                    <Plus className="h-5 w-5 text-primary" /> Add Traveler Review
                  </h4>
                  <form onSubmit={handleAddRevSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Traveler Name *</label>
                        <input
                          type="text"
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          placeholder="e.g. John & Emma"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Home Country *</label>
                        <input
                          type="text"
                          value={revCountry}
                          onChange={(e) => setRevCountry(e.target.value)}
                          placeholder="e.g. United Kingdom"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Flag Emoji</label>
                        <input
                          type="text"
                          value={revFlag}
                          onChange={(e) => setRevFlag(e.target.value)}
                          placeholder="🇬🇧"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Rating (1 to 5 Stars)</label>
                        <select
                          value={revRating}
                          onChange={(e) => setRevRating(parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        >
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Booked Tour Name</label>
                        <input
                          type="text"
                          value={revTourName}
                          onChange={(e) => setRevTourName(e.target.value)}
                          placeholder="e.g. Sigiriya Day Tour"
                          className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-body font-medium text-muted-foreground uppercase mb-1.5">Review Content Text *</label>
                      <textarea
                        value={revText}
                        onChange={(e) => setRevText(e.target.value)}
                        placeholder="Write traveler's experience details and comment..."
                        rows={3}
                        className="w-full px-3 py-2 border border-border bg-background rounded-lg font-body text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-primary-foreground font-body font-bold rounded-xl text-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" /> Save Testimonial
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 flex flex-col h-[fit-content] space-y-4">
                  <h4 className="font-heading font-bold text-base border-b border-border pb-3">Active Reviews</h4>
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                    {/* Static list */}
                    {initialReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-secondary/30 border border-border rounded-lg flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase block">Static (Locked)</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{rev.name} ({rev.countryFlag})</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5 truncate">{rev.text}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="p-2 rounded bg-muted text-[10px] font-body font-semibold text-muted-foreground flex items-center gap-1">
                            <Lock className="h-3 w-3" /> Locked
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Custom list */}
                    {customReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-white border border-border rounded-lg flex items-center justify-between gap-3 shadow-sm">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-primary uppercase block">Admin Custom</span>
                          <h5 className="font-heading font-bold text-sm text-foreground truncate">{rev.name} ({rev.countryFlag})</h5>
                          <p className="text-[10px] font-body text-muted-foreground mt-0.5 truncate">{rev.text}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleDeleteCustomItem("traveldeal_custom_reviews", rev.id, customReviews, setCustomReviews)}
                            className="p-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──── VIEW: DATA & BACKUP SYSTEMS ──── */}
          {activeTab === "system" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">Data & Systems</h3>
                <p className="text-xs text-muted-foreground">Backup your custom items as a JSON database or restore an existing backup file.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backup / Export card */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                      <Download className="h-5 w-5 text-primary" /> Backup Database (Export JSON)
                    </h4>
                    <p className="text-xs font-body text-muted-foreground leading-relaxed">
                      Download all tours, destinations, attractions, and reviews added by the admin into a single `.json` file. 
                      You can keep this as a backup or send it to us to hardcode permanently into the site code files.
                    </p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="w-full sm:w-auto px-4 py-2.5 bg-primary text-primary-foreground font-body font-bold text-xs rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5 self-start"
                  >
                    <Download className="h-4 w-4" /> Export Backup File
                  </button>
                </div>

                {/* Import / Restore card */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                      <Upload className="h-5 w-5 text-primary" /> Restore Database (Import JSON)
                    </h4>
                    <p className="text-xs font-body text-muted-foreground leading-relaxed">
                      Upload a previously exported JSON backup file. This will restore all your custom admin packages, 
                      merging and writing them back into the browser's local memory.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="px-4 py-2.5 bg-secondary text-foreground hover:bg-secondary/80 border border-border font-body font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center">
                      <Upload className="h-4 w-4" /> Choose Backup File
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Danger Zone card */}
                <div className="bg-card border border-red-500/20 rounded-xl p-6 flex flex-col justify-between space-y-4 md:col-span-2">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-base text-red-600 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" /> Reset custom database (Clear Storage)
                    </h4>
                    <p className="text-xs font-body text-muted-foreground leading-relaxed">
                      This will wipe all custom packages added through this Admin panel. Initial static tours, 
                      destinations, and reviews will remain completely safe. This action is permanent and cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={handleClearAll}
                    className="w-full sm:w-auto px-4 py-2.5 bg-red-600 text-white font-body font-bold text-xs rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-1.5 self-start"
                  >
                    <RefreshCw className="h-4 w-4" /> Clear Custom Storage
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;

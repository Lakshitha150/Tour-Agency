/**
 * tours.ts — Central tour package data
 * 
 * All tour packages offered by Travel Deal Sri Lanka.
 * This is the single source of truth for tour information displayed across the site.
 */

export interface TourAttraction {
  icon: string;
  name: string;
  description: string;
  price?: string;
}

export interface OptionalExperience {
  icon: string;
  name: string;
  price?: string;
  description?: string;
}

export interface TourPackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  duration: string;
  durationHours: string;
  type: string[];
  pickup: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  currency: string;
  image: string;
  heroImage: string;
  flyerImage: string;
  flyerImagePriced?: string;
  vehiclePrice?: string;
  attractions: TourAttraction[];
  optionalExperiences: OptionalExperience[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  tags: string[];
  badge?: "BESTSELLER" | "NEW" | "POPULAR";
}

// Load custom tours from localStorage safely
const getCustomTours = (): TourPackage[] => {
  try {
    const custom = localStorage.getItem("traveldeal_custom_tours");
    return custom ? JSON.parse(custom) : [];
  } catch (e) {
    console.error("Failed to load custom tours", e);
    return [];
  }
};

const staticTours: TourPackage[] = [
  {
    id: "sigiriya-day-tour",
    name: "Sigiriya Day Tour",
    slug: "sigiriya-day-tour",
    tagline:
      "Discover the ancient wonder of Sri Lanka with nature, culture & adventure in one unforgettable day",
    duration: "Full Day",
    durationHours: "12–14 hours",
    type: ["Day Tour", "Cultural", "Wildlife", "Adventure"],
    pickup: "Colombo & Airport",
    rating: 4.9,
    reviewCount: 87,
    priceFrom: 89,
    currency: "USD",
    image: "/tours/sigiriya-day.jpg",
    heroImage: "/tours/sigiriya-hero.jpg",
    flyerImage: "/flyers/sigiriya-flyer.png",
    vehiclePrice: "USD 100 / Day",
    attractions: [
      {
        icon: "🏛️",
        name: "Dambulla Cave Temple",
        description:
          "Explore the magnificent cave temple with ancient Buddhist murals and statues. Over 2,000 years of history across 5 caves.",
      },
      {
        icon: "🦁",
        name: "Sigiriya Lion Rock Fortress",
        description:
          "Climb the iconic 5th-century rock fortress and enjoy breathtaking panoramic views of the surrounding plains.",
      },
      {
        icon: "🌿",
        name: "Authentic Village Experience",
        description:
          "Traditional village activities: Ox Cart Ride, Catamaran Ride in Natural Lake, Village Home Activities, Traditional Rice & Curry Lunch, and Tuk Tuk Ride.",
      },
      {
        icon: "🚙",
        name: "Wildlife Safari (3-Hour Jeep Safari)",
        description:
          "Experience wild elephants in their natural habitat at Minneriya, Kaudulla, or Hurulu Eco Park. (Jeep included, entrance tickets purchased separately).",
      },
    ],
    optionalExperiences: [
      { icon: "🐘", name: "Elephant Ride" },
      { icon: "💆", name: "Traditional Ayurvedic Massage" },
      { icon: "🌱", name: "Spicy & Herbal Garden", price: "Free Entry" },
      { icon: "🎭", name: "Traditional Dance & Cultural Show", description: "Starts at 6:00 PM" },
      { icon: "💎", name: "Gems & Jewellery Shop & Museum", price: "Free Entry" },
      { icon: "🧗", name: "Pidurangala Hiking" },
      { icon: "👕", name: "Textile & Clothes Shop" },
    ],
    highlights: [
      "Private tour — just you and your group",
      "Pick-up from Colombo or Airport",
      "Professional English-speaking driver",
      "Includes Ox-Cart, Catamaran & Tuk Tuk rides",
      "Authentic village lunch included",
      "3-hour wildlife safari in national park",
    ],
    included: [
      "Private air-conditioned vehicle",
      "Professional English-speaking chauffeur",
      "Hotel/Airport pick-up & drop-off",
      "Dambulla & Sigiriya site guiding",
      "Village experience with lunch",
      "Wildlife safari jeep & tracker",
      "Bottled water",
      "All taxes",
    ],
    notIncluded: [
      "Entrance tickets (Sigiriya, Dambulla, Safari Park)",
      "Personal expenses & tips",
      "Travel insurance",
      "Optional activities not listed",
    ],
    tags: [
      "Sigiriya",
      "LionRock",
      "Dambulla",
      "CulturalTriangle",
      "WildlifeSriLanka",
      "SriLankaDayTour",
    ],
    badge: "BESTSELLER",
  },
  {
    id: "kandy-day-tour",
    name: "Kandy Day Tour",
    slug: "kandy-day-tour",
    tagline:
      "Discover the cultural heart and beautiful scenic landmarks of Kandy in one unforgettable day",
    duration: "Full Day",
    durationHours: "12–14 hours",
    type: ["Day Tour", "Cultural", "Nature", "Heritage"],
    pickup: "Colombo Area & BIA (Airport)",
    rating: 4.8,
    reviewCount: 64,
    priceFrom: 79,
    currency: "USD",
    image: "/tours/kandy-day.jpg",
    heroImage: "/tours/kandy-hero.jpg",
    flyerImage: "/flyers/kandy-flyer.png",
    flyerImagePriced: "/flyers/kandy-flyer-prices.jpg",
    vehiclePrice: "USD 100 / Day",
    attractions: [
      {
        icon: "🐘",
        name: "Pinnawala Elephant Foundation",
        description:
          "Includes Elephant Ride, Feeding & Bathing Experience.",
        price: "USD 20 / Person",
      },
      {
        icon: "🌿",
        name: "Spice & Herbal Garden",
        description:
          "Explore traditional spices, herbs, and natural ayurvedic remedies with a free guided garden walk.",
        price: "Free Entry",
      },
      {
        icon: "🏭",
        name: "Tea Factory & Tea Plantation",
        description:
          "Walk through emerald tea plantations, watch the tea manufacturing process, and taste premium Ceylon tea.",
        price: "Free Entry",
      },
      {
        icon: "🏛️",
        name: "Temple of the Tooth Relic",
        description:
          "Sri Lanka's most sacred Buddhist temple housing the sacred tooth relic of the Buddha.",
        price: "LKR 2,000 / Person",
      },
      {
        icon: "🎭",
        name: "Traditional Kandyan Dance & Cultural Show",
        description:
          "Stunning performance featuring acrobats, fire-walking, plate spinning, and traditional drumming. Starts at 5:00 PM.",
        price: "LKR 2,000 / Person",
      },
    ],
    optionalExperiences: [
      { icon: "🌸", name: "Royal Botanical Garden (Peradeniya)", price: "LKR 2,000" },
      { icon: "💆", name: "Traditional Ayurvedic Massage", price: "Varies" },
      { icon: "☸️", name: "White Buddha Temple (Bahirawakanda)", price: "LKR 300" },
      { icon: "⛰️", name: "Nelligala Rajamaha Viharaya", price: "Free Entry" },
      { icon: "🌳", name: "Udawatta Kele Sanctuary", price: "LKR 700" },
      { icon: "💎", name: "Gems & Jewellery Museum", price: "Free Entry" },
      { icon: "🪦", name: "British Garrison Cemetery", price: "Free Entry" },
      { icon: "🏛️", name: "Lankatilaka Temple", price: "Free Entry" },
      { icon: "🪵", name: "Embekke Wood Carving Temple", price: "Free Entry" },
    ],
    highlights: [
      "Private tour — just you and your group",
      "Pick-up from Colombo or BIA Airport",
      "Professional English-speaking driver",
      "Includes Pinnawala elephant bath experience",
      "Ceylon tea tasting & garden walk included",
      "Flexible options to customize your itinerary",
    ],
    included: [
      "Private air-conditioned vehicle",
      "Professional English-speaking chauffeur",
      "Hotel/Airport pick-up & drop-off",
      "Spice garden guide tour",
      "Tea factory visit & tea tasting",
      "Bottled water & all parking/toll fees",
    ],
    notIncluded: [
      "Entrance tickets (Temple of the Tooth, Pinnawala, Botanical Garden)",
      "Lunch & refreshments",
      "Personal expenses & tips",
      "Optional activities",
    ],
    tags: [
      "Kandy",
      "TempleOfTheTooth",
      "PinnawalaElephants",
      "RoyalBotanicalGarden",
      "TeaCountry",
      "CulturalTour",
    ],
    badge: "POPULAR",
  },
];

// Proxy to dynamically combine static tours and custom tours
export const tours = new Proxy(staticTours, {
  get(target, prop, receiver) {
    const custom = getCustomTours();
    const combined = [...staticTours, ...custom];
    
    // Resolve standard array operations
    const value = Reflect.get(combined, prop, receiver);
    if (typeof value === "function") {
      return value.bind(combined);
    }
    return value;
  },
  getOwnPropertyDescriptor(target, prop) {
    const custom = getCustomTours();
    const combined = [...staticTours, ...custom];
    return Reflect.getOwnPropertyDescriptor(combined, prop);
  },
  ownKeys() {
    const custom = getCustomTours();
    const combined = [...staticTours, ...custom];
    return Reflect.ownKeys(combined);
  }
}) as unknown as TourPackage[];

/** Helper: get a tour by ID */
export const getTourById = (id: string) => tours.find((t) => t.id === id);

/** Helper: get all unique tour types */
export const getAllTourTypes = () => {
  const types = new Set<string>();
  tours.forEach((t) => t.type.forEach((ty) => types.add(ty)));
  return Array.from(types);
};

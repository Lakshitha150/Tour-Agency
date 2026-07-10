/**
 * destinations.ts — Top Sri Lanka destinations
 * 
 * Used by the TopDestinations carousel on the homepage.
 * Each destination links to filtered tours.
 */

export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  tourCount: number;
  image: string;
  highlights: string[];
}

// Load custom destinations from localStorage safely
const getCustomDestinations = (): Destination[] => {
  try {
    const custom = localStorage.getItem("traveldeal_custom_destinations");
    return custom ? JSON.parse(custom) : [];
  } catch (e) {
    console.error("Failed to load custom destinations", e);
    return [];
  }
};

const staticDestinations: Destination[] = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    region: "Cultural Triangle",
    description: "Ancient rock fortress and UNESCO World Heritage Site rising majestically above the jungle canopy.",
    tourCount: 3,
    image: "/destinations/sigiriya.png",
    highlights: ["Lion Rock Fortress", "Pidurangala Rock", "Village Experience"],
  },
  {
    id: "kandy",
    name: "Kandy",
    region: "Hill Country",
    description: "Sri Lanka's cultural capital nestled among misty hills, home to the sacred Temple of the Tooth.",
    tourCount: 3,
    image: "/destinations/kandy.png",
    highlights: ["Temple of the Tooth", "Botanical Garden", "Tea Plantations"],
  },
  {
    id: "ella",
    name: "Ella",
    region: "Tea Country",
    description: "A charming hill town surrounded by emerald tea plantations and breathtaking mountain vistas.",
    tourCount: 2,
    image: "/destinations/ella.png",
    highlights: ["Nine Arches Bridge", "Little Adam's Peak", "Tea Plantations"],
  },
  {
    id: "mirissa",
    name: "Mirissa",
    region: "Southern Coast",
    description: "A tropical paradise where golden beaches meet the deep blue sea — Sri Lanka's whale watching capital.",
    tourCount: 2,
    image: "/destinations/mirissa.png",
    highlights: ["Whale Watching", "Beach & Surfing", "Secret Beach"],
  },
  {
    id: "galle",
    name: "Galle",
    region: "Southern Coast",
    description: "A UNESCO-listed colonial fort town blending Dutch heritage with vibrant Sri Lankan culture.",
    tourCount: 2,
    image: "/destinations/galle.png",
    highlights: ["Galle Fort", "Old Town Streets", "Lighthouse"],
  },
  {
    id: "yala",
    name: "Yala",
    region: "Southeast",
    description: "Sri Lanka's premier wildlife sanctuary with the highest leopard density in the world.",
    tourCount: 2,
    image: "/destinations/yala.png",
    highlights: ["Leopard Safari", "Elephant Herds", "Bird Watching"],
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    region: "Hill Country",
    description: "Known as 'Little England' for its cool climate, colonial bungalows, and endless tea estates.",
    tourCount: 2,
    image: "/destinations/nuwara-eliya.png",
    highlights: ["Tea Estates", "Gregory Lake", "Horton Plains"],
  },
  {
    id: "trincomalee",
    name: "Trincomalee",
    region: "East Coast",
    description: "Pristine east coast beaches, ancient temples, and world-class diving in crystal-clear waters.",
    tourCount: 1,
    image: "/destinations/trincomalee.png",
    highlights: ["Nilaveli Beach", "Whale Watching", "Koneswaram Temple"],
  },
];

// Proxy to dynamically combine static destinations and custom destinations
export const destinations = new Proxy(staticDestinations, {
  get(target, prop, receiver) {
    const custom = getCustomDestinations();
    const combined = [...staticDestinations, ...custom];
    
    const value = Reflect.get(combined, prop, receiver);
    if (typeof value === "function") {
      return value.bind(combined);
    }
    return value;
  },
  getOwnPropertyDescriptor(target, prop) {
    const custom = getCustomDestinations();
    const combined = [...staticDestinations, ...custom];
    return Reflect.getOwnPropertyDescriptor(combined, prop);
  },
  ownKeys() {
    const custom = getCustomDestinations();
    const combined = [...staticDestinations, ...custom];
    return Reflect.ownKeys(combined);
  }
}) as unknown as Destination[];

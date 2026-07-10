/**
 * attractions.ts — Top Sri Lanka attractions
 *
 * Used by the TopAttractions grid on the homepage.
 * Each attraction is linked to the tours that include it.
 */

export interface Attraction {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  image: string;
  tourIds: string[]; // IDs of tours that include this attraction
}

export const attractions: Attraction[] = [
  {
    id: "sigiriya-rock",
    name: "Sigiriya Lion Rock Fortress",
    location: "Sigiriya",
    type: "UNESCO Heritage",
    description:
      "An ancient rock fortress rising 200m above the jungle. Climb 1,200 steps to reach the summit with panoramic views of the surrounding plains.",
    image: "/attractions/sigiriya-rock.jpg",
    tourIds: ["sigiriya-day-tour"],
  },
  {
    id: "temple-of-tooth",
    name: "Temple of the Tooth Relic",
    location: "Kandy",
    type: "Sacred Temple",
    description:
      "Sri Lanka's most sacred Buddhist temple, housing the relic of the tooth of the Buddha within the former royal palace complex.",
    image: "/attractions/temple-tooth.jpg",
    tourIds: ["kandy-day-tour"],
  },
  {
    id: "dambulla-caves",
    name: "Dambulla Cave Temple",
    location: "Dambulla",
    type: "UNESCO Heritage",
    description:
      "A spectacular complex of five caves with 153 Buddha statues and vibrant ancient paintings covering 2,100 square metres of ceiling.",
    image: "/attractions/dambulla-caves.jpg",
    tourIds: ["sigiriya-day-tour"],
  },
  {
    id: "pinnawala-elephants",
    name: "Pinnawala Elephant Orphanage",
    location: "Pinnawala",
    type: "Wildlife",
    description:
      "Home to over 80 orphaned elephants. Watch them bathe in the Maha Oya river and bottle-feed baby elephants at the nursery.",
    image: "/attractions/pinnawala-elephants.jpg",
    tourIds: ["kandy-day-tour"],
  },
  {
    id: "botanical-garden",
    name: "Royal Botanical Garden",
    location: "Peradeniya, Kandy",
    type: "Nature",
    description:
      "A stunning 147-acre garden with over 4,000 species of plants, including the world-famous orchid collection and giant Java fig tree.",
    image: "/attractions/botanical-garden.jpg",
    tourIds: ["kandy-day-tour"],
  },
  {
    id: "nine-arches-bridge",
    name: "Nine Arches Bridge",
    location: "Ella",
    type: "Scenic Landmark",
    description:
      "An iconic colonial-era viaduct set among lush tea plantations — one of the most photographed spots in all of Sri Lanka.",
    image: "/attractions/nine-arches.jpg",
    tourIds: [],
  },
  {
    id: "yala-national-park",
    name: "Yala National Park",
    location: "Yala",
    type: "Wildlife Safari",
    description:
      "Sri Lanka's most visited national park with the highest density of leopards in the world, plus elephants, crocodiles, and over 200 bird species.",
    image: "/attractions/yala-park.jpg",
    tourIds: [],
  },
  {
    id: "galle-fort",
    name: "Galle Fort",
    location: "Galle",
    type: "Colonial Heritage",
    description:
      "A UNESCO-listed 16th-century Portuguese and Dutch fort with charming cobblestone streets, boutique shops, and ocean-front ramparts.",
    image: "/attractions/galle-fort.jpg",
    tourIds: [],
  },
];

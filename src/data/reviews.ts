/**
 * reviews.ts — Traveler testimonials and review data
 *
 * Used by TestimonialsSection and VerifiedReviewsBadge.
 */

export interface Review {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  avatar: string;
  rating: number;
  text: string;
  tourName: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    name: "James Mitchell",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    avatar: "",
    rating: 5,
    text: "Absolutely incredible day! Our driver was professional and knowledgeable. Climbing Sigiriya at sunrise was a once-in-a-lifetime experience. The village lunch was authentic and delicious. Highly recommend!",
    tourName: "Sigiriya Day Tour",
    date: "June 2026",
  },
  {
    id: "r2",
    name: "Sarah & David Chen",
    country: "Australia",
    countryFlag: "🇦🇺",
    avatar: "",
    rating: 5,
    text: "We booked the Kandy Day Tour for our family of four. The elephant orphanage was the highlight for our kids. The botanical garden was stunning and the cultural dance show was mesmerizing. Great value!",
    tourName: "Kandy Day Tour",
    date: "May 2026",
  },
  {
    id: "r3",
    name: "Maria Schmidt",
    country: "Germany",
    countryFlag: "🇩🇪",
    avatar: "",
    rating: 5,
    text: "From airport pickup to the wildlife safari — everything was perfectly organized. We saw over 50 elephants at Minneriya! The team was responsive on WhatsApp throughout. Will book again for our next Sri Lanka trip.",
    tourName: "Sigiriya Day Tour",
    date: "April 2026",
  },
  {
    id: "r4",
    name: "Thomas Andersen",
    country: "Norway",
    countryFlag: "🇳🇴",
    avatar: "",
    rating: 4,
    text: "Wonderful cultural immersion. The Temple of the Tooth was awe-inspiring and the tea plantation visit was educational. Our driver took us to a fantastic local spot for lunch. The only reason for 4 stars is we wished we had more time at each stop.",
    tourName: "Kandy Day Tour",
    date: "March 2026",
  },
  {
    id: "r5",
    name: "Emily & Jack Wilson",
    country: "United States",
    countryFlag: "🇺🇸",
    avatar: "",
    rating: 5,
    text: "This was the best day of our entire 2-week Asia trip. Sigiriya is breathtaking and the Dambulla cave temple blew our minds. The village experience felt so genuine — not touristy at all. Couldn't recommend more!",
    tourName: "Sigiriya Day Tour",
    date: "February 2026",
  },
  {
    id: "r6",
    name: "Yuki Tanaka",
    country: "Japan",
    countryFlag: "🇯🇵",
    avatar: "",
    rating: 5,
    text: "Very professional service from booking to the actual tour. The Kandyan dance show was a beautiful cultural experience. The driver was safe and punctual. Free cancellation policy gave me peace of mind when booking.",
    tourName: "Kandy Day Tour",
    date: "January 2026",
  },
];

/** Overall aggregate rating data */
export const aggregateRating = {
  average: 4.9,
  total: 120,
  breakdown: {
    5: 98,
    4: 18,
    3: 3,
    2: 1,
    1: 0,
  },
};

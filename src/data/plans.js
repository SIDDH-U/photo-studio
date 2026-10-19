/**
 * LUMO PHOTO STUDIO — PRICING PLANS
 * Single source of truth for pricing plans used by both Desktop and Mobile pricing.
 */

export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "₹12,000",
    rawPrice: 12000,
    badge: null,
    isSignature: false,
    coverage: "2 hrs",
    editedPhotos: "50+",
    onlineGallery: true,
    video: "—",
    album: "—",
    features: [
      "2 hours coverage",
      "50+ edited photos",
      "Online gallery"
    ]
  },
  {
    id: "signature",
    name: "Signature",
    price: "₹24,000",
    rawPrice: 24000,
    badge: "Most booked",
    isSignature: true,
    coverage: "4 hrs",
    editedPhotos: "150+",
    onlineGallery: true,
    video: "Highlights reel",
    album: "—",
    features: [
      "4 hours coverage",
      "150+ edited photos",
      "Online gallery",
      "Cinematic highlights (reel)"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹42,000",
    rawPrice: 42000,
    badge: null,
    isSignature: false,
    coverage: "Full day",
    editedPhotos: "300+",
    onlineGallery: true,
    video: "Film + reel",
    album: "Optional",
    features: [
      "Full day coverage",
      "300+ edited photos",
      "Online gallery",
      "Cinematic film + reel",
      "Premium album (optional)"
    ]
  }
];

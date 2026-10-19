/**
 * LUMO PHOTO STUDIO — SINGLE SOURCE OF TRUTH (SITE CONFIG)
 * All studio details, links, contact numbers, hours, and addresses are configured here.
 * Placeholder values are marked with TODO comments.
 */

import { PLANS } from './plans';

export const SITE = {
  studioName: "LUMO Photo Studio",
  shortName: "LUMO",
  tagline: "Real smiles. Beautifully kept.",
  subline: "Candid moments. Timeless stories. Beautifully captured for a lifetime.",
  
  // Contact & Social (Digits with country code for WhatsApp)
  phone: "+91 98765 43210", // TODO: Client to provide real phone number
  phoneRaw: "+919876543210",
  whatsappNumber: "919876543210", // TODO: Client to provide real WhatsApp number
  email: "hello@lumostudio.com", // TODO: Client to provide real email

  // Location & Hours
  address: {
    street: "123 Creative Lane", // TODO: Client to provide real street address
    area: "Station Road",
    city: "Nanded",
    state: "Maharashtra",
    postalCode: "431601",
    country: "India",
    formatted: "123 Creative Lane, Nanded, Maharashtra 431601, India"
  },
  hours: "Mon – Sun • 10:00 AM – 8:00 PM", // TODO: Client to confirm studio hours
  
  // Google Maps links
  mapsUrl: "https://maps.google.com/?q=Nanded,+Maharashtra,+India",
  // Real lazy-loaded Google Maps embed for Nanded, Maharashtra
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60307.45266851659!2d77.27581179069357!3d19.14283870370425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d66bb9d31721%3A0x4389fbced6d23e16!2sNanded%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",

  // Social Links
  instagramUrl: "https://instagram.com/lumostudio.in", // TODO: Client to provide real Instagram URL
  youtubeUrl: "https://youtube.com/@lumostudio", // TODO: Client to provide real YouTube URL

  // Booking notice (empty by default; set string if studio has high season booking notice)
  bookingNote: "", // e.g. "Currently booking wedding dates for Q4 2026."

  // Stats for Hero
  stats: [
    { value: 500, suffix: "+", label: "Happy clients" },
    { value: 5, suffix: "+", label: "Years of experience" },
    { value: 1000, suffix: "+", label: "Stories told" }
  ],

  // Pricing Packages (imported from plans.js)
  pricing: PLANS
};

/**
 * Generates Schema.org LocalBusiness JSON-LD structure
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PhotographyStudio",
    "name": SITE.studioName,
    "image": "https://lumostudio.in/assets/hero-1.webp",
    "telephone": SITE.phoneRaw,
    "email": SITE.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE.address.street,
      "addressLocality": SITE.address.city,
      "addressRegion": SITE.address.state,
      "postalCode": SITE.address.postalCode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.1383",
      "longitude": "77.3210"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "₹₹",
    "url": "https://lumostudio.in",
    "sameAs": [
      SITE.instagramUrl,
      SITE.youtubeUrl
    ]
  };
}

/**
 * SINGLE SOURCE OF TRUTH (SITE CONFIG)
 * Derived cleanly from /config/studio.config.js and /config/specialty.photography.config.js.
 */

import { studioConfig } from '../../config/studio.config.js';
import { specialtyConfig } from '../../config/specialty.photography.config.js';

export const SITE = {
  studioName: studioConfig.name,
  shortName: studioConfig.shortName || studioConfig.name,
  tagline: studioConfig.heroHeadline ? `${studioConfig.heroHeadline.line1} ${studioConfig.heroHeadline.line2}` : studioConfig.tagline,
  subline: studioConfig.heroSubtext,
  heroHeadline: studioConfig.heroHeadline,
  slug: studioConfig.slug,
  
  // Contact & Social
  phone: studioConfig.phone,
  phoneRaw: studioConfig.phoneRaw,
  whatsappNumber: studioConfig.whatsappNumber,
  email: studioConfig.email,

  // Location & Hours
  address: {
    street: studioConfig.address,
    area: studioConfig.area,
    city: studioConfig.city,
    state: studioConfig.state,
    postalCode: studioConfig.pincode,
    country: studioConfig.country || "India",
    formatted: studioConfig.formattedAddress
  },
  hours: studioConfig.hours.display || `${studioConfig.hours.weekday} (weekdays), ${studioConfig.hours.weekend} (weekends)`,
  
  // Maps links
  mapsUrl: studioConfig.mapsLink,
  mapsEmbedUrl: studioConfig.embedMapUrl,

  // Social Links
  instagramUrl: studioConfig.socials?.instagram || "",
  youtubeUrl: studioConfig.socials?.youtube || "",
  facebookUrl: studioConfig.socials?.facebook || "",

  // Lead Photographer
  leadPhotographer: studioConfig.leadPhotographer,

  // Booking notice
  bookingNote: studioConfig.bookingNote || "",

  // Starting price
  startingPrice: studioConfig.startingPrice || "",

  // Stats for Hero / StatsStrip
  stats: [
    !studioConfig.stats?.happyClients?.hide && {
      value: studioConfig.stats?.happyClients?.value ?? 500,
      suffix: studioConfig.stats?.happyClients?.suffix ?? "+",
      label: studioConfig.stats?.happyClients?.label ?? "Happy clients"
    },
    !studioConfig.stats?.yearsExperience?.hide && {
      value: studioConfig.stats?.yearsExperience?.value ?? 5,
      suffix: studioConfig.stats?.yearsExperience?.suffix ?? "+",
      label: studioConfig.stats?.yearsExperience?.label ?? "Years of experience"
    },
    !studioConfig.stats?.eventsCovered?.hide && {
      value: studioConfig.stats?.eventsCovered?.value ?? 1000,
      suffix: studioConfig.stats?.eventsCovered?.suffix ?? "+",
      label: studioConfig.stats?.eventsCovered?.label ?? "Stories told"
    }
  ].filter(Boolean),

  // Raw stats object
  rawStats: studioConfig.stats,

  // Section visibility flags
  sections: studioConfig.sections,

  // Sample mode
  sampleMode: studioConfig.sampleMode,

  // Theme
  theme: studioConfig.theme,

  // Logo
  logoImage: studioConfig.logoImage,

  // Pricing Packages
  pricing: specialtyConfig.plans,

  // Hero photos
  heroPhotos: specialtyConfig.heroPhotos
};

/**
 * Generates Schema.org LocalBusiness / PhotographyBusiness JSON-LD structure
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PhotographyStudio",
    "name": SITE.studioName,
    "image": `${studioConfig.domain || ""}/assets/hero-1.webp`,
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
    "url": studioConfig.domain || "",
    "sameAs": [
      SITE.instagramUrl,
      SITE.youtubeUrl,
      SITE.facebookUrl
    ].filter(Boolean)
  };
}

export default SITE;

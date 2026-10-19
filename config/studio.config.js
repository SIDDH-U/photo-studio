/**
 * STUDIO CONFIGURATION (SINGLE EDIT FILE PER STUDIO)
 * --------------------------------------------------
 * This is the ONLY file you need to edit to customize the website for a new photo studio.
 * Specialty content (portfolio photos, categories, packages, etc.) lives in
 * /config/specialty.photography.config.js.
 */

export const studioConfig = {
  // Brand Identity
  name: "LUMO Photo Studio",
  shortName: "LUMO",
  tagline: "PHOTO STUDIO",
  heroHeadline: {
    line1: "Real smiles.",
    line2: "Beautifully kept."
  },
  heroSubtext: "Candid moments. Timeless stories. Beautifully captured for a lifetime.",
  slug: "lumo-photo-studio", // Storage keys and local identifiers

  // Contact Details (used across the site, tel: links, wa.me links, and forms)
  phone: "+91 98765 43210", // Display format
  phoneRaw: "+919876543210", // Digits with country code for tel:
  whatsappNumber: "919876543210", // Digits with country code for WhatsApp wa.me links
  email: "hello@lumostudio.com",

  // Location & Address
  address: "123 Creative Lane",
  area: "Station Road",
  city: "Nanded",
  state: "Maharashtra",
  pincode: "431601",
  country: "India",
  formattedAddress: "123 Creative Lane, Nanded, Maharashtra 431601, India",
  
  // Google Maps Links
  mapsLink: "https://maps.google.com/?q=Nanded,+Maharashtra,+India",
  // Real lazy-loaded Google Maps iframe embed
  embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60307.45266851659!2d77.27581179069357!3d19.14283870370425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1d66bb9d31721%3A0x4389fbced6d23e16!2sNanded%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",

  // Operating Hours
  hours: {
    weekday: "10:00 AM – 8:00 PM",
    weekend: "10:00 AM – 8:00 PM",
    display: "Mon – Sun • 10:00 AM – 8:00 PM"
  },

  // Online & Socials (all optional)
  domain: "https://lumostudio.in", // Canonical URL without trailing slash
  socials: {
    instagram: "https://instagram.com/lumostudio.in",
    youtube: "https://youtube.com/@lumostudio",
    facebook: ""
  },

  // Lead Photographer / Founder
  leadPhotographer: {
    name: "Arjun Verma",
    title: "Lead Photographer & Founder",
    yearsExperience: 8,
    portraitImage: "/assets/photographer.webp"
  },

  // Stats Highlights (Hero / Stats strip)
  stats: {
    show: true,
    yearsExperience: { value: 5, suffix: "+", label: "Years of experience", hide: false },
    eventsCovered: { value: 1000, suffix: "+", label: "Stories told", hide: false },
    happyClients: { value: 500, suffix: "+", label: "Happy clients", hide: false },
    rating: { value: 4.9, suffix: "★", label: "Client rating", hide: false },
    reviewCount: { value: 120, suffix: "+", label: "Verified reviews", hide: true }
  },

  // Optional starting price mention
  startingPrice: "₹12,000",

  // Theme Preset: "cream-warm" (default) | "ivory-sage" | "noir-gold" | "blush-rose"
  theme: "cream-warm",

  // Section Flags: toggle sections on or off cleanly
  sections: {
    showHero: true,
    showStats: true,
    showServices: true,     // "What we shoot"
    showPortfolio: true,    // "Best work"
    showPackages: true,     // "Pricing"
    showAbout: false,       // About / Photographer story
    showProcess: false,     // 4-step workflow
    showReviews: false,     // Client testimonials
    showFaq: false,         // Frequently asked questions
    showMap: true,          // Google Maps embed in Contact
    showBookingForm: true,  // Interactive booking form
    showInstagram: true     // Instagram quick action button
  },

  // Sample Mode: when true, portfolio, reviews, and stats display a small "Sample" label
  // When false, the labels disappear completely
  sampleMode: false,

  // Custom logo image path (e.g. "/images/studio/logo.svg"). If null, auto-generates logo from name
  logoImage: null,

  // Seasonal or special booking notice (leave empty if none)
  bookingNote: ""
};

export default studioConfig;

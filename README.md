# LUMO Photo Studio — Website

A modern, mobile-first website for **LUMO Photo Studio**, capturing candid weddings, expressive portraits, maternity & newborn, celebrations, and commercial product photography in Nanded, Maharashtra.

Built with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## Features

- **Mobile-First Design**: Optimized for mobile devices (70%+ traffic) with one-screen homepage sections, CSS scroll-snap carousels, and an intelligent auto-hiding sticky action bar.
- **Single Source of Truth**: Centralized configuration in `src/data/site.js` (branding, contact details, address, hours, maps, pricing) and `src/data/gallery.js` (portfolio categories, images, covers).
- **Portfolio & Categories**: Dedicated routes for `/work/weddings`, `/work/portraits`, `/work/maternity-newborn`, `/work/events`, `/work/products`, and full `/gallery`.
- **Lightbox**: Image lightbox with touch swipe support, keyboard shortcuts (Arrow keys, Esc), and adjacent photo preloading.
- **Direct WhatsApp Booking**: Unified booking dialog and inline contact form that auto-formats prefilled messages without needing an external backend.
- **Controlled Motion System**: Word-by-word headline reveal, slow floating collage with cursor depth parallax on desktop, and 18s rotating badge that pauses when off-screen. Full `prefers-reduced-motion` support.
- **Performance**: High quality WebP images with explicit width/height dimensions to eliminate layout shifts (CLS).
- **SEO & Schema**: Preconfigured metadata and Schema.org `PhotographyStudio` LocalBusiness JSON-LD.
- **Vercel Deployable**: Configured with `vercel.json` rewrite rules for single-page client-side routing.

---

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## License

Private / Proprietary. All rights reserved by LUMO Photo Studio.

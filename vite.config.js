import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { studioConfig } from './config/studio.config.js';

function htmlPlugin() {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      const line1 = studioConfig.heroHeadline?.line1 || "Real smiles.";
      const line2 = studioConfig.heroHeadline?.line2 || "Beautifully kept.";
      const title = `${studioConfig.name} — ${line1} ${line2} | ${studioConfig.city}`;
      const description = `${studioConfig.name} in ${studioConfig.city}, ${studioConfig.state}. Capturing candid weddings, expressive portraits, maternity & newborn, celebrations and commercial products. Real stories, beautifully kept.`;
      const ogTitle = `${studioConfig.name} — ${line1} ${line2}`;
      const ogDescription = `Candid moments. Timeless stories. Photography studio in ${studioConfig.city}, ${studioConfig.state}.`;
      const domain = studioConfig.domain || "https://lumostudio.in";
      const themeColor = studioConfig.theme === "noir-gold" ? "#121214" : "#F6F1E9";

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "PhotographyStudio",
        "name": studioConfig.name,
        "image": `${domain}/assets/hero-1.webp`,
        "telephone": studioConfig.phoneRaw,
        "email": studioConfig.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": studioConfig.address,
          "addressLocality": studioConfig.city,
          "addressRegion": studioConfig.state,
          "postalCode": studioConfig.pincode,
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
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:00"
          }
        ],
        "priceRange": "₹₹",
        "url": domain,
        "sameAs": [
          studioConfig.socials?.instagram,
          studioConfig.socials?.youtube,
          studioConfig.socials?.facebook
        ].filter(Boolean)
      };

      return html
        .replace(/<html lang="en".*?>/, `<html lang="en" data-theme="${studioConfig.theme || 'cream-warm'}">`)
        .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
        .replace(/<meta name="theme-color" content=".*?" \/>/, `<meta name="theme-color" content="${themeColor}" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${ogTitle}" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${ogDescription}" />`)
        .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${domain}" />`)
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 2)}\n    </script>`);
    }
  };
}

export default defineConfig({
  plugins: [react(), htmlPlugin()],
});

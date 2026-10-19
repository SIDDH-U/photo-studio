import imageMeta from './imageMeta.json';

export const getImageMeta = (filename) => {
  const meta = imageMeta[filename];
  if (meta) {
    return { width: meta.width, height: meta.height };
  }
  return { width: 800, height: 600 };
};

export const STUDIO_DATA = {
  name: "LUMO Photo Studio",
  tagline: "Real smiles. Beautifully kept.",
  subline: "Candid moments. Timeless stories. Beautifully captured for a lifetime.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@lumostudio.com",
  instagram: "https://instagram.com/lumostudio.in",
  address: "LUMO Photo Studio, 123 Creative Lane",
  city: "Nanded, Maharashtra, India",
  googleMapsUrl: "https://maps.google.com/?q=Nanded,+Maharashtra,+India",
  
  stats: [
    { value: "500+", label: "Happy clients" },
    { value: "5+", label: "Years of experience" },
    { value: "1000+", label: "Stories told" }
  ],

  categories: [
    {
      id: "weddings",
      title: "Weddings",
      slug: "weddings",
      tagline: "Different stories. Same love.",
      description: "Real moments. Happy people. Unforgettable stories.",
      cover: "service-weddings.webp",
      alt: "Candid Indian wedding couple smiling lovingly in traditional attire",
      photos: [
        { id: "w1", src: "service-weddings.webp", alt: "Bride and groom intimate wedding moment", span: "row-span-2" },
        { id: "w2", src: "gallery-w1.webp", alt: "Bride with gold necklace and traditional jewellery smiling", span: "" },
        { id: "w3", src: "gallery-w2.webp", alt: "Couple silhouette holding hands at dusk", span: "" },
        { id: "w4", src: "gallery-w3.webp", alt: "Hands adorned with intricate bridal henna and rings", span: "row-span-2" },
        { id: "w5", src: "gallery-1.webp", alt: "Couple romantic portrait on golden beach at sunset", span: "" },
        { id: "w6", src: "gallery-5.webp", alt: "Glowing bride in flowing veil under evening golden sun", span: "row-span-2" },
        { id: "w7", src: "gallery-w4.webp", alt: "Joyful guests dancing with sparklers at evening reception", span: "" },
        { id: "w8", src: "hero-1.webp", alt: "Happy bride and groom laughing together candidly", span: "" },
        { id: "w9", src: "hero-2.webp", alt: "Bride in red lehenga posing inside historic royal arches", span: "" },
        // extra photos for load more
        { id: "w10", src: "gallery-3.webp", alt: "Intimate whisper candid couple moment", span: "" },
        { id: "w11", src: "gallery-7.webp", alt: "Warm familial embrace at wedding reception", span: "" },
        { id: "w12", src: "hero-3.webp", alt: "Couple joyous celebration outdoors", span: "" }
      ]
    },
    {
      id: "portraits",
      title: "Portraits",
      slug: "portraits",
      tagline: "Confidence in stillness.",
      description: "For your unique story and quiet confidence.",
      cover: "service-portraits.webp",
      alt: "Serene Indian woman portrait with warm cinematic lighting",
      photos: [
        { id: "p1", src: "service-portraits.webp", alt: "Radiant female editorial portrait with soft natural light", span: "row-span-2" },
        { id: "p2", src: "gallery-p1.webp", alt: "Cinematic portrait with soft studio rim light", span: "" },
        { id: "p3", src: "gallery-p2.webp", alt: "Expressive black and white monochrome portrait", span: "" },
        { id: "p4", src: "gallery-p3.webp", alt: "Outdoor natural light candid portrait", span: "row-span-2" },
        { id: "p5", src: "gallery-p4.webp", alt: "Close-up expressive portrait photography", span: "" },
        { id: "p6", src: "gallery-p5.webp", alt: "Artistic fashion editorial portrait", span: "" },
        { id: "p7", src: "photographer.webp", alt: "Professional artist headshot portrait", span: "" },
        { id: "p8", src: "gallery-6.webp", alt: "Dusk horizon mood portrait", span: "" },
        { id: "p9", src: "avatar-warm-2.webp", alt: "Gentle natural smile headshot", span: "" },
        // extra photos for load more
        { id: "p10", src: "avatar-warm-1.webp", alt: "Warm smile candid portrait", span: "" },
        { id: "p11", src: "avatar-warm-3.webp", alt: "Studio portrait with warm tones", span: "" }
      ]
    },
    {
      id: "maternity-newborn",
      title: "Maternity & Newborn",
      slug: "maternity-newborn",
      tagline: "New chapters, tender beginnings.",
      description: "Gentle beginnings and unconditional warmth.",
      cover: "service-family.webp",
      alt: "Peacefully sleeping newborn baby wearing a warm knitted beanie",
      photos: [
        { id: "m1", src: "service-family.webp", alt: "Sleeping newborn baby wrapped softly", span: "row-span-2" },
        { id: "m2", src: "baby-feet.webp", alt: "Mother henna hands holding tiny baby feet", span: "" },
        { id: "m3", src: "laughing-child.webp", alt: "Laughing toddler in garden flowers", span: "" },
        { id: "m4", src: "gallery-f1.webp", alt: "Mother and toddler tender embrace", span: "row-span-2" },
        { id: "m5", src: "gallery-f2.webp", alt: "Gentle newborn nursery details", span: "" },
        { id: "m6", src: "gallery-f3.webp", alt: "Maternity outdoor sunset portrait", span: "" },
        { id: "m7", src: "gallery-f4.webp", alt: "Family playing in golden grass", span: "" },
        { id: "m8", src: "gallery-2.webp", alt: "Children joyful genuine laughter", span: "" },
        { id: "m9", src: "gallery-4.webp", alt: "Family pet and child candid", span: "" },
        // extra photos for load more
        { id: "m10", src: "gallery-7.webp", alt: "Warm parent embrace with baby", span: "" },
        { id: "m11", src: "hero-3.webp", alt: "Family afternoon fun outdoors", span: "" }
      ]
    },
    {
      id: "events",
      title: "Events",
      slug: "events",
      tagline: "The pulse of celebration.",
      description: "Celebrations, laughter, and high energy.",
      cover: "gallery-w4.webp",
      alt: "Night celebration with dancing crowd and sparkling festive lights",
      photos: [
        { id: "e1", src: "gallery-w4.webp", alt: "Sparkler celebration dance floor", span: "row-span-2" },
        { id: "e2", src: "gallery-w1.webp", alt: "Event guests laughing together", span: "" },
        { id: "e3", src: "gallery-w2.webp", alt: "Outdoor event ambient lights", span: "" },
        { id: "e4", src: "hero-1.webp", alt: "Couple surrounded by celebrating friends", span: "row-span-2" },
        { id: "e5", src: "gallery-7.webp", alt: "Celebration hugs and toasts", span: "" },
        { id: "e6", src: "hero-2.webp", alt: "Grand festival gathering", span: "" },
        { id: "e7", src: "gallery-2.webp", alt: "Excited crowd reactions", span: "" },
        { id: "e8", src: "gallery-w3.webp", alt: "Intricate celebration rituals", span: "" },
        { id: "e9", src: "gallery-5.webp", alt: "Grand reception entrance", span: "" },
        // extra photos for load more
        { id: "e10", src: "gallery-3.webp", alt: "Candid conversation in dim lounge", span: "" },
        { id: "e11", src: "gallery-1.webp", alt: "Sunset beach gathering", span: "" }
      ]
    },
    {
      id: "products",
      title: "Products",
      slug: "products",
      tagline: "Every detail elevated.",
      description: "Crisp commercial focus for your craft & brand.",
      cover: "service-products.webp",
      alt: "Vintage film camera on warm wooden table with soft shadow",
      photos: [
        { id: "pr1", src: "service-products.webp", alt: "Classic camera lens on wood surface", span: "row-span-2" },
        { id: "pr2", src: "prod-jewelry.webp", alt: "Luxury gold bridal jewelry details", span: "" },
        { id: "pr3", src: "prod-watch.webp", alt: "Precision timepiece commercial photography", span: "" },
        { id: "pr4", src: "gallery-prod1.webp", alt: "Minimalist product packaging shot", span: "row-span-2" },
        { id: "pr5", src: "gallery-prod2.webp", alt: "Artisan handcrafted product styling", span: "" },
        { id: "pr6", src: "gallery-prod3.webp", alt: "High end cosmetic commercial photography", span: "" },
        { id: "pr7", src: "gallery-prod4.webp", alt: "Still life studio branding composition", span: "" },
        { id: "pr8", src: "accent-camera.webp", alt: "Modern mirrorless camera on stone", span: "" },
        { id: "pr9", src: "accent-camera-dark.webp", alt: "Dark moody camera hardware close-up", span: "" },
        // extra photos for load more
        { id: "pr10", src: "accent-leaf.webp", alt: "Botanical product backdrop texture", span: "" }
      ]
    }
  ],

  bestWork: [
    {
      id: "bw1",
      number: "01 / 06",
      title: "Golden Hour Veil",
      category: "Weddings",
      src: "gallery-5.webp",
      alt: "Bride in flowing sheer veil glowing in warm sunset backlight",
      featured: true
    },
    {
      id: "bw2",
      number: "02 / 06",
      title: "Pure Innocence",
      category: "Family",
      src: "laughing-child.webp",
      alt: "Happy Indian child laughing joyfully outdoors in the sun"
    },
    {
      id: "bw3",
      number: "03 / 06",
      title: "Royal Grace",
      category: "Portraits",
      src: "service-portraits.webp",
      alt: "Radiant bride portrait with traditional jewellery"
    },
    {
      id: "bw4",
      number: "04 / 06",
      title: "Coastal Twilight",
      category: "Weddings",
      src: "gallery-1.webp",
      alt: "Couple standing lovingly on shore as sun sets"
    },
    {
      id: "bw5",
      number: "05 / 06",
      title: "Story of Forever",
      category: "Portraits",
      src: "gallery-w2.webp",
      alt: "Couple silhouette under canopy evening lights"
    },
    {
      id: "bw6",
      number: "06 / 06",
      title: "Tender Care",
      category: "Maternity",
      src: "baby-feet.webp",
      alt: "Mother hands with mehndi holding newborn baby feet"
    }
  ],

  pricingPackages: [
    {
      id: "basic",
      name: "Basic",
      price: "₹ 12,000",
      rawPrice: 12000,
      isSignature: false,
      badge: null,
      features: [
        "2 hours coverage",
        "50+ edited photos",
        "Online gallery"
      ],
      cta: "Choose plan"
    },
    {
      id: "signature",
      name: "Signature",
      price: "₹ 24,000",
      rawPrice: 24000,
      isSignature: true,
      badge: "Most booked",
      features: [
        "4 hours coverage",
        "150+ edited photos",
        "Cinematic highlights (reel)"
      ],
      cta: "Choose plan"
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹ 42,000",
      rawPrice: 42000,
      isSignature: false,
      badge: null,
      features: [
        "Full day coverage",
        "300+ edited photos",
        "Cinematic film + reel",
        "Premium album (optional)"
      ],
      cta: "Choose plan"
    }
  ]
};

/**
 * SPECIALTY CONFIGURATION: PHOTOGRAPHY
 * -------------------------------------
 * All photography-specialty details: categories, covers, portfolio galleries,
 * hero collage photos, pricing packages, process steps, FAQs, and testimonials.
 *
 * This file is kept separate from studio.config.js so a future videography,
 * newborn-only, or commercial photography studio needs only a new specialty file.
 */

export const specialtyConfig = {
  specialtyType: "photography",
  specialtyLabel: "Photography",

  // Hero Collage Photos
  heroPhotos: {
    mainFrame: {
      src: "hero-1.webp",
      alt: "Couple smiling candidly in golden sunlight",
      label: "Signature Couple Portrait"
    },
    sideFrames: [
      {
        src: "gallery-1.webp",
        alt: "Couple romantic portrait on golden beach at sunset",
        position: "top-left"
      },
      {
        src: "baby-feet.webp",
        alt: "Mother hands with mehndi holding newborn baby feet",
        position: "bottom-left"
      },
      {
        src: "laughing-child.webp",
        alt: "Happy Indian child laughing joyfully outdoors in the sun",
        position: "top-right"
      }
    ],
    filmStrip: [
      { src: "gallery-w1.webp", alt: "Bride with gold jewellery" },
      { src: "gallery-w2.webp", alt: "Couple silhouette at dusk" },
      { src: "gallery-p1.webp", alt: "Cinematic portrait rim light" },
      { src: "gallery-f1.webp", alt: "Mother and toddler embrace" },
      { src: "gallery-w3.webp", alt: "Bridal henna and rings" }
    ]
  },

  // Service Categories & Portfolios
  categories: [
    {
      slug: "weddings",
      title: "Weddings",
      tagline: "Different stories. Same love.",
      description: "Real moments. Happy people. Unforgettable stories.",
      cover: "service-weddings.webp",
      coverAlt: "Candid Indian bride and groom smiling lovingly in golden wedding sunlight",
      images: [
        { id: "w1", src: "service-weddings.webp", alt: "Bride and groom intimate candid wedding moment" },
        { id: "w2", src: "gallery-w1.webp", alt: "Bride with gold necklace and traditional jewellery smiling" },
        { id: "w3", src: "gallery-w3.webp", alt: "Hands adorned with intricate bridal henna and gold rings" },
        { id: "w4", src: "gallery-1.webp", alt: "Couple romantic portrait on golden beach at sunset" },
        { id: "w5", src: "gallery-5.webp", alt: "Glowing bride in flowing veil under evening golden sun" },
        { id: "w6", src: "hero-1.webp", alt: "Happy bride and groom laughing together candidly" },
        { id: "w7", src: "hero-2.webp", alt: "Bride in red lehenga posing inside historic royal arches" },
        { id: "w8", src: "gallery-w2.webp", alt: "Couple silhouette holding hands during beach twilight" }
      ]
    },
    {
      slug: "portraits",
      title: "Portraits",
      tagline: "Confidence in stillness.",
      description: "For your unique story and quiet confidence.",
      cover: "service-portraits.webp",
      coverAlt: "Serene Indian woman portrait with warm cinematic lighting",
      images: [
        { id: "p1", src: "service-portraits.webp", alt: "Radiant female editorial portrait with soft natural light" },
        { id: "p2", src: "gallery-p1.webp", alt: "Cinematic portrait with soft studio rim light" },
        { id: "p3", src: "gallery-p2.webp", alt: "Expressive black and white monochrome studio portrait" },
        { id: "p4", src: "gallery-p3.webp", alt: "Outdoor natural light candid portrait in nature" },
        { id: "p5", src: "gallery-p4.webp", alt: "Close-up expressive portrait photography with catchlights" },
        { id: "p6", src: "gallery-p5.webp", alt: "Artistic fashion editorial portrait with delicate styling" },
        { id: "p7", src: "photographer.webp", alt: "Creative professional headshot portrait" },
        { id: "p8", src: "gallery-6.webp", alt: "Dusk horizon contemplative portrait" },
        { id: "p9", src: "avatar-warm-1.webp", alt: "Gentle natural smile outdoor headshot portrait" }
      ]
    },
    {
      slug: "maternity-newborn",
      title: "Maternity & Newborn",
      tagline: "New chapters, tender beginnings.",
      description: "Gentle beginnings and unconditional warmth.",
      cover: "service-family.webp",
      coverAlt: "Peacefully sleeping newborn baby wearing a warm knitted beanie",
      images: [
        { id: "m1", src: "service-family.webp", alt: "Sleeping newborn baby wrapped softly in studio" },
        { id: "m2", src: "baby-feet.webp", alt: "Mother henna hands gently holding tiny baby feet" },
        { id: "m3", src: "laughing-child.webp", alt: "Laughing toddler in garden flowers with radiant smile" },
        { id: "m4", src: "gallery-f1.webp", alt: "Mother and toddler tender embrace in warm morning light" },
        { id: "m5", src: "gallery-f2.webp", alt: "Gentle newborn nursery moments and baby details" },
        { id: "m6", src: "gallery-f3.webp", alt: "Maternity outdoor sunset silhouette portrait" },
        { id: "m7", src: "gallery-f4.webp", alt: "Expectant mother walking peacefully in warm fields" },
        { id: "m8", src: "gallery-7.webp", alt: "Warm parent embrace cradling their newborn baby" }
      ]
    },
    {
      slug: "events",
      title: "Events",
      tagline: "The pulse of celebration.",
      description: "Celebrations, laughter, and high energy.",
      cover: "gallery-w4.webp",
      coverAlt: "Night celebration with dancing crowd and sparkling festive lights",
      images: [
        { id: "e1", src: "gallery-w4.webp", alt: "Sparkler celebration dance floor with ecstatic crowd" },
        { id: "e2", src: "hero-3.webp", alt: "Grand outdoor gathering celebration and cheerful toasts" },
        { id: "e3", src: "gallery-2.webp", alt: "Celebration guests sharing bursts of joyful laughter" },
        { id: "e4", src: "gallery-3.webp", alt: "Evening banquet reception in ambient warm fairy lights" },
        { id: "e5", src: "avatar-warm-2.webp", alt: "Event guest enjoying festive celebration dinner" },
        { id: "e6", src: "avatar-warm-3.webp", alt: "Festive celebration attendee sharing candid smiles" },
        { id: "e7", src: "testimonial-1.webp", alt: "Celebration attendee candid conversation moment" },
        { id: "e8", src: "testimonial-2.webp", alt: "Joyful party guest laughing with friends" },
        { id: "e9", src: "testimonial-3.webp", alt: "Festive evening social gathering snapshot" }
      ]
    },
    {
      slug: "products",
      title: "Products",
      tagline: "Every detail elevated.",
      description: "Crisp commercial focus for your craft & brand.",
      cover: "service-products.webp",
      coverAlt: "Vintage film camera on warm wooden table with soft studio shadow",
      images: [
        { id: "pr1", src: "service-products.webp", alt: "Classic camera lens on wood surface studio still life" },
        { id: "pr2", src: "prod-jewelry.webp", alt: "Luxury gold bridal jewelry detail photography" },
        { id: "pr3", src: "prod-watch.webp", alt: "Precision timepiece commercial studio showcase" },
        { id: "pr4", src: "gallery-prod1.webp", alt: "Minimalist skincare product bottle with soft lighting" },
        { id: "pr5", src: "gallery-prod2.webp", alt: "Artisan handcrafted leather accessories display" },
        { id: "pr6", src: "gallery-prod3.webp", alt: "High end cosmetic commercial beauty photography" },
        { id: "pr7", src: "gallery-prod4.webp", alt: "Branded commercial studio composition on clean background" },
        { id: "pr8", src: "accent-camera.webp", alt: "Modern mirrorless camera on textured stone surface" },
        { id: "pr9", src: "accent-camera-dark.webp", alt: "Dark moody camera hardware close-up detail" }
      ]
    }
  ],

  // Featured Best Work items for Home Page (Numbered 01 to 06)
  featuredBestWork: [
    {
      id: "bw1",
      number: "01",
      title: "Golden Hour Veil",
      category: "Weddings",
      src: "gallery-5.webp",
      alt: "Bride in flowing sheer veil glowing in warm sunset backlight"
    },
    {
      id: "bw2",
      number: "02",
      title: "Pure Innocence",
      category: "Maternity & Newborn",
      src: "laughing-child.webp",
      alt: "Happy Indian child laughing joyfully outdoors in the sun"
    },
    {
      id: "bw3",
      number: "03",
      title: "Royal Grace",
      category: "Portraits",
      src: "service-portraits.webp",
      alt: "Radiant bride portrait with traditional jewellery"
    },
    {
      id: "bw4",
      number: "04",
      title: "Coastal Twilight",
      category: "Weddings",
      src: "gallery-1.webp",
      alt: "Couple standing lovingly on shore as sun sets"
    },
    {
      id: "bw5",
      number: "05",
      title: "Story of Forever",
      category: "Weddings",
      src: "gallery-w2.webp",
      alt: "Couple silhouette holding hands during beach twilight"
    },
    {
      id: "bw6",
      number: "06",
      title: "Tender Care",
      category: "Maternity & Newborn",
      src: "baby-feet.webp",
      alt: "Mother hands with mehndi holding newborn baby feet"
    }
  ],

  // Pricing Packages
  plans: [
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
  ],

  // Studio Workflow Process Steps (for showProcess flag)
  processSteps: [
    {
      step: "01",
      title: "Consultation & Vision",
      description: "We discuss your dates, preferences, outfits, and location to curate the mood."
    },
    {
      step: "02",
      title: "The Shoot Experience",
      description: "Relaxed guidance with zero awkward poses. Real emotion, laughter, and light."
    },
    {
      step: "03",
      title: "Curated Selection",
      description: "We handpick the best shots and color grade them to our signature filmic warmth."
    },
    {
      step: "04",
      title: "Delivery & Keepsakes",
      description: "Delivered via high-res private online gallery, ready to download, share, and print."
    }
  ],

  // FAQs (for showFaq flag)
  faqs: [
    {
      question: "How far in advance should we book?",
      answer: "For weddings and major celebrations, we recommend booking 2 to 6 months in advance. Portrait and maternity shoots can usually be scheduled with 1 to 2 weeks notice."
    },
    {
      question: "Do you travel for destination shoots or events outside the city?",
      answer: "Yes, absolutely! We love destination weddings and outdoor shoots. Travel and accommodation are billed at actual cost."
    },
    {
      question: "When and how do we receive our edited photos?",
      answer: "A sneak-peek selection of 10 to 15 images is shared within 48 hours. The complete edited gallery is delivered within 2 to 3 weeks via a secure online gallery."
    },
    {
      question: "Can we request raw/unedited files?",
      answer: "We deliver every good moment carefully color-graded and retouched to reflect our signature aesthetic. Raw files are not part of our standard deliverable."
    }
  ],

  // Client Testimonials / Reviews (for showReviews flag)
  reviews: [
    {
      id: "r1",
      name: "Pooja & Nikhil",
      category: "Wedding",
      rating: 5,
      avatar: "avatar-warm-1.webp",
      quote: "They captured every fleeting, candid glance without making us pose awkwardly once. Looking back at our wedding photos feels like reliving the day."
    },
    {
      id: "r2",
      name: "Rohan Deshmukh",
      category: "Portraits",
      rating: 5,
      avatar: "avatar-warm-2.webp",
      quote: "The lighting and direction were effortless. I felt completely comfortable and the results exceeded every expectation."
    },
    {
      id: "r3",
      name: "Sneha & Amit",
      category: "Maternity",
      rating: 5,
      avatar: "avatar-warm-3.webp",
      quote: "So gentle and patient with our baby. The prints now take pride of place on our living room wall."
    }
  ],

  // About Snippet (for showAbout flag)
  about: {
    heading: "Crafting quiet memories and honest beauty",
    paragraphs: [
      "We believe photography is about how a moment felt, not just how it looked. Guided by natural light and genuine emotion, we document memories that grow richer with every passing year.",
      "Whether it is an intimate backyard wedding or a quiet newborn morning, we bring a calm, unobtrusive presence to every session."
    ]
  }
};

export default specialtyConfig;

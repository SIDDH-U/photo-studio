# Studio Swap & Customization Manual

Turn this template into a completely new, bespoke photo studio website in **under 20 minutes** from a single prompt or client info sheet.

---

## 🤖 Agent Instructions (One-Prompt Onboarding)

When an AI agent or developer is provided with a prompt or text block of studio details (e.g., from WhatsApp or email):

1. **Map Known Details**:
   - Open [`/config/studio.config.js`](file:///c:/Users/siddc/Desktop/Selling%20Websites/ALL%20FILES/photo-studio-website-demo-ready/config/studio.config.js) (the **ONLY** file edited per studio).
   - Fill in: `name`, `shortName`, `tagline`, `heroHeadline`, `heroSubtext`, `phone`, `phoneRaw`, `whatsappNumber`, `address`, `city`, `area`, `pincode`, `state`, `mapsLink`, `embedMapUrl`, `hours`, `email`, `domain`, `socials`, `leadPhotographer`, `startingPrice`, and `theme`.
2. **Handle Missing Content**:
   - If services, packages, FAQs, or reviews are missing, keep realistic photography defaults in [`/config/specialty.photography.config.js`](file:///c:/Users/siddc/Desktop/Selling%20Websites/ALL%20FILES/photo-studio-website-demo-ready/config/specialty.photography.config.js).
   - Set `sampleMode: true` in `studio.config.js` so placeholder portfolio & stats display an elegant "Sample" badge.
3. **Keep Generic Images**:
   - Retain the default high-resolution assets in `/public/assets/` unless custom photos are provided.
4. **Validate**:
   - Run `npm run build` (confirm 0 errors).
   - Run `npm run check-swap` (confirm no demo brand leaks).
5. **Report**:
   - List what was configured, which theme was applied, and clearly highlight the 2–3 items that still need client confirmation (e.g., exact GST/embed map, custom domain, or real portfolio photos).

---

## 📋 The 10-Step Swap Checklist

### 1. Duplicate Repository
Clone or copy the repository into a new folder:
```bash
git clone <source-repo> my-new-studio
cd my-new-studio
npm install
```

### 2. Edit `config/studio.config.js`
This is the single source of truth for all studio details:
```js
export const studioConfig = {
  name: "Aura Moments Studio",
  shortName: "Aura",
  city: "Pune",
  state: "Maharashtra",
  phone: "+91 98220 12345",
  phoneRaw: "+919822012345",
  whatsappNumber: "919822012345",
  // ...
};
```

### 3. Review Specialty Content (Optional)
If the studio has custom pricing or specific categories, adjust [`/config/specialty.photography.config.js`](file:///c:/Users/siddc/Desktop/Selling%20Websites/ALL%20FILES/photo-studio-website-demo-ready/config/specialty.photography.config.js). Otherwise, leave it as is.

### 4. Pick a Theme Preset
Set `theme` in `studio.config.js` to one of the 4 accessible palettes:
- `"cream-warm"`: Soft warm white, deep ink, flash yellow highlights (Default)
- `"ivory-sage"`: Clean ivory background, deep forest ink, lush botanical sage accents
- `"noir-gold"`: Rich charcoal background, champagne gold highlights, high luxury
- `"blush-rose"`: Warm blush ivory, espresso ink, terracotta rose accents

### 5. Configure Section Flags
Toggle any section `true` or `false` in `studioConfig.sections`:
```js
sections: {
  showHero: true,
  showStats: true,
  showServices: true,
  showPortfolio: true,
  showPackages: true,
  showAbout: false,
  showProcess: false,
  showReviews: false,
  showFaq: false,
  showMap: true,
  showBookingForm: true,
  showInstagram: true
}
```
*Disabled sections are completely excluded from the page, navigation bar, and footer with zero empty bands.*

### 6. Replace Studio Images (Optional)
Place client logos or founder portraits in `/public/images/studio/`:
- `logoImage`: Set path in `studio.config.js` or leave `null` for auto-typography logo.
- `photographer.webp`: Lead photographer photo.
- Keep generic category images from `/public/assets/` for rapid delivery.

### 7. Run Production Build
Ensure code compiles with 0 warnings:
```bash
npm run build
```

### 8. Run Safety Check
Verify that no leftover demo values ("LUMO", "Nanded", old phone numbers) exist in source or build output:
```bash
npm run check-swap
```

### 9. Deploy to Vercel (Zero Environment Variables Needed)

#### Option A: Via Vercel CLI
```bash
npx vercel
# Follow prompts: Link to existing project? [N], Project name? [new-studio-name]
# Deploy to production:
npx vercel --prod
```

#### Option B: Via GitHub & Vercel Dashboard
1. Create a new repository on GitHub:
   ```bash
   git remote set-url origin https://github.com/<your-username>/<new-studio>.git
   git add .
   git commit -m "feat: launch new studio site"
   git push -u origin main
   ```
2. Open [Vercel Dashboard](https://vercel.com/new).
3. Import the repository.
4. Framework Preset: **Vite** (detected automatically).
5. Environment Variables: **None required**.
6. Click **Deploy**.

### 10. Mobile QA & Client Handover
1. Open the live deployment link on a smartphone (or Chrome DevTools at **390×844**).
2. Tap "Book a shoot" → confirm WhatsApp opens with the studio's WhatsApp number and personalized message.
3. Tap "Call" → confirm phone dialer opens with `phoneRaw`.
4. Send live link to the client!

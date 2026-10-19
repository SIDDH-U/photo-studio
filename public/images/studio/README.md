# Studio Assets Guide

This directory is designated for **studio-specific visual assets** when onboarding a new photography client.

## Studio-Specific Assets

| Asset Name | Default Location / Reference | Recommended Dimensions | Description |
|---|---|---|---|
| `logo.svg` or `logo.png` | Set via `studioConfig.logoImage` in `/config/studio.config.js` | ~300×80px (transparent) | Studio logo. If omitted (`null`), the site automatically renders a styled typography logo in the brand serif font. |
| `hero-main.webp` | Referenced in `specialty.photography.config.js` (`heroPhotos.mainFrame`) | 800×1000px (4:5 portrait) | Primary focal photo featured in the Hero collage. |
| `photographer.webp` | Set via `studioConfig.leadPhotographer.portraitImage` | 600×750px (4:5 portrait) | Portrait of the founder or lead photographer. |

---

## Generic Placeholder Assets (`/public/assets/`)

The following images located in `/public/assets/` serve as versatile placeholders. You do **not** need to replace them when setting up a fast demo:

- **Category Covers**: `service-weddings.webp`, `service-portraits.webp`, `service-family.webp`, `service-products.webp`, `gallery-w4.webp`
- **Gallery Portfolios**: `gallery-1.webp` through `gallery-7.webp`, `gallery-w1.webp` through `gallery-w4.webp`, `gallery-p1.webp` through `gallery-p5.webp`, `gallery-f1.webp` through `gallery-f4.webp`, `gallery-prod1.webp` through `gallery-prod4.webp`
- **Filmstrip Reel**: `gallery-w1.webp`, `gallery-w2.webp`, `gallery-p1.webp`, `gallery-f1.webp`, `gallery-w3.webp`

---

## Image Formatting Best Practices

1. **Format**: Use **WebP** for optimal compression and rapid mobile loading (target < 150KB per image).
2. **Aspect Ratios**: Maintain consistent aspect ratios (4:5 for portraits, 3:2 for event moments, 1:1 for square details).
3. **Lazy Loading**: All images on the site include native `loading="lazy"` except above-the-fold hero assets.

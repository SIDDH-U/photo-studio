/**
 * GALLERY & CATEGORY DATA
 * Bridged from /config/specialty.photography.config.js
 * Includes dev-only data integrity validator.
 */

import { specialtyConfig } from '../../config/specialty.photography.config.js';

export const CATEGORIES = specialtyConfig.categories;
export const FEATURED_BEST_WORK = specialtyConfig.featuredBestWork;
export const HERO_PHOTOS = specialtyConfig.heroPhotos;

/**
 * DEV-ONLY DATA INTEGRITY CHECK
 * Logs errors in development if:
 * 1. An image appears in two categories
 * 2. An image appears twice in one category
 * 3. Two categories share a cover
 */
if (import.meta.env?.DEV) {
  const seenImages = new Map(); // src -> categorySlug
  const seenCovers = new Map(); // coverSrc -> categorySlug

  CATEGORIES.forEach((category) => {
    // Check shared cover
    if (seenCovers.has(category.cover)) {
      console.error(
        `[GALLERY INTEGRITY ERROR] Two categories share cover "${category.cover}": "${seenCovers.get(category.cover)}" and "${category.slug}"`
      );
    } else {
      seenCovers.set(category.cover, category.slug);
    }

    // Check duplicate images in category and across categories
    const categoryImages = new Set();
    category.images.forEach((img) => {
      if (categoryImages.has(img.src)) {
        console.error(
          `[GALLERY INTEGRITY ERROR] Image "${img.src}" appears twice in category "${category.slug}"`
        );
      } else {
        categoryImages.add(img.src);
      }

      if (seenImages.has(img.src)) {
        console.error(
          `[GALLERY INTEGRITY ERROR] Image "${img.src}" appears in two categories: "${seenImages.get(img.src)}" and "${category.slug}"`
        );
      } else {
        seenImages.set(img.src, category.slug);
      }
    });
  });
}

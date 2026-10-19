import imageMeta from './imageMeta.json';
import { SITE } from './site';
import { specialtyConfig } from '../../config/specialty.photography.config.js';

export const getImageMeta = (filename) => {
  const meta = imageMeta[filename];
  if (meta) {
    return { width: meta.width, height: meta.height };
  }
  return { width: 800, height: 600 };
};

export const STUDIO_DATA = {
  name: SITE.studioName,
  tagline: SITE.tagline,
  subline: SITE.subline,
  phone: SITE.phone,
  whatsapp: SITE.whatsappNumber,
  email: SITE.email,
  instagram: SITE.instagramUrl,
  address: SITE.address.formatted,
  city: `${SITE.address.city}, ${SITE.address.state}, ${SITE.address.country}`,
  googleMapsUrl: SITE.mapsUrl,
  stats: SITE.stats,
  categories: specialtyConfig.categories,
  bestWork: specialtyConfig.featuredBestWork,
  pricingPackages: specialtyConfig.plans
};

export default STUDIO_DATA;

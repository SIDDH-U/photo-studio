import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, Plus } from 'lucide-react';
import { CATEGORIES } from '../data/gallery';
import { getImageMeta } from '../data/studioData';
import { SITE } from '../data/site';
import SampleBadge from '../components/SampleBadge';

export default function GalleryPage({ onNavigate, onOpenBooking, onOpenLightbox }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Collect all photos from all categories
  const allPhotos = CATEGORIES.flatMap((cat) =>
    cat.images.map((img) => ({
      ...img,
      categorySlug: cat.slug,
      categoryTitle: cat.title
    }))
  );

  const filteredPhotos = selectedFilter === 'all'
    ? allPhotos
    : allPhotos.filter((p) => p.categorySlug === selectedFilter);

  const displayedPhotos = filteredPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPhotos.length;

  const handleFilterChange = (slug) => {
    setSelectedFilter(slug);
    setVisibleCount(12);
  };

  const filterOptions = [
    { slug: 'all', title: 'All Work' },
    ...CATEGORIES.map((c) => ({ slug: c.slug, title: c.title }))
  ];

  return (
    <div className="min-h-screen bg-warm-white text-ink pt-20 sm:pt-24 pb-24 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-warm-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Gallery Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5A554E]">
              CURATED PORTFOLIO
            </span>
            <SampleBadge />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-1">
            The Full Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#403D37] mt-2.5">
            Real smiles, candid gestures, and heartfelt memories captured by {SITE.studioName}.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 overflow-x-auto no-scrollbar py-2">
          {filterOptions.map((opt) => {
            const isActive = selectedFilter === opt.slug;
            return (
              <button
                key={opt.slug}
                onClick={() => handleFilterChange(opt.slug)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-pill text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-flash-yellow text-ink shadow-xs scale-105'
                    : 'bg-white hover:bg-warm-cream text-ink/80 border border-warm-border/70'
                }`}
              >
                {opt.title}
              </button>
            );
          })}
        </div>

        {/* Masonry Photo Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-3.5 space-y-3 sm:space-y-3.5">
          {displayedPhotos.map((photo, index) => {
            const meta = getImageMeta(photo.src);
            return (
              <div
                key={photo.id || index}
                onClick={() => onOpenLightbox(filteredPhotos, index)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl transition-all duration-300 card-zoom"
              >
                <img
                  src={`/assets/${photo.src}`}
                  alt={photo.alt}
                  width={meta.width}
                  height={meta.height}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />

                {/* Hover overlay with caption & maximize button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3.5 sm:p-4 card-overlay">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-flash-yellow">
                      {photo.categoryTitle}
                    </span>
                    <p className="text-xs text-white font-medium line-clamp-1 mt-0.5">
                      {photo.alt}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-flash-yellow text-ink flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Maximize2 size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="btn-interactive px-8 py-3.5 rounded-pill bg-white hover:bg-warm-cream border border-warm-border text-ink font-semibold text-sm inline-flex items-center gap-2 shadow-xs"
            >
              <Plus size={16} />
              <span>Load more photos ({filteredPhotos.length - visibleCount} remaining)</span>
            </button>
          </div>
        )}

        {/* Bottom Booking Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-card bg-ink bg-grain text-white text-center flex flex-col items-center justify-center shadow-xl">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-flash-yellow">
            LOVE WHAT YOU SEE?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">
            Let's create timeless stories together
          </h2>
          <p className="text-sm text-white/70 mt-2 max-w-md">
            Sessions in studio or on-location across {SITE.address.city} and {SITE.address.state}.
          </p>
          <button
            onClick={() => onOpenBooking('Weddings')}
            className="btn-interactive btn-yellow-sweep mt-6 px-7 py-3.5 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink font-semibold text-sm inline-flex items-center gap-2 shadow-md"
          >
            <span>Book your session</span>
            <ArrowRight size={17} className="btn-arrow transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}

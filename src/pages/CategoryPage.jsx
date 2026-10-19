import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Plus, Maximize2 } from 'lucide-react';
import { CATEGORIES } from '../data/gallery';
import { getImageMeta } from '../data/studioData';
import SampleBadge from '../components/SampleBadge';

export default function CategoryPage({ slug, onNavigate, onOpenBooking, onOpenLightbox }) {
  const currentCategory = CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
  const [visibleCount, setVisibleCount] = useState(8);

  // Find next category
  const currentCatIndex = CATEGORIES.findIndex((c) => c.slug === currentCategory.slug);
  const nextCatIndex = (currentCatIndex + 1) % CATEGORIES.length;
  const nextCategory = CATEGORIES[nextCatIndex];

  // Reset visible photos count when changing categories
  useEffect(() => {
    setVisibleCount(8);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const photos = currentCategory.images || [];
  const visiblePhotos = photos.slice(0, visibleCount);
  const hasMore = visibleCount < photos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, photos.length));
  };

  return (
    <div className="min-h-screen bg-warm-white text-ink pt-20 sm:pt-24 pb-24 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT (2 Columns: Left sticky sidebar tabs + Right Masonry gallery) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Category Info & Vertical Pills */}
          <div className="col-span-4 sticky top-28 space-y-7">
            {/* Back button */}
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-warm-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={16} />
              <span>CATEGORIES</span>
            </button>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif text-5xl font-bold text-ink tracking-tight">
                  {currentCategory.title}
                </h1>
                <SampleBadge />
              </div>
              <p className="text-sm text-[#403D37] mt-3 leading-relaxed max-w-sm">
                {currentCategory.description}
              </p>
            </div>

            {/* Vertical Pill Tabs */}
            <div className="flex flex-col gap-2.5 max-w-xs">
              {CATEGORIES.map((cat) => {
                const isActive = cat.slug === currentCategory.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => onNavigate(`/work/${cat.slug}`)}
                    className={`btn-interactive w-full text-left py-3 px-5 rounded-pill text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-flash-yellow text-ink shadow-xs'
                        : 'bg-white hover:bg-warm-cream text-ink/80 border border-warm-border/70'
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Top CTA bar (ONLY one Book this shoot on desktop) + Masonry Grid */}
          <div className="col-span-8">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-warm-border/60">
              <span className="text-xs text-[#524E47] font-normal">
                Showing {visiblePhotos.length} of {photos.length} curated moments
              </span>
              
              {/* Only ONE 'Book this shoot' CTA on desktop */}
              <button
                onClick={() => onOpenBooking(currentCategory.title)}
                className="btn-interactive btn-yellow-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink text-sm font-semibold shadow-xs"
              >
                <span>Book this shoot</span>
                <ArrowRight size={16} className="btn-arrow transition-transform" />
              </button>
            </div>

            {/* Masonry Grid with equal 12px gaps */}
            <div className="columns-2 sm:columns-3 gap-[12px] space-y-[12px]">
              {visiblePhotos.map((photo, index) => {
                const meta = getImageMeta(photo.src);
                return (
                  <div
                    key={photo.id || index}
                    onClick={() => onOpenLightbox(photos, index)}
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

                    {/* Subtle caption overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 card-overlay">
                      <p className="text-xs text-white/95 font-medium line-clamp-1">{photo.alt}</p>
                      <div className="w-8 h-8 rounded-full bg-flash-yellow text-ink flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="btn-interactive px-7 py-3 rounded-pill bg-white hover:bg-warm-cream border border-warm-border text-ink font-semibold text-sm inline-flex items-center gap-2 shadow-xs"
                >
                  <Plus size={16} />
                  <span>Load more photos</span>
                </button>
              </div>
            )}

            {/* Next Category Card at the end */}
            <div className="mt-12 pt-8 border-t border-warm-border/60">
              <button
                onClick={() => onNavigate(`/work/${nextCategory.slug}`)}
                className="w-full p-6 sm:p-8 rounded-2xl bg-white hover:bg-warm-cream/50 border border-warm-border/80 flex items-center justify-between text-left group transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-warm-muted font-semibold block">
                    Up Next
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-ink mt-0.5 group-hover:text-ink/80 transition-colors">
                    Next: {nextCategory.title} →
                  </h3>
                  <p className="text-xs text-warm-muted mt-1">
                    {nextCategory.tagline}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-flash-yellow text-ink flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <ArrowRight size={20} />
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* MOBILE LAYOUT (Back Arrow + Title + Horizontal Category Pills + 10px Gap Masonry) */}
        <div className="lg:hidden">
          
          {/* Mobile Top Bar */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 -ml-2 text-ink hover:text-warm-muted transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-ink">
                {currentCategory.title}
              </h1>
              <SampleBadge />
            </div>

            <div className="w-10" />
          </div>

          <p className="text-xs text-[#524E47] text-center mb-4 max-w-xs mx-auto">
            {currentCategory.description}
          </p>

          {/* Horizontally Scrollable Category Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2.5 mb-5 snap-x touch-pan-x">
            {CATEGORIES.map((cat) => {
              const isActive = cat.slug === currentCategory.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onNavigate(`/work/${cat.slug}`)}
                  className={`flex-shrink-0 px-4 py-2 rounded-pill text-xs font-semibold snap-start transition-colors ${
                    isActive
                      ? 'bg-flash-yellow text-ink shadow-xs'
                      : 'bg-white text-ink/80 border border-warm-border/80'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          <div className="text-center text-xs text-[#524E47] mb-3">
            Showing {visiblePhotos.length} of {photos.length} photos
          </div>

          {/* Mobile Masonry Grid with 10px gaps (2 columns) */}
          <div className="columns-2 gap-[10px] space-y-[10px]">
            {visiblePhotos.map((photo, index) => {
              const meta = getImageMeta(photo.src);
              return (
                <div
                  key={photo.id || index}
                  onClick={() => onOpenLightbox(photos, index)}
                  className="break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
                >
                  <img
                    src={`/assets/${photo.src}`}
                    alt={photo.alt}
                    width={meta.width}
                    height={meta.height}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 active:bg-black/30 transition-colors" />
                </div>
              );
            })}
          </div>

          {/* Load More Button (Mobile) */}
          {hasMore && (
            <div className="mt-6 text-center">
              <button
                onClick={handleLoadMore}
                className="w-full py-3 rounded-pill bg-white border border-warm-border text-ink text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
              >
                <Plus size={15} />
                <span>Load more ({photos.length - visibleCount} remaining)</span>
              </button>
            </div>
          )}

          {/* Next Category Card at bottom */}
          <div className="mt-8">
            <button
              onClick={() => onNavigate(`/work/${nextCategory.slug}`)}
              className="w-full p-4 rounded-xl bg-white border border-warm-border/80 flex items-center justify-between text-left active:scale-[0.98] transition-transform shadow-xs"
            >
              <div>
                <span className="text-[10px] uppercase font-semibold text-warm-muted block">Next Category</span>
                <span className="font-serif text-lg font-bold text-ink">Next: {nextCategory.title} →</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-flash-yellow text-ink flex items-center justify-center">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>

          {/* Notice: No duplicate Book This Shoot button here, as the sticky bottom bar serves this on mobile! */}
        </div>

      </div>
    </div>
  );
}

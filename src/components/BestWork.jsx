import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { FEATURED_BEST_WORK } from '../data/gallery';
import { getImageMeta } from '../data/studioData';

export default function BestWork({ onNavigate, onOpenLightbox }) {
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const carouselRef = useRef(null);
  const items = FEATURED_BEST_WORK;

  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const cardWidth = clientWidth * 0.78;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < items.length) {
      setActiveFeaturedIndex(index);
    }
  };

  const scrollToSlide = (index) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const card = container.children[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveFeaturedIndex(index);
    }
  };

  const currentActive = items[activeFeaturedIndex];

  return (
    <section 
      id="best-work"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-ink bg-grain text-white border-t border-ink-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT (Left Interactive List + Right Asymmetric Grid) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Title + Numbered Interactive List of 6 Featured Titles */}
          <div className="lg:col-span-4 flex flex-col justify-between h-[490px] pr-2">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] font-semibold text-flash-yellow">
                OUR FAVOURITES
              </span>
              <h2 className="font-serif text-4xl xl:text-5xl font-bold text-white mt-1">
                Best work
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-2 font-medium">
                PEOPLE • PLACES • REAL MOMENTS
              </p>
            </div>

            {/* Numbered List of 6 Featured Items with Progress Line and 400ms crossfade */}
            <div className="space-y-1.5 py-4">
              {items.map((item, idx) => {
                const isActive = idx === activeFeaturedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveFeaturedIndex(idx)}
                    onMouseEnter={() => setActiveFeaturedIndex(idx)}
                    className="flex items-center gap-3 w-full text-left py-2 group focus:outline-none transition-colors"
                  >
                    {/* Thin progress line */}
                    <div className={`h-[2px] transition-all duration-300 ${
                      isActive ? 'w-8 bg-flash-yellow' : 'w-3 bg-white/20 group-hover:bg-white/40'
                    }`} />
                    
                    {/* Number */}
                    <span className={`font-mono text-xs tracking-wider transition-colors ${
                      isActive ? 'text-flash-yellow font-bold' : 'text-white/40 group-hover:text-white/70'
                    }`}>
                      {item.number}
                    </span>

                    {/* Title */}
                    <span className={`font-serif text-lg transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-white/60 group-hover:text-white'
                    }`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/gallery')}
                className="btn-interactive inline-flex items-center gap-2 px-6 py-2.5 rounded-pill border border-white/20 hover:border-flash-yellow bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
              >
                <span>Open gallery</span>
                <ArrowRight size={15} className="text-flash-yellow btn-arrow transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Featured Image with 400ms crossfade + 4 Supporting Tiles */}
          <div className="lg:col-span-8 grid grid-cols-12 gap-3.5 h-[490px]">
            
            {/* Main Featured Card (Col-span-6) */}
            <div 
              onClick={() => onOpenLightbox(items, activeFeaturedIndex)}
              className="col-span-6 relative rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentActive.src}
                  src={`/assets/${currentActive.src}`}
                  alt={currentActive.alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                <div>
                  <span className="text-[11px] font-mono text-flash-yellow tracking-wider font-semibold">
                    {currentActive.number} / 06 • {currentActive.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                    {currentActive.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>

            {/* Middle Column (2 Tiles) */}
            <div className="col-span-3 flex flex-col gap-3.5">
              {/* Tile 1: Pure Innocence (laughing child) */}
              <div 
                onClick={() => onOpenLightbox(items, 1)}
                className="h-1/2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/10"
              >
                <img
                  src={`/assets/${items[1].src}`}
                  alt={items[1].alt}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-medium text-white block truncate">
                    {items[1].title}
                  </span>
                </div>
              </div>

              {/* Tile 2: Coastal Twilight */}
              <div 
                onClick={() => onOpenLightbox(items, 3)}
                className="h-1/2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/10"
              >
                <img
                  src={`/assets/${items[3].src}`}
                  alt={items[3].alt}
                  width={800}
                  height={550}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-medium text-white block truncate">
                    {items[3].title}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (2 Tiles) */}
            <div className="col-span-3 flex flex-col gap-3.5">
              {/* Tile 3: Royal Grace (Portraits) */}
              <div 
                onClick={() => onOpenLightbox(items, 2)}
                className="h-1/2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/10"
              >
                <img
                  src={`/assets/${items[2].src}`}
                  alt={items[2].alt}
                  width={800}
                  height={1200}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-medium text-white block truncate">
                    {items[2].title}
                  </span>
                </div>
              </div>

              {/* Tile 4: Story of Forever (Twilight couple) */}
              <div 
                onClick={() => onOpenLightbox(items, 4)}
                className="h-1/2 relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/10"
              >
                <img
                  src={`/assets/${items[4].src}`}
                  alt={items[4].alt}
                  width={800}
                  height={534}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-medium text-white block truncate">
                    {items[4].title}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* MOBILE LAYOUT: Scroll-Snap Swipe Carousel with max 58svh card height */}
        <div className="lg:hidden">
          
          <div className="text-center mb-5">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-flash-yellow">
              OUR FAVOURITES
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-0.5">
              Best work
            </h2>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 mt-1 font-medium">
              PEOPLE • PLACES • REAL MOMENTS
            </p>
          </div>

          {/* Swipe Carousel with peeking sides (max 58svh) */}
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 py-1 touch-pan-x"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {items.map((item, index) => {
              const meta = getImageMeta(item.src);
              const isCurrent = index === activeFeaturedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(items, index)}
                  className="flex-shrink-0 w-[78vw] sm:w-[60vw] snap-center cursor-pointer transition-all duration-300"
                >
                  <div className={`relative h-[50svh] max-h-[420px] rounded-2xl overflow-hidden border ${
                    isCurrent ? 'border-white/30 shadow-2xl scale-100' : 'border-white/10 opacity-70 scale-95'
                  } transition-all duration-300`}>
                    <img
                      src={`/assets/${item.src}`}
                      alt={item.alt}
                      width={meta.width}
                      height={meta.height}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-flash-yellow tracking-wider font-semibold">
                          {item.number} / 06 • {item.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots & 01 / 06 counter below the card, Open gallery under that */}
          <div className="mt-4 flex flex-col items-center gap-2.5">
            <span className="text-xs font-mono text-white/60">
              {items[activeFeaturedIndex]?.number || '01'} / 06
            </span>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === activeFeaturedIndex ? 'w-6 bg-flash-yellow' : 'w-1.5 bg-white/30'
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>

            {/* Open Gallery Button */}
            <button
              onClick={() => onNavigate('/gallery')}
              className="mt-2 px-6 py-2 rounded-pill border border-white/20 bg-white/5 active:bg-white/15 text-white text-xs font-semibold flex items-center gap-2"
            >
              <span>Open gallery</span>
              <ArrowRight size={14} className="text-flash-yellow" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

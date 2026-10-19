import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/gallery';
import { getImageMeta } from '../data/studioData';

export default function WhatWeShoot({ onNavigate }) {
  // Default expanded category on desktop is 'weddings'
  const [hoveredSlug, setHoveredSlug] = useState('weddings');

  return (
    <section 
      id="what-we-shoot"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-warm-white border-t border-warm-border/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-[#5A554E]">
              OUR CATEGORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-1">
              What we shoot
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#403D37] max-w-md font-normal leading-relaxed">
            Different stories. Same love. From big celebrations to quiet moments, we capture what matters most.
          </p>
        </div>

        {/* DESKTOP ACCORDION ROW (5 Cards, 480px tall, active grows to 2.2x width) */}
        <div className="hidden lg:flex gap-4 h-[480px] w-full select-none">
          {CATEGORIES.map((cat) => {
            const isHovered = hoveredSlug === cat.slug;
            const meta = getImageMeta(cat.cover);
            return (
              <div
                key={cat.slug}
                onMouseEnter={() => setHoveredSlug(cat.slug)}
                onFocus={() => setHoveredSlug(cat.slug)}
                onClick={() => onNavigate(`/work/${cat.slug}`)}
                tabIndex={0}
                aria-label={`View ${cat.title} gallery`}
                className={`relative h-full rounded-2xl overflow-hidden cursor-pointer shadow-xs transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isHovered ? 'flex-[2.2] shadow-xl' : 'flex-1'
                } group focus:outline-none`}
              >
                {/* Background Image */}
                <img
                  src={`/assets/${cat.cover}`}
                  alt={cat.coverAlt}
                  width={meta.width}
                  height={meta.height}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 ${
                    isHovered ? 'opacity-85' : 'opacity-70'
                  }`} 
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div>
                    {isHovered && (
                      <span className="text-[11px] uppercase tracking-wider text-flash-yellow font-semibold block mb-1">
                        {cat.images.length} curated photos
                      </span>
                    )}

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {cat.title}
                    </h3>

                    {/* Active Expanded Details */}
                    {isHovered && (
                      <p className="text-xs text-white/80 mt-1.5 max-w-xs line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-xs font-semibold text-white/90 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      View gallery →
                    </span>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? 'bg-flash-yellow text-ink shadow-md scale-105'
                        : 'bg-white/20 text-white'
                    }`}>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Yellow active border */}
                <div className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 pointer-events-none ${
                  isHovered ? 'border-flash-yellow/70' : 'border-transparent'
                }`} />
              </div>
            );
          })}
        </div>

        {/* MOBILE COMPACT 2-COLUMN GRID (Weddings tall row-span-2, max 520px total) */}
        <div className="lg:hidden grid grid-cols-2 gap-2.5 sm:gap-3 select-none">
          {/* Card 1: Weddings (Tall, spans 2 rows in column 1) */}
          <div
            onClick={() => onNavigate(`/work/${CATEGORIES[0].slug}`)}
            className="row-span-2 relative h-[270px] sm:h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
          >
            <img
              src={`/assets/${CATEGORIES[0].cover}`}
              alt={CATEGORIES[0].coverAlt}
              width={800}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-flash-yellow">
                {CATEGORIES[0].images.length} photos
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                {CATEGORIES[0].title}
              </h3>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[11px] text-white/80 font-medium">View gallery</span>
                <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Portraits (Row 1, column 2) */}
          <div
            onClick={() => onNavigate(`/work/${CATEGORIES[1].slug}`)}
            className="relative h-[130px] sm:h-[145px] rounded-2xl overflow-hidden cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
          >
            <img
              src={`/assets/${CATEGORIES[1].cover}`}
              alt={CATEGORIES[1].coverAlt}
              width={800}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase font-semibold tracking-wider text-flash-yellow block">
                    {CATEGORIES[1].images.length} photos
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {CATEGORIES[1].title}
                  </h3>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Maternity & Newborn (Row 2, column 2) */}
          <div
            onClick={() => onNavigate(`/work/${CATEGORIES[2].slug}`)}
            className="relative h-[130px] sm:h-[145px] rounded-2xl overflow-hidden cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
          >
            <img
              src={`/assets/${CATEGORIES[2].cover}`}
              alt={CATEGORIES[2].coverAlt}
              width={800}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase font-semibold tracking-wider text-flash-yellow block">
                    {CATEGORIES[2].images.length} photos
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                    Maternity
                  </h3>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Events (Row 3, column 1) */}
          <div
            onClick={() => onNavigate(`/work/${CATEGORIES[3].slug}`)}
            className="relative h-[125px] sm:h-[140px] rounded-2xl overflow-hidden cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
          >
            <img
              src={`/assets/${CATEGORIES[3].cover}`}
              alt={CATEGORIES[3].coverAlt}
              width={800}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase font-semibold tracking-wider text-flash-yellow block">
                    {CATEGORIES[3].images.length} photos
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {CATEGORIES[3].title}
                  </h3>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Products (Row 3, column 2) */}
          <div
            onClick={() => onNavigate(`/work/${CATEGORIES[4].slug}`)}
            className="relative h-[125px] sm:h-[140px] rounded-2xl overflow-hidden cursor-pointer shadow-xs active:scale-[0.98] transition-transform"
          >
            <img
              src={`/assets/${CATEGORIES[4].cover}`}
              alt={CATEGORIES[4].coverAlt}
              width={800}
              height={534}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[9px] uppercase font-semibold tracking-wider text-flash-yellow block">
                    {CATEGORIES[4].images.length} photos
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {CATEGORIES[4].title}
                  </h3>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

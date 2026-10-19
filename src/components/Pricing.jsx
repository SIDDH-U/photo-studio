import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';

export default function Pricing({ onOpenBooking }) {
  const packages = SITE.pricing;

  return (
    <section 
      id="pricing"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-ink bg-grain text-white border-t border-ink-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-flash-yellow">
            OUR PACKAGES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-1">
            Packages for every story
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1.5 font-medium">
            BEAUTIFUL MEMORIES • HONEST PRICING
          </p>
        </div>

        {/* DESKTOP GRID (3 Equal-Height Cards with Identical Row Structure) */}
        <div className="hidden lg:grid grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
          {packages.map((pkg) => {
            const isSignature = pkg.isSignature;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-card p-7 flex flex-col justify-between transition-all duration-300 ${
                  isSignature
                    ? 'bg-ink-card border-2 border-flash-yellow shadow-glow-yellow scale-[1.03] z-10'
                    : 'bg-ink-card/60 border border-ink-border hover:border-white/30'
                }`}
              >
                {/* Most Booked Pill Badge */}
                {isSignature && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-flash-yellow text-ink text-xs font-bold uppercase tracking-wider shadow-md">
                    Most booked
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {pkg.name}
                    </h3>
                    <div className="font-serif text-2xl font-bold text-white tracking-tight">
                      {pkg.price}
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-6" />

                  {/* Standardized Rows that line up exactly across all 3 cards */}
                  <div className="space-y-4 mb-8 text-sm">
                    {/* Row 1: Coverage */}
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-white/60 text-xs uppercase tracking-wider">Coverage</span>
                      <span className="font-medium text-white">{pkg.coverage}</span>
                    </div>

                    {/* Row 2: Edited Photos */}
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-white/60 text-xs uppercase tracking-wider">Edited Photos</span>
                      <span className="font-medium text-white">{pkg.editedPhotos}</span>
                    </div>

                    {/* Row 3: Online Gallery */}
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-white/60 text-xs uppercase tracking-wider">Online Gallery</span>
                      <span className="text-flash-yellow font-bold flex items-center gap-1">
                        <Check size={16} strokeWidth={2.5} /> Included
                      </span>
                    </div>

                    {/* Row 4: Video */}
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-white/60 text-xs uppercase tracking-wider">Cinematic Video</span>
                      <span className={`font-medium ${pkg.video !== '—' ? 'text-white' : 'text-white/30'}`}>
                        {pkg.video}
                      </span>
                    </div>

                    {/* Row 5: Album */}
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-white/60 text-xs uppercase tracking-wider">Printed Album</span>
                      <span className={`font-medium ${pkg.album !== '—' ? 'text-white' : 'text-white/30'}`}>
                        {pkg.album}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onOpenBooking('Weddings', pkg.name)}
                  className={`btn-interactive w-full py-3 px-5 rounded-pill font-semibold text-sm flex items-center justify-center gap-2 ${
                    isSignature
                      ? 'bg-flash-yellow hover:bg-flash-hover text-ink shadow-md btn-yellow-sweep'
                      : 'bg-white/5 hover:bg-white/15 text-white border border-white/20'
                  }`}
                >
                  <span>Choose {pkg.name}</span>
                  <ArrowRight size={16} className="btn-arrow transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* MOBILE COMPARISON BLOCK (All 3 plans visible at once, NO swiping, max 560px) */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="grid grid-cols-3 rounded-2xl bg-ink-card/40 border border-ink-border overflow-hidden p-2 sm:p-3 relative shadow-xl">
            
            {/* Columns */}
            {packages.map((pkg) => {
              const isSignature = pkg.isSignature;
              return (
                <div
                  key={pkg.id}
                  className={`flex flex-col justify-between p-2.5 sm:p-3 rounded-xl transition-all ${
                    isSignature
                      ? 'bg-ink-card border-2 border-flash-yellow shadow-md relative z-10'
                      : 'border border-transparent'
                  }`}
                >
                  {/* Most Booked Tag for Signature */}
                  {isSignature && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-flash-yellow text-ink text-[9px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xs">
                      Most booked
                    </div>
                  )}

                  {/* Header & Price */}
                  <div className="text-center pt-1 pb-2 border-b border-white/10">
                    <span className="text-[11px] font-semibold text-white/70 block uppercase tracking-wider">
                      {pkg.name}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-white block mt-0.5">
                      {pkg.price}
                    </span>
                  </div>

                  {/* Rows with Small Captions and Centered Values */}
                  <div className="py-2.5 space-y-2 text-center">
                    {/* Coverage */}
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Coverage</span>
                      <span className="text-xs font-medium text-white">{pkg.coverage}</span>
                    </div>

                    {/* Photos */}
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Photos</span>
                      <span className="text-xs font-medium text-white">{pkg.editedPhotos}</span>
                    </div>

                    {/* Gallery */}
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Gallery</span>
                      <span className="text-xs text-flash-yellow font-bold inline-flex justify-center">✓</span>
                    </div>

                    {/* Video */}
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Video</span>
                      <span className={`text-[11px] font-medium leading-tight block ${
                        pkg.video !== '—' ? 'text-white' : 'text-white/30'
                      }`}>
                        {pkg.video === 'Highlights reel' ? 'Reel' : pkg.video}
                      </span>
                    </div>

                    {/* Album */}
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Album</span>
                      <span className={`text-[11px] font-medium block ${
                        pkg.album !== '—' ? 'text-white' : 'text-white/30'
                      }`}>
                        {pkg.album}
                      </span>
                    </div>
                  </div>

                  {/* Choose Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => onOpenBooking('Weddings', pkg.name)}
                      className={`w-full py-2 px-1 rounded-pill text-[11px] sm:text-xs font-semibold active:scale-95 transition-transform ${
                        isSignature
                          ? 'bg-flash-yellow text-ink shadow-xs'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Choose
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Package Link (Below Pricing Block) */}
        <div className="mt-6 sm:mt-8 text-center">
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20LUMO%2C%20I'd%20like%20to%20discuss%20a%20custom%20photography%20package.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-flash-yellow transition-colors font-medium underline underline-offset-4"
          >
            <MessageCircle size={15} className="text-flash-yellow" />
            <span>Custom package? Message us on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}

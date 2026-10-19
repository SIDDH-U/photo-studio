import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { PLANS } from '../data/plans';
import { SITE } from '../data/site';
import SampleBadge from './SampleBadge';

export default function Pricing({ onOpenBooking, onPricingCtaInViewChange }) {
  // If section flag is false, skip cleanly
  if (SITE.sections?.showPackages === false) {
    return null;
  }

  // Mobile selected plan: Signature by default
  const [selectedMobilePlanId, setSelectedMobilePlanId] = useState('signature');
  const mobileCtaRef = useRef(null);

  // Monitor when Mobile Pricing CTA is in view to hide the sticky bottom bar
  useEffect(() => {
    if (!mobileCtaRef.current || !onPricingCtaInViewChange) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onPricingCtaInViewChange(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(mobileCtaRef.current);
    return () => observer.disconnect();
  }, [onPricingCtaInViewChange]);

  const selectedPlan = PLANS.find((p) => p.id === selectedMobilePlanId) || PLANS[1];

  // Radiogroup keyboard arrow navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % PLANS.length;
      setSelectedMobilePlanId(PLANS[nextIndex].id);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + PLANS.length) % PLANS.length;
      setSelectedMobilePlanId(PLANS[prevIndex].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedMobilePlanId(PLANS[index].id);
    }
  };

  return (
    <section 
      id="pricing"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-ink bg-grain text-white border-t border-ink-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-flash-yellow">
              OUR PACKAGES
            </span>
            <SampleBadge light={true} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-1">
            Packages for every story
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1.5 font-medium">
            BEAUTIFUL MEMORIES • HONEST PRICING
          </p>
        </div>

        {/* DESKTOP GRID (3 Equal-Height Cards with Identical Row Structure, Signature 1.03 Scale) */}
        <div className="hidden lg:grid grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
          {PLANS.map((pkg) => {
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

        {/* MOBILE PRICING: Selectable Plan Rows in Radiogroup (<1024px) */}
        <div className="lg:hidden max-w-lg mx-auto">
          <div 
            role="radiogroup" 
            aria-label="Photography pricing packages" 
            className="space-y-3"
          >
            {PLANS.map((plan, index) => {
              const isSelected = selectedMobilePlanId === plan.id;
              // Summary from first three features joined with ' · '
              const summaryText = plan.features.slice(0, 3).join(' · ');

              return (
                <div
                  key={plan.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedMobilePlanId(plan.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-full text-left rounded-2xl p-4 sm:p-5 transition-all duration-250 cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'bg-ink-card border-2 border-flash-yellow shadow-glow-yellow-sm'
                      : 'bg-ink-card/60 border border-ink-border hover:border-white/25 min-h-[82px] sm:min-h-[88px] flex flex-col justify-center'
                  }`}
                >
                  {/* Top Row: Radio Dot + Name + Badge + Price */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Radio Dot Indicator */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'border-flash-yellow bg-ink' : 'border-white/40 bg-transparent'
                      }`}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-flash-yellow" />
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-serif text-[20px] font-bold text-white tracking-tight">
                          {plan.name}
                        </span>
                        {plan.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-flash-yellow text-ink text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xs">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price in Serif 22px */}
                    <div className="font-serif text-[22px] font-bold text-white tracking-tight">
                      {plan.price}
                    </div>
                  </div>

                  {/* One-Line Summary at 14px (always visible) */}
                  <p className="text-[14px] text-white/70 mt-1 pl-8 leading-snug truncate font-normal">
                    {summaryText}
                  </p>

                  {/* Expanded Checklist for Selected Plan (250ms ease) */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-white/10 pl-8 space-y-2">
                          {plan.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-[15px] text-white/90">
                              <Check size={16} className="text-flash-yellow flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                              <span className="leading-snug">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Full-Width Yellow CTA Button Following Selection */}
          <div ref={mobileCtaRef} className="mt-5 space-y-3">
            <button
              onClick={() => onOpenBooking('Weddings', selectedPlan.name)}
              className="btn-interactive btn-yellow-sweep w-full py-3.5 px-6 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink font-semibold text-base flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
            >
              <span>Book {selectedPlan.name} plan</span>
              <ArrowRight size={17} className="btn-arrow transition-transform" />
            </button>

            {/* Custom package WhatsApp link */}
            <div className="text-center pt-1">
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi ${SITE.shortName}, I'd like to discuss a custom package.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] text-white/80 hover:text-flash-yellow transition-colors font-medium underline underline-offset-4"
              >
                <MessageCircle size={15} className="text-flash-yellow" />
                <span>Custom package? Message us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Custom Package Link for Desktop */}
        <div className="hidden lg:block mt-8 text-center">
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi ${SITE.shortName}, I'd like to discuss a custom package.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-flash-yellow transition-colors font-medium underline underline-offset-4"
          >
            <MessageCircle size={15} className="text-flash-yellow" />
            <span>Custom package? Message us on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}

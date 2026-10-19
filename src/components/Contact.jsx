import React, { useEffect, useRef } from 'react';
import { Phone, Navigation, Clock, MapPin } from 'lucide-react';
import { SITE } from '../data/site';
import { InstagramIcon, WhatsAppIcon } from './SocialIcons';
import BookingForm from './BookingForm';

export default function Contact({ onContactInViewChange }) {
  const sectionRef = useRef(null);

  // Monitor when contact section is in viewport to notify parent to hide mobile sticky bar
  useEffect(() => {
    if (!sectionRef.current || !onContactInViewChange) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onContactInViewChange(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onContactInViewChange]);

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-warm-white text-ink border-t border-warm-border/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-6 sm:mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5A554E]">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mt-1">
            Let's make memories
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[#403D37] mt-1.5 font-medium">
            WE'D LOVE TO HEAR FROM YOU.
          </p>
        </div>

        {/* MOBILE LAYOUT (Heading -> 3 Quick Buttons -> Shared Form -> Info Card) */}
        <div className="lg:hidden space-y-6">
          {/* Row of 3 Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-warm-border/70 shadow-xs active:scale-95 transition-transform"
              aria-label="Call studio"
            >
              <div className="w-9 h-9 rounded-full bg-warm-cream flex items-center justify-center text-ink">
                <Phone size={17} />
              </div>
              <span className="text-[11px] font-semibold text-ink mt-1.5">Call</span>
            </a>

            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi ${SITE.shortName}, I'd like to inquire about a photoshoot.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-warm-border/70 shadow-xs active:scale-95 transition-transform"
              aria-label="Chat on WhatsApp"
            >
              <div className="w-9 h-9 rounded-full bg-green-50 text-green-700 flex items-center justify-center">
                <WhatsAppIcon size={17} />
              </div>
              <span className="text-[11px] font-semibold text-ink mt-1.5">WhatsApp</span>
            </a>

            {SITE.sections?.showInstagram !== false && SITE.instagramUrl && (
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-warm-border/70 shadow-xs active:scale-95 transition-transform"
                aria-label="View Instagram"
              >
                <div className="w-9 h-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                  <InstagramIcon size={17} />
                </div>
                <span className="text-[11px] font-semibold text-ink mt-1.5">Instagram</span>
              </a>
            )}
          </div>

          {/* Shared Booking Form (Inline Mode) */}
          {SITE.sections?.showBookingForm !== false && (
            <div>
              <BookingForm inline={true} />
            </div>
          )}

          {/* Compact Info Card (No iframe on mobile) */}
          <div className="bg-white p-5 rounded-2xl border border-warm-border/70 shadow-xs space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-ink flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-bold text-ink">{SITE.studioName}</h4>
                <p className="text-xs text-[#524E47] leading-relaxed mt-0.5">
                  {SITE.address.formatted}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-warm-border/40">
              <Clock size={16} className="text-[#524E47] flex-shrink-0" />
              <p className="text-xs text-[#524E47]">{SITE.hours}</p>
            </div>

            <div className="pt-2">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-warm-cream/70 hover:bg-warm-cream text-ink text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Navigation size={14} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT (2 Columns: Left Form Inline + Right Real Maps Embed & Info) */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Shared Booking Form Inline (col-span-6) */}
          <div className="col-span-6">
            <BookingForm inline={true} />
          </div>

          {/* Right Column: Google Maps Embed + Info & Action Buttons (col-span-6) */}
          <div className="col-span-6 bg-white p-7 rounded-card border border-warm-border/70 shadow-xs flex flex-col justify-between">
            {/* Real Google Maps Embed (Lazy Loaded) */}
            {SITE.sections?.showMap !== false && SITE.mapsEmbedUrl && (
              <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-warm-border/60 mb-5">
                <iframe
                  title={`${SITE.studioName} Location`}
                  src={SITE.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Address & Hours */}
            <div className="space-y-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5A554E]">
                  Studio Location
                </span>
                <h3 className="font-serif text-xl font-bold text-ink mt-0.5">
                  {SITE.studioName}
                </h3>
                <p className="text-sm text-[#4A463F] mt-1 leading-relaxed">
                  {SITE.address.formatted}
                </p>
                <p className="text-xs text-[#5A554E] mt-1">
                  {SITE.hours}
                </p>
              </div>

              {/* Action Buttons: Get Directions + Call + WhatsApp + Instagram */}
              <div className="pt-3 border-t border-warm-border/50 flex items-center justify-between gap-3">
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-interactive py-2.5 px-5 rounded-pill bg-ink hover:bg-ink/80 text-white text-xs font-semibold flex items-center gap-2"
                >
                  <Navigation size={14} />
                  <span>Get directions</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="w-9 h-9 rounded-full bg-warm-cream hover:bg-flash-yellow flex items-center justify-center text-ink transition-colors"
                    aria-label="Call studio"
                  >
                    <Phone size={16} />
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-warm-cream hover:bg-green-100 flex items-center justify-center text-ink hover:text-green-700 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={16} />
                  </a>
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-warm-cream hover:bg-pink-100 flex items-center justify-center text-ink hover:text-pink-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={16} />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

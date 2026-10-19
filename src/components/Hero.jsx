import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';
import { getImageMeta } from '../data/studioData';

function CountUpNumber({ target, suffix = "", inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    const duration = 800; // 800ms as required

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [inView, target]);

  return <span>{count}{suffix}</span>;
}

export default function Hero({ onOpenBooking, onNavigate }) {
  const headlineWords = ["Real", "smiles.", "Beautifully", "kept."];
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const metaHero = getImageMeta('hero-1.webp');
  const metaChild = getImageMeta('laughing-child.webp');
  const metaFeet = getImageMeta('baby-feet.webp');
  const metaSunset = getImageMeta('gallery-1.webp');

  // Pause loops when hero is off-screen using IntersectionObserver
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Desktop mouse parallax shift (6-10px depth shift)
  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[calc(100svh-56px)] lg:min-h-[min(100svh,820px)] lg:max-h-[820px] flex flex-col justify-center pt-16 sm:pt-20 pb-6 sm:pb-8 bg-warm-white overflow-hidden"
    >
      {/* Background Soft Yellow Radial Glow */}
      <div 
        className="absolute top-1/4 right-0 lg:right-1/4 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-flash-yellow/20 blur-[90px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Editorial Headline & Actions (Desktop Left, Mobile Order-2) */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            
            {/* Tagline eyebrow */}
            <div className="hidden sm:inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5A554E]">
                PHOTOS • PEOPLE • STORIES
              </span>
            </div>

            {/* Headline with word-by-word reveal (~60ms stagger) */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-[3.8rem] font-bold tracking-tight text-ink leading-[1.08] sm:leading-[1.12]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + i * 0.06, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="inline-block mr-2 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subline darkened to at least 4.5:1 contrast on #F6F1E9 */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2.5 sm:mt-4 text-[#3E3C38] text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed font-normal"
            >
              {SITE.subline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3"
            >
              {/* Primary Flash Yellow Button */}
              <button
                onClick={() => onOpenBooking('Weddings')}
                className="btn-interactive btn-yellow-sweep px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink text-sm sm:text-base font-semibold shadow-xs inline-flex items-center gap-2"
                id="hero-book-cta"
              >
                <span>Book a shoot</span>
                <ArrowRight size={17} className="btn-arrow transition-transform" />
              </button>

              {/* Secondary Outline Pill Button */}
              <button
                onClick={() => scrollToSection('what-we-shoot')}
                className="btn-interactive px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-pill bg-white/90 hover:bg-white text-ink border border-warm-border text-sm sm:text-base font-medium shadow-xs inline-flex items-center gap-2"
                id="hero-see-work-cta"
              >
                <span>See our work</span>
                <div className="w-5 h-5 rounded-full bg-ink text-white flex items-center justify-center text-[10px]">
                  <ArrowRight size={11} />
                </div>
              </button>
            </motion.div>

            {/* Compact Stats Row with 800ms Count-Up */}
            <div className="mt-5 sm:mt-8 pt-4 border-t border-warm-border/70 grid grid-cols-3 gap-2 sm:gap-6 max-w-md">
              {SITE.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-ink tracking-tight">
                    <CountUpNumber target={stat.value} suffix={stat.suffix} inView={isHeroInView} />
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#524E47] mt-0.5 leading-tight font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Overlapping Tilted Collage (Mobile Top ~40svh, Desktop Right) */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 py-2 sm:py-4">
            
            {/* Collage Container (Scales down gracefully on shorter screens <700px height) */}
            <div className="relative w-[280px] sm:w-[380px] md:w-[420px] lg:w-[460px] h-[34svh] max-h-[290px] sm:h-[380px] sm:max-h-[380px] lg:h-[430px] select-none scale-90 sm:scale-100 origin-center transition-transform">
              
              {/* 1. Diagonal Film Strip - Starts safely BELOW header, 40s loop */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 0)`
                }}
                className={`absolute top-4 sm:top-2 -left-6 sm:-left-10 z-0 film-strip py-1 px-3 rounded-sm flex items-center gap-2 shadow-xl origin-center pointer-events-none animate-film-drift transition-transform duration-200 ${
                  !isHeroInView ? 'paused-animation' : ''
                }`}
              >
                <div className="w-12 sm:w-16 h-10 sm:h-12 bg-stone-900 border border-stone-700 overflow-hidden flex-shrink-0">
                  <img src="/assets/gallery-w1.webp" alt="film reel frame 1" className="w-full h-full object-cover opacity-75" />
                </div>
                <div className="w-12 sm:w-16 h-10 sm:h-12 bg-stone-900 border border-stone-700 overflow-hidden flex-shrink-0">
                  <img src="/assets/gallery-w2.webp" alt="film reel frame 2" className="w-full h-full object-cover opacity-75" />
                </div>
                <div className="w-12 sm:w-16 h-10 sm:h-12 bg-stone-900 border border-stone-700 overflow-hidden flex-shrink-0">
                  <img src="/assets/gallery-p1.webp" alt="film reel frame 3" className="w-full h-full object-cover opacity-75" />
                </div>
              </div>

              {/* 2. Top-Left Frame: Outdoor Sunset Couple (Depth: 7px) */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * 7}px, ${mouseOffset.y * 7}px, 0)`
                }}
                className="absolute top-2 sm:top-3 left-0 sm:left-2 z-10 w-24 sm:w-32 md:w-36 aspect-[4/5] bg-white p-1.5 sm:p-2 rounded-xl shadow-md border border-warm-border/60 animate-float-3 transition-transform duration-200"
              >
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img
                    src="/assets/gallery-1.webp"
                    alt="Couple enjoying golden sunset"
                    width={metaSunset.width}
                    height={metaSunset.height}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 3. Center Main Frame: Joyful Wedding Couple (Depth: 10px) */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * 10}px, ${mouseOffset.y * 10}px, 0)`
                }}
                className="absolute top-4 sm:top-6 left-12 sm:left-20 md:left-24 z-20 w-36 sm:w-52 md:w-58 lg:w-64 aspect-[3/4] bg-white p-2 sm:p-3 rounded-2xl shadow-xl border border-warm-border/70 animate-float-1 transition-transform duration-200"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <img
                    src="/assets/hero-1.webp"
                    alt="Joyful wedding couple smiling candidly"
                    width={metaHero.width}
                    height={metaHero.height}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* 4. Top-Right Frame: Laughing Child (Depth: 8px) */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px, 0)`
                }}
                className="absolute top-2 sm:top-4 right-1 sm:right-4 md:right-6 z-30 w-24 sm:w-32 aspect-square bg-white p-1.5 sm:p-2 rounded-xl shadow-lg border border-warm-border/60 animate-float-2 transition-transform duration-200"
              >
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img
                    src="/assets/laughing-child.webp"
                    alt="Laughing child outdoors with bright smile"
                    width={metaChild.width}
                    height={metaChild.height}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 5. Bottom-Left Frame: Henna Hands with Newborn Feet (Depth: 9px) */}
              <div
                style={{
                  transform: `translate3d(${mouseOffset.x * 9}px, ${mouseOffset.y * 9}px, 0)`
                }}
                className="absolute bottom-1 sm:bottom-2 left-4 sm:left-8 md:left-10 z-30 w-24 sm:w-32 aspect-square bg-white p-1.5 sm:p-2 rounded-xl shadow-lg border border-warm-border/60 animate-float-3 transition-transform duration-200"
              >
                <div className="w-full h-full overflow-hidden rounded-lg">
                  <img
                    src="/assets/baby-feet.webp"
                    alt="Newborn baby feet gently held in hands with intricate mehndi henna"
                    width={metaFeet.width}
                    height={metaFeet.height}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 6. Rotating Circular "Book Now" Badge (18s per turn loop, pauses off-screen) */}
              <div
                onClick={() => onOpenBooking('Weddings')}
                className={`absolute bottom-4 sm:bottom-8 right-6 sm:right-12 z-40 w-18 sm:w-22 md:w-24 h-18 sm:h-22 md:h-24 rounded-full bg-flash-yellow shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform flex items-center justify-center group ${
                  !isHeroInView ? 'paused-animation' : ''
                }`}
                aria-label="Click to book a shoot"
                title="Click to book a shoot"
              >
                {/* Rotating Circular Text SVG (18s linear infinite) */}
                <div className={`absolute inset-0 flex items-center justify-center animate-badge-rotate pointer-events-none ${
                  !isHeroInView ? 'paused-animation' : ''
                }`}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      id="heroBadgePath"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="none"
                    />
                    <text className="text-[10px] font-bold tracking-[0.24em] fill-ink uppercase">
                      <textPath href="#heroBadgePath" startOffset="0%">
                        BOOK NOW • BOOK NOW • BOOK NOW •
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* Central Arrow */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ink text-flash-yellow flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </div>
              </div>

              {/* 7. Script Calligraphy Badge "More than Photos" */}
              <div className="hidden sm:block absolute -top-4 right-1 z-40 transform -rotate-12 pointer-events-none">
                <span className="font-script text-2xl sm:text-3xl text-ink/75 font-bold drop-shadow-xs">
                  More than Photos
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

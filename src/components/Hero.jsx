import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE } from '../data/site';
import { getImageMeta } from '../data/studioData';

export default function Hero({ onOpenBooking, onNavigate }) {
  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  
  // Cursor light for desktop with lerp
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });
  const targetPos = useRef({ x: -300, y: -300 });
  const currentPos = useRef({ x: -300, y: -300 });
  const collageRef = useRef(null);
  const heroRef = useRef(null);

  const mainPhoto = SITE.heroPhotos?.mainFrame || { src: 'hero-1.webp', alt: 'Joyful wedding couple smiling candidly' };
  const sidePhoto1 = SITE.heroPhotos?.sideFrames?.[0] || { src: 'gallery-1.webp', alt: 'Couple enjoying golden sunset' };
  const sidePhoto2 = SITE.heroPhotos?.sideFrames?.[1] || { src: 'baby-feet.webp', alt: 'Newborn baby feet' };
  const sidePhoto3 = SITE.heroPhotos?.sideFrames?.[2] || { src: 'laughing-child.webp', alt: 'Laughing child outdoors' };
  const filmStripList = SITE.heroPhotos?.filmStrip || [
    { src: "gallery-w1.webp", alt: "film reel frame 1" },
    { src: "gallery-w2.webp", alt: "film reel frame 2" },
    { src: "gallery-p1.webp", alt: "film reel frame 3" },
    { src: "gallery-f1.webp", alt: "film reel frame 4" },
    { src: "gallery-w3.webp", alt: "film reel frame 5" }
  ];

  const metaHero = getImageMeta(mainPhoto.src);
  const metaChild = getImageMeta(sidePhoto3.src);
  const metaFeet = getImageMeta(sidePhoto2.src);
  const metaSunset = getImageMeta(sidePhoto1.src);

  // Pause all animation loops when hero is off-screen or tab is hidden
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);

    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const shouldAnimate = isHeroInView && isTabVisible;

  // Desktop cursor light with lerp (0.08)
  useEffect(() => {
    let animId;
    const lerp = 0.08;

    const animateCursor = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;
      setCursorPos({ x: currentPos.current.x, y: currentPos.current.y });
      animId = requestAnimationFrame(animateCursor);
    };

    animId = requestAnimationFrame(animateCursor);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    if (!collageRef.current) return;
    const rect = collageRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    targetPos.current = { x: -400, y: -400 };
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[calc(100svh-56px)] lg:h-[min(100svh,880px)] lg:max-h-[880px] flex items-center pt-16 sm:pt-20 pb-4 lg:pb-0 bg-warm-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text Column (5/12 on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-2 sm:pt-0">
            
            {/* Tagline pill */}
            <div className="hidden sm:inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5A554E]">
                PHOTOS • PEOPLE • STORIES
              </span>
            </div>

            {/* Headline on exactly two lines with explicit breaks & no orphan words */}
            <h1 className="font-serif font-bold tracking-tight text-ink leading-[1.05]">
              <span 
                className="block whitespace-nowrap"
                style={{ fontSize: 'clamp(30px, 9vw, 44px)' }}
              >
                {SITE.heroHeadline?.line1 || "Real smiles."}
              </span>
              <span 
                className="block whitespace-nowrap"
                style={{ fontSize: 'clamp(30px, 9vw, 44px)' }}
              >
                {SITE.heroHeadline?.line2 || "Beautifully kept."}
              </span>
            </h1>

            {/* Darkened subline for >= 4.5:1 contrast */}
            <p className="mt-2.5 sm:mt-4 text-[#3E3C38] text-sm sm:text-base lg:text-lg max-w-md leading-relaxed font-normal">
              {SITE.subline}
            </p>

            {/* CTAs */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3">
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
            </div>

          </div>

          {/* RIGHT COLUMN: Bigger Photo Collage (7/12 on Desktop, Bleeds off Right Edge) */}
          <div 
            ref={collageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 relative flex items-center justify-center order-1 lg:order-2 py-1 lg:py-0 lg:-mr-16 xl:-mr-24 overflow-visible select-none"
          >
            {/* 1. TRAVELLING LIGHT: Radial Glow (60vmin wide, drifts slowly 16s) */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full pointer-events-none -z-0 ${
                shouldAnimate ? 'animate-glow-drift' : ''
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(255,197,49,0.35) 0%, rgba(255,197,49,0.15) 45%, transparent 70%)'
              }}
              aria-hidden="true"
            />

            {/* 2. TRAVELLING LIGHT: Cursor light spot on desktop with hover */}
            <div
              className="hidden lg:block absolute pointer-events-none z-30 w-[260px] h-[260px] rounded-full blur-2xl transition-opacity duration-300"
              style={{
                left: `${cursorPos.x - 130}px`,
                top: `${cursorPos.y - 130}px`,
                background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
                opacity: cursorPos.x > -100 ? 1 : 0
              }}
              aria-hidden="true"
            />

            {/* Collage Container:
                Mobile: w-screen -mx-4 height ~46svh
                Desktop: height ~78vh (min 560px, max 760px), bleeding right
            */}
            <div className="relative w-screen -mx-4 sm:w-[480px] sm:mx-auto lg:w-full lg:mx-0 h-[46svh] min-h-[300px] max-h-[390px] sm:h-[420px] lg:h-[78vh] lg:min-h-[560px] lg:max-h-[760px] overflow-visible">
              
              {/* 3. Diagonal Film Strip: Rotated -12deg, running behind main frame and extending past right edge */}
              <div
                className={`absolute top-[18%] sm:top-[22%] -left-8 sm:-left-12 lg:-left-24 z-0 film-strip py-1 px-4 rounded-sm flex items-center gap-3 shadow-xl origin-center pointer-events-none ${
                  shouldAnimate ? 'animate-film-drift-12' : ''
                }`}
                style={{ width: 'clamp(550px, 68vw, 1100px)' }}
              >
                {filmStripList.map((frame, idx) => (
                  <div key={idx} className="w-14 sm:w-20 lg:w-28 h-10 sm:h-14 lg:h-20 bg-stone-900 border border-stone-700 overflow-hidden flex-shrink-0">
                    <img src={`/assets/${frame.src}`} alt={frame.alt || `film frame ${idx + 1}`} className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>

              {/* 4. Top-Left Frame: Outdoor Sunset Couple (Side frame ~60% of main frame) */}
              <div className="absolute top-[4%] sm:top-[6%] left-[3%] sm:left-[6%] lg:left-[4%] z-10 w-[34vw] sm:w-[150px] lg:w-[clamp(210px,18vw,330px)] aspect-[4/5] bg-white p-1.5 sm:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl shadow-lg border border-warm-border/60 animate-float-3 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl">
                  <img
                    src={`/assets/${sidePhoto1.src}`}
                    alt={sidePhoto1.alt}
                    width={metaSunset.width}
                    height={metaSunset.height}
                    className="w-full h-full object-cover"
                  />
                  {/* Glint effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className={`absolute inset-0 w-[60%] h-[150%] -top-[25%] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-[15deg] ${
                      shouldAnimate ? 'animate-glint-side1' : ''
                    }`} />
                  </div>
                </div>
              </div>

              {/* 5. Center Main Frame: Joyful Wedding Couple (Width: 62vw mobile, clamp(360px, 29vw, 560px) desktop, 4:5 ratio) */}
              <div className="absolute top-[8%] sm:top-[10%] left-[22%] sm:left-[26%] lg:left-[24%] z-20 w-[62vw] sm:w-[270px] lg:w-[clamp(360px,29vw,560px)] aspect-[4/5] bg-white p-2 sm:p-3 lg:p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-warm-border/80 animate-float-1 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src={`/assets/${mainPhoto.src}`}
                    alt={mainPhoto.alt}
                    width={metaHero.width}
                    height={metaHero.height}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Glint effect (starts first) */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className={`absolute inset-0 w-[60%] h-[150%] -top-[25%] bg-gradient-to-r from-transparent via-white/35 to-transparent transform -skew-x-[15deg] ${
                      shouldAnimate ? 'animate-glint-main' : ''
                    }`} />
                  </div>
                </div>

                {/* 7. Rotating Circular "Book Now" Badge (88px mobile, 120px desktop) overlapping bottom-right corner */}
                <div
                  onClick={() => onOpenBooking('Weddings')}
                  className={`absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 z-40 w-[88px] sm:w-[100px] lg:w-[120px] h-[88px] sm:h-[100px] lg:h-[120px] rounded-full bg-flash-yellow shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform flex items-center justify-center group ${
                    !shouldAnimate ? 'paused-animation' : ''
                  }`}
                  aria-label="Click to book a shoot"
                  title="Click to book a shoot"
                >
                  {/* Rotating Circular Text SVG with textPath */}
                  <div className={`absolute inset-0 flex items-center justify-center animate-badge-rotate pointer-events-none ${
                    !shouldAnimate ? 'paused-animation' : ''
                  }`}>
                    <svg viewBox="0 0 120 120" className="w-full h-full">
                      <defs>
                        <path
                          id="badgeCirclePath"
                          d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                        />
                      </defs>
                      <text className="text-[10px] font-bold tracking-[0.24em] fill-ink uppercase">
                        <textPath href="#badgeCirclePath" startOffset="0%">
                          BOOK NOW • BOOK NOW • BOOK NOW •
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Central Arrow Button */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-ink text-flash-yellow flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </div>
                </div>

              </div>

              {/* 6. Top-Right Frame: Laughing Child Portrait (Clearly larger than before: ~60% of main frame) */}
              <div className="absolute top-[6%] sm:top-[8%] right-[2%] sm:right-[4%] lg:-right-4 z-25 w-[34vw] sm:w-[150px] lg:w-[clamp(210px,18vw,330px)] aspect-square bg-white p-1.5 sm:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl shadow-xl border border-warm-border/60 animate-float-2 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl">
                  <img
                    src={`/assets/${sidePhoto3.src}`}
                    alt={sidePhoto3.alt}
                    width={metaChild.width}
                    height={metaChild.height}
                    className="w-full h-full object-cover"
                  />
                  {/* Glint effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className={`absolute inset-0 w-[60%] h-[150%] -top-[25%] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-[15deg] ${
                      shouldAnimate ? 'animate-glint-side2' : ''
                    }`} />
                  </div>
                </div>
              </div>

              {/* 8. Bottom-Left Frame: Henna Hands with Newborn Feet (Side frame ~60% of main frame) */}
              <div className="absolute bottom-[2%] sm:bottom-[4%] left-[6%] sm:left-[10%] lg:left-[8%] z-25 w-[32vw] sm:w-[140px] lg:w-[clamp(190px,16vw,300px)] aspect-square bg-white p-1.5 sm:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl shadow-lg border border-warm-border/60 animate-float-3 overflow-hidden">
                <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl">
                  <img
                    src={`/assets/${sidePhoto2.src}`}
                    alt={sidePhoto2.alt}
                    width={metaFeet.width}
                    height={metaFeet.height}
                    className="w-full h-full object-cover"
                  />
                  {/* Glint effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className={`absolute inset-0 w-[60%] h-[150%] -top-[25%] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-[15deg] ${
                      shouldAnimate ? 'animate-glint-side3' : ''
                    }`} />
                  </div>
                </div>
              </div>

              {/* 9. Script Calligraphy "More than Photos" - Placed safely BELOW the collage on the left, never overlapping photos */}
              <div className="hidden lg:block absolute -bottom-6 left-4 z-30 transform -rotate-6 pointer-events-none">
                <span className="font-script text-3xl xl:text-4xl text-ink/70 font-bold drop-shadow-xs">
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

import React, { useState, useEffect, useRef } from 'react';
import { SITE } from '../data/site';

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

export default function StatsStrip() {
  const [inView, setInView] = useState(false);
  const stripRef = useRef(null);

  useEffect(() => {
    if (!stripRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={stripRef}
      id="stats-strip"
      className="w-full py-4 sm:py-6 bg-warm-cream/50 border-y border-warm-border/60 relative z-20"
      aria-label="Studio highlights and stats"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-3xl mx-auto text-center divide-x divide-warm-border/70">
          {SITE.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center px-2 sm:px-4">
              <span className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
                <CountUpNumber target={stat.value} suffix={stat.suffix} inView={inView} />
              </span>
              <span className="text-[11px] sm:text-xs text-[#524E47] font-medium mt-0.5 sm:mt-1 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

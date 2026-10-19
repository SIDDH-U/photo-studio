import React from 'react';
import { SITE } from '../data/site';

export default function SampleBadge({ className = "", light = false }) {
  if (!SITE.sampleMode) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider select-none ${
        light
          ? 'bg-white/15 text-white/90 border border-white/20'
          : 'bg-ink/10 text-ink/70 border border-ink/15'
      } ${className}`}
      title="Sample placeholder content"
    >
      Sample
    </span>
  );
}

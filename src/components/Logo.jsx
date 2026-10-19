import React from 'react';
import { SITE } from '../data/site';
import { studioConfig } from '../../config/studio.config.js';

export default function Logo({ isLight = false, className = "" }) {
  if (studioConfig.logoImage) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={studioConfig.logoImage}
          alt={SITE.studioName}
          className="h-9 w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col text-left group ${className}`}>
      <span className={`font-serif text-2xl font-bold tracking-tight transition-colors ${
        isLight ? 'text-white' : 'text-ink group-hover:text-ink/80'
      }`}>
        {SITE.shortName || SITE.studioName}
      </span>
      {studioConfig.tagline && (
        <span className={`text-[9px] uppercase tracking-[0.25em] font-medium -mt-1 ${
          isLight ? 'text-white/50' : 'text-warm-muted'
        }`}>
          {studioConfig.tagline}
        </span>
      )}
    </div>
  );
}

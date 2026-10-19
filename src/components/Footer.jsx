import React from 'react';
import { SITE } from '../data/site';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons';
import Logo from './Logo';

export default function Footer({ onNavigate }) {
  const scrollTo = (id) => {
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="w-full bg-warm-white border-t border-warm-border/70 py-8 sm:py-12 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-warm-border/60">
          
          {/* Logo & Subtitle */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="text-xs text-[#524E47] mt-1.5 max-w-xs">
              Capturing heartfelt smiles and quiet elegance in {SITE.address.city}, {SITE.address.state}.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-ink/80">
            {SITE.sections?.showPortfolio !== false && (
              <button onClick={() => scrollTo('best-work')} className="hover:text-ink transition-colors">
                Work
              </button>
            )}
            {SITE.sections?.showServices !== false && (
              <button onClick={() => scrollTo('what-we-shoot')} className="hover:text-ink transition-colors">
                Categories
              </button>
            )}
            {SITE.sections?.showPackages !== false && (
              <button onClick={() => scrollTo('pricing')} className="hover:text-ink transition-colors">
                Pricing
              </button>
            )}
            <button onClick={() => scrollTo('contact')} className="hover:text-ink transition-colors">
              Contact
            </button>
            {SITE.sections?.showPortfolio !== false && (
              <button onClick={() => onNavigate('/gallery')} className="hover:text-ink transition-colors">
                Full Gallery
              </button>
            )}
          </div>

          {/* Social Icons (Instagram, WhatsApp, YouTube) */}
          <div className="flex items-center gap-3">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-warm-cream flex items-center justify-center text-ink hover:bg-flash-yellow transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-warm-cream flex items-center justify-center text-ink hover:bg-green-100 hover:text-green-700 transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={16} />
            </a>
            <a
              href={SITE.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-warm-cream flex items-center justify-center text-ink hover:bg-red-100 hover:text-red-600 transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon size={16} />
            </a>
          </div>

        </div>

        {/* One Clean Copyright Line */}
        <div className="pt-5 text-center text-xs text-[#5A554E]">
          © {new Date().getFullYear()} {SITE.studioName}. {SITE.address.city}, {SITE.address.state}, {SITE.address.country}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

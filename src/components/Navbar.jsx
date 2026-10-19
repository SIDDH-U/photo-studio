import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '../data/site';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons';

export default function Navbar({ onNavigate, currentPath, onOpenBooking, isMenuOpen, setIsMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll detection: solid background after scrolling, hide on down / show on up for mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // On mobile screens: hide on scroll down, show on scroll up
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY.current + 5) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY.current - 5) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, setIsMenuOpen]);

  const handleLinkClick = (e, path, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const menuLinks = [
    { label: "Work", sectionId: "best-work" },
    { label: "Categories", sectionId: "what-we-shoot" },
    { label: "Pricing", sectionId: "pricing" },
    { label: "Contact", sectionId: "contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'
        } ${
          scrolled
            ? 'bg-warm-white border-b border-warm-border/60 py-3 shadow-xs'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={(e) => handleLinkClick(e, '/', null)}
            className="flex flex-col text-left group"
            aria-label="LUMO Photo Studio Home"
          >
            <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-ink group-hover:text-ink/80 transition-colors">
              {SITE.shortName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-warm-muted -mt-1">
              PHOTO STUDIO
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#best-work"
              onClick={(e) => handleLinkClick(e, '/', 'best-work')}
              className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              Work
            </a>
            <a
              href="#what-we-shoot"
              onClick={(e) => handleLinkClick(e, '/', 'what-we-shoot')}
              className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              Categories
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleLinkClick(e, '/', 'pricing')}
              className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '/', 'contact')}
              className="text-sm font-medium text-ink/80 hover:text-ink transition-colors"
            >
              Contact
            </a>

            {/* Desktop CTA Button */}
            <button
              onClick={() => onOpenBooking('Weddings')}
              className="btn-interactive btn-yellow-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink text-sm font-semibold shadow-xs"
            >
              <span>Book a shoot</span>
              <ArrowRight size={16} className="btn-arrow transition-transform" />
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-ink hover:text-ink/70 transition-colors focus:outline-none"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Full-Screen Ink Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink bg-grain text-white flex flex-col justify-between p-6 sm:p-8 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  {SITE.shortName}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-white/50 -mt-1">
                  PHOTO STUDIO
                </span>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Large Serif Links (60ms Stagger) */}
            <nav className="flex flex-col gap-5 my-auto py-6">
              {menuLinks.map((link, idx) => (
                <motion.div
                  key={link.sectionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                >
                  <a
                    href={`#${link.sectionId}`}
                    onClick={(e) => handleLinkClick(e, '/', link.sectionId)}
                    className="font-serif text-3xl sm:text-4xl font-bold text-white/90 hover:text-flash-yellow transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: menuLinks.length * 0.06 }}
              >
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigate('/gallery');
                  }}
                  className="font-serif text-3xl sm:text-4xl font-bold text-white/90 hover:text-flash-yellow transition-colors text-left"
                >
                  Full Gallery
                </button>
              </motion.div>
            </nav>

            {/* Bottom Actions inside Menu */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenBooking('Weddings');
                }}
                className="w-full py-3.5 px-6 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink font-semibold text-base flex items-center justify-center gap-2 shadow-sm btn-yellow-sweep active:scale-[0.98]"
              >
                <span>Book a shoot</span>
                <ArrowRight size={18} />
              </button>

              <div className="flex items-center justify-between text-xs text-white/60 pt-1">
                <span>Nanded, Maharashtra</span>
                <div className="flex items-center gap-3">
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-flash-yellow transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon size={16} />
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-flash-yellow transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={16} />
                  </a>
                  <a
                    href={SITE.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-flash-yellow transition-colors"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

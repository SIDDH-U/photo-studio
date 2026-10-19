import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { WhatsAppIcon } from './SocialIcons';

export default function StickyMobileBar({
  isVisible,
  isContactInView,
  isPricingCtaInView = false,
  isModalOpen,
  isMenuOpen,
  onOpenBooking,
  currentCategory = 'Weddings'
}) {
  // Only show when hero CTA has scrolled out of view, and hide if contact, pricing CTA, modal, or menu is open
  const shouldShow = isVisible && !isContactInView && !isPricingCtaInView && !isModalOpen && !isMenuOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 p-3 md:hidden bg-warm-white/95 border-t border-warm-border/70 shadow-lg safe-area-bottom"
        >
          <div className="flex items-center gap-2.5 max-w-md mx-auto">
            {/* Yellow Main Action Button */}
            <button
              onClick={() => onOpenBooking(currentCategory)}
              className="btn-interactive btn-yellow-sweep flex-1 py-3 px-5 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink font-semibold text-sm flex items-center justify-center gap-2 shadow-xs active:scale-97"
              aria-label="Book a shoot"
            >
              <span>Book a shoot</span>
              <ArrowRight size={16} className="btn-arrow transition-transform" />
            </button>

            {/* Round WhatsApp Chat Button */}
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20LUMO%20Studio%2C%20I'd%20like%20to%20inquire%20about%20booking%20a%20shoot.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center shadow-md active:scale-95 transition-transform flex-shrink-0"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon size={20} className="text-white" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

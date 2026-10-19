import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { getImageMeta } from '../data/studioData';
import { SITE } from '../data/site';

export default function Lightbox({ isOpen, onClose, images, currentIndex, onNext, onPrev, onBook }) {
  const touchStartX = useRef(0);

  // Preload neighbouring photos (previous & next)
  useEffect(() => {
    if (!isOpen || !images || images.length === 0) return;

    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    const nextIndex = (currentIndex + 1) % images.length;

    if (images[prevIndex]?.src) {
      const imgPrev = new Image();
      imgPrev.src = `/assets/${images[prevIndex].src}`;
    }
    if (images[nextIndex]?.src) {
      const imgNext = new Image();
      imgNext.src = `/assets/${images[nextIndex].src}`;
    }
  }, [isOpen, images, currentIndex]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  // Touch swipe support (left / right swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 45) {
      onPrev(); // Swiped right -> go to previous
    } else if (deltaX < -45) {
      onNext(); // Swiped left -> go to next
    }
  };

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const meta = getImageMeta(currentImage.src);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xs p-3 sm:p-6 select-none"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X size={22} />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-50 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium tracking-wider">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Previous Button (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-transform active:scale-95"
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-transform active:scale-95"
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>

        {/* Main Image Container with smooth scale-in */}
        <motion.div
          key={currentImage.src}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={`/assets/${currentImage.src}`}
            alt={currentImage.alt || 'Photography showcase'}
            width={meta.width}
            height={meta.height}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
          />

          {/* Caption & Book Shoot CTA */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 w-full max-w-xl px-2">
            <p className="text-white/85 text-xs sm:text-sm font-medium line-clamp-2">
              {currentImage.alt || currentImage.title || SITE.studioName}
            </p>
            {onBook && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBook(currentImage);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-flash-yellow text-ink text-xs font-semibold hover:bg-flash-hover transition-transform active:scale-95"
              >
                <Calendar size={13} />
                <span>Book this style</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

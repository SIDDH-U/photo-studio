import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { SITE } from '../data/site';

const SHOOT_TYPES = [
  "Weddings",
  "Portraits",
  "Maternity & Newborn",
  "Events",
  "Products"
];

export default function BookingForm({
  inline = false,
  isOpen = false,
  onClose,
  initialType = "Weddings",
  initialPlan = null
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shootType, setShootType] = useState(initialType || 'Weddings');
  const [preferredDate, setPreferredDate] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || null);

  // Field blur and validation errors
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const modalRef = useRef(null);

  // Reset or initialize state when opening dialog
  useEffect(() => {
    if (initialType) setShootType(initialType);
    if (initialPlan) setSelectedPlan(initialPlan);
    if (!inline && isOpen) {
      setSubmitted(false);
      setNameError('');
      setPhoneError('');
    }
  }, [isOpen, initialType, initialPlan, inline]);

  // Focus trap, Escape key, and body scroll lock for modal
  useEffect(() => {
    if (inline || !isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [inline, isOpen, onClose]);

  const todayStr = new Date().toISOString().split('T')[0];

  const validateName = (val) => {
    if (!val.trim()) {
      setNameError('Please enter your name');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePhone = (val) => {
    const digitsOnly = val.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    // Allow digits and spaces, max 10 digits
    const cleaned = raw.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);

    if (!isNameValid || !isPhoneValid) return;

    // Build message:
    // "Hi {studio}, I'm {name}. I'd like to book a {type} shoot{ on date}{ ({plan} plan)}. My number: +91 {phone}"
    let datePart = preferredDate ? ` on ${preferredDate}` : '';
    let planPart = selectedPlan ? ` (${selectedPlan} plan)` : '';
    
    const message = `Hi ${SITE.shortName}, I'm ${name.trim()}. I'd like to book a ${shootType} shoot${datePart}${planPart}. My number: +91 ${phone.trim()}`;
    const targetUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    setWhatsappUrl(targetUrl);
    setSubmitted(true);

    // Open WhatsApp
    const timer = setTimeout(() => {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 900);

    return () => clearTimeout(timer);
  };

  const formFields = (
    <div>
      {/* Optional Booking Note from site.js */}
      {SITE.bookingNote && (
        <div className="mb-4 p-3 rounded-xl bg-flash-light/80 border border-flash-yellow/40 text-xs text-ink flex items-center gap-2">
          <AlertCircle size={15} className="text-ink flex-shrink-0" />
          <span>{SITE.bookingNote}</span>
        </div>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Field 1: Name (Required) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-1">
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
              onBlur={() => validateName(name)}
              placeholder="e.g. Priya Sharma"
              className={`w-full px-4 py-2.5 sm:py-3 bg-white border rounded-xl text-ink text-sm sm:text-base focus:outline-none transition-colors ${
                nameError ? 'border-red-400 bg-red-50/20' : 'border-warm-border'
              }`}
            />
            {nameError && (
              <p className="text-xs text-red-600 mt-1 font-medium">{nameError}</p>
            )}
          </div>

          {/* Field 2: Phone Number (Required, Fixed +91 prefix, 10 digits) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-1">
              Phone number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="px-3.5 py-2.5 sm:py-3 bg-warm-cream/70 border border-r-0 border-warm-border rounded-l-xl text-ink text-sm sm:text-base font-semibold select-none">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={() => validatePhone(phone)}
                placeholder="10-digit number"
                className={`w-full px-4 py-2.5 sm:py-3 bg-white border rounded-r-xl text-ink text-sm sm:text-base focus:outline-none transition-colors ${
                  phoneError ? 'border-red-400 bg-red-50/20' : 'border-warm-border'
                }`}
              />
            </div>
            {phoneError && (
              <p className="text-xs text-red-600 mt-1 font-medium">{phoneError}</p>
            )}
          </div>

          {/* Field 3: Shoot Type (5 Tappable Chips, single-select) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-1.5">
              Shoot Category
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {SHOOT_TYPES.map((type) => {
                const isSelected = shootType === type;
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setShootType(type)}
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-flash-yellow text-ink font-semibold shadow-xs'
                        : 'bg-warm-cream/50 text-ink/80 hover:bg-warm-cream border border-warm-border/60'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Field 4: Preferred Date (Optional, Native Date Input, Min Today) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-muted mb-1">
              Preferred Date <span className="text-warm-muted/70 text-[11px] font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="date"
                min={todayStr}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-2 sm:py-2.5 bg-white border border-warm-border rounded-xl text-ink text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Field 5: Plan (Shown only if chosen from pricing) */}
          {selectedPlan && (
            <div className="p-3 bg-flash-light/60 border border-flash-yellow/40 rounded-xl flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-ink">
                Selected Plan: <strong>{selectedPlan}</strong>
              </span>
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="text-warm-muted hover:text-ink text-xs underline"
              >
                Clear plan
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-interactive btn-yellow-sweep w-full py-3.5 px-6 rounded-pill bg-flash-yellow hover:bg-flash-hover text-ink font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs"
          >
            <Send size={17} />
            <span>Continue to WhatsApp</span>
          </button>
        </form>
      ) : (
        /* Success State */
        <div className="py-6 text-center flex flex-col items-center">
          <CheckCircle2 size={46} className="text-green-600 mb-2.5" />
          <h3 className="font-serif text-2xl font-bold text-ink">Opening WhatsApp…</h3>
          <p className="text-xs sm:text-sm text-warm-muted mt-1.5 max-w-xs">
            Connecting directly with {SITE.studioName} team in {SITE.address.city}.
          </p>
          
          {/* Fallback Link */}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-semibold text-ink underline hover:text-flash-yellow transition-colors"
            >
              Tap here if WhatsApp didn't open automatically
            </a>
          )}

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-4 py-1.5 rounded-full bg-warm-cream/70 text-ink text-xs font-medium hover:bg-warm-cream"
            >
              Edit details
            </button>
            {!inline && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-ink text-white text-xs font-medium hover:bg-ink/80"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // If inline mode (used in Contact section)
  if (inline) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-card border border-warm-border/70 shadow-xs">
        {formFields}
      </div>
    );
  }

  // If dialog mode (used in Modal on Desktop, Bottom Sheet on Mobile)
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs"
        role="dialog"
        aria-modal="true"
        aria-label="Book a shoot"
      >
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal / Bottom Sheet Box (480px on desktop) */}
        <motion.div
          ref={modalRef}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full sm:max-w-[480px] bg-warm-white text-ink rounded-t-3xl sm:rounded-card p-6 sm:p-8 shadow-2xl z-10 max-h-[92svh] overflow-y-auto"
        >
          {/* Mobile Drag Handle */}
          <div className="w-12 h-1.5 bg-warm-border rounded-full mx-auto mb-4 sm:hidden" />

          {/* Close Icon Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-warm-cream/60 hover:bg-warm-cream text-ink transition-colors"
              aria-label="Close booking dialog"
            >
              <X size={18} />
            </button>
          )}

          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-widest text-warm-muted font-semibold">
              Reserve Your Date
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-0.5">
              Book a Shoot with {SITE.shortName}
            </h3>
          </div>

          {formFields}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

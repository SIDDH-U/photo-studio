import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeShoot from './components/WhatWeShoot';
import BestWork from './components/BestWork';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import GalleryPage from './pages/GalleryPage';
import Lightbox from './components/Lightbox';
import BookingForm from './components/BookingForm';
import StickyMobileBar from './components/StickyMobileBar';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  
  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mobile sticky bar conditions
  const [isHeroCtaOutOfView, setIsHeroCtaOutOfView] = useState(false);
  const [isContactInView, setIsContactInView] = useState(false);

  // Booking Modal State (Shared BookingForm dialog)
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    initialType: 'Weddings',
    initialPlan: null
  });

  // Lightbox State
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  // Observe hero "Book a shoot" CTA so sticky bar only appears after it leaves viewport
  useEffect(() => {
    if (currentPath !== '/') {
      setIsHeroCtaOutOfView(true);
      return;
    }

    const cta = document.getElementById('hero-book-cta');
    if (!cta) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroCtaOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(cta);
    return () => observer.disconnect();
  }, [currentPath]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic navigation
  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (type = 'Weddings', plan = null) => {
    setBookingModal({
      isOpen: true,
      initialType: type,
      initialPlan: plan
    });
  };

  const handleOpenLightbox = (images, index) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: index
    });
  };

  const handleNextPhoto = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const handlePrevPhoto = () => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  // Determine current active category slug
  const activeCategory = currentPath.startsWith('/work/')
    ? currentPath.replace('/work/', '')
    : 'Weddings';

  // Render Page Content based on Route
  const renderContent = () => {
    if (currentPath.startsWith('/work/')) {
      const slug = currentPath.replace('/work/', '').split('/')[0];
      return (
        <CategoryPage
          slug={slug}
          onNavigate={navigate}
          onOpenBooking={handleOpenBooking}
          onOpenLightbox={handleOpenLightbox}
        />
      );
    }

    if (currentPath === '/gallery') {
      return (
        <GalleryPage
          onNavigate={navigate}
          onOpenBooking={handleOpenBooking}
          onOpenLightbox={handleOpenLightbox}
        />
      );
    }

    // Default: Home Page (Hero, What we shoot, Best work, Pricing, Contact)
    return (
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onNavigate={navigate}
        />

        {/* 2. What We Shoot Section */}
        <WhatWeShoot
          onNavigate={navigate}
        />

        {/* 3. Best Work Preview Section */}
        <BestWork
          onNavigate={navigate}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 4. Pricing Section */}
        <Pricing
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Contact Section */}
        <Contact
          onContactInViewChange={setIsContactInView}
        />
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-white text-ink">
      {/* Header & Menu */}
      <Navbar
        onNavigate={navigate}
        currentPath={currentPath}
        onOpenBooking={handleOpenBooking}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Page Content */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Mobile Sticky Bottom Bar */}
      <StickyMobileBar
        isVisible={isHeroCtaOutOfView}
        isContactInView={isContactInView}
        isModalOpen={bookingModal.isOpen}
        isMenuOpen={isMenuOpen}
        onOpenBooking={handleOpenBooking}
        currentCategory={activeCategory}
      />

      {/* Interactive Lightbox Modal */}
      <Lightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        images={lightbox.images}
        currentIndex={lightbox.currentIndex}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onBook={(image) => {
          setLightbox((prev) => ({ ...prev, isOpen: false }));
          handleOpenBooking(image.categoryTitle || 'Weddings');
        }}
      />

      {/* Shared Booking Dialog (Desktop Modal / Mobile Bottom Sheet) */}
      <BookingForm
        inline={false}
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
        initialType={bookingModal.initialType}
        initialPlan={bookingModal.initialPlan}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { SITE } from '../data/site';
import { specialtyConfig } from '../../config/specialty.photography.config.js';
import SampleBadge from './SampleBadge';

export function AboutSection() {
  if (!SITE.sections?.showAbout) return null;
  const about = specialtyConfig.about;
  const photographer = SITE.leadPhotographer;

  return (
    <section id="about" className="py-16 sm:py-20 bg-warm-white border-t border-warm-border/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5A554E]">ABOUT THE STUDIO</span>
          <SampleBadge />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-4">{about.heading}</h2>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-[#403D37] leading-relaxed mb-3">{p}</p>
            ))}
            {photographer?.name && (
              <div className="mt-6 pt-4 border-t border-warm-border/60">
                <span className="font-serif text-lg font-bold text-ink">{photographer.name}</span>
                <span className="text-xs text-[#524E47] block">{photographer.title} • {photographer.yearsExperience}+ years behind the lens</span>
              </div>
            )}
          </div>
          {photographer?.portraitImage && (
            <div className="md:col-span-5 flex justify-center">
              <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg border border-warm-border">
                <img src={photographer.portraitImage} alt={photographer.name} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  if (!SITE.sections?.showProcess) return null;
  const steps = specialtyConfig.processSteps || [];

  return (
    <section id="process" className="py-16 sm:py-20 bg-warm-cream/40 border-t border-warm-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5A554E]">HOW WE WORK</span>
            <SampleBadge />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">A simple, relaxed process</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-warm-border/70 shadow-xs">
              <span className="font-mono text-xs font-bold text-flash-yellow block mb-2">{s.step}</span>
              <h3 className="font-serif text-lg font-bold text-ink mb-2">{s.title}</h3>
              <p className="text-xs text-[#524E47] leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  if (!SITE.sections?.showReviews) return null;
  const reviews = specialtyConfig.reviews || [];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-ink bg-grain text-white border-t border-ink-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-flash-yellow">KIND WORDS</span>
            <SampleBadge light={true} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Client stories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
              <p className="text-sm text-white/85 italic leading-relaxed mb-6">"{rev.quote}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="font-serif text-sm font-bold text-white block">{rev.name}</span>
                  <span className="text-[11px] text-white/50">{rev.category}</span>
                </div>
                <div className="flex gap-0.5 text-flash-yellow">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  if (!SITE.sections?.showFaq) return null;
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = specialtyConfig.faqs || [];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-warm-white border-t border-warm-border/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5A554E]">QUESTIONS</span>
            <SampleBadge />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink">Frequently asked</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-warm-border/70 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-serif text-base font-bold text-ink">{faq.question}</span>
                  <ChevronDown size={18} className={`text-ink/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-[#4A463F] leading-relaxed border-t border-warm-border/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

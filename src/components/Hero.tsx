import React, { useState } from 'react';
import { ArrowUpRight, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { AGENCY_DETAILS, HERO_IMAGE } from '../data/agencyData';

export const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-900/20 via-violet-900/10 to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top quiet metadata without pill clutter */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-400 mb-6">
          <span className="text-indigo-400 font-semibold uppercase tracking-wider">
            {AGENCY_DETAILS.tagline}
          </span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Digital Marketing & Creative Agency</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Lucknow, Uttar Pradesh</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Est. {AGENCY_DETAILS.establishedYear}</span>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08] text-balance">
              LET’S BUILD <br />
              <span className="bg-gradient-to-r from-white via-neutral-200 to-indigo-300 bg-clip-text text-transparent">
                SOMETHING GREAT.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
              Have a project in mind? Tell us about it and our team will get back to you. We empower startups, local businesses, and ambitious brands with bespoke web development, performance marketing, and high-impact branding.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-wide text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/25 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 ml-1 text-neutral-400" />
              </a>
            </div>

            {/* Quick Guarantees & Stats */}
            <div className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {AGENCY_DETAILS.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              {/* Fallback container */}
              {(!imageLoaded || imageError) && (
                <div className="w-full aspect-[16/10] bg-gradient-to-br from-neutral-900 to-indigo-950/40 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-semibold text-base font-display">
                    Nexora Digital Agency Studio
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Gomti Nagar, Lucknow, UP
                  </p>
                </div>
              )}

              {!imageError && (
                <img
                  src={HERO_IMAGE}
                  alt="Nexora Digital Creative Agency Studio in Lucknow"
                  referrerPolicy="no-referrer"
                  className={`w-full aspect-[16/10] object-cover transition-all duration-700 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              )}

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* In-Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">
                    Nexora Creative Headquarters
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Business Hub, Gomti Nagar, Lucknow
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accepting Q3 Projects</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative lighting */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

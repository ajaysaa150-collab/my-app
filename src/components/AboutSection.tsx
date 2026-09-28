import React from 'react';
import { MapPin, Calendar, Award, Target, Users2 } from 'lucide-react';
import { AGENCY_DETAILS, TEAM } from '../data/agencyData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <span>About The Agency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              Rooted in Lucknow, Building for India & Beyond
            </h2>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Gomti Nagar, Lucknow, UP</span>
              </span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Founded in {AGENCY_DETAILS.establishedYear}</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-base leading-relaxed">
            {/* The exact prompt brief about the agency */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <p className="text-lg font-medium text-white italic leading-relaxed">
                “{AGENCY_DETAILS.aboutBrief}”
              </p>
            </div>

            <p className="text-neutral-300">
              Since our establishment in 2021, Nexora has operated on a simple conviction: small and medium businesses, local entrepreneurs, and emerging startups deserve the same tier of cutting-edge creative design and technical rigor as global conglomerate brands.
            </p>

            <p className="text-neutral-400 text-sm">
              We eliminate the bloat of traditional advertising agencies. At Nexora, you interact directly with senior craftspeople—developers who write production-grade code, designers who obsess over micro-interactions, and media buyers who optimize daily for return on ad spend.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
            <h3 className="text-base font-bold text-white font-display mb-2">
              01. High-Performance Web
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We build custom web applications and e-commerce stores with sub-second speeds, top SEO standards, and zero design compromises.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
            <h3 className="text-base font-bold text-white font-display mb-2">
              02. Data-Backed Performance
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No vanity metrics or empty follower growth. Every Meta and Google ad rupee is tracked directly to inbound leads and actual revenue.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
            <h3 className="text-base font-bold text-white font-display mb-2">
              03. Iconic Visual Branding
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We sculpt visual identities that elevate perception, command premium pricing, and forge indelible customer loyalty.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                <span>The People Behind Your Growth</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Meet the Leadership Team
              </h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-xs">
              Specialized leaders committed to turning ideas into real-world business results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  {/* Avatar / Monogram with subtle gradient */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg font-display mb-5 shadow-lg shadow-black/40`}
                  >
                    {member.initials}
                  </div>

                  <h4 className="text-lg font-bold text-white font-display">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-400 mt-0.5 mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {member.specialty}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
                  {member.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

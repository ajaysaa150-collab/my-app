import React from 'react';
import { AGENCY_DETAILS } from '../data/agencyData';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-display">
                {AGENCY_DETAILS.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block mb-1"></span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              {AGENCY_DETAILS.tagline} Digital marketing, web design, and creative branding crafted in Lucknow for high-ambition brands across India.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              Established {AGENCY_DETAILS.establishedYear} · Gomti Nagar, Lucknow, Uttar Pradesh
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Work</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Lucknow Studio
            </h4>
            <div className="space-y-2 text-sm text-neutral-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{AGENCY_DETAILS.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`tel:${AGENCY_DETAILS.phoneRaw}`} className="hover:text-white transition-colors">
                  {AGENCY_DETAILS.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${AGENCY_DETAILS.email}`} className="hover:text-white transition-colors">
                  {AGENCY_DETAILS.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} {AGENCY_DETAILS.fullName}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

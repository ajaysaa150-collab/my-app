import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Inbox } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/agencyData';

interface NavbarProps {
  onOpenInquiries?: () => void;
  inquiriesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiries, inquiriesCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <a
          href="#home"
          className="text-2xl font-bold tracking-tight text-white font-display flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          <span>{AGENCY_DETAILS.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block mb-1"></span>
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-150 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          {onOpenInquiries && (
            <button
              onClick={onOpenInquiries}
              title="View Submitted Inquiries"
              className="relative p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors"
              aria-label="View Inquiries"
            >
              <Inbox className="w-4 h-4" />
              {inquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {inquiriesCount}
                </span>
              )}
            </button>
          )}

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-500/20 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          {onOpenInquiries && (
            <button
              onClick={onOpenInquiries}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg"
              aria-label="View Inquiries"
            >
              <Inbox className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-white py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-center"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
              <a
                href={`tel:${AGENCY_DETAILS.phoneRaw}`}
                className="text-xs text-center text-neutral-400 hover:text-neutral-200 py-1"
              >
                Call: {AGENCY_DETAILS.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

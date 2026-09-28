import React, { useState } from 'react';
import { 
  Globe, 
  Share2, 
  TrendingUp, 
  Palette, 
  Search, 
  Video, 
  ShoppingBag, 
  Layers, 
  Check, 
  ArrowUpRight,
  Calculator
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/agencyData';

const iconMap: Record<string, React.ReactNode> = {
  'web-design-dev': <Globe className="w-5 h-5 text-indigo-400" />,
  'social-media': <Share2 className="w-5 h-5 text-indigo-400" />,
  'google-meta-ads': <TrendingUp className="w-5 h-5 text-indigo-400" />,
  'branding-logo': <Palette className="w-5 h-5 text-indigo-400" />,
  'seo-services': <Search className="w-5 h-5 text-indigo-400" />,
  'video-creative': <Video className="w-5 h-5 text-indigo-400" />,
  'ecommerce-dev': <ShoppingBag className="w-5 h-5 text-indigo-400" />,
  'ui-ux-design': <Layers className="w-5 h-5 text-indigo-400" />,
};

interface ServicesSectionProps {
  onSelectServiceForInquiry?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'marketing' | 'branding' | 'content'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const handleSelectService = (service: ServiceItem) => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(service.title);
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <span>Full-Spectrum Digital Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              Services Built for High-Velocity Growth
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            From technical development to creative storytelling and high-ROAS performance ad campaigns, we turn ideas into measurable outcomes.
          </p>
        </div>

        {/* Interactive Segmented Filter (Allowed functional button tabs) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-xl mb-12 w-fit">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              activeCategory === 'all'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Services (8)
          </button>
          <button
            onClick={() => setActiveCategory('web')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              activeCategory === 'web'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Web & E-commerce
          </button>
          <button
            onClick={() => setActiveCategory('marketing')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              activeCategory === 'marketing'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Performance & SEO
          </button>
          <button
            onClick={() => setActiveCategory('branding')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              activeCategory === 'branding'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Branding & UI/UX
          </button>
          <button
            onClick={() => setActiveCategory('content')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              activeCategory === 'content'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Video & Creative
          </button>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Editorial numbering and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold text-neutral-500 tabular-nums">
                    {service.number}
                  </span>
                  <div className="p-2 rounded-lg bg-neutral-800/80 border border-neutral-700/50">
                    {iconMap[service.id]}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white font-display group-hover:text-indigo-300 transition-colors mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Key Deliverables */}
                <ul className="space-y-2 mb-6 border-t border-neutral-800/80 pt-4">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => handleSelectService(service)}
                className="w-full mt-2 inline-flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white py-2 px-3 rounded-lg bg-neutral-800/60 hover:bg-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Request This Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Quick Project Planner Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-neutral-900 to-indigo-950/40 border border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400 shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">
                Need a Custom Combination or Retainer?
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                We craft tailored packages for startups and local businesses across Lucknow & pan-India.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-indigo-600/30"
          >
            <span>Get a Tailored Proposal</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

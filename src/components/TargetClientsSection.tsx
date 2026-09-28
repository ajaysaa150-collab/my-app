import React from 'react';
import { 
  Rocket, 
  ShoppingBag, 
  Coffee, 
  Building2, 
  MapPin, 
  UserCheck, 
  Briefcase, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { TARGET_CLIENTS } from '../data/agencyData';

const clientIcons: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="w-5 h-5 text-indigo-400" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 text-indigo-400" />,
  Coffee: <Coffee className="w-5 h-5 text-indigo-400" />,
  Building2: <Building2 className="w-5 h-5 text-indigo-400" />,
  MapPin: <MapPin className="w-5 h-5 text-indigo-400" />,
  UserCheck: <UserCheck className="w-5 h-5 text-indigo-400" />,
  Briefcase: <Briefcase className="w-5 h-5 text-indigo-400" />,
};

interface TargetClientsSectionProps {
  onSelectClientType?: (clientType: string) => void;
}

export const TargetClientsSection: React.FC<TargetClientsSectionProps> = ({ onSelectClientType }) => {
  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            <span>Specialized Industry Practice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            Tailored Solutions for Every Growth Stage
          </h2>
          <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
            We don’t believe in generic one-size-fits-all playbooks. Nexora builds custom growth systems designed specifically for the unique commercial rhythms of your sector.
          </p>
        </div>

        {/* 7 Target Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TARGET_CLIENTS.map((client) => (
            <div
              key={client.id}
              className="bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700/60 flex items-center justify-center mb-4">
                  {clientIcons[client.iconName]}
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {client.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {client.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <div className="flex items-center gap-2 text-xs text-indigo-300 font-medium mb-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="truncate">{client.deliverableHighlight}</span>
                </div>

                <a
                  href="#contact"
                  onClick={() => onSelectClientType && onSelectClientType(client.title)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white transition-colors group"
                >
                  <span>Discuss Your Growth Plan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}

          {/* 8th Card: Custom Enterprise / Hybrid */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-neutral-900 to-neutral-900 border border-indigo-900/40 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 font-bold font-display">
                +
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Don’t See Your Niche?
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                From manufacturing OEMs to educational institutes and medical clinics, we adapt our core design and media engine to your exact target buyer persona.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-center"
              >
                <span>Schedule a Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

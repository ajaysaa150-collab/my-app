import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/agencyData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={`https://wa.me/919123456789?text=Hi%20Nexora%20team,%20I%20would%20like%20to%20discuss%20a%20project.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp with Nexora Digital Agency"
      className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-950/60 transition-transform duration-200 hover:scale-105 active:scale-95 flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-xs pl-0 group-hover:pl-2">
        Chat with Us
      </span>
    </a>
  );
};

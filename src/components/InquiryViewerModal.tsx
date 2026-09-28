import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Send,
  Lock
} from 'lucide-react';
import { Inquiry, AGENCY_DETAILS } from '../data/agencyData';

interface InquiryViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: Inquiry[];
  onClearAll: () => void;
  onDeleteInquiry: (id: string) => void;
}

export const InquiryViewerModal: React.FC<InquiryViewerModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onClearAll,
  onDeleteInquiry,
}) => {
  const globalEmail = localStorage.getItem('nexora_target_email') || AGENCY_DETAILS.targetNotificationEmail || 'ajaysaaa150@gmail.com';

  if (!isOpen) return null;

  const getMailtoLink = (inq: Inquiry) => {
    const dest = inq.destinationEmail || globalEmail;
    return `mailto:${dest}?subject=${encodeURIComponent(
      `[Nexora Inquiry] ${inq.fullName} - ${inq.service}`
    )}&body=${encodeURIComponent(
      `From: ${inq.fullName} (${inq.email})\nPhone: ${inq.phone}\nCompany: ${inq.company}\nService: ${inq.service}\nBudget: ${inq.budget}\nTime: ${inq.timestamp}\n\nProject Brief:\n${inq.message}`
    )}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-display">
                Inquiries Inbox ({inquiries.length})
              </h3>
              <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-900 rounded">
                Live Routing Active
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              All inquiries forwarded to target email inbox
            </p>
          </div>

          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 text-xs text-rose-400 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Target Email Bar (Protected) */}
        <div className="px-6 py-3 bg-neutral-950/90 border-b border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Forwarding Channel:</span>
            <span className="text-emerald-300 font-medium">Agency Executive Management (Protected)</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Private & Encrypted</span>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {inquiries.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 space-y-2">
              <p className="text-sm">No inquiries received yet.</p>
              <p className="text-xs text-neutral-500">
                Submit an inquiry in the Contact Section to see it recorded here.
              </p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-base font-display">
                        {inq.fullName}
                      </span>
                      <span className="text-xs text-indigo-400 font-semibold bg-indigo-950/60 border border-indigo-900/60 px-2 py-0.5 rounded">
                        {inq.service}
                      </span>
                      <span className="text-[11px] text-emerald-400 bg-emerald-950/50 border border-emerald-900/50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Dispatched to Management</span>
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-3 mt-1.5">
                      <span>Budget: <strong className="text-neutral-200">{inq.budget}</strong></span>
                      <span>·</span>
                      <span className="text-[11px] text-neutral-500">
                        {new Date(inq.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getMailtoLink(inq)}
                      className="px-2.5 py-1 text-[11px] font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-indigo-600 rounded transition-colors flex items-center gap-1"
                      title="Open in Email Client addressed to target email"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Forward / Open</span>
                    </a>
                    <button
                      onClick={() => onDeleteInquiry(inq.id)}
                      className="text-neutral-500 hover:text-rose-400 p-1 opacity-60 group-hover:opacity-100 transition-opacity"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 pt-2 border-t border-neutral-900">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    <a href={`mailto:${inq.email}`} className="hover:text-indigo-400 transition-colors">
                      {inq.email}
                    </a>
                  </div>
                  {inq.phone && inq.phone !== 'Not provided' && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      <a href={`tel:${inq.phone}`} className="hover:text-indigo-400 transition-colors">
                        {inq.phone}
                      </a>
                    </div>
                  )}
                  {inq.company && inq.company !== 'Not provided' && (
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <Building className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{inq.company}</span>
                    </div>
                  )}
                </div>

                {/* Message text */}
                <div className="p-3 bg-neutral-900/70 rounded-lg text-xs text-neutral-300 leading-relaxed border border-neutral-850">
                  <p className="font-semibold text-neutral-400 mb-1">Project Brief / Message:</p>
                  <p className="whitespace-pre-wrap">{inq.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            Encrypted delivery to agency management inbox
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

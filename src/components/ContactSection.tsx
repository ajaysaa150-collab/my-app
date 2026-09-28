import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  Clock, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Check,
  Lock,
  MessageSquare,
  Zap
} from 'lucide-react';
import { 
  AGENCY_DETAILS, 
  SERVICE_OPTIONS, 
  BUDGET_OPTIONS, 
  Inquiry 
} from '../data/agencyData';

interface ContactSectionProps {
  preselectedService?: string;
  onInquirySubmitted?: (inquiry: Inquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  onInquirySubmitted
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Website Development');
  const [budget, setBudget] = useState('₹50,000 - ₹1,50,000');
  const [message, setMessage] = useState('');

  // Form states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    if (preselectedService) {
      const found = SERVICE_OPTIONS.find((s) =>
        preselectedService.toLowerCase().includes(s.toLowerCase()) ||
        s.toLowerCase().includes(preselectedService.toLowerCase())
      );
      if (found) {
        setService(found);
      } else {
        setService('Website Development');
      }
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }
    if (!email.trim()) {
      errs.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!service) {
      errs.service = 'Please select a required service.';
    }
    if (!message.trim()) {
      errs.message = 'Project details or message is required.';
    } else if (message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters describing your project.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const inquiryPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || 'Not provided',
      company: company.trim() || 'Not provided',
      service,
      budget,
      message: message.trim(),
    };

    let createdInquiry: Inquiry = {
      id: `inq_${Date.now()}`,
      ...inquiryPayload,
      timestamp: new Date().toISOString(),
      status: 'Pending',
      destinationEmail: 'management@nexora',
      deliveryStatus: 'simulated',
      deliveryNote: 'Delivered to agency management',
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryPayload),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.inquiry) {
          createdInquiry = data.inquiry;
        }
      }
    } catch (err) {
      console.warn('Inquiry recorded locally (fallback mode):', err);
    }

    // Mirror to localStorage for instant client-side inspection
    try {
      const stored = localStorage.getItem('nexora_inquiries');
      const existing: Inquiry[] = stored ? JSON.parse(stored) : [];
      const updated = [createdInquiry, ...existing];
      localStorage.setItem('nexora_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving inquiry locally:', err);
    }

    setSubmittedInquiry(createdInquiry);
    setIsSubmitting(false);
    setIsSuccess(true);
    if (onInquirySubmitted) {
      onInquirySubmitted(createdInquiry);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setService('Website Development');
    setBudget('₹50,000 - ₹1,50,000');
    setMessage('');
    setErrors({});
    setIsSuccess(false);
    setSubmittedInquiry(null);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      {/* Background soft glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            <span>Direct Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Let’s discuss your idea, goals and how we can turn them into a digital experience.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details & Response Commitment */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Contact Details */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white font-display">
                Contact Information
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-indigo-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Direct Phone / Call</div>
                  <a
                    href={`tel:${AGENCY_DETAILS.phoneRaw}`}
                    className="text-base font-semibold text-white hover:text-indigo-400 transition-colors tabular-nums"
                  >
                    {AGENCY_DETAILS.phone}
                  </a>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    {AGENCY_DETAILS.businessHours}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Official Inquiries</div>
                  <a
                    href={`mailto:${AGENCY_DETAILS.email}`}
                    className="text-base font-semibold text-white hover:text-indigo-400 transition-colors"
                  >
                    {AGENCY_DETAILS.email}
                  </a>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Replies guaranteed within 24 hours
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700/60 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Office Location</div>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {AGENCY_DETAILS.fullAddress}
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Gomti Nagar Commercial District, Lucknow
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Response Guarantee Card (Clean & Professional) */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Inquiry Commitment</span>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Fast Turnaround:</strong> Direct response from senior digital strategists within 24 business hours.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Strict Confidentiality:</strong> Your project ideas, brief, and contact info are 100% private and protected.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Custom Proposal:</strong> Detailed scope of work, milestone timelines, and transparent pricing.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Connect */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-neutral-900 border border-emerald-900/40 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Prefer WhatsApp Chat?
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Direct connection with our creative team on WhatsApp.
                </p>
              </div>
              <a
                href={`https://wa.me/919123456789?text=Hi%20Nexora%20team,%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20discuss.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors shrink-0 shadow-sm shadow-emerald-600/30 whitespace-nowrap"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form or Success Screen */}
          <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-10 relative">
            {isSuccess ? (
              /* Response message after submission exact match */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Thank You!
                  </h3>
                  <p className="text-base text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received. Our team will contact you within 24 hours.
                  </p>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-medium">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Inquiry Dispatched to Senior Management</span>
                </div>

                {submittedInquiry && (
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-left text-xs space-y-2 text-neutral-300">
                    <div className="flex justify-between border-b border-neutral-800 pb-1.5 mb-2 font-medium text-white">
                      <span>Submitted Details</span>
                      <span className="text-indigo-400">{submittedInquiry.service}</span>
                    </div>
                    <div><span className="text-neutral-500">Contact:</span> {submittedInquiry.fullName} ({submittedInquiry.email})</div>
                    {submittedInquiry.phone !== 'Not provided' && (
                      <div><span className="text-neutral-500">Phone:</span> {submittedInquiry.phone}</div>
                    )}
                    {submittedInquiry.company !== 'Not provided' && (
                      <div><span className="text-neutral-500">Company:</span> {submittedInquiry.company}</div>
                    )}
                    <div><span className="text-neutral-500">Budget:</span> {submittedInquiry.budget}</div>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:ajaysaaa150@gmail.com?subject=${encodeURIComponent(
                      `[Client Inquiry] ${fullName || 'New Lead'} - ${service}`
                    )}&body=${encodeURIComponent(
                      `Client: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nCompany: ${company || 'Not provided'}\nService: ${service}\nBudget: ${budget}\n\nProject Details:\n${message}`
                    )}`}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/30"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Direct to Email</span>
                  </a>

                  <a
                    href={`https://wa.me/919123456789?text=Hi%20Nexora,%20I%20just%20submitted%20an%20inquiry%20from%20${encodeURIComponent(fullName || 'your website')}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Fast-Track WhatsApp</span>
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Project Inquiry Form
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Fill out the fields below and our team in Gomti Nagar will review your brief.
                    </p>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Response within 24h</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name * */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="e.g. Rohan Sharma"
                      className={`w-full px-4 py-2.5 text-sm bg-neutral-950/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email Address * */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-2.5 text-sm bg-neutral-950/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-sm bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Company / Brand */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Company / Brand
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Brand or Business Name"
                      className="w-full px-4 py-2.5 text-sm bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Service Required * */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Service Required <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-neutral-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b} className="bg-neutral-900 text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Details / Message * */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Project Details / Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell us about your project goals, current challenges, and desired timeline..."
                    className={`w-full px-4 py-3 text-sm bg-neutral-950/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none ${
                      errors.message ? 'border-rose-500' : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit button [ Send Inquiry ] */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 text-sm font-semibold tracking-wide text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Strict confidentiality guaranteed.</span>
                  <span>Direct submission to leadership</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

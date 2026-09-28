import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TargetClientsSection } from './components/TargetClientsSection';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquiryViewerModal } from './components/InquiryViewerModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Inquiry } from './data/agencyData';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Website Development');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Load inquiries from server API and localStorage on mount
  useEffect(() => {
    const loadData = async () => {
      let serverInquiries: Inquiry[] = [];
      try {
        const res = await fetch('/api/inquiries');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.inquiries)) {
            serverInquiries = data.inquiries;
          }
        }
      } catch (e) {
        // Fallback to local
      }

      try {
        const stored = localStorage.getItem('nexora_inquiries');
        const localInquiries: Inquiry[] = stored ? JSON.parse(stored) : [];

        // Merge without duplicates by ID
        const mergedMap = new Map<string, Inquiry>();
        serverInquiries.forEach((item) => mergedMap.set(item.id, item));
        localInquiries.forEach((item) => mergedMap.set(item.id, item));

        const merged = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setInquiries(merged);
        localStorage.setItem('nexora_inquiries', JSON.stringify(merged));
      } catch (err) {
        console.error('Error loading stored inquiries', err);
      }
    };

    loadData();
  }, []);

  const handleInquirySubmitted = (newInquiry: Inquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleSelectServiceForInquiry = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  const handleClearAllInquiries = async () => {
    try {
      await fetch('/api/inquiries', { method: 'DELETE' });
    } catch (e) {}
    localStorage.removeItem('nexora_inquiries');
    setInquiries([]);
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    } catch (e) {}
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    try {
      localStorage.setItem('nexora_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.error('Error updating inquiries', err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative">
      {/* 3-Zone Navigation Bar */}
      <Navbar
        onOpenInquiries={() => setIsInquiryModalOpen(true)}
        inquiriesCount={inquiries.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        
        <ServicesSection 
          onSelectServiceForInquiry={handleSelectServiceForInquiry} 
        />
        
        <TargetClientsSection 
          onSelectClientType={(clientType) => {
            setSelectedService(clientType);
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }} 
        />
        
        <WorkSection />
        
        <AboutSection />
        
        <ContactSection
          preselectedService={selectedService}
          onInquirySubmitted={handleInquirySubmitted}
        />
      </main>

      {/* Mirrored Clean Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Connect */}
      <FloatingWhatsApp />

      {/* Interactive Modal to View Form Submissions */}
      <InquiryViewerModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        inquiries={inquiries}
        onClearAll={handleClearAllInquiries}
        onDeleteInquiry={handleDeleteInquiry}
      />
    </div>
  );
}

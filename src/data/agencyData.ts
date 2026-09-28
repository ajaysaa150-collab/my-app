export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  category: 'web' | 'marketing' | 'branding' | 'content';
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  initials: string;
  color: string;
}

export interface TargetClient {
  id: string;
  title: string;
  description: string;
  deliverableHighlight: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  metric: string;
  metricLabel: string;
  description: string;
  image: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  timestamp: string;
  status: 'Pending' | 'Contacted';
  destinationEmail?: string;
  deliveryStatus?: 'sent_smtp' | 'queued_server' | 'simulated';
  deliveryNote?: string;
}

export const AGENCY_DETAILS = {
  name: 'Nexora',
  fullName: 'Nexora Digital Agency',
  tagline: 'We Turn Ideas Into Digital Growth.',
  establishedYear: '2021',
  location: 'Lucknow, Uttar Pradesh, India',
  fullAddress: '3rd Floor, Business Hub, Gomti Nagar, Lucknow, UP - 226010',
  phone: '+91 91234 56789',
  phoneRaw: '+919123456789',
  email: 'hello@nexoradigital.in',
  targetNotificationEmail: 'ajaysaaa150@gmail.com',
  businessHours: 'Mon - Sat: 10:00 AM - 7:00 PM IST',
  aboutBrief: 'Nexora Digital Agency startups, local businesses aur growing brands ke liye digital solutions provide karti hai. Agency ka focus web design, performance marketing aur creative branding par hai.',
  aboutDetailed: 'Founded in 2021 in Lucknow, Nexora Digital Agency bridges creative ambition with measurable performance. We engineer blazing-fast websites, execute high-ROI performance ad campaigns, and carve distinct visual brand identities that turn visitors into lifelong brand advocates.',
  stats: [
    { value: '2021', label: 'Established in Lucknow' },
    { value: '140+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Retention Rate' },
    { value: '₹14Cr+', label: 'Client Revenue Generated' },
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-design-dev',
    number: '01',
    title: 'Website Design & Development',
    shortDesc: 'Custom, high-speed, SEO-optimized responsive web architectures tailored for maximum user conversion.',
    deliverables: ['Custom Next.js & React Architectures', 'Sub-second Load Times', 'CMS & Headless Integrations', 'Conversion Rate Optimization'],
    category: 'web',
  },
  {
    id: 'social-media',
    number: '02',
    title: 'Social Media Marketing',
    shortDesc: 'End-to-end social narrative, calendar management, and viral reel production for LinkedIn, Instagram & YouTube.',
    deliverables: ['Content Strategy & Scripts', 'High-engagement Short-form Video', 'Community Management', 'Monthly Analytics & Growth Audits'],
    category: 'marketing',
  },
  {
    id: 'google-meta-ads',
    number: '03',
    title: 'Google & Meta Ads',
    shortDesc: 'Performance media buying that drives qualified inbound leads and high return on ad spend (ROAS).',
    deliverables: ['Search & Performance Max Campaigns', 'Meta Funnels (Lead Gen & Purchases)', 'Retargeting Architecture', 'A/B Creative Experimentation'],
    category: 'marketing',
  },
  {
    id: 'branding-logo',
    number: '04',
    title: 'Branding & Logo Design',
    shortDesc: 'Memorable brand systems, guidelines, typography hierarchy, and corporate identity packages.',
    deliverables: ['Logo & Visual Identity System', 'Comprehensive Brand Guidelines Book', 'Stationery & Packaging Design', 'Social Brand Kit & Assets'],
    category: 'branding',
  },
  {
    id: 'seo-services',
    number: '05',
    title: 'SEO Services',
    shortDesc: 'Technical SEO audits, local Google Business Profile dominance, and keyword research that drives organic traffic.',
    deliverables: ['Local Lucknow & Pan-India SEO', 'Technical Audits & Core Web Vitals', 'High-intent Keyword Architecture', 'Authoritative Backlink Strategy'],
    category: 'marketing',
  },
  {
    id: 'video-creative',
    number: '06',
    title: 'Video & Creative Content',
    shortDesc: 'Studio-grade promotional reels, brand films, product motion graphics, and commercial ad creatives.',
    deliverables: ['Commercial Ad Concept & Scripting', 'Reels, Shorts & UGC Direction', 'Motion Graphics & 3D Typography', 'Post-production & Color Grading'],
    category: 'content',
  },
  {
    id: 'ecommerce-dev',
    number: '07',
    title: 'E-commerce Development',
    shortDesc: 'Scalable Shopify and headless e-commerce stores designed for seamless checkout and high average order value.',
    deliverables: ['Shopify Plus & Custom Stores', 'Payment Gateway & Logistics Setup', 'Frictionless Mobile Checkout', 'Upsell & Cross-sell Systems'],
    category: 'web',
  },
  {
    id: 'ui-ux-design',
    number: '08',
    title: 'UI/UX Design',
    shortDesc: 'Intuitive user experiences, wireframing, design systems, and clickable prototypes built in Figma.',
    deliverables: ['User Research & Journey Mapping', 'High-fidelity Figma Design Systems', 'Interactive Usability Prototyping', 'Design-to-Code Handoff Specs'],
    category: 'branding',
  }
];

export const TARGET_CLIENTS: TargetClient[] = [
  {
    id: 'startups',
    title: 'Startups',
    description: 'Fast-moving early-stage founders seeking validation, investor-ready pitch decks, MVPs, and rapid traction.',
    deliverableHighlight: '0-to-1 Go-to-Market & Conversion Funnels',
    iconName: 'Rocket',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Brands',
    description: 'D2C apparel, lifestyle, and consumer brands looking to scale monthly GMV and maximize customer lifetime value.',
    deliverableHighlight: 'High-ROAS Ad Funnels & Custom Shopify Stores',
    iconName: 'ShoppingBag',
  },
  {
    id: 'restaurants',
    title: 'Restaurants & Cafés',
    description: 'Specialty coffee roasters, fine dining lounges, and food chains wanting packed tables and delivery growth.',
    deliverableHighlight: 'Local Foodie Reel Campaigns & Google Maps SEO',
    iconName: 'Coffee',
  },
  {
    id: 'real-estate',
    title: 'Real-estate Businesses',
    description: 'Property developers, commercial builders, and luxury brokers requiring qualified high-ticket site visits.',
    deliverableHighlight: 'High-intent Google Ads & Verified Lead Filtering',
    iconName: 'Building2',
  },
  {
    id: 'local-businesses',
    title: 'Local Businesses',
    description: 'Clinics, legal firms, diagnostic centers, and showrooms dominating Gomti Nagar, Lucknow and UP territory.',
    deliverableHighlight: 'Hyper-local Search Ranking & Review Engines',
    iconName: 'MapPin',
  },
  {
    id: 'personal-brands',
    title: 'Personal Brands',
    description: 'Founders, keynote speakers, doctors, and content creators building authority on LinkedIn and Instagram.',
    deliverableHighlight: 'Thought Leadership Content & Signature Websites',
    iconName: 'UserCheck',
  },
  {
    id: 'smb',
    title: 'Small & Medium Businesses',
    description: 'Established enterprises transitioning from offline legacy setups into automated digital sales engines.',
    deliverableHighlight: 'Modern Web Revamps & Digital Transformation',
    iconName: 'Briefcase',
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Rohan Mehta',
    role: 'Founder & Creative Director',
    specialty: 'Brand Identity, Creative Vision & Strategic Direction',
    experience: '8+ years leading creative campaigns for national and regional brands.',
    initials: 'RM',
    color: 'from-indigo-600 to-violet-600',
  },
  {
    name: 'Ananya Sharma',
    role: 'Marketing Strategist',
    specialty: 'Meta & Google Performance Ads, Inbound Funnels & Data Analytics',
    experience: 'Scaled over 60+ brands with documented 3.5x average ROAS.',
    initials: 'AS',
    color: 'from-amber-600 to-orange-600',
  },
  {
    name: 'Kabir Verma',
    role: 'Lead Web Developer',
    specialty: 'Full-stack React/Next.js, High-Speed Performance & E-commerce Architectures',
    experience: 'Built 80+ resilient websites with 99+ Core Web Vital scores.',
    initials: 'KV',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    name: 'Aarav Kapoor',
    role: 'UI/UX Designer',
    specialty: 'Product Systems, Micro-interactions & Figma Design Libraries',
    experience: 'Passionate about human-centered design that removes conversion friction.',
    initials: 'AK',
    color: 'from-sky-600 to-blue-600',
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'd2c-apparel',
    title: 'Scaling D2C Artisan Lifestyle Brand Across India',
    client: 'Verve & Co.',
    industry: 'E-commerce & Retail',
    services: ['E-commerce Development', 'Meta Ads', 'UI/UX Design'],
    metric: '+240%',
    metricLabel: 'ROAS within 90 days',
    description: 'Engineered a lightning-fast custom Shopify store with frictionless checkout, paired with structured Meta video ad creative iterations.',
    image: '/src/assets/images/case_ecommerce_growth_1790575814620.jpg',
  },
  {
    id: 'real-estate-leads',
    title: 'High-Ticket Luxury Property Lead Generation',
    client: 'Gomti Greens & Residences',
    industry: 'Real Estate & Infrastructure',
    services: ['Google Search Ads', 'Website Development', 'Branding'],
    metric: '380+',
    metricLabel: 'Verified site visits generated',
    description: 'Designed an interactive virtual floor-plan showcase and targeted high-net-worth buyers in Lucknow and NCR with laser-focused search intent.',
    image: '/src/assets/images/case_realestate_luxury_1790575827572.jpg',
  },
  {
    id: 'cafe-branding',
    title: 'Artisanal Roastery Launch & Local Dominance',
    client: 'The Daily Grind Café & Roasters',
    industry: 'Restaurants & Hospitality',
    services: ['Branding & Logo Design', 'Social Media Marketing', 'Local SEO'],
    metric: '5.2x',
    metricLabel: 'Weekend footfall increase',
    description: 'Formulated a warm, tactile brand identity and viral short-form reel strategy that made them Gomti Nagar’s most photographed specialty café.',
    image: '/src/assets/images/case_cafe_branding_1790575839274.jpg',
  }
];

export const HERO_IMAGE = '/src/assets/images/hero_agency_studio_1790575801320.jpg';

export const SERVICE_OPTIONS = [
  'Website Development',
  'Digital Marketing',
  'Branding',
  'SEO',
  'Social Media',
  'Other'
];

export const BUDGET_OPTIONS = [
  'Under ₹50,000',
  '₹50,000 - ₹1,50,000',
  '₹1,50,000 - ₹3,00,000',
  '₹3,00,000+'
];

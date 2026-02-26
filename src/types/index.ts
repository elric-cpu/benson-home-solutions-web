/* ═══════════════════════════════════════════════════════════════════════════
 * Benson Home Solutions — Shared TypeScript Types
 * ═══════════════════════════════════════════════════════════════════════════ */

// ── Navigation ──
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ── Services ──
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image?: SanityImage;
  priceRange?: string;
  faqs: FAQ[];
  metaTitle?: string;
  metaDescription?: string;
}

// ── Service Areas ──
export interface ServiceArea {
  slug: string;
  city: string;
  state: string;
  description: string;
  services: string[];
  coordinates: { lat: number; lng: number };
  population?: number;
  image?: SanityImage;
  metaTitle?: string;
  metaDescription?: string;
}

// ── FAQ ──
export interface FAQ {
  question: string;
  answer: string;
}

// ── Testimonial ──
export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date?: string;
}

// ── Case Study ──
export interface CaseStudy {
  slug: string;
  title: string;
  service: string;
  location: string;
  duration: string;
  costRange: string;
  challenge: string;
  solution: string;
  result: string;
  images: SanityImage[];
  beforeImage?: SanityImage;
  afterImage?: SanityImage;
}

// ── Lead / Contact ──
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  preferredContact: 'phone' | 'email' | 'text';
  urgency: 'routine' | 'soon' | 'emergency';
}

export interface LeadData {
  source: 'contact_form' | 'calculator' | 'estimator' | 'chatbot' | 'phone';
  email?: string;
  phone?: string;
  name?: string;
  service?: string;
  estimatedValue?: number;
  metadata?: Record<string, unknown>;
}

// ── Calculator / Estimator ──
export interface CalculatorInput {
  homeValue: number;
  yearBuilt: number;
  squareFootage: number;
  zipCode: string;
}

export interface CalculatorResult {
  fannieMaeEstimate: { low: number; high: number };
  freddieMacEstimate: number;
  bensonSubscription: { monthly: number; annual: number; tier: string };
  savings: number;
  recommendation: string;
}

export interface EstimatorInput {
  serviceType: string;
  squareFootage?: number;
  quality: 'budget' | 'mid-range' | 'premium';
  zipCode: string;
}

export interface EstimatorResult {
  lowEstimate: number;
  highEstimate: number;
  average: number;
  factors: { label: string; impact: string }[];
  disclaimer: string;
}

// ── Chatbot ──
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ── Sanity Types ──
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

// ── SEO ──
export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

// ── Subscription Plans ──
export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'premium' | 'enterprise';
  segment: 'residential' | 'commercial' | 'church';
  monthlyPrice: number;
  annualPrice: number;
  sqftRange: { min: number; max: number };
  features: string[];
  popular?: boolean;
}

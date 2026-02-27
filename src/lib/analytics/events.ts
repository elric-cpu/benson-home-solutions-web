/**
 * Type-safe analytics event tracking for GA4.
 * Wraps gtag() calls with domain-specific event names.
 */

type GtagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent({ action, category, label, value }: GtagEvent) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

// --- Domain-specific events ---

export function trackContactFormSubmit(service?: string) {
  trackEvent({
    action: 'contact_form_submit',
    category: 'lead_generation',
    label: service || 'general',
  });
}

export function trackPhoneCall(location: string) {
  trackEvent({
    action: 'phone_call_click',
    category: 'lead_generation',
    label: location,
  });
}

export function trackEmergencyCall() {
  trackEvent({
    action: 'emergency_call_click',
    category: 'emergency',
    label: 'emergency_cta',
  });
}

export function trackSubscriptionInterest(plan?: string) {
  trackEvent({
    action: 'subscription_interest',
    category: 'lead_generation',
    label: plan || 'unknown',
  });
}

export function trackCostCalculatorUse(service: string) {
  trackEvent({
    action: 'cost_calculator_use',
    category: 'engagement',
    label: service,
  });
}

export function trackServicePageView(service: string) {
  trackEvent({
    action: 'service_page_view',
    category: 'engagement',
    label: service,
  });
}

export function trackAreaPageView(area: string) {
  trackEvent({
    action: 'area_page_view',
    category: 'engagement',
    label: area,
  });
}

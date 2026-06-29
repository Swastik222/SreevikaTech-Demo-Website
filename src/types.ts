export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'engineering' | 'consulting' | 'cloud' | 'enterprise';
  features: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  category: string;
  industry: string;
  impactMetric: string;
  impactValue: string;
  year: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatarSeed: string; // Used to generate distinct avatars
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  timestamp: string;
}

export interface NewsletterSubscriber {
  email: string;
  timestamp: string;
}

export interface AnalyticsLog {
  id: string;
  type: 'pageview' | 'click' | 'search' | 'contact_submit' | 'newsletter_submit' | 'theme_toggle' | 'share';
  label: string;
  timestamp: string;
  path?: string;
  meta?: Record<string, any>;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  totalServiceClicks: number;
  totalSearches: number;
  totalInquiries: number;
  totalNewsletterSignups: number;
  totalShares: number;
  themeToggleCount: number;
  dailyViews: { [date: string]: number };
  popularServices: { [service: string]: number };
  popularCaseStudies: { [caseStudy: string]: number };
  recentInquiries: Inquiry[];
}

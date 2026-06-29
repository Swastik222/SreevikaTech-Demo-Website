/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { trackEvent } from './utils/analytics';

export default function App() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Track initial landing page view
  useEffect(() => {
    trackEvent('pageview', 'Landing Page');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:border-4 dark:border-slate-800 transition-colors duration-200" id="sreevika-portal-root">
      
      {/* Header element passing analytics toggler */}
      <Header 
        onToggleAnalytics={() => setIsAnalyticsOpen(!isAnalyticsOpen)} 
        isAnalyticsOpen={isAnalyticsOpen} 
      />

      {/* Main Sections Body */}
      <main className="flex-grow" id="main-content-flow">
        <Hero />
        <Services />
        <CaseStudies />
        <Testimonials />
        <ContactForm />
      </main>

      {/* Footer element */}
      <Footer />

      {/* Drawer Overlay for client behavior telemetry */}
      <AnalyticsDashboard 
        isOpen={isAnalyticsOpen} 
        onClose={() => setIsAnalyticsOpen(false)} 
      />

    </div>
  );
}

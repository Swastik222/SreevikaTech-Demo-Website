/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { trackEvent } from "./utils/analytics";

export default function App() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Track initial landing page view
  useEffect(() => {
    trackEvent("pageview", "Landing Page");
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:border-4 dark:border-slate-800 transition-colors duration-200 relative overflow-hidden"
      id="sreevika-portal-root"
    >
      {/* Background gradients for frosted glass visibility */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-blue-400/30 dark:bg-blue-600/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-emerald-300/30 dark:bg-emerald-600/20 blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-[35rem] h-[35rem] rounded-full bg-purple-300/20 dark:bg-purple-600/10 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-rose-300/20 dark:bg-rose-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
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
      </div>

      {/* Drawer Overlay for client behavior telemetry */}
      <AnalyticsDashboard
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}

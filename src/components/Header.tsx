import { useState, useEffect } from 'react';
import { Menu, X, BarChart3, Sun, Moon, Globe, ArrowUpRight } from 'lucide-react';
import { trackEvent, getAnalyticsSummary } from '../utils/analytics';

interface HeaderProps {
  onToggleAnalytics: () => void;
  isAnalyticsOpen: boolean;
}

export default function Header({ onToggleAnalytics, isAnalyticsOpen }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [logCount, setLogCount] = useState(0);

  // Monitor DOM theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Read analytics count occasionally to show responsive bubble
  useEffect(() => {
    const updateStats = () => {
      const summary = getAnalyticsSummary();
      // Total logged user interactions in current state
      setLogCount(summary.totalPageViews + summary.totalServiceClicks + summary.totalSearches + summary.totalInquiries);
    };

    updateStats();
    window.addEventListener('analytics_updated', updateStats);
    return () => window.removeEventListener('analytics_updated', updateStats);
  }, []);

  // Monitor scroll for highlighting active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'case-studies', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    trackEvent('theme_toggle', `Switched theme to ${nextMode ? 'Dark' : 'Light'}`);
  };

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      trackEvent('pageview', `Scrolled to section: ${sectionId}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-colors duration-200 dark:bg-slate-900 dark:border-slate-800 dark:shadow-xl" id="header-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-container"
          >
            {/* Custom Logo Container matching target design */}
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20" id="infinity-logo-wrapper">
              <svg viewBox='0 0 24 24' className='w-7 h-7 fill-white' xmlns="http://www.w3.org/2000/svg">
                <path d='M18.181 8.25c-1.353 0-2.483.673-3.41 1.583-.699.686-1.328 1.522-1.785 2.167-.457-.645-1.086-1.481-1.785-2.167-.927-.91-2.057-1.583-3.41-1.583-2.651 0-4.809 2.158-4.809 4.809s2.158 4.809 4.809 4.809c1.353 0 2.483-.673 3.41-1.583.699-.686 1.328-1.522 1.785-2.167.457.645 1.086 1.481 1.785 2.167.927.91 2.057 1.583 3.41 1.583 2.651 0 4.809-2.158 4.809-4.809s-2.158-4.809-4.809-4.809zm-13.181 4.809c0-1.549 1.26-2.809 2.809-2.809 1.012 0 1.734.502 2.378 1.134.567.556 1.146 1.298 1.622 1.95-.476.652-1.055 1.394-1.622 1.95-.644.632-1.366 1.134-2.378 1.134-1.549 0-2.809-1.26-2.809-2.809zm13.181 2.809c-1.012 0-1.734-.502-2.378-1.134-.567-.556-1.146-1.298-1.622-1.95.476-.652 1.055-1.394 1.622-1.95.644-.632 1.366-1.134 2.378-1.134 1.549 0 2.809 1.26 2.809 2.809s-1.26 2.809-2.809 2.809z'/>
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Sreevika<span className="text-blue-600 dark:text-blue-500">Tech</span>
              </span>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  Global IT Service
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" id="desktop-nav">
            {[
              { id: 'services', label: 'Services' },
              { id: 'case-studies', label: 'Case Studies' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'contact', label: 'Contact Us' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeSection === item.id 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40/50 dark:text-blue-400' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/60'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3" id="header-actions">
            {/* Real-time Analytics Launch Button */}
            <button
              onClick={onToggleAnalytics}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border cursor-pointer ${
                isAnalyticsOpen 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
                  : 'bg-emerald-50/50 text-emerald-700 border-emerald-100/60 hover:bg-emerald-50 hover:border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 dark:hover:bg-emerald-950/30'
              }`}
              title="Toggle Live Client Analytics HUD"
              id="analytics-hud-trigger"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <BarChart3 className="w-4 h-4" />
              <span>Live HUD</span>
              <span className="bg-slate-100/80 text-slate-700 text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-md dark:bg-slate-800 dark:text-slate-300 transition-colors">
                {logCount}
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900 cursor-pointer transition-all duration-200"
              aria-label="Toggle Theme"
              id="theme-toggle"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </button>
            
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-slate-950/10 dark:shadow-none"
              id="header-cta-button"
            >
              <span>Hire Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Bar Controls */}
          <div className="flex md:hidden items-center gap-2" id="mobile-controls">
            {/* Live Analytics HUD for Mobile */}
            <button
              onClick={onToggleAnalytics}
              className={`p-2.5 rounded-xl border text-sm transition-all duration-300 flex items-center justify-center ${
                isAnalyticsOpen 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30'
              }`}
              id="mobile-analytics-hud-trigger"
            >
              <BarChart3 className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-100 text-slate-600 dark:border-slate-800 dark:text-slate-400"
              id="mobile-theme-toggle"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-slate-100 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md absolute top-20 left-0 right-0 py-4 px-6 shadow-xl space-y-3" id="mobile-menu-panel">
          {[
            { id: 'services', label: 'Services' },
            { id: 'case-studies', label: 'Case Studies' },
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'contact', label: 'Contact Us' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left py-2.5 px-4 text-base font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-900/50 rounded-xl block transition-all"
              id={`mobile-nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2"
              id="mobile-cta-button"
            >
              <span>Get Free Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

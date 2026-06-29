import { Globe, Linkedin, Twitter, Github, Youtube, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export default function Footer() {
  const handleSocialClick = (platform: string) => {
    trackEvent('click', `Footer Social Icon: ${platform}`);
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    trackEvent('click', 'Scroll to Top button from Footer');
  };

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-900 dark:border-t dark:border-slate-800 transition-colors duration-200" id="global-footer">
      
      {/* Top Footer Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12" id="footer-layout-grid">
          
          {/* Col 1: Brand & Description */}
          <div className="lg:col-span-5 space-y-6">
            <div 
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              {/* Custom Infinity Logo SVG */}
              <svg 
                viewBox="0 0 50 50" 
                className="w-10 h-8 text-blue-400 group-hover:scale-115 transition-transform" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M16 15C8 15 2 21 2 25C2 29 8 35 16 35C24 35 26 15 34 15C42 15 48 21 48 25C48 29 42 35 34 35C26 35 24 15 16 15Z" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col">
                <span className="font-sans font-black text-white text-lg tracking-tight">
                  Sreevika Tech
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                    Continuous Innovation
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm font-light text-slate-400 leading-relaxed max-w-sm">
              Sreevika Tech provides premium software systems, cloud operations architectures, and custom AI retrieval pipelines to organizations globally. Ensuring a seamless user experience across all devices.
            </p>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-3 pt-2" id="footer-social-bar">
              {[
                { icon: <Linkedin className="w-4 h-4" />, name: 'LinkedIn', url: 'https://linkedin.com' },
                { icon: <Twitter className="w-4 h-4" />, name: 'X / Twitter', url: 'https://x.com' },
                { icon: <Github className="w-4 h-4" />, name: 'GitHub', url: 'https://github.com' },
                { icon: <Youtube className="w-4 h-4" />, name: 'YouTube', url: 'https://youtube.com' }
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(soc.name)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title={`Follow us on ${soc.name}`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Capabilities Quicklinks */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider">
              Engineering Focus
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              {[
                { label: 'Custom Software', id: 'services' },
                { label: 'Cloud & Infrastructure', id: 'services' },
                { label: 'AI & Machine Learning', id: 'services' },
                { label: 'Mobile Application Core', id: 'services' },
                { label: 'Cybersecurity Compliance', id: 'services' },
                { label: 'Agile CTO Consulting', id: 'services' }
              ].map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleNavClick(item.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-sans font-bold text-xs uppercase tracking-wider">
              Contact Channels
            </h4>
            <ul className="space-y-3.5 text-sm font-light">
              <li className="flex items-start gap-3">
                <Mail className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                <a href="mailto:solutions@sreevika.com" className="hover:text-white transition-colors">
                  solutions@sreevika.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                <a href="tel:+918045678912" className="hover:text-white transition-colors">
                  +91 (80) 4567 8912
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Tech Park Alpha, Outer Ring Road, Bengaluru, Karnataka, India - 560103
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="bg-slate-900 text-xs py-6 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 font-light text-center sm:text-left">
            <span>© 2026 <strong>Sreevika Tech</strong>. All rights reserved globally.</span>
          </div>
          
          <div className="flex items-center gap-6 text-slate-500 font-light">
            <button onClick={() => handleNavClick('services')} className="hover:text-slate-300">SLA Terms</button>
            <span>•</span>
            <button onClick={() => handleNavClick('contact')} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button 
              onClick={scrollToTop} 
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}

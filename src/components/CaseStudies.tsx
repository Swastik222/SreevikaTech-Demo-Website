import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Share2, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Link2, 
  Clock, 
  X, 
  ArrowUpRight, 
  ChevronRight, 
  Sparkles,
  ClipboardCheck,
  Building,
  CheckCircle2
} from 'lucide-react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';
import { trackEvent } from '../utils/analytics';

export default function CaseStudies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [sharingStudyId, setSharingStudyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced Logging of Search Queries to Analytics
  useEffect(() => {
    if (!searchQuery.trim()) return;

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      trackEvent('search', `Search Case Studies: "${searchQuery}"`, { query: searchQuery });
    }, 800);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  const filteredStudies = CASE_STUDIES.filter(cs => {
    const query = searchQuery.toLowerCase();
    return (
      cs.title.toLowerCase().includes(query) ||
      cs.client.toLowerCase().includes(query) ||
      cs.description.toLowerCase().includes(query) ||
      cs.category.toLowerCase().includes(query) ||
      cs.industry.toLowerCase().includes(query) ||
      cs.challenge.toLowerCase().includes(query)
    );
  });

  const handleStudyClick = (study: CaseStudy) => {
    setSelectedStudy(study);
    trackEvent('click', `Case Study: ${study.title}`);
  };

  const handleShareClick = (e: MouseEvent, studyId: string) => {
    e.stopPropagation();
    setSharingStudyId(sharingStudyId === studyId ? null : studyId);
    trackEvent('click', `Toggle Share Menu: CS-${studyId}`);
  };

  const handleSocialShare = (platform: string, studyTitle: string) => {
    setSharingStudyId(null);
    trackEvent('share', `Shared Case Study [${studyTitle}] via ${platform}`);
    alert(`Thank you for sharing! Content link formatted for ${platform} has been logged.`);
  };

  const handleCopyLink = (e: MouseEvent, studyId: string, title: string) => {
    e.stopPropagation();
    const mockUrl = `${window.location.origin}/case-studies/${studyId}`;
    navigator.clipboard.writeText(mockUrl).then(() => {
      setCopiedId(studyId);
      trackEvent('share', `Copied link to clipboard for Case Study: ${title}`);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      alert("Unable to write link to clipboard. Action logged.");
    });
  };

  return (
    <section 
      className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900 transition-colors duration-200"
      id="case-studies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="case-studies-header-block">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-600/10 px-3.5 py-1.5 rounded-full border border-blue-100/60 dark:border-blue-900/30">
              Proven Results
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Real-World Impact
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light text-sm sm:text-base">
              Explore our engineering case studies to see how we help clients optimize complex processes, secure data pipelines, and achieve massive digital scale.
            </p>
          </div>

          {/* Effortless Live Search Bar */}
          <div className="relative w-full md:w-80 lg:w-96" id="case-study-search-bar">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies (e.g. cloud, AI)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all shadow-sm"
              id="case-study-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                id="clear-search-btn"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State when no results found */}
        {filteredStudies.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm" id="empty-search-state">
            <p className="text-slate-500 dark:text-slate-400 text-base">
              No case studies match your query: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">"{searchQuery}"</span>
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 font-semibold text-xs rounded-xl hover:bg-blue-100 transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          /* Case Studies Grid */
          <div className="grid md:grid-cols-2 gap-8" id="case-studies-grid">
            {filteredStudies.map((study, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={study.id}
                onClick={() => handleStudyClick(study)}
                className="group relative bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/20 dark:hover:border-blue-500/20 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
                id={`case-study-card-${study.id}`}
              >
                
                {/* Main Card Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Category, Year & Shares Line */}
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 dark:text-slate-400" id="case-study-tags">
                    <span className="text-blue-600 dark:text-blue-400">{study.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px]">{study.year}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{study.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Client & Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{study.client}</span>
                    </div>
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {study.title}
                    </h3>
                  </div>

                  {/* High-Impact Stat Callout Banner */}
                  <div className="p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl border border-blue-500/10 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Recorded Output Metric:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-sans font-extrabold text-blue-600 dark:text-blue-400">{study.impactValue}</span>
                      <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">{study.impactMetric.split(' ')[0]}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                    {study.description}
                  </p>

                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between" id="case-study-card-footer">
                  
                  {/* Read More Button */}
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-semibold group-hover:gap-2 transition-all">
                    <span>Read Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  {/* Share Panel Container */}
                  <div className="relative">
                    <button
                      onClick={(e) => handleShareClick(e, study.id)}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                      title="Share Case Study"
                      id={`share-btn-${study.id}`}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* Social Media Share Popover */}
                    <AnimatePresence>
                      {sharingStudyId === study.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 5 }}
                          className="absolute right-0 bottom-full mb-2 z-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-2 shadow-xl flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                          id={`share-popover-${study.id}`}
                        >
                          <button
                            onClick={() => handleSocialShare('LinkedIn', study.title)}
                            className="p-2 rounded-lg text-[#0a66c2] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            title="Share on LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSocialShare('X (Twitter)', study.title)}
                            className="p-2 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            title="Share on X"
                          >
                            <Twitter className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleSocialShare('Facebook', study.title)}
                            className="p-2 rounded-lg text-[#1877f2] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            title="Share on Facebook"
                          >
                            <Facebook className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleCopyLink(e, study.id, study.title)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                            title="Copy URL Link"
                          >
                            {copiedId === study.id ? (
                              <ClipboardCheck className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Link2 className="w-4 h-4" />
                            )}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* Extended Case Study Details Modal Overlay */}
        <AnimatePresence>
          {selectedStudy && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedStudy(null)}
              id="case-study-details-modal"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Modal Header */}
                <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">
                      {selectedStudy.industry} • {selectedStudy.category}
                    </span>
                    <h3 className="font-sans font-extrabold text-2xl text-slate-900 dark:text-white leading-tight">
                      {selectedStudy.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span>Client: <strong>{selectedStudy.client}</strong></span>
                      <span>•</span>
                      <span>Year: {selectedStudy.year}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudy(null)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
                    id="close-modal-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm" id="modal-scrollable-body">
                  
                  {/* Performance Callout */}
                  <div className="grid sm:grid-cols-3 gap-4 p-5 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl border border-blue-500/10">
                    <div className="sm:col-span-2">
                      <span className="font-semibold text-slate-900 dark:text-white block text-sm">Peak Outcomes Recorded</span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-light block">Sreevika Tech solutions successfully validated.</span>
                    </div>
                    <div className="text-left sm:text-right flex flex-col justify-center">
                      <span className="text-3xl font-sans font-black text-blue-600 dark:text-blue-400">{selectedStudy.impactValue}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{selectedStudy.impactMetric}</span>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>The Business Challenge</span>
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                      {selectedStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>The Architectural Solution</span>
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                      {selectedStudy.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="space-y-3 pt-2">
                    <h4 className="font-sans font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Quantified Business Results</span>
                    </h4>
                    <ul className="grid sm:grid-cols-1 gap-3">
                      {selectedStudy.results.map((res, index) => (
                        <li key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Modal Footer CTA */}
                <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Want similar results for your company?</span>
                  <button
                    onClick={() => {
                      setSelectedStudy(null);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-semibold text-xs transition-all cursor-pointer"
                  >
                    <span>Hire Sreevika Engineers</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

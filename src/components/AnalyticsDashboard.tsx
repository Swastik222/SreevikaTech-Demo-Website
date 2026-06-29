import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  BarChart3, 
  Activity, 
  Mail, 
  User, 
  Search, 
  RefreshCw, 
  Globe, 
  Check, 
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  Inbox,
  Sparkles
} from 'lucide-react';
import { getAnalyticsSummary, clearAnalytics, getLogs } from '../utils/analytics';
import { AnalyticsSummary, AnalyticsLog } from '../types';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnalyticsDashboard({ isOpen, onClose }: AnalyticsDashboardProps) {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [logs, setLogs] = useState<AnalyticsLog[]>([]);
  const [activeTab, setActiveTab] = useState<'kpis' | 'inquiries' | 'subscribers' | 'logs'>('kpis');
  const [copiedData, setCopiedData] = useState(false);

  const fetchStats = () => {
    setSummary(getAnalyticsSummary());
    // Get last 20 raw logs sorted descending
    const rawLogs = getLogs();
    setLogs([...rawLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 25));
  };

  // Reload stats whenever the custom event fires
  useEffect(() => {
    if (isOpen) {
      fetchStats();
      window.addEventListener('analytics_updated', fetchStats);
    }
    return () => window.removeEventListener('analytics_updated', fetchStats);
  }, [isOpen]);

  const handleReset = () => {
    if (confirm('Are you sure you want to clear your local interaction history? This will reset custom logged events.')) {
      clearAnalytics();
      fetchStats();
    }
  };

  // Generate beautiful SVG coordinates for daily page views
  const renderAreaChart = () => {
    if (!summary || Object.keys(summary.dailyViews).length === 0) {
      return (
        <div className="h-44 flex items-center justify-center text-xs text-slate-400">
          Not enough historical views logged yet.
        </div>
      );
    }

    // Sort dates chronologically
    const sortedDates = Object.keys(summary.dailyViews).sort();
    const dataPoints = sortedDates.map(date => ({
      date: date.substring(5), // mm-dd
      views: summary.dailyViews[date]
    }));

    // Sizing
    const width = 500;
    const height = 140;
    const padding = 20;
    
    const maxVal = Math.max(...dataPoints.map(d => d.views), 10);
    
    // Convert data to SVG coordinates
    const points = dataPoints.map((dp, idx) => {
      const x = padding + (idx * (width - padding * 2)) / (dataPoints.length - 1 || 1);
      const y = height - padding - (dp.views * (height - padding * 2)) / maxVal;
      return { x, y, date: dp.date, views: dp.views };
    });

    // Generate path
    const pathD = points.reduce((acc, p, idx) => {
      return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    // Area fill path
    const areaD = points.length > 0 
      ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
      : '';

    return (
      <div className="space-y-2">
        <div className="relative h-44 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
          <div className="absolute top-3 left-4 flex items-center gap-1 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>7-Day Pageviews Timeline</span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            {[0, 0.5, 1].map((ratio, idx) => {
              const yVal = padding + ratio * (height - padding * 2);
              return (
                <line 
                  key={idx}
                  x1={padding}
                  y1={yVal}
                  x2={width - padding}
                  y2={yVal}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-200 dark:text-slate-800"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Area Fill */}
            {areaD && <path d={areaD} fill="url(#areaGradient)" />}

            {/* Path Stroke */}
            {pathD && (
              <path 
                d={pathD} 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data point circles and labels */}
            {points.map((p, idx) => (
              <g key={idx} className="group/dot">
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r="4" 
                  fill="#8b5cf6" 
                  className="stroke-white dark:stroke-slate-950 stroke-2"
                />
                {/* Tooltip on hover */}
                <text 
                  x={p.x} 
                  y={p.y - 8} 
                  textAnchor="middle" 
                  className="text-[10px] font-mono font-bold fill-blue-600 dark:fill-blue-400 opacity-0 group-hover/dot:opacity-100 transition-opacity"
                >
                  {p.views}
                </text>
                {/* X Axis Date labels */}
                <text 
                  x={p.x} 
                  y={height - 4} 
                  textAnchor="middle" 
                  className="text-[9px] font-mono fill-slate-400"
                >
                  {p.date}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  // Render horizontal comparative bars
  const renderHorizontalBars = (title: string, data: { [key: string]: number }, type: 'services' | 'casestudies') => {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return (
        <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
          No interactions captured yet. Click around Sreevika Tech services or case studies to generate live logs.
        </div>
      );
    }

    // Sort by count descending
    const sorted = [...entries].sort((a, b) => b[1] - a[1]).slice(0, 4);
    const maxVal = Math.max(...sorted.map(s => s[1]), 1);

    return (
      <div className="space-y-4">
        <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>{title}</span>
        </h4>
        <div className="space-y-3.5">
          {sorted.map(([name, count]) => {
            const pct = Math.min(100, Math.round((count / maxVal) * 100));
            return (
              <div key={name} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[80%]">{name}</span>
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-600/10 px-1.5 py-0.5 rounded">
                    {count} clicks
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                      type === 'services' ? 'from-blue-500 to-purple-500' : 'from-purple-500 to-pink-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!summary) return null;

  // Compute conversion metrics
  const totalLeads = summary.totalInquiries;
  const totalSignups = summary.totalNewsletterSignups;
  const conversionRate = summary.totalPageViews > 0 
    ? (((totalLeads + totalSignups) / summary.totalPageViews) * 100).toFixed(1) 
    : '0.0';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Drawer Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] md:w-[540px] bg-white dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
            id="analytics-dashboard-drawer"
          >
            {/* Drawer Header */}
            <div className="p-5 md:p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <BarChart3 className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-sans font-extrabold text-lg text-slate-950 dark:text-white">
                      Client Engagement HUD
                    </h3>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase block mt-0.5">
                    Live Session Telemetry
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                id="close-analytics-hud"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside HUD */}
            <div className="flex bg-slate-50/50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 py-2 gap-1" id="hud-nav-tabs">
              {[
                { id: 'kpis', label: 'Overview Metrics' },
                { id: 'inquiries', label: `Inquiries (${summary.totalInquiries})` },
                { id: 'subscribers', label: `Newsletter (${summary.totalNewsletterSignups})` },
                { id: 'logs', label: 'Streaming Events' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-1 text-center font-bold text-[10px] sm:text-xs rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-xs border border-slate-100 dark:bg-slate-900 dark:text-blue-400 dark:border-slate-800'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  id={`hud-tab-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Dashboard Body */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 bg-white dark:bg-slate-900" id="hud-body-scroll">
              
              {/* Tab 1: KPIs & Charts */}
              {activeTab === 'kpis' && (
                <div className="space-y-6" id="kpi-tab-panel">
                  
                  {/* Performance stats grids */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-500 uppercase font-bold">Pageviews (7d)</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-sans font-extrabold text-slate-900 dark:text-white">{summary.totalPageViews}</span>
                        <span className="text-emerald-500 text-[10px] font-mono font-bold">+18.5%</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-500 uppercase font-bold">Leads Secured</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-sans font-extrabold text-blue-600 dark:text-blue-400">{totalLeads + totalSignups}</span>
                        <span className="text-emerald-500 text-[10px] font-mono font-bold">+4.3%</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-500 uppercase font-bold">Conversion SLA</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-sans font-extrabold text-blue-600 dark:text-blue-400">{conversionRate}%</span>
                        <span className="text-slate-500 text-[10px] font-mono font-bold">Conversion</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-500 uppercase font-bold">Searches Made</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl font-sans font-extrabold text-slate-900 dark:text-white">{summary.totalSearches}</span>
                        <span className="text-slate-400 text-[10px] font-mono font-bold">Effortless</span>
                      </div>
                    </div>
                  </div>

                  {/* Daily area timeline */}
                  {renderAreaChart()}

                  {/* Top services analytics */}
                  {renderHorizontalBars('Engineering Service Interactions', summary.popularServices, 'services')}

                  {/* Top case studies analytics */}
                  {renderHorizontalBars('Case Studies Read & Shared', summary.popularCaseStudies, 'casestudies')}

                </div>
              )}

              {/* Tab 2: Project Inquiries Review */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4" id="inquiries-tab-panel">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Inbox className="w-4 h-4 text-slate-400" />
                      <span>Active Sales Funnel ({summary.totalInquiries} Leads)</span>
                    </h4>
                  </div>

                  {summary.recentInquiries.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 border border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                      No project inquiries stored in local database. Fill out the contact form to generate live inputs!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {summary.recentInquiries.map((inq) => (
                        <div 
                          key={inq.id}
                          className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl space-y-3"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="space-y-0.5">
                              <span className="flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-white">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                {inq.name}
                              </span>
                              <span className="block text-[10px] font-mono text-slate-500">{inq.email}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                              {new Date(inq.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {inq.company && (
                              <span className="bg-slate-200/50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded font-medium">
                                {inq.company}
                              </span>
                            )}
                            <span className="bg-blue-50 text-blue-600 dark:bg-blue-600/10 dark:text-blue-400 text-[10px] px-2 py-0.5 rounded font-bold">
                              {inq.service}
                            </span>
                          </div>

                          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed italic border-l-2 border-blue-500 pl-3.5 py-0.5">
                            "{inq.message}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Newsletter Subscribers List */}
              {activeTab === 'subscribers' && (
                <div className="space-y-4" id="subscribers-tab-panel">
                  <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Registered Newsletter subscribers ({summary.totalNewsletterSignups})</span>
                  </h4>

                  {summary.totalNewsletterSignups === 0 ? (
                    <div className="p-8 text-center text-slate-400 border border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                      No email subscribers registered yet. Use the newsletter signup card inside the Contact section.
                    </div>
                  ) : (
                    <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-900">
                      {summary.recentInquiries.length >= 0 && (
                        <div className="bg-slate-50/50 dark:bg-slate-900 p-4">
                          <span className="text-[10px] text-slate-400 block font-mono">Real-time CSV formatted logs ready for export.</span>
                        </div>
                      )}
                      {getLogs().filter(l => l.type === 'newsletter_submit').map((log, idx) => {
                        const email = log.label.replace('Newsletter signup: ', '');
                        return (
                          <div key={idx} className="p-3.5 flex items-center justify-between gap-4 text-xs bg-slate-50/20 dark:bg-slate-900/20">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {new Date(log.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Live Event Stream */}
              {activeTab === 'logs' && (
                <div className="space-y-4" id="logs-tab-panel">
                  <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-slate-400 animate-pulse text-emerald-500" />
                    <span>Live Session Logs</span>
                  </h4>

                  <div className="bg-slate-900 text-slate-300 font-mono text-[10px] p-4 rounded-2xl border border-slate-800 shadow-inner h-80 overflow-y-auto space-y-2 no-scrollbar">
                    {logs.map((log) => {
                      const dateStr = new Date(log.timestamp).toLocaleTimeString();
                      let typeColor = 'text-blue-400';
                      if (log.type === 'contact_submit') typeColor = 'text-emerald-400';
                      if (log.type === 'newsletter_submit') typeColor = 'text-pink-400';
                      if (log.type === 'theme_toggle') typeColor = 'text-amber-400';
                      if (log.type === 'search') typeColor = 'text-sky-400';
                      if (log.type === 'share') typeColor = 'text-purple-400';

                      return (
                        <div key={log.id} className="border-b border-slate-900 pb-1 flex items-start gap-1.5">
                          <span className="text-slate-500 shrink-0">[{dateStr}]</span>
                          <span className={`font-bold uppercase ${typeColor} shrink-0`}>[{log.type}]</span>
                          <span className="text-slate-400 break-all">{log.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer controls */}
            <div className="p-5 md:p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-3.5 py-2.5 rounded-xl border border-rose-100 dark:border-rose-950/30 cursor-pointer flex items-center gap-1.5"
                id="reset-analytics-btn"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Telemetry</span>
              </button>
              
              <button
                onClick={() => {
                  setCopiedData(true);
                  navigator.clipboard.writeText(JSON.stringify(getLogs(), null, 2));
                  setTimeout(() => setCopiedData(false), 2000);
                }}
                className="text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 px-4.5 py-2.5 rounded-xl cursor-pointer"
                id="export-analytics-btn"
              >
                {copiedData ? 'Logs Copied!' : 'Export JSON Log'}
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

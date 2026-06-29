import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck, Award, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section 
      className="py-20 md:py-28 bg-white dark:bg-slate-900 transition-colors duration-200"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="testimonials-header">
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-600/10 px-3.5 py-1.5 rounded-full border border-blue-100/60 dark:border-blue-900/30">
            Client Success
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Endorsed by Global Product Leaders
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-base sm:text-lg">
            See how Sreevika Tech helps technical executives, founders, and compliance managers architect secure, robust applications worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={t.id}
              className="relative flex flex-col justify-between bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300"
              id={`testimonial-card-${t.id}`}
            >
              {/* Giant quote mark back decoration */}
              <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-200/55 dark:text-slate-800/20 pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-slate-200/50 dark:border-slate-700/50" id="author-info">
                {/* Generated Dicebear Avatar */}
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${t.avatarSeed}&backgroundColor=6366f1,c084fc`}
                  alt={t.name}
                  className="w-12 h-12 rounded-xl bg-blue-100/30 dark:bg-slate-800/40 p-1 shrink-0 border border-slate-200/40 dark:border-slate-800"
                  referrerPolicy="no-referrer"
                  id={`author-avatar-${t.id}`}
                />
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {t.company}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Global Verification Badges Bar */}
        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" id="global-trust-badges">
          {[
            { icon: <ShieldCheck className="w-6 h-6 text-blue-500 mx-auto" />, label: 'SOC2 Security Ready', sub: 'Rigid encryption' },
            { icon: <Award className="w-6 h-6 text-blue-500 mx-auto" />, label: 'ISO Compliant Core', sub: 'Standardized delivery' },
            { icon: <ThumbsUp className="w-6 h-6 text-blue-500 mx-auto" />, label: '99% CSAT Rating', sub: 'Verified by executives' },
            { icon: <Star className="w-6 h-6 text-blue-500 mx-auto" />, label: '100% On-Time Delivery', sub: 'Milestone tracking' }
          ].map((badge, idx) => (
            <div key={idx} className="space-y-2">
              <div className="p-2 w-12 h-12 bg-blue-50 dark:bg-blue-600/10 rounded-xl border border-blue-100/40 dark:border-blue-900/30 flex items-center justify-center mx-auto">
                {badge.icon}
              </div>
              <div>
                <h5 className="font-sans font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{badge.label}</h5>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-500 font-light">{badge.sub}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

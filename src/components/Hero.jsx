import { motion } from "motion/react";
import { ArrowRight, Terminal, Globe, Sparkles, CodeXml } from "lucide-react";
import { trackEvent } from "../utils/analytics";

export default function Hero() {
  const handleCtaClick = (sectionId, label) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    trackEvent("click", `Hero CTA: ${label}`);
  };

  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-transparent transition-colors duration-200"
      id="home"
    >
      {/* Decorative Radial Gradients for Deep Contrast Ambient Vibe */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl -translate-y-1/2 pointer-events-none dark:bg-blue-900/40/20" />
      <div className="absolute right-10 bottom-0 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl translate-y-1/3 pointer-events-none dark:bg-purple-950/15" />

      {/* Interactive Floating Background Elements (representing lines of code and orbits) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none select-none font-mono text-xs overflow-hidden hidden lg:block">
        <div className="absolute top-24 left-10 text-blue-500 animate-pulse duration-[4s]">
          {`const sreevika = { mission: "continuous_innovation", locations: "global" };`}
        </div>
        <div className="absolute top-48 right-12 text-pink-500 animate-pulse duration-[6s]">
          {`import { orchestrateCloud } from '@sreevika/devops';`}
        </div>
        <div className="absolute bottom-20 left-16 text-violet-500 animate-pulse duration-[5s]">
          {`await buildDurableArchitecture({ database: "distributed", replication: "realtime" });`}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
            id="hero-content"
          >
            {/* Animated Micro Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/60 dark:bg-blue-600/10 dark:border-blue-900/40 text-xs font-semibold text-blue-600 dark:text-blue-400"
              id="hero-micro-badge"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 animate-spin duration-[15s]" />
              <span>Pioneering Next-Gen Global IT Engineering</span>
            </motion.div>

            {/* Core Value Proposition Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.1] dark:text-white"
                id="hero-heading"
              >
                Engineering High-Performance{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                  Software Solutions
                </span>{" "}
                for the Global Frontier.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
                id="hero-description"
              >
                Sreevika Tech is a premium software engineering firm delivering
                mission-critical web applications, scalable cloud microservices,
                and bespoke intelligence nodes to clients globally. Built with
                speed, safety, and absolute reliability.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero-ctas"
            >
              <button
                onClick={() =>
                  handleCtaClick("case-studies", "Explore Case Studies")
                }
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all duration-300 cursor-pointer text-sm sm:text-base"
                id="hero-primary-cta"
              >
                <span>View Case Studies</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() =>
                  handleCtaClick("contact", "Request Consultation")
                }
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 font-medium px-7 py-3.5 rounded-xl transition-all duration-300 cursor-pointer text-sm sm:text-base"
                id="hero-secondary-cta"
              >
                <span>Request Consultation</span>
              </button>
            </motion.div>

            {/* Floating Global Tech Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800"
              id="hero-highlights"
            >
              {[
                {
                  label: "Uptime SLA",
                  val: "99.99%",
                  sub: "Enterprise guarantee",
                },
                {
                  label: "Global Clients",
                  val: "24/7",
                  sub: "Seamless coverage",
                },
                {
                  label: "Production Apps",
                  val: "40+",
                  sub: "Deployed in Cloud",
                },
                {
                  label: "Core Engineers",
                  val: "Elite",
                  sub: "Advanced stack",
                },
              ].map((hl, i) => (
                <div
                  key={i}
                  className="text-center lg:text-left p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-900/40 transition-colors duration-200"
                >
                  <span className="block text-2xl font-sans font-extrabold text-slate-900 dark:text-white">
                    {hl.val}
                  </span>
                  <span className="block text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    {hl.label}
                  </span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">
                    {hl.sub}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Right Visual Column - Modern Interactive Mock Console */}
          <div className="lg:col-span-5 relative" id="hero-terminal-column">
            {/* Visual background glows */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 to-pink-600/10 rounded-3xl blur-2xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-slate-900 rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden font-mono text-xs text-slate-300"
              id="interactive-terminal"
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span>sreevika-system-node</span>
                </div>
                <div className="w-4" />
              </div>

              {/* Terminal Body */}
              <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto no-scrollbar text-[11px] sm:text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-slate-500">guest@sreevika-tech:~$</span>
                  <span className="text-blue-300">
                    npx init sreevika-digital-core
                  </span>
                </div>
                <div className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span>
                    [SUCCESS] Connection authorized on secure tunnel...
                  </span>
                </div>
                <div className="text-slate-400 text-[10px] pl-2 border-l border-slate-800">
                  {`> Routing endpoint: Mumbai / Singapore / Dublin`}
                  <br />
                  {`> Handshaking protocol: Secure OAuth v2`}
                  <br />
                  {`> Initializing live cluster: 3 nodes active`}
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-slate-500">guest@sreevika-tech:~$</span>
                  <span className="text-blue-300">cat capabilities.json</span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/60 font-mono text-slate-400 space-y-1 text-[11px]">
                  <div>
                    <span className="text-blue-400">"performance"</span>:{" "}
                    <span className="text-pink-400">"sub-second loads"</span>,
                  </div>
                  <div>
                    <span className="text-blue-400">"geographies"</span>: [
                    <span className="text-emerald-400">"USA"</span>,{" "}
                    <span className="text-emerald-400">"EU"</span>,{" "}
                    <span className="text-emerald-400">"APAC"</span>],
                  </div>
                  <div>
                    <span className="text-blue-400">"methodologies"</span>:{" "}
                    <span className="text-pink-400">"Agile / Test-Driven"</span>
                    ,
                  </div>
                  <div>
                    <span className="text-blue-400">"standards"</span>: [
                    <span className="text-emerald-400">"HIPAA"</span>,{" "}
                    <span className="text-emerald-400">"SOC2"</span>,{" "}
                    <span className="text-emerald-400">"PCI-DSS"</span>]
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-3">
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <CodeXml className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Server Status: LIVE</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    <span>Global CDN: ACTIVE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

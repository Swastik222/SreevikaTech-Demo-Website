import { useState } from "react";
import { motion } from "motion/react";
import {
  Code,
  Cloud,
  BrainCircuit,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Check,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "../data";
import { trackEvent } from "../utils/analytics";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dynamic Lucide Icon Mapper
  const renderIcon = (iconName) => {
    const iconClass = "w-6 h-6 text-blue-600 dark:text-blue-400";
    switch (iconName) {
      case "Code":
        return <Code className={iconClass} />;
      case "Cloud":
        return <Cloud className={iconClass} />;
      case "BrainCircuit":
        return <BrainCircuit className={iconClass} />;
      case "Smartphone":
        return <Smartphone className={iconClass} />;
      case "ShieldCheck":
        return <ShieldCheck className={iconClass} />;
      case "TrendingUp":
        return <TrendingUp className={iconClass} />;
      default:
        return <Code className={iconClass} />;
    }
  };

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "engineering", label: "Engineering" },
    { id: "cloud", label: "Cloud & Infrastructure" },
    { id: "enterprise", label: "Enterprise Security" },
    { id: "consulting", label: "Technical Consulting" },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  const handleServiceClick = (service) => {
    trackEvent("click", `Service: ${service.title}`);
  };

  const handleCategoryChange = (catId, label) => {
    setSelectedCategory(catId);
    trackEvent("click", `Service Category Filter: ${label}`);
  };

  return (
    <section
      className="py-20 md:py-28 bg-transparent transition-colors duration-200"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          id="services-header"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-600/10 px-3.5 py-1.5 rounded-full border border-blue-100/60 dark:border-blue-900/30">
            What We Deliver
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Comprehensive Software Engineering & IT Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-base sm:text-lg">
            We architect, deploy, and scale digital assets for organizations
            requiring peak throughput, rigid database integrity, and premium
            layouts.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div
          className="flex flex-wrap justify-center items-center gap-2 mb-12"
          id="services-category-tabs"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id, cat.label)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 dark:bg-blue-500"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900"
              }`}
              id={`service-cat-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="services-grid"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="group relative flex flex-col justify-between bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-700/50 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-slate-950/5 dark:hover:shadow-none transition-all duration-300 cursor-pointer"
              id={`service-card-${service.id}`}
            >
              <div className="space-y-6">
                {/* Header Icon Ring */}
                <div className="inline-flex p-3 rounded-xl bg-blue-50 dark:bg-blue-600/10 border border-blue-100/40 dark:border-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(service.iconName)}
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Service features list */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  {service.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-semibold mt-8 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 group-hover:gap-2.5 transition-all">
                <span>Inquire About {service.title.split(" ")[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Client Reach callout */}
        <div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-pink-500/5 border border-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-6"
          id="services-global-reach"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-sans font-bold text-lg text-slate-900 dark:text-white">
              Need a completely bespoke, highly customized software solution?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-light">
              We offer personalized systems engineering consultation to design
              precise databases, compliance logic, and scalable deployments.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              trackEvent("click", "Consultation CTA from Services Callout");
            }}
            className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer"
            id="consultation-cta-services"
          >
            Schedule Technical Assessment
          </button>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Send,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Globe2,
  Lock,
} from "lucide-react";
import { saveInquiry, saveSubscriber } from "../utils/analytics";

export default function ContactForm() {
  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("Custom Software Engineering");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  // Newsletter State
  const [newsEmail, setNewsEmail] = useState("");
  const [newsStatus, setNewsStatus] = useState("idle");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate network delay of 1s
    setTimeout(() => {
      saveInquiry({
        name,
        email,
        company,
        service,
        message,
      });

      setIsSubmitting(false);
      setSubmitStatus("success");

      // Clear fields
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      // Auto-dismiss success notification after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1000);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsEmail || !emailRegex.test(newsEmail)) {
      setNewsStatus("invalid");
      setTimeout(() => setNewsStatus("idle"), 4000);
      return;
    }

    const success = saveSubscriber(newsEmail);
    if (success) {
      setNewsStatus("success");
      setNewsEmail("");
    } else {
      setNewsStatus("exists");
    }

    setTimeout(() => setNewsStatus("idle"), 5000);
  };

  return (
    <section
      className="py-20 md:py-28 bg-transparent transition-colors duration-200"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          id="contact-title-block"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-600/10 px-3.5 py-1.5 rounded-full border border-blue-100/60 dark:border-blue-900/30">
            Get In Touch
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Initiate a Free Technical Assessment
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-base sm:text-lg">
            Ready to scale your digital services globally? Contact our
            engineering group today. We respond with formal scopes within 24
            hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12" id="contact-grid">
          {/* Left Column: Contact Channels & Newsletter */}
          <div className="lg:col-span-5 space-y-8" id="contact-details-column">
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white">
                Global Operations Hubs
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light">
                Our remote engineering networks operate continuously to ensure
                seamless support across all standard business timezones.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-600/10 border border-blue-100/40 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Corporate Mailbox
                    </span>
                    <a
                      href="mailto:solutions@sreevika.com"
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      solutions@sreevika.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-600/10 border border-blue-100/40 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Direct Hotline
                    </span>
                    <a
                      href="tel:+918045678912"
                      className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      +91 (80) 4567 8912
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-600/10 border border-blue-100/40 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Corporate Headquarters
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Tech Park Alpha, Outer Ring Road, Bengaluru, Karnataka,
                      India - 560103
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-600/10 border border-blue-100/40 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Global Reach
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Delivering premium IT services to clients across USA,
                      Europe, and Asia-Pacific.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Card */}
            <div
              className="bg-gradient-to-br from-blue-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden"
              id="newsletter-form-container"
            >
              {/* background design elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <div className="inline-flex gap-1.5 items-center px-2.5 py-1 rounded-full bg-blue-800/50 border border-blue-700/60 text-[10px] font-mono tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Stay Updated</span>
                </div>
                <h3 className="font-sans font-extrabold text-xl">
                  Sreevika Tech Insights
                </h3>
                <p className="text-xs text-blue-200/80 leading-relaxed font-light">
                  Subscribe to our quarterly engineering bulletin. Get technical
                  deep-dives into microservices, database normalization, and
                  system scalability.
                </p>
              </div>

              <form
                onSubmit={handleNewsletterSubmit}
                className="space-y-2.5"
                id="newsletter-form"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Enter your corporate email..."
                    className="w-full px-4 py-3 rounded-xl bg-blue-950/60 border border-blue-700/60 text-xs text-white placeholder-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    id="newsletter-email-input"
                  />

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-blue-950 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    id="newsletter-submit-btn"
                  >
                    Subscribe
                  </button>
                </div>

                {/* Inline Status Messages */}
                <AnimatePresence mode="wait">
                  {newsStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-400 text-[11px] font-medium flex items-center gap-1.5 pt-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        Successfully subscribed to Sreevika Tech bulletins!
                      </span>
                    </motion.div>
                  )}
                  {newsStatus === "exists" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-amber-400 text-[11px] font-medium flex items-center gap-1.5 pt-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        This email is already in our subscription log.
                      </span>
                    </motion.div>
                  )}
                  {newsStatus === "invalid" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-rose-400 text-[11px] font-medium flex items-center gap-1.5 pt-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Please enter a valid business email address.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Right Column: Custom Interactive Contact Form */}
          <div className="lg:col-span-7" id="contact-form-column">
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-sans font-bold text-xl text-slate-900 dark:text-white mb-6">
                Project Scope Inquiry
              </h3>

              <form
                onSubmit={handleContactSubmit}
                className="space-y-5"
                id="inquiry-form"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all"
                      id="inquiry-name-input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jdoe@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all"
                      id="inquiry-email-input"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Global Enterprise Inc."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all"
                      id="inquiry-company-input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Target Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all"
                      id="inquiry-service-input"
                    >
                      <option value="Custom Software Engineering">
                        Custom Software Engineering
                      </option>
                      <option value="Cloud & DevOps Solutions">
                        Cloud & DevOps Solutions
                      </option>
                      <option value="AI & Machine Learning Integrations">
                        AI & Machine Learning Integrations
                      </option>
                      <option value="Mobile App Development">
                        Mobile App Development
                      </option>
                      <option value="Cybersecurity & Compliance">
                        Cybersecurity & Compliance
                      </option>
                      <option value="Agile Product Consulting">
                        Agile Product Consulting
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Project Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide a high-level summary of your database volume, timeline constraints, compliance audits, or engineering objectives..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all resize-none"
                    id="inquiry-message-input"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-light pt-1">
                  <Lock className="w-3.5 h-3.5 text-blue-500" />
                  <span>
                    Sreevika Tech is fully GDPR compliant. Information is
                    processed securely.
                  </span>
                </div>

                {/* Feedback Message Block */}
                <AnimatePresence mode="wait">
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400 flex items-start gap-3"
                      id="submit-success-alert"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-semibold">
                          Inquiry Logs Successfully Filed!
                        </span>
                        <span className="block text-xs font-light mt-0.5">
                          Thank you, {name}. Sreevika Tech's lead systems
                          architect has been routed this request. Track
                          conversion live on the HUD!
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400 flex items-start gap-3"
                      id="submit-error-alert"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-semibold">
                          Unable to Process Inquiry
                        </span>
                        <span className="block text-xs font-light mt-0.5">
                          Please fill out all required fields (*) with valid
                          corporate contact credentials.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md shadow-blue-600/10 disabled:opacity-50"
                  id="inquiry-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Project Specifications</span>
                      <Send className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

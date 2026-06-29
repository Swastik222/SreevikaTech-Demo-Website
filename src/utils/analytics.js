const STORAGE_KEYS = {
  LOGS: "sreevika_analytics_logs",
  INQUIRIES: "sreevika_inquiries",
  SUBSCRIBERS: "sreevika_subscribers",
};

// Seed initial history to make the analytics dashboard highly insightful right on first render
const createSeedLogs = () => {
  const seed = [];
  const now = new Date();
  // Seed page views and interactions for the last 7 days
  const services = [
    "Custom Software",
    "Cloud Architecture",
    "Mobile Apps",
    "AI Integrations",
    "DevOps Automations",
  ];
  const caseStudies = [
    "Global Logistics Platform",
    "Fintech Security Engine",
    "Healthcare IoT Core",
    "AI Demand Planner",
  ];
  const queries = ["cloud", "security", "logistics", "AI", "react"];
  for (let i = 7; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split("T")[0];
    // Page views (approx 15-40 per day)
    const viewsCount = Math.floor(20 + Math.random() * 30);
    for (let v = 0; v < viewsCount; v++) {
      const viewTime = new Date(
        date.getTime() + Math.random() * 24 * 60 * 60 * 1000,
      );
      seed.push({
        id: `seed-pv-${i}-${v}`,
        type: "pageview",
        label:
          v % 5 === 0
            ? "Home Section"
            : v % 5 === 1
              ? "Services Section"
              : v % 5 === 2
                ? "Case Studies Section"
                : "Contact Section",
        timestamp: viewTime.toISOString(),
      });
    }

    // Service Clicks
    const clickCount = Math.floor(3 + Math.random() * 8);
    for (let c = 0; c < clickCount; c++) {
      const clickTime = new Date(
        date.getTime() + Math.random() * 24 * 60 * 60 * 1000,
      );
      const srv = services[Math.floor(Math.random() * services.length)];
      seed.push({
        id: `seed-sc-${i}-${c}`,
        type: "click",
        label: `Service: ${srv}`,
        timestamp: clickTime.toISOString(),
      });
    }

    // Search queries
    if (Math.random() > 0.4) {
      const qTime = new Date(
        date.getTime() + Math.random() * 24 * 60 * 60 * 1000,
      );
      const q = queries[Math.floor(Math.random() * queries.length)];
      seed.push({
        id: `seed-sh-${i}`,
        type: "search",
        label: `Search: "${q}"`,
        timestamp: qTime.toISOString(),
        meta: { query: q },
      });
    }

    // Case Study read-more clicks
    const csCount = Math.floor(1 + Math.random() * 4);
    for (let cs = 0; cs < csCount; cs++) {
      const csTime = new Date(
        date.getTime() + Math.random() * 24 * 60 * 60 * 1000,
      );
      const study = caseStudies[Math.floor(Math.random() * caseStudies.length)];
      seed.push({
        id: `seed-cs-${i}-${cs}`,
        type: "click",
        label: `Case Study: ${study}`,
        timestamp: csTime.toISOString(),
      });
    }

    // Social share clicks
    if (Math.random() > 0.7) {
      const shareTime = new Date(
        date.getTime() + Math.random() * 24 * 60 * 60 * 1000,
      );
      seed.push({
        id: `seed-share-${i}`,
        type: "share",
        label: `Shared: LinkedIn`,
        timestamp: shareTime.toISOString(),
      });
    }
  }

  return seed;
};

// Seed initial inquiries
const createSeedInquiries = () => {
  return [
    {
      id: "seed-inq-1",
      name: "Sarah Jenkins",
      email: "sjenkins@globaltech.com",
      company: "GlobalTech Solutions",
      service: "Cloud Architecture & Migration",
      message:
        "Looking to migrate our legacy microservices stack to GCP with Kubernetes support. We are looking for a reliable partner in India with global reach.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "seed-inq-2",
      name: "Rajesh Nair",
      email: "nair.r@vistasecure.co",
      company: "Vista Secure",
      service: "Custom Software Engineering",
      message:
        "Interested in building an end-to-end fintech dashboard with high security protocols. Needs a responsive and pixel-perfect design.",
      timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export const getLogs = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
  if (!stored) {
    const seed = createSeedLogs();
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const getInquiries = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  if (!stored) {
    const seed = createSeedInquiries();
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const getSubscribers = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const trackEvent = (type, label, meta) => {
  if (typeof window === "undefined") return;
  const logs = getLogs();
  const newLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    label,
    timestamp: new Date().toISOString(),
    meta,
  };
  logs.push(newLog);
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  // Dispatch custom event to notify React components to update in real time
  window.dispatchEvent(new CustomEvent("analytics_updated"));
};

export const saveInquiry = (inquiryData) => {
  const inquiries = getInquiries();
  const newInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  inquiries.push(newInquiry);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  // Track this event
  trackEvent(
    "contact_submit",
    `Inquiry by ${newInquiry.name} (${newInquiry.service})`,
  );
  return newInquiry;
};

export const saveSubscriber = (email) => {
  const subscribers = getSubscribers();
  const exists = subscribers.some(
    (s) => s.email.toLowerCase() === email.toLowerCase(),
  );
  if (exists) {
    return false;
  }
  const newSub = {
    email,
    timestamp: new Date().toISOString(),
  };
  subscribers.push(newSub);
  localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
  // Track event
  trackEvent("newsletter_submit", `Newsletter signup: ${email}`);
  return true;
};

export const getAnalyticsSummary = () => {
  const logs = getLogs();
  const inquiries = getInquiries();
  const subscribers = getSubscribers();
  let totalPageViews = 0;
  let totalServiceClicks = 0;
  let totalSearches = 0;
  let totalShares = 0;
  let themeToggleCount = 0;
  const dailyViews = {};
  const popularServices = {};
  const popularCaseStudies = {};
  logs.forEach((log) => {
    // Group views by date
    const dateStr = log.timestamp.split("T")[0];
    if (log.type === "pageview") {
      totalPageViews++;
      dailyViews[dateStr] = (dailyViews[dateStr] || 0) + 1;
    } else if (log.type === "click") {
      if (log.label.startsWith("Service: ")) {
        totalServiceClicks++;
        const sName = log.label.replace("Service: ", "");
        popularServices[sName] = (popularServices[sName] || 0) + 1;
      } else if (log.label.startsWith("Case Study: ")) {
        const csName = log.label.replace("Case Study: ", "");
        popularCaseStudies[csName] = (popularCaseStudies[csName] || 0) + 1;
      }
    } else if (log.type === "search") {
      totalSearches++;
    } else if (log.type === "share") {
      totalShares++;
    } else if (log.type === "theme_toggle") {
      themeToggleCount++;
    }
  });

  return {
    totalPageViews,
    totalServiceClicks,
    totalSearches,
    totalInquiries: inquiries.length,
    totalNewsletterSignups: subscribers.length,
    totalShares,
    themeToggleCount,
    dailyViews,
    popularServices,
    popularCaseStudies,
    recentInquiries: [...inquiries]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 5),
  };
};

export const clearAnalytics = () => {
  localStorage.removeItem(STORAGE_KEYS.LOGS);
  localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  localStorage.removeItem(STORAGE_KEYS.SUBSCRIBERS);
  window.dispatchEvent(new CustomEvent("analytics_updated"));
};

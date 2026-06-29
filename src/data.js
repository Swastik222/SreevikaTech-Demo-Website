export const SERVICES = [
  {
    id: "srv-1",
    title: "Custom Software Engineering",
    description:
      "Bespoke full-stack web applications, APIs, and microservices crafted with React, Node, and TypeScript. Engineered for modularity, high performance, and rapid load times on mobile connections.",
    iconName: "Code",
    category: "engineering",
    features: [
      "Interactive React & Node microservices",
      "High-performance REST & GraphQL APIs",
      "Robust state machines & database schemas",
      "Desktop-first precision & mobile-first layouts",
    ],
  },
  {
    id: "srv-2",
    title: "Cloud & DevOps Solutions",
    description:
      "High-availability Cloud deployments with automated CI/CD pipelines. We design resilient serverless architectures, Dockerize workloads, and orchestrate Kubernetes clusters on AWS and GCP.",
    iconName: "Cloud",
    category: "cloud",
    features: [
      "Multi-cloud orchestration (GCP, AWS)",
      "Infrastructure as Code (IaC) with Terraform",
      "Automated Zero-Downtime deployment pipelines",
      "Dockerization & Kubernetes scaling",
    ],
  },
  {
    id: "srv-3",
    title: "AI & Machine Learning Integrations",
    description:
      "Integrate generative intelligence into your business workflow. We develop bespoke LLM integration nodes, predictive analytics engines, search grounding pipelines, and conversational voice systems.",
    iconName: "BrainCircuit",
    category: "engineering",
    features: [
      "Generative AI & LLM custom agents",
      "Structured retrieval augmented generation (RAG)",
      "Data labeling, training, and predictive models",
      "Natural language voice and chat tools",
    ],
  },
  {
    id: "srv-4",
    title: "Mobile App Development",
    description:
      "Immersive iOS and Android applications utilizing React Native and Flutter. We emphasize high framerates, native-like gesture systems, offline-first sync caches, and push notification automation.",
    iconName: "Smartphone",
    category: "engineering",
    features: [
      "Cross-platform iOS & Android engineering",
      "Offline storage & background sync engine",
      "Interactive animations with React Native Reanimated",
      "Device native features (Biometrics, NFC, Camera)",
    ],
  },
  {
    id: "srv-5",
    title: "Cybersecurity & Compliance",
    description:
      "End-to-end audit, security compliance hardening, and identity management. Guard your workspace databases, APIs, and microservices against unauthorized breaches and SQL injection exploits.",
    iconName: "ShieldCheck",
    category: "enterprise",
    features: [
      "Comprehensive penetration testing & vulnerability audits",
      "OAuth2, Auth0, and Firebase Authentication hardening",
      "Data encryption-at-rest and TLS-in-transit setup",
      "GDPR, HIPAA, and SOC2 compliance strategy",
    ],
  },
  {
    id: "srv-6",
    title: "Agile Product Consulting",
    description:
      "Strategic technical leadership to refine your digital roadmap. We assist with system design, database architecture reviews, technical debt assessments, and scaling team operations globally.",
    iconName: "TrendingUp",
    category: "consulting",
    features: [
      "Product technical architecture & scaling roadmaps",
      "Database normalization & indexing optimization",
      "Agile process optimization & DevOps workshops",
      "CTO-as-a-Service for growth-stage startups",
    ],
  },
];

export const CASE_STUDIES = [
  {
    id: "cs-1",
    title: "Global Supply Chain Management Platform",
    client: "LogixFlow Logistics",
    description:
      "A cloud-native warehouse and inventory control system handling millions of active shipments globally with live vehicle coordinates and auto-optimized routing.",
    challenge:
      "LogixFlow needed to transition from legacy spreadsheets to a high-concurrency cloud platform with sub-second synchronization and offline capabilities for forklift operators.",
    solution:
      "Engineered a full-stack platform using React, Node.js, and Google Cloud Firestore. Implemented standard offline caching models and integrated a custom Map routing API.",
    results: [
      "Boosted global transit routing efficiency by 34%",
      "Eliminated manual inventory discrepancies by 99.8%",
      "Active connection handles up to 50,000 concurrent updates",
    ],
    category: "Cloud Engineering",
    industry: "Logistics & Supply Chain",
    impactMetric: "Routing Efficiency",
    impactValue: "+34%",
    year: "2025",
    readTime: "4 min",
  },
  {
    id: "cs-2",
    title: "High-Throughput Fintech Transaction Core",
    client: "NexaPay Finance",
    description:
      "A state-of-the-art secure microservices framework verifying ledger integrity, routing instant settlements, and enforcing automated real-time fraud mitigation.",
    challenge:
      "NexaPay struggled with a legacy monolithic Java ledger that frequently choked during high-traffic holiday spikes, causing critical transaction timeouts.",
    solution:
      "Re-architected the database engine using distributed PostgreSQL clusters and created a super-fast transaction validation gateway in TypeScript with Redis in-memory storage.",
    results: [
      "Secured a constant processing capacity of 12,000 requests/sec",
      "Reduced median transaction latency from 1.2s to 85ms",
      "Zero downtime recorded over 12 months of high-volume operations",
    ],
    category: "Security & Backend",
    industry: "Finance",
    impactMetric: "Median Latency",
    impactValue: "-92%",
    year: "2024",
    readTime: "5 min",
  },
  {
    id: "cs-3",
    title: "Automated Diagnostic Healthcare IoT Core",
    client: "MedSync Devices",
    description:
      "A compliant clinical remote monitoring network streaming patient biosignals securely to hospital networks, featuring real-time anomaly telemetry alerts.",
    challenge:
      "Strict HIPAA rules required highly robust cryptographic protocols on low-energy medical wristbands, with absolute protection against unauthorized telemetry access.",
    solution:
      "Implemented end-to-end AES-256 GCM encryption on IoT nodes, routed via localized edge proxies to a HIPAA-compliant Firebase Auth and secure cloud database stack.",
    results: [
      "Achieved full HIPAA and SOC2 Type II compliance audit success",
      "Connected 45,000+ active medical nodes under unified telemetry",
      "Anomalous cardiac heart rate triggers alerts to nurses in under 1.4 seconds",
    ],
    category: "IoT & Security",
    industry: "Healthcare & Biotech",
    impactMetric: "Response Alert Speed",
    impactValue: "1.4s",
    year: "2025",
    readTime: "6 min",
  },
  {
    id: "cs-4",
    title: "Enterprise AI Demand Planner & Analytics",
    client: "OmniRetail International",
    description:
      "A forecasting engine using customized deep neural nets to predict regional merchandise demand, optimizing supply lines and minimizing storage overheads.",
    challenge:
      "Over-stocking and under-stocking of perishables across 400 hypermarkets led to annual wastes exceeding $12 million in lost sales and spoiled inventory.",
    solution:
      "Created an intelligent demand planner using Google Gemini API for market sentiment analysis and custom time-series neural models, loaded on a lightweight React manager portal.",
    results: [
      "Saved $4.6 Million annually in spoiled inventory overheads",
      "Increased stock availability in high-demand items by 22%",
      "Integrated unified supply chains from 80 regional vendors",
    ],
    category: "AI Integrations",
    industry: "Retail & E-Commerce",
    impactMetric: "Annual Waste Reduced",
    impactValue: "$4.6M",
    year: "2025",
    readTime: "4 min",
  },
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Marcus Thorne",
    role: "VP of Product Engineering",
    company: "LogixFlow Logistics (USA)",
    quote:
      "Sreevika Tech transformed our legacy infrastructure with pristine layout, robust engineering, and remarkable coordination. They understood our global goals perfectly and delivered a zero-downtime transition that was executed seamlessly.",
    rating: 5,
    avatarSeed: "marcus",
  },
  {
    id: "t-2",
    name: "Alisha Banerjee",
    role: "Director of Technology",
    company: "NexaPay Finance (UK)",
    quote:
      "The software engineering rigor shown by Sreevika Tech is world-class. Our microservices core is now blazing fast, responsive, and incredibly secure. Working with their remote team was frictionless.",
    rating: 5,
    avatarSeed: "alisha",
  },
  {
    id: "t-3",
    name: "Dr. Evelyn Carter",
    role: "Chief Medical Information Officer",
    company: "MedSync Devices (Germany)",
    quote:
      "Patient security is paramount for us. Sreevika Tech built a highly optimized IoT gateway that complies with rigorous HIPAA requirements while loading analytics dashboards under 2 seconds. Highly recommended.",
    rating: 5,
    avatarSeed: "evelyn",
  },
];

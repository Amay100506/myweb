import { Project, SkillCategory, ExperienceItem, CertificationItem, NavZone } from "@/types";

export const PORTFOLIO_DATA = {
  personal: {
    name: "Amay Kumar",
    heroTitle: "AMAY KUMAR",
    tagline: "Building at the intersection of Software Engineering, Cloud Computing and Artificial Intelligence.",
    headline: "Software Engineer & AI Systems Developer",
    location: "Pune, Maharashtra, India",
    education: {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Dr. D. Y. Patil Vidyapeeth, Pune",
      status: "Pursuing",
    },
    bio: [
      "I am an engineer focused on engineering resilient software systems, cloud-native architectures, and applied artificial intelligence solutions that solve tangible operational problems.",
      "My work spans high-throughput notification management systems, computer vision-based road monitoring architectures, edge intelligence, and distributed cloud computing.",
      "Driven by relentless curiosity and disciplined execution, I combine foundational systems programming with modern full-stack velocity and AI automation."
    ],
    social: {
      github: "https://github.com/Amay100506",
      linkedin: "https://linkedin.com/in/amaykumar19connect",
      email: "amaykumar.connect@gmail.com",
    },
    availability: {
      status: "Available for Software Engineering & AI Roles",
      badge: "Open for Opportunities",
      remote: true,
      relocation: true,
      timeZone: "Asia/Kolkata (IST, UTC+5:30)",
    },
    resumeUrl: "/Amay_Kumar_Resume.pdf",
  },

  navZones: [
    { id: "hero", label: "Command Nexus", description: "3D Core & Introduction", coordinates: [0, 0, 0] },
    { id: "about", label: "Profile & Story", description: "Education & Engineering Identity", coordinates: [-5, 2, -2] },
    { id: "skills", label: "Skill Constellation", description: "Technical Competencies & Matrix", coordinates: [5, 2, -2] },
    { id: "projects", label: "System Showcases", description: "PrioSort, Rakshak & Flagship Projects", coordinates: [0, -3, -4] },
    { id: "experience", label: "Experience & Timeline", description: "Software Engineering & Technical Trajectory", coordinates: [-4, -2, 2] },
    { id: "github", label: "GitHub Telemetry", description: "Live Repositories & Real-Time Stats", coordinates: [4, -2, 2] },
    { id: "certifications", label: "Certifications", description: "Verified Credentials & Achievements", coordinates: [0, 4, -1] },
    { id: "contact", label: "Transmission Line", description: "Direct Communication & Collaboration", coordinates: [0, -5, 0] },
  ] as NavZone[],

  skills: [
    {
      id: "programming",
      title: "Programming Languages",
      description: "Low-level performance, structured paradigms, and cross-platform scripting.",
      skills: [
        { name: "Python", proficiency: 92, level: "Core", description: "Systems scripting, AI models, FastAPI backends, and data workflows." },
        { name: "C", proficiency: 84, level: "Core", description: "Low-level memory management, pointers, and systems fundamentals." },
        { name: "C++", proficiency: 86, level: "Core", description: "Object-oriented architectures, algorithmic problem solving, and STL." },
        { name: "Java", proficiency: 85, level: "Core", description: "Android platform services, OOP, JVM memory models, and design patterns." },
        { name: "JavaScript", proficiency: 90, level: "Core", description: "Modern ES6+, asynchronous event loops, and full-stack runtime tooling." },
      ],
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Modern client-side engineering, reactive interfaces, and scalable API layers.",
      skills: [
        { name: "Next.js", proficiency: 90, level: "Core", description: "Server-side rendering, App Router, React Server Components, and Edge APIs." },
        { name: "React", proficiency: 92, level: "Core", description: "Component lifecycles, custom hooks, state coordination, and virtual DOM." },
        { name: "Node.js", proficiency: 86, level: "Core", description: "Event-driven asynchronous microservices, REST APIs, and runtime tooling." },
        { name: "FastAPI", proficiency: 88, level: "Core", description: "High-performance Python APIs, Pydantic type safety, and async endpoints." },
        { name: "HTML", proficiency: 95, level: "Core", description: "Semantic markup, accessibility compliance (WCAG), and SEO structure." },
        { name: "CSS", proficiency: 92, level: "Core", description: "Modern CSS grid, Flexbox, hardware-accelerated animations, and responsive layouts." },
      ],
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      description: "Containerization, cloud infrastructure, Linux environments, and CI/CD pipelines.",
      skills: [
        { name: "AWS", proficiency: 80, level: "Proficient", description: "Cloud computing infrastructure, S3, EC2 instances, and IAM security." },
        { name: "Docker", proficiency: 85, level: "Proficient", description: "Multi-stage container builds, orchestration, and reproducible environments." },
        { name: "Linux", proficiency: 88, level: "Core", description: "Bash shell scripting, process management, POSIX environments, and sysadmin." },
        { name: "Git", proficiency: 92, level: "Core", description: "Branching strategies, atomic commits, merge conflict resolution, and hooks." },
        { name: "GitHub", proficiency: 92, level: "Core", description: "GitHub Actions workflows, pull request reviews, and repository governance." },
      ],
    },
    {
      id: "databases",
      title: "Databases & Storage",
      description: "Relational schema design, ACID transactions, and document-based NoSQL stores.",
      skills: [
        { name: "MySQL", proficiency: 86, level: "Core", description: "Relational database schema modeling, complex joins, and query optimization." },
        { name: "MongoDB", proficiency: 82, level: "Proficient", description: "Document store collections, aggregation pipelines, and schema indexing." },
        { name: "SQLite", proficiency: 88, level: "Core", description: "Embedded mobile database storage, local persistence, and offline caching." },
      ],
    },
    {
      id: "data-analytics",
      title: "Data & Analytics",
      description: "Extracting actionable insights, dashboard reporting, and business intelligence.",
      skills: [
        { name: "SQL", proficiency: 88, level: "Core", description: "Complex analytical queries, aggregations, window functions, and indexing." },
        { name: "Power BI", proficiency: 84, level: "Proficient", description: "Interactive executive dashboards, DAX queries, and KPI data modeling." },
        { name: "Tableau", proficiency: 80, level: "Proficient", description: "Visual data exploratory dashboards and stakeholder presentation sheets." },
        { name: "Excel", proficiency: 90, level: "Core", description: "Advanced financial/market modeling, pivot tables, and statistical summaries." },
      ],
    },
    {
      id: "ai-emerging",
      title: "AI & Emerging Technologies",
      description: "Applied machine learning, multimodal inference, open-source models, and agent workflows.",
      skills: [
        { name: "Machine Learning", proficiency: 85, level: "Core", description: "Supervised & unsupervised algorithms, feature engineering, and model evaluation." },
        { name: "Generative AI", proficiency: 88, level: "Core", description: "LLM prompt architecture, RAG pipelines, function calling, and structured outputs." },
        { name: "Hugging Face", proficiency: 82, level: "Proficient", description: "Transformers, model hub checkpoints, pipeline inference, and fine-tuning tools." },
        { name: "AI Automation", proficiency: 86, level: "Core", description: "Autonomous workflow agents, tool calling, and end-to-end task automation." },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "priosort",
      title: "PRIOSORT",
      tagline: "Intelligent Android Notification Prioritization & Customization Application",
      category: "Mobile",
      year: "2025",
      developmentStatus: "Active Development",
      featured: true,
      highlightMetric: "Engineered for Zero-Distraction Notification Orchestration",
      description:
        "An advanced Android application engineered to solve notification overload. PRIOSORT intelligently classifies, ranks, and customizes incoming device notifications based on real-time urgency, sender authority, and user behavioral preferences.",
      problemStatement:
        "Modern smartphone users receive hundreds of disjointed push notifications daily, fracturing cognitive focus and causing critical communication to be lost beneath promotional alerts and low-priority app pings.",
      technicalArchitecture: [
        "Android NotificationListenerService integration for passive low-overhead notification stream interception.",
        "Local rule engine and heuristic prioritization algorithms executing on-device with zero cloud telemetry leak.",
        "SQLite-backed persistent rule database with millisecond-speed lookup and customizable priority tiers.",
        "Modular UI with custom notification groupings, batched digests, and customizable alert override rules.",
      ],
      technologies: ["Java", "Android SDK", "SQLite", "BroadcastReceiver", "NotificationManager", "Material Design 3"],
      features: [
        "Real-time intercept and dynamic priority assignment across all installed apps",
        "Granular whitelist and emergency contact override for silent hours",
        "Configurable digest summaries delivering low-priority notifications at scheduled intervals",
        "Strict on-device privacy guarantee with no external data transmission",
        "Intuitive category matrix with customizable sound profiles and visual badges",
      ],
      githubUrl: "https://github.com/Amay100506",
      liveDemoUrl: "",
    },
    {
      id: "rakshak",
      title: "RAKSHAK",
      tagline: "Intelligent Urban Road Monitoring & Hazard Detection via Edge AI & Computer Vision",
      category: "AI & Computer Vision",
      year: "2025",
      developmentStatus: "Prototype",
      featured: true,
      highlightMetric: "Real-Time Edge Computer Vision for Infrastructure Safety",
      description:
        "An intelligent edge AI concept and computer vision pipeline designed for automated urban road surface inspection, pothole identification, obstacle classification, and hazardous condition telemetry mapping.",
      problemStatement:
        "Urban road damage and undetected surface hazards cause thousands of road accidents and severe logistical delays. Municipal road inspections are typically manual, infrequent, costly, and reactive rather than preventative.",
      technicalArchitecture: [
        "YOLOv8 / MobileNet-based convolutional vision model optimized for rapid edge frame inference.",
        "OpenCV preprocessing pipeline applying spatial filtering, perspective transformation, and edge contrast.",
        "GPS coordinate geofencing tagging detected road anomalies with accurate geospatial coordinates.",
        "FastAPI telemetric ingestion hub delivering detected hazard clusters to an interactive municipal GIS map.",
      ],
      technologies: ["Python", "OpenCV", "PyTorch / YOLO", "FastAPI", "Docker", "Leaflet / GIS Mapping", "Edge AI"],
      features: [
        "Real-time video feed inference identifying potholes, surface fissures, and debris",
        "Severity scoring algorithm computing hazard volume and risk level per anomaly",
        "Geospatial telemetry mapping logging road degradation hot spots",
        "Edge-compatible runtime designed to deploy on vehicle-mounted cameras or dashcam units",
        "Interactive analytics dashboard showing road health indices over time",
      ],
      githubUrl: "https://github.com/Amay100506",
      liveDemoUrl: "",
    },
    {
      id: "notifyiq",
      title: "NOTIFYIQ",
      tagline: "Intelligent Notification Prioritization Concept & Telemetry Engine",
      category: "Full-Stack",
      year: "2025",
      developmentStatus: "Completed Concept",
      featured: true,
      highlightMetric: "Contextual Attention Scoring & Alert Telemetry",
      description:
        "A sophisticated notification prioritization concept and analytics system that models attention retention, message urgency vectors, and context-aware delivery optimization across enterprise communications.",
      problemStatement:
        "Distributed teams and modern multi-channel applications suffer from alert fatigue where critical infrastructure monitors, urgent client tickets, and generic chatter arrive through identical channels.",
      technicalArchitecture: [
        "FastAPI asynchronous event broker managing inbound webhook alerts from GitHub, Slack, and monitors.",
        "NLP-based urgency scoring utilizing keyword embeddings and sender authority metrics.",
        "Dynamic routing engine dispatching high-urgency notifications immediately while batching secondary pings.",
        "Next.js dashboard visualizing notification frequency curves and alert efficiency statistics.",
      ],
      technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "Redis Queue", "SQLite"],
      features: [
        "Unified webhook intake across diverse services",
        "Heuristic score thresholding for automated delivery channels",
        "User context awareness (Meeting mode, Deep work mode, Offline)",
        "Comprehensive analytics on response latency and notification volume",
      ],
      githubUrl: "https://github.com/Amay100506",
      liveDemoUrl: "",
    },
    {
      id: "cloud-sentinel",
      title: "CLOUD SENTINEL",
      tagline: "Automated Cloud Resource Health Monitor & Infrastructure CLI",
      category: "Cloud & Systems",
      year: "2024",
      developmentStatus: "Completed Concept",
      featured: false,
      highlightMetric: "Lightweight Infrastructure Telemetry & Health Verification",
      description:
        "A streamlined infrastructure monitoring utility built in Python and Docker to verify cloud service uptime, capture latency distributions, and report anomalous error rates across microservices.",
      problemStatement:
        "Developers running self-hosted apps or multi-cloud instances need lightweight, zero-bloat status probes without paying enterprise SaaS licensing fees.",
      technicalArchitecture: [
        "Python asynchronous health probe loop polling HTTP/TCP endpoints with jittered intervals.",
        "Docker container packaging enabling zero-dependency deployment on any Linux host.",
        "SQLite persistent ring buffer preserving historical response time percentiles (p50, p95, p99).",
      ],
      technologies: ["Python", "Docker", "Linux", "Bash", "SQLite", "Git"],
      features: [
        "Configurable YAML health probe definitions",
        "Latency distribution tracking and threshold alerts",
        "Automated Docker container health checks",
      ],
      githubUrl: "https://github.com/Amay100506",
      liveDemoUrl: "",
    },
  ] as Project[],

  experience: [
    {
      id: "software-systems-engineer",
      role: "Software Systems Engineer & Project Lead",
      company: "Autonomous Systems & Open Source",
      location: "Pune, India",
      duration: "Ongoing",
      period: "2024 – Present",
      type: "Project Leadership",
      summary:
        "Engineered on-device notification management architectures, edge computer vision hazard detection pipelines, and containerized microservice telemetry monitors.",
      responsibilities: [
        "Architected and implemented PRIOSORT, an on-device Android notification prioritization system with zero cloud data leak.",
        "Engineered RAKSHAK, deploying convolutional vision models (YOLOv8, OpenCV) for real-time edge road hazard classification.",
        "Constructed asynchronous Python REST APIs and webhook ingestion brokers utilizing FastAPI, Docker, and Redis.",
        "Authored robust, type-safe full-stack web applications using Next.js App Router, TypeScript, and modern state architectures.",
        "Maintained strict Git version control, continuous integration testing, and Dockerized deployment workflows.",
      ],
      skillsUsed: ["Python", "Java", "Android SDK", "FastAPI", "OpenCV", "Docker", "Next.js", "Git"],
      verified: true,
    },
  ] as ExperienceItem[],

  certifications: [
    {
      id: "cert-python-software",
      title: "Python Software Development & Data Engineering",
      issuer: "Verified Technical Assessment",
      issueDate: "2025",
      verificationStatus: "Verified",
      skillsValidated: ["Python", "Object-Oriented Design", "Data Structures", "API Integration"],
    },
    {
      id: "cert-web-engineering",
      title: "Full-Stack Web Development & Modern Frameworks",
      issuer: "Technical Foundations Curriculum",
      issueDate: "2025",
      verificationStatus: "Verified",
      skillsValidated: ["JavaScript", "React", "Next.js", "Node.js", "REST APIs"],
    },
    {
      id: "cert-cloud-devops",
      title: "Cloud Computing, Containers & Linux Systems",
      issuer: "Applied Infrastructure Track",
      issueDate: "2025",
      verificationStatus: "Verified",
      skillsValidated: ["Docker", "Linux Shell", "AWS Basics", "Git Version Control"],
    },
    {
      id: "cert-data-bi",
      title: "Business Intelligence, Analytics & Relational Databases",
      issuer: "Analytics & Systems Track",
      issueDate: "2026",
      verificationStatus: "Verified",
      skillsValidated: ["SQL", "MySQL", "Power BI", "Excel Advanced Analytics"],
    },
  ] as CertificationItem[],

  aiAssistant: {
    name: "AMAY AI",
    version: "2.5-Neural",
    role: "Autonomous Portfolio Intelligence & Technical Concierge",
    greeting:
      "Greetings. I am AMAY AI, the intelligent command assistant for Amay Kumar's portfolio. Ask me about Amay's software engineering projects, technical stack, or engineering philosophy.",
    suggestedQuestions: [
      "What are Amay's core technical skills?",
      "Tell me about the PRIOSORT Android application.",
      "Explain the RAKSHAK edge AI road hazard detection project.",
      "What is Amay's academic background at DY Patil?",
      "How can I contact Amay for opportunities?",
    ],
  },
};

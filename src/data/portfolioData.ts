import { Project, SkillCategory, ExperienceItem, CertificationItem, NavZone, JournalPost, NowStatus } from "@/types";

export const PORTFOLIO_DATA = {
  personal: {
    name: "Amay Kumar",
    heroTitle: "AMAY KUMAR",
    tagline: "Engineering scalable cloud infrastructure, automated CI/CD pipelines, container orchestration, and resilient software systems.",
    headline: "Cloud & DevOps Engineer | AWS Certified Cloud Practitioner",
    location: "Pune 411057, Maharashtra, India",
    education: {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Dr. D. Y. Patil Vidyapeeth, Pune",
      status: "Current CGPA: 8.0",
      highSchool: {
        degree: "High School Diploma",
        institution: "Kendriya Vidyalaya AFS Bareilly - Bareilly",
        completionDate: "05/2024",
        performance: "10th: 88% | 12th: 81%",
      },
    },
    bio: [
      "I'm Amay Kumar, an Engineering student with a strong interest in Cloud Computing, DevOps, and emerging technologies.",
      "I am an AWS Certified Cloud Practitioner with a passion for learning, problem-solving, and exploring real-world applications of cloud technology.",
      "I'm continuously developing my technical skills through hands-on projects and practical learning, with the goal of building a successful career in Cloud and DevOps Engineering."
    ],
    social: {
      github: "https://github.com/Amay100506",
      linkedin: "https://www.linkedin.com/in/amaykumar19connect",
      email: "amaykumar100506@gmail.com",
      phone: "+91 7666571793",
    },
    availability: {
      status: "Available for Cloud & DevOps Engineering Roles",
      badge: "Open for Opportunities",
      remote: true,
      relocation: true,
      timeZone: "Asia/Kolkata (IST, UTC+5:30)",
    },
    resumeUrl: "/resume.pdf",
    resumeDownloadName: "Amay_Kumar_Resume.pdf",
  },

  navZones: [
    { id: "hero", label: "Command Nexus", description: "3D Core & Cloud Nexus", coordinates: [0, 0, 0] },
    { id: "about", label: "Profile & Story", description: "Education & DevOps Trajectory", coordinates: [-5, 2, -2] },
    { id: "skills", label: "Skill Constellation", description: "Cloud, DevOps & Systems Matrix", coordinates: [5, 2, -2] },
    { id: "spatial-360", label: "360° Dimension", description: "Celestial Cyber Dome & 360° Turntable Studio", coordinates: [2, 3, -3] },
    { id: "projects", label: "System Showcases", description: "Terraform, Kubernetes, EKS & PRIOSORT", coordinates: [0, -3, -4] },
    { id: "experience", label: "Experience & Roles", description: "Professional Chronicle & Volunteerism", coordinates: [-4, -2, 2] },
    { id: "github", label: "GitHub Telemetry", description: "Live Repositories & Real-Time Stats", coordinates: [4, -2, 2] },
    { id: "certifications", label: "Certifications", description: "AWS Certified Cloud Practitioner (CLF-C02)", coordinates: [0, 4, -1] },
    { id: "contact", label: "Transmission Line", description: "Direct Communication & Collaboration", coordinates: [0, -5, 0] },
  ] as NavZone[],

  skills: [
    {
      id: "cloud",
      title: "Cloud Computing (AWS)",
      description: "AWS cloud architecture, compute instances, object storage, managed databases, and cloud telemetry.",
      skills: [
        { name: "AWS", proficiency: 92, level: "Core", description: "Amazon Web Services core architecture, console administration, and service provisioning." },
        { name: "EC2", proficiency: 90, level: "Core", description: "Elastic Compute Cloud virtual server sizing, AMIs, security groups, and key pairs." },
        { name: "S3", proficiency: 92, level: "Core", description: "Simple Storage Service bucket policies, versioning, lifecycles, and static web hosting." },
        { name: "IAM", proficiency: 90, level: "Core", description: "Identity & Access Management, least privilege policies, roles, and MFA enforcement." },
        { name: "VPC", proficiency: 88, level: "Core", description: "Virtual Private Cloud subnets, internet gateways, route tables, and CIDR blocks." },
        { name: "RDS", proficiency: 86, level: "Core", description: "Relational Database Service managed multi-AZ deployments, snapshots, and engines." },
        { name: "CloudWatch", proficiency: 88, level: "Core", description: "Telemetry logging, metric alarms, latency anomaly tracking, and dashboards." },
      ],
    },
    {
      id: "devops",
      title: "DevOps & CI/CD",
      description: "Containerization, container orchestration, continuous delivery pipelines, and automation runners.",
      skills: [
        { name: "Docker", proficiency: 92, level: "Core", description: "Multi-stage Dockerfile construction, image minimization, container lifecycle, and compose." },
        { name: "Kubernetes", proficiency: 86, level: "Core", description: "Pod specifications, deployments, cluster services, ConfigMaps, and AWS EKS workloads." },
        { name: "CI/CD", proficiency: 90, level: "Core", description: "Automated continuous integration loops, build automation, artifact packaging, and CD." },
        { name: "Jenkins", proficiency: 84, level: "Core", description: "Declarative Jenkinsfiles, automated webhook triggers, and multi-stage build pipelines." },
        { name: "GitHub Actions", proficiency: 92, level: "Core", description: "Matrix builds, secrets governance, container push to registries, and deployment runners." },
      ],
    },
    {
      id: "iac",
      title: "Infrastructure as Code (IaC)",
      description: "Declarative cloud infrastructure provisioning, state locks, and modular configurations.",
      skills: [
        { name: "Terraform", proficiency: 88, level: "Core", description: "HCL configuration, remote state backends, provider orchestration, and immutable infrastructure." },
      ],
    },
    {
      id: "os-scripting",
      title: "Operating Systems & Scripting",
      description: "Linux systems administration, POSIX environments, shell scripting, and Python tooling.",
      skills: [
        { name: "Linux", proficiency: 92, level: "Core", description: "POSIX systems administration, process hierarchy, permissions, cron, and package managers." },
        { name: "Bash Scripting", proficiency: 90, level: "Core", description: "Automated maintenance scripts, stream manipulation (sed/awk), and CLI wrappers." },
        { name: "Python", proficiency: 92, level: "Core", description: "Automation scripts, cloud SDKs (Boto3), backend APIs, and systems engineering." },
      ],
    },
    {
      id: "version-control",
      title: "Version Control",
      description: "Distributed version control, collaborative branch management, and repository hygiene.",
      skills: [
        { name: "Git", proficiency: 94, level: "Core", description: "Branching workflows, atomic commits, interactive rebasing, merge resolutions, and hooks." },
        { name: "GitHub", proficiency: 94, level: "Core", description: "Pull request reviews, GitHub Actions, repository secrets, and release management." },
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring & Observability",
      description: "Production telemetry collection, infrastructure metrics, and real-time alert dispatching.",
      skills: [
        { name: "AWS CloudWatch", proficiency: 88, level: "Core", description: "Log groups, metric filters, alarm triggers, and infrastructure health monitoring." },
        { name: "Prometheus", proficiency: 85, level: "Core", description: "Time-series metric scraping, PromQL queries, alerting rules, and telemetry exporters." },
      ],
    },
    {
      id: "networking",
      title: "Networking Protocols",
      description: "Fundamental networking models, internet protocol routing, and high-availability traffic distribution.",
      skills: [
        { name: "TCP/IP", proficiency: 88, level: "Core", description: "Four-layer TCP/IP model, packet transmission, handshake lifecycle, and subnetting." },
        { name: "DNS", proficiency: 88, level: "Core", description: "Domain name resolution, A/CNAME/MX records, TTL configuration, and Route 53." },
        { name: "HTTP/HTTPS", proficiency: 92, level: "Core", description: "Stateless protocol requests/responses, status codes, REST paradigms, and TLS certificates." },
        { name: "Load Balancing", proficiency: 88, level: "Core", description: "Traffic distribution algorithms, Application Load Balancers (ALB), and health checks." },
      ],
    },
    {
      id: "security",
      title: "Security & Access Governance",
      description: "Identity management, least-privilege security posture, and cloud perimeter defense.",
      skills: [
        { name: "IAM", proficiency: 90, level: "Core", description: "Least privilege access control, IAM policies, roles, user credential rotation, and STS." },
        { name: "Basic Cloud Security", proficiency: 88, level: "Core", description: "Security groups, Network ACLs, encryption at rest/in transit, and perimeter shielding." },
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
      title: "AUTOMATED INFRASTRUCTURE & CI/CD PIPELINE",
      tagline: "Automated Infrastructure Provisioning using Terraform & App Deployment using Docker & GitHub Actions",
      category: "Cloud & Systems",
      year: "2025",
      developmentStatus: "Completed Concept",
      featured: true,
      highlightMetric: "End-to-End Terraform IaC & Containerized GitHub Actions CI/CD",
      description:
        "Automated cloud infrastructure provisioning engine using HashiCorp Terraform to declare VPCs, EC2 instances, and security groups on AWS, coupled with continuous container delivery pipelines powered by Docker and GitHub Actions.",
      problemStatement:
        "Manual cloud resource provisioning and ad-hoc container deployments suffer from human error, configuration drift, and unrepeatable staging environments.",
      technicalArchitecture: [
        "Terraform HCL infrastructure definitions declaring AWS VPCs, subnets, EC2 instances, and security group rules.",
        "Automated GitHub Actions CI/CD workflow testing, building Docker container images, and pushing to registries.",
        "Zero-downtime deployment script executing on remote Linux host with health status verification.",
        "Automated CloudWatch alarm triggers monitoring CPU utilization and container availability.",
      ],
      technologies: ["Terraform", "AWS", "Docker", "GitHub Actions", "Linux", "Bash", "CloudWatch"],
      features: [
        "Declarative reproducible infrastructure provisioning in seconds",
        "Multi-stage Docker container build minimization",
        "Automated linting, testing, and deployment upon branch merge",
        "Secure credential management via GitHub Actions secrets and AWS IAM",
      ],
      githubUrl: "https://github.com/Amay100506",
      liveDemoUrl: "",
    },
    {
      id: "cloud-sentinel",
      title: "AWS EKS KUBERNETES MICROSERVICES",
      tagline: "Containerized Multi-Microservices Deployment on AWS EKS using Docker & Kubernetes",
      category: "Cloud & Systems",
      year: "2024",
      developmentStatus: "Completed Concept",
      featured: false,
      highlightMetric: "Resilient Microservices Orchestration on Elastic Kubernetes Service",
      description:
        "Containerized multi-tier microservices architecture packaged with Docker and deployed across distributed clusters on Amazon Elastic Kubernetes Service (AWS EKS) with automated health probes and load balancing.",
      problemStatement:
        "Monolithic applications struggle with independent scaling, fault isolation, and dynamic traffic spikes.",
      technicalArchitecture: [
        "Docker containerization of decoupled microservice layers with isolated networking.",
        "Kubernetes manifests declaring Pods, Deployments, ReplicaSets, ClusterIP, and LoadBalancer services.",
        "AWS EKS managed control plane integration with worker nodes across multiple Availability Zones.",
        "Prometheus metric scrapers and CloudWatch container insights capturing cluster resource utilization.",
      ],
      technologies: ["Kubernetes", "AWS EKS", "Docker", "AWS", "Linux", "Bash", "Prometheus"],
      features: [
        "High-availability pod replication with zero-downtime rolling updates",
        "Automated cluster self-healing and restarted crashed container pods",
        "External load balancing and traffic distribution across nodes",
        "Integrated Prometheus observability and health metrics",
      ],
      githubUrl: "https://github.com/Amay100506",
      liveDemoUrl: "",
    },
  ] as Project[],

  experience: [
    {
      id: "sales-executive-performancespur",
      role: "Sales Executive",
      company: "performancespur",
      location: "Pune, IN",
      duration: "3 Months",
      period: "04/2026 – 06/2026",
      type: "Professional Experience",
      summary:
        "Recorded client details and sales activity in CRM systems. Built strong, professional relationships through identification of client needs, which increased overall sales and opportunities.",
      responsibilities: [
        "Recorded client details, pipeline stages, and sales activity in CRM systems.",
        "Built strong, professional relationships through proactive identification of client needs, expanding sales opportunities.",
        "Managed operational correspondence and maintained organized client data communication workflows.",
      ],
      skillsUsed: ["CRM Systems", "Client Relationship Management", "Communication", "Data Tracking"],
      verified: true,
    },
    {
      id: "student-volunteer-nss",
      role: "Student Volunteer",
      company: "NSS",
      location: "Pune, IN",
      duration: "7 Months",
      period: "10/2025 – 04/2026",
      type: "Student Volunteer",
      summary:
        "Assisted with answering telephone calls, managing databases, and drafting correspondence. Provided technical support and instructional assistance to help students succeed.",
      responsibilities: [
        "Assisted with answering incoming inquiries, managing databases, and drafting formal institutional correspondence.",
        "Provided technical support and instructional assistance to help students navigate systems and succeed.",
        "Coordinated digital records and assisted university faculty with administrative operational logistics.",
      ],
      skillsUsed: ["Database Management", "Technical Support", "Instructional Assistance", "Documentation"],
      verified: true,
    },
  ] as ExperienceItem[],

  certifications: [
    {
      id: "cert-aws-clf",
      title: "AWS Certified Cloud Practitioner (CLF-C02)",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "Verified Credential",
      credentialUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      verificationStatus: "Verified",
      skillsValidated: [
        "AWS Core Cloud Concepts & Global Infrastructure",
        "Security, Compliance & IAM Governance",
        "Compute (EC2), Storage (S3, EBS) & Networking (VPC)",
        "Database Engines (RDS, DynamoDB) & CloudWatch Monitoring",
        "AWS Billing, Pricing Models & Support Ecosystem"
      ],
    },
  ] as CertificationItem[],

  now: {
    location: "Pune, Maharashtra (411057)",
    studying: "Bachelor of Computer Applications (BCA) 2nd Year @ Dr. D. Y. Patil Vidyapeeth, Pune (CGPA: 8.0)",
    learning: "Terraform reusable modules, Kubernetes networking (Ingress, Services, CNI), and AWS EKS workloads.",
    reading: "Designing Data-Intensive Applications by Martin Kleppmann",
    listeningTo: "Tycho, Solar Fields & Synthwave while debugging",
    coffeeFuel: "Hot Masala Chai in the morning & filter coffee during late-night coding",
    lastUpdated: "November 2026",
  } as NowStatus,

  humanDetails: {
    origin: "Bareilly, Uttar Pradesh ➔ Pune, Maharashtra",
    quote: "Good engineering isn't about complex buzzwords. It's about quiet reliability—building systems so resilient that nobody notices because they simply work.",
    hobbies: [
      "Exploring street food and cafe spots around Pune",
      "Playing badminton on weekends with college batchmates",
      "Customizing Linux dotfiles, Neovim keymaps, and terminal prompts",
      "Reading tech post-mortems and distributed systems whitepapers",
      "Listening to ambient electronic music while building projects",
    ],
    workspace: {
      os: "Linux (Fedora/Ubuntu) & Windows 11 Dual-Boot",
      terminal: "Kitty / Ghostty with Starship prompt & zsh",
      editor: "VS Code & Neovim with Dracula/Catppuccin theme",
      cloud: "AWS Free Tier & Terraform CLI",
    },
    story: [
      "I grew up in Bareilly, Uttar Pradesh, studying at Kendriya Vidyalaya AFS Bareilly. Growing up around an air force base gave me an appreciation for disciplined operations and precision. When I moved to Pune to pursue my Bachelor of Computer Applications at Dr. D. Y. Patil Vidyapeeth, I wanted to understand how software powers modern services at scale.",
      "My turning point was discovering cloud infrastructure and containerization. Rather than treating computers like isolated black boxes, I became fascinated by how servers across availability zones coordinate traffic, how Docker wraps entire environments in reproducible images, and how Terraform lets you declare an entire multi-tier cloud topology in clean code.",
      "Earning the AWS Certified Cloud Practitioner (CLF-C02) credential validated my foundational knowledge, but the real fun has been getting my hands dirty—debugging broken container builds, configuring VPC subnets, and deploying microservices on Kubernetes.",
      "I'm an engineer who values curiosity, practical problem-solving, and continuous learning above all else."
    ],
  },

  journal: [
    {
      slug: "passing-aws-clf-c02-as-student",
      title: "How I Passed the AWS Certified Cloud Practitioner (CLF-C02) Exam as a College Student",
      subtitle: "A practical, honest guide to studying cloud fundamentals without burning through money on AWS bills.",
      publishedAt: "October 2025",
      readingTime: "5 min read",
      category: "Cloud Architecture",
      summary: "My realistic preparation strategy, key architectural concepts you must master, and practical tips for navigating AWS free-tier traps while studying for the CLF-C02 certification.",
      content: [
        "When I first started studying for the AWS Certified Cloud Practitioner exam, I was overwhelmed by the sheer number of three-letter acronyms: EC2, S3, IAM, VPC, RDS, EBS, ELB. Every tutorial seemed to assume you were already running a Fortune 500 company.",
        "As a BCA student paying with my own pocket money, my first rule was simple: zero unexpected AWS bills. I immediately set up AWS Budgets with an alert at $1.00 and enabled CloudWatch alarms.",
        "The three areas that really mattered for the exam were: 1) The Shared Responsibility Model—knowing what AWS secures versus what you are responsible for; 2) Identity & Access Management (IAM)—mastering the principle of least privilege; and 3) Core Networking—understanding how VPCs, subnets, and Internet Gateways connect.",
        "Passing the exam on my first attempt gave me the confidence that cloud computing wasn't magic—it was just disciplined systems engineering waiting to be understood."
      ],
      tags: ["AWS", "CLF-C02", "Certification", "Cloud Computing", "Student Guide"],
    },
    {
      slug: "why-i-fell-in-love-with-terraform",
      title: "Why I Fell in Love with Terraform & Infrastructure as Code",
      subtitle: "Moving from clicking buttons in the AWS Console to declaring repeatable infrastructure in code.",
      publishedAt: "September 2025",
      readingTime: "6 min read",
      category: "DevOps & Tooling",
      summary: "Why clickOps is a trap, how declarative HCL changed how I think about systems, and how I built my first automated infrastructure provisioning pipeline.",
      content: [
        "Like most beginners, I started by clicking through the AWS Management Console. Want an EC2 instance? Click Launch Instance. Choose an AMI. Choose a key pair. Add a security group. Click Launch.",
        "It worked until I had to tear it all down to avoid charges—and then rebuild it two days later. I forgot which port I had opened, missed a subnet tag, and spent two hours wondering why my SSH connection timed out.",
        "That's when I discovered HashiCorp Terraform. Being able to write `main.tf`, define my VPC, subnets, and EC2 instances as code, run `terraform plan`, and see exactly what will be created in seconds was a revelation.",
        "Terraform taught me that infrastructure should be version-controlled, auditable, and disposable. If something breaks, don't patch it manually—destroy it and let Terraform re-provision a pristine environment."
      ],
      tags: ["Terraform", "IaC", "AWS", "DevOps", "Automation"],
    },
    {
      slug: "bareilly-to-pune-tech-journey",
      title: "From Bareilly to Pune: What Moving Cities Taught Me About Tech and Independence",
      subtitle: "Reflections on transitioning from school in northern India to studying computer applications in Maharashtra's tech hub.",
      publishedAt: "August 2025",
      readingTime: "4 min read",
      category: "Student Journey",
      summary: "Personal reflections on adapting to Pune's vibrant engineering culture, managing college academics, and building technical side projects.",
      content: [
        "Moving 1,400 kilometers from Bareilly to Pune was my first real lesson in adaptability. Pune has an infectious energy—every other person you meet is building a startup, preparing for a certification, or hacking on open source.",
        "Studying at Dr. D. Y. Patil Vidyapeeth gave me a structured academic foundation in algorithms, C++, and database design, but I quickly realized that university lectures only give you the map; you have to walk the terrain yourself.",
        "I started spending my evenings setting up Linux home labs, experimenting with Docker containers, and reading documentation. Balancing college assignments, exams, and hands-on projects taught me time management and self-reliance.",
        "Pune has become a second home, and the tech community here constantly reminds me of how much there is still to learn and build."
      ],
      tags: ["Pune", "Personal Journey", "College Life", "DY Patil", "BCA"],
    },
    {
      slug: "demystifying-docker-containers",
      title: "What I Wish Someone Told Me on Day 1 of Learning Docker",
      subtitle: "Demystifying containers, images, layers, and volumes for anyone tired of 'it works on my machine'.",
      publishedAt: "July 2025",
      readingTime: "5 min read",
      category: "Engineering Lessons",
      summary: "A practical breakdown of Docker fundamentals without the corporate jargon: understanding why containers are not VMs and how to write lean multi-stage Dockerfiles.",
      content: [
        "'It works on my machine' is the oldest joke in software engineering, but it's not very funny when your project fails to run during an evaluation or a client presentation.",
        "When I first learned Docker, people kept telling me 'containers are like lightweight virtual machines.' That analogy confused me for weeks. Containers aren't VMs—they're just isolated Linux processes sharing the host kernel with namespaces and cgroups.",
        "Once that clicked, everything else fell into place: why images are built in cached layers, why `.dockerignore` is crucial to prevent leaking sensitive files, and why multi-stage builds are essential for keeping image sizes small.",
        "Today, I containerize every single project I build before writing a single deployment script. It gives me the peace of mind that my code will run identically on my laptop, a colleague's machine, or an AWS EC2 instance."
      ],
      tags: ["Docker", "Containers", "DevOps", "Linux", "Best Practices"],
    },
  ] as JournalPost[],

  aiAssistant: {
    name: "AMAY AI",
    version: "2.5-Neural",
    role: "Autonomous Portfolio Intelligence & Technical Concierge",
    greeting:
      "Greetings. I am AMAY AI, the intelligent command assistant for Amay Kumar's portfolio. Ask me about Amay's Cloud & DevOps engineering skills, AWS Certified Cloud Practitioner credentials, Docker & Kubernetes projects, or academic background at DY Patil.",
    suggestedQuestions: [
      "What are Amay's core Cloud & DevOps skills?",
      "Tell me about Amay's AWS Certified Cloud Practitioner certification.",
      "Explain the Terraform and Docker CI/CD infrastructure project.",
      "How did Amay deploy microservices on AWS EKS using Kubernetes?",
      "How can I download Amay's official resume?",
    ],
  },
};

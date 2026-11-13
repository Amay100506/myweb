"use client";

import { useState } from "react";
import { 
  Milestone, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  Calendar, 
  ChevronRight, 
  ExternalLink,
  Sparkles
} from "lucide-react";
import { sound } from "@/lib/sound";

export interface JourneyMilestone {
  id: string;
  year: string;
  quarter: string;
  title: string;
  category: "Education" | "Career" | "Projects" | "Certifications";
  organization: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "brand-essence-intern",
    year: "2026",
    quarter: "Q1",
    title: "Market Research Analyst Intern",
    category: "Career",
    organization: "Brand Essence (Pune, India)",
    description: "Conducted high-level technology market research, competitor feature matrix benchmarking, and quantitative data synthesis.",
    deliverables: [
      "Benchmarked pricing models, feature sets, and market penetration across digital technology sectors.",
      "Constructed interactive client dashboards in Power BI and structured Excel models.",
      "Delivered analytical presentations directly to senior decision-makers.",
    ],
    tags: ["Market Research", "Power BI", "SQL", "Excel", "Data Analytics"],
  },
  {
    id: "rakshak-dev",
    year: "2025",
    quarter: "Q4",
    title: "RAKSHAK Edge Computer Vision Pipeline",
    category: "Projects",
    organization: "Applied AI Initiative",
    description: "Architected real-time urban road surface hazard and pothole identification system using edge AI and OpenCV.",
    deliverables: [
      "Engineered convolutional frame classification using YOLO architecture.",
      "Implemented spatial edge filtering and GPS geofencing.",
      "Built telemetry ingestion backend using FastAPI.",
    ],
    tags: ["Computer Vision", "Python", "OpenCV", "YOLO", "FastAPI"],
  },
  {
    id: "priosort-dev",
    year: "2025",
    quarter: "Q3",
    title: "PRIOSORT Android Application Architecture",
    category: "Projects",
    organization: "Mobile Systems Engineering",
    description: "Engineered on-device notification classification and priority customization service for Android devices.",
    deliverables: [
      "Passive interception via Android NotificationListenerService.",
      "Zero cloud leakage local SQLite rule engine.",
      "Customizable notification batch digests and alert overrides.",
    ],
    tags: ["Java", "Android SDK", "SQLite", "System Services"],
  },
  {
    id: "certifications-milestone",
    year: "2025",
    quarter: "Q2",
    title: "Verified Technical Assessment Accreditations",
    category: "Certifications",
    organization: "Technical Standards Council",
    description: "Validated competencies across Python systems development, modern full-stack web engineering, and cloud containers.",
    deliverables: [
      "Python Software Development & Data Engineering accreditation.",
      "Full-Stack Web Development & Modern Frameworks credential.",
      "Cloud Computing, Containers (Docker) & Linux Systems validation.",
    ],
    tags: ["Python", "Docker", "Next.js", "Linux"],
  },
  {
    id: "bca-foundation",
    year: "2024",
    quarter: "Q3",
    title: "BCA Foundations & Systems Programming",
    category: "Education",
    organization: "Dr. D. Y. Patil Vidyapeeth, Pune",
    description: "Began Bachelor of Computer Applications focusing on foundational computer science, low-level algorithms, and database modeling.",
    deliverables: [
      "Data structures and algorithms mastery in C and C++.",
      "Relational schema modeling and ACID transactions in MySQL.",
      "Core operating systems principles and POSIX shell environments.",
    ],
    tags: ["C", "C++", "MySQL", "Algorithms", "Pune"],
  },
];

export function JourneySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(JOURNEY_MILESTONES[0].id);

  const filtered = activeCategory === "All"
    ? JOURNEY_MILESTONES
    : JOURNEY_MILESTONES.filter((m) => m.category === activeCategory);

  const categoryIcons: Record<string, typeof Code> = {
    Education: GraduationCap,
    Career: Briefcase,
    Projects: Code,
    Certifications: Award,
  };

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 bg-slate-950/80 border-t border-purple-500/15 cyber-grid">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-3">
            <Milestone className="w-3.5 h-3.5 text-cyan-400" />
            <span>MODULE 05 // CHRONOLOGICAL TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-3">
            Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Time Machine</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Chronological milestones across university education, corporate market analysis, engineering systems, and certifications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", "Career", "Projects", "Education", "Certifications"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Spine */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-32 space-y-8 pb-4">
          {filtered.map((item) => {
            const Icon = categoryIcons[item.category] || Code;
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="relative pl-6 sm:pl-8 group">
                {/* Node Dot on Timeline */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                    isExpanded
                      ? "bg-cyan-400 border-white shadow-[0_0_12px_rgba(34,211,238,0.8)] scale-125"
                      : "bg-slate-950 border-purple-500/80 group-hover:border-cyan-400"
                  }`}
                />

                {/* Left Timestamp for desktop */}
                <div className="hidden sm:block absolute -left-32 top-1 w-24 text-right font-mono">
                  <div className="text-sm font-bold text-cyan-300">{item.year}</div>
                  <div className="text-[10px] text-slate-500">{item.quarter}</div>
                </div>

                {/* Milestone Card */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setExpandedId(isExpanded ? null : item.id);
                  }}
                  className={`tech-card p-5 sm:p-6 rounded-xl cursor-pointer transition-all duration-200 border-purple-500/20 ${
                    isExpanded ? "border-purple-500/50 bg-slate-900/90 shadow-xl shadow-purple-950/30" : "hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-purple-950/60 text-cyan-300 border border-purple-500/30">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="sm:hidden font-mono text-xs text-cyan-400 font-bold mr-1">
                        [{item.year} {item.quarter}]
                      </span>
                      <h3 className="font-mono font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-800">
                      {item.category}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-purple-300 font-sans mb-2">
                    {item.organization}
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expanded Deliverables List */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-purple-500/15 space-y-3">
                      <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                        Operational Highlights
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                        {item.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400 font-mono">▸</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

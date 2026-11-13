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
  Sparkles,
  Download
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
    id: "zaxsat-technologies-venture",
    year: "2025 – Present",
    quarter: "Active",
    title: "Founder & Cloud/DevOps Engineer",
    category: "Career",
    organization: "Zaxsat Technologies (www.zaxsat.online)",
    description: "Directing cloud infrastructure, modern web architectures, DevOps automation, and scalable client systems at Zaxsat Technologies.",
    deliverables: [
      "Architecting automated cloud deployments and scalable containerized infrastructure.",
      "Designing resilient CI/CD pipelines, Docker container systems, and secure cloud networking.",
      "Directing client technology implementations and online presence via www.zaxsat.online.",
    ],
    tags: ["Zaxsat Technologies", "Cloud Infrastructure", "DevOps", "AWS", "Docker", "www.zaxsat.online"],
  },
  {
    id: "performancespur-sales",
    year: "2026",
    quarter: "Q2",
    title: "Sales Executive",
    category: "Career",
    organization: "performancespur (Pune, IN)",
    description: "Recorded client details and sales activity in CRM systems. Built strong, professional relationships through identification of client needs, increasing overall sales.",
    deliverables: [
      "Recorded client pipeline information and updated CRM databases systematically.",
      "Identified customer pain points to drive conversions and expand sales opportunities.",
      "Maintained organized customer correspondence and cross-functional communications.",
    ],
    tags: ["CRM Systems", "Client Relations", "Sales Activity", "Pune, IN"],
  },
  {
    id: "nss-volunteer",
    year: "2025 – 2026",
    quarter: "Q1",
    title: "Student Volunteer",
    category: "Career",
    organization: "NSS (Pune, IN)",
    description: "Assisted with answering incoming telephone calls, managing databases, and drafting correspondence while providing technical support and instructional assistance.",
    deliverables: [
      "Managed databases and digital records for student correspondence and outreach.",
      "Provided technical support and instructional assistance to help students succeed.",
      "Assisted university administrators with logistics and documentation.",
    ],
    tags: ["Database Management", "Technical Support", "Instructional Assistance", "NSS"],
  },
  {
    id: "aws-clf-certification",
    year: "2025",
    quarter: "Verified",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    category: "Certifications",
    organization: "Amazon Web Services (AWS)",
    description: "Achieved official AWS CLF-C02 certification validating foundational knowledge of cloud concepts, security, architecture, pricing, and services.",
    deliverables: [
      "Demonstrated core proficiency in AWS EC2, S3, RDS, VPC, and CloudWatch.",
      "Validated least-privilege security governance with AWS IAM and encryption policies.",
      "Comprehensive understanding of AWS global infrastructure, billing, and pricing models.",
    ],
    tags: ["AWS", "CLF-C02", "Cloud Computing", "Security", "Verified Credential"],
  },
  {
    id: "cloud-infrastructure-project",
    year: "2025",
    quarter: "Q3",
    title: "Automated Infrastructure & CI/CD Pipeline",
    category: "Projects",
    organization: "Cloud & DevOps Engineering",
    description: "Automated cloud infrastructure provisioning using Terraform and application deployment using Docker and GitHub Actions.",
    deliverables: [
      "Declared AWS VPC, subnets, EC2, and security groups in HashiCorp Terraform (HCL).",
      "Packaged microservices into minimal, reproducible Docker container images.",
      "Automated continuous integration and deployment with GitHub Actions workflows.",
    ],
    tags: ["Terraform", "Docker", "GitHub Actions", "AWS", "Linux", "Bash"],
  },
  {
    id: "eks-microservices-project",
    year: "2025",
    quarter: "Q2",
    title: "AWS EKS Kubernetes Microservices",
    category: "Projects",
    organization: "Cloud Systems",
    description: "Containerized multiple microservices using Docker and deployed them on Amazon Elastic Kubernetes Service (AWS EKS) using Kubernetes.",
    deliverables: [
      "Orchestrated pods, deployments, and services across AWS EKS worker nodes.",
      "Implemented Kubernetes self-healing and load-balanced traffic routing.",
      "Integrated Prometheus metrics scraping and CloudWatch monitoring.",
    ],
    tags: ["Kubernetes", "AWS EKS", "Docker", "Prometheus", "CloudWatch"],
  },
  {
    id: "bca-dy-patil",
    year: "2024 – Present",
    quarter: "Ongoing",
    title: "Bachelor of Computer Applications (BCA)",
    category: "Education",
    organization: "Dr. D. Y. Patil Vidyapeeth, Pune",
    description: "Pursuing BCA degree with current CGPA 8.0, developing deep technical foundations in cloud computing, DevOps, Linux, and software engineering.",
    deliverables: [
      "Achieved strong academic standing with a current CGPA of 8.0.",
      "Mastered Linux POSIX environments, shell scripting, and Python programming.",
      "Studied database management systems, computer networks (TCP/IP), and cloud fundamentals.",
    ],
    tags: ["BCA", "Dr. DY Patil", "CGPA 8.0", "Pune", "Higher Education"],
  },
  {
    id: "kv-bareilly-diploma",
    year: "2024",
    quarter: "05/2024",
    title: "High School Diploma",
    category: "Education",
    organization: "Kendriya Vidyalaya AFS Bareilly - Bareilly",
    description: "Graduated with strong academic performance across secondary and senior secondary education.",
    deliverables: [
      "10th Grade CBSE Board Examination: 88%.",
      "12th Grade CBSE Board Examination: 81%.",
      "Strong foundation in mathematics, analytical problem solving, and science.",
    ],
    tags: ["Kendriya Vidyalaya", "AFS Bareilly", "10th: 88%", "12th: 81%", "CBSE"],
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
            Chronological milestones across education (KV Bareilly, DY Patil), professional experience (performancespur, NSS), cloud projects, and AWS certification.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", "Education", "Career", "Projects", "Certifications"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30"
                  : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Chronological Milestone Stream */}
        <div className="relative border-l-2 border-purple-500/30 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
          {filtered.map((milestone) => {
            const Icon = categoryIcons[milestone.category] || Code;
            const isExpanded = expandedId === milestone.id;

            return (
              <div
                key={milestone.id}
                className="relative group transition-all"
                onMouseEnter={() => sound.playHover()}
              >
                {/* Timeline Orb */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/20 group-hover:scale-110 group-hover:border-purple-400 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                {/* Milestone Card */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setExpandedId(isExpanded ? null : milestone.id);
                  }}
                  className={`tech-card p-5 sm:p-6 rounded-xl border transition-all cursor-pointer ${
                    isExpanded
                      ? "border-cyan-400/60 bg-slate-900/90 shadow-xl shadow-cyan-950/40"
                      : "border-slate-800 bg-slate-900/40 hover:border-purple-500/40"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {milestone.year}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
                        {milestone.quarter}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 flex items-center gap-1">
                        <Icon className="w-3 h-3 text-cyan-400" />
                        {milestone.category}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isExpanded ? "rotate-90 text-cyan-400" : ""
                      }`}
                    />
                  </div>

                  <h3 className="text-lg font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {milestone.title}
                  </h3>
                  <div className="text-xs font-mono text-purple-300 mb-2">
                    {milestone.organization}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Expandable Deliverables */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-purple-500/20 space-y-3">
                      <h4 className="text-[11px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                        Key Accomplishments & Deliverables
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                        {milestone.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-400 font-mono mt-0.5">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                          >
                            #{tag}
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

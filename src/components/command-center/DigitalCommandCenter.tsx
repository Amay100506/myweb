"use client";

import { useState } from "react";
import { 
  Activity, 
  Terminal, 
  Cpu, 
  GitBranch, 
  ShieldCheck, 
  Radio, 
  Compass, 
  Layers, 
  ChevronRight, 
  TrendingUp, 
  Server,
  Zap,
  Clock,
  Sparkles,
  Download,
  Award
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { useI18n } from "@/context/I18nContext";

export function DigitalCommandCenter() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"telemetry" | "projects" | "stack" | "milestones">("telemetry");

  const telemetryStats = [
    { label: "PRIMARY FOCUS", value: "CLOUD & DEVOPS", status: "ACTIVE", color: "text-cyan-400" },
    { label: "VERIFIED CERTIFICATION", value: "AWS CLF-C02", status: "VERIFIED", color: "text-purple-400" },
    { label: "ACADEMIC BASE", value: "DY PATIL (CGPA 8.0)", status: "PURSUING", color: "text-emerald-400" },
    { label: "ACTIVE REGION", value: "PUNE 411057 (IST)", status: "AVAILABLE", color: "text-cyan-300" },
  ];

  const milestones = [
    { year: "2025 – Present", title: "Founder & Cloud/DevOps Engineer", org: "Zaxsat Technologies (www.zaxsat.online)", detail: "Directing cloud infrastructure, modern web architectures, DevOps automation, and scalable client systems." },
    { year: "2026", title: "Sales Executive", org: "performancespur (Pune, IN)", detail: "Recorded client details and sales activity in CRM systems. Built strong professional relationships to increase sales." },
    { year: "2025 – 2026", title: "Student Volunteer", org: "NSS (Pune, IN)", detail: "Assisted with telephone communication, database management, correspondence, and technical/instructional assistance." },
    { year: "2025", title: "AWS Certified Cloud Practitioner", org: "Amazon Web Services (AWS)", detail: "CLF-C02 certification validating core cloud architecture, EC2, S3, IAM, VPC, and CloudWatch." },
    { year: "2025", title: "Cloud Infrastructure Automation", org: "Terraform & Docker CI/CD", detail: "Automated infrastructure provisioning using Terraform and application deployment with Docker and GitHub Actions." },
    { year: "2024", title: "High School Diploma", org: "Kendriya Vidyalaya AFS Bareilly", detail: "Completed secondary education: 10th - 88% | 12th - 81%." },
    { year: "2024", title: "Bachelor of Computer Applications (BCA)", org: "Dr. D. Y. Patil Vidyapeeth", detail: "Commenced BCA curriculum in Pune, maintaining strong academic performance with 8.0 CGPA." },
  ];

  return (
    <section id="command-center" className="relative py-24 px-4 sm:px-6 bg-slate-950 border-t border-purple-500/15 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-3">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{t.commandCenter.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-3">
            {t.commandCenter.title}
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm font-sans">
            {t.commandCenter.subtitle}
          </p>
        </div>

        {/* Dashboard Shell */}
        <div className="tech-card rounded-2xl border-purple-500/30 overflow-hidden shadow-2xl relative hud-corner">
          {/* Top Telemetry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-purple-500/20 divide-x divide-y md:divide-y-0 divide-purple-500/10 bg-slate-900/60 font-mono text-xs">
            {telemetryStats.map((item, idx) => (
              <div key={idx} className="p-4 flex flex-col justify-between">
                <span className="text-[10px] text-slate-500 tracking-wider uppercase">{item.label}</span>
                <span className={`text-sm font-bold mt-1 ${item.color}`}>{item.value}</span>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-purple-500/20 bg-slate-950/80 px-4 gap-2 overflow-x-auto text-xs font-mono">
            {[
              { id: "telemetry", label: "Operations Telemetry", icon: Activity },
              { id: "projects", label: "Active Deployments", icon: Server },
              { id: "stack", label: "Skills Matrix", icon: Cpu },
              { id: "milestones", label: "Milestone Chronicle", icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`flex items-center gap-2 py-3 px-4 border-b-2 font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "border-cyan-400 text-cyan-300 bg-purple-950/20"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dashboard Body */}
          <div className="p-6 sm:p-8 bg-slate-950/90 min-h-[300px]">
            {activeTab === "telemetry" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-300">CLOUD CERTIFICATION</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      AWS Certified Cloud Practitioner (CLF-C02). Deep understanding of AWS core services, EC2 compute, S3 storage, IAM security, and CloudWatch.
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                      Issuer: Amazon Web Services (AWS)
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-300">DEVOPS & CONTAINERIZATION</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Containerizing microservices with Docker, orchestrating with Kubernetes on AWS EKS, and automating with GitHub Actions & Jenkins.
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-purple-400">
                      IaC: Terraform & Shell Scripting
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-100">SYSTEMS & OBSERVABILITY</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Linux administration, Bash automation, and metric telemetry monitoring with AWS CloudWatch and Prometheus.
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
                      Networking: TCP/IP, DNS, Load Balancing
                    </div>
                  </div>
                </div>

                {/* Direct Download Callout */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span>OFFICIAL RESUME VERIFICATION</span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      Direct PDF download contains verified education (KV Bareilly, DY Patil), AWS CLF-C02 certification, skills, and experience records.
                    </p>
                  </div>
                  <a
                    href="/resume.pdf"
                    download="Amay_Kumar_Resume.pdf"
                    onClick={() => sound.playClick()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-950/50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume PDF</span>
                  </a>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-mono font-bold text-white text-sm">{proj.title}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-300">
                        {proj.developmentStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans mb-3 line-clamp-2">{proj.tagline}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "stack" && (
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {PORTFOLIO_DATA.skills.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                    <div className="text-xs font-mono font-bold text-purple-300 mb-2">{cat.title}</div>
                    <ul className="space-y-1 text-xs text-slate-400 font-sans">
                      {cat.skills.map((s) => (
                        <li key={s.name} className="flex justify-between">
                          <span>{s.name}</span>
                          <span className="font-mono text-cyan-400 text-[11px]">{s.proficiency}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "milestones" && (
              <div className="space-y-3">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs"
                  >
                    <span className="font-mono font-bold text-cyan-400 text-sm whitespace-nowrap">{m.year}</span>
                    <div className="flex-1">
                      <div className="font-bold text-white font-mono flex items-center gap-2">
                        <span>{m.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-normal">
                          {m.org}
                        </span>
                      </div>
                      <p className="text-slate-400 font-sans mt-0.5">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

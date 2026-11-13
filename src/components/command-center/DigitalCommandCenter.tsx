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
  Sparkles
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { useI18n } from "@/context/I18nContext";

export function DigitalCommandCenter() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"telemetry" | "projects" | "stack" | "milestones">("telemetry");

  const telemetryStats = [
    { label: "SYS ARCHITECTURE", value: "DISTRIBUTED / EDGE", status: "ONLINE", color: "text-cyan-400" },
    { label: "COGNITIVE AI CORE", value: "LOCAL / VERIFIED", status: "NOMINAL", color: "text-purple-400" },
    { label: "ACADEMIC BASE", value: "DY PATIL, PUNE", status: "PURSUING", color: "text-emerald-400" },
    { label: "ACTIVE REGION", value: "PUNE (UTC+5:30)", status: "AVAILABLE", color: "text-cyan-300" },
  ];

  const milestones = [
    { year: "2026", title: "Full-Stack & Cloud Architecture", org: "Systems Engineering", detail: "Asynchronous Python backends, Next.js App Router, and Docker pipelines" },
    { year: "2025", title: "PRIOSORT System Architecture", org: "Android Systems", detail: "Engineered on-device notification prioritization rule engine" },
    { year: "2025", title: "RAKSHAK Edge Computer Vision", org: "Autonomous Safety", detail: "YOLO & OpenCV road hazard and fissure mapping pipeline" },
    { year: "2024", title: "Systems & Cloud Computing Focus", org: "DY Patil Vidyapeeth", detail: "BCA foundations in data structures, Linux, Docker, and C++" },
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
              { id: "stack", label: "Core Competency Vector", icon: Cpu },
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
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-300">SYSTEM HEALTH</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      OPTIMAL
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Zero fatal exceptions logged across production builds. Next.js 16 Edge runtime verified.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                    Host: Pune, Maharashtra, India
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300">SYSTEM ARCHITECTURE & CLOUD</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                      OPTIMAL
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Designing resilient backend services with FastAPI and Docker containerization. Next.js 16 interfaces with type-safe state coordination.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-purple-400">
                    Focus: Scalable Cloud & Edge Systems
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-100">EDGE AI & VISION</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    RAKSHAK pipeline deploying YOLOv8 and OpenCV algorithms for real-time urban road safety telemetry.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
                    Inference: On-device Edge AI
                  </div>
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
              <div className="grid sm:grid-cols-3 gap-4">
                {PORTFOLIO_DATA.skills.slice(0, 6).map((cat) => (
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
                    <span className="font-mono font-bold text-cyan-400 text-sm">{m.year}</span>
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

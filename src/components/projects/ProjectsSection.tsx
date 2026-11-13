"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Code2, 
  Layers, 
  ExternalLink, 
  ArrowLeftRight, 
  CheckCircle2, 
  Smartphone, 
  Eye, 
  Bell, 
  Server, 
  ShieldCheck, 
  ChevronRight,
  Info,
  BookOpen
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Project } from "@/types";
import { sound } from "@/lib/sound";

interface ProjectsSectionProps {
  onCompareProjects: (projA?: Project, projB?: Project) => void;
}

export function ProjectsSection({ onCompareProjects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string>("all");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const projects = PORTFOLIO_DATA.projects;

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  const categoryIcons: Record<string, typeof Smartphone> = {
    Mobile: Smartphone,
    "AI & Computer Vision": Eye,
    "Full-Stack": Bell,
    "Cloud & Systems": Server,
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 bg-slate-950/80 border-t border-purple-500/10 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-3">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 04 // ENGINEERING ARTIFACTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Showcases</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Flagship architectures addressing notification cognitive overload, municipal road safety via edge AI, and telemetry infrastructure.
          </p>

          {/* Compare Systems Button */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                sound.playModalOpen();
                onCompareProjects(projects[0], projects[1]);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-900/30 text-xs font-mono text-cyan-300 transition-colors shadow-sm"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
              <span>Compare System Architectures</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["all", "Mobile", "AI & Computer Vision", "Full-Stack", "Cloud & Systems"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setFilter(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                filter === cat
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-semibold"
                  : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {cat === "all" ? "All Systems" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const Icon = categoryIcons[project.category] || Layers;
            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                onMouseEnter={() => sound.playHover()}
                className="tech-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative hud-corner group border-purple-500/20 hover:border-purple-500/50"
              >
                <div>
                  {/* Top Status & Category Badge */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-purple-500/10 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-purple-950/60 text-cyan-400 border border-purple-500/30">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300">
                      {project.developmentStatus}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mt-1 mb-2">
                    {project.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/70 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Repository</span>
                      </a>
                    )}
                    <Link
                      href={`/project/${project.id}`}
                      onClick={() => sound.playClick()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/30 text-xs font-mono text-purple-200 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Case Study</span>
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      sound.playModalOpen();
                      const other = projects.find((p) => p.id !== project.id) || projects[0];
                      onCompareProjects(project, other);
                    }}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Compare</span>
                    <ArrowLeftRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Project Deep-Dive Modal */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <div 
              className="w-full max-w-3xl bg-slate-950 border border-purple-500/40 rounded-xl shadow-2xl p-6 sm:p-8 relative text-slate-200 hud-corner my-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start pb-4 border-b border-purple-500/20">
                <div>
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                    {activeProjectModal.category} • {activeProjectModal.developmentStatus}
                  </span>
                  <h3 className="text-2xl font-bold font-mono text-white mt-1">
                    {activeProjectModal.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">
                    {activeProjectModal.tagline}
                  </p>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveProjectModal(null);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                    System Architecture Specification
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans">
                    {activeProjectModal.technicalArchitecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 rounded bg-slate-900/60 border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                    Key Features & Functional Capabilities
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                    {activeProjectModal.features.map((feat, idx) => (
                      <li key={idx} className="p-2 rounded bg-slate-900/40 border border-slate-800/80">
                        ⚡ {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex justify-end gap-3">
                {activeProjectModal.githubUrl && (
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

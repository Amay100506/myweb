"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  Layers, 
  ExternalLink, 
  ChevronRight, 
  Filter, 
  RotateCw,
  Sparkles,
  CheckCircle2,
  Download
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cloud & Systems", "Mobile", "AI & Computer Vision"];

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_DATA.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-purple-500/20 pb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono">
              Showing {filteredProjects.length} of {PORTFOLIO_DATA.projects.length} Systems
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>PROJECT LABORATORY & ARCHITECTURE CATALOGUE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl leading-relaxed">
            Real systems, microservices, and mobile utilities. Every project represents tangible problem solving—from Terraform cloud automation and AWS EKS clusters to on-device Android notification prioritization.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-purple-500/20 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by keyword, technology (AWS, Docker, Terraform, K8s, Java, Python)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-xs font-mono text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-950/50"
                      : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="tech-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-purple-500/20 hover:border-cyan-400/50 transition-all group relative hud-corner shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-700 text-purple-300">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {project.developmentStatus}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-purple-400 mt-1 mb-3">
                  {project.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlight Metric Badge */}
                {project.highlightMetric && (
                  <div className="mb-6 p-3 rounded-lg bg-slate-900/60 border border-purple-500/20 flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{project.highlightMetric}</span>
                  </div>
                )}

                {/* Technologies List */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block">
                    Core Technologies & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between gap-3">
                <Link
                  href={`/project/${project.id}`}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-white font-bold group-hover:translate-x-1 transition-all"
                >
                  <span>Detailed Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <a
                    href={project.githubUrl || PORTFOLIO_DATA.personal.social.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <p className="text-sm font-mono text-slate-400">
              No systems match &quot;{searchQuery}&quot; under &quot;{selectedCategory}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white text-xs font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Direct Link to 360° Studio */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <RotateCw className="w-4 h-4 animate-spin-slow" />
              <span>360° ARCHITECTURE INSPECTOR</span>
            </div>
            <h3 className="text-lg font-mono font-bold text-white">
              Want to inspect cloud topologies in 360 degrees?
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Explore AWS Cloud Core, Kubernetes Clusters, and Terraform layers on a 360° interactive turntable.
            </p>
          </div>
          <Link
            href="/#spatial-360"
            className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-950/50"
          >
            Launch 360° Dimension
          </Link>
        </div>
      </div>
    </div>
  );
}

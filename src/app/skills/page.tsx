"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Cpu, 
  Cloud, 
  Layers, 
  Box, 
  Terminal, 
  GitBranch, 
  Activity, 
  Network, 
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  RotateCw
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Turntable360Viewer } from "@/components/three/Turntable360Viewer";
import { sound } from "@/lib/sound";
import { SkillItem } from "@/types";

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = PORTFOLIO_DATA.skills;

  const categoryIcons: Record<string, typeof Cloud> = {
    cloud: Cloud,
    devops: Layers,
    iac: Box,
    "os-scripting": Terminal,
    "version-control": GitBranch,
    monitoring: Activity,
    networking: Network,
    security: ShieldCheck,
  };

  const displayedSkills = activeCategory === "all"
    ? categories.flatMap((c) => c.skills)
    : categories.find((c) => c.id === activeCategory)?.skills || [];

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-purple-500/20 pb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-mono">
              {categories.reduce((acc, c) => acc + c.skills.length, 0)} Verified Competencies
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>TECHNICAL COMPETENCY MATRIX & TOOLKIT</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">Stack & Skills</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl leading-relaxed">
            Every technology listed here comes from practical hands-on building—configuring AWS VPC networks, containerizing applications with Docker, orchestrating clusters with Kubernetes on AWS EKS, and declaring reproducible infrastructure using Terraform.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveCategory("all");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              activeCategory === "all"
                ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-950/50"
                : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
            }`}
          >
            All Disciplines ({categories.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>

          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Cloud;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-cyan-600 text-white font-bold shadow-md shadow-cyan-950/50"
                    : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-300"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => {
                  sound.playClick();
                  setSelectedSkill(isSelected ? null : skill);
                }}
                className={`tech-card p-5 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? "border-cyan-400 bg-slate-900 shadow-xl shadow-cyan-950/40"
                    : "border-slate-800 bg-slate-900/50 hover:border-purple-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-sm text-white">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/20">
                    {skill.level}
                  </span>
                </div>

                {/* Proficiency Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                </div>

                {skill.description && (
                  <p className="mt-2 text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-2">
                    {skill.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Skill Details Callout */}
        {selectedSkill && (
          <div className="p-6 rounded-2xl border border-cyan-500/40 bg-slate-900/90 shadow-2xl space-y-2 hud-corner">
            <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
              INSPECTING COMPETENCY
            </span>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold font-mono text-white">
                  {selectedSkill.name}
                </h3>
                <p className="text-sm text-slate-300 font-sans mt-1 max-w-2xl">
                  {selectedSkill.description}
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-3xl font-bold text-cyan-300">
                  {selectedSkill.proficiency}%
                </span>
                <span className="block text-xs text-purple-400">
                  Level: {selectedSkill.level}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Embedded 360° Architecture Turntable Studio */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <h2 className="text-2xl font-mono font-bold text-white">
              360° System Architecture Turntable
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Rotate, explode layers, and inspect 3D models representing AWS Cloud Core, Kubernetes Clusters, and Terraform infrastructure.
          </p>
          <Turntable360Viewer />
        </div>
      </div>
    </div>
  );
}

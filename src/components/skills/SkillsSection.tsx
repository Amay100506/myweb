"use client";

import { useState } from "react";
import { Code, Cpu, Database, Cloud, LineChart, Sparkles, Filter, CheckCircle2, Layers, Box, Terminal, GitBranch, Activity, Network, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { SkillCategory, SkillItem } from "@/types";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = PORTFOLIO_DATA.skills;

  const categoryIcons: Record<string, typeof Code> = {
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
    <section id="skills" className="relative py-28 px-4 sm:px-6 bg-slate-950/80 border-t border-purple-500/10 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>SECTOR 02 // TECHNICAL COMPETENCY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Constellation</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            AWS Cloud Architecture, DevOps Automation, Infrastructure as Code, Linux Systems, and Security Governance.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => {
              sound.playClick();
              setActiveCategory("all");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-semibold"
                : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            All Disciplines ({categories.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>

          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] || Code;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 font-semibold"
                    : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Skills Grid */}
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
                onMouseEnter={() => sound.playHover()}
                className={`tech-card p-4 rounded-xl cursor-pointer transition-all duration-200 relative group ${
                  isSelected ? "border-cyan-400 shadow-lg shadow-cyan-950/50 bg-slate-900" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/20">
                    {skill.level}
                  </span>
                </div>

                {/* Proficiency Telemetry Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                </div>

                {skill.description && (
                  <p className="mt-2 text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-sans">
                    {skill.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Skill Inspector Drawer / Callout */}
        {selectedSkill && (
          <div className="mt-8 p-6 rounded-2xl border border-cyan-500/40 bg-slate-900/90 shadow-2xl relative hud-corner">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                  TELEMETRY INSPECTOR
                </span>
                <h3 className="text-2xl font-bold font-mono text-white mt-0.5">
                  {selectedSkill.name}
                </h3>
                <p className="text-sm text-slate-300 font-sans mt-1 max-w-2xl">
                  {selectedSkill.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  {selectedSkill.proficiency}%
                </div>
                <div className="text-xs font-mono text-purple-400">
                  Level: {selectedSkill.level}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { 
  Cpu, 
  Cloud, 
  Layers, 
  Box, 
  Terminal, 
  GitBranch, 
  Activity, 
  Network, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  SlidersHorizontal,
  Code
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { SkillCategory, SkillItem } from "@/types";

export function SkillsSection() {
  const categories = PORTFOLIO_DATA.skills;

  // Accordion state: by default, keep only the primary 'cloud' category open to keep it short & compact
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    cloud: true,
  });

  const [selectedFilter, setSelectedFilter] = useState<string>("all");

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

  const toggleCategory = (catId: string) => {
    sound.playClick();
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleDropdownSelect = (catId: string) => {
    sound.playClick();
    setSelectedFilter(catId);
    if (catId === "all") {
      // Keep only first open or current
      setOpenCategories({ cloud: true });
    } else {
      // Open specifically selected category
      setOpenCategories({ [catId]: true });
    }
  };

  const expandAll = () => {
    sound.playClick();
    const allOpen: Record<string, boolean> = {};
    categories.forEach((c) => {
      allOpen[c.id] = true;
    });
    setOpenCategories(allOpen);
  };

  const collapseAll = () => {
    sound.playClick();
    setOpenCategories({});
  };

  // Filtered categories according to dropdown selector
  const visibleCategories = selectedFilter === "all"
    ? categories
    : categories.filter((c) => c.id === selectedFilter);

  const totalSkillsCount = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 bg-slate-950/80 border-t border-purple-500/10 cyber-grid">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300 mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>TECHNICAL COMPETENCY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white mb-2">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Constellation</span>
          </h2>
          <p className="max-w-lg text-slate-400 text-xs sm:text-sm font-sans">
            Interactive dropdown matrix of {totalSkillsCount} verified cloud & DevOps competencies.
          </p>
        </div>

        {/* Dropdown Selector & Quick Actions Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/70 border border-purple-500/20 mb-6 font-mono text-xs shadow-lg">
          {/* Category Dropdown Menu */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-400 text-[11px] uppercase tracking-wider hidden sm:inline">
              Category:
            </span>
            <div className="relative flex-1 sm:w-64">
              <select
                value={selectedFilter}
                onChange={(e) => handleDropdownSelect(e.target.value)}
                className="w-full appearance-none px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer pr-8 text-xs font-mono transition-colors"
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.skills.length})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Quick Toggle Controls */}
          <div className="flex items-center gap-2 text-[11px]">
            <button
              onClick={expandAll}
              className="px-2.5 py-1 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-purple-300 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Collapsible Dropdown Structure (Accordion Rows) */}
        <div className="space-y-3">
          {visibleCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Code;
            const isOpen = !!openCategories[category.id];

            return (
              <div
                key={category.id}
                className={`tech-card rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-cyan-500/40 bg-slate-900/80 shadow-lg shadow-cyan-950/20"
                    : "border-slate-800/80 bg-slate-950/60 hover:border-slate-700"
                }`}
              >
                {/* Accordion Row Header / Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg border transition-colors shrink-0 ${
                        isOpen
                          ? "bg-cyan-950/60 border-cyan-400 text-cyan-300"
                          : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-purple-300 group-hover:border-purple-500/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                          {category.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 shrink-0">
                          {category.skills.length} skills
                        </span>
                      </div>

                      {/* Preview chips when closed */}
                      {!isOpen && (
                        <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                          {category.skills.slice(0, 3).map((s) => s.name).join(" • ")}
                          {category.skills.length > 3 ? ` • +${category.skills.length - 3} more` : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                      {isOpen ? "Collapse" : "Expand"}
                    </span>
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-cyan-400" : "text-slate-400 group-hover:text-white"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Dropdown Content */}
                {isOpen && (
                  <div className="px-3.5 pb-4 sm:px-4 sm:pb-5 pt-1 border-t border-purple-500/15">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-3">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          onMouseEnter={() => sound.playHover()}
                          className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-cyan-400/50 hover:bg-slate-900 transition-all text-xs group"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="font-mono font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-400 font-semibold shrink-0">
                              {skill.proficiency}%
                            </span>
                          </div>

                          {/* Mini Progress Bar */}
                          <div className="w-full bg-slate-850 h-1 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-300"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

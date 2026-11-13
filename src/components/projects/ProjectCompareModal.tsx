"use client";

import { useState } from "react";
import { X, Layers, ArrowLeftRight, Check, Shield } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Project } from "@/types";
import { sound } from "@/lib/sound";

interface ProjectCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectA?: Project;
  initialProjectB?: Project;
}

export function ProjectCompareModal({
  isOpen,
  onClose,
  initialProjectA,
  initialProjectB,
}: ProjectCompareModalProps) {
  const projects = PORTFOLIO_DATA.projects;
  const [projAId, setProjAId] = useState<string>(initialProjectA?.id || projects[0]?.id || "");
  const [projBId, setProjBId] = useState<string>(initialProjectB?.id || projects[1]?.id || "");

  if (!isOpen) return null;

  const projectA = projects.find((p) => p.id === projAId) || projects[0];
  const projectB = projects.find((p) => p.id === projBId) || projects[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-5xl bg-slate-950 border border-purple-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-200 hud-corner my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-mono font-bold tracking-wider text-white">
              SYSTEM ARCHITECTURE COMPARISON MATRIX
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Selectors */}
        <div className="grid grid-cols-2 border-b border-slate-800 divide-x divide-slate-800 bg-slate-900/50 p-4">
          <div className="pr-4">
            <label className="block text-[11px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">
              Primary System
            </label>
            <select
              value={projAId}
              onChange={(e) => {
                sound.playClick();
                setProjAId(e.target.value);
              }}
              className="w-full bg-slate-950 border border-purple-500/30 rounded px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-purple-400"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.category})
                </option>
              ))}
            </select>
          </div>
          <div className="pl-4">
            <label className="block text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1.5">
              Comparison Target
            </label>
            <select
              value={projBId}
              onChange={(e) => {
                sound.playClick();
                setProjBId(e.target.value);
              }}
              className="w-full bg-slate-950 border border-cyan-500/30 rounded px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          {/* Tagline & Status */}
          <div className="grid grid-cols-2 gap-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-purple-300 font-mono">{projectA.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{projectA.tagline}</p>
              <div className="mt-2 flex gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300">
                  {projectA.developmentStatus}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {projectA.category}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-300 font-mono">{projectB.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{projectB.tagline}</p>
              <div className="mt-2 flex gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300">
                  {projectB.developmentStatus}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {projectB.category}
                </span>
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="grid grid-cols-2 gap-6 pb-4 border-b border-slate-800 text-xs">
            <div>
              <span className="font-mono text-purple-400 uppercase text-[10px] tracking-wider block mb-1">
                Problem Statement
              </span>
              <p className="text-slate-300 leading-relaxed">{projectA.problemStatement}</p>
            </div>
            <div>
              <span className="font-mono text-cyan-400 uppercase text-[10px] tracking-wider block mb-1">
                Problem Statement
              </span>
              <p className="text-slate-300 leading-relaxed">{projectB.problemStatement}</p>
            </div>
          </div>

          {/* Technical Architecture */}
          <div className="grid grid-cols-2 gap-6 pb-4 border-b border-slate-800 text-xs">
            <div>
              <span className="font-mono text-purple-400 uppercase text-[10px] tracking-wider block mb-2">
                Architectural Breakdown
              </span>
              <ul className="space-y-1.5 text-slate-300">
                {projectA.technicalArchitecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-mono text-cyan-400 uppercase text-[10px] tracking-wider block mb-2">
                Architectural Breakdown
              </span>
              <ul className="space-y-1.5 text-slate-300">
                {projectB.technicalArchitecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-mono text-purple-400 uppercase text-[10px] tracking-wider block mb-2">
                Stack & Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {projectA.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-cyan-400 uppercase text-[10px] tracking-wider block mb-2">
                Stack & Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {projectB.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

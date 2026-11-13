"use client";

import { useState } from "react";
import { X, Download, Printer, ExternalLink, Briefcase, GraduationCap, Code, CheckCircle2, UserCheck, Cpu, FolderGit2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResumeView = "recruiter" | "technical" | "project";

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeView, setActiveView] = useState<ResumeView>("recruiter");

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-purple-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-200 hud-corner my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-slate-900 border-b border-purple-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-sm font-mono font-bold tracking-wider text-slate-100">
              AMAY_KUMAR_RESUME_STUDIO // v2.5
            </h2>
          </div>

          {/* View Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                sound.playClick();
                setActiveView("recruiter");
              }}
              className={`px-3 py-1 rounded transition-colors ${
                activeView === "recruiter" ? "bg-purple-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Recruiter View
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveView("technical");
              }}
              className={`px-3 py-1 rounded transition-colors ${
                activeView === "technical" ? "bg-cyan-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Technical View
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveView("project");
              }}
              className={`px-3 py-1 rounded transition-colors ${
                activeView === "project" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              Project View
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable & Interactive Resume Body */}
        <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-950 text-slate-200 font-sans print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-purple-500/20 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white print:text-black">
                  {PORTFOLIO_DATA.personal.name}
                </h1>
                <p className="text-purple-400 font-mono text-sm mt-1 print:text-purple-700">
                  {PORTFOLIO_DATA.personal.tagline}
                </p>
              </div>
              <div className="text-right text-xs font-mono text-cyan-400">
                <span>View: {activeView.toUpperCase()} MODE</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-3 print:text-slate-600">
              <span>📍 {PORTFOLIO_DATA.personal.location}</span>
              <span>✉️ {PORTFOLIO_DATA.personal.social.email}</span>
              <span>🔗 {PORTFOLIO_DATA.personal.social.github}</span>
              <span>💼 {PORTFOLIO_DATA.personal.social.linkedin}</span>
            </div>
          </div>

          {/* Recruiter-Friendly View Focus */}
          {activeView === "recruiter" && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <section className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 print:bg-transparent print:border-none print:p-0">
                <h3 className="font-mono text-xs text-purple-400 uppercase tracking-wider font-bold mb-1.5">
                  Professional Executive Summary
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Proactive Software Engineer and BCA student at Dr. D. Y. Patil Vidyapeeth Pune. Experienced in Android systems programming, edge AI computer vision pipelines, and quantitative market research. Demonstrated track record in delivering analytical dashboards and production software utilities.
                </p>
              </section>

              {/* Experience Highlights */}
              <section>
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Work Experience</span>
                </div>
                {PORTFOLIO_DATA.experience.map((exp) => (
                  <div key={exp.id} className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-2 mb-3 print:bg-transparent print:border-none print:p-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white print:text-black">{exp.role}</h4>
                        <p className="text-purple-400 text-sm font-medium">{exp.company} — {exp.location}</p>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Education */}
              <section>
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-white">{PORTFOLIO_DATA.personal.education.degree}</h4>
                  <p className="text-slate-400 text-sm">{PORTFOLIO_DATA.personal.education.institution} ({PORTFOLIO_DATA.personal.education.status})</p>
                </div>
              </section>
            </div>
          )}

          {/* Technical Systems View Focus */}
          {activeView === "technical" && (
            <div className="space-y-6">
              <section>
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>Technical Competencies Matrix</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  {PORTFOLIO_DATA.skills.map((cat) => (
                    <div key={cat.id} className="p-3.5 rounded bg-slate-900/60 border border-slate-800">
                      <div className="font-mono font-bold text-purple-300 mb-1">{cat.title}</div>
                      <div className="text-slate-300 space-y-0.5">
                        {cat.skills.map((s) => (
                          <div key={s.name} className="flex justify-between text-[11px]">
                            <span>{s.name}</span>
                            <span className="text-cyan-400 font-mono">{s.proficiency}% [{s.level}]</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <Code className="w-4 h-4" />
                  <span>Verified Credentials</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {PORTFOLIO_DATA.certifications.map((c) => (
                    <div key={c.id} className="p-3 rounded bg-slate-900/40 border border-slate-800">
                      <div className="font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-purple-400">{c.issuer} ({c.issueDate})</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Project-Focused View Focus */}
          {activeView === "project" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                <FolderGit2 className="w-4 h-4" />
                <span>Flagship Engineering Systems</span>
              </div>
              <div className="space-y-4">
                {PORTFOLIO_DATA.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-base font-mono">{proj.title}</h4>
                        <p className="text-xs text-purple-300 font-mono">{proj.tagline}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">{proj.description}</p>
                    <div className="text-[11px] font-mono text-cyan-400">
                      Architectural Highlights:
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5">
                      {proj.technicalArchitecture.slice(0, 3).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                    <div className="text-[11px] font-mono text-purple-400 pt-1">
                      Stack: {proj.technologies.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

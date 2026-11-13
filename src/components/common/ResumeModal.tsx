"use client";

import { useState } from "react";
import { X, Download, Printer, ExternalLink, Briefcase, GraduationCap, Code, CheckCircle2, UserCheck, Cpu, FolderGit2, ShieldCheck, Mail, Phone, MapPin, Globe } from "lucide-react";
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
              AMAY_KUMAR_RESUME_STUDIO // CLOUD & DEVOPS
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
            {/* Direct Download Link */}
            <a
              href="/resume.pdf"
              download="Amay_Kumar_Resume.pdf"
              onClick={() => sound.playClick()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded border border-cyan-400 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-200 transition-colors shadow-lg shadow-cyan-950/50"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Download PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
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
                  {PORTFOLIO_DATA.personal.headline}
                </p>
              </div>
              <div className="text-right text-xs font-mono text-cyan-400">
                <span>View: {activeView.toUpperCase()} MODE</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-3 print:text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {PORTFOLIO_DATA.personal.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400" />
                {PORTFOLIO_DATA.personal.social.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400" />
                {PORTFOLIO_DATA.personal.social.phone}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400" />
                {PORTFOLIO_DATA.personal.social.linkedin}
              </span>
            </div>
          </div>

          {/* Recruiter-Friendly View Focus */}
          {activeView === "recruiter" && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <section className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 print:bg-transparent print:border-none print:p-0">
                <h3 className="font-mono text-xs text-purple-400 uppercase tracking-wider font-bold mb-1.5">
                  Professional Summary
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  I&apos;m Amay kumar, an Engineering student with a strong interest in Cloud Computing, DevOps, and emerging technologies. I am an AWS Certified Cloud Practitioner with a passion for learning, problem-solving, and exploring real-world applications of cloud technology. I&apos;m continuously developing my technical skills through hands-on projects and practical learning, with the goal of building a successful career in Cloud and DevOps Engineering.
                </p>
              </section>

              {/* Verified Certification Highlight */}
              <section className="bg-gradient-to-r from-purple-950/40 to-cyan-950/40 p-4 rounded-xl border border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="font-bold text-white text-sm font-mono">
                        AWS Certified Cloud Practitioner (CLF-C02)
                      </h4>
                      <p className="text-xs text-cyan-300 font-mono">Amazon Web Services (AWS) // Verified Credential</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    Active & Verified
                  </span>
                </div>
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
                  <span>Education and Training</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white">{PORTFOLIO_DATA.personal.education.degree}</h4>
                        <p className="text-slate-400 text-sm">{PORTFOLIO_DATA.personal.education.institution}</p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">{PORTFOLIO_DATA.personal.education.status}</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white">{PORTFOLIO_DATA.personal.education.highSchool.degree}</h4>
                        <p className="text-slate-400 text-sm">{PORTFOLIO_DATA.personal.education.highSchool.institution}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-slate-400">{PORTFOLIO_DATA.personal.education.highSchool.completionDate}</span>
                        <p className="text-xs font-mono text-cyan-300 font-bold">{PORTFOLIO_DATA.personal.education.highSchool.performance}</p>
                      </div>
                    </div>
                  </div>
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
                  <span>Verified Credentials & Licenses</span>
                </div>
                <div className="grid sm:grid-cols-1 gap-2 text-xs">
                  {PORTFOLIO_DATA.certifications.map((c) => (
                    <div key={c.id} className="p-3.5 rounded bg-slate-900/40 border border-slate-800">
                      <div className="font-bold text-white text-sm font-mono">{c.title}</div>
                      <div className="text-xs text-purple-400">{c.issuer} ({c.issueDate})</div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {c.skillsValidated.map((skill) => (
                          <span key={skill} className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-[10px] text-purple-300 font-mono">
                            {skill}
                          </span>
                        ))}
                      </div>
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
                <span>Cloud, DevOps & Engineering Systems</span>
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

          {/* Bottom Direct Download Banner */}
          <div className="pt-4 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400">
              Need offline evaluation? Download the official resume PDF directly.
            </div>
            <a
              href="/resume.pdf"
              download="Amay_Kumar_Resume.pdf"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono text-xs font-bold shadow-lg shadow-purple-600/30 transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

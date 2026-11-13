"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, BarChart3, FileSpreadsheet, Download, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

export function ExperienceSection() {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 bg-slate-950/60 border-t border-purple-500/10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROFESSIONAL CHRONICLE & VENTURES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Experience</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Directing Zaxsat Technologies (www.zaxsat.online), client operations at performancespur, and NSS student volunteerism.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={() => sound.playHover()}
              className="tech-card p-6 sm:p-8 rounded-2xl relative hud-corner border-purple-500/30 shadow-xl"
            >
              {/* Header Telemetry */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-purple-500/20">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300">
                      {exp.type}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Record
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-mono text-white">
                    {exp.role}
                  </h3>
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-1.5 text-base font-semibold text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/50 hover:decoration-cyan-300 font-sans mt-0.5 group"
                    >
                      <span>{exp.company}</span>
                      <span className="text-xs font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                        {exp.companyUrl.replace("https://", "")}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <div className="text-base font-semibold text-cyan-300 font-sans mt-0.5">
                      {exp.company}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-purple-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                    Duration: {exp.duration}
                  </div>
                </div>
              </div>

              {/* Summary Paragraph */}
              <div className="py-5">
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {exp.summary}
                </p>
              </div>

              {/* Detailed Responsibilities */}
              <div className="space-y-2.5 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Key Operational Responsibilities & Deliverables
                </h4>
                <div className="grid sm:grid-cols-1 gap-2.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300 font-sans"
                    >
                      <span className="text-cyan-400 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Applied Tags */}
              <div className="pt-4 border-t border-purple-500/10">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Competencies & Tools Applied
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skillsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Download Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-mono font-bold text-white">
              Verified Experience & Credentials Summary
            </h4>
            <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-xl">
              Download Amay Kumar&apos;s complete curriculum vitae in high-resolution PDF format, including AWS CLF-C02 certification, academic background, and skills.
            </p>
          </div>
          <a
            href="/resume.pdf"
            download="Amay_Kumar_Resume.pdf"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-950/50"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}

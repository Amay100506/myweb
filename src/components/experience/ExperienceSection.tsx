"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, BarChart3, FileSpreadsheet } from "lucide-react";
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
            <span>SECTOR 03 // PROFESSIONAL CHRONICLE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Experience</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Software architecture, distributed cloud engineering, and technical system development.
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
                  <div className="text-base font-semibold text-cyan-300 font-sans mt-0.5">
                    {exp.company}
                  </div>
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
      </div>
    </section>
  );
}

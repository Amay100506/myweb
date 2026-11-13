"use client";

import { Award, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

export function CertificationsSection() {
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="certifications" className="relative py-28 px-4 sm:px-6 bg-slate-950/80 border-t border-purple-500/10 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 06 // ACCREDITATIONS & ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Certifications</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Official Amazon Web Services credential: AWS Certified Cloud Practitioner (CLF-C02).
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {certs.map((cert) => (
            <div
              key={cert.id}
              onMouseEnter={() => sound.playHover()}
              className="tech-card p-6 rounded-2xl relative hud-corner group border-purple-500/20 hover:border-purple-500/40"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-cyan-300 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{cert.verificationStatus}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                {cert.title}
              </h3>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-1 mb-4">
                <span>{cert.issuer}</span>
                <span className="text-purple-400">{cert.issueDate}</span>
              </div>

              {/* Skills Validated */}
              <div className="pt-4 border-t border-purple-500/10">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-2">
                  Validated Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsValidated.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs"
                    >
                      {skill}
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

"use client";

import { GraduationCap, Compass, Shield, Terminal, Cpu, Cloud, Globe, Download, Award } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

export function AboutSection() {
  const { personal } = PORTFOLIO_DATA;

  const interestPillars = [
    { title: "Cloud Architecture (AWS)", icon: Cloud, desc: "AWS Certified Cloud Practitioner: EC2, S3, IAM, VPC, RDS, and CloudWatch." },
    { title: "DevOps & Containers", icon: Cpu, desc: "Docker containerization, Kubernetes cluster orchestration, and Jenkins/GitHub Actions CI/CD." },
    { title: "Infrastructure as Code", icon: Terminal, desc: "Declarative Terraform provisioning, modular templates, and state management." },
    { title: "Systems & Networking", icon: Globe, desc: "Linux POSIX administration, Bash scripting, Python automation, and TCP/IP / DNS protocols." },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 bg-slate-950/60 border-t border-purple-500/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 01 // IDENTITY & ENGINEERING CORE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Amay Kumar</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Engineering student with strong focus in Cloud Computing, DevOps, automated infrastructure, and container systems.
          </p>
        </div>

        {/* 2-Column Grid: Left Profile Card, Right Narrative & Pillars */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Technical Dossier Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="tech-card p-6 rounded-2xl relative hud-corner">
              {/* Card Header Telemetry */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 text-xs font-mono text-slate-400">
                <span className="text-purple-400 font-bold">OPERATIVE_RECORD #001</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AWS CERTIFIED
                </span>
              </div>

              {/* Identity Snapshot */}
              <div className="py-5 space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Candidate</label>
                  <div className="text-xl font-bold font-mono text-white">{personal.name}</div>
                  <div className="text-xs font-mono text-cyan-300">{personal.headline}</div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Education & Training</label>
                  <div className="flex items-start gap-2.5 mt-1 text-slate-200">
                    <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">{personal.education.degree}</div>
                      <div className="text-xs text-purple-300">{personal.education.institution}</div>
                      <div className="text-[11px] text-emerald-400 font-mono mt-0.5">{personal.education.status}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 mt-3 text-slate-200">
                    <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">{personal.education.highSchool.degree}</div>
                      <div className="text-xs text-slate-400">{personal.education.highSchool.institution}</div>
                      <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{personal.education.highSchool.performance}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Core Skill Vectors</label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {["AWS (EC2, S3, IAM)", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "Python", "CloudWatch"].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-purple-500/20 text-purple-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Download Button */}
              <div className="pt-4 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-slate-400">{personal.location}</span>
                <a
                  href="/resume.pdf"
                  download="Amay_Kumar_Resume.pdf"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-400/50 hover:bg-cyan-900/60 text-cyan-200 font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>

            {/* Quick Quote / Philosophy */}
            <div className="p-5 rounded-xl border border-cyan-500/20 bg-cyan-950/10 text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold block mb-1.5">&gt;&gt; ENGINEERING PHILOSOPHY:</span>
              &ldquo;Cloud computing and DevOps are about transforming manual, fragile infrastructure into declarative, resilient, and reproducible software architectures that deliver business value with high velocity.&rdquo;
            </div>
          </div>

          {/* Right Column: Narrative Story & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="tech-card p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-mono font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-bold">&gt;</span> Professional Summary
              </h3>
              {personal.bio.map((paragraph, index) => (
                <p key={index} className="text-slate-300 text-sm leading-relaxed font-sans">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Technical Pillars Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {interestPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    onMouseEnter={() => sound.playHover()}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-purple-500/40 hover:bg-slate-900 transition-all duration-200 group"
                  >
                    <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300 group-hover:text-cyan-300 group-hover:border-cyan-400/50 w-fit mb-3 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-mono font-bold text-slate-100 mb-1 group-hover:text-purple-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

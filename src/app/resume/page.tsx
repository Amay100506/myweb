"use client";

import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  MapPin, 
  Mail, 
  Phone, 
  Globe,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

export default function ResumePage() {
  const { personal, experience, skills, certifications, projects } = PORTFOLIO_DATA;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white pt-24 pb-20 px-4 sm:px-6 print:bg-white print:text-black print:p-0">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb (Hidden when printing) */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-purple-500/20 pb-4 print:hidden">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <a
              href="/resume.pdf"
              download="Amay_Kumar_Resume.pdf"
              onClick={() => sound.playClick()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* ATS & Printable Resume Container */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-950 border border-purple-500/30 shadow-2xl space-y-8 font-sans print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-purple-500/20 pb-6 print:border-black/20">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-white print:text-black tracking-tight">
              {personal.name.toUpperCase()}
            </h1>
            <p className="text-purple-400 font-mono text-sm mt-1 print:text-purple-800">
              {personal.headline}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-3 print:text-slate-700">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400 print:text-black" />
                {personal.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400 print:text-black" />
                {personal.social.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400 print:text-black" />
                {personal.social.phone}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400 print:text-black" />
                {personal.social.linkedin}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider print:text-purple-800">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              I&apos;m Amay Kumar, an Engineering student at Dr. D. Y. Patil Vidyapeeth Pune with a strong interest in Cloud Computing, DevOps, and emerging technologies. I am an AWS Certified Cloud Practitioner (CLF-C02) with a passion for learning, problem-solving, and exploring real-world applications of cloud technology. I am continuously developing my technical skills through hands-on projects and practical learning, with the goal of building a successful career in Cloud and DevOps Engineering.
            </p>
          </section>

          {/* Verified Certification */}
          <section className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/20 print:bg-transparent print:border-black/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold font-mono text-white print:text-black">
                  AWS Certified Cloud Practitioner (CLF-C02)
                </h3>
                <p className="text-xs text-purple-300 print:text-purple-800">
                  Amazon Web Services (AWS) // Verified Industry Credential
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 print:text-emerald-700 font-bold">
                Active & Verified
              </span>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider print:text-purple-800">
              Technical Competencies & Stack
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-sans">
              {skills.map((cat) => (
                <div key={cat.id} className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 print:bg-transparent print:border-black/10">
                  <span className="font-mono font-bold text-cyan-300 print:text-black block mb-1">
                    {cat.title}
                  </span>
                  <p className="text-slate-300 print:text-slate-700 text-xs">
                    {cat.skills.map((s) => s.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider print:text-purple-800">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5 pb-4 border-b border-slate-800 last:border-none print:border-black/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white print:text-black">
                        {exp.role} <span className="font-normal text-slate-400 print:text-slate-600">/ {exp.company}</span>
                      </h3>
                      <p className="text-xs text-cyan-400 print:text-cyan-800">{exp.location}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 print:text-slate-700">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 print:text-slate-800 space-y-1 pt-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Flagship Projects */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider print:text-purple-800">
              Selected Technical Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold text-white print:text-black">
                    <span>{proj.title}</span>
                    <span className="font-mono font-normal text-slate-400 print:text-slate-600">{proj.year}</span>
                  </div>
                  <p className="text-slate-300 print:text-slate-800">{proj.tagline}</p>
                  <p className="text-slate-400 print:text-slate-600 font-mono text-[11px]">
                    Technologies: {proj.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider print:text-purple-800">
              Education and Training
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white print:text-black">
                    {personal.education.degree}
                  </h3>
                  <p className="text-slate-400 print:text-slate-700">{personal.education.institution}</p>
                </div>
                <span className="font-mono text-emerald-400 print:text-emerald-700 font-bold">
                  {personal.education.status}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white print:text-black">
                    {personal.education.highSchool.degree}
                  </h3>
                  <p className="text-slate-400 print:text-slate-700">{personal.education.highSchool.institution}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-slate-400 print:text-slate-700">{personal.education.highSchool.completionDate}</span>
                  <span className="block text-cyan-400 print:text-cyan-800 font-bold">{personal.education.highSchool.performance}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

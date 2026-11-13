import Link from "next/link";
import { 
  ArrowLeft, 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Download, 
  Award, 
  Building2, 
  FileSpreadsheet,
  Users,
  Terminal,
  ExternalLink
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const metadata = {
  title: "Experience & Work History | Amay Kumar",
  description:
    "Professional experience of Amay Kumar: Sales Executive at performancespur, Student Volunteer at NSS, AWS Certified Cloud Practitioner.",
};

export default function ExperiencePage() {
  const { experience, certifications, personal } = PORTFOLIO_DATA;

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-purple-500/20 pb-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">● Verified Employment & Volunteer Records</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROFESSIONAL CHRONICLE & ROLES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Experience</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl leading-relaxed">
            Corporate client operations, university student volunteer leadership, and hands-on cloud systems engineering. Real-world communication, CRM data management, and operational discipline.
          </p>
        </div>

        {/* Work Experience Timeline Cards */}
        <div className="space-y-8">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="tech-card p-6 sm:p-8 rounded-2xl relative hud-corner border-purple-500/30 shadow-xl space-y-6"
            >
              {/* Header Telemetry */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-purple-500/20">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300">
                      {exp.type}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Record
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    {exp.role}
                  </h2>
                  <div className="text-lg font-semibold text-cyan-300 font-sans mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-purple-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                    Duration: {exp.duration}
                  </div>
                </div>
              </div>

              {/* Summary Paragraph */}
              <div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {exp.summary}
                </p>
              </div>

              {/* Key Deliverables & Responsibilities */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Operational Responsibilities & Accomplishments
                </h3>
                <div className="grid gap-2.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed"
                    >
                      <span className="text-cyan-400 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Applied Tags */}
              <div className="pt-4 border-t border-purple-500/10">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Skills & Tools Applied
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

        {/* Verified Certification Highlight */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-cyan-500/40 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-cyan-400" />
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                  Industry Credential
                </span>
                <h3 className="text-xl font-bold font-mono text-white">
                  AWS Certified Cloud Practitioner (CLF-C02)
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              Verified & Active
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Validated by Amazon Web Services. Comprehensive understanding of AWS core services (EC2, S3, IAM, VPC, RDS, CloudWatch), cloud architecture, least-privilege security compliance, and financial pricing models.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "AWS Cloud Architecture",
              "Compute (EC2) & Storage (S3)",
              "Security & IAM Least Privilege",
              "VPC Subnets & Routing",
              "CloudWatch Monitoring",
              "Billing & Pricing Models",
            ].map((skill) => (
              <span
                key={skill}
                className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Download Banner */}
        <div className="p-8 rounded-2xl bg-slate-950 border border-purple-500/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-mono font-bold text-white">
              Need offline evaluation for HR or technical review?
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Download the official, high-resolution resume PDF containing verified educational marks, certifications, and experience.
            </p>
          </div>
          <a
            href="/resume.pdf"
            download="Amay_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-purple-950/50"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  BookOpen, 
  Headphones, 
  Coffee, 
  Terminal, 
  Heart, 
  ArrowLeft, 
  Download, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";

export const metadata = {
  title: "About Amay Kumar | Story, Education & Journey",
  description:
    "Learn about Amay Kumar—BCA student at Dr. D. Y. Patil Vidyapeeth Pune, AWS Certified Cloud Practitioner, his journey from Bareilly to Pune, and his engineering philosophy.",
};

export default function AboutPage() {
  const { personal, now, humanDetails } = PORTFOLIO_DATA;

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
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">● Open for Opportunities</span>
            <span>Pune 411057, India</span>
          </div>
        </div>

        {/* Hero Narrative Intro */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span>THE HUMAN BEHIND THE CODE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white leading-tight">
            Hey, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Amay Kumar</span>.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-sans leading-relaxed max-w-3xl">
            I&apos;m an engineering student at Dr. D. Y. Patil Vidyapeeth in Pune with a genuine love for cloud computing, Linux systems, containerization, and building software that doesn&apos;t break.
          </p>
        </div>

        {/* The Live "/now" Widget */}
        <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-slate-900/40 relative hud-corner shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-mono font-bold text-white tracking-wider">
                WHAT I&apos;M UP TO RIGHT NOW
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Updated: {now.lastUpdated}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 text-xs font-sans">
            <div className="space-y-1">
              <span className="text-slate-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                Current Base
              </span>
              <p className="text-slate-200 font-medium">{now.location}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                University Life
              </span>
              <p className="text-slate-200 font-medium">{now.studying}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Deep Dive Learning
              </span>
              <p className="text-slate-200 font-medium">{now.learning}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Currently Reading
              </span>
              <p className="text-slate-200 font-medium">{now.reading}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-pink-400" />
                Coding Soundtrack
              </span>
              <p className="text-slate-200 font-medium">{now.listeningTo}</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-mono text-[11px] uppercase flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-cyan-400" />
                Fuel of Choice
              </span>
              <p className="text-slate-200 font-medium">{now.coffeeFuel}</p>
            </div>
          </div>

          {/* Direct Company Venture Banner */}
          <div className="mt-6 pt-5 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3 bg-amber-950/20 p-4 rounded-xl border border-amber-500/30">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] font-mono text-amber-300 block uppercase">Direct Company / Venture</span>
                <span className="text-sm font-bold text-white">Zaxsat Technologies</span>
                <span className="text-xs text-slate-300 block mt-0.5">
                  Building & scaling resilient cloud infrastructures, web architectures, and client platforms.
                </span>
              </div>
            </div>
            <a
              href="https://www.zaxsat.online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-mono text-xs font-semibold transition-all group"
            >
              <span>Visit www.zaxsat.online</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Narrative Personal Story */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">&gt;</span> My Journey & Roots
          </h2>

          <div className="space-y-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            {humanDetails.story.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Personal Quote */}
          <div className="p-6 rounded-xl bg-purple-950/20 border-l-4 border-purple-500 text-slate-200 italic font-sans text-sm">
            &ldquo;{humanDetails.quote}&rdquo;
          </div>
        </div>

        {/* Education Deep Dive */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            Education & Academic Track Record
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300">
                  Higher Education
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Current CGPA: 8.0
                </span>
              </div>
              <h3 className="text-xl font-bold font-mono text-white">
                Bachelor of Computer Applications (BCA)
              </h3>
              <p className="text-sm font-sans text-cyan-300">
                Dr. D. Y. Patil Vidyapeeth, Pune
              </p>
              <p className="text-xs font-sans text-slate-400 leading-relaxed">
                Core coursework in Data Structures, Operating Systems, Computer Networks (TCP/IP), Database Modeling (SQL), and Object-Oriented Software Engineering.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Secondary & High School
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  Completed 05/2024
                </span>
              </div>
              <h3 className="text-xl font-bold font-mono text-white">
                High School Diploma (CBSE)
              </h3>
              <p className="text-sm font-sans text-purple-300">
                Kendriya Vidyalaya AFS Bareilly - Bareilly
              </p>
              <div className="flex gap-4 text-xs font-mono text-slate-300 pt-1">
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">
                  10th Grade: <strong className="text-cyan-400">88%</strong>
                </span>
                <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">
                  12th Grade: <strong className="text-purple-400">81%</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hobbies & Beyond Code */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            Beyond the Terminal & Daily Life
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {humanDetails.hobbies.map((hobby, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 font-sans flex items-start gap-2.5"
              >
                <span className="text-cyan-400 font-mono mt-0.5">0{idx + 1}.</span>
                <span>{hobby}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace & Tools */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            Daily Driver Hardware & Software Environment
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Operating System</span>
              <span className="text-slate-200 mt-0.5 block">{humanDetails.workspace.os}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Terminal & Shell</span>
              <span className="text-cyan-300 mt-0.5 block">{humanDetails.workspace.terminal}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Code Editors</span>
              <span className="text-purple-300 mt-0.5 block">{humanDetails.workspace.editor}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Cloud Setup</span>
              <span className="text-emerald-300 mt-0.5 block">{humanDetails.workspace.cloud}</span>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-8 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Amay_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-purple-950/50"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-cyan-400 bg-slate-900 text-slate-200 font-mono text-xs font-semibold transition-all"
            >
              Get in Touch
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a href={personal.social.github} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a href={personal.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a href={`mailto:${personal.social.email}`} className="hover:text-white flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

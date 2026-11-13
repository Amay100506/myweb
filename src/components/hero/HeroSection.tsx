"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, Code2, Sparkles, Terminal, FileText, Send, ChevronRight, Download, BookOpen, ExternalLink, Building2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { HeroCanvas } from "../three/HeroCanvas";
import { TelemetryHUD } from "../common/TelemetryHUD";
import { sound } from "@/lib/sound";

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenAI: () => void;
}

export function HeroSection({ onOpenResume, onOpenTerminal, onOpenAI }: HeroSectionProps) {
  const [show3D, setShow3D] = useState(true);
  const [isFreeOrbit, setIsFreeOrbit] = useState(false);

  const scrollTo = (id: string) => {
    sound.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-12 overflow-hidden cyber-grid"
    >
      {/* 3D Background Canvas */}
      {show3D && <HeroCanvas isFreeOrbit={isFreeOrbit} />}

      {/* Atmospheric Radial Gradient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Sleek Minimalist Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-200 mb-6 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Cloud & DevOps Engineer</span>
          <span className="text-slate-600">•</span>
          <span>AWS Certified</span>
          <span className="text-slate-600">•</span>
          <a
            href="https://www.zaxsat.online"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 hover:decoration-amber-300 transition-colors"
          >
            Zaxsat Technologies ↗
          </a>
        </div>

        {/* Main Name Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 font-mono">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-300 drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
            {PORTFOLIO_DATA.personal.heroTitle}
          </span>
        </h1>

        {/* Tagline Statement */}
        <p className="max-w-xl text-base sm:text-lg text-slate-300 font-sans leading-relaxed mb-8">
          {PORTFOLIO_DATA.personal.tagline}
        </p>

        {/* Primary Interactive CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
          {/* Explore Projects */}
          <Link
            href="/projects"
            onClick={() => sound.playClick()}
            className="group px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-lg shadow-purple-600/30 transition-all duration-200 flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-cyan-300" />
            <span>View Projects</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* About Me */}
          <Link
            href="/about"
            onClick={() => sound.playClick()}
            className="px-6 py-3 rounded-lg border border-purple-500/40 bg-slate-950/70 hover:bg-purple-950/40 text-purple-200 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200"
          >
            About Me
          </Link>

          {/* Direct Download Resume */}
          <a
            href="/resume.pdf"
            download="Amay_Kumar_Resume.pdf"
            onClick={() => sound.playClick()}
            className="px-5 py-3 rounded-lg border border-cyan-500/50 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-200 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-cyan-950/40"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Resume (PDF)</span>
          </a>
        </div>
      </div>

      {/* 3D Visual Controls & Skip Toggle */}
      <div className="absolute bottom-4 right-4 z-20 hidden lg:flex items-center gap-2 text-[10px] font-mono text-slate-500">
        <button
          onClick={() => {
            sound.playClick();
            setIsFreeOrbit(!isFreeOrbit);
          }}
          className={`px-2.5 py-1 rounded border transition-colors ${
            isFreeOrbit
              ? "border-cyan-400 bg-cyan-950/80 text-cyan-300 font-bold shadow-lg shadow-cyan-950/40"
              : "border-slate-800 bg-slate-950/80 hover:text-slate-300"
          }`}
          title="Drag and orbit 360 degrees around the hero universe"
        >
          {isFreeOrbit ? "360° Free Orbit: ACTIVE (Drag)" : "360° Free Orbit: OFF"}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setShow3D(!show3D);
          }}
          className="px-2 py-1 rounded border border-slate-800 bg-slate-950/80 hover:text-slate-300"
        >
          {show3D ? "3D Engine: Active (Toggle)" : "3D Engine: Low-Power (Toggle)"}
        </button>
      </div>

      {/* Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-70 animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
          Scroll to Inspect
        </span>
        <ArrowDown className="w-4 h-4 text-purple-400" />
      </div>
    </section>
  );
}

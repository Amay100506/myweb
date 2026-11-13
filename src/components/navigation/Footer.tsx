"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, Sparkles, Terminal, ExternalLink, Play } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { usePortfolioStore } from "@/store/usePortfolioStore";

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export function Footer({ onOpenTerminal, onOpenCommandPalette }: FooterProps) {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-purple-500/20 py-12 px-4 sm:px-6 font-mono text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Monogram */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-purple-500/40">
            <Image src="/favicon.svg" alt="Amay Kumar" fill className="object-cover" />
          </div>
          <div>
            <div className="text-white font-bold tracking-wider">AMAY KUMAR</div>
            <div className="text-[10px] text-purple-400">NEXUS COMMAND // 2026</div>
          </div>
        </div>

        {/* Multi-Page Navigation & Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <Link href="/about" className="hover:text-cyan-300 transition-colors">
            About
          </Link>
          <Link href="/projects" className="hover:text-cyan-300 transition-colors">
            Projects
          </Link>
          <Link href="/experience" className="hover:text-cyan-300 transition-colors">
            Experience
          </Link>
          <Link href="/skills" className="hover:text-cyan-300 transition-colors">
            Skills
          </Link>
          <Link href="/journal" className="hover:text-cyan-300 transition-colors">
            Journal
          </Link>
          <Link href="/resume" className="hover:text-cyan-300 transition-colors">
            Resume
          </Link>
          <Link href="/contact" className="hover:text-cyan-300 transition-colors">
            Contact
          </Link>
          <a
            href="https://www.zaxsat.online"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold transition-colors"
            title="Zaxsat Technologies (www.zaxsat.online)"
          >
            <span>Zaxsat Technologies</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href="/resume.pdf"
            download="Amay_Kumar_Resume.pdf"
            onClick={() => sound.playClick()}
            className="text-cyan-400 hover:text-cyan-200 font-bold transition-colors"
          >
            [PDF]
          </a>
          <button
            onClick={() => {
              sound.playClick();
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("has_seen_zaxsat_intro");
              }
              usePortfolioStore.getState().setIntroActive(true);
            }}
            className="text-amber-400/80 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono"
            title="Replay Zaxsat 'Z' Opening Animation"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>[Replay Z Intro]</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            [⌘K]
          </button>
          <Link
            href="/admin"
            className="text-slate-600 hover:text-purple-300 transition-colors"
          >
            [Admin]
          </Link>
        </div>

        {/* Return to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/40 text-purple-200 transition-colors"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-600">
        <div>
          © 2026 Amay Kumar. Designed with original high-tech aesthetics & resilient engineering.
        </div>
        <div className="flex items-center gap-2">
          <span>SECURE PROTOCOL</span>
          <span>•</span>
          <span className="text-emerald-500">SYSTEMS OPTIMAL</span>
        </div>
      </div>
    </footer>
  );
}

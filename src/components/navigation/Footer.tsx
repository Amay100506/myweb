"use client";

import Image from "next/image";
import { ArrowUp, Mail, Sparkles, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

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

        {/* Quick Links & Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="hover:text-cyan-300 transition-colors"
          >
            [Search (Ctrl+K)]
          </button>
          <button
            onClick={() => {
              sound.playModalOpen();
              onOpenTerminal();
            }}
            className="hover:text-purple-300 transition-colors"
          >
            [CLI Terminal]
          </button>
          <a
            href={PORTFOLIO_DATA.personal.social.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PORTFOLIO_DATA.personal.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.social.email}`}
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <a
            href="/admin"
            className="text-slate-500 hover:text-purple-300 transition-colors"
          >
            [CMS Admin]
          </a>
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

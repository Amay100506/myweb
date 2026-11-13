"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Terminal, 
  Search, 
  Bot, 
  FileText, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink,
  Download
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { SoundToggle } from "../common/SoundToggle";
import { sound } from "@/lib/sound";

import { useI18n } from "@/context/I18nContext";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
  onOpenAI: () => void;
  onOpenResume: () => void;
  onOpenSoundControls?: () => void;
}

export function Navbar({
  onOpenCommandPalette,
  onOpenTerminal,
  onOpenAI,
  onOpenResume,
  onOpenSoundControls,
}: NavbarProps) {
  const { t, lang, toggleLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "Skills", href: "/skills" },
    { name: "Journal", href: "/journal" },
    { name: "360° Space", href: "/#spatial-360" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-purple-500/20 py-2.5 shadow-lg shadow-purple-950/20"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Monogram */}
        <Link
          href="/"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-purple-500/40 group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Image
              src="/favicon.svg"
              alt="Amay Kumar Brand Monogram"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="font-mono font-bold text-sm tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors block">
              AMAY KUMAR
            </span>
            <span className="text-[10px] font-mono text-purple-400 block -mt-0.5">
              CLOUD & DEVOPS ENGINEER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => sound.playHover()}
              className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              toggleLang();
            }}
            className="px-2 py-1 rounded-md border border-slate-800 bg-slate-900/60 hover:border-cyan-400 text-[10px] font-mono text-cyan-300 transition-colors"
            title="Toggle Language (EN / HI)"
          >
            {lang === "en" ? "EN" : "HI"}
          </button>

          {/* Audio Synthesizer Toggle */}
          <SoundToggle />

          {/* Audio Controls HUD Launcher */}
          {onOpenSoundControls && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenSoundControls();
              }}
              className="p-1 rounded-md border border-slate-800 bg-slate-900/60 hover:border-purple-500/40 text-slate-400 hover:text-cyan-300"
              title="Open Audio & Drone HUD"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </button>
          )}

          {/* Search / Command Palette (Ctrl+K) */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-800 bg-slate-900/60 hover:border-purple-500/40 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
            title="Command Palette (Ctrl+K / Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline text-[11px]">Search</span>
            <kbd className="hidden md:inline px-1 py-0.2 rounded bg-slate-800 text-[10px] text-slate-500">
              ⌘K
            </kbd>
          </button>

          {/* Terminal Command Center */}
          <button
            onClick={() => {
              sound.playModalOpen();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-800 bg-slate-900/60 hover:border-cyan-400/40 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
            title="Open Interactive CLI Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline text-[11px]">CLI</span>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={() => {
              sound.playModalOpen();
              onOpenAI();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 text-xs font-mono text-purple-200 transition-colors"
            title="Launch AMAY AI Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-semibold">AMAY AI</span>
          </button>

          {/* Resume Studio & Direct Download */}
          <div className="flex items-center rounded-md border border-cyan-500/40 bg-cyan-950/20 overflow-hidden">
            <button
              onClick={() => {
                sound.playClick();
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-cyan-300 hover:bg-cyan-900/40 transition-colors"
              title="View Resume Studio"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[11px]">Resume</span>
            </button>
            <a
              href="/resume.pdf"
              download="Amay_Kumar_Resume.pdf"
              onClick={() => sound.playClick()}
              className="px-2 py-1 text-cyan-400 hover:text-white hover:bg-cyan-900/50 border-l border-cyan-500/30 transition-colors"
              title="Direct Download Resume (PDF)"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <SoundToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 border-b border-purple-500/20 px-4 py-4 space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded bg-slate-900/70 border border-slate-800/80 text-slate-300 text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex items-center justify-center gap-2 p-2 rounded bg-slate-900 border border-purple-500/30 text-purple-300"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search (Ctrl+K)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center justify-center gap-2 p-2 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Terminal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="flex items-center justify-center gap-2 p-2 rounded bg-purple-950/50 border border-purple-500/40 text-purple-200"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>AMAY AI</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 p-2 rounded bg-cyan-950/50 border border-cyan-500/40 text-cyan-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume Studio</span>
            </button>
            <a
              href="/resume.pdf"
              download="Amay_Kumar_Resume.pdf"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(false);
              }}
              className="col-span-2 flex items-center justify-center gap-2 p-2 rounded bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border border-cyan-400/50 text-cyan-200 font-bold"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

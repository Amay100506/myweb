"use client";

import { useEffect, useState, useMemo } from "react";
import { 
  Search, 
  Terminal, 
  Bot, 
  FileText, 
  Mail, 
  Volume2, 
  VolumeX, 
  Layers, 
  Code, 
  Briefcase, 
  Sparkles, 
  X,
  ExternalLink,
  Download
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { usePortfolioStore } from "@/store/usePortfolioStore";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Actions" | "Social";
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
  onOpenAI?: () => void;
  onOpenResume?: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenAI,
  onOpenResume,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.playModalOpen();
        if (isOpen) {
          onClose();
        } else {
          // Open
          window.dispatchEvent(new CustomEvent("open_command_palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const commands = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [
      // Navigation
      {
        id: "nav-hero",
        title: "Go to Command Nexus (Hero)",
        category: "Navigation",
        icon: Sparkles,
        description: "Back to top 3D interactive nexus",
        action: () => {
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-about",
        title: "Go to Profile & Story",
        category: "Navigation",
        icon: Layers,
        description: "Education at Dr. D. Y. Patil Vidyapeeth & background",
        action: () => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-skills",
        title: "Go to Skill Constellation",
        category: "Navigation",
        icon: Code,
        description: "Python, C++, Next.js, Docker, AI & Data matrix",
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-projects",
        title: "Go to System Showcases",
        category: "Navigation",
        icon: Layers,
        description: "PRIOSORT, RAKSHAK, NOTIFYIQ & projects",
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-experience",
        title: "Go to Experience Timeline",
        category: "Navigation",
        icon: Briefcase,
        description: "Software Systems Engineering & Project Leadership",
        action: () => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-github",
        title: "Go to GitHub Telemetry",
        category: "Navigation",
        icon: GithubIcon,
        description: "Live repositories & public stats",
        action: () => {
          document.getElementById("github")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-contact",
        title: "Go to Transmission Line (Contact)",
        category: "Navigation",
        icon: Mail,
        description: "Send a transmission to Amay Kumar",
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      // Actions
      {
        id: "action-ai",
        title: "Launch AMAY AI Assistant",
        category: "Actions",
        icon: Bot,
        description: "Interactive neural assistant for Amay's portfolio",
        action: () => {
          onClose();
          onOpenAI?.();
        },
      },
      {
        id: "action-terminal",
        title: "Launch Command Center Terminal",
        category: "Actions",
        icon: Terminal,
        description: "Interactive CLI with custom bash commands",
        action: () => {
          onClose();
          onOpenTerminal?.();
        },
      },
      {
        id: "action-resume",
        title: "Preview Resume Studio",
        category: "Actions",
        icon: FileText,
        description: "Verified interactive resume of Amay Kumar",
        action: () => {
          onClose();
          onOpenResume?.();
        },
      },
      {
        id: "action-download-resume",
        title: "Direct Download Official Resume (PDF)",
        category: "Actions",
        icon: Download,
        description: "Directly download Amay_Kumar_Resume.pdf to your device",
        action: () => {
          onClose();
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Amay_Kumar_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
      {
        id: "action-physics",
        title: "Launch Rapier 3D Physics Simulation",
        category: "Actions",
        icon: Sparkles,
        description: "Interactive gravity & collision simulation",
        action: () => {
          onClose();
          usePortfolioStore.getState().setPhysicsModalOpen(true);
        },
      },
      {
        id: "action-mute",
        title: sound.getMuted() ? "Unmute Audio FX" : "Mute Audio FX",
        category: "Actions",
        icon: sound.getMuted() ? Volume2 : VolumeX,
        description: "Toggle sound synthesizer",
        action: () => {
          sound.toggleMute();
          onClose();
        },
      },
      // Social & Links
      {
        id: "social-github",
        title: "Open GitHub Profile",
        category: "Social",
        icon: GithubIcon,
        description: PORTFOLIO_DATA.personal.social.github,
        action: () => {
          window.open(PORTFOLIO_DATA.personal.social.github, "_blank");
          onClose();
        },
      },
      {
        id: "social-linkedin",
        title: "Open LinkedIn Profile",
        category: "Social",
        icon: LinkedinIcon,
        description: PORTFOLIO_DATA.personal.social.linkedin,
        action: () => {
          window.open(PORTFOLIO_DATA.personal.social.linkedin, "_blank");
          onClose();
        },
      },
    ];

    // Add projects to search
    PORTFOLIO_DATA.projects.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        title: `Project: ${proj.title}`,
        category: "Projects",
        icon: Code,
        description: proj.tagline,
        action: () => {
          const el = document.getElementById(`project-${proj.id}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }
          onClose();
        },
      });
    });

    return items;
  }, [onClose, onOpenAI, onOpenTerminal, onOpenResume]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
      sound.playHover();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      sound.playHover();
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      sound.playClick();
      filtered[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div 
        className="w-full max-w-2xl bg-slate-950 border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-950/50 overflow-hidden hud-corner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-purple-500/20 bg-slate-900/60">
          <Search className="w-5 h-5 text-purple-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search (e.g. 'PrioSort', 'skills', 'terminal')..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-mono text-sm">
              No transmission matched &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-purple-950/40 border border-purple-500/30 text-purple-200"
                      : "text-slate-300 hover:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${isSelected ? "bg-purple-500/20 text-purple-300" : "bg-slate-800/70 text-slate-400"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-wide font-mono flex items-center gap-2">
                        {item.title}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <div className="text-[11px] text-slate-400 font-sans line-clamp-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="hidden sm:flex items-center text-[10px] font-mono text-purple-400 gap-1">
                      <span>ENTER</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-purple-500/10 bg-slate-900/40 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to dismiss</span>
          </div>
          <span className="text-purple-400/80">AMAY NEXUS COMMAND</span>
        </div>
      </div>
    </div>
  );
}

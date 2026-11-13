"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Sparkles, CornerDownLeft, Volume2, Shield } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { usePortfolioStore } from "@/store/usePortfolioStore";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

const KNOWN_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "github",
  "contact",
  "resume",
  "360",
  "clear",
  "theme",
  "whoami",
  "matrix",
  "exit",
];

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: "init",
      command: "sysinfo --status",
      output: (
        <div className="text-cyan-400 space-y-1">
          <p>⚡ AMAY KUMAR [DEVELOPER COMMAND CENTER v2.5] ONLINE</p>
          <p className="text-slate-400">Host: Pune, Maharashtra, India (IST UTC+5:30)</p>
          <p className="text-slate-400">Target: Software Engineering, Cloud Computing & AI</p>
          <p className="text-purple-400">Type &apos;help&apos; or press [Tab] to autocomplete available commands.</p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastInputs, setPastInputs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    sound.playClick();

    if (!cmd) return;

    setPastInputs((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-purple-400 font-bold">OPERATIONAL COMMAND INDEX:</p>
            <p><span className="text-cyan-400 w-28 inline-block">about</span> : Candidate background & academic foundation</p>
            <p><span className="text-cyan-400 w-28 inline-block">skills</span> : Language proficiencies & frameworks</p>
            <p><span className="text-cyan-400 w-28 inline-block">projects</span> : PrioSort, Rakshak, NotifyIQ specifications</p>
            <p><span className="text-cyan-400 w-28 inline-block">experience</span> : Software systems engineering & project leadership</p>
            <p><span className="text-cyan-400 w-28 inline-block">education</span> : Dr. D. Y. Patil Vidyapeeth Pune details</p>
            <p><span className="text-cyan-400 w-28 inline-block">github</span> : Repositories, stars, and language stats</p>
            <p><span className="text-cyan-400 w-28 inline-block">contact</span> : Transmission coordinates & email</p>
            <p><span className="text-cyan-400 w-28 inline-block">resume</span> : Download & printable curriculum vitae</p>
            <p><span className="text-cyan-400 w-28 inline-block">theme</span> : Display active palette (Cyber Graphite)</p>
            <p><span className="text-cyan-400 w-28 inline-block">whoami</span> : Current session telemetry</p>
            <p><span className="text-cyan-400 w-28 inline-block">matrix</span> : Execute digital cascade</p>
            <p><span className="text-cyan-400 w-28 inline-block">clear</span> : Flush terminal screen</p>
            <p><span className="text-cyan-400 w-28 inline-block">exit</span> : Close terminal window</p>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-purple-400 font-bold">{PORTFOLIO_DATA.personal.name}</p>
            <p className="text-cyan-300">{PORTFOLIO_DATA.personal.tagline}</p>
            <p className="text-slate-400">Location: {PORTFOLIO_DATA.personal.location}</p>
            <p className="text-slate-400">Education: {PORTFOLIO_DATA.personal.education.degree} @ {PORTFOLIO_DATA.personal.education.institution}</p>
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">{PORTFOLIO_DATA.personal.education.degree}</p>
            <p className="text-purple-300">{PORTFOLIO_DATA.personal.education.institution}</p>
            <p className="text-slate-400 text-xs">Focus: Data Structures, C++, Operating Systems, Relational Databases, and Applied AI.</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-slate-300">
            {PORTFOLIO_DATA.skills.map((cat) => (
              <div key={cat.id}>
                <span className="text-purple-400 font-semibold">{cat.title}:</span>{" "}
                <span className="text-slate-400">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-slate-300">
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-purple-500/40 pl-3">
                <p className="text-cyan-300 font-bold">{p.title} <span className="text-xs text-purple-400">[{p.category}]</span></p>
                <p className="text-slate-400 text-xs">{p.tagline}</p>
                <p className="text-slate-500 text-xs">Stack: {p.technologies.join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-slate-300">
            {PORTFOLIO_DATA.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-500/40 pl-3">
                <p className="text-purple-300 font-bold">{exp.role} @ {exp.company}</p>
                <p className="text-xs text-slate-400">{exp.period} | {exp.location}</p>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5 mt-1">
                  {exp.responsibilities.slice(0, 3).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case "github":
        output = (
          <div className="space-y-1 text-slate-300">
            <p>Profile: <a href={PORTFOLIO_DATA.personal.social.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.social.github}</a></p>
            <p className="text-slate-400">Flagship repositories: priosort-android, rakshak-road-vision, notifyiq-service, cloud-sentinel</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-slate-300">
            <p>Email: <a href={`mailto:${PORTFOLIO_DATA.personal.social.email}`} className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.social.email}</a></p>
            <p>LinkedIn: <a href={PORTFOLIO_DATA.personal.social.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.social.linkedin}</a></p>
          </div>
        );
        break;

      case "resume":
        if (typeof window !== "undefined") {
          window.open("/resume.pdf", "_blank");
        }
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">Initiating direct download of official resume PDF...</p>
            <p className="text-xs text-slate-400">
              Direct Link:{" "}
              <a href="/resume.pdf" download="Amay_Kumar_Resume.pdf" className="text-cyan-400 underline font-bold">
                /resume.pdf (Amay_Kumar_Resume.pdf)
              </a>
            </p>
            <p className="text-xs text-purple-400">Credential: AWS Certified Cloud Practitioner (CLF-C02) | BCA Dr. D.Y. Patil Vidyapeeth Pune</p>
          </div>
        );
        break;

      case "360":
        usePortfolioStore.getState().setSpatial360ModalOpen(true);
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">Initiating 360° Spatial Cyber Dome Metaverse...</p>
            <p className="text-xs text-slate-400">Rendering procedural GLSL celestial sphere, orbiting spatial satellites, and OrbitControls azimuth tracking.</p>
          </div>
        );
        break;

      case "theme":
        output = (
          <p className="text-purple-300">Active Theme: Cyber Graphite (#040408) with Electric Purple & Cyan accents.</p>
        );
        break;

      case "whoami":
        output = (
          <p className="text-cyan-300">
            OPERATIVE_GUEST @ amay-command-center.local (Privilege: Read/Interactive CLI)
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "matrix":
        output = (
          <div className="text-emerald-400 font-mono text-xs">
            01000001 01001101 01000001 01011001 &gt;&gt; REALITY PROTOCOL ENGAGED<br />
            [AI_CORE: ACTIVE] [EDGE_VISION: SYNCHRONIZED] [CLOUD_SERVICES: NOMINAL]
          </div>
        );
        break;

      case "exit":
        onClose();
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: &apos;{raw}&apos;. Type &apos;help&apos; or press [Tab] to see commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: raw,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Command autocomplete
      const partial = inputVal.trim().toLowerCase();
      if (partial) {
        const match = KNOWN_COMMANDS.find((cmd) => cmd.startsWith(partial));
        if (match) {
          sound.playHover();
          setInputVal(match);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastInputs.length > 0) {
        const nextIdx = historyIndex === -1 ? pastInputs.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(pastInputs[nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= pastInputs.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(pastInputs[nextIdx] || "");
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="w-full max-w-3xl h-[520px] bg-slate-950/95 border border-purple-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs hud-corner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-purple-500/30">
          <div className="flex items-center gap-2 text-slate-300">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="font-bold tracking-wider text-purple-300">AMAY_CLI // v2.5.0</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Buttons */}
        <div className="flex flex-wrap gap-1.5 px-4 py-2 bg-slate-900/40 border-b border-purple-500/10 text-[10px]">
          {["help", "projects", "skills", "experience", "education", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-purple-950 hover:text-cyan-300 text-slate-400 border border-slate-700/60"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Content Area */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-3 cyber-grid text-slate-200"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((h) => (
            <div key={h.id} className="space-y-1">
              <div className="flex items-center gap-2 text-purple-400 font-semibold">
                <span className="text-cyan-400">amay@nexus:~$</span>
                <span>{h.command}</span>
              </div>
              <div className="pl-4">{h.output}</div>
            </div>
          ))}

          {/* Active input line */}
          <div className="flex items-center gap-2 text-purple-400 pt-1">
            <span className="text-cyan-400">amay@nexus:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 focus:outline-none caret-cyan-400 font-mono text-xs"
              placeholder="Type command ('help', 'projects', 'about') or press [Tab]..."
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Status Bar */}
        <div className="px-4 py-1.5 bg-slate-900/80 border-t border-purple-500/20 flex items-center justify-between text-[10px] text-slate-500">
          <span>PORT: 443 | TAB TO AUTOCOMPLETE</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}

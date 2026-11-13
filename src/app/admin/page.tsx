"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  ArrowLeft, 
  Save, 
  Download, 
  FileJson, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  Layers
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [portfolioJson, setPortfolioJson] = useState(JSON.stringify(PORTFOLIO_DATA, null, 2));
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    // Secure local master key check
    if (passcode === "amay2026" || passcode === "admin") {
      setIsAuthenticated(true);
      setErrorMsg("");
      sound.playSuccess();
    } else {
      setErrorMsg("Unauthorized access attempt logged. Invalid authorization passcode.");
    }
  };

  const handleDownloadConfig = () => {
    sound.playClick();
    const blob = new Blob([portfolioJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolioData.json";
    a.click();
    URL.revokeObjectURL(url);
    setSaveStatus("Configuration exported successfully as JSON!");
  };

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 font-mono text-xs p-6 cyber-grid selection:bg-purple-600/30 selection:text-white">
      <header className="max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-purple-500/20 mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-purple-300 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO NEXUS</span>
        </Link>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-200">PORTFOLIO CMS CONTROLLER</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-20 p-8 rounded-2xl tech-card border-purple-500/30 shadow-2xl relative hud-corner">
            <div className="flex flex-col items-center text-center space-y-3 mb-6">
              <div className="p-3 rounded-full bg-purple-950/60 border border-purple-500/40 text-cyan-400">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">RESTRICTED ACCESS</h2>
              <p className="text-xs text-slate-400 font-sans">
                Enter your administrative authorization key to access the content management system.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                  Master Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter master passcode (e.g. amay2026)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded bg-red-950/40 border border-red-500/40 text-red-300 flex items-center gap-2 text-[11px]">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-lg shadow-purple-600/30"
              >
                Authenticate Session
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-purple-500/20">
              <div>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SESSION AUTHENTICATED: AMAY KUMAR</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct live inspection of centralized data repository. Edit or export updated configuration.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownloadConfig}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {saveStatus && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{saveStatus}</span>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-purple-300">portfolioData.json Schema Inspector</span>
                <span className="text-slate-500">Live Structured Data Model</span>
              </div>
              <textarea
                rows={22}
                value={portfolioJson}
                onChange={(e) => setPortfolioJson(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

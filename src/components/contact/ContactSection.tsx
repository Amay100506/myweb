"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, Send, FileText, CheckCircle2, AlertCircle, Sparkles, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

interface ContactSectionProps {
  onOpenResume: () => void;
}

export function ContactSection({ onOpenResume }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // anti-spam
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit message");
      }

      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#9333ea", "#a855f7", "#06b6d4", "#22d3ee"],
        });
      } catch {}
      setStatus("success");
      setStatusMessage(data.message || "Transmission received! Amay will respond promptly.");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch (err: unknown) {
      setStatus("error");
      setStatusMessage(err instanceof Error ? err.message : "Error sending transmission");
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 bg-slate-950/90 border-t border-purple-500/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 07 // TRANSMISSION NEXUS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Transmission</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Direct communication channel for engineering roles, cloud opportunities, and technical collaboration.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="tech-card p-6 sm:p-8 rounded-2xl relative hud-corner">
              <h3 className="text-lg font-mono font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-cyan-400 font-bold">&gt;</span> Direct Coordinates
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-6">
                Prefer direct communication? Dispatch an email or connect through verified professional channels.
              </p>

              {/* Email Direct */}
              <div className="space-y-4 text-xs font-mono">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.social.email}`}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900 transition-all text-slate-300 group"
                >
                  <div className="p-2 rounded-lg bg-purple-950/50 border border-purple-500/30 text-purple-300 group-hover:text-cyan-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Direct Email</span>
                    <span className="font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                      {PORTFOLIO_DATA.personal.social.email}
                    </span>
                  </div>
                </a>

                {/* LinkedIn Direct */}
                <a
                  href={PORTFOLIO_DATA.personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-slate-300 group"
                >
                  <div className="p-2 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 group-hover:text-white transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">LinkedIn Profile</span>
                    <span className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      linkedin.com/in/amaykumar19connect
                    </span>
                  </div>
                </a>

                {/* GitHub Direct */}
                <a
                  href={PORTFOLIO_DATA.personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900 transition-all text-slate-300 group"
                >
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 group-hover:text-purple-300 transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">GitHub Repository</span>
                    <span className="font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                      github.com/Amay100506
                    </span>
                  </div>
                </a>

                {/* Resume Actions: Direct Download + Interactive Studio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <a
                    href="/resume.pdf"
                    download="Amay_Kumar_Resume.pdf"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold transition-all shadow-lg shadow-cyan-900/30 text-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenResume();
                    }}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-purple-500/30 hover:border-cyan-400 text-slate-200 font-semibold transition-all text-center"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Resume Studio</span>
                  </button>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 pt-4 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Location: Pune, India</span>
                <span className="text-emerald-400">🟢 Active Availability</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Secure Transmission Form */}
          <div className="lg:col-span-7">
            <div className="tech-card p-6 sm:p-8 rounded-2xl relative hud-corner border-purple-500/30">
              <h3 className="text-lg font-mono font-bold text-white mb-2">
                Secure Transmission Form
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-6">
                Fill the parameters below to dispatch an encrypted message packet.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                      Your Identity / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Tech Lead"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-400 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                      Transmission Return Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                    Subject / Objective
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineering Opportunity / Collaboration"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-400 transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                    Transmission Message Body *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your transmission here..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-400 transition-colors font-sans resize-none"
                  />
                </div>

                {/* Form feedback status */}
                {status === "success" && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "loading" ? "Transmitting Packet..." : "Dispatch Transmission"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, 
  Mail, 
  Send, 
  Phone, 
  MapPin, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  Coffee,
  Building2,
  ExternalLink,
  Globe
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

export default function ContactPage() {
  const { personal } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (formData.honeypot) {
      setStatus("success");
      setResponseMsg("Transmission dispatched.");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setResponseMsg("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setResponseMsg("Thank you! Your message has been received. I'll get back to you shortly.");
        sound.playSuccess();

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#a855f7", "#06b6d4", "#ec4899", "#ffffff"],
        });

        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMsg("Network issue. Please email me directly at " + personal.social.email);
    }
  };

  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-12">
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
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">Usually responds within 24 hours</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>LET&apos;S BUILD SOMETHING MEANINGFUL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Touch</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-xl leading-relaxed">
            Open for Cloud & DevOps engineering roles, architecture discussions, and collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="tech-card p-6 rounded-2xl border-purple-500/30 space-y-4">
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Direct Communication
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <a
                  href={`mailto:${personal.social.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-400 text-slate-200 transition-all block"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Personal Email</span>
                    <span className="font-semibold text-slate-200">{personal.social.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Phone Number</span>
                    <span className="font-semibold text-slate-200">{personal.social.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-200">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Current Location</span>
                    <span className="font-semibold text-slate-200">{personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Timezone Indicator */}
              <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Timezone: IST (UTC+5:30)
                </span>
                <span className="text-emerald-400">🟢 Active Hours</span>
              </div>
            </div>

            {/* Direct Company Card */}
            <a
              href="https://www.zaxsat.online"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-purple-950/30 border border-amber-500/30 hover:border-amber-400/60 transition-all block group shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-mono font-bold text-white group-hover:text-amber-300 transition-colors">
                    Zaxsat Technologies
                  </h4>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Direct technology venture specializing in modern cloud architectures, container systems, and scalable digital solutions.
              </p>
              <div className="mt-3 text-xs font-mono text-cyan-300 flex items-center gap-1.5 underline decoration-cyan-500/50">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>www.zaxsat.online</span>
              </div>
            </a>

            {/* Resume Download Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-purple-500/30 space-y-3">
              <h4 className="text-sm font-mono font-bold text-white">
                Looking for My Resume?
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Download the official, high-resolution PDF with complete educational marks, verified AWS certification, and experience records.
              </p>
              <a
                href="/resume.pdf"
                download="Amay_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="tech-card p-6 sm:p-8 rounded-2xl border-purple-500/30 shadow-2xl relative hud-corner">
              <h3 className="text-xl font-mono font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-6">
                Fill out the form below and your message will land straight in my inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Honeypot field */}
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
                    <label className="text-slate-400 mb-1 block">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 mb-1 block">YOUR EMAIL *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. priya@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 mb-1 block">SUBJECT / TOPIC</label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Engineering Role / Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-400 mb-1 block">MESSAGE *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your team, project, or what you'd like to build together..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-cyan-400 outline-none transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{responseMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "loading" ? "Sending Message..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

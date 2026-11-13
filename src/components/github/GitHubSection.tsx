"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Code, Activity, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";

interface GitHubData {
  profile: {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    html_url: string;
  };
  repos: Array<{
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    topics?: string[];
  }>;
  stats: {
    totalStars: number;
    totalForks: number;
    topLanguages: Array<{ name: string; percentage: number; color: string }>;
  };
}

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="github" className="relative py-28 px-4 sm:px-6 bg-slate-950/60 border-t border-purple-500/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300 mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 05 // SOURCE CONTROL TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Activity & Repos</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm font-sans">
            Real-time public code repositories, telemetry statistics, and language distribution.
          </p>
        </div>

        {/* Profile Card & Telemetry Banner */}
        <div className="tech-card p-6 sm:p-8 rounded-2xl relative hud-corner mb-8 border-cyan-500/30 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-cyan-500/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-cyan-400/50 flex items-center justify-center bg-slate-900 shadow-md">
                <GithubIcon className="w-8 h-8 text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-mono text-white">
                    {data?.profile.name || "Amay Kumar"}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    @{data?.profile.login || "Amay100506"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans mt-0.5">
                  {data?.profile.bio || "Software Engineering • Cloud Computing • AI Systems"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={PORTFOLIO_DATA.personal.social.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold transition-colors shadow-lg shadow-cyan-600/30"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-cyan-400">
                {loading ? "..." : data?.profile.public_repos || 12}
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">
                Public Repos
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-purple-400">
                {loading ? "..." : data?.stats.totalStars || 33}
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">
                Total Stars
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-cyan-300">
                {loading ? "..." : data?.stats.totalForks || 8}
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">
                Forks
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl font-bold font-mono text-emerald-400">
                100%
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">
                Verified Codebase
              </div>
            </div>
          </div>

          {/* Top Languages Breakdown Bar */}
          {data?.stats.topLanguages && data.stats.topLanguages.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                <span>Language Telemetry Distribution</span>
                <span className="text-cyan-400">Automated Index</span>
              </div>
              {/* Distribution visual progress bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex mb-3">
                {data.stats.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                    className="h-full transition-all duration-500"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                {data.stats.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span>{lang.name}</span>
                    <span className="text-slate-500 font-semibold">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Repositories Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {(data?.repos || []).map((repo) => (
            <div
              key={repo.id}
              onMouseEnter={() => sound.playHover()}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-purple-500/40 hover:bg-slate-900 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-mono font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <Code className="w-4 h-4 text-purple-400" />
                    <span>{repo.name}</span>
                  </h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="text-slate-500 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed mb-4">
                  {repo.description || "Public software engineering repository by Amay Kumar."}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-slate-300">{repo.language || "Multi-stack"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                    <Star className="w-3.5 h-3.5" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

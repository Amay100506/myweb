"use client";

import { useEffect, useState } from "react";
import { Clock, ShieldCheck, MapPin } from "lucide-react";
import { formatISTTime } from "@/lib/utils";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function TelemetryHUD() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(formatISTTime(new Date()));
    const timer = setInterval(() => {
      setTime(formatISTTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
      {/* Live Pune Time */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-purple-500/20 bg-slate-950/70 text-slate-300">
        <Clock className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-[11px] tracking-wider text-purple-300 font-semibold">{time}</span>
        <span className="text-[10px] text-slate-500">IST (UTC+5:30)</span>
      </div>

      {/* Location */}
      <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-800 bg-slate-950/60 text-slate-400">
        <MapPin className="w-3 h-3 text-cyan-400" />
        <span className="text-[11px]">Pune, India</span>
      </div>

      {/* Availability Status */}
      <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-emerald-500/20 bg-emerald-950/20 text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] font-medium tracking-wide">
          {PORTFOLIO_DATA.personal.availability.badge}
        </span>
      </div>
    </div>
  );
}

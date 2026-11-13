"use client";

import Link from "next/link";
import { AlertTriangle, Home, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#040408] text-slate-100 flex flex-col items-center justify-center p-6 text-center cyber-grid font-mono">
      <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-purple-400 mb-6 shadow-xl">
        <AlertTriangle className="w-12 h-12 text-cyan-400 animate-pulse" />
      </div>

      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
        404
      </h1>
      <h2 className="text-xl font-bold text-white mb-4">
        TELEMETRY VECTOR NOT FOUND
      </h2>
      <p className="max-w-md text-sm text-slate-400 font-sans mb-8">
        The requested transmission coordinate does not exist in the Amay Nexus registry or has been reallocated.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-purple-600/30"
        >
          <Home className="w-4 h-4" />
          <span>Return to Nexus Core</span>
        </Link>
      </div>
    </div>
  );
}

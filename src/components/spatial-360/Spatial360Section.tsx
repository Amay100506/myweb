"use client";

import { useState } from "react";
import { Compass, RotateCw, Sparkles, Eye, Layers, Maximize2 } from "lucide-react";
import { Spatial360Dome } from "../three/Spatial360Dome";
import { Turntable360Viewer } from "../three/Turntable360Viewer";
import { sound } from "@/lib/sound";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function Spatial360Section() {
  const [activeMode, setActiveMode] = useState<"dome" | "turntable">("dome");
  const { setSpatial360ModalOpen } = usePortfolioStore();

  return (
    <section id="spatial-360" className="relative py-28 px-4 sm:px-6 bg-slate-950/80 border-t border-purple-500/15 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300 mb-3">
            <Compass className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
            <span>360° IMMERSIVE SPATIAL UNIVERSE // THREE.JS & R3F</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            360° Spatial <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Dimension</span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm font-sans">
            Full 360-degree interactive spatial exploration. Experience the celestial cyber dome and inspect 3D cloud architectures with continuous turntable rotation.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 mt-8 p-1.5 rounded-xl bg-slate-900/90 border border-purple-500/30 font-mono text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveMode("dome");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeMode === "dome"
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold shadow-lg shadow-purple-950/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>360° Celestial Cyber Dome</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveMode("turntable");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeMode === "turntable"
                  ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold shadow-lg shadow-cyan-950/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>360° Architecture Turntable Studio</span>
            </button>
          </div>
        </div>

        {/* 360° Interactive Container */}
        <div className="space-y-6">
          {activeMode === "dome" ? (
            <div>
              <Spatial360Dome />
            </div>
          ) : (
            <div>
              <Turntable360Viewer />
            </div>
          )}

          {/* Bottom Info Bar */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>OPEN SOURCE TECH: Three.js • React Three Fiber • Drei • GLSL Shaders • OrbitControls</span>
            </div>
            <button
              onClick={() => {
                sound.playModalOpen();
                setSpatial360ModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Launch Fullscreen 360° Mode</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

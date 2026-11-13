"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { sound } from "@/lib/sound";
import { usePortfolioStore } from "@/store/usePortfolioStore";

interface ZaxsatIntroLoaderProps {
  onComplete?: () => void;
  forcePlay?: boolean;
}

export function ZaxsatIntroLoader({ onComplete, forcePlay = false }: ZaxsatIntroLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<"ignite" | "assemble" | "bloom" | "telemetry" | "exit">("ignite");
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasTriggeredSound = useRef(false);

  const { introActive, setIntroActive } = usePortfolioStore();

  const handleFinish = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIntroActive(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("has_seen_zaxsat_intro", "true");
      }
      onComplete?.();
    }, 650);
  }, [onComplete, setIntroActive]);

  useEffect(() => {
    // Check if user already saw the intro in this session (unless forced or requested via store)
    if (typeof window !== "undefined") {
      const alreadySeen = sessionStorage.getItem("has_seen_zaxsat_intro");
      if (!alreadySeen || forcePlay || introActive) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        return;
      }
    }

    // Sequence stages (slow, powerful, cinematic: ~4.5s total)
    const t0 = setTimeout(() => {
      setPhase("ignite");
      if (!hasTriggeredSound.current) {
        sound.playPowerZ();
        hasTriggeredSound.current = true;
      }
    }, 200);

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 35); // 100 * 35ms = ~3.5s

    // Phase 2: Laser wireframe assembly
    const t1 = setTimeout(() => {
      setPhase("assemble");
    }, 900);

    // Phase 3: Neon shockwave & chromatic bloom
    const t2 = setTimeout(() => {
      setPhase("bloom");
    }, 2200);

    // Phase 4: Telemetry text reveal
    const t3 = setTimeout(() => {
      setPhase("telemetry");
    }, 3200);

    // Phase 5: Cinematic exit & curtain lift
    const t4 = setTimeout(() => {
      setPhase("exit");
      handleFinish();
    }, 4500);

    // Keyboard shortcut to skip [Space] or [Escape]
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "Escape") {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(progressInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [forcePlay, handleFinish, introActive]);

  if (!isVisible) return null;

  return (
    <div
      onClick={handleFinish}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#020205] text-slate-100 overflow-hidden cursor-pointer select-none transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Cyber Spatial Atmosphere */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020205]/80 to-[#020205]" />

      {/* Atmospheric Energy Blooms */}
      <div
        className={`absolute w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none transition-all duration-1000 ${
          phase === "bloom" || phase === "telemetry"
            ? "scale-125 opacity-70 bg-cyan-400/25"
            : "scale-75 opacity-30"
        }`}
      />
      <div
        className={`absolute w-[450px] h-[450px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none transition-all duration-1000 ${
          phase === "bloom" || phase === "telemetry"
            ? "scale-110 opacity-60 bg-blue-500/20"
            : "scale-50 opacity-20"
        }`}
      />

      {/* Shockwave Rings on Climax */}
      {(phase === "bloom" || phase === "telemetry") && (
        <>
          <div className="absolute w-40 h-40 rounded-full border border-cyan-400/60 animate-ping pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full border border-blue-500/40 animate-pulse pointer-events-none" />
        </>
      )}

      {/* Top HUD Telemetry Banner */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-cyan-500/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-bold tracking-widest uppercase">
            ZAXSAT ENGINE KERNEL // INITIALIZING
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>HOST: 0.0.0.0</span>
          <span>PORT: 3000</span>
          <span className="text-purple-400">CORE: CLOUD & SYSTEMS</span>
        </div>
      </div>

      {/* Main Stylized 'Z' Emblem Chamber */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Animated Z Container */}
        <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 flex items-center justify-center">
          {/* Laser Contour Path SVG (Draw-On effect) */}
          <svg
            viewBox="0 0 500 500"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]"
          >
            <defs>
              <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="50%" stopColor="#0077FF" />
                <stop offset="100%" stopColor="#0044FF" />
              </linearGradient>
              <linearGradient id="whiteSilverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#A0AEC0" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Top Chevron & Horizontal Upper Beam of 'Z' */}
            <path
              d="M 50 100 L 420 100 L 320 200 L 160 200 Z"
              fill="none"
              stroke="url(#cyanBlueGrad)"
              strokeWidth="4"
              strokeDasharray="1200"
              strokeDashoffset={phase === "ignite" ? "1200" : "0"}
              className="transition-all duration-1000 ease-out"
              filter="url(#neonGlow)"
            />

            {/* Central Double Diagonal Parallel Slashes */}
            {/* Slash 1 (Left / Lower Diagonal Bar) */}
            <path
              d="M 45 400 L 220 190 L 270 190 L 95 400 Z"
              fill="none"
              stroke="#0088FF"
              strokeWidth="3.5"
              strokeDasharray="800"
              strokeDashoffset={phase === "ignite" ? "800" : "0"}
              className="transition-all duration-1000 ease-out delay-200"
              filter="url(#neonGlow)"
            />

            {/* Slash 2 (Right / Upper Diagonal Speed Bar) */}
            <path
              d="M 120 400 L 375 100 L 425 100 L 170 400 Z"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeDasharray="900"
              strokeDashoffset={phase === "ignite" ? "900" : "0"}
              className="transition-all duration-1200 ease-out delay-300"
              filter="url(#neonGlow)"
            />

            {/* Bottom Right Silver/White Notched Bracket */}
            <path
              d="M 230 400 L 360 300 L 430 400 L 180 400 Z"
              fill="none"
              stroke="url(#whiteSilverGrad)"
              strokeWidth="4"
              strokeDasharray="900"
              strokeDashoffset={phase === "ignite" ? "900" : "0"}
              className="transition-all duration-1000 ease-out delay-500"
              filter="url(#neonGlow)"
            />
          </svg>

          {/* Authentic High-Fidelity Logo Image with Dynamic Glow & Blend */}
          <div
            className={`relative w-64 h-64 sm:w-76 sm:h-76 md:w-88 md:h-88 transition-all duration-1000 ${
              phase === "ignite"
                ? "opacity-0 scale-90 blur-md"
                : phase === "assemble"
                ? "opacity-60 scale-95 blur-sm"
                : "opacity-100 scale-100 blur-0 drop-shadow-[0_0_40px_rgba(6,182,212,0.7)]"
            }`}
          >
            <Image
              src="/images/zaxsat-logo.jpg"
              alt="Zaxsat Technologies Logo"
              fill
              priority
              className="object-contain mix-blend-screen"
            />
          </div>

          {/* Horizontal Scanning Cyber Laser Beam */}
          <div
            className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none transition-all duration-1000 shadow-[0_0_15px_#00e5ff] ${
              phase === "assemble" || phase === "bloom"
                ? "top-3/4 opacity-80"
                : "top-1/4 opacity-0"
            }`}
          />
        </div>

        {/* Brand Name & Typography Reveal */}
        <div
          className={`mt-4 text-center space-y-2 transition-all duration-700 ${
            phase === "telemetry" || phase === "bloom"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono tracking-[0.25em] text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-white drop-shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                ZAXSAT
              </span>{" "}
              <span className="text-slate-200">TECHNOLOGIES</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-mono text-cyan-300 tracking-widest uppercase">
            www.zaxsat.online • Cloud Infrastructure & Systems Engineering
          </p>

          <p className="text-[11px] font-sans text-slate-400 max-w-md mx-auto pt-1">
            Founded & Engineered by <strong className="text-white">Amay Kumar</strong> // AWS Certified Cloud Practitioner
          </p>
        </div>

        {/* Progress Metric Bar */}
        <div className="mt-8 w-64 sm:w-80 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span className="text-cyan-400 font-bold">SYSTEM BOOTSTRAP</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-white transition-all duration-100 ease-out shadow-[0_0_10px_#00e5ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls / Skip Action */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
            SPACE
          </span>
          <span>OR CLICK ANYWHERE TO SKIP</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="px-3 py-1 rounded-md border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 text-[11px] font-mono transition-colors"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { 
  Globe, 
  Eye, 
  Type, 
  Sparkles, 
  Sliders, 
  Volume2, 
  Zap, 
  X,
  ChevronDown,
  Box
} from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { useAccessibility, TextSize, ContrastMode } from "@/context/AccessibilityContext";
import { sound } from "@/lib/sound";

interface AccessibilityBarProps {
  onOpenSoundControls: () => void;
  onOpenShaderPlayground: () => void;
  onOpenPhysics?: () => void;
}

export function AccessibilityBar({
  onOpenSoundControls,
  onOpenShaderPlayground,
  onOpenPhysics,
}: AccessibilityBarProps) {
  const { lang, toggleLang } = useI18n();
  const { contrast, setContrast, textSize, setTextSize } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-20 right-4 z-30 font-mono text-xs">
      {!isOpen ? (
        <button
          onClick={() => {
            sound.playClick();
            setIsOpen(true);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-950/80 border border-purple-500/30 hover:border-cyan-400 text-slate-300 hover:text-white shadow-lg backdrop-blur-md transition-all text-[11px]"
          title="Accessibility & Personalization Settings"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Preferences</span>
        </button>
      ) : (
        <div className="bg-slate-950/95 border border-purple-500/40 rounded-xl p-3 shadow-2xl space-y-2.5 backdrop-blur-md w-60 hud-corner">
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20 text-slate-200">
            <span className="font-bold text-[11px] text-purple-300">PREFERENCES & A11Y</span>
            <button
              onClick={() => {
                sound.playClick();
                setIsOpen(false);
              }}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Language:</span>
            </span>
            <button
              onClick={() => {
                sound.playClick();
                toggleLang();
              }}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-bold"
            >
              {lang === "en" ? "English (EN)" : "हिन्दी (HI)"}
            </button>
          </div>

          {/* Contrast Mode */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              <span>Contrast:</span>
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setContrast(contrast === "normal" ? "high-contrast" : "normal");
              }}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-purple-200"
            >
              {contrast === "normal" ? "Standard" : "High Contrast"}
            </button>
          </div>

          {/* Text Size */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <span>Font Scale:</span>
            </span>
            <div className="flex gap-1">
              {(["normal", "large", "xl"] as TextSize[]).map((sz) => (
                <button
                  key={sz}
                  onClick={() => {
                    sound.playClick();
                    setTextSize(sz);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    textSize === sz ? "bg-purple-600 text-white font-bold" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  {sz === "normal" ? "1x" : sz === "large" ? "1.1x" : "1.2x"}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Controls Modal Launcher */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSoundControls();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-cyan-300 text-[11px] transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Audio & Ambient Drone HUD</span>
          </button>

          {/* Rapier Physics Playground */}
          {onOpenPhysics && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenPhysics();
              }}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-[11px] transition-colors"
            >
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rapier 3D Physics Lab</span>
            </button>
          )}

          {/* Experimental Shader Playground */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenShaderPlayground();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 text-purple-300 text-[11px] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>GLSL Shader Synthesizer</span>
          </button>
        </div>
      )}
    </div>
  );
}

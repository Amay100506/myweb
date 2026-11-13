"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";

export function SoundToggle() {
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(sound.getMuted());

    const handleSoundChange = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      setMuted(custom.detail);
    };

    window.addEventListener("sound_mute_changed", handleSoundChange);
    return () => window.removeEventListener("sound_mute_changed", handleSoundChange);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        const next = sound.toggleMute();
        setMuted(next);
        if (!next) sound.playClick();
      }}
      aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
      title={muted ? "Audio Muted (Click to enable)" : "Audio Active (Click to mute)"}
      className="group relative flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-purple-500/20 bg-slate-950/80 hover:border-purple-500/50 hover:bg-purple-950/20 text-xs font-mono text-slate-400 hover:text-purple-300 transition-all duration-200"
    >
      {muted ? (
        <VolumeX className="w-3.5 h-3.5 text-slate-500" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
      )}
      <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
        {muted ? "Muted" : "Audio FX"}
      </span>
      {!muted && (
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      )}
    </button>
  );
}

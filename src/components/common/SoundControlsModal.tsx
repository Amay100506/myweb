"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Radio, Sliders, X } from "lucide-react";
import { sound } from "@/lib/sound";

interface SoundControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SoundControlsModal({ isOpen, onClose }: SoundControlsModalProps) {
  const [muted, setMuted] = useState(sound.getMuted());
  const [ambientPlaying, setAmbientPlaying] = useState(sound.isAmbientActive());
  const [volume, setVolume] = useState(Math.round(sound.getVolume() * 100));

  useEffect(() => {
    const handleMuteChange = (e: Event) => {
      setMuted((e as CustomEvent<boolean>).detail);
    };
    const handleAmbientChange = (e: Event) => {
      setAmbientPlaying((e as CustomEvent<boolean>).detail);
    };

    window.addEventListener("sound_mute_changed", handleMuteChange);
    window.addEventListener("ambient_sound_changed", handleAmbientChange);
    return () => {
      window.removeEventListener("sound_mute_changed", handleMuteChange);
      window.removeEventListener("ambient_sound_changed", handleAmbientChange);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className="w-full max-w-sm bg-slate-950 border border-purple-500/40 rounded-xl p-5 shadow-2xl relative hud-corner font-mono text-xs text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white tracking-wider">AUDIO SYNTHESIZER HUD</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Mute Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span>Interaction FX</span>
          </div>
          <button
            onClick={() => {
              const m = sound.toggleMute();
              setMuted(m);
            }}
            className={`px-3 py-1 rounded text-[11px] font-bold ${
              muted ? "bg-slate-800 text-slate-400" : "bg-purple-600 text-white shadow-md shadow-purple-600/30"
            }`}
          >
            {muted ? "MUTED" : "ENABLED"}
          </button>
        </div>

        {/* Ambient Sci-Fi Drone Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Radio className={`w-4 h-4 ${ambientPlaying ? "text-cyan-400 animate-pulse" : "text-slate-500"}`} />
            <div>
              <span>Ambient Drone</span>
              <span className="block text-[9px] text-slate-500">Low-freq sine oscillation</span>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              const playing = sound.toggleAmbient();
              setAmbientPlaying(playing);
            }}
            className={`px-3 py-1 rounded text-[11px] font-bold ${
              ambientPlaying ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30" : "bg-slate-800 text-slate-400"
            }`}
          >
            {ambientPlaying ? "ACTIVE" : "OFF"}
          </button>
        </div>

        {/* Volume Slider */}
        <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 mb-4">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Master Level</span>
            <span className="text-cyan-400 font-bold">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setVolume(val);
              sound.setVolume(val / 100);
            }}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <p className="text-[10px] text-slate-500 text-center font-sans">
          Generated via Web Audio API. Zero external audio downloads.
        </p>
      </div>
    </div>
  );
}

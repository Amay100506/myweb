"use client";

import { useEffect } from "react";
import { X, Compass, RotateCw, Eye } from "lucide-react";
import { Spatial360Dome } from "../three/Spatial360Dome";
import { sound } from "@/lib/sound";

interface Spatial360ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Spatial360Modal({ isOpen, onClose }: Spatial360ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-xl">
      <div 
        className="w-full max-w-6xl h-[90vh] bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 hud-corner relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-purple-500/30">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow" />
            <div>
              <h3 className="text-sm font-mono font-bold text-white tracking-wider">
                360° IMMERSIVE SPATIAL METAVERSE // SPHERE VIEWER
              </h3>
              <p className="text-[11px] font-sans text-slate-400">
                Drag to orbit 360 degrees. Click beacons to inspect verified AWS, DevOps & systems engineering telemetry.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with 360° Dome */}
        <div className="flex-1 p-4 bg-slate-950 flex flex-col justify-center">
          <Spatial360Dome />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ContrastMode = "normal" | "high-contrast";
export type TextSize = "normal" | "large" | "xl";
export type PerformanceMode = "auto" | "high-fidelity" | "low-power";

interface AccessibilityContextType {
  contrast: ContrastMode;
  setContrast: (mode: ContrastMode) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  performanceMode: PerformanceMode;
  setPerformanceMode: (mode: PerformanceMode) => void;
  isMobile: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  contrast: "normal",
  setContrast: () => {},
  textSize: "normal",
  setTextSize: () => {},
  reducedMotion: false,
  setReducedMotion: () => {},
  performanceMode: "auto",
  setPerformanceMode: () => {},
  isMobile: false,
});

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [contrast, setContrastState] = useState<ContrastMode>("normal");
  const [textSize, setTextSizeState] = useState<TextSize>("normal");
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [performanceMode, setPerformanceModeState] = useState<PerformanceMode>("auto");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect OS reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionState(motionQuery.matches);

    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Load saved settings
    const savedContrast = localStorage.getItem("a11y_contrast") as ContrastMode | null;
    if (savedContrast) setContrastState(savedContrast);

    const savedSize = localStorage.getItem("a11y_text_size") as TextSize | null;
    if (savedSize) setTextSizeState(savedSize);

    const savedPerf = localStorage.getItem("a11y_perf_mode") as PerformanceMode | null;
    if (savedPerf) setPerformanceModeState(savedPerf);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const setContrast = (mode: ContrastMode) => {
    setContrastState(mode);
    localStorage.setItem("a11y_contrast", mode);
  };

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem("a11y_text_size", size);
  };

  const setReducedMotion = (val: boolean) => {
    setReducedMotionState(val);
  };

  const setPerformanceMode = (mode: PerformanceMode) => {
    setPerformanceModeState(mode);
    localStorage.setItem("a11y_perf_mode", mode);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        contrast,
        setContrast,
        textSize,
        setTextSize,
        reducedMotion,
        setReducedMotion,
        performanceMode,
        setPerformanceMode,
        isMobile,
      }}
    >
      <div
        className={`${contrast === "high-contrast" ? "contrast-125 saturate-150" : ""} ${
          textSize === "large" ? "text-[110%]" : textSize === "xl" ? "text-[120%]" : ""
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);

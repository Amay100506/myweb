"use client";

import { useState, useEffect, Suspense, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { QuantumCore } from "./QuantumCore";
import { DataParticles } from "./DataParticles";
import { TheatreChoreography } from "./TheatreChoreography";

class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function HeroCanvas() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setIsSupported(false);
    } catch {
      setIsSupported(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  if (!isSupported) {
    // 2D CSS Fallback for systems without WebGL
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full border border-purple-500/30 animate-pulse-glow bg-gradient-to-tr from-purple-950/20 via-transparent to-cyan-950/20 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-cyan-400/40 rotate-45" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <CanvasErrorBoundary
        fallback={
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full border border-purple-500/20 animate-pulse" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          className="pointer-events-none"
        >
          <Suspense fallback={null}>
            {/* Dynamic Cinematic Lights */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
            <pointLight position={[-10, -10, -5]} intensity={1.2} color="#06b6d4" />
            <pointLight position={[0, 0, 3]} intensity={2.0} color="#a855f7" distance={8} />

            {/* Central Interactive Core */}
            <QuantumCore mousePos={mousePos} />

            {/* Theatre.js Visual Choreography */}
            <TheatreChoreography />

            {/* Cyber Data Particle Constellation */}
            <DataParticles count={260} />

            {/* Cinematic React Three Postprocessing */}
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.45}
                luminanceThreshold={0.5}
                luminanceSmoothing={0.3}
              />
              <Vignette eskil={false} offset={0.1} darkness={0.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}

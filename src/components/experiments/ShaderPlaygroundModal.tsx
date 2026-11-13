"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles, X, Sliders, Play, RotateCcw } from "lucide-react";
import { sound } from "@/lib/sound";

const fragmentShader = `
uniform float uTime;
uniform float uFrequency;
uniform float uGlow;
varying vec2 vUv;

void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float len = length(p);
    
    // Cyber concentric rings with wave interference
    float wave = sin(len * uFrequency - uTime * 2.5);
    float pulse = 0.5 + 0.5 * sin(uTime * 1.5);
    
    vec3 colorA = vec3(0.58, 0.2, 0.92); // Electric Purple
    vec3 colorB = vec3(0.13, 0.83, 0.93); // Cyber Cyan
    
    vec3 finalColor = mix(colorA, colorB, wave * 0.5 + 0.5);
    finalColor += vec3(uGlow / (len * 4.0 + 0.1)) * pulse;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function ShaderPlane({ frequency, glow }: { frequency: number; glow: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uFrequency: { value: frequency },
    uGlow: { value: glow },
  });

  useEffect(() => {
    uniforms.current.uFrequency.value = frequency;
    uniforms.current.uGlow.value = glow;
  }, [frequency, glow]);

  useFrame((state) => {
    uniforms.current.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

export function ShaderPlaygroundModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [frequency, setFrequency] = useState(12);
  const [glow, setGlow] = useState(0.4);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-slate-950 border border-purple-500/40 rounded-xl overflow-hidden shadow-2xl relative hud-corner font-mono text-xs text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h3 className="font-bold text-white tracking-wider">
              EXPERIMENTAL GLSL SHADER SYNTHESIZER
            </h3>
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

        {/* Shader Canvas */}
        <div className="relative h-[280px] bg-black">
          <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
            <ShaderPlane frequency={frequency} glow={glow} />
          </Canvas>
          <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 pointer-events-none">
            [REAL-TIME GLSL FRAGMENT SHADER RUNTIME]
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="p-5 space-y-4 bg-slate-900/60 border-t border-purple-500/20">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-purple-300">Wave Topology Frequency</span>
              <span className="text-cyan-400 font-bold">{frequency}</span>
            </div>
            <input
              type="range"
              min="4"
              max="30"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-purple-300">Quantum Nucleus Glow</span>
              <span className="text-cyan-400 font-bold">{(glow * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={glow}
              onChange={(e) => setGlow(parseFloat(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setFrequency(12);
                setGlow(0.4);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Parameters</span>
            </button>
            <span className="text-[10px] text-slate-500">WebGL Progressive Enhancement</span>
          </div>
        </div>
      </div>
    </div>
  );
}

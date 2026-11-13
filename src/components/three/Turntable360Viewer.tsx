"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { 
  RotateCw, 
  Layers, 
  Maximize2, 
  Eye, 
  ShieldCheck, 
  Cpu, 
  Server, 
  Box, 
  Sliders, 
  Sparkles as SparklesIcon 
} from "lucide-react";
import { sound } from "@/lib/sound";

type ModelMode = "aws-cloud" | "k8s-cluster" | "terraform-iac";
type MaterialMode = "solid" | "wireframe" | "hologram";

// Model 1: AWS Cloud Architecture 3D Representation
function AwsCloudModel({
  rotationAngle,
  explodedAmount,
  materialMode,
}: {
  rotationAngle: number;
  explodedAmount: number;
  materialMode: MaterialMode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.8;
    if (ringRef2.current) ringRef2.current.rotation.x += delta * 0.6;
  });

  const wireframe = materialMode === "wireframe";
  const opacity = materialMode === "hologram" ? 0.75 : 1.0;
  const transparent = materialMode === "hologram";

  return (
    <group ref={groupRef} rotation={[0, (rotationAngle * Math.PI) / 180, 0]}>
      {/* Central EC2 Compute Core */}
      <mesh position={[0, explodedAmount * 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.6}
          roughness={0.2}
          wireframe={wireframe}
          transparent={transparent}
          opacity={opacity}
        />
      </mesh>

      {/* Orbiting S3 Storage Buckets (Exploded outward) */}
      {[-1, 1].map((dir, i) => (
        <group key={i} position={[dir * (2.2 + explodedAmount * 1.5), 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.55, 0.55, 0.9, 24]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.7}
              wireframe={wireframe}
              transparent={transparent}
              opacity={opacity}
            />
          </mesh>
        </group>
      ))}

      {/* VPC Concentric Routing Rings */}
      <mesh ref={ringRef1} position={[0, -explodedAmount * 1.2, 0]}>
        <torusGeometry args={[3.2 + explodedAmount * 0.8, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={0.9}
          wireframe
        />
      </mesh>
      <mesh ref={ringRef2} position={[0, explodedAmount * 1.2, 0]}>
        <torusGeometry args={[2.5 + explodedAmount * 0.6, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* IAM Security Shield Tetrahedron on Top */}
      <mesh position={[0, 2.2 + explodedAmount * 2.0, 0]}>
        <tetrahedronGeometry args={[0.9]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.8}
          wireframe={wireframe}
          transparent={transparent}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

// Model 2: Kubernetes Cluster & Pods 3D Representation
function KubernetesModel({
  rotationAngle,
  explodedAmount,
  materialMode,
}: {
  rotationAngle: number;
  explodedAmount: number;
  materialMode: MaterialMode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframe = materialMode === "wireframe";
  const opacity = materialMode === "hologram" ? 0.75 : 1.0;
  const transparent = materialMode === "hologram";

  return (
    <group ref={groupRef} rotation={[0, (rotationAngle * Math.PI) / 180, 0]}>
      {/* Master Control Plane / Kube-API */}
      <mesh position={[0, explodedAmount * 1.2, 0]}>
        <dodecahedronGeometry args={[1.2]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.7}
          roughness={0.1}
          wireframe={wireframe}
          transparent={transparent}
          opacity={opacity}
        />
      </mesh>

      {/* 4 Worker Nodes Arrayed in 360° */}
      {[0, 90, 180, 270].map((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        const dist = 2.4 + explodedAmount * 1.6;
        return (
          <group key={idx} position={[Math.sin(rad) * dist, -0.6 - explodedAmount * 0.8, Math.cos(rad) * dist]}>
            <mesh>
              <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#06b6d4"
                emissiveIntensity={0.6}
                wireframe={wireframe}
                transparent={transparent}
                opacity={opacity}
              />
            </mesh>
            {/* Micro Pods inside worker */}
            <mesh position={[0, 0.8 + explodedAmount * 0.4, 0]}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={0.9}
                wireframe
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Model 3: Terraform Infrastructure Engine
function TerraformModel({
  rotationAngle,
  explodedAmount,
  materialMode,
}: {
  rotationAngle: number;
  explodedAmount: number;
  materialMode: MaterialMode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframe = materialMode === "wireframe";
  const opacity = materialMode === "hologram" ? 0.75 : 1.0;
  const transparent = materialMode === "hologram";

  const layers = [
    { name: "VPC & Networking Layer", color: "#8b5cf6", height: -1.2 },
    { name: "Security & IAM Layer", color: "#06b6d4", height: -0.4 },
    { name: "EC2 & Compute Layer", color: "#f59e0b", height: 0.4 },
    { name: "Application Container Layer", color: "#10b981", height: 1.2 },
  ];

  return (
    <group ref={groupRef} rotation={[0, (rotationAngle * Math.PI) / 180, 0]}>
      {layers.map((layer, idx) => (
        <mesh
          key={layer.name}
          position={[0, layer.height + (idx - 1.5) * explodedAmount * 1.2, 0]}
        >
          <cylinderGeometry args={[2.0 - idx * 0.25, 2.0 - idx * 0.25, 0.35, 32]} />
          <meshStandardMaterial
            color={layer.color}
            emissive={layer.color}
            emissiveIntensity={0.6}
            wireframe={wireframe}
            transparent={transparent}
            opacity={opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Turntable360Viewer() {
  const [activeModel, setActiveModel] = useState<ModelMode>("aws-cloud");
  const [materialMode, setMaterialMode] = useState<MaterialMode>("solid");
  const [rotationAngle, setRotationAngle] = useState(45);
  const [explodedAmount, setExplodedAmount] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoSpeed, setAutoSpeed] = useState(1);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="relative w-full rounded-2xl border border-purple-500/30 bg-slate-950 p-6 shadow-2xl hud-corner">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
            <span>360° ARCHITECTURE TURNTABLE INSPECTION STUDIO</span>
          </div>
          <h3 className="text-xl font-mono font-bold text-white mt-1">
            System Geometry & Component Inspector
          </h3>
        </div>

        {/* Model Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => {
              sound.playClick();
              setActiveModel("aws-cloud");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeModel === "aws-cloud"
                ? "bg-amber-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>AWS Cloud Core</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveModel("k8s-cluster");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeModel === "k8s-cluster"
                ? "bg-blue-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Kubernetes Cluster</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveModel("terraform-iac");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeModel === "terraform-iac"
                ? "bg-purple-600 text-white font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Terraform IaC</span>
          </button>
        </div>
      </div>

      {/* Main 360° 3D Canvas */}
      <div className="relative w-full h-[420px] my-4 rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800">
        <Canvas
          camera={{ position: [0, 2.5, 7.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
            <pointLight position={[-10, -5, -5]} intensity={1.2} color="#06b6d4" />
            <pointLight position={[0, 4, 0]} intensity={1.0} color="#f59e0b" />

            {/* Render Selected 360° Architecture Model */}
            {activeModel === "aws-cloud" && (
              <AwsCloudModel
                rotationAngle={rotationAngle}
                explodedAmount={explodedAmount}
                materialMode={materialMode}
              />
            )}
            {activeModel === "k8s-cluster" && (
              <KubernetesModel
                rotationAngle={rotationAngle}
                explodedAmount={explodedAmount}
                materialMode={materialMode}
              />
            )}
            {activeModel === "terraform-iac" && (
              <TerraformModel
                rotationAngle={rotationAngle}
                explodedAmount={explodedAmount}
                materialMode={materialMode}
              />
            )}

            {/* Sparkle Field */}
            <Sparkles count={80} scale={8} size={2} color="#a855f7" />

            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              minDistance={3}
              maxDistance={15}
              autoRotate={autoRotate}
              autoRotateSpeed={autoSpeed * 1.5}
            />
          </Suspense>
        </Canvas>

        {/* 360° Angle HUD Overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1 rounded bg-slate-950/80 border border-purple-500/30 font-mono text-xs text-white backdrop-blur-md">
          <span>TURNTABLE ANGLE:</span>
          <span className="text-cyan-400 font-bold">{rotationAngle}°</span>
        </div>

        {/* Preset Angle Buttons */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 font-mono text-xs">
          <span className="text-[10px] text-slate-500 px-1 uppercase">Snap 360°:</span>
          {[0, 90, 180, 270].map((ang) => (
            <button
              key={ang}
              onClick={() => {
                sound.playClick();
                setRotationAngle(ang);
              }}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white"
            >
              {ang}°
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
        {/* 360° Spin Slider */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>360° Manual Rotation</span>
            </span>
            <span className="text-cyan-300 font-bold">{rotationAngle}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={rotationAngle}
            onChange={(e) => setRotationAngle(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Exploded Architecture View Slider */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Exploded Layer Offset</span>
            </span>
            <span className="text-purple-300 font-bold">{Math.round(explodedAmount * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={explodedAmount}
            onChange={(e) => setExplodedAmount(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>

        {/* Shader / Material & Turntable Toggle */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="text-slate-400 text-[10px] uppercase mb-1">Render Style</div>
            <div className="flex items-center gap-1">
              {(["solid", "wireframe", "hologram"] as MaterialMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    sound.playClick();
                    setMaterialMode(m);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] uppercase transition-colors ${
                    materialMode === m
                      ? "bg-purple-600 text-white font-bold"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px] uppercase mb-1">Turntable</div>
            <button
              onClick={() => {
                sound.playClick();
                setAutoRotate(!autoRotate);
              }}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                autoRotate
                  ? "bg-cyan-600 text-white font-bold"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {autoRotate ? "Active" : "Paused"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

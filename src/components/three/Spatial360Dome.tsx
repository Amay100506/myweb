"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { 
  RotateCw, 
  Compass, 
  Eye, 
  Maximize2, 
  Sparkles, 
  Layers, 
  Cloud, 
  ShieldCheck, 
  Server, 
  Terminal,
  Activity,
  Box,
  ChevronRight
} from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

// GLSL Fragment Shader for 360° Procedural Cyber Skybox
const celestialFragmentShader = `
uniform float uTime;
varying vec3 vWorldPosition;

// Simplex-style pseudo noise
float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}

void main() {
    vec3 dir = normalize(vWorldPosition);
    
    // Spherical coordinates
    float theta = atan(dir.z, dir.x); // -PI to PI
    float phi = asin(dir.y);          // -PI/2 to PI/2
    
    // Deep Space Cyber Gradient
    vec3 deepSpace = vec3(0.015, 0.015, 0.035);
    vec3 purpleNebula = vec3(0.35, 0.08, 0.55);
    vec3 cyanAurora = vec3(0.05, 0.45, 0.55);
    
    // Procedural Nebulae clusters
    float n1 = noise(dir * 3.0 + vec3(uTime * 0.03));
    float n2 = noise(dir * 6.0 - vec3(uTime * 0.02));
    float nebulaStrength = pow(n1 * n2, 1.8) * 2.2;
    
    vec3 color = deepSpace;
    color += mix(purpleNebula, cyanAurora, sin(theta * 2.0 + uTime * 0.1) * 0.5 + 0.5) * nebulaStrength;
    
    // Cyber Coordinate Grid Rings on the 360° sphere
    float latGrid = abs(fract(phi * 6.0 / 3.14159) - 0.5);
    float lonGrid = abs(fract(theta * 12.0 / 6.28318) - 0.5);
    float grid = smoothstep(0.48, 0.5, max(1.0 - latGrid * 20.0, 1.0 - lonGrid * 20.0));
    color += vec3(0.12, 0.08, 0.22) * grid * 0.35;
    
    // Starfield particles
    float starDensity = hash(floor(dir * 180.0));
    if (starDensity > 0.985) {
        float twinkle = sin(uTime * 4.0 + starDensity * 60.0) * 0.4 + 0.6;
        color += vec3(0.85, 0.9, 1.0) * twinkle;
    }
    
    // Horizon equator accent glow ring
    float equatorGlow = exp(-abs(dir.y) * 8.0);
    color += vec3(0.1, 0.5, 0.7) * equatorGlow * 0.25;

    gl_FragColor = vec4(color, 1.0);
}
`;

const celestialVertexShader = `
varying vec3 vWorldPosition;

void main() {
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function CelestialSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[45, 64, 48]} />
      <shaderMaterial
        vertexShader={celestialVertexShader}
        fragmentShader={celestialFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

interface SatelliteData {
  id: string;
  angle: number; // in degrees (0 to 360)
  title: string;
  category: string;
  color: string;
  iconName: string;
  details: string[];
  metrics: string;
}

const SPATIAL_SATELLITES: SatelliteData[] = [
  {
    id: "cloud-aws",
    angle: 0,
    title: "AWS Cloud Nexus",
    category: "Cloud Computing",
    color: "#f59e0b",
    iconName: "cloud",
    details: ["EC2 Compute Instances", "S3 Storage & Lifecycle", "IAM Least-Privilege Policies", "VPC Isolated Subnets"],
    metrics: "CLF-C02 Certified",
  },
  {
    id: "devops-k8s",
    angle: 60,
    title: "Kubernetes & EKS",
    category: "DevOps & Orchestration",
    color: "#3b82f6",
    iconName: "server",
    details: ["AWS EKS Cluster Workloads", "Multi-stage Docker Containers", "ReplicaSet Self-Healing", "LoadBalancer Ingress"],
    metrics: "High-Availability",
  },
  {
    id: "iac-terraform",
    angle: 120,
    title: "Terraform IaC",
    category: "Infrastructure as Code",
    color: "#a855f7",
    iconName: "box",
    details: ["HCL Declarative Definitions", "S3 Remote State Locks", "Automated Cloud Dispatch", "Zero Configuration Drift"],
    metrics: "Immutable Infra",
  },
  {
    id: "systems-linux",
    angle: 180,
    title: "Linux & Systems Core",
    category: "OS & Shell Scripting",
    color: "#10b981",
    iconName: "terminal",
    details: ["POSIX Shell Administration", "Bash Automation Scripts", "Python Boto3 Tooling", "Process Tree Governance"],
    metrics: "POSIX Compliant",
  },
  {
    id: "telemetry-observability",
    angle: 240,
    title: "Telemetry & Metrics",
    category: "Monitoring & Observability",
    color: "#06b6d4",
    iconName: "activity",
    details: ["AWS CloudWatch Alarms & Dashboards", "Prometheus Time-Series Scraper", "Latency Percentile Probes", "Proactive Alerting"],
    metrics: "Real-time Insight",
  },
  {
    id: "credential-verify",
    angle: 300,
    title: "AWS Certified Practitioner",
    category: "Verified Accreditation",
    color: "#ec4899",
    iconName: "shield",
    details: ["AWS Certified Cloud Practitioner", "CLF-C02 Verified Status", "DY Patil BCA (CGPA 8.0)", "KV Bareilly (88% / 81%)"],
    metrics: "Verified Credential",
  },
];

function SatelliteOrb({
  data,
  isSelected,
  onSelect,
}: {
  data: SatelliteData;
  isSelected: boolean;
  onSelect: (item: SatelliteData) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const rad = (data.angle * Math.PI) / 180;
  const radius = 8.5;
  const position: [number, number, number] = [
    Math.sin(rad) * radius,
    Math.sin(rad * 2) * 1.2,
    Math.cos(rad) * radius,
  ];

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5;
      ringRef.current.rotation.x += delta * 0.8;
    }
  });

  return (
    <group position={position} ref={meshRef}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Core Glowing Orb */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onSelect(data);
          }}
          onPointerOver={() => sound.playHover()}
        >
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={isSelected ? 1.4 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Gyro Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[0.85, 0.035, 16, 64]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>

        {/* 3D Floating Label */}
        <Html position={[0, -1.0, 0]} center distanceFactor={14}>
          <button
            onClick={() => {
              sound.playClick();
              onSelect(data);
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono whitespace-nowrap transition-all border shadow-lg ${
              isSelected
                ? "bg-slate-900 text-cyan-300 border-cyan-400 font-bold scale-110"
                : "bg-slate-950/80 text-slate-300 border-slate-700 hover:border-purple-400"
            }`}
          >
            {data.title}
          </button>
        </Html>
      </Float>
    </group>
  );
}

function OrbitControlsTracker({
  onAngleChange,
  controlsRef,
  autoRotate,
  autoRotateSpeed,
}: {
  onAngleChange: (angleDeg: number) => void;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  autoRotate: boolean;
  autoRotateSpeed: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    // Calculate azimuth angle around Y axis
    const angleRad = Math.atan2(camera.position.x, camera.position.z);
    let angleDeg = Math.round((angleRad * 180) / Math.PI);
    if (angleDeg < 0) angleDeg += 360;
    onAngleChange(angleDeg);
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={2}
      maxDistance={22}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      dampingFactor={0.05}
    />
  );
}

export function Spatial360Dome() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteData | null>(SPATIAL_SATELLITES[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(1.2);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const rotateToAngle = (targetDeg: number) => {
    sound.playClick();
    if (controlsRef.current) {
      const rad = (targetDeg * Math.PI) / 180;
      const distance = 11;
      const targetX = Math.sin(rad) * distance;
      const targetZ = Math.cos(rad) * distance;
      controlsRef.current.object.position.set(targetX, 2, targetZ);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-purple-500/30 bg-slate-950 shadow-2xl hud-corner">
      {/* 360° R3F Canvas */}
      <Canvas
        camera={{ position: [0, 2, 11], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 0, 0]} intensity={2.5} color="#c084fc" />

          {/* 360° Inverted Celestial Skybox */}
          <CelestialSphere />

          {/* Floating Spatial Satellites */}
          {SPATIAL_SATELLITES.map((sat) => (
            <SatelliteOrb
              key={sat.id}
              data={sat}
              isSelected={selectedSatellite?.id === sat.id}
              onSelect={(item) => setSelectedSatellite(item)}
            />
          ))}

          {/* Center Holographic Core Guide */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh>
              <octahedronGeometry args={[1.2, 0]} />
              <meshStandardMaterial
                color="#06b6d4"
                emissive="#06b6d4"
                emissiveIntensity={0.7}
                wireframe
              />
            </mesh>
          </Float>

          {/* Controls with 360° Tracking */}
          <OrbitControlsTracker
            onAngleChange={setCurrentAngle}
            controlsRef={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        </Suspense>
      </Canvas>

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-purple-500/40 backdrop-blur-md font-mono text-xs text-white">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>360° SPATIAL DOME // AZIMUTH:</span>
          <span className="text-cyan-300 font-bold">{currentAngle}°</span>
        </div>

        {/* Auto Rotate Control */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              sound.playClick();
              setAutoRotate(!autoRotate);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs backdrop-blur-md transition-all ${
              autoRotate
                ? "bg-purple-950/70 border-purple-500 text-purple-200"
                : "bg-slate-900/70 border-slate-700 text-slate-400 hover:text-white"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
            <span>360° Turntable: {autoRotate ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Cardinal 360° Quick-Snap Compass Buttons */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-purple-500/30 backdrop-blur-md font-mono text-xs">
        <span className="text-[10px] text-slate-500 px-2 uppercase">Snap:</span>
        {[
          { label: "0° N", angle: 0 },
          { label: "60° E", angle: 60 },
          { label: "120°", angle: 120 },
          { label: "180° S", angle: 180 },
          { label: "240° W", angle: 240 },
          { label: "300°", angle: 300 },
        ].map((pt) => (
          <button
            key={pt.label}
            onClick={() => rotateToAngle(pt.angle)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-cyan-950/50 hover:text-cyan-300 text-slate-300 border border-slate-800 transition-colors"
          >
            {pt.label}
          </button>
        ))}
      </div>

      {/* Selected Satellite Telemetry Drawer (Floating Overlay) */}
      {selectedSatellite && (
        <div className="absolute top-16 right-4 z-10 w-80 max-w-[calc(100vw-2rem)] p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md shadow-2xl font-sans text-xs hud-corner">
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-purple-500/20">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                {selectedSatellite.category}
              </span>
              <h4 className="text-base font-mono font-bold text-white mt-0.5">
                {selectedSatellite.title}
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700">
              {selectedSatellite.angle}° Vector
            </span>
          </div>

          <div className="py-2.5 space-y-1.5 text-slate-300">
            {selectedSatellite.details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-mono text-xs">▸</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">TELEMETRY:</span>
            <span className="text-emerald-400 font-bold">{selectedSatellite.metrics}</span>
          </div>
        </div>
      )}

      {/* Instruction Badge */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-400 pointer-events-none">
        <Eye className="w-3.5 h-3.5 text-cyan-400" />
        <span>Click & drag 360° to explore the universe</span>
      </div>
    </div>
  );
}

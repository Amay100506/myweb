"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { 
  RotateCw, 
  Compass, 
  Eye, 
  Award, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Cloud,
  Layers,
  Box,
  Terminal,
  Activity,
  Server,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { sound } from "@/lib/sound";

// GLSL Fragment Shader for 360° Procedural Cyber Skybox
const celestialFragmentShader = `
uniform float uTime;
varying vec3 vWorldPosition;

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

export interface SkillPoint {
  title: string;
  description: string;
}

export interface PlanetData {
  id: string;
  angle: number; // in degrees (0 to 360)
  shortName: string;
  title: string;
  category: string;
  color: string;
  emissiveColor: string;
  proficiency: string;
  mainPoints: [SkillPoint, SkillPoint, SkillPoint];
}

export const SPATIAL_PLANETS: PlanetData[] = [
  {
    id: "aws-cloud",
    angle: 0,
    shortName: "AWS Cloud",
    title: "Amazon Web Services (AWS)",
    category: "Cloud Infrastructure",
    color: "#f59e0b",
    emissiveColor: "#b45309",
    proficiency: "Core • 92%",
    mainPoints: [
      {
        title: "Compute & Storage Engineering",
        description:
          "Sizing and provisioning EC2 compute instances with custom AMIs, configuring EBS storage volumes, and managing S3 object buckets with lifecycle tiering, encryption, and bucket policies.",
      },
      {
        title: "Networking & VPC Isolation",
        description:
          "Designing isolated Virtual Private Clouds (VPC) with public/private subnets, Internet Gateways, NAT Gateways, route tables, and strict Security Group ingress/egress rules.",
      },
      {
        title: "Identity & Security Governance",
        description:
          "Enforcing least-privilege Identity and Access Management (IAM) policies, roles, cross-service trust relationships, and MFA access control across environments.",
      },
    ],
  },
  {
    id: "docker-containers",
    angle: 60,
    shortName: "Docker",
    title: "Docker Containerization",
    category: "DevOps & Containers",
    color: "#00d2ff",
    emissiveColor: "#0066cc",
    proficiency: "Core • 92%",
    mainPoints: [
      {
        title: "Multi-Stage Image Optimization",
        description:
          "Writing lean multi-stage Dockerfiles that strip build toolchains and compile artifacts to produce minimal, hardened production images with reduced vulnerabilities.",
      },
      {
        title: "Process Isolation & Security",
        description:
          "Leveraging Linux cgroups and namespaces for resource constraints, enforcing non-root container users, and managing environment variable security with .dockerignore.",
      },
      {
        title: "Docker Compose & Local Stacks",
        description:
          "Orchestrating multi-service application stacks, persistent volume bindings, and custom bridge network topologies for seamless local-to-production fidelity.",
      },
    ],
  },
  {
    id: "kubernetes-eks",
    angle: 120,
    shortName: "Kubernetes",
    title: "Kubernetes & AWS EKS",
    category: "Container Orchestration",
    color: "#3b82f6",
    emissiveColor: "#1d4ed8",
    proficiency: "Core • 86%",
    mainPoints: [
      {
        title: "Declarative Manifest Orchestration",
        description:
          "Authoring Kubernetes manifests declaring Pods, Deployments, ReplicaSets, and ConfigMaps with zero-downtime rolling updates and automated self-healing crash recovery.",
      },
      {
        title: "Service Discovery & Load Balancing",
        description:
          "Configuring ClusterIP and NodePort internal networking, paired with AWS LoadBalancer services and Ingress controllers for external traffic routing and SSL termination.",
      },
      {
        title: "AWS EKS Managed Clusters",
        description:
          "Deploying microservice clusters on Amazon Elastic Kubernetes Service (AWS EKS) across multiple Availability Zones with automated health probes and node scalability.",
      },
    ],
  },
  {
    id: "terraform-iac",
    angle: 180,
    shortName: "Terraform",
    title: "Terraform Infrastructure as Code",
    category: "IaC & Automation",
    color: "#a855f7",
    emissiveColor: "#6b21a8",
    proficiency: "Core • 88%",
    mainPoints: [
      {
        title: "Declarative HCL Provisioning",
        description:
          "Declaring reproducible cloud topologies (VPCs, EC2, IAM roles, RDS instances) using HashiCorp Configuration Language (HCL) with automated planning and execution.",
      },
      {
        title: "Remote State & Concurrency Locks",
        description:
          "Configuring remote S3 backends with DynamoDB state locking to ensure team integrity, auditable version histories, and prevention of concurrent deployment race conditions.",
      },
      {
        title: "Modular Infrastructure Architecture",
        description:
          "Authoring reusable, parameterized Terraform modules that eliminate manual clickOps errors and enable spinning up identical staging and production environments in minutes.",
      },
    ],
  },
  {
    id: "cicd-pipelines",
    angle: 240,
    shortName: "CI/CD",
    title: "CI/CD & Pipeline Automation",
    category: "Continuous Delivery",
    color: "#10b981",
    emissiveColor: "#047857",
    proficiency: "Core • 90%",
    mainPoints: [
      {
        title: "Automated Build & Test Loops",
        description:
          "Building automated GitHub Actions workflows triggered on branch merges, executing linters, security audits, and automated test runners before artifact compilation.",
      },
      {
        title: "Container Registry Publishing",
        description:
          "Automating multi-platform Docker container packaging, semantic version tagging, and secure push to container registries utilizing protected repository secrets.",
      },
      {
        title: "Zero-Downtime Deployment Automation",
        description:
          "Configuring continuous deployment runners with remote server SSH triggers, blue-green rolling restarts, and automated CloudWatch rollback health checks.",
      },
    ],
  },
  {
    id: "linux-systems",
    angle: 300,
    shortName: "Linux & Bash",
    title: "Linux Systems & Shell Scripting",
    category: "OS & Systems Engineering",
    color: "#ec4899",
    emissiveColor: "#be185d",
    proficiency: "Core • 92%",
    mainPoints: [
      {
        title: "POSIX Systems Administration",
        description:
          "Managing Linux process trees, systemd service units, cron daemon scheduling, user permission groups, and SSH cryptographic authentication on server instances.",
      },
      {
        title: "Bash Scripting & Stream Processing",
        description:
          "Writing automated maintenance scripts utilizing POSIX pipelines, sed, awk, grep, and logging wrappers to parse operational logs and automate server bootstrapping.",
      },
      {
        title: "Python Systems & Cloud Tooling",
        description:
          "Developing automated Python tooling using Boto3 AWS SDK for cloud resource inventory, metric scraping, and automated infrastructure maintenance tasks.",
      },
    ],
  },
];

// Planet Sphere with Rotating Gyro Ring & 3D Floating Label
function PlanetOrb({
  data,
  isSelected,
  onSelect,
}: {
  data: PlanetData;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const rad = (data.angle * Math.PI) / 180;
  const radius = 8.5;
  const position: [number, number, number] = [
    Math.sin(rad) * radius,
    Math.sin(rad * 2) * 1.1,
    Math.cos(rad) * radius,
  ];

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.4;
      ringRef.current.rotation.x += delta * 0.7;
    }
  });

  return (
    <group position={position} ref={meshRef}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Core Planet Sphere */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onSelect(data);
          }}
          onPointerOver={() => sound.playHover()}
        >
          <sphereGeometry args={[0.62, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.emissiveColor}
            emissiveIntensity={isSelected ? 1.6 : 0.8}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting Gyro Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[0.95, 0.035, 16, 64]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={0.9}
            wireframe
          />
        </mesh>

        {/* 3D Floating Label */}
        <Html position={[0, -1.15, 0]} center distanceFactor={14}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onSelect(data);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all border shadow-xl flex items-center gap-1.5 ${
              isSelected
                ? "bg-slate-900 text-cyan-300 border-cyan-400 font-bold scale-110 shadow-cyan-950/80"
                : "bg-slate-950/85 text-slate-200 border-slate-700 hover:border-cyan-400 hover:text-white"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: data.color }}
            />
            <span>{data.shortName}</span>
          </button>
        </Html>
      </Float>
    </group>
  );
}

// Center Stellar Structure: AWS Certified Cloud Practitioner
function CenterAWSCore({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.2;
      ring1Ref.current.rotation.y += delta * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 1.0;
      ring2Ref.current.rotation.y -= delta * 0.9;
    }
  });

  return (
    <group position={[0, 0, 0]} ref={coreRef}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        {/* Core Crystalline Polyhedron (Amber/Gold AWS Core) */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onSelect();
          }}
          onPointerOver={() => sound.playHover()}
        >
          <icosahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={isSelected ? 1.8 : 1.1}
            wireframe={false}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* Outer Orbiting Gyro Ring 1 (Gold) */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.85, 0.045, 16, 64]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={1.0}
            wireframe
          />
        </mesh>

        {/* Outer Orbiting Gyro Ring 2 (Cyan Accent) */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.1, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.9}
            wireframe
          />
        </mesh>

        {/* 3D Floating Center Label */}
        <Html position={[0, -2.0, 0]} center distanceFactor={14}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onSelect();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border shadow-2xl flex items-center gap-2 ${
              isSelected
                ? "bg-amber-950/90 text-amber-200 border-amber-400 font-bold scale-110 shadow-amber-950/80"
                : "bg-slate-950/90 text-amber-300 border-amber-500/50 hover:border-amber-400 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-bold">AWS Certified Cloud Practitioner</span>
            <span className="text-[10px] text-cyan-400 font-normal">[CLF-C02]</span>
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
      minDistance={2.5}
      maxDistance={22}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      dampingFactor={0.05}
    />
  );
}

export function Spatial360Dome() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(SPATIAL_PLANETS[0]);
  const [isCenterSelected, setIsCenterSelected] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(1.1);
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

  const handlePlanetSelect = (planet: PlanetData) => {
    setIsCenterSelected(false);
    setSelectedPlanet(planet);
    sound.playModalOpen();
  };

  const handleCenterSelect = () => {
    setSelectedPlanet(null);
    setIsCenterSelected(true);
    sound.playModalOpen();
  };

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-purple-500/30 bg-slate-950 shadow-2xl hud-corner">
      {/* 360° R3F Canvas */}
      <Canvas
        camera={{ position: [0, 2, 11], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        className="cursor-grab active:cursor-grabbing"
        onClick={() => {
          // Deselect overlay when clicking background space
          // setSelectedPlanet(null);
          // setIsCenterSelected(false);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <pointLight position={[0, 0, 0]} intensity={3.0} color="#f59e0b" />
          <pointLight position={[0, 8, 8]} intensity={1.5} color="#06b6d4" />

          {/* 360° Inverted Celestial Skybox */}
          <CelestialSphere />

          {/* 6 Orbiting Planetary Structures (AWS & DevOps Skills) */}
          {SPATIAL_PLANETS.map((planet) => (
            <PlanetOrb
              key={planet.id}
              data={planet}
              isSelected={selectedPlanet?.id === planet.id}
              onSelect={handlePlanetSelect}
            />
          ))}

          {/* Center Stellar Core: AWS Certified Cloud Practitioner */}
          <CenterAWSCore
            isSelected={isCenterSelected}
            onSelect={handleCenterSelect}
          />

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
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-purple-500/40 backdrop-blur-md font-mono text-xs text-white">
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
                ? "bg-purple-950/80 border-purple-500 text-purple-200"
                : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
            <span>360° Spin: {autoRotate ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Quick-Snap Planet Selector Buttons (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center gap-1.5 bg-slate-950/85 p-1.5 rounded-xl border border-purple-500/30 backdrop-blur-md font-mono text-xs">
        <span className="text-[10px] text-slate-500 px-2 uppercase">Planets:</span>
        {SPATIAL_PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => {
              rotateToAngle(planet.angle);
              handlePlanetSelect(planet);
            }}
            className={`px-2 py-1 rounded transition-colors text-[11px] ${
              selectedPlanet?.id === planet.id
                ? "bg-slate-800 text-cyan-300 border border-cyan-400 font-bold"
                : "bg-slate-900 hover:bg-cyan-950/50 hover:text-cyan-300 text-slate-300 border border-slate-800"
            }`}
          >
            {planet.shortName}
          </button>
        ))}
        <button
          onClick={handleCenterSelect}
          className={`px-2 py-1 rounded transition-colors text-[11px] ${
            isCenterSelected
              ? "bg-amber-950 text-amber-300 border border-amber-400 font-bold"
              : "bg-slate-900 hover:bg-amber-950/50 hover:text-amber-300 text-amber-400 border border-slate-800"
          }`}
        >
          AWS Core
        </button>
      </div>

      {/* Planet Technical Inspection Card: Exactly 3 Main Points What Amay Knows */}
      {selectedPlanet && (
        <div className="absolute top-16 right-4 z-20 w-88 max-w-[calc(100vw-2rem)] p-5 rounded-2xl bg-slate-950/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl font-sans text-xs hud-corner animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-purple-500/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: selectedPlanet.color }}
                />
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                  {selectedPlanet.category}
                </span>
              </div>
              <h4 className="text-lg font-mono font-bold text-white">
                {selectedPlanet.title}
              </h4>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedPlanet(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Main Technical Points Title */}
          <div className="pt-3 pb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block mb-2">
              What I Know & Experience (3 Key Pillars):
            </span>
          </div>

          {/* The 3 Main Points */}
          <div className="space-y-3">
            {selectedPlanet.mainPoints.map((pt, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors space-y-1"
              >
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-cyan-300">
                  <span className="text-purple-400">0{idx + 1}.</span>
                  <span>{pt.title}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Telemetry */}
          <div className="mt-4 pt-3 border-t border-purple-500/20 flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-400">PROFICIENCY:</span>
            <span className="text-emerald-400 font-bold">{selectedPlanet.proficiency}</span>
          </div>
        </div>
      )}

      {/* Center Structure AWS Certified Cloud Practitioner Card */}
      {isCenterSelected && (
        <div className="absolute top-16 right-4 z-20 w-88 max-w-[calc(100vw-2rem)] p-5 rounded-2xl bg-slate-950/95 border border-amber-500/50 backdrop-blur-xl shadow-2xl font-sans text-xs hud-corner animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-amber-500/20">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] font-mono uppercase text-amber-300 tracking-wider">
                  VERIFIED INDUSTRY ACCREDITATION
                </span>
              </div>
              <h4 className="text-lg font-mono font-bold text-white">
                AWS Certified Cloud Practitioner
              </h4>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setIsCenterSelected(false);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-2.5">
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
              <span className="text-[11px] font-mono text-amber-300 font-bold block">
                Exam Code: CLF-C02 // Amazon Web Services
              </span>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                Official industry credential validating comprehensive understanding of AWS global infrastructure, security governance, core compute/storage/network architectures, and billing ecosystems.
              </p>
            </div>

            <div className="space-y-1.5 text-[11px] font-sans text-slate-300">
              <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                Core Domains Validated:
              </span>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Cloud Concepts & AWS Global Infrastructure (AZs, Regions)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Security, Compliance, Least-Privilege IAM & Shared Responsibility</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Compute (EC2), Storage (S3), Networking (VPC), & Databases (RDS)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>CloudWatch Telemetry Monitoring, Pricing Models & Support</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between font-mono text-[11px]">
            <span className="text-emerald-400 font-bold">STATUS: ACTIVE & VERIFIED</span>
            <a
              href="https://aws.amazon.com/certification/certified-cloud-practitioner/"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-300 hover:text-cyan-200 underline flex items-center gap-1"
            >
              <span>Verify at AWS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Instruction Badge */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-400 pointer-events-none">
        <Eye className="w-3.5 h-3.5 text-cyan-400" />
        <span>Click planets or central core to inspect 3 key technical points</span>
      </div>
    </div>
  );
}

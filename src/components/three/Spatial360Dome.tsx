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
  Sparkles
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
    vec3 deepSpace = vec3(0.012, 0.012, 0.03);
    vec3 purpleNebula = vec3(0.35, 0.08, 0.55);
    vec3 cyanAurora = vec3(0.05, 0.45, 0.55);
    
    // Procedural Nebulae clusters (continuously drifting)
    float n1 = noise(dir * 3.0 + vec3(uTime * 0.04));
    float n2 = noise(dir * 6.0 - vec3(uTime * 0.025));
    float nebulaStrength = pow(n1 * n2, 1.8) * 2.4;
    
    vec3 color = deepSpace;
    color += mix(purpleNebula, cyanAurora, sin(theta * 2.0 + uTime * 0.12) * 0.5 + 0.5) * nebulaStrength;
    
    // Cyber Coordinate Grid Rings on the 360° sphere
    float latGrid = abs(fract(phi * 6.0 / 3.14159) - 0.5);
    float lonGrid = abs(fract((theta + uTime * 0.02) * 12.0 / 6.28318) - 0.5);
    float grid = smoothstep(0.48, 0.5, max(1.0 - latGrid * 20.0, 1.0 - lonGrid * 20.0));
    color += vec3(0.14, 0.08, 0.25) * grid * 0.4;
    
    // Starfield particles with twinkle
    float starDensity = hash(floor(dir * 180.0));
    if (starDensity > 0.982) {
        float twinkle = sin(uTime * 4.5 + starDensity * 60.0) * 0.45 + 0.55;
        color += vec3(0.9, 0.95, 1.0) * twinkle;
    }
    
    // Horizon equator accent glow ring
    float equatorGlow = exp(-abs(dir.y) * 8.0);
    color += vec3(0.12, 0.55, 0.75) * equatorGlow * 0.28;

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

// Continuously Rotating 360° Skybox Sphere
function CelestialSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Gentle continuous skybox drift
      meshRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[48, 64, 48]} />
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
  baseAngle: number; // in degrees (0 to 360)
  orbitSpeed: number; // orbital revolution rate
  orbitRadius: number; // distance from central AWS core
  shortName: string;
  title: string;
  category: string;
  color: string;
  emissiveColor: string;
  atmosphereColor: string;
  ringColor: string;
  customType: "aws" | "docker" | "kubernetes" | "terraform" | "cicd" | "linux";
  proficiency: string;
  mainPoints: [SkillPoint, SkillPoint, SkillPoint];
}

export const SPATIAL_PLANETS: PlanetData[] = [
  {
    id: "aws-cloud",
    baseAngle: 0,
    orbitSpeed: 0.12,
    orbitRadius: 8.6,
    shortName: "AWS Cloud",
    title: "Amazon Web Services (AWS)",
    category: "Cloud Infrastructure",
    color: "#f59e0b",
    emissiveColor: "#b45309",
    atmosphereColor: "#fbbf24",
    ringColor: "#f59e0b",
    customType: "aws",
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
    baseAngle: 60,
    orbitSpeed: 0.15,
    orbitRadius: 9.2,
    shortName: "Docker",
    title: "Docker Containerization",
    category: "DevOps & Containers",
    color: "#00d2ff",
    emissiveColor: "#0066cc",
    atmosphereColor: "#38bdf8",
    ringColor: "#00d2ff",
    customType: "docker",
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
    baseAngle: 120,
    orbitSpeed: 0.11,
    orbitRadius: 8.8,
    shortName: "Kubernetes",
    title: "Kubernetes & AWS EKS",
    category: "Container Orchestration",
    color: "#3b82f6",
    emissiveColor: "#1d4ed8",
    atmosphereColor: "#60a5fa",
    ringColor: "#3b82f6",
    customType: "kubernetes",
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
    baseAngle: 180,
    orbitSpeed: 0.14,
    orbitRadius: 9.4,
    shortName: "Terraform",
    title: "Terraform Infrastructure as Code",
    category: "IaC & Automation",
    color: "#a855f7",
    emissiveColor: "#6b21a8",
    atmosphereColor: "#c084fc",
    ringColor: "#a855f7",
    customType: "terraform",
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
    baseAngle: 240,
    orbitSpeed: 0.13,
    orbitRadius: 8.9,
    shortName: "CI/CD",
    title: "CI/CD & Pipeline Automation",
    category: "Continuous Delivery",
    color: "#10b981",
    emissiveColor: "#047857",
    atmosphereColor: "#34d399",
    ringColor: "#10b981",
    customType: "cicd",
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
    baseAngle: 300,
    orbitSpeed: 0.16,
    orbitRadius: 9.1,
    shortName: "Linux & Bash",
    title: "Linux Systems & Shell Scripting",
    category: "OS & Systems Engineering",
    color: "#ec4899",
    emissiveColor: "#be185d",
    atmosphereColor: "#f472b6",
    ringColor: "#ec4899",
    customType: "linux",
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

// Continuous Orbiting Planet Structure with Atmospheric Glow, Gyro Rings & Tech Artifacts
function DynamicPlanetOrb({
  data,
  isSelected,
  onSelect,
}: {
  data: PlanetData;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const planetBodyRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const satelliteGroupRef = useRef<THREE.Group>(null);

  // Animate physical revolution around central AWS star continuously
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    // Continuous orbital movement
    const currentAngle = (data.baseAngle * Math.PI) / 180 + elapsed * data.orbitSpeed;
    const x = Math.sin(currentAngle) * data.orbitRadius;
    const z = Math.cos(currentAngle) * data.orbitRadius;
    // Gentle sine oscillation in Y axis
    const y = Math.sin(currentAngle * 2 + elapsed * 0.5) * 1.25;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    // Spin planet body
    if (planetBodyRef.current) {
      planetBodyRef.current.rotation.y += 0.012;
    }

    // Pulse atmospheric glow corona
    if (atmosphereRef.current) {
      const pulse = 1 + Math.sin(elapsed * 2.5 + data.baseAngle) * 0.08;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }

    // Counter-rotate multi-tier planetary rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += 0.018;
      outerRingRef.current.rotation.x += 0.009;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= 0.024;
      innerRingRef.current.rotation.y += 0.012;
    }

    // Orbit micro-satellites around the planet
    if (satelliteGroupRef.current) {
      satelliteGroupRef.current.rotation.y += 0.035;
      satelliteGroupRef.current.rotation.x += 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.0} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Core Planet Solid Sphere with High-Spec Metallic / Emissive finish */}
        <mesh
          ref={planetBodyRef}
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onSelect(data);
          }}
          onPointerOver={() => sound.playHover()}
        >
          {data.customType === "terraform" ? (
            <octahedronGeometry args={[0.72, 2]} />
          ) : data.customType === "aws" ? (
            <icosahedronGeometry args={[0.7, 3]} />
          ) : (
            <sphereGeometry args={[0.68, 32, 32]} />
          )}
          <meshStandardMaterial
            color={data.color}
            emissive={data.emissiveColor}
            emissiveIntensity={isSelected ? 1.8 : 0.9}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* Outer Translucent Atmospheric Corona Shell */}
        <mesh ref={atmosphereRef} raycast={() => null}>
          <sphereGeometry args={[0.82, 32, 32]} />
          <meshStandardMaterial
            color={data.atmosphereColor}
            emissive={data.atmosphereColor}
            emissiveIntensity={isSelected ? 0.9 : 0.4}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            wireframe={data.customType === "linux"}
          />
        </mesh>

        {/* Primary Orbiting Saturn-style Gyro Ring */}
        <mesh ref={outerRingRef} raycast={() => null}>
          <torusGeometry args={[1.15, 0.04, 16, 64]} />
          <meshStandardMaterial
            color={data.ringColor}
            emissive={data.ringColor}
            emissiveIntensity={1.0}
            wireframe
          />
        </mesh>

        {/* Secondary Tilted Concentric Gyro Ring */}
        <mesh ref={innerRingRef} raycast={() => null} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.35, 0.025, 16, 64]} />
          <meshStandardMaterial
            color={data.atmosphereColor}
            emissive={data.atmosphereColor}
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>

        {/* Distinctive Micro-Satellites / Floating Tech Artifacts per planet */}
        <group ref={satelliteGroupRef}>
          {data.customType === "docker" && (
            // Orbiting Mini Container Cubes for Docker
            <>
              <mesh position={[1.4, 0.2, 0]}>
                <boxGeometry args={[0.2, 0.2, 0.2]} />
                <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} />
              </mesh>
              <mesh position={[-1.4, -0.2, 0]}>
                <boxGeometry args={[0.16, 0.16, 0.16]} />
                <meshStandardMaterial color="#00d2ff" emissive="#0369a1" emissiveIntensity={1.2} />
              </mesh>
            </>
          )}

          {data.customType === "kubernetes" && (
            // Orbiting Pod Micro-nodes for Kubernetes
            <>
              <mesh position={[1.45, 0, 0.4]}>
                <tetrahedronGeometry args={[0.18, 0]} />
                <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={1.4} />
              </mesh>
              <mesh position={[-0.8, 1.2, -0.4]}>
                <tetrahedronGeometry args={[0.18, 0]} />
                <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={1.4} />
              </mesh>
            </>
          )}

          {data.customType === "aws" && (
            // Orbiting Golden Satellites for AWS
            <mesh position={[0, 1.5, 0]}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial color="#fde047" emissive="#eab308" emissiveIntensity={1.6} />
            </mesh>
          )}

          {data.customType === "terraform" && (
            // Modular Scaffolding Cube for Terraform
            <mesh position={[1.35, -0.4, 0.3]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <boxGeometry args={[0.18, 0.18, 0.18]} />
              <meshStandardMaterial color="#d8b4fe" emissive="#9333ea" emissiveIntensity={1.3} wireframe />
            </mesh>
          )}

          {data.customType === "cicd" && (
            // Dual Energy Beacons for CI/CD
            <mesh position={[0, 1.4, 0]}>
              <octahedronGeometry args={[0.15, 0]} />
              <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={1.5} />
            </mesh>
          )}

          {data.customType === "linux" && (
            // Terminal Diamond for Linux
            <mesh position={[-1.3, 0.5, 0]}>
              <octahedronGeometry args={[0.16, 0]} />
              <meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={1.5} />
            </mesh>
          )}
        </group>

        {/* 3D Floating Interactive Planet Label */}
        <Html position={[0, -1.35, 0]} center distanceFactor={14}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onSelect(data);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all border shadow-2xl flex items-center gap-1.5 backdrop-blur-md ${
              isSelected
                ? "bg-slate-900 text-cyan-300 border-cyan-400 font-bold scale-110 shadow-cyan-950/90"
                : "bg-slate-950/90 text-slate-200 border-slate-700 hover:border-cyan-400 hover:text-white"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
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
// Glowing Golden Star with Multi-Axis Gyro Rings & Solar Corona
function CenterAWSCore({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) {
  const coreRef = useRef<THREE.Group>(null);
  const innerIcosaRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const solarCoronaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.45;
    }
    if (innerIcosaRef.current) {
      innerIcosaRef.current.rotation.x += delta * 0.7;
      innerIcosaRef.current.rotation.z += delta * 0.5;
    }
    // Solar Corona breathing flare
    if (solarCoronaRef.current) {
      const flare = 1 + Math.sin(elapsed * 3.5) * 0.08;
      solarCoronaRef.current.scale.set(flare, flare, flare);
    }
    // 3 Counter-rotating gyro rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.3;
      ring1Ref.current.rotation.y += delta * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 1.1;
      ring2Ref.current.rotation.x += delta * 0.9;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 1.5;
      ring3Ref.current.rotation.z += delta * 0.6;
    }
  });

  return (
    <group position={[0, 0, 0]} ref={coreRef}>
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.6}>
        {/* Core Crystalline Polyhedron (Amber/Gold AWS Central Star) */}
        <mesh
          ref={innerIcosaRef}
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onSelect();
          }}
          onPointerOver={() => sound.playHover()}
        >
          <icosahedronGeometry args={[1.45, 1]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#ea580c"
            emissiveIntensity={isSelected ? 2.2 : 1.3}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        {/* Radiant Solar Corona Flare Shell */}
        <mesh ref={solarCoronaRef} raycast={() => null}>
          <sphereGeometry args={[1.7, 32, 32]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={isSelected ? 1.4 : 0.8}
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            wireframe
          />
        </mesh>

        {/* Orbiting Gyro Ring 1 (Gold) */}
        <mesh ref={ring1Ref} raycast={() => null}>
          <torusGeometry args={[2.0, 0.045, 16, 64]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={1.2}
            wireframe
          />
        </mesh>

        {/* Orbiting Gyro Ring 2 (Electric Cyan Accent) */}
        <mesh ref={ring2Ref} raycast={() => null} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.038, 16, 64]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={1.1}
            wireframe
          />
        </mesh>

        {/* Orbiting Gyro Ring 3 (Platinum White Accent) */}
        <mesh ref={ring3Ref} raycast={() => null} rotation={[-Math.PI / 3, 0, Math.PI / 4]}>
          <torusGeometry args={[2.55, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#94a3b8"
            emissiveIntensity={0.9}
            wireframe
          />
        </mesh>

        {/* 3D Floating Center Label */}
        <Html position={[0, -2.2, 0]} center distanceFactor={14}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onSelect();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all border shadow-2xl flex items-center gap-2 backdrop-blur-md ${
              isSelected
                ? "bg-amber-950/95 text-amber-200 border-amber-400 font-bold scale-110 shadow-amber-950/90"
                : "bg-slate-950/90 text-amber-300 border-amber-500/50 hover:border-amber-400 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-bold">AWS Certified Cloud Practitioner</span>
            <span className="text-[10px] text-cyan-400 font-normal">[CLF-C02]</span>
          </button>
        </Html>
      </Float>
    </group>
  );
}

// Planetary Orbit Guide Rings on Equator Plane
function PlanetaryOrbitTracks() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
      {SPATIAL_PLANETS.map((planet) => (
        <mesh key={planet.id}>
          <torusGeometry args={[planet.orbitRadius, 0.015, 8, 128]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.16}
          />
        </mesh>
      ))}
    </group>
  );
}

// OrbitControls that continues continuous smooth azimuth tracking
function ContinuousOrbitTracker({
  onAngleChange,
  controlsRef,
  autoRotateSpeed,
}: {
  onAngleChange: (angleDeg: number) => void;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  autoRotateSpeed: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    // Keep continuous tracking of camera azimuth
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
      maxDistance={24}
      autoRotate={true} // ALWAYS keep moving continuously!
      autoRotateSpeed={autoRotateSpeed}
      dampingFactor={0.05}
    />
  );
}

export function Spatial360Dome() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(SPATIAL_PLANETS[0]);
  const [isCenterSelected, setIsCenterSelected] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.85); // continuous smooth drift
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const rotateToAngle = (targetDeg: number) => {
    sound.playClick();
    if (controlsRef.current) {
      const rad = (targetDeg * Math.PI) / 180;
      const distance = 11.5;
      const targetX = Math.sin(rad) * distance;
      const targetZ = Math.cos(rad) * distance;
      controlsRef.current.object.position.set(targetX, 2.2, targetZ);
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
      {/* 360° Continuous R3F Canvas */}
      <Canvas
        camera={{ position: [0, 2.5, 11.5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          {/* Dynamic Stellar Point Lights */}
          <pointLight position={[0, 0, 0]} intensity={3.5} color="#f59e0b" distance={30} />
          <pointLight position={[0, 9, 9]} intensity={1.8} color="#06b6d4" distance={35} />

          {/* 360° Continuously Rotating Skybox */}
          <CelestialSphere />

          {/* Glowing Planetary Orbital Guide Tracks */}
          <PlanetaryOrbitTracks />

          {/* 6 Constantly Revolving Planetary Structures */}
          {SPATIAL_PLANETS.map((planet) => (
            <DynamicPlanetOrb
              key={planet.id}
              data={planet}
              isSelected={selectedPlanet?.id === planet.id}
              onSelect={handlePlanetSelect}
            />
          ))}

          {/* Central Pulsating Golden Star: AWS Certified Cloud Practitioner */}
          <CenterAWSCore
            isSelected={isCenterSelected}
            onSelect={handleCenterSelect}
          />

          {/* Controls: Always Moving & Rotating continuously */}
          <ContinuousOrbitTracker
            onAngleChange={setCurrentAngle}
            controlsRef={controlsRef}
            autoRotateSpeed={rotationSpeed}
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

        {/* Orbit Speed Indicator & Active Motion Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 backdrop-blur-md font-mono text-xs text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CONTINUOUS MOTION: ACTIVE</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setRotationSpeed((prev) => (prev === 0.85 ? 1.6 : prev === 1.6 ? 0.4 : 0.85));
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-950/60 hover:bg-purple-900/60 font-mono text-xs text-purple-200 backdrop-blur-md transition-colors"
            title="Cycle orbital revolution speed"
          >
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
            <span>Speed: {rotationSpeed === 0.4 ? "Slow" : rotationSpeed === 1.6 ? "Fast" : "Normal"}</span>
          </button>
        </div>
      </div>

      {/* Quick-Snap Planet Selector Buttons (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center gap-1.5 bg-slate-950/85 p-1.5 rounded-xl border border-purple-500/30 backdrop-blur-md font-mono text-xs">
        <span className="text-[10px] text-slate-500 px-2 uppercase">Target:</span>
        {SPATIAL_PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => {
              rotateToAngle(planet.baseAngle);
              handlePlanetSelect(planet);
            }}
            className={`px-2 py-1 rounded transition-colors text-[11px] flex items-center gap-1 ${
              selectedPlanet?.id === planet.id
                ? "bg-slate-800 text-cyan-300 border border-cyan-400 font-bold"
                : "bg-slate-900 hover:bg-cyan-950/50 hover:text-cyan-300 text-slate-300 border border-slate-800"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: planet.color }} />
            <span>{planet.shortName}</span>
          </button>
        ))}
        <button
          onClick={handleCenterSelect}
          className={`px-2 py-1 rounded transition-colors text-[11px] flex items-center gap-1 ${
            isCenterSelected
              ? "bg-amber-950 text-amber-300 border border-amber-400 font-bold"
              : "bg-slate-900 hover:bg-amber-950/50 hover:text-amber-300 text-amber-400 border border-slate-800"
          }`}
        >
          <Award className="w-3 h-3 text-amber-400" />
          <span>AWS Core</span>
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
              What I Know & Hands-on Experience (3 Pillars):
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
        <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Continuous 360° motion • Drag to re-orient • Click planets to inspect</span>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { 
  Award, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Sparkles,
  Compass,
  RotateCw,
  Cpu,
  Brain
} from "lucide-react";
import { sound } from "@/lib/sound";

// ============================================================================
// GLSL PROCEDURAL SHADERS: DEEP SPACE NEBULA & SPIRAL GALAXY COSMOS
// ============================================================================

const cosmicFragmentShader = `
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
    
    // Deep Cosmic Space base
    vec3 deepSpace = vec3(0.008, 0.006, 0.022);
    vec3 richPurple = vec3(0.42, 0.06, 0.62);
    vec3 neonCyan = vec3(0.05, 0.55, 0.75);
    vec3 magentaGlow = vec3(0.65, 0.08, 0.45);
    
    // Multi-octave Cosmic Nebulae Clouds (matching photo's vibrant purple nebulae)
    float n1 = noise(dir * 2.8 + vec3(uTime * 0.03, uTime * 0.02, 0.0));
    float n2 = noise(dir * 5.6 - vec3(0.0, uTime * 0.025, uTime * 0.015));
    float nebula1 = pow(n1 * n2, 1.6) * 3.2;
    
    // Upper-right Spiral Galaxy Simulation
    vec3 galaxyCenter = normalize(vec3(0.7, 0.5, -0.5));
    float distToGalaxy = length(dir - galaxyCenter);
    float spiralAngle = atan(dir.y - galaxyCenter.y, dir.x - galaxyCenter.x) * 3.0;
    float spiralArm = sin(spiralAngle - distToGalaxy * 18.0 + uTime * 0.2) * 0.5 + 0.5;
    float galaxyCore = exp(-distToGalaxy * 4.5) * 1.8;
    float galaxyDisk = exp(-distToGalaxy * 2.8) * spiralArm * 1.2;
    vec3 galaxyColor = mix(vec3(0.8, 0.85, 1.0), magentaGlow, distToGalaxy * 1.5) * (galaxyCore + galaxyDisk);
    
    vec3 color = deepSpace;
    color += mix(richPurple, magentaGlow, sin(theta * 1.5 + uTime * 0.08) * 0.5 + 0.5) * nebula1;
    color += galaxyColor;
    
    // Starfield twinkle
    float starHash = hash(floor(dir * 240.0));
    if (starHash > 0.985) {
        float twinkle = sin(uTime * 5.0 + starHash * 100.0) * 0.45 + 0.55;
        vec3 starTint = mix(vec3(0.9, 0.95, 1.0), vec3(1.0, 0.75, 0.4), hash(floor(dir * 120.0)));
        color += starTint * twinkle * 1.6;
    }
    
    // Subtle horizon cyber ring glow
    float equatorRing = exp(-abs(dir.y) * 9.0);
    color += neonCyan * equatorRing * 0.22;

    gl_FragColor = vec4(color, 1.0);
}
`;

const cosmicVertexShader = `
varying vec3 vWorldPosition;

void main() {
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function DeepCosmicSphere({ isRotating }: { isRotating: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state, delta) => {
    if (isRotating) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.012;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[52, 64, 48]} />
      <shaderMaterial
        vertexShader={cosmicVertexShader}
        fragmentShader={cosmicFragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ============================================================================
// HOLOGRAPHIC GOLDEN EARTH SHADER (Matching the photo's luminous golden globe)
// ============================================================================

const earthFragmentShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

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
    vec3 norm = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    
    // Longitude / latitude coordinates for Earth landmasses
    float lon = atan(norm.z, norm.x);
    float lat = asin(norm.y);
    
    // Multi-octave continent silhouette noise
    vec3 p = norm * 3.2;
    float land = noise(p) + noise(p * 2.2) * 0.5 + noise(p * 4.4) * 0.25;
    float isLand = smoothstep(0.88, 1.05, land);
    
    // Luminous Golden City Light filaments on continents
    float cityNoise = noise(norm * 18.0) * noise(norm * 36.0);
    float cityLights = pow(smoothstep(0.35, 0.75, cityNoise), 2.2) * isLand;
    
    // Deep oceanic space
    vec3 oceanColor = vec3(0.04, 0.05, 0.12);
    vec3 landGold = vec3(0.95, 0.72, 0.25);
    vec3 coreAmber = vec3(1.0, 0.55, 0.12);
    vec3 cityBright = vec3(1.0, 0.92, 0.65);
    
    vec3 baseColor = mix(oceanColor, landGold, isLand * 0.85);
    baseColor += cityBright * cityLights * 2.4;
    
    // Intense Golden Atmospheric Fresnel rim glow
    float fresnel = pow(1.0 - max(dot(viewDir, norm), 0.0), 2.8);
    vec3 atmosphereGlow = mix(coreAmber, vec3(1.0, 0.85, 0.4), fresnel);
    
    // Internal fiery core pulse
    float corePulse = sin(uTime * 2.0) * 0.15 + 0.85;
    
    vec3 finalColor = baseColor + atmosphereGlow * fresnel * 2.5 * corePulse;
    gl_FragColor = vec4(finalColor, 0.95);
}
`;

const earthVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// ============================================================================
// DATA MODELS FOR THE 6 AWS & DEVOPS SKILL ORBS
// ============================================================================

export interface SkillPoint {
  title: string;
  description: string;
}

export interface PlanetData {
  id: string;
  baseAngle: number; // degrees
  orbitSpeed: number;
  orbitRadius: number;
  shortName: string;
  title: string;
  category: string;
  color: string;
  emissiveColor: string;
  atmosphereColor: string;
  ringColor: string;
  customType: "docker" | "kubernetes" | "terraform" | "cicd" | "linux" | "aws";
  proficiency: string;
  mainPoints: [SkillPoint, SkillPoint, SkillPoint];
}

export const SPATIAL_PLANETS: PlanetData[] = [
  {
    id: "kubernetes-eks",
    baseAngle: 135, // Front Left (prominent in photo)
    orbitSpeed: 0.12,
    orbitRadius: 5.6,
    shortName: "Kubernetes",
    title: "Kubernetes & AWS EKS",
    category: "Container Orchestration",
    color: "#2563eb",
    emissiveColor: "#1d4ed8",
    atmosphereColor: "#60a5fa",
    ringColor: "#00d2ff",
    customType: "kubernetes",
    proficiency: "Core • 94%",
    mainPoints: [
      {
        title: "Declarative Cluster Deployment",
        description:
          "Authoring production-grade Kubernetes YAML manifests declaring Deployments, StatefulSets, ConfigMaps, and Secrets with zero-downtime rolling updates and self-healing pods.",
      },
      {
        title: "Service Discovery & Ingress Topologies",
        description:
          "Configuring ClusterIP internal networks, AWS ALB / NLB LoadBalancer controllers, and NGINX Ingress rules with SSL termination and path routing.",
      },
      {
        title: "AWS EKS Multi-AZ Production Infrastructure",
        description:
          "Deploying and orchestrating microservices on Amazon Elastic Kubernetes Service (EKS) across Availability Zones with automated health probes and node autoscaling.",
      },
    ],
  },
  {
    id: "docker-containers",
    baseAngle: 195, // Mid Left (prominent blue cube in photo)
    orbitSpeed: 0.14,
    orbitRadius: 7.2,
    shortName: "Docker",
    title: "Docker Containerization",
    category: "DevOps & Containers",
    color: "#00d2ff",
    emissiveColor: "#0284c7",
    atmosphereColor: "#38bdf8",
    ringColor: "#00d2ff",
    customType: "docker",
    proficiency: "Core • 92%",
    mainPoints: [
      {
        title: "Multi-Stage Minimal Build Pipelines",
        description:
          "Crafting lightweight multi-stage Dockerfiles stripping compiler toolchains to generate ultra-secure, hardened production images with reduced attack vectors.",
      },
      {
        title: "Process Isolation & Linux Kernel Namespaces",
        description:
          "Leveraging cgroups and non-root user execution inside containers for robust memory/CPU confinement and environment variable security with .dockerignore.",
      },
      {
        title: "Docker Compose Distributed Stacks",
        description:
          "Orchestrating multi-container database, caching, and API environments locally with custom bridge networks matching production cloud topology.",
      },
    ],
  },
  {
    id: "terraform-iac",
    baseAngle: 45, // Front Right (purple orb in photo)
    orbitSpeed: 0.13,
    orbitRadius: 5.8,
    shortName: "Terraform",
    title: "Terraform Infrastructure as Code",
    category: "IaC & Cloud Automation",
    color: "#9333ea",
    emissiveColor: "#7e22ce",
    atmosphereColor: "#c084fc",
    ringColor: "#c084fc",
    customType: "terraform",
    proficiency: "Core • 90%",
    mainPoints: [
      {
        title: "Declarative HCL Cloud Provisioning",
        description:
          "Writing HashiCorp Configuration Language (HCL) blueprints to declaratively provision AWS VPCs, subnets, EC2 instances, and RDS databases with deterministic plan/apply cycles.",
      },
      {
        title: "Remote S3 State & DynamoDB Locks",
        description:
          "Architecting remote state storage in encrypted S3 buckets with DynamoDB mutex locks to prevent race conditions and maintain full change audits.",
      },
      {
        title: "Modular Multi-Environment Stacks",
        description:
          "Designing parameterized reusable modules that enable instant zero-drift replication across development, staging, and production environments.",
      },
    ],
  },
  {
    id: "cicd-pipelines",
    baseAngle: 335, // Mid Right (emerald green infinity in photo)
    orbitSpeed: 0.15,
    orbitRadius: 7.4,
    shortName: "CI/CD",
    title: "CI/CD & Automated Delivery",
    category: "Continuous Delivery",
    color: "#10b981",
    emissiveColor: "#059669",
    atmosphereColor: "#34d399",
    ringColor: "#10b981",
    customType: "cicd",
    proficiency: "Core • 91%",
    mainPoints: [
      {
        title: "GitHub Actions Workflow Automation",
        description:
          "Building automated GitHub Actions YAML workflows triggering automated linting, security scanning, and unit test suites on every pull request.",
      },
      {
        title: "Automated Container Image Publishing",
        description:
          "Automating Docker container builds, semantic version tagging, and automated publishing to AWS ECR and Docker Hub using encrypted repository secrets.",
      },
      {
        title: "Zero-Downtime Rollout Pipelines",
        description:
          "Automating remote SSH dispatch triggers, blue-green deployment switches, and automated health checks with instant rollback capabilities.",
      },
    ],
  },
  {
    id: "linux-systems",
    baseAngle: 285, // Top Right / Center (pink/red orb with Tux in photo)
    orbitSpeed: 0.16,
    orbitRadius: 6.8,
    shortName: "Linux & Bash",
    title: "Linux Systems & Shell Scripting",
    category: "OS & Systems Engineering",
    color: "#f43f5e",
    emissiveColor: "#e11d48",
    atmosphereColor: "#fb7185",
    ringColor: "#fb7185",
    customType: "linux",
    proficiency: "Core • 93%",
    mainPoints: [
      {
        title: "POSIX Shell Automation & Scripting",
        description:
          "Writing robust Bash scripts for automated log rotation, health checks, cron schedules, backups, and network diagnostic reporting.",
      },
      {
        title: "System Administration & Service Control",
        description:
          "Managing systemd daemons, journalctl diagnostics, memory swap tuning, file permissions, and process supervision on Ubuntu and Amazon Linux.",
      },
      {
        title: "Network Protocols & Hardened Security",
        description:
          "Configuring iptables/UFW firewalls, SSH keypair hardening, DNS resolution, and TCP/IP port monitoring using netstat, curl, and dig.",
      },
    ],
  },
  {
    id: "aws-cloud",
    baseAngle: 240, // Top Left (golden orb in background of photo)
    orbitSpeed: 0.11,
    orbitRadius: 7.0,
    shortName: "AWS Cloud",
    title: "Amazon Web Services (AWS)",
    category: "Cloud Infrastructure",
    color: "#f59e0b",
    emissiveColor: "#d97706",
    atmosphereColor: "#fbbf24",
    ringColor: "#f59e0b",
    customType: "aws",
    proficiency: "Core • 92%",
    mainPoints: [
      {
        title: "Compute & Storage Architecture",
        description:
          "Configuring scalable EC2 instances, EBS volumes, and multi-tier S3 buckets with encryption, access policies, and automated lifecycle rules.",
      },
      {
        title: "Isolated Virtual Private Clouds (VPC)",
        description:
          "Designing multi-AZ VPC topologies with public and private subnets, Internet Gateways, NAT Gateways, route tables, and strict Security Groups.",
      },
      {
        title: "Identity & Access Governance (IAM)",
        description:
          "Enforcing least-privilege IAM policies, instance profile roles, service-linked permissions, and audit trails using AWS CloudTrail.",
      },
    ],
  },
];

// ============================================================================
// 3D 1:1 EMBLEMS INSIDE EACH PLANET ORB (Matches photo exactly)
// ============================================================================

function KubernetesEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * 0.4;
  });

  return (
    <group ref={groupRef} scale={0.75}>
      {/* Central Wheel Hub */}
      <mesh>
        <torusGeometry args={[0.22, 0.05, 16, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#00d2ff" emissiveIntensity={2.0} />
      </mesh>
      {/* Outer Rim */}
      <mesh>
        <torusGeometry args={[0.62, 0.045, 16, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={1.8} />
      </mesh>
      {/* 7 Radial Spokes with Outer Handle Pegs */}
      {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
        const rad = (idx * 2 * Math.PI) / 7;
        return (
          <group key={idx} rotation={[0, 0, rad]}>
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.65, 12]} />
              <meshStandardMaterial color="#ffffff" emissive="#00d2ff" emissiveIntensity={1.6} />
            </mesh>
            <mesh position={[0, 0.72, 0]}>
              <cylinderGeometry args={[0.045, 0.02, 0.18, 12]} />
              <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={2.0} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function DockerEmblem() {
  const cubeRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.35;
      cubeRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={cubeRef} scale={0.65}>
      {/* Glowing 3D Container Cube */}
      <mesh>
        <boxGeometry args={[0.75, 0.75, 0.75]} />
        <meshStandardMaterial
          color="#0066cc"
          emissive="#00d2ff"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Outer Neon Wireframe Grid */}
      <mesh>
        <boxGeometry args={[0.82, 0.82, 0.82]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={2.5}
          wireframe
        />
      </mesh>
    </group>
  );
}

function TerraformEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.45;
  });

  return (
    <group ref={groupRef} scale={0.65}>
      {/* Left isometric block */}
      <mesh position={[-0.28, 0.18, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.26, 0.55, 0.18]} />
        <meshStandardMaterial color="#c084fc" emissive="#9333ea" emissiveIntensity={2.2} />
      </mesh>
      {/* Center top block */}
      <mesh position={[0.05, 0.38, 0]}>
        <boxGeometry args={[0.26, 0.26, 0.18]} />
        <meshStandardMaterial color="#ffffff" emissive="#c084fc" emissiveIntensity={2.5} />
      </mesh>
      {/* Center bottom block */}
      <mesh position={[0.05, -0.05, 0]}>
        <boxGeometry args={[0.26, 0.45, 0.18]} />
        <meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={2.0} />
      </mesh>
      {/* Right block */}
      <mesh position={[0.38, 0.18, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.26, 0.55, 0.18]} />
        <meshStandardMaterial color="#e9d5ff" emissive="#9333ea" emissiveIntensity={2.2} />
      </mesh>
    </group>
  );
}

function CicdEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * 0.5;
  });

  return (
    <group ref={groupRef} scale={0.7}>
      {/* Double-Torus Infinity Loop (∞) */}
      <mesh position={[-0.32, 0, 0]} rotation={[0, Math.PI / 8, 0]}>
        <torusGeometry args={[0.35, 0.09, 16, 32]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={2.4} />
      </mesh>
      <mesh position={[0.32, 0, 0]} rotation={[0, -Math.PI / 8, 0]}>
        <torusGeometry args={[0.35, 0.09, 16, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#10b981" emissiveIntensity={2.4} />
      </mesh>
    </group>
  );
}

function LinuxEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Penguin Body (Tux shape) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      {/* White Belly */}
      <mesh position={[0, -0.05, 0.22]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.6} />
      </mesh>
      {/* Golden Yellow Beak */}
      <mesh position={[0, 0.18, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.11, 0.24, 16]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={2.0} />
      </mesh>
      {/* Glowing Pink Eyes */}
      <mesh position={[-0.12, 0.25, 0.32]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#fb7185" emissive="#f43f5e" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[0.12, 0.25, 0.32]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#fb7185" emissive="#f43f5e" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

function AwsEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={groupRef} scale={0.75}>
      {/* Glowing Golden Solar Cloud Clusters */}
      <mesh position={[-0.25, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2.2} />
      </mesh>
      <mesh position={[0.25, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2.2} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#f59e0b" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

// ============================================================================
// INDIVIDUAL CELESTIAL SKILL POD WITH NEON SAUCER PEDESTAL
// ============================================================================

interface DynamicPlanetOrbProps {
  data: PlanetData;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
  isRotating: boolean;
}

function DynamicPlanetOrb({ data, isSelected, onSelect, isRotating }: DynamicPlanetOrbProps) {
  const podRef = useRef<THREE.Group>(null);
  const angleRef = useRef((data.baseAngle * Math.PI) / 180);

  useFrame((_, delta) => {
    if (isRotating) {
      angleRef.current += delta * data.orbitSpeed * 0.7;
    }
    if (podRef.current) {
      // Elliptical planar orbit matching the photo's perspective
      const x = Math.sin(angleRef.current) * data.orbitRadius * 1.25;
      const z = Math.cos(angleRef.current) * data.orbitRadius * 0.72;
      const y = Math.sin(angleRef.current * 2.0) * 0.15;
      podRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={podRef}>
      {/* Neon Cyber Saucer Pedestal Platform (Matching the glowing pedestals in the photo) */}
      <group position={[0, -0.65, 0]}>
        {/* Flat Cybernetic Base Disc */}
        <mesh raycast={() => null}>
          <cylinderGeometry args={[1.2, 1.35, 0.08, 32]} />
          <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Outer Glowing Neon Rim Ring */}
        <mesh raycast={() => null} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.3, 0.038, 16, 48]} />
          <meshStandardMaterial
            color={data.ringColor}
            emissive={data.ringColor}
            emissiveIntensity={isSelected ? 3.0 : 2.2}
          />
        </mesh>
        {/* Inner Tiered Neon Accent Ring */}
        <mesh raycast={() => null} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.95, 0.03, 16, 48]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={data.ringColor}
            emissiveIntensity={isSelected ? 2.5 : 1.6}
          />
        </mesh>
      </group>

      {/* Translucent Glowing Glass Sphere */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          sound.playClick();
          onSelect(data);
        }}
        onPointerOver={() => sound.playHover()}
      >
        <sphereGeometry args={[0.92, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissiveColor}
          emissiveIntensity={isSelected ? 1.5 : 0.8}
          transparent
          opacity={0.38}
          roughness={0.12}
          metalness={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Internal 3D Skill Tech Emblem */}
      <group position={[0, 0, 0]}>
        {data.customType === "kubernetes" && <KubernetesEmblem />}
        {data.customType === "docker" && <DockerEmblem />}
        {data.customType === "terraform" && <TerraformEmblem />}
        {data.customType === "cicd" && <CicdEmblem />}
        {data.customType === "linux" && <LinuxEmblem />}
        {data.customType === "aws" && <AwsEmblem />}
      </group>

      {/* 3D Floating Cyber Capsule Label (Directly below saucer) */}
      <Html position={[0, -0.95, 0]} center distanceFactor={14}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onSelect(data);
          }}
          className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all border shadow-2xl flex items-center gap-1.5 backdrop-blur-md ${
            isSelected
              ? "bg-slate-900/95 text-white scale-110 shadow-lg"
              : "bg-slate-950/90 text-slate-200 hover:text-white hover:scale-105"
          }`}
          style={{
            borderColor: isSelected ? "#ffffff" : data.ringColor,
            boxShadow: `0 0 15px ${data.ringColor}55`,
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: data.ringColor }}
          />
          <span>{data.shortName}</span>
        </button>
      </Html>
    </group>
  );
}

// ============================================================================
// CENTRAL CELESTIAL CORE: HOLOGRAPHIC GOLDEN EARTH + DUAL GYROSCOPIC RINGS
// ============================================================================

interface CenterAWSCoreProps {
  isSelected: boolean;
  onSelect: () => void;
  isRotating: boolean;
}

function CenterAWSCore({ isSelected, onSelect, isRotating }: CenterAWSCoreProps) {
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (isRotating) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      if (earthMeshRef.current) {
        earthMeshRef.current.rotation.y += delta * 0.25;
      }
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z += delta * 0.35;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.z -= delta * 0.28;
      }
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      {/* Futuristic Concentric Base Projector Disc */}
      <group position={[0, -1.9, 0]}>
        <mesh raycast={() => null}>
          <cylinderGeometry args={[2.6, 2.85, 0.08, 64]} />
          <meshStandardMaterial color="#050811" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh raycast={() => null} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.7, 0.035, 16, 64]} />
          <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={2.5} />
        </mesh>
        <mesh raycast={() => null} position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.03, 16, 64]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* Holographic Luminous Golden Earth Globe */}
      <mesh
        ref={earthMeshRef}
        onClick={(e) => {
          e.stopPropagation();
          sound.playClick();
          onSelect();
        }}
        onPointerOver={() => sound.playHover()}
      >
        <sphereGeometry args={[1.85, 64, 64]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>

      {/* Primary Tilted Massive Golden Gyroscopic Ring (Clockwise) */}
      <mesh
        ref={ring1Ref}
        raycast={() => null}
        rotation={[0.78, 0.38, 0.25]}
      >
        <torusGeometry args={[2.65, 0.065, 16, 96]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={isSelected ? 2.5 : 1.6}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Secondary Tilted Massive Golden Gyroscopic Ring (Counter-Clockwise) */}
      <mesh
        ref={ring2Ref}
        raycast={() => null}
        rotation={[-0.72, -0.42, -0.22]}
      >
        <torusGeometry args={[3.05, 0.055, 16, 96]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#b45309"
          emissiveIntensity={isSelected ? 2.2 : 1.4}
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Luminous Central Pill Banner: AWS Certified Cloud Practitioner [CLF-C02] */}
      <Html position={[0, -0.15, 2.75]} center distanceFactor={11}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            onSelect();
          }}
          className={`group px-5 py-2.5 rounded-full border-2 transition-all flex items-center gap-2.5 shadow-[0_0_35px_rgba(245,158,11,0.5)] backdrop-blur-xl ${
            isSelected
              ? "bg-amber-950/95 border-amber-300 text-amber-200 scale-105 shadow-[0_0_55px_rgba(245,158,11,0.8)]"
              : "bg-slate-950/90 border-amber-500/80 hover:border-amber-400 text-amber-300"
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
            <Award className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold whitespace-nowrap">
            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
              AWS Certified Cloud Practitioner
            </span>
            <span className="text-cyan-400 font-semibold text-[11px] px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40">
              [CLF-C02]
            </span>
          </div>
        </button>
      </Html>
    </group>
  );
}

// ============================================================================
// CONCENTRIC PLANETARY ORBIT TRACKS
// ============================================================================

function PlanetaryOrbitTracks() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
      {[5.6, 6.8, 7.4, 8.2].map((r, idx) => (
        <mesh key={idx}>
          <torusGeometry args={[r, 0.014, 8, 128]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.22 - idx * 0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// FLOATING LOW-POLY ROCKY ASTEROIDS (Matching the photo's floating asteroids)
// ============================================================================

function FloatingAsteroids({ isRotating }: { isRotating: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const asteroids = useMemo(() => {
    return [
      { pos: [-8.5, -2.2, 4.0], size: 0.75, rot: [0.2, 0.3, 0.1] },
      { pos: [-9.8, 1.5, -3.0], size: 0.55, rot: [0.1, -0.2, 0.3] },
      { pos: [-4.2, -3.2, 5.5], size: 0.65, rot: [-0.3, 0.4, -0.1] },
      { pos: [8.8, -2.5, 3.8], size: 0.8, rot: [0.3, 0.1, -0.2] },
      { pos: [9.5, 2.0, -4.5], size: 0.6, rot: [-0.2, 0.3, 0.1] },
      { pos: [5.2, -3.5, 6.2], size: 0.5, rot: [0.4, -0.1, 0.2] },
    ];
  }, []);

  useFrame((_, delta) => {
    if (isRotating && groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += delta * 0.2 * (i % 2 === 0 ? 1 : -1);
        child.rotation.y += delta * 0.25;
      });
    }
  });

  return (
    <group ref={groupRef} raycast={() => null}>
      {asteroids.map((ast, i) => (
        <mesh key={i} position={ast.pos as [number, number, number]}>
          <dodecahedronGeometry args={[ast.size, 1]} />
          <meshStandardMaterial
            color="#2a2430"
            roughness={0.9}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// CONTINUOUS ORBIT TRACKER (Continuous camera azimuth drift)
// ============================================================================

function ContinuousOrbitTracker({
  onAngleChange,
  controlsRef,
  isRotating,
}: {
  onAngleChange: (angle: number) => void;
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  isRotating: boolean;
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
      minDistance={3.5}
      maxDistance={22}
      autoRotate={isRotating}
      autoRotateSpeed={0.8}
      dampingFactor={0.05}
    />
  );
}

// ============================================================================
// MAIN COMPONENT: SPATIAL 360 DOME (1:1 with uploaded reference photo)
// ============================================================================

export function Spatial360Dome() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(SPATIAL_PLANETS[0]);
  const [isCenterSelected, setIsCenterSelected] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const toggleRotation = () => {
    sound.playClick();
    setIsRotating((prev) => !prev);
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
    <div className="relative w-full h-[640px] sm:h-[680px] rounded-3xl overflow-hidden border border-purple-500/30 bg-[#04040a] shadow-2xl hud-corner">
      {/* 360° Three.js & R3F Canvas */}
      <Canvas
        camera={{ position: [0, 3.2, 10.8], fov: 48 }}
        gl={{ antialias: true, alpha: false }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          {/* Luminous Central Stellar Lights */}
          <pointLight position={[0, 0.4, 0]} intensity={4.2} color="#f59e0b" distance={30} />
          <pointLight position={[0, 8, 8]} intensity={2.2} color="#00d2ff" distance={35} />
          <pointLight position={[-8, 4, -4]} intensity={1.8} color="#9333ea" distance={30} />

          {/* Deep Space Cosmic Skybox with Nebulae & Galaxy */}
          <DeepCosmicSphere isRotating={isRotating} />

          {/* Floating Rocky Asteroids */}
          <FloatingAsteroids isRotating={isRotating} />

          {/* Glowing Planetary Orbital Guide Tracks */}
          <PlanetaryOrbitTracks />

          {/* 6 Revolving Celestial Skill Orbs with Neon Saucer Pedestals */}
          {SPATIAL_PLANETS.map((planet) => (
            <DynamicPlanetOrb
              key={planet.id}
              data={planet}
              isSelected={selectedPlanet?.id === planet.id}
              onSelect={handlePlanetSelect}
              isRotating={isRotating}
            />
          ))}

          {/* Central Luminous Golden Earth & Gyroscopic Rings */}
          <CenterAWSCore
            isSelected={isCenterSelected}
            onSelect={handleCenterSelect}
            isRotating={isRotating}
          />

          {/* Orbit Controls with Continuous Auto-Rotation */}
          <ContinuousOrbitTracker
            onAngleChange={setCurrentAngle}
            controlsRef={controlsRef}
            isRotating={isRotating}
          />
        </Suspense>
      </Canvas>

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-purple-500/40 backdrop-blur-md font-mono text-xs text-white">
          <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span>360° SPATIAL DOME // AZIMUTH:</span>
          <span className="text-cyan-300 font-bold">{currentAngle}°</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 backdrop-blur-md font-mono text-xs text-emerald-300">
            <span
              className={`w-2 h-2 rounded-full ${
                isRotating ? "bg-emerald-400 animate-ping" : "bg-slate-500"
              }`}
            />
            <span>{isRotating ? "MOTION: ORBITING" : "MOTION: PAUSED"}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM CENTER: GLOWING RED "■ STOP" / "▶ ROTATE" BUTTON (Matching Photo Exactly) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={toggleRotation}
          className="px-8 py-2.5 rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white font-mono text-sm font-bold shadow-[0_0_30px_rgba(239,68,68,0.65)] hover:shadow-[0_0_45px_rgba(239,68,68,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border border-red-300/60 backdrop-blur-md"
          title={isRotating ? "Pause 360° orbital motion" : "Resume continuous 360° orbital motion"}
        >
          {isRotating ? (
            <>
              <span className="w-3.5 h-3.5 bg-white rounded-[3px] inline-block shadow-sm" />
              <span className="tracking-wide">Stop</span>
            </>
          ) : (
            <>
              <RotateCw className="w-4 h-4 text-white animate-spin" />
              <span className="tracking-wide">Rotate</span>
            </>
          )}
        </button>
      </div>

      {/* BOTTOM RIGHT: SLEEK "AMAY AI DIGITAL TWIN v2.5" BADGE (Matching Photo Exactly) */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/90 border border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.4)] backdrop-blur-md">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
        <div className="font-mono text-left leading-tight">
          <div className="text-xs font-extrabold text-white tracking-wider">AMAY AI</div>
          <div className="text-[10px] font-semibold text-purple-400 -mt-0.5">DIGITAL TWIN v2.5</div>
        </div>
        <div className="ml-1 text-cyan-400">
          <Brain className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
        </div>
      </div>

      {/* QUICK PLANET SELECTOR TARGETS (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-20 hidden lg:flex items-center gap-1.5 bg-slate-950/85 p-1.5 rounded-full border border-purple-500/30 backdrop-blur-md font-mono text-xs">
        <span className="text-[10px] text-slate-500 px-2 uppercase">Focus:</span>
        {SPATIAL_PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => handlePlanetSelect(planet)}
            className={`px-2.5 py-1 rounded-full transition-colors text-[11px] flex items-center gap-1 ${
              selectedPlanet?.id === planet.id
                ? "bg-slate-800 text-cyan-300 border border-cyan-400 font-bold"
                : "bg-slate-900/60 hover:bg-cyan-950/50 hover:text-cyan-300 text-slate-300 border border-slate-800"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: planet.color }} />
            <span>{planet.shortName}</span>
          </button>
        ))}
      </div>

      {/* TECHNICAL INSPECTION CARD: 3 MAIN POINTS FOR CLICKED SKILL */}
      {selectedPlanet && (
        <div className="absolute top-16 right-4 z-20 w-88 max-w-[calc(100vw-2rem)] p-5 rounded-2xl bg-slate-950/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl font-sans text-xs hud-corner animate-in fade-in zoom-in-95 duration-200">
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

          <div className="pt-3 pb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block mb-2">
              What I Know & Hands-on Experience (3 Pillars):
            </span>
          </div>

          <div className="space-y-3 mt-1">
            {selectedPlanet.mainPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-cyan-300 font-mono text-xs font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>0{idx + 1}. {point.title}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed pl-5 font-sans">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <span>Proficiency Rating:</span>
            <span className="text-cyan-300 font-bold">{selectedPlanet.proficiency}</span>
          </div>
        </div>
      )}

      {/* CENTRAL AWS CERTIFIED CLOUD PRACTITIONER DETAILS MODAL */}
      {isCenterSelected && (
        <div className="absolute top-16 right-4 z-20 w-96 max-w-[calc(100vw-2rem)] p-5 rounded-2xl bg-amber-950/95 border-2 border-amber-400 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.5)] font-sans text-xs hud-corner animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-amber-500/30">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase text-amber-300 tracking-wider font-bold">
                  VERIFIED INDUSTRY ACCREDITATION
                </span>
              </div>
              <h4 className="text-lg font-mono font-bold text-white">
                AWS Certified Cloud Practitioner
              </h4>
              <p className="text-[11px] font-mono text-cyan-300">
                CLF-C02 // Amazon Web Services
              </p>
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

          <div className="py-3 text-slate-200 text-xs leading-relaxed space-y-2 font-sans">
            <p>
              Validates overall understanding of AWS Cloud platform, global infrastructure, security governance, architectural principles, core services (EC2, S3, VPC, RDS, IAM, CloudWatch), and billing models.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
              <div className="p-2 rounded bg-slate-950/60 border border-amber-500/30">
                <div className="text-amber-400 font-bold">Domain 1</div>
                <div className="text-slate-300">Cloud Concepts (24%)</div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-amber-500/30">
                <div className="text-amber-400 font-bold">Domain 2</div>
                <div className="text-slate-300">Security & Compliance (30%)</div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-amber-500/30">
                <div className="text-amber-400 font-bold">Domain 3</div>
                <div className="text-slate-300">Cloud Technology & Services (34%)</div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-amber-500/30">
                <div className="text-amber-400 font-bold">Domain 4</div>
                <div className="text-slate-300">Billing & Pricing (12%)</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between font-mono text-[11px]">
            <span className="text-emerald-400 font-bold">● Credential: ACTIVE & VERIFIED</span>
            <a
              href="https://aws.amazon.com/certification/certified-cloud-practitioner/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="text-amber-300 hover:text-white flex items-center gap-1 font-semibold underline"
            >
              <span>Verify AWS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

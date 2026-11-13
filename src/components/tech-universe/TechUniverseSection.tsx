"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { Network, Sparkles, Filter, ExternalLink, Code } from "lucide-react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface TechNode {
  id: string;
  name: string;
  category: "Programming" | "Web" | "Cloud" | "Database" | "AI";
  position: [number, number, number];
  color: string;
  connections: string[];
  projects: string[];
  description: string;
}

const TECH_NODES: TechNode[] = [
  // Cloud (AWS)
  {
    id: "aws",
    name: "AWS Cloud",
    category: "Cloud",
    position: [0, 1.8, 0],
    color: "#f59e0b",
    connections: ["ec2", "s3", "iam", "vpc", "docker", "terraform"],
    projects: ["AWS EKS Cluster", "Terraform Pipeline"],
    description: "AWS Certified Cloud Practitioner core infrastructure: EC2, S3, IAM, VPC, RDS, and CloudWatch.",
  },
  {
    id: "ec2",
    name: "AWS EC2",
    category: "Cloud",
    position: [1.8, 2.2, 0.4],
    color: "#fbbf24",
    connections: ["aws", "docker", "vpc"],
    projects: ["Terraform Pipeline", "EKS Cluster"],
    description: "Elastic Compute Cloud sizing, virtual machine lifecycle, AMIs, and security groups.",
  },
  {
    id: "s3",
    name: "AWS S3",
    category: "Cloud",
    position: [-1.8, 2.2, 0.4],
    color: "#f59e0b",
    connections: ["aws", "iam"],
    projects: ["Static Hosting & State Storage"],
    description: "Simple Storage Service bucket policies, lifecycle rules, and Terraform remote state backend.",
  },
  {
    id: "iam",
    name: "IAM Security",
    category: "Cloud",
    position: [-1.2, 0.8, -0.6],
    color: "#e11d48",
    connections: ["aws", "s3", "ec2"],
    projects: ["Zero-Trust Access Governance"],
    description: "Identity & Access Management, least-privilege policies, roles, and credential rotation.",
  },
  {
    id: "vpc",
    name: "AWS VPC",
    category: "Cloud",
    position: [1.2, 0.8, -0.6],
    color: "#06b6d4",
    connections: ["aws", "ec2"],
    projects: ["Isolated Network Topologies"],
    description: "Virtual Private Cloud subnets, route tables, internet gateways, and security groups.",
  },

  // DevOps & IaC
  {
    id: "docker",
    name: "Docker",
    category: "Cloud",
    position: [0.8, -0.5, 0.8],
    color: "#38bdf8",
    connections: ["aws", "kubernetes", "linux", "github_actions"],
    projects: ["EKS Microservices", "CI/CD Pipeline"],
    description: "Multi-stage container packaging, image optimization, and reproducible environments.",
  },
  {
    id: "kubernetes",
    name: "Kubernetes / EKS",
    category: "Cloud",
    position: [2.4, -0.8, 0.2],
    color: "#3b82f6",
    connections: ["docker", "aws"],
    projects: ["AWS EKS Cluster"],
    description: "Pods, ReplicaSets, Deployments, Services, and AWS EKS cluster orchestration.",
  },
  {
    id: "terraform",
    name: "Terraform (IaC)",
    category: "Cloud",
    position: [-1.4, -0.8, 0.8],
    color: "#8b5cf6",
    connections: ["aws", "github_actions"],
    projects: ["Terraform Pipeline"],
    description: "HashiCorp Terraform infrastructure as code for declarative AWS resource provisioning.",
  },
  {
    id: "github_actions",
    name: "GitHub Actions & CI/CD",
    category: "Cloud",
    position: [-2.4, -0.8, 0.2],
    color: "#a855f7",
    connections: ["docker", "terraform"],
    projects: ["Automated Deployment"],
    description: "Continuous integration workflows, automated testing, container builds, and deployment runners.",
  },

  // Linux, Scripting & Observability
  {
    id: "linux",
    name: "Linux & Bash",
    category: "Programming",
    position: [0, -1.8, 0.4],
    color: "#e2e8f0",
    connections: ["docker", "python"],
    projects: ["Systems Administration"],
    description: "POSIX shell scripting, kernel process management, cron automation, and sysadmin operations.",
  },
  {
    id: "python",
    name: "Python",
    category: "Programming",
    position: [-2.2, 1.0, 1.2],
    color: "#38bdf8",
    connections: ["linux", "cloudwatch"],
    projects: ["Boto3 Automation Scripts"],
    description: "Automation scripting, systems engineering, cloud SDK tools, and APIs.",
  },
  {
    id: "cloudwatch",
    name: "CloudWatch & Prometheus",
    category: "Cloud",
    position: [2.2, 1.0, 1.2],
    color: "#ec4899",
    connections: ["aws", "kubernetes"],
    projects: ["Cluster Observability"],
    description: "Telemetry metric scraping, alarm thresholds, logs monitoring, and system observability.",
  },
];

function UniverseGraph({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (node: TechNode) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  // Calculate lines between connected nodes
  const lines = useMemo(() => {
    const list: Array<{ from: [number, number, number]; to: [number, number, number]; isHighlighted: boolean }> = [];
    const nodeMap = new Map(TECH_NODES.map((n) => [n.id, n]));

    TECH_NODES.forEach((node) => {
      node.connections.forEach((connId) => {
        const target = nodeMap.get(connId);
        if (target) {
          const isHighlighted = selectedId === node.id || selectedId === target.id;
          list.push({ from: node.position, to: target.position, isHighlighted });
        }
      });
    });
    return list;
  }, [selectedId]);

  return (
    <group ref={groupRef}>
      {/* Visual Connection Rays */}
      {lines.map((line, idx) => {
        const points = [new THREE.Vector3(...line.from), new THREE.Vector3(...line.to)];
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={idx} object={new THREE.Line(
            geom,
            new THREE.LineBasicMaterial({
              color: line.isHighlighted ? "#22d3ee" : "#7c3aed",
              transparent: true,
              opacity: line.isHighlighted ? 0.8 : 0.25,
            })
          )} />
        );
      })}

      {/* Nodes */}
      {TECH_NODES.map((node) => {
        const isSelected = selectedId === node.id;
        return (
          <group
            key={node.id}
            position={node.position}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onSelect(node);
            }}
          >
            <mesh>
              <sphereGeometry args={[isSelected ? 0.22 : 0.16, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 2.5 : 1.2}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing outer halo if selected */}
            {isSelected && (
              <mesh>
                <sphereGeometry args={[0.32, 16, 16]} />
                <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.6} />
              </mesh>
            )}

            <Text
              position={[0, 0.32, 0]}
              fontSize={0.16}
              color="#f8fafc"
              anchorX="center"
              anchorY="bottom"
            >
              {node.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export function TechUniverseSection() {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(TECH_NODES[0]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredNodes = useMemo(() => {
    if (activeCategory === "All") return TECH_NODES;
    return TECH_NODES.filter((n) => n.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="tech-universe" className="relative py-28 px-4 sm:px-6 bg-slate-950 border-t border-purple-500/15 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-xs font-mono text-cyan-300 mb-3">
            <Network className="w-3.5 h-3.5 text-purple-400" />
            <span>MODULE 03 // INTERACTIVE 3D TOPOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono tracking-tight text-white mb-3">
            Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Universe Map</span>
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm font-sans">
            Explore interconnected engineering paradigms, data flows, and dependencies across software stacks. Click any node to inspect.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["All", "Programming", "Web", "Cloud", "Database", "AI"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Canvas + Detail Card Container */}
        <div className="tech-card rounded-2xl border-purple-500/30 overflow-hidden shadow-2xl relative grid lg:grid-cols-12 min-h-[520px]">
          {/* Canvas Left/Top */}
          <div className="lg:col-span-8 relative h-[380px] lg:h-[520px] bg-slate-950/60">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
              <pointLight position={[-10, -10, -10]} intensity={1.2} color="#a855f7" />
              <Suspense fallback={null}>
                <UniverseGraph
                  selectedId={selectedNode?.id || null}
                  onSelect={(node) => setSelectedNode(node)}
                />
              </Suspense>
              <OrbitControls enableZoom={true} enablePan={false} maxDistance={9} minDistance={3.5} />
            </Canvas>

            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-500 pointer-events-none">
              [DRAG TO ROTATE • SCROLL TO ZOOM • CLICK NODE TO INSPECT]
            </div>
          </div>

          {/* Right Inspector Panel */}
          <div className="lg:col-span-4 p-6 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-purple-500/20 flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                    NODE SPECIFICATION
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {selectedNode.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedNode.color }} />
                    {selectedNode.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Projects using this node */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-1.5">
                    Utilized in Engineering Projects
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.projects.map((p) => (
                      <span
                        key={p}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/70 border border-purple-500/30 text-purple-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct connections */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-1.5">
                    Connected Topologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.connections.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                      >
                        → {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 font-mono text-xs">
                Select a technology node in the 3D map to inspect.
              </div>
            )}

            <div className="pt-4 border-t border-purple-500/10 text-[10px] font-mono text-slate-500 text-center">
              TOPOLOGY SYNCED WITH PORTFOLIO DATA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

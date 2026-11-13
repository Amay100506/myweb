"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { OrbitControls, Text } from "@react-three/drei";
import { Sparkles, X, RotateCcw, Box, HelpCircle } from "lucide-react";
import { sound } from "@/lib/sound";

const TECH_BLOCKS = [
  { name: "Python", color: "#38bdf8", pos: [-1.2, 4, 0] as [number, number, number] },
  { name: "FastAPI", color: "#22d3ee", pos: [0.8, 5, 0.2] as [number, number, number] },
  { name: "Next.js", color: "#c084fc", pos: [-0.4, 6, -0.4] as [number, number, number] },
  { name: "React", color: "#67e8f9", pos: [1.4, 4.5, 0] as [number, number, number] },
  { name: "Docker", color: "#0ea5e9", pos: [-1.8, 5.5, 0.4] as [number, number, number] },
  { name: "AWS", color: "#f59e0b", pos: [0.2, 7, 0] as [number, number, number] },
  { name: "YOLO AI", color: "#a855f7", pos: [-0.6, 8, 0.2] as [number, number, number] },
  { name: "SQLite", color: "#94a3b8", pos: [1.0, 6.5, -0.2] as [number, number, number] },
];

function PhysicsWorld({ keySeed }: { keySeed: number }) {
  return (
    <group key={keySeed}>
      {/* Floor Collider */}
      <RigidBody type="fixed" position={[0, -2.5, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[10, 0.5, 10]} />
          <meshStandardMaterial color="#111322" roughness={0.4} />
        </mesh>
      </RigidBody>

      {/* Invisible Bounding Walls */}
      <RigidBody type="fixed" position={[-4.5, 2, 0]}>
        <CuboidCollider args={[0.2, 5, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[4.5, 2, 0]}>
        <CuboidCollider args={[0.2, 5, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 2, -4.5]}>
        <CuboidCollider args={[5, 5, 0.2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 2, 4.5]}>
        <CuboidCollider args={[5, 5, 0.2]} />
      </RigidBody>

      {/* Dynamic Falling Rigidbodies */}
      {TECH_BLOCKS.map((block, idx) => (
        <RigidBody
          key={idx}
          position={block.pos}
          restitution={0.6}
          friction={0.4}
          colliders="cuboid"
        >
          <mesh
            castShadow
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
            }}
          >
            <boxGeometry args={[1.1, 0.6, 0.8]} />
            <meshStandardMaterial
              color={block.color}
              emissive={block.color}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
          <Text
            position={[0, 0, 0.42]}
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {block.name}
          </Text>
        </RigidBody>
      ))}
    </group>
  );
}

export function RapierPhysicsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [keySeed, setKeySeed] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        className="w-full max-w-3xl bg-slate-950 border border-purple-500/40 rounded-xl overflow-hidden shadow-2xl relative hud-corner font-mono text-xs text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-white tracking-wider">
              RAPIER 3D RIGIDBODY PHYSICS PLAYGROUND
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setKeySeed((k) => k + 1);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Gravity</span>
            </button>
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
        </div>

        {/* Physics Canvas */}
        <div className="relative h-[420px] bg-slate-950/90">
          <Canvas
            camera={{ position: [0, 3, 7], fov: 48 }}
            shadows
            dpr={[1, 1.5]}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
            <pointLight position={[-5, 5, -5]} intensity={1.0} color="#a855f7" />
            <Suspense fallback={null}>
              <Physics gravity={[0, -9.81, 0]}>
                <PhysicsWorld keySeed={keySeed} />
              </Physics>
            </Suspense>
            <OrbitControls enableZoom={true} enablePan={false} maxDistance={10} minDistance={4} />
          </Canvas>

          <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 pointer-events-none">
            [POWERED BY RAPIER 3D • REAL-TIME GRAVITY & COLLISION IMPULSES]
          </div>
        </div>
      </div>
    </div>
  );
}

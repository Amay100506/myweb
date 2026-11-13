"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralOrbMesh({ isTyping }: { isTyping: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (isTyping ? 1.5 : 0.4);
      meshRef.current.rotation.x += delta * (isTyping ? 0.8 : 0.2);
      const scale = 1 + Math.sin(t * (isTyping ? 6 : 2)) * 0.08;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isTyping ? 2.0 : 0.5);
      ringRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#9333ea"
          emissiveIntensity={isTyping ? 2.5 : 1.2}
          wireframe
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.35, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.0}
        />
      </mesh>
    </group>
  );
}

export function AIOrbCanvas({ isTyping }: { isTyping: boolean }) {
  return (
    <div className="w-16 h-16 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#22d3ee" />
        <NeuralOrbMesh isTyping={isTyping} />
      </Canvas>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function QuantumCore({ mousePos }: { mousePos: { x: number; y: number } }) {
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (outerGroupRef.current) {
      // Smooth lerp towards mouse position
      outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.y,
        mousePos.x * 0.4 + time * 0.05,
        0.05
      );
      outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.x,
        -mousePos.y * 0.3,
        0.05
      );
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y += delta * 0.4;
      innerCoreRef.current.rotation.x += delta * 0.2;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.y += delta * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.4;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= delta * 0.7;
      ring3Ref.current.rotation.x -= delta * 0.3;
    }
  });

  return (
    <group ref={outerGroupRef}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Central Core: Icosahedron with Wireframe & Emissive Core */}
        <mesh ref={innerCoreRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#9333ea"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            wireframe
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Inner Solid Prismatic Nucleus */}
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#22d3ee"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Ring 1 - Cyan Torus */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.8, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={1.5}
            roughness={0.2}
          />
        </mesh>

        {/* Ring 2 - Electric Purple Torus */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.2, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>

        {/* Ring 3 - Outer Orbit Ring */}
        <mesh ref={ring3Ref} rotation={[-Math.PI / 4, 0, Math.PI / 4]}>
          <torusGeometry args={[2.6, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.0}
            roughness={0.3}
          />
        </mesh>

        {/* Satellite Data Nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          const radius = 2.4;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, (i % 2 === 0 ? 0.4 : -0.4), Math.sin(angle) * radius]}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#22d3ee" : "#c084fc"}
                emissive={i % 2 === 0 ? "#06b6d4" : "#9333ea"}
                emissiveIntensity={2}
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
}

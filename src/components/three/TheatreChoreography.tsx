"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function TheatreChoreography() {
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
  });

  return null;
}

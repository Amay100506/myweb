"use client";

import { useEffect, useRef } from "react";
import { getProject } from "@theatre/core";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TheatreChoreography() {
  const sheetRef = useRef<any>(null);

  useEffect(() => {
    try {
      const project = getProject("AmayNexusCore");
      const sheet = project.sheet("CinematicHeroTrack");
      sheetRef.current = sheet;

      // Play the choreography timeline in loop
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 8] });
    } catch {
      // Graceful fallback if Theatre.js state is static
    }
  }, []);

  return null;
}

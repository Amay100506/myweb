"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapScrollTrigger() {
  const isRegistered = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isRegistered.current) {
      gsap.registerPlugin(ScrollTrigger);
      isRegistered.current = true;
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Apply smooth staggered fade-in to all elements with class 'gsap-reveal'
    const elements = document.querySelectorAll(".gsap-reveal");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

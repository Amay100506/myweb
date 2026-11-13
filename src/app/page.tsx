"use client";

import { useEffect } from "react";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { DigitalCommandCenter } from "@/components/command-center/DigitalCommandCenter";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { TechUniverseSection } from "@/components/tech-universe/TechUniverseSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { GitHubSection } from "@/components/github/GitHubSection";
import { CertificationsSection } from "@/components/certifications/CertificationsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/navigation/Footer";
import { AIAssistantDrawer } from "@/components/ai-assistant/AIAssistantDrawer";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { ResumeModal } from "@/components/common/ResumeModal";
import { ProjectCompareModal } from "@/components/projects/ProjectCompareModal";
import { SoundControlsModal } from "@/components/common/SoundControlsModal";
import { ShaderPlaygroundModal } from "@/components/experiments/ShaderPlaygroundModal";
import { RapierPhysicsModal } from "@/components/three/RapierPhysicsSandbox";
import { Spatial360Section } from "@/components/spatial-360/Spatial360Section";
import { Spatial360Modal } from "@/components/spatial-360/Spatial360Modal";
import { AccessibilityBar } from "@/components/accessibility/AccessibilityBar";
import { ZaxsatIntroLoader } from "@/components/intro/ZaxsatIntroLoader";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useGsapScrollTrigger } from "@/hooks/useGsapScrollTrigger";
import { Project } from "@/types";
import { sound } from "@/lib/sound";

export default function Home() {
  // GSAP ScrollTrigger registration and scroll animations
  useGsapScrollTrigger();

  // Zustand State Engine
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    terminalOpen,
    setTerminalOpen,
    aiAssistantOpen,
    setAiAssistantOpen,
    resumeOpen,
    setResumeOpen,
    soundControlsOpen,
    setSoundControlsOpen,
    shaderPlaygroundOpen,
    setShaderPlaygroundOpen,
    physicsModalOpen,
    setPhysicsModalOpen,
    spatial360ModalOpen,
    setSpatial360ModalOpen,
    compareModalOpen,
    setCompareModalOpen,
    compareProjectA,
    compareProjectB,
  } = usePortfolioStore();

  useEffect(() => {
    const handleCustomOpen = () => setCommandPaletteOpen(true);
    window.addEventListener("open_command_palette", handleCustomOpen);

    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        sound.playModalOpen();
        setCommandPaletteOpen(true);
      } else if (e.key.toLowerCase() === "t") {
        sound.playModalOpen();
        setTerminalOpen(!terminalOpen);
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => {
      window.removeEventListener("open_command_palette", handleCustomOpen);
      window.removeEventListener("keydown", handleGlobalShortcuts);
    };
  }, [setCommandPaletteOpen, setTerminalOpen, terminalOpen]);

  const handleOpenCompare = (projA?: Project, projB?: Project) => {
    setCompareModalOpen(true, projA, projB);
  };

  return (
    <main className="relative min-h-screen bg-[#040408] text-slate-100 selection:bg-purple-600/30 selection:text-white">
      {/* Powerful Zaxsat "Z" Opening Animation */}
      <ZaxsatIntroLoader />

      {/* Precision Trailing Cyber Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Floating Accessibility, Sound & Physics Bar */}
      <AccessibilityBar
        onOpenSoundControls={() => setSoundControlsOpen(true)}
        onOpenShaderPlayground={() => setShaderPlaygroundOpen(true)}
        onOpenPhysics={() => setPhysicsModalOpen(true)}
        onOpenSpatial360={() => setSpatial360ModalOpen(true)}
      />

      {/* Main Top Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAI={() => setAiAssistantOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenSoundControls={() => setSoundControlsOpen(true)}
      />

      {/* Main Hero Cinematic Nexus with Three.js & Postprocessing */}
      <HeroSection
        onOpenResume={() => setResumeOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAI={() => setAiAssistantOpen(true)}
      />

      {/* Featured Projects Showcases */}
      <div className="gsap-reveal">
        <ProjectsSection onCompareProjects={handleOpenCompare} />
      </div>

      {/* Technical Skills Matrix */}
      <div className="gsap-reveal">
        <SkillsSection />
      </div>

      {/* 360° Spatial Dimension & Turntable Studio */}
      <div className="gsap-reveal">
        <Spatial360Section />
      </div>

      {/* Interactive 3D Technology Universe */}
      <div className="gsap-reveal">
        <TechUniverseSection />
      </div>

      {/* Verified Certifications */}
      <div className="gsap-reveal">
        <CertificationsSection />
      </div>

      {/* Direct Contact */}
      <div className="gsap-reveal">
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </div>

      {/* Command Center Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Module 2: AMAY AI Floating Digital Twin (Voice + Modes) */}
      <AIAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onToggle={() => setAiAssistantOpen(!aiAssistantOpen)}
      />

      {/* Module 10: Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAI={() => setAiAssistantOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Module 4: Interactive Developer Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Module 8: Interactive Resume Studio Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Side-by-Side Project Architecture Comparison */}
      <ProjectCompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        initialProjectA={compareProjectA}
        initialProjectB={compareProjectB}
      />

      {/* Module 9: Web Audio & Ambient Drone HUD */}
      <SoundControlsModal
        isOpen={soundControlsOpen}
        onClose={() => setSoundControlsOpen(false)}
      />

      {/* Module 16: Experimental GLSL Shader Playground */}
      <ShaderPlaygroundModal
        isOpen={shaderPlaygroundOpen}
        onClose={() => setShaderPlaygroundOpen(false)}
      />

      {/* Rapier 3D Physics Modal */}
      <RapierPhysicsModal
        isOpen={physicsModalOpen}
        onClose={() => setPhysicsModalOpen(false)}
      />

      {/* 360° Immersive Spatial Metaverse Modal */}
      <Spatial360Modal
        isOpen={spatial360ModalOpen}
        onClose={() => setSpatial360ModalOpen(false)}
      />
    </main>
  );
}

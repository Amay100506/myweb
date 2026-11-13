import { create } from "zustand";
import { Project } from "@/types";
import { sound } from "@/lib/sound";

interface PortfolioState {
  // Modal states
  commandPaletteOpen: boolean;
  terminalOpen: boolean;
  aiAssistantOpen: boolean;
  resumeOpen: boolean;
  soundControlsOpen: boolean;
  shaderPlaygroundOpen: boolean;
  physicsModalOpen: boolean;
  compareModalOpen: boolean;
  spatial360ModalOpen: boolean;

  // Selected comparison projects
  compareProjectA: Project | undefined;
  compareProjectB: Project | undefined;

  // Audio state
  isMuted: boolean;
  isAmbientActive: boolean;
  volume: number;

  // Navigation zone
  activeZone: string;

  // Actions
  setCommandPaletteOpen: (open: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
  setAiAssistantOpen: (open: boolean) => void;
  setResumeOpen: (open: boolean) => void;
  setSoundControlsOpen: (open: boolean) => void;
  setShaderPlaygroundOpen: (open: boolean) => void;
  setPhysicsModalOpen: (open: boolean) => void;
  setSpatial360ModalOpen: (open: boolean) => void;
  setCompareModalOpen: (open: boolean, projA?: Project, projB?: Project) => void;
  setActiveZone: (zone: string) => void;

  // Audio actions
  toggleMute: () => void;
  toggleAmbient: () => void;
  setVolume: (vol: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  commandPaletteOpen: false,
  terminalOpen: false,
  aiAssistantOpen: false,
  resumeOpen: false,
  soundControlsOpen: false,
  shaderPlaygroundOpen: false,
  physicsModalOpen: false,
  spatial360ModalOpen: false,
  compareModalOpen: false,
  compareProjectA: undefined,
  compareProjectB: undefined,
  isMuted: sound.getMuted(),
  isAmbientActive: sound.isAmbientActive(),
  volume: sound.getVolume(),
  activeZone: "hero",

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  setAiAssistantOpen: (open) => set({ aiAssistantOpen: open }),
  setResumeOpen: (open) => set({ resumeOpen: open }),
  setSoundControlsOpen: (open) => set({ soundControlsOpen: open }),
  setShaderPlaygroundOpen: (open) => set({ shaderPlaygroundOpen: open }),
  setPhysicsModalOpen: (open) => set({ physicsModalOpen: open }),
  setSpatial360ModalOpen: (open) => set({ spatial360ModalOpen: open }),
  setCompareModalOpen: (open, projA, projB) =>
    set({
      compareModalOpen: open,
      compareProjectA: projA,
      compareProjectB: projB,
    }),
  setActiveZone: (zone) => set({ activeZone: zone }),

  toggleMute: () => {
    const next = sound.toggleMute();
    set({ isMuted: next });
  },
  toggleAmbient: () => {
    const next = sound.toggleAmbient();
    set({ isAmbientActive: next });
  },
  setVolume: (vol) => {
    sound.setVolume(vol);
    set({ volume: vol });
  },
}));

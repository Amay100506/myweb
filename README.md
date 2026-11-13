# Amay Kumar — Next-Generation Immersive Personal Portfolio 2.0

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-black?logo=threedotjs)](https://threejs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
[![Rapier 3D](https://img.shields.io/badge/Physics-Rapier_3D-purple)](https://rapier.rs/)

A world-class personal portfolio and developer command center engineered as a fusion of **IIT Bombay Techfest's digital experience**, an **interactive 3D universe**, and **high-reliability software systems**.

---

## 🏛️ System Architecture

```
                                  ┌──────────────────────────┐
                                  │      PORTFOLIO STORE     │
                                  │   (Zustand State Engine) │
                                  └─────────────┬────────────┘
                                                │
         ┌───────────────────────┬──────────────┴───────────────┬───────────────────────┐
         ▼                       ▼                              ▼                       ▼
┌──────────────────┐    ┌──────────────────┐           ┌──────────────────┐    ┌──────────────────┐
│   3D GRAPHICS    │    │ MOTION & AUDIO   │           │   UI & ACCESS    │    │ SECURE BACKEND   │
│ • Three.js + R3F │    │ • GSAP Timelines │           │ • Command Center │    │ • /api/chat      │
│ • Postprocessing │    │ • Theatre.js     │           │ • Tech Universe  │    │ • /api/github    │
│ • Rapier Physics │    │ • Web Audio Synth│           │ • Journey Map    │    │ • /api/contact   │
│ • Custom Shaders │    │ • Confetti FX    │           │ • Case Studies   │    │ • CSP & HSTS     │
└──────────────────┘    └──────────────────┘           └──────────────────┘    └──────────────────┘
```

---

## 🌟 Flagship Features

1. **Personal Digital Command Center**: 4-panel telemetry operations hub tracking system status, active initiatives (Brand Essence, Rakshak), and technical competencies.
2. **Interactive 3D Technology Universe**: Connected 3D node graph topology in Three.js and React Three Fiber with real-time inspection.
3. **AMAY AI (Digital Twin)**: Natural-language assistant with 3 modes (Developer, Recruiter, Collaboration), speech recognition voice input, and speech synthesis voice output.
4. **Rapier 3D Physics Lab**: Interactive rigid-body physics simulation using `@react-three/rapier` with real-time gravity and collision impulses.
5. **Interactive Developer CLI**: In-browser terminal supporting autocomplete (`Tab`), history navigation, and commands (`help`, `about`, `skills`, `projects`, `experience`, `education`, `github`, `contact`, `resume`, `clear`, `matrix`).
6. **Journey Time Machine**: Interactive chronological milestone timeline (2024–2026) spanning BCA education at Dr. D. Y. Patil Vidyapeeth Pune, internship at Brand Essence, and technical achievements.
7. **Project Lab & Technical Case Studies**: Dedicated deep-dive pages (`/project/priosort`, `/project/rakshak`, `/project/notifyiq`, `/project/cloud-sentinel`) with problem statements, 5-step execution pipelines, and syntax-highlighted code.
8. **Web Audio Synthesizer**: Built-in procedural ambient drone and tactile interaction audio effects with volume slider and global mute.
9. **Multi-Language Localization**: English (EN) and हिन्दी (HI) real-time translation toggle.
10. **Accessibility & Personalization**: High-contrast mode, adjustable font scaling, WCAG 2.2 AA compliance, and OS reduced-motion detection.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, Partial Prerendering)
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **3D & Visuals**: Three.js, React Three Fiber, Drei, React Three Postprocessing (Bloom, Vignette), Rapier Physics, Theatre.js, Custom GLSL
- **Animation**: GSAP (ScrollTrigger), Framer Motion, Canvas Confetti
- **State Management**: Zustand
- **Audio & Voice**: Web Audio API (oscillators, biquad filters), Web Speech API (speech recognition & speech synthesis)
- **APIs**: GitHub REST API (server-side caching), Contact Dispatch API, AMAY AI Chat API

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Amay100506/portfilio.git
cd portfilio
npm install --legacy-peer-deps
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 👤 Profile & Attribution

- **Engineer**: Amay Kumar
- **Academic Base**: Dr. D. Y. Patil Vidyapeeth, Pune
- **GitHub**: [@Amay100506](https://github.com/Amay100506)
- **LinkedIn**: [amaykumar19connect](https://linkedin.com/in/amaykumar19connect)
- **Email**: amaykumar.connect@gmail.com

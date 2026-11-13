"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface Translations {
  nav: {
    commandCenter: string;
    about: string;
    skills: string;
    techUniverse: string;
    projects: string;
    journey: string;
    experience: string;
    github: string;
    certifications: string;
    contact: string;
    search: string;
    cli: string;
    ai: string;
    resume: string;
  };
  hero: {
    badge: string;
    title: string;
    tagline: string;
    viewProjects: string;
    explorePortfolio: string;
    resume: string;
    contact: string;
    spatialSectors: string;
  };
  commandCenter: {
    badge: string;
    title: string;
    subtitle: string;
    sysStatus: string;
    activeOps: string;
    telemetry: string;
  };
  common: {
    availableForRoles: string;
    verifiedRecord: string;
    deepDive: string;
    compare: string;
    repo: string;
    switchLang: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      commandCenter: "Command Center",
      about: "About",
      skills: "Skills",
      techUniverse: "3D Tech Universe",
      projects: "Projects",
      journey: "Journey",
      experience: "Experience",
      github: "GitHub",
      certifications: "Certifications",
      contact: "Contact",
      search: "Search",
      cli: "CLI",
      ai: "AMAY AI",
      resume: "Resume",
    },
    hero: {
      badge: "TECHFEST-INSPIRED IMMERSIVE ARCHITECTURE",
      title: "AMAY KUMAR",
      tagline: "Building at the intersection of Software Engineering, Cloud Computing and Artificial Intelligence.",
      viewProjects: "View Projects",
      explorePortfolio: "Explore Portfolio",
      resume: "Resume",
      contact: "Contact Me",
      spatialSectors: "SPATIAL SECTORS:",
    },
    commandCenter: {
      badge: "SECTOR 00 // OPERATIONS NEXUS",
      title: "Personal Digital Command Center",
      subtitle: "Live telemetry, active engineering initiatives, repository telemetry, and system milestones.",
      sysStatus: "SYS STATUS: NOMINAL",
      activeOps: "ACTIVE OPERATIONS",
      telemetry: "SYSTEM TELEMETRY",
    },
    common: {
      availableForRoles: "Available for Opportunities",
      verifiedRecord: "Verified Record",
      deepDive: "Deep Dive",
      compare: "Compare Architectures",
      repo: "Repository",
      switchLang: "Language",
    },
  },
  hi: {
    nav: {
      commandCenter: "कमांड सेंटर",
      about: "परिचय",
      skills: "तकनीकी कौशल",
      techUniverse: "3D टेक ब्रह्मांड",
      projects: "परियोजनाएं",
      journey: "सफ़रनामा",
      experience: "अनुभव",
      github: "गिटहब",
      certifications: "प्रमाणपत्र",
      contact: "संपर्क करें",
      search: "खोजें",
      cli: "सीएलआई",
      ai: "अमय एआई",
      resume: "बायोडाटा",
    },
    hero: {
      badge: "टेकफेस्ट-प्रेरित अत्याधुनिक डिजिटल अनुभव",
      title: "अमय कुमार",
      tagline: "सॉफ्टवेयर इंजीनियरिंग, क्लाउड कंप्यूटिंग और आर्टिफिशियल इंटेलिजेंस के संगम पर नवाचार।",
      viewProjects: "परियोजनाएं देखें",
      explorePortfolio: "पोर्टफोलियो देखें",
      resume: "बायोडाटा",
      contact: "संपर्क करें",
      spatialSectors: "स्थानिक क्षेत्र:",
    },
    commandCenter: {
      badge: "क्षेत्र 00 // ऑपरेशंस हब",
      title: "डिजिटल ऑपरेशंस कमांड सेंटर",
      subtitle: "लाइव टेलीमेट्री, सक्रिय इंजीनियरिंग पहल, कोड रिपॉजिटरी और तकनीकी मील के पत्थर।",
      sysStatus: "प्रणाली स्थिति: सामान्य",
      activeOps: "सक्रिय कार्यप्रणाली",
      telemetry: "प्रणाली टेलीमेट्री",
    },
    common: {
      availableForRoles: "सक्रिय अवसरों के लिए उपलब्ध",
      verifiedRecord: "प्रमाणित रिकॉर्ड",
      deepDive: "गहन अध्ययन",
      compare: "वास्तुकला तुलना",
      repo: "रिपॉजिटरी",
      switchLang: "भाषा",
    },
  },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  toggleLang: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language | null;
    if (saved === "en" || saved === "hi") {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("portfolio_lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "en" ? "hi" : "en";
    handleSetLang(next);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang], toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);

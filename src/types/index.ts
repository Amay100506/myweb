export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Mobile' | 'AI & Computer Vision' | 'Cloud & Systems' | 'Full-Stack';
  description: string;
  problemStatement: string;
  technicalArchitecture: string[];
  technologies: string[];
  features: string[];
  developmentStatus: 'Active Development' | 'Completed Concept' | 'Prototype' | 'Beta';
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  highlightMetric?: string;
  year: string;
  architectureDiagram?: string;
}

export interface SkillItem {
  name: string;
  proficiency: number; // 0 to 100
  level: 'Core' | 'Proficient' | 'Familiar';
  yearsExperience?: string;
  description?: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  period: string; // e.g. "January 2026 – March 2026"
  type: 'Internship' | 'Full-time' | 'Project Leadership' | 'Professional Experience' | 'Student Volunteer' | string;
  summary: string;
  responsibilities: string[];
  skillsUsed: string[];
  verified: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  verificationStatus: 'Verified' | 'Completed' | 'In Progress';
  skillsValidated: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  topics?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

export interface NavZone {
  id: string;
  label: string;
  description: string;
  coordinates: [number, number, number];
}

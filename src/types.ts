export interface Skill {
  name: string;
  slug: string;
  experience: string;
  description: string;
}
export interface SkillCategory {
  category: string;
  slug: string;
  description: string;
  longDescription: string;
  items: Skill[];
}
export interface Experience {
  role: string;
  company: string;
  slug: string;
  type: string;
  period: string;
  location: string;
  summary: string;
  description: string;
  skills: string[];
  projects: string[];
}

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image?: string;
  technologies: string[];
  timeline: string;
  liveUrl?: string;
  githubUrl?: string;
  personalExperience: string;
  collaborators: string[];
}
export interface Education {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
}
export interface Personals {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface FunFact {
  category: string;
  text: string;
}

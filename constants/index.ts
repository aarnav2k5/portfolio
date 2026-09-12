import { FolderGit2, House, Mail, Phone } from "lucide-react";
import type React from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";

type SocialIcon = React.ComponentType<{ className?: string }>;

export interface linksType {
  name: string;
  link: string;
}

export const Site = {
  name: "Aarnav Jaiswal",
  domain: "aarnav-jaiswal.dev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aarnav-jaiswal.dev",
  role: "Full-Stack Developer",
  tagline:
    "Final-year B.Tech CSIT student building full-stack web products with React, Next.js, Node.js, Express, PostgreSQL, and MongoDB.",
  bio: "Final-year B.Tech CSIT student building full-stack web products with React, Next.js, Node.js, Express, PostgreSQL, and MongoDB.",
  greeting: "Hey!",
  location: "Noida, India",
  openToWork: true,
  stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "MongoDB"],
  resume: "/aarnav-jaiswal-resume.pdf" as string | null,
  visitorCount: 1,
  avatar: "/avatar7.png",
  builtWith: ["Next.js", "Tailwind", "Supabase"],
};

export interface SocialLink {
  name: string;
  url: string;
  icon: SocialIcon;
  color: string;
}

export const Socials: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/aarnav2k5", icon: GitHubIcon, color: "#181717" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/aarnav-jaiswal-2k5/", icon: LinkedInIcon, color: "#0A66C2" },
  { name: "Email", url: "mailto:jaiswalaarnav@gmail.com", icon: Mail, color: "#3b82f6" },
  { name: "Phone", url: "tel:+919650020617", icon: Phone, color: "#16a34a" },
];

export const Links: { name: string; link: string; icon: SocialIcon }[] = [
  { name: "Home", link: "/", icon: House },
  { name: "Projects", link: "/projects", icon: FolderGit2 },
];

export interface ExperienceEntry {
  company: string;
  href: string;
  location: string;
  title: string;
  start: string;
  end: string | null;
  description: string;
  bullets: string[];
  tags: string[];
}

// No professional experience yet: projects and learning lead the story.
export const Experience: ExperienceEntry[] = [];

export interface EducationEntry {
  institution: string;
  location: string;
  program: string;
  period: string;
  details: string;
}

export const Education: EducationEntry[] = [
  {
    institution: "KIET Group of Institutions",
    location: "Ghaziabad, India",
    program: "B.Tech in Computer Science and Information Technology · CGPA: 6.8/10",
    period: "Oct 2023 – Oct 2027",
    details: "Coursework: Data Structures & Algorithms, OOP, Databases, Operating Systems, Computer Networks",
  },
  {
    institution: "Bal Bharati Public School",
    location: "Noida, India",
    program: "Senior Secondary (Class XII) — CBSE",
    period: "2023",
    details: "",
  },
];

export const Achievements = [
  "Solved 100+ algorithmic problems across LeetCode, CodeChef, and Codeforces.",
  "IEEE SSH Hackathon '24 — Event Organizing Team: mentored competing teams during debugging sessions.",
  "Conducted a 3-day Git & GitHub workshop for junior students covering version control and collaboration.",
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const SkillGroups: SkillGroup[] = [
  { label: "Frontend", skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap", "shadcn/ui", "HTML5", "CSS3"] },
  { label: "Backend & APIs", skills: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Databases", skills: ["MongoDB", "SQL", "PostgreSQL", "Supabase"] },
  { label: "AI, Tools & Platforms", skills: ["LLM APIs", "Groq", "Qdrant", "Hugging Face", "Git", "GitHub", "Vercel", "Docker"] },
];

export const Skills = SkillGroups.flatMap((g) => g.skills);

export interface ProjectEntry {
  title: string;
  tagline: string;
  description: string;
  liveHref?: string;
  codeHref?: string;
  tags: string[];
  category: "AI" | "Web";
}

export const Projects: ProjectEntry[] = [
  {
    title: "Gurukul",
    tagline: "Tuition resource library for teachers and students",
    description: "A full-stack resource library with role-based teacher and student workflows for managing chapter notes, previous-year questions, sample papers, and marking schemes. Includes guided browsing, search filters, Supabase Auth, PostgreSQL Row Level Security, public downloads, duplicate-file detection, soft-delete and restore, upload progress, and realtime presence.",
    tags: ["Next.js", "TypeScript", "React", "Supabase", "Docker", "Tailwind CSS"],
    codeHref: "https://github.com/aarnav2k5/gurukul",
    liveHref: "https://lms-hqzf.onrender.com/",
    category: "Web",
  },
  {
    title: "Civic Report",
    tagline: "Crowdsourced platform for reporting local civic issues",
    description: "A full-stack platform that lets citizens report and track issues such as broken roads, garbage, and waterlogging with location tagging and status updates. Includes realtime notifications, toast feedback, and a fast Next.js App Router deployment on Vercel.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui"],
    codeHref: "https://github.com/aarnav2k5/civic-report",
    liveHref: "https://civic-report-five.vercel.app/",
    category: "Web",
  },
];

export const Resources: { title: string; description: string; link: string }[] = [];

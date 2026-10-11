/**
 * Nitin Shrivastva — Skill Universe
 * Strictly reflects supplied skills with no invented proficiency ratings,
 * years of experience, or percentage bars.
 * Easy to extend or modify.
 */

export const skillCategories = [
  {
    id: "frontend",
    name: "Frontend Development",
    shortName: "Frontend",
    icon: "Layout",
    description: "Building responsive, modern, and interactive user interfaces.",
    skills: [
      { name: "React", icon: "Code", highlight: true },
      { name: "JavaScript", icon: "FileCode", highlight: true },
      { name: "HTML", icon: "FileText", highlight: false },
      { name: "CSS", icon: "Palette", highlight: false },
    ]
  },
  {
    id: "backend",
    name: "Backend Development",
    shortName: "Backend",
    icon: "Server",
    description: "Developing scalable server APIs, routing, and backend logic.",
    skills: [
      { name: "Node.js", icon: "Cpu", highlight: true },
      { name: "Express.js", icon: "Layers", highlight: true },
    ]
  },
  {
    id: "programming",
    name: "Core Programming",
    shortName: "Programming",
    icon: "Terminal",
    description: "Fundamental languages, algorithms, and core computing foundations.",
    skills: [
      { name: "C", icon: "Terminal", highlight: false },
      { name: "Java", icon: "Coffee", highlight: false },
      { name: "Python", icon: "Code2", note: "Fundamentals", highlight: true },
    ]
  },
  {
    id: "tools",
    name: "Developer Tools & AI",
    shortName: "Tools",
    icon: "Wrench",
    description: "Modern developer workflow tools, version control, and AI platforms.",
    skills: [
      { name: "Git", icon: "GitBranch", highlight: false },
      { name: "GitHub", icon: "Github", highlight: true },
      { name: "VS Code", icon: "Monitor", highlight: false },
      { name: "AI-assisted development tools", icon: "Sparkles", highlight: true },
    ]
  }
];

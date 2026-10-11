/**
 * Main site configuration for Nitin Shrivastva's Portfolio.
 * Edit these settings to customize personal details, contact info, and profiles.
 */

export const siteConfig = {
  name: "Nitin Shrivastva",
  firstName: "NITIN",
  lastName: "SHRIVASTVA",
  education: "B.Tech CSE (Artificial Intelligence), 2nd Year",
  role: "Computer Science Student | AI Enthusiast | Web Developer",
  location: "Kanpur, Uttar Pradesh, India",
  tagline: "Building Ideas Into Digital Experiences",
  logoMonogram: "N",
  logoWordmark: "NITIN",
  github: "https://github.com/Nitin-03-tech",
  
  // Hero section meta chips
  metaChips: [
    "B.Tech CSE (AI)",
    "2nd Year",
    "Kanpur, India",
    "6 Projects"
  ],

  // Modest and honest description
  heroDescription: "Computer science student and web developer in Kanpur, building ideas into digital experiences with React, Node.js and AI-assisted tools.",

  // Contact info placeholders
  // EDITABLE PLACEHOLDER: Set your verified email or contact endpoint here
  contactEmail: "placeholder@nitinshrivastva.dev",
  contactEndpoint: null, // e.g., "https://formspree.io/f/your-id"
  formDemoMode: true, // Set to false once backend/email service is hooked up

  // Profile chooser profiles ("Who's watching?")
  profiles: [
    {
      id: "nitin",
      name: "Nitin",
      badge: "MAIN",
      subtitle: "The full portfolio, in order",
      gradient: "from-[#E50914] via-[#990000] to-[#1a0000]",
      glowColor: "rgba(229, 9, 20, 0.4)",
      accent: "#E50914",
      icon: "N",
      initialSectionOrder: ["continue", "journey", "top-picks", "projects", "skills", "about", "learning", "contact"]
    },
    {
      id: "recruiter",
      name: "Recruiter",
      badge: "CAREER",
      subtitle: "About, skills and projects first",
      gradient: "from-[#0055FE] via-[#002888] to-[#050D24]",
      glowColor: "rgba(0, 85, 254, 0.4)",
      accent: "#0055FE",
      icon: "💼",
      initialSectionOrder: ["continue", "about", "skills", "projects", "top-picks", "journey", "learning", "contact"]
    },
    {
      id: "developer",
      name: "Developer",
      badge: "TECH",
      subtitle: "Projects, stack and GitHub first",
      gradient: "from-[#00D26A] via-[#006633] to-[#001F10]",
      glowColor: "rgba(0, 210, 106, 0.4)",
      accent: "#00D26A",
      icon: "</>",
      initialSectionOrder: ["continue", "projects", "top-picks", "skills", "journey", "about", "learning", "contact"]
    },
    {
      id: "explorer",
      name: "Explorer",
      badge: "3D",
      subtitle: "The story and the 3D showcase first",
      gradient: "from-[#9D00FF] via-[#5500A0] to-[#15002A]",
      glowColor: "rgba(157, 0, 255, 0.4)",
      accent: "#9D00FF",
      icon: "✦",
      initialSectionOrder: ["continue", "journey", "top-picks", "projects", "about", "skills", "learning", "contact"]
    }
  ]
};

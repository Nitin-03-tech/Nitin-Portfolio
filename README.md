# NITIN SHRIVASTVA — 3D Cinematic Portfolio Website

A production-quality, genuinely 3D cinematic portfolio website built for **Nitin Shrivastva**, inspired by high-end streaming video streaming platforms (Netflix-style UI) with real Three.js / React Three Fiber depth, perspective camera choreography, and responsive interaction design.

---

## 🌟 Key Features

1. **"Who's Watching?" 3D Viewer Chooser**:
   - Interactive 3D-tilted viewer tiles (**Nitin [Main]**, **Recruiter**, **Developer**, **Explorer**).
   - Reorders showcase sequence according to viewer persona without removing any content.
   - Session memory (`sessionStorage`) and accessible "Skip Intro" option.
2. **Cinematic 3D Hero Scene**:
   - Built on `@react-three/fiber` and `@react-three/drei` with real Three.js geometries, metallic materials, and soft shadows.
   - Extruded 3D **"NITIN"** typography, red rim lighting, deep volumetric glow, and floating dev geometry (prisms, torus rings, `< />` code brackets, dynamic particle constellations).
   - Interactive mouse parallax and smooth depth response.
   - High-contrast HTML overlay: red kicker, tagline, honest description, meta chips, and dual action buttons.
3. **Continue Exploring Row**:
   - Horizontally scrolling queue with Netflix-style red progress bars, episode rank tags, and synopsis triggers.
4. **My Journey (Episodic Timeline)**:
   - Season 1: *Learning the Foundations* (C, Java, Python fundamentals).
   - Season 2: *Building for the Web* (HTML, CSS, JavaScript, React, Node.js, Express.js).
   - Season 3: *Building with AI* (AI-assisted development tools, AirDraw AI, LabNova).
5. **Top Picks 3D Carousel**:
   - Real Three.js perspective cylinder arc featuring all 6 projects with giant outlined numerals (1–6) positioned in 3D depth.
   - Interactive keyboard navigation (Left/Right arrows), click-to-focus, and detail modal activation.
6. **Projects & Originals Showcase**:
   - All 6 projects presented with saturated gradient posters (Crimson, Deep Blue, Purple, Green, Amber, Cyan), tech tags, glowing red divider lines, and working links only:
     - **ShopEra** (Live Site + GitHub Repository)
     - **CampusOS** ("Link coming soon" status badge)
     - **LabNova** (Live Site)
     - **AirDraw AI** ("Link coming soon" status badge)
     - **Sentinel Telematics** ("Link coming soon" status badge)
     - **InAmigos Community** (Live Site — Internship redesign concept note)
7. **My Skill Universe**:
   - Vertical category switcher on the left (Frontend, Backend, Core Programming, Developer Tools & AI).
   - Right-hand card grid with red icon tiles, subtle 3D hover tilt, and glowing highlights (no arbitrary proficiency percentages).
8. **Verified Learning & Education**:
   - Real academic education: B.Tech CSE (Artificial Intelligence), 2nd Year, Kanpur, Uttar Pradesh, India.
   - Strictly verified credentials ledger with an elegant empty state (`/src/data/learning.js` is empty by default; counter is automatically computed and hidden when empty).
9. **Season Finale ("TO BE CONTINUED...") Contact**:
   - Validated contact form with inline error indicators, touch detection, and test submission simulation.
   - Clear disclosure stating demo mode until a backend/email webhook is configured in `config.js`.
   - Verified GitHub link (`https://github.com/Nitin-03-tech`).
10. **Accessibility, Performance & Fallbacks**:
    - "3D Mode" / "Lite 2D" toggle for instant low-power fallback.
    - Full `prefers-reduced-motion` compliance.
    - Capped pixel ratio (DPR ≤ 2) and render loop pausing on background tabs.
    - Fully responsive from 320px mobile to 1440px+ ultra-wide desktop.

---

## 🚀 Local Run Command

### Prerequisites
- Node.js (v18+ recommended, tested with v24)
- npm (v9+)

### Installation & Execution
```bash
# Navigate to the project directory
cd nitin-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### Production Build & Preview
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Steps (Free Hosting)

### Option A: Vercel (Recommended)
1. Push this repository to your GitHub account (`https://github.com/Nitin-03-tech/nitin-portfolio`).
2. Log in to [vercel.com](https://vercel.com) using your GitHub account.
3. Click **"Add New..."** -> **"Project"** and import the `nitin-portfolio` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `npm run build` | Output Directory: `dist`.
6. Click **"Deploy"**. Your live 3D portfolio will be online in ~45 seconds with a custom `.vercel.app` URL.

### Option B: Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Click **"Add new site"** -> **"Import an existing project"** -> **GitHub**.
3. Select `nitin-portfolio`.
4. Build command: `npm run build` | Publish directory: `dist`.
5. Click **"Deploy site"**.

---

## ✏️ Editable Placeholders & Configuration

All site content is cleanly isolated in modular data files for instant editing:

| File Path | Description | Editable Items |
| :--- | :--- | :--- |
| `src/data/config.js` | Core Identity & Config | `contactEmail`, `contactEndpoint`, `heroDescription`, profile badges |
| `src/data/projects.js` | 6 Featured Projects | `liveUrl`, `githubUrl`, `tags`, `shortDescription`, `fullSynopsis` |
| `src/data/skills.js` | Technical Repertoire | Categories, skill items, highlights, notes |
| `src/data/learning.js` | Verified Certifications | Add completed certificates (`certifications` array) |

---

## 🎨 Typography & Palette Design Choices

- **Display Typography**: `Bebas Neue` and `Anton` (condensed, tall display type with high contrast and letter-spacing to match the cinematic streaming title aesthetic).
- **Body & Metadata**: `Inter` (neutral, crisp sans-serif ensuring minimum 4.5:1 contrast against dark surfaces) and `JetBrains Mono` for chips and technical tags.
- **Palette**:
  - Near-black Navy Background: `#05060A` to `#0B0D14`.
  - Primary Cinematic Red: `#E50914` (Netflix red), hover `#F40612`, glow `rgba(229, 9, 20, 0.45)`.
  - Project Poster Gradients: Crimson (`#E50914`), Deep Blue (`#1E50FF`), Violet (`#9D00FF`), Emerald (`#00D26A`), Amber (`#FF6B00`), Cyan (`#00C6FF`).

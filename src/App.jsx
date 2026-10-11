import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/common/Navbar';
import CustomCursor from './components/common/CustomCursor';
import ProfileChooserModal from './components/intro/ProfileChooserModal';
import HeroSection from './components/sections/HeroSection';
import ContinueExploring from './components/sections/ContinueExploring';
import JourneySection from './components/sections/JourneySection';
import TopPicksSection from './components/sections/TopPicksSection';
import ProjectsShowcase from './components/sections/ProjectsShowcase';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import LearningSection from './components/sections/LearningSection';
import ContactSection from './components/sections/ContactSection';
import ProjectDetailModal from './components/modals/ProjectDetailModal';
import Footer from './components/common/Footer';
import { siteConfig } from './data/config';
import { Users } from 'lucide-react';

export default function App() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeProfile, setActiveProfile] = useState(siteConfig.profiles[0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [reducedEffects, setReducedEffects] = useState(false);

  // Check sessionStorage and prefers-reduced-motion on initial mount
  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setReducedEffects(true);
    }

    // Check stored profile in sessionStorage
    try {
      const storedProfileId = sessionStorage.getItem('nitin_portfolio_profile');
      if (storedProfileId) {
        const found = siteConfig.profiles.find((p) => p.id === storedProfileId);
        if (found) {
          setActiveProfile(found);
          setShowProfileModal(false);
          return;
        }
      }
    } catch {
      // Ignore sessionStorage issues
    }

    // If not stored, show profile modal on first visit
    setShowProfileModal(true);
  }, []);

  // IntersectionObserver for active section tracking in navbar
  useEffect(() => {
    const sectionIds = ['home', 'continue', 'journey', 'top-picks', 'projects', 'about', 'skills', 'learning', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [activeProfile]);

  const handleSelectProfile = (profile) => {
    setActiveProfile(profile);
    setShowProfileModal(false);
  };

  // Section components map for dynamic profile-based ordering
  const sectionComponents = useMemo(() => {
    return {
      continue: <ContinueExploring key="continue" onSelectProject={setSelectedProject} />,
      journey: <JourneySection key="journey" />,
      'top-picks': (
        <TopPicksSection
          key="top-picks"
          onSelectProject={setSelectedProject}
          reducedEffects={reducedEffects}
        />
      ),
      projects: <ProjectsShowcase key="projects" onSelectProject={setSelectedProject} />,
      about: <AboutSection key="about" reducedEffects={reducedEffects} />,
      skills: <SkillsSection key="skills" />,
      learning: <LearningSection key="learning" />,
      contact: <ContactSection key="contact" />,
    };
  }, [reducedEffects]);

  // Determine section order based on activeProfile
  const orderedSections = useMemo(() => {
    const order = activeProfile.initialSectionOrder || [
      'continue',
      'journey',
      'top-picks',
      'projects',
      'about',
      'skills',
      'learning',
      'contact'
    ];
    return order.map((sectionKey) => sectionComponents[sectionKey]).filter(Boolean);
  }, [activeProfile, sectionComponents]);

  return (
    <div className="relative min-h-screen bg-[#05060A] text-white selection:bg-[#E50914] selection:text-white">
      {/* Custom Red Cursor */}
      <CustomCursor reducedEffects={reducedEffects} />

      {/* Intro 'Who's watching?' modal on initial visit */}
      {showProfileModal && (
        <ProfileChooserModal onSelectProfile={handleSelectProfile} />
      )}

      {/* Global Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        reducedEffects={reducedEffects}
        setReducedEffects={setReducedEffects}
      />

      {/* Viewer Profile Switcher Floating Pill */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:block">
        <button
          onClick={() => setShowProfileModal(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0D14]/90 border border-white/10 hover:border-white/30 text-xs font-mono text-[#8A91A5] hover:text-white transition-all backdrop-blur-md shadow-lg group"
          title="Change viewer profile"
        >
          <span
            className="w-2 h-2 rounded-full shadow-[0_0_8px_#E50914]"
            style={{ backgroundColor: activeProfile.accent }}
          />
          <span>Profile: <strong className="text-white">{activeProfile.name}</strong></span>
          <Users className="w-3 h-3 text-[#8A91A5] group-hover:text-white" />
        </button>
      </div>

      {/* Main Page Layout */}
      <main id="main-content">
        {/* Hero is always the prominent cinematic gateway */}
        <HeroSection reducedEffects={reducedEffects} />

        {/* Dynamically prioritized sections based on viewer profile */}
        {orderedSections}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Detail Modal for Selected Project */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

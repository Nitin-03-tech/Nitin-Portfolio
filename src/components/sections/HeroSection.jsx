import React, { useRef, useEffect } from 'react';
import { Play, Github, ChevronDown, Layers, MapPin, GraduationCap } from 'lucide-react';
import Hero3DCanvas from '../3d/Hero3DCanvas';
import { siteConfig } from '../../data/config';

export default function HeroSection({ reducedEffects }) {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalized from -1 to 1
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20 pb-16"
      style={{
        background: 'radial-gradient(circle at 50% 35%, rgba(229, 9, 20, 0.16) 0%, rgba(5, 6, 10, 0.85) 50%, #05060A 100%)',
      }}
    >
      {/* 3D R3F Canvas Layer (Real 3D) */}
      {!reducedEffects ? (
        <Hero3DCanvas mousePos={mousePos} />
      ) : (
        /* Reduced Effects / 2D Fallback for Low-Power Devices */
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 select-none pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#E50914]/20 blur-[120px]" />
        </div>
      )}

      {/* Hero HTML Overlay Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Red Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#E50914]/50 shadow-[0_0_15px_rgba(229,9,20,0.4)] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase">
            THE PORTFOLIO · ORIGINAL SERIES
          </span>
        </div>

        {/* Giant Condensed Headline (Visual depth layer) */}
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight text-white mb-2 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] select-none">
          <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">NITIN </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E5E7EB] to-[#8A91A5]">
            SHRIVASTVA
          </span>
        </h1>

        {/* Clear, High-Contrast Tagline */}
        <div className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-white mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-2xl">
          "{siteConfig.tagline}"
        </div>

        {/* Meta Chips Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {siteConfig.metaChips.map((chip, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#111420]/80 border border-white/10 text-xs sm:text-sm font-mono text-[#E5E7EB] backdrop-blur-md shadow-sm"
            >
              {idx === 0 && <GraduationCap className="w-3.5 h-3.5 text-[#E50914]" />}
              {idx === 2 && <MapPin className="w-3.5 h-3.5 text-[#E50914]" />}
              {idx === 3 && <Layers className="w-3.5 h-3.5 text-[#E50914]" />}
              <span>{chip}</span>
            </div>
          ))}
        </div>

        {/* Honest, Modest Description */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#8A91A5] font-normal leading-relaxed mb-8 sm:mb-10 text-center">
          {siteConfig.heroDescription}
        </p>

        {/* Netflix-style Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full max-w-md">
          {/* Primary View Projects (Play style) */}
          <button
            onClick={() => handleScrollTo('projects')}
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-[#E5E7EB] text-[#05060A] font-bold text-sm sm:text-base tracking-wide rounded-md shadow-[0_4px_25px_rgba(255,255,255,0.2)] transition-all transform active:scale-95 group"
          >
            <Play className="w-4 h-4 fill-current text-[#05060A] group-hover:scale-110 transition-transform" />
            <span>View Projects</span>
          </button>

          {/* Secondary GitHub (Netflix Info / My List style) */}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#171B2B]/90 hover:bg-[#20253B] text-white border border-white/20 hover:border-white/40 font-semibold text-sm sm:text-base tracking-wide rounded-md backdrop-blur-md transition-all transform active:scale-95 group shadow-lg"
          >
            <Github className="w-4 h-4 text-white group-hover:text-[#E50914] transition-colors" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Downward indicator to prompt scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleScrollTo('continue')}
          className="text-xs font-mono tracking-widest text-[#8A91A5] uppercase flex flex-col items-center gap-1 focus:outline-none"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#E50914]" />
        </button>
      </div>

      {/* Soft Bottom Vignette Transition */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#05060A] to-transparent pointer-events-none" />
    </section>
  );
}

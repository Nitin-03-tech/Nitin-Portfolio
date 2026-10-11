import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../data/config';
import { ChevronRight } from 'lucide-react';

export default function ProfileChooserModal({ onSelectProfile }) {
  const [hoveredTile, setHoveredTile] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChoose = (profile) => {
    if (closing) return;

    setClosing(true);

    try {
      sessionStorage.setItem('nitin_portfolio_profile', profile.id);
    } catch {
      // Ignore storage errors in private browsing
    }

    setTimeout(() => {
      onSelectProfile(profile);
    }, 450);
  };

  const handleSkip = () => {
    const defaultProfile = siteConfig.profiles[0];
    if (defaultProfile) handleChoose(defaultProfile);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-[#05060A] text-white transition-opacity duration-500 ${
        closing
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      }`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 45%, rgba(229, 9, 20, 0.15) 0%, #05060A 70%)',
      }}
    >
      {/* Top branding */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-12 z-20 flex items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded border border-[#E50914] bg-black/70 shadow-[0_0_15px_#E50914]">
          <span className="font-bebas text-2xl sm:text-3xl font-black text-[#E50914]">
            {siteConfig.logoMonogram}
          </span>
        </div>

        <span className="font-bebas text-xl sm:text-3xl tracking-widest text-white">
          {siteConfig.logoWordmark}
        </span>
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center px-4 pt-24 pb-8 sm:pt-28 text-center">
        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-wider mb-2 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          WHO'S WATCHING?
        </h1>

        <p className="text-[#8A91A5] text-sm sm:text-base max-w-md mb-8 sm:mb-12 font-medium">
          Select your viewer profile to customize the sequence and focus of the showcase.
        </p>

        {/* Profile cards */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl"
          style={{ perspective: '1200px' }}
        >
          {siteConfig.profiles.map((p, idx) => {
            const isHovered = hoveredTile === p.id;

            const rotateX = mousePos.y * -6;
            const rotateY = mousePos.x * 8 + (idx - 1.5) * 2;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredTile(p.id)}
                onMouseLeave={() => setHoveredTile(null)}
                onClick={() => handleChoose(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChoose(p);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select profile ${p.name}`}
                data-profile={p.id}
                className="group relative cursor-pointer transition-all duration-300 focus:outline-none"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
                    isHovered
                      ? 'translateZ(20px) scale(1.03)'
                      : 'translateZ(0px) scale(1)'
                  }`,
                }}
              >
                {/* Card face */}
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-xl border p-3 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
                    isHovered
                      ? 'border-white shadow-[0_15px_40px_rgba(0,0,0,0.9)]'
                      : 'border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.6)]'
                  }`}
                  style={{
                    background:
                      'linear-gradient(145deg, #121522 0%, #080A12 100%)',
                    boxShadow: isHovered
                      ? `0 0 25px ${p.glowColor}, 0 20px 40px rgba(0,0,0,0.9)`
                      : undefined,
                  }}
                >
                  {/* Top badge */}
                  <div className="flex justify-between items-start gap-2">
                    <span
                      className={`text-[10px] font-mono tracking-widest font-bold px-2 py-0.5 rounded ${
                        p.badge === 'MAIN'
                          ? 'bg-[#E50914] text-white shadow-[0_0_10px_#E50914]'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {p.badge}
                    </span>

                    <span className="text-white/30 text-xs font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Profile icon */}
                  <div className="my-auto flex flex-col items-center">
                    <div
                      className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-bebas text-3xl sm:text-4xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${p.gradient}`}
                      style={{
                        boxShadow: `0 8px 24px ${p.glowColor}`,
                      }}
                    >
                      {p.icon}
                    </div>
                  </div>

                  {/* Profile name and subtitle */}
                  <div className="text-left mt-2 min-w-0">
                    <div className="font-bebas text-xl sm:text-3xl text-white tracking-wider flex items-center justify-between gap-1">
                      <span className="truncate">{p.name}</span>

                      <ChevronRight className="w-4 h-4 shrink-0 text-[#8A91A5] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#8A91A5] group-hover:text-[#E5E7EB] transition-colors leading-tight line-clamp-2 mt-0.5">
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Hover accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-300"
                    style={{
                      backgroundColor: p.accent,
                      opacity: isHovered ? 1 : 0,
                      boxShadow: `0 0 12px ${p.accent}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Skip intro */}
        <div className="mt-8 sm:mt-12">
          <button
            onClick={handleSkip}
            disabled={closing}
            className="text-xs sm:text-sm font-mono tracking-widest text-[#8A91A5] hover:text-white uppercase transition-colors border-b border-transparent hover:border-white/40 pb-0.5 disabled:opacity-50"
          >
            Skip Intro → Enter Main Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
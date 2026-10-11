import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../data/config';
import { ChevronRight } from 'lucide-react';

export default function ProfileChooserModal({ onSelectProfile }) {
  const [hoveredTile, setHoveredTile] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalized coordinates from -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChoose = (profile) => {
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
    handleChoose(defaultProfile);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05060A] text-white transition-opacity duration-500 ${
        closing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(229, 9, 20, 0.15) 0%, #05060A 70%)',
      }}
    >
      {/* Top branding */}
      <div className="absolute top-8 left-8 sm:left-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-black/70 border border-[#E50914] rounded flex items-center justify-center shadow-[0_0_15px_#E50914]">
          <span className="font-bebas text-3xl font-black text-[#E50914]">{siteConfig.logoMonogram}</span>
        </div>
        <span className="font-bebas text-3xl tracking-widest text-white">{siteConfig.logoWordmark}</span>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl px-4 py-8 flex flex-col items-center text-center">
        <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-wider mb-2 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          WHO'S WATCHING?
        </h1>
        <p className="text-[#8A91A5] text-sm sm:text-base max-w-md mb-10 sm:mb-14 font-medium">
          Select your viewer profile to customize the sequence and focus of the showcase.
        </p>

        {/* 3D Tilted Tiles Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl"
          style={{
            perspective: '1200px',
          }}
        >
          {siteConfig.profiles.map((p, idx) => {
            const isHovered = hoveredTile === p.id;
            // 3D perspective rotation tilt based on mouse position
            const rotateX = mousePos.y * -6;
            const rotateY = mousePos.x * 8 + (idx - 1.5) * 2;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredTile(p.id)}
                onMouseLeave={() => setHoveredTile(null)}
                onClick={() => handleChoose(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChoose(p);
                  }
                }}
                className="group relative cursor-pointer focus:outline-none transition-all duration-300"
                data-profile={p.id}
                aria-label={`Select profile ${p.name}`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
                    isHovered ? 'translateZ(30px) scale(1.05)' : 'translateZ(0px) scale(1)'
                  }`,
                }}
              >
                {/* 3D Card Face */}
                <div
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 ${
                    isHovered
                      ? 'border-white shadow-[0_15px_40px_rgba(0,0,0,0.9)]'
                      : 'border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.6)]'
                  }`}
                  style={{
                    background: `linear-gradient(145deg, #121522 0%, #080A12 100%)`,
                    boxShadow: isHovered ? `0 0 35px ${p.glowColor}, 0 20px 40px rgba(0,0,0,0.9)` : undefined,
                  }}
                >
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-[10px] font-mono tracking-widest font-bold px-2 py-0.5 rounded ${
                        p.badge === 'MAIN'
                          ? 'bg-[#E50914] text-white shadow-[0_0_10px_#E50914]'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {p.badge}
                    </span>
                    <span className="text-white/30 text-xs font-mono">0{idx + 1}</span>
                  </div>

                  {/* Center Monogram / 3D Icon Graphic */}
                  <div className="my-auto flex flex-col items-center">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-bebas text-3xl sm:text-4xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${p.gradient}`}
                      style={{
                        boxShadow: `0 8px 24px ${p.glowColor}`,
                      }}
                    >
                      {p.icon}
                    </div>
                  </div>

                  {/* Bottom Title & Subtitle */}
                  <div className="text-left mt-2">
                    <div className="font-bebas text-2xl sm:text-3xl text-white tracking-wider flex items-center justify-between">
                      <span>{p.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#8A91A5] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#8A91A5] group-hover:text-[#E5E7EB] transition-colors leading-tight line-clamp-2 mt-0.5">
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Active hover bottom border glow */}
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

        {/* Skip intro link */}
        <div className="mt-12 sm:mt-16">
          <button
            onClick={handleSkip}
            className="text-xs sm:text-sm font-mono tracking-widest text-[#8A91A5] hover:text-white uppercase transition-colors border-b border-transparent hover:border-white/40 pb-0.5"
          >
            Skip Intro → Enter Main Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

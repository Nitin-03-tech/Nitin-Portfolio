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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto bg-[#05060A] text-white transition-opacity duration-500 ${
        closing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 45%, rgba(229, 9, 20, 0.15) 0%, #05060A 70%)',
      }}
    >
      {/* Top-left branding: one N icon and one NITIN wordmark */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-3 sm:left-12 sm:top-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#E50914] bg-black shadow-[0_0_12px_rgba(229,9,20,0.45)]">
          <span className="font-bebas text-2xl font-black text-[#E50914]">
            {siteConfig.logoMonogram}
          </span>
        </div>

        <span className="font-bebas text-xl tracking-widest text-white sm:text-3xl">
          {siteConfig.logoWordmark}
        </span>
      </div>

      {/* Main content */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-8 pt-24 text-center sm:pt-28">
        <h1 className="mb-2 font-bebas text-4xl tracking-wider text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-6xl md:text-7xl">
          WHO'S WATCHING?
        </h1>

        <p className="mb-8 max-w-md text-sm font-medium text-[#8A91A5] sm:mb-12 sm:text-base">
          Select your viewer profile to customize the sequence and focus of the showcase.
        </p>

        {/* Profile cards */}
        <div
          className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
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
                  className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-xl border p-3 transition-all duration-300 sm:p-5 ${
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
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${
                        p.badge === 'MAIN'
                          ? 'bg-[#E50914] text-white shadow-[0_0_10px_#E50914]'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {p.badge}
                    </span>

                    <span className="font-mono text-xs text-white/30">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Profile icon */}
                  <div className="my-auto flex flex-col items-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br font-bebas text-3xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20 sm:text-4xl ${p.gradient}`}
                      style={{
                        boxShadow: `0 8px 24px ${p.glowColor}`,
                      }}
                    >
                      {p.icon}
                    </div>
                  </div>

                  {/* Profile name and subtitle */}
                  <div className="mt-2 min-w-0 text-left">
                    <div className="flex items-center justify-between gap-1 font-bebas text-xl tracking-wider text-white sm:text-3xl">
                      <span className="truncate">{p.name}</span>

                      <ChevronRight className="h-4 w-4 shrink-0 text-[#8A91A5] transition-all group-hover:translate-x-1 group-hover:text-white" />
                    </div>

                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-tight text-[#8A91A5] transition-colors group-hover:text-[#E5E7EB] sm:text-xs">
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
            className="border-b border-transparent pb-0.5 font-mono text-xs uppercase tracking-widest text-[#8A91A5] transition-colors hover:border-white/40 hover:text-white disabled:opacity-50 sm:text-sm"
          >
            Skip Intro → Enter Main Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
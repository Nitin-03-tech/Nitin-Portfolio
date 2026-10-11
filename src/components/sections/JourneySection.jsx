import React, { useState } from 'react';
import { journeySeasons } from '../../data/journey';
import { Film, CheckCircle2, Terminal, Globe, BrainCircuit } from 'lucide-react';

export default function JourneySection() {
  const [activeSeason, setActiveSeason] = useState(0);

  const icons = [
    <Terminal className="w-5 h-5 text-[#E50914]" />,
    <Globe className="w-5 h-5 text-[#1E50FF]" />,
    <BrainCircuit className="w-5 h-5 text-[#9D00FF]" />
  ];

  return (
    <section id="journey" className="relative w-full py-20 bg-[#05060A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#E50914] uppercase">
              EPISODIC TIMELINE
            </span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-wide text-white">
            MY JOURNEY
          </h2>
          <p className="text-[#8A91A5] text-sm sm:text-base max-w-xl font-normal mt-1">
            The narrative arc across programming foundations, modern full-stack web architectures, and AI-oriented development.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 border-b border-white/10 pb-4">
          {journeySeasons.map((item, idx) => {
            const isActive = activeSeason === idx;
            return (
              <button
                key={item.season}
                onClick={() => setActiveSeason(idx)}
                className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#171B2B] text-white border border-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.3)]'
                    : 'bg-[#0B0D14] text-[#8A91A5] border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {icons[idx]}
                <span className="font-bebas text-lg tracking-wider">{item.season}</span>
                <span className="text-xs font-mono text-white/50 hidden sm:inline-block">({item.title})</span>
              </button>
            );
          })}
        </div>

        {/* Active Season Cinematic Feature Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main Season Focus (8 cols) */}
          <div className="lg:col-span-8 bg-[#0B0D14] rounded-2xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Subtle radial glow */}
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30"
              style={{ backgroundColor: journeySeasons[activeSeason].accentColor }}
            />

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#E50914] bg-black/60 px-3 py-1 rounded border border-[#E50914]/40">
                  {journeySeasons[activeSeason].badge}
                </span>
                <span className="text-xs font-mono text-[#8A91A5] flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#E50914]" /> {journeySeasons[activeSeason].season}
                </span>
              </div>

              <h3 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide mb-3">
                {journeySeasons[activeSeason].season}: {journeySeasons[activeSeason].title}
              </h3>

              <p className="text-sm sm:text-base text-[#E5E7EB] leading-relaxed mb-6">
                {journeySeasons[activeSeason].summary}
              </p>

              {/* Technologies Chip Cloud */}
              <div className="mb-6">
                <div className="text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-2.5">
                  Core Technologies & Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {journeySeasons[activeSeason].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded bg-[#171B2B] text-xs font-mono font-semibold text-white border border-white/10 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Highlights */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-1">
                  Key Learnings & Milestones
                </div>
                {journeySeasons[activeSeason].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#8A91A5]">
                    <CheckCircle2 className="w-4 h-4 text-[#E50914] flex-none mt-0.5" />
                    <span className="text-[#E5E7EB]">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glowing bottom accent line */}
            <div
              className="mt-8 h-1 w-full rounded-full transition-all duration-500"
              style={{
                backgroundColor: journeySeasons[activeSeason].accentColor,
                boxShadow: `0 0 15px ${journeySeasons[activeSeason].accentColor}`
              }}
            />
          </div>

          {/* Season Lineup Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-mono text-[#8A91A5] uppercase tracking-wider">
              ALL SEASONS (03 EPISODES)
            </span>
            {journeySeasons.map((item, idx) => {
              const isSelected = activeSeason === idx;
              return (
                <div
                  key={item.season}
                  onClick={() => setActiveSeason(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#171B2B] border-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.25)]'
                      : 'bg-[#0B0D14]/80 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-white/50">{item.season}</span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: isSelected ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        color: isSelected ? '#E50914' : '#8A91A5'
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="font-bebas text-xl text-white tracking-wide">{item.title}</h4>
                  <p className="text-xs text-[#8A91A5] line-clamp-1 mt-1">
                    {item.technologies.join(' · ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

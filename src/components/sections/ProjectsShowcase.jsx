import React, { useState } from 'react';
import { ExternalLink, Github, Info, Clock, Sparkles } from 'lucide-react';
import { projects } from '../../data/projects';

export default function ProjectsShowcase({ onSelectProject }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section id="projects" className="relative w-full py-24 bg-[#05060A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#E50914]/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#1E50FF]/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#E50914] uppercase">
              FEATURED ORIGINALS
            </span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wide text-white">
            PROJECTS & ORIGINALS
          </h2>
          <p className="text-[#8A91A5] text-sm sm:text-base max-w-2xl font-normal mt-1">
            All six digital engineering productions. Cinematic full-depth showcases featuring live deployments, concept architectures, and interactive exploratory prototypes.
          </p>
        </div>

        {/* 2-Column Side-by-Side Depth-Layered Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((proj, idx) => {
            const isHovered = hoveredCard === proj.id;

            return (
              <div
                key={proj.id}
                onMouseEnter={() => setHoveredCard(proj.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-between"
                style={{
                  background: 'linear-gradient(180deg, #0F121E 0%, #080A12 100%)',
                  borderColor: isHovered ? proj.accentColor : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isHovered
                    ? `0 20px 50px rgba(0,0,0,0.9), 0 0 35px ${proj.accentColor}33`
                    : '0 10px 30px rgba(0,0,0,0.6)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {/* Upper Cinematic Gradient Poster Area */}
                <div
                  className="relative h-64 sm:h-72 w-full p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{
                    background: proj.themeGradient,
                  }}
                >
                  {/* Subtle Background Pattern & Vignette */}
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: proj.bgPattern }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121E] via-black/20 to-black/40 pointer-events-none" />

                  {/* Top Meta Header inside Poster */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md text-white font-bold px-3 py-1 rounded border border-white/10 shadow-sm">
                      {proj.kicker}
                    </span>
                    <span className="text-xs font-mono font-bold text-white/70 bg-black/50 px-2 py-0.5 rounded">
                      ORIGINAL · #{proj.rank}
                    </span>
                  </div>

                  {/* Large Cinematic Title */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                {/* Lower Card Info Section */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#0F121E]">
                  <div>
                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-[#E5E7EB] leading-relaxed mb-6">
                      {proj.shortDescription}
                    </p>

                    {/* Tech Tags (Editable, drawn only from verified skills) */}
                    <div className="mb-6">
                      <div className="text-[11px] font-mono text-[#8A91A5] uppercase tracking-wider mb-2">
                        Technologies & Focus
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-[#171B2B] text-xs font-mono text-white/90 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons & Status Row */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    {/* Left: Synopsis Modal Trigger */}
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8A91A5] hover:text-white transition-colors"
                    >
                      <Info className="w-4 h-4 text-[#E50914]" />
                      <span>Synopsis & Specs</span>
                    </button>

                    {/* Right: Working Action Buttons (NO dead buttons!) */}
                    <div className="flex items-center gap-2.5">
                      {/* Live Link Button if URL exists */}
                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#E5E7EB] text-[#05060A] text-xs sm:text-sm font-bold rounded shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all transform active:scale-95"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : null}

                      {/* GitHub Link Button if URL exists */}
                      {proj.githubUrl ? (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171B2B] hover:bg-[#22283F] text-white border border-white/20 text-xs sm:text-sm font-semibold rounded transition-all transform active:scale-95"
                        >
                          <Github className="w-3.5 h-3.5 text-[#E50914]" />
                          <span>Code</span>
                        </a>
                      ) : null}

                      {/* Coming Soon Label if no public URL */}
                      {proj.comingSoonLabel ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171B2B]/60 text-[#8A91A5] border border-white/10 text-xs font-mono rounded">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{proj.comingSoonLabel}</span>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Thin glowing horizontal red line beneath each panel */}
                <div
                  className="h-1 w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${proj.accentColor} 50%, transparent 100%)`,
                    boxShadow: isHovered ? `0 0 15px ${proj.accentColor}` : 'none',
                    opacity: isHovered ? 1 : 0.4,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

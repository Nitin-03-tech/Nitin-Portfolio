import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { projects } from '../../data/projects';

export default function ContinueExploring({ onSelectProject }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="continue" className="relative w-full py-10 bg-[#05060A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-wider text-white">
              CONTINUE EXPLORING
            </h2>
            <span className="hidden sm:inline-block text-xs font-mono text-[#8A91A5] bg-[#111420] px-2 py-0.5 rounded border border-white/5">
              6 SHOWS IN PROGRESS
            </span>
          </div>

          {/* Left/Right Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-[#111420] border border-white/10 hover:border-white/30 text-white hover:text-[#E50914] transition-all hover:bg-black/60 focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-[#111420] border border-white/10 hover:border-white/30 text-white hover:text-[#E50914] transition-all hover:bg-black/60 focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Row */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProject(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(item);
                }
              }}
              className="group relative flex-none w-[260px] sm:w-[300px] rounded-lg overflow-hidden border border-white/10 hover:border-white/40 bg-[#0B0D14] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] snap-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            >
              {/* Card Banner / Poster Background */}
              <div
                className="relative h-40 sm:h-44 w-full flex flex-col justify-between p-4"
                style={{
                  background: item.themeGradient,
                }}
              >
                {/* Dark overlay with pattern */}
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                  style={{ backgroundImage: item.bgPattern }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded border border-white/10">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-white/60">
                    S01:E0{item.rank}
                  </span>
                </div>

                {/* Center Hover Action */}
                <div className="relative z-10 self-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                  <div className="w-11 h-11 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-[0_0_15px_#E50914]">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom title inside poster */}
                <div className="relative z-10">
                  <h3 className="font-bebas text-2xl text-white tracking-wider drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Lower Info */}
              <div className="p-3.5 bg-[#0B0D14] flex flex-col justify-between">
                <p className="text-xs text-[#8A91A5] line-clamp-2 mb-3">
                  {item.shortDescription}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#8A91A5]">
                  <span className="text-white/80">{item.watchProgress}% completed</span>
                  <span className="text-[#E50914] flex items-center gap-1 group-hover:underline">
                    <Info className="w-3 h-3" /> Details
                  </span>
                </div>
              </div>

              {/* Thin Netflix-Style Red Progress Bar at Bottom */}
              <div className="w-full h-1 bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-[#E50914] transition-all duration-500 shadow-[0_0_8px_#E50914]"
                  style={{ width: `${item.watchProgress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

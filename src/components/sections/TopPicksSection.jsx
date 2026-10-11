import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, ExternalLink } from 'lucide-react';
import TopPicksCarousel3D from '../3d/TopPicksCarousel3D';
import { projects } from '../../data/projects';

export default function TopPicksSection({ onSelectProject, reducedEffects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only capture if user is roughly in view or no input is focused
      if (['input', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="top-picks" className="relative w-full py-20 bg-[#05060A] overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E50914]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#E50914] uppercase">
                RANKED SHOWCASE
              </span>
            </div>
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl tracking-wide text-white">
              TOP PICKS IN TECH TODAY
            </h2>
            <p className="text-[#8A91A5] text-sm sm:text-base max-w-xl font-normal mt-1">
              Curated 3D carousel of Nitin's six projects in order of depth and implementation.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#8A91A5]">
              <span className="text-white font-bold">{currentIndex + 1}</span> / {projects.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#111420] border border-white/10 hover:border-[#E50914] text-white hover:text-[#E50914] transition-all hover:bg-black/60 focus:outline-none shadow-md"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#111420] border border-white/10 hover:border-[#E50914] text-white hover:text-[#E50914] transition-all hover:bg-black/60 focus:outline-none shadow-md"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Carousel (Real Three.js Canvas) */}
        {!reducedEffects ? (
          <div className="relative">
            <TopPicksCarousel3D
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              onOpenModal={onSelectProject}
            />
          </div>
        ) : (
          /* Reduced Effects 2D Fallback with Outlined Stroke Numerals */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group relative bg-[#0B0D14] rounded-xl border border-white/10 p-5 cursor-pointer hover:border-[#E50914] transition-all flex items-center gap-4"
              >
                <div className="stroke-numeral font-bebas text-6xl leading-none w-14 text-center">
                  {proj.rank}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-[#E50914] tracking-widest uppercase block">
                    {proj.kicker}
                  </span>
                  <h3 className="font-bebas text-2xl text-white tracking-wide">{proj.title}</h3>
                  <p className="text-xs text-[#8A91A5] line-clamp-1">{proj.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Active Item Summary Card & Quick Detail Action Bar */}
        <div className="mt-6 bg-[#0B0D14]/90 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md shadow-2xl">
          <div className="flex items-start sm:items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bebas text-2xl text-white flex-none"
              style={{ background: currentProject.themeGradient }}
            >
              #{currentProject.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide">
                  {currentProject.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-white/80 border border-white/10">
                  {currentProject.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#8A91A5] max-w-2xl mt-0.5">
                {currentProject.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onSelectProject(currentProject)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E50914] hover:bg-[#F40612] text-white text-xs sm:text-sm font-semibold tracking-wide rounded shadow-[0_0_15px_rgba(229,9,20,0.5)] transition-all"
            >
              <Info className="w-4 h-4" />
              <span>Full Synopsis</span>
            </button>
            {currentProject.liveUrl && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide rounded border border-white/15 transition-all"
              >
                <span>Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

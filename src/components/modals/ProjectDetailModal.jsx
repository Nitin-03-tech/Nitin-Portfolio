import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Clock, Tag, Film, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../data/config';

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-[#0B0D14] border border-white/20 shadow-2xl my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Poster Banner */}
        <div
          className="relative h-56 sm:h-72 w-full p-6 sm:p-8 flex flex-col justify-between"
          style={{ background: project.themeGradient }}
        >
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: project.bgPattern }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D14] via-black/20 to-black/60 pointer-events-none" />

          {/* Close button & Category */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-widest uppercase bg-black/70 backdrop-blur-md text-[#E50914] px-3 py-1 rounded border border-[#E50914]/40">
              {project.kicker}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 hover:bg-[#E50914] text-white transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <div className="relative z-10">
            <div className="text-xs font-mono text-white/70 mb-1">
              EPISODE #{project.rank} · {project.category}
            </div>
            <h2 id="modal-title" className="font-bebas text-4xl sm:text-6xl text-white tracking-wide drop-shadow-md">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Synopsis */}
          <div>
            <h3 className="text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-2">
              SYNOPSIS & ARCHITECTURE
            </h3>
            <p className="text-sm sm:text-base text-[#E5E7EB] leading-relaxed">
              {project.fullSynopsis || project.shortDescription}
            </p>
          </div>

          {/* Technologies & Tags */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-2.5">
              <Tag className="w-3.5 h-3.5 text-[#E50914]" />
              <span>TECHNOLOGIES & DOMAINS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded bg-[#171B2B] text-xs font-mono text-white border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Series Meta Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="text-[#8A91A5] block">CREATOR</span>
              <span className="text-white font-semibold">{siteConfig.name}</span>
            </div>
            <div>
              <span className="text-[#8A91A5] block">STATUS</span>
              <span className="text-[#E50914] font-semibold">{project.year}</span>
            </div>
            <div>
              <span className="text-[#8A91A5] block">VERIFICATION</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#E5E7EB] text-[#05060A] text-xs sm:text-sm font-bold rounded shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Site</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171B2B] hover:bg-[#22283F] text-white border border-white/20 text-xs sm:text-sm font-semibold rounded transition-all"
                >
                  <Github className="w-4 h-4 text-[#E50914]" />
                  <span>Repository</span>
                </a>
              )}

              {project.comingSoonLabel && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#171B2B]/70 border border-white/10 text-xs font-mono text-[#8A91A5] rounded">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{project.comingSoonLabel}</span>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-[#8A91A5] hover:text-white transition-colors"
            >
              Close Window [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

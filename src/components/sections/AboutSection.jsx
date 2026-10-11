import React from 'react';
import { siteConfig } from '../../data/config';
import About3DGraphic from '../3d/About3DGraphic';
import { GraduationCap, MapPin, Terminal, Sparkles, Github } from 'lucide-react';

export default function AboutSection({ reducedEffects }) {
  return (
    <section id="about" className="relative w-full py-24 bg-[#05060A] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#E50914]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#E50914] uppercase">
              BEHIND THE SCREEN
            </span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wide text-white">
            ABOUT NITIN
          </h2>
        </div>

        {/* Cinematic 2-Column Panel (3D Object beside honest bio, NO photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Geometric/Typographic Element (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <About3DGraphic reducedEffects={reducedEffects} />
          </div>

          {/* Right Column: Honest Bio & Credentials Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#0B0D14]/90 rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#171B2B] text-xs font-mono text-[#E50914] border border-[#E50914]/30 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CANDIDATE BIOGRAPHY</span>
            </div>

            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-4">
              {siteConfig.name}
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
              <p>
                I am a <strong className="text-white">Computer Science student</strong> currently in my{' '}
                <strong className="text-white">2nd Year</strong> pursuing a B.Tech in Computer Science and Engineering with a specialization in{' '}
                <strong className="text-[#E50914]">Artificial Intelligence</strong> in{' '}
                <strong className="text-white">Kanpur, Uttar Pradesh, India</strong>.
              </p>
              <p>
                Driven by my tagline — <em className="text-white font-medium">"{siteConfig.tagline}"</em> — I focus on translating conceptual computational designs into high-performance web applications, combining standard web architectures with AI-assisted development tools and interactive user interfaces.
              </p>
              <p className="text-[#8A91A5]">
                My engineering repertoire spans foundational programming in C, Java, and Python, paired with practical web development using React, Node.js, and Express.js.
              </p>
            </div>

            {/* Fact Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#E50914] flex-none mt-1" />
                <div>
                  <div className="text-xs font-mono text-[#8A91A5]">Education</div>
                  <div className="text-sm font-semibold text-white">{siteConfig.education}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E50914] flex-none mt-1" />
                <div>
                  <div className="text-xs font-mono text-[#8A91A5]">Location</div>
                  <div className="text-sm font-semibold text-white">{siteConfig.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Terminal className="w-5 h-5 text-[#E50914] flex-none mt-1" />
                <div>
                  <div className="text-xs font-mono text-[#8A91A5]">Primary Role</div>
                  <div className="text-sm font-semibold text-white">{siteConfig.role}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Github className="w-5 h-5 text-[#E50914] flex-none mt-1" />
                <div>
                  <div className="text-xs font-mono text-[#8A91A5]">Open Source</div>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#E50914] hover:underline"
                  >
                    @Nitin-03-tech
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

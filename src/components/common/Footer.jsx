import React from 'react';
import { siteConfig } from '../../data/config';
import { Github, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-[#030407] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Top red glow accent line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent shadow-[0_0_12px_#E50914]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-black border border-[#E50914] rounded flex items-center justify-center shadow-[0_0_15px_#E50914]">
                <span className="font-bebas text-2xl font-black text-[#E50914]">
                  {siteConfig.logoMonogram}
                </span>
              </div>
              <span className="font-bebas text-2xl tracking-widest text-white">
                {siteConfig.logoWordmark}
              </span>
            </div>

            <p className="text-sm font-medium text-white/90 italic">
              "{siteConfig.tagline}"
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8A91A5]">
              <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Quick Nav Links (4 cols) */}
          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8A91A5] mb-4">
              PORTFOLIO SECTIONS
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-[#8A91A5]">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-white transition-colors">Home</a>
              <a href="#journey" onClick={(e) => handleNavClick(e, '#journey')} className="hover:text-white transition-colors">Journey</a>
              <a href="#top-picks" onClick={(e) => handleNavClick(e, '#top-picks')} className="hover:text-white transition-colors">Top Picks</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-white transition-colors">Projects</a>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">About</a>
              <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-white transition-colors">Skills</a>
              <a href="#learning" onClick={(e) => handleNavClick(e, '#learning')} className="hover:text-white transition-colors">Learning</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Connect / Open Source (3 cols) */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8A91A5] mb-4">
              CONNECT & CODE
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#0F121E] border border-white/10 hover:border-[#E50914] text-white hover:text-white transition-all shadow-sm group"
            >
              <Github className="w-4 h-4 text-[#E50914] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono">github.com/Nitin-03-tech</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8A91A5]">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          <div className="text-center sm:text-right">
            Designed in Kanpur, India · 3D Cinematic Portfolio
          </div>
        </div>
      </div>
    </footer>
  );
}

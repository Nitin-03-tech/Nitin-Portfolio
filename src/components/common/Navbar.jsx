import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MonitorOff } from 'lucide-react';
import { siteConfig } from '../../data/config';

export default function Navbar({ activeSection, reducedEffects, setReducedEffects }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Journey", href: "#journey" },
    { label: "Top Picks", href: "#top-picks" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Learning", href: "#learning" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#05060A] border-b border-white/10 shadow-xl'
          : 'bg-gradient-to-b from-[#05060A]/95 via-[#05060A]/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand: Red 'N' monogram + 'NITIN' wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-md px-1 py-1"
          aria-label="Nitin Shrivastva Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black/60 border border-[#E50914]/80 rounded flex items-center justify-center shadow-[0_0_15px_rgba(229,9,20,0.5)] group-hover:shadow-[0_0_22px_#E50914] transition-all">
            <span className="font-bebas text-2xl sm:text-3xl font-black text-[#E50914] tracking-wider leading-none">
              {siteConfig.logoMonogram}
            </span>
          </div>
          <span className="font-bebas text-2xl sm:text-3xl tracking-widest text-white group-hover:text-white/90 transition-colors">
            {siteConfig.logoWordmark}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#8A91A5] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E50914] shadow-[0_0_10px_#E50914] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Reduced Effects / 3D Toggle */}
          <button
            onClick={() => setReducedEffects(!reducedEffects)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-white/10 hover:border-white/30 text-[#8A91A5] hover:text-white transition-all bg-black/40"
            title={reducedEffects ? "Enable 3D effects" : "Reduce 3D effects for performance"}
          >
            {reducedEffects ? <MonitorOff className="w-3.5 h-3.5 text-amber-400" /> : <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />}
            <span>{reducedEffects ? "Lite 2D" : "3D Mode"}</span>
          </button>

          {/* Red "Let's build" CTA button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center justify-center px-4 py-2 bg-[#E50914] hover:bg-[#F40612] text-white text-sm font-semibold tracking-wide rounded shadow-[0_0_18px_rgba(229,9,20,0.5)] hover:shadow-[0_0_26px_#E50914] transition-all transform active:scale-95"
          >
            Let's build
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setReducedEffects(!reducedEffects)}
            className="p-2 text-xs border border-white/10 rounded text-[#8A91A5]"
            title="Toggle 3D"
          >
            {reducedEffects ? <MonitorOff className="w-4 h-4 text-amber-400" /> : <Sparkles className="w-4 h-4 text-[#E50914]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#E50914] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-[#05060A] overflow-y-auto border-t border-white/10 px-6 py-6 shadow-2xl z-50 flex flex-col justify-between">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-lg font-medium flex items-center justify-between py-2.5 border-b border-white/5 ${
                    isActive ? 'text-[#E50914] font-bold' : 'text-[#8A91A5] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-6 pb-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full inline-flex items-center justify-center py-3.5 bg-[#E50914] hover:bg-[#F40612] text-white font-bold rounded-lg shadow-[0_0_20px_rgba(229,9,20,0.6)] text-base"
            >
              Let's build
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

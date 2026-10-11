import React, { useState } from 'react';
import { skillCategories } from '../../data/skills';
import {
  Code,
  FileCode,
  FileText,
  Palette,
  Server,
  Cpu,
  Layers,
  Terminal,
  Coffee,
  Code2,
  GitBranch,
  Github,
  Monitor,
  Sparkles,
  Layout,
  Wrench
} from 'lucide-react';

export default function SkillsSection() {
  const [selectedCat, setSelectedCat] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-white" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-white" />;
      case 'FileText': return <FileText className="w-5 h-5 text-white" />;
      case 'Palette': return <Palette className="w-5 h-5 text-white" />;
      case 'Server': return <Server className="w-5 h-5 text-white" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-white" />;
      case 'Layers': return <Layers className="w-5 h-5 text-white" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-white" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-white" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-white" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-white" />;
      case 'Github': return <Github className="w-5 h-5 text-white" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-white" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-white" />;
      case 'Layout': return <Layout className="w-5 h-5 text-white" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-white" />;
      default: return <Code className="w-5 h-5 text-white" />;
    }
  };

  const currentCategory = skillCategories[selectedCat];

  return (
    <section id="skills" className="relative w-full py-24 bg-[#05060A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#E50914] uppercase">
              TECHNICAL REPERTOIRE
            </span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wide text-white">
            MY SKILL UNIVERSE
          </h2>
          <p className="text-[#8A91A5] text-sm sm:text-base max-w-xl font-normal mt-1">
            Data-driven technical toolkit. Organized by computational domain with zero arbitrary ratings or percentages.
          </p>
        </div>

        {/* 2-Column Layout: Left Category List, Right Skill Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Category Navigation (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 bg-[#0B0D14]/80 p-3 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="text-xs font-mono text-[#8A91A5] uppercase tracking-wider px-3 py-2">
              SELECT CATEGORY
            </div>
            {skillCategories.map((cat, idx) => {
              const isActive = selectedCat === idx;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(idx)}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-[#171B2B] border border-[#E50914] text-white shadow-[0_0_20px_rgba(229,9,20,0.3)]'
                      : 'bg-transparent border border-transparent text-[#8A91A5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#E50914] text-white shadow-[0_0_10px_#E50914]' : 'bg-[#111422] text-[#8A91A5]'
                      }`}
                    >
                      {getIcon(cat.icon)}
                    </div>
                    <div>
                      <div className="font-bebas text-xl sm:text-2xl tracking-wide leading-none">
                        {cat.name}
                      </div>
                      <div className="text-xs text-[#8A91A5] font-sans mt-0.5">
                        {cat.skills.length} competencies
                      </div>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive ? 'bg-[#E50914] shadow-[0_0_8px_#E50914]' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Skills Cards Grid (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Category Description Banner */}
            <div className="bg-[#0B0D14] border border-white/10 rounded-2xl p-5 sm:p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#E50914] uppercase tracking-wider">
                  DOMAIN OVERVIEW
                </span>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-0.5">
                  {currentCategory.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#8A91A5] mt-1">
                  {currentCategory.description}
                </p>
              </div>
            </div>

            {/* Grid of Skill Cards with Red Icon Tile and 3D Tilt Glow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {currentCategory.skills.map((skill, sIdx) => (
                <div
                  key={skill.name}
                  className="group relative bg-[#0B0D14] hover:bg-[#111422] border border-white/10 hover:border-[#E50914]/80 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(229,9,20,0.35)] cursor-default"
                >
                  <div className="flex items-center gap-4">
                    {/* Small Red Icon Tile */}
                    <div className="w-12 h-12 rounded-lg bg-[#E50914] flex items-center justify-center flex-none shadow-[0_0_15px_rgba(229,9,20,0.6)] group-hover:scale-110 transition-transform">
                      {getIcon(skill.icon)}
                    </div>

                    {/* Skill Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bebas text-2xl text-white tracking-wide group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                        {skill.note && (
                          <span className="text-[10px] font-mono text-[#8A91A5] bg-black/40 px-2 py-0.5 rounded border border-white/5">
                            {skill.note}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-[#8A91A5] group-hover:text-[#D1D5DB] transition-colors mt-0.5">
                        Verified Capability
                      </div>
                    </div>
                  </div>

                  {/* Red bottom accent border on hover */}
                  <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#E50914] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#E50914]" />
                </div>
              ))}
            </div>

            {/* All Skills Quick Summary Bar */}
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8A91A5]">
              <span>EDITABLE DATA: <code className="text-white">/src/data/skills.js</code></span>
              <span className="text-[#E50914]">Total 13 Verified Skills</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

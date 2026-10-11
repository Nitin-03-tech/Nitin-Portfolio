import React from 'react';
import { certifications, education } from '../../data/learning';
import { GraduationCap, Award, MapPin, CheckCircle, FileText, PlusCircle } from 'lucide-react';

export default function LearningSection() {
  const certCount = certifications.length;

  return (
    <section id="learning" className="relative w-full py-24 bg-[#05060A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#E50914]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#E50914] uppercase">
                ACADEMIC & CREDENTIALS
              </span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl tracking-wide text-white">
              VERIFIED LEARNING
            </h2>
            <p className="text-[#8A91A5] text-sm sm:text-base max-w-xl font-normal mt-1">
              Honest academic background and external certification ledger with strictly verified entries.
            </p>
          </div>

          {/* Certified N Credentials Badge — COMPUTED and HIDDEN when empty */}
          {certCount > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111422] border border-[#E50914] text-xs font-mono text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]">
              <Award className="w-4 h-4 text-[#E50914]" />
              <span>Certified · {certCount} {certCount === 1 ? 'credential' : 'credentials'}</span>
            </div>
          )}
        </div>

        {/* 2-Column Grid: Education on left, Certifications ledger on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Panel (Real Content) (6 cols) */}
          <div className="lg:col-span-6 bg-[#0B0D14] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top red kicker */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#171B2B] text-xs font-mono text-[#E50914] border border-[#E50914]/30">
                <GraduationCap className="w-4 h-4" />
                <span>FORMAL EDUCATION</span>
              </div>
              <span className="text-xs font-mono text-[#8A91A5] bg-black/40 px-2 py-0.5 rounded">
                {education.status}
              </span>
            </div>

            <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
              {education.degree}
            </h3>

            <div className="text-base sm:text-lg font-medium text-[#E50914] mb-3">
              Specialization: {education.specialization} ({education.currentYear})
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8A91A5] mb-6">
              <MapPin className="w-4 h-4 text-[#E50914]" />
              <span>{education.location}</span>
            </div>

            {/* Core Academic Focus Areas */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-3">
                Key Curricular Areas
              </div>
              <div className="space-y-2.5">
                {education.focusAreas.map((area, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E5E7EB]">
                    <CheckCircle className="w-4 h-4 text-[#E50914] flex-none" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 h-1 w-full bg-gradient-to-r from-[#E50914] to-transparent rounded-full" />
          </div>

          {/* Certifications Ledger Panel (6 cols) */}
          <div className="lg:col-span-6 bg-[#0B0D14] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#171B2B] text-xs font-mono text-[#8A91A5] border border-white/10">
                <Award className="w-4 h-4 text-[#E50914]" />
                <span>EXTERNAL CERTIFICATIONS</span>
              </div>
              <span className="text-xs font-mono text-[#8A91A5]">
                {certCount} Verified
              </span>
            </div>

            {/* Elegant Empty State when no external certs have been supplied */}
            {certCount === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 border border-dashed border-white/15 rounded-xl bg-black/30">
                <div className="w-16 h-16 rounded-2xl bg-[#171B2B] flex items-center justify-center mb-4 text-[#8A91A5] border border-white/10">
                  <FileText className="w-8 h-8 text-[#E50914]" />
                </div>

                <h4 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mb-2">
                  Verified certifications will appear here.
                </h4>

                <p className="text-xs sm:text-sm text-[#8A91A5] max-w-sm mb-5 leading-relaxed">
                  No unverified or invented credentials are listed. When certifications are completed, adding them to <code className="text-white font-mono">/src/data/learning.js</code> will automatically display them here with credentials counter.
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#8A91A5]">
                  <PlusCircle className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Editable data file: src/data/learning.js</span>
                </div>
              </div>
            ) : (
              /* If entries exist, render them here */
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-xl bg-[#171B2B] border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bebas text-xl text-white">{cert.title}</h4>
                      <div className="text-xs font-mono text-[#8A91A5]">{cert.issuer} · {cert.date}</div>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#E50914] hover:underline"
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

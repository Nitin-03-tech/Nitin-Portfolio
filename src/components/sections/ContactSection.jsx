import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Github, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { siteConfig } from '../../data/config';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'Name is required';
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
    } else if (name === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email address';
    } else if (name === 'message') {
      if (!value.trim()) error = 'Message is required';
      else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const msgErr = validateField('message', formData.message);

    const newErrors = { name: nameErr, email: emailErr, message: msgErr };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (nameErr || emailErr || msgErr) return;

    setIsSubmitting(true);

    // Simulate sending with honest feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(formData.name);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#E50914', '#FFFFFF', '#B80610']
        });
      } catch {
        // Safe fallback
      }

      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    }, 600);
  };

  return (
    <section id="contact" className="relative w-full py-28 bg-[#05060A] overflow-hidden">
      {/* Background red cinematic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#E50914]/12 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Giant Ending Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#E50914]/50 shadow-[0_0_15px_rgba(229,9,20,0.4)] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#E50914] uppercase">
              SEASON FINALE
            </span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight text-white mb-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            TO BE CONTINUED...
          </h2>

          <p className="text-base sm:text-lg text-[#8A91A5] max-w-xl mx-auto font-medium">
            Ready to collaborate on new digital experiences, web apps, or AI prototypes? Let's build something remarkable.
          </p>
        </div>

        {/* Demo Mode Notice Box */}
        <div className="mb-8 p-4 rounded-xl bg-[#111422] border border-amber-500/30 flex items-start gap-3 shadow-lg">
          <Info className="w-5 h-5 text-amber-400 flex-none mt-0.5" />
          <div className="text-xs sm:text-sm text-[#E5E7EB]">
            <strong className="text-amber-400">Notice: </strong>
            This contact form is in <strong>demo mode</strong> until an external email webhook or backend endpoint is configured in <code className="text-white font-mono bg-black/40 px-1 py-0.5 rounded">/src/data/config.js</code>. Entries are validated client-side and simulated below without pretending messages are delivered externally.
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-[#0B0D14] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl relative">
          {submittedMessage ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center text-[#E50914] mb-4 shadow-[0_0_20px_#E50914]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
                TEST SUBMISSION RECEIVED
              </h3>
              <p className="text-sm text-[#8A91A5] max-w-md mb-6 leading-relaxed">
                Thank you, <strong className="text-white">{submittedMessage}</strong>. Form validation succeeded! To receive real emails, connect Formspree, EmailJS, or your custom API endpoint in <code className="text-white font-mono">/src/data/config.js</code>.
              </p>
              <button
                onClick={() => setSubmittedMessage(null)}
                className="px-6 py-2.5 bg-[#171B2B] hover:bg-[#20253B] text-white text-xs font-mono rounded border border-white/10 transition-colors"
              >
                Send Another Test
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-2">
                    Your Name <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 bg-[#111422] border rounded-lg text-white placeholder-white/30 text-sm focus:outline-none transition-all ${
                      errors.name && touched.name
                        ? 'border-[#E50914] focus:ring-1 focus:ring-[#E50914]'
                        : 'border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20'
                    }`}
                  />
                  {errors.name && touched.name && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#E50914]">
                      <AlertCircle className="w-3.5 h-3.5 flex-none" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-2">
                    Your Email <span className="text-[#E50914]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-3 bg-[#111422] border rounded-lg text-white placeholder-white/30 text-sm focus:outline-none transition-all ${
                      errors.email && touched.email
                        ? 'border-[#E50914] focus:ring-1 focus:ring-[#E50914]'
                        : 'border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20'
                    }`}
                  />
                  {errors.email && touched.email && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#E50914]">
                      <AlertCircle className="w-3.5 h-3.5 flex-none" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-[#8A91A5] uppercase tracking-wider mb-2">
                  Message <span className="text-[#E50914]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Share a project idea, feedback, or collaboration details..."
                  className={`w-full px-4 py-3 bg-[#111422] border rounded-lg text-white placeholder-white/30 text-sm focus:outline-none transition-all ${
                    errors.message && touched.message
                      ? 'border-[#E50914] focus:ring-1 focus:ring-[#E50914]'
                      : 'border-white/10 focus:border-white/40 focus:ring-1 focus:ring-white/20'
                  }`}
                />
                {errors.message && touched.message && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#E50914]">
                    <AlertCircle className="w-3.5 h-3.5 flex-none" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Submit CTA & GitHub Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#8A91A5] hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-[#E50914]" />
                  <span>GitHub: Nitin-03-tech</span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E50914] hover:bg-[#F40612] disabled:opacity-50 text-white font-bold text-sm tracking-wide rounded-md shadow-[0_0_20px_rgba(229,9,20,0.5)] hover:shadow-[0_0_30px_#E50914] transition-all transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Validating...' : "Let's build"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

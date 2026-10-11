/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: "#E50914",
          redDark: "#B80610",
          redGlow: "rgba(229, 9, 20, 0.4)",
          black: "#05060A",
          darkNavy: "#0B0D14",
          cardDark: "#111420",
          cardHover: "#171B2B",
          border: "#1F2438",
          muted: "#8A91A5",
          silver: "#E5E7EB",
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        anton: ['"Anton"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'red-glow': '0 0 25px rgba(229, 9, 20, 0.45)',
        'red-glow-lg': '0 0 45px rgba(229, 9, 20, 0.65)',
        'blue-glow': '0 0 25px rgba(30, 80, 255, 0.45)',
        'purple-glow': '0 0 25px rgba(157, 0, 255, 0.45)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'radial-hero': 'radial-gradient(circle at 50% 40%, rgba(229, 9, 20, 0.18) 0%, rgba(5, 6, 10, 0.8) 55%, #05060A 100%)',
        'radial-vignette': 'radial-gradient(ellipse at center, transparent 40%, #05060A 95%)',
        'poster-overlay': 'linear-gradient(180deg, rgba(5, 6, 10, 0.1) 0%, rgba(5, 6, 10, 0.6) 60%, #05060A 100%)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

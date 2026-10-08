import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: {
          950: "#06070a",
          900: "#0a0c10",
          850: "#0f1117",
          800: "#151821",
          700: "#1e2230",
        },
        solar: {
          300: "#ffb066",
          400: "#ff8c26",
          500: "#ff6b00",
          600: "#e65600",
          glow: "rgba(255, 107, 0, 0.22)",
        },
        crimson: {
          400: "#ff4d6d",
          500: "#ff2a4d",
          600: "#d90429",
          rcb: "#c8102e",
          glow: "rgba(255, 42, 77, 0.25)",
        },
        rcb: {
          400: "#ff4d6d",
          500: "#ff2a4d",
          600: "#c8102e",
          950: "#1a020a",
        },
        acid: {
          300: "#efff85",
          400: "#e2fd52",
          500: "#d4ff00",
        },
        electric: {
          400: "#ff8c26",
          500: "#ff6b00",
          600: "#e65600",
          cyan: "#ff7a00",
          glow: "rgba(255, 107, 0, 0.22)",
        },
        graphite: {
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Geist",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      animation: {
        "pulse-subtle": "pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spinSlow 24s linear infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marqueeReverse 28s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.4" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(255, 107, 0, 0.28)",
        "glow-lg": "0 0 60px -10px rgba(255, 107, 0, 0.35)",
        "glow-crimson": "0 0 45px -5px rgba(255, 42, 77, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("light", ".light &");
    }),
  ],
};

export default config;

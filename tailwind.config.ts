// tailwind.config.ts
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["var(--font-oswald)", "sans-serif"],
        barlow: ["var(--font-barlow)", "sans-serif"],
        display: ["var(--font-oswald)", "sans-serif"],
      },
      colors: {
        carbon: "#0e0e0e",
        forge: "#1a1a1a",
        iron: "#2a2a2a",
        rust: {
          DEFAULT: "#b85c2c",
          light: "#d4703a",
        },
        cream: {
          DEFAULT: "#e8e0d5",
          dim: "#a89a8a",
        },
        gold: "#c9a84c",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        "fade-in-left": "fadeInLeft 0.5s ease forwards",
      },
    },
  },
  plugins: [animate],
};

export default config;

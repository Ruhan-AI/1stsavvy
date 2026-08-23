import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          navy: "#324154",
          navyDark: "#2B3A4E",
          sky: "#4FA3CD",
          blue: "#66AFD3",
          softBlue: "#A4CDE1",
          offWhite: "#F9F7F8",
          text: "#1D2D42",
          muted: "#64748B",
          amber: "#EFCE7B",
        },
        primary: {
          DEFAULT: "#324154",
          foreground: "#FFFFFF",
          hover: "#2B3A4E",
        },
        accent: {
          DEFAULT: "#4FA3CD",
          foreground: "#FFFFFF",
          hover: "#3B8EB8",
          light: "#EBF5FA",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#1D2D42",
        },
        destructive: {
          DEFAULT: "#B42318",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#B45309",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#0F766E",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        slate: {
          750: "#293548",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      backgroundImage: {
        // enables `bg-radial from-* via-* to-*`, a v4 utility already used in src/components/3d
        radial: "radial-gradient(circle, var(--tw-gradient-stops))",
        "radial-at-t": "radial-gradient(ellipse at top, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "2xs": "0 1px 1px 0 rgb(16 24 40 / 0.04)",
        xs: "0 1px 2px 0 rgb(16 24 40 / 0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Libre Baskerville", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Manrope", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

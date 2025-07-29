import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#002147",
          hover: "#003a6b",
          light: "#e0e7ff",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#002147",
              foreground: "#ffffff",
            },
            focus: "#002147",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#003a6b",
              foreground: "#ffffff",
            },
            focus: "#003a6b",
          },
        },
      },
    }),
  ],
};

export default config;
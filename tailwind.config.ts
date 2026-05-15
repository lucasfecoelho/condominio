import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.12)",
      },
      colors: {
        primary: {
          DEFAULT: "#1E3A5F",
          dark: "#14283F",
          light: "#E8F0F7",
        },
        secondary: "#2F6F5E",
        background: "#F7F8FA",
        surface: "#FFFFFF",
        ink: "#17202A",
        muted: "#667085",
        border: "#D9E2EC",
        success: "#2F855A",
        warning: "#B7791F",
        error: "#C0392B",
      },
    },
  },
  plugins: [],
};

export default config;

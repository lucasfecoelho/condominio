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
          DEFAULT: "#0F2742",
          dark: "#0F2742",
          hover: "#163A5F",
          light: "#E7EEF6",
        },
        secondary: "#2E7D5B",
        "secondary-hover": "#25684B",
        background: "#F7F8FA",
        surface: "#FFFFFF",
        ink: "#17202A",
        muted: "#667085",
        border: "#D9E2EC",
        success: "#2E7D5B",
        warning: "#B7791F",
        error: "#B42318",
        "error-hover": "#912018",
      },
    },
  },
  plugins: [],
};

export default config;

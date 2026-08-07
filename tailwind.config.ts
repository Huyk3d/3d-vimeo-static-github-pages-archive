import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        archive: {
          background: "#F7F7F5",
          surface: "#FFFFFF",
          text: "#111111",
          muted: "#6B7280",
          border: "#DADADA",
        },
      },
    },
  },
  plugins: [],
};

export default config;

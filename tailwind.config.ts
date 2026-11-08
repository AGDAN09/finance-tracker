import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        malam: "#1B1F3B",
        mint: { DEFAULT: "#1FA37A", soft: "#DDF3EB" },
        koral: { DEFAULT: "#D9461F", soft: "#FBE6DF" },
        emas: "#F2B84B",
        kabut: "#EEF1F6",
      },
      fontFamily: { sans: ["var(--font-brico)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;

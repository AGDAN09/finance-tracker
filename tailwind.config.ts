import type { Config } from "tailwindcss";

const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: v("white"),
        malam: v("malam"),
        kabut: v("kabut"),
        mint: { DEFAULT: "#1FA37A", soft: v("mint-soft") },
        koral: { DEFAULT: "#D9461F", soft: v("koral-soft") },
        emas: "#F2B84B",
      },
      fontFamily: { sans: ["var(--font-brico)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
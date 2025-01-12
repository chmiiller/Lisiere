import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        '2xs': '0.7rem',
        '3xs': '0.65rem',
        '4xs': '0.6rem',
        '5xs': '0.55rem',
        '6xs': '0.50rem'
      },
    },
  },
  plugins: [],
} satisfies Config;

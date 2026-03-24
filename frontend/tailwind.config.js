/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "hsl(var(--accent))",
        "accent-bright": "hsl(var(--accent-bright))",
        deep: "hsl(var(--deep))",
        surface: "hsl(var(--surface))",
        "surface-bright": "hsl(var(--surface-bright))",
        muted: "hsl(var(--muted))",
      },
      fontFamily: {
        display: ["Inter Tight", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}

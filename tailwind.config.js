/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        peek: {
          "0%, 25%": { objectPosition: "top" },
          "80%, 100%": { objectPosition: "center 32%" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-100%)" } },
      },
      animation: {
        peek: "peek 16s ease-in-out infinite alternate",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
}

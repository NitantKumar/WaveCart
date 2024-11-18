import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whiteText: "#fff",
        darkText: "#000000",
        lightText: "#9b9b9b",
        greenText: "#1d8221",
        roseText: "#F43F5E",
        skyText: "#0ea5e9",
      },
      flex: {
        full: "0 0 100%",
      },
    },
  },
  plugins: [
    typography,
    aspectRatio,
  ],
};

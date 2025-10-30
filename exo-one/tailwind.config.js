/** @type {import('tailwindcss').Config} */
import colors from "./src/style/Colors.js";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        text: colors.text,
        resources: colors.resources,
        sidebar: colors.sidebar,
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};

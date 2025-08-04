/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*",
    "./app/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: "#2f2e33",
        blue: "#3a5199",
        light: "#ffffff",
        gray: "#d5d6d2",
        error: "#ff0000",
      },
    },
  },
  plugins: [],
};

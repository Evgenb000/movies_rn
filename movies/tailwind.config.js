/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./shared/**/*",
    "./shared/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bordo: "#882426",
        oat: "#cdbea7",
        ash: "#323030",
        gold: "#c29545",
      },
    },
  },
  plugins: [],
};
